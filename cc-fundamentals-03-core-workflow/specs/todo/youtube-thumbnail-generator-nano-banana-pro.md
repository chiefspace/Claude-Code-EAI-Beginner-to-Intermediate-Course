# YouTube Thumbnail Generator (Nano Banana Pro)

## Problem Statement

YouTube creators live and die by their thumbnails — the click-through rate (CTR) of a video is driven heavily by a single 16:9 image. Designing good thumbnails by hand is slow, requires design skill, and is hard to keep visually **consistent** across an entire channel (same face, same style, same brand colors video after video).

We want an app where a creator can **bring in images** — photos of themselves, other people, or icons/logos — and the app **recreates them into a polished, on-brand YouTube thumbnail** while preserving the identity and look of the source images. The image engine is **Nano Banana Pro (Gemini 3 Pro Image)**, which is purpose-built for identity-locked, multi-reference image generation with high-fidelity text rendering — exactly what thumbnails need.

## Objectives

1. **Reference-driven generation** — upload 1–6 images (faces, people, icons) and generate a 16:9 thumbnail that keeps the subjects' identity and the brand's visual style consistent.
2. **Use Nano Banana Pro** (`gemini-3-pro-image`) as the generation/editing engine, leveraging its character-consistency (up to 5 character + 6 object references), 16:9 aspect ratio, 2K output, and accurate text rendering.
3. **Match common market features** found across existing tools (see Research): bold text overlays, style/template presets, multiple variations for A/B testing, YouTube-spec export (16:9, <2MB), and re-edit/refinement.
4. Ship a simple, usable web app a beginner-to-intermediate developer can run locally with a single API key.

## Technical Approach

### Overview

A single **Next.js (App Router) + TypeScript** web app. The browser handles upload, prompt/preset selection, and preview; a server-side API route calls the Gemini API with the **`@google/genai`** SDK so the API key never reaches the client. Generated images come back as base64, are normalized to YouTube spec (16:9, ≤2MB), and shown in a results grid the user can download or send back for refinement.

> **Stack decision:** Next.js is chosen because it gives us the UI and the secure server-side API route in one project (no separate backend), matches the Node-style keys already in `.env.example` (`GOOGLE_API_KEY`), and is beginner-friendly. If you prefer a different stack, only Phase 2 (the API route) is framework-specific — swap it for an Express/Python equivalent.

### Architecture

```
Browser (React)                Next.js API Route (server)         Google Gemini
─────────────────              ──────────────────────────         ─────────────
Upload images        ─POST──►  /api/generate                ─────► gemini-3-pro-image
Pick preset + text             - validate inputs                   :generateContent
Choose # variations            - build prompt from preset          (16:9, 2K,
                               - attach reference images            up to 6 refs)
Preview grid         ◄──JSON─  - normalize to YouTube spec   ◄───── base64 images
Download / Refine              - return base64 + metadata
```

Key decisions:
- **Server-only API key.** The Gemini call lives in a route handler (`app/api/generate/route.ts`). The key is read from `process.env.GOOGLE_API_KEY` and is never bundled to the client.
- **Presets as prompt templates.** "Templates" in competitor tools are mostly curated prompt + style scaffolding. We encode each preset as a reusable prompt fragment (style, lighting, composition, text treatment) the user fills with their topic/title.
- **Identity consistency via reference images.** We pass the uploaded images directly to the model as `contents` alongside the text prompt. Nano Banana Pro locks subject identity across outputs, which is the core "keeps the same consistency" requirement.
- **Variations for A/B testing.** We fire N (configurable, default 3) generations — varying seed/prompt emphasis — so the creator gets a spread to A/B test on YouTube (YouTube allows up to 3 thumbnails per test).
- **YouTube-spec normalization.** Output is requested at 16:9 / 2K, then compressed/resized server-side so the downloadable file is a valid `1280×720` (or `1920×1080`) JPEG/PNG under 2MB.

### Key Components

1. **Upload & input panel (client)**: drag-and-drop for up to 6 images, a title/headline text field, preset picker, and a variations counter. Validates file type/size and previews thumbnails.
2. **Prompt builder (shared util)**: `buildPrompt(preset, title, options)` — composes the final text instruction from a chosen preset + the creator's title + tone/emotion toggles.
3. **Generation API route (server)**: receives images + options, calls `gemini-3-pro-image`, requests 16:9 / 2K, returns base64 images and any model text. Handles errors, rate limits, and missing key.
4. **Image post-processor (server util)**: decodes model output, ensures exact 16:9 dimensions, compresses to <2MB, returns a YouTube-ready data URL. Uses `sharp`.
5. **Results grid + refine loop (client)**: shows variations, per-image Download, and a "Refine this one" action that re-submits the chosen image as a new reference with an edit instruction (Nano Banana Pro's conversational editing).
6. **Presets library (data)**: a typed list of starter templates (e.g., *MrBeast-style high energy*, *Clean tech/tutorial*, *Podcast/interview*, *Vlog/lifestyle*, *Gaming*).

## Implementation Phases

### Phase 1: Project scaffold & configuration

**Goal**: A runnable Next.js + TypeScript app with the Gemini SDK installed and the API key wired in.

**Steps**:
1. Scaffold: `npx create-next-app@latest thumbnail-generator --typescript --app --eslint` (or initialize in a `app/` subfolder of this repo).
2. Install deps: `npm i @google/genai sharp` and dev types as needed.
3. Add `GOOGLE_API_KEY` usage — it already exists in `.env.example`; create local `.env.local` from it. Confirm `.env*` is gitignored (it is).
4. Create a tiny health-check route that confirms the key is present (no secret echoed).

**Files to create**:
- `package.json` / Next.js scaffold - base app
- `.env.local` - local copy of `GOOGLE_API_KEY` (not committed)
- `lib/gemini.ts` - exports a configured `genai` client from `process.env.GOOGLE_API_KEY`
- `app/api/health/route.ts` - returns `{ ok: true, keyPresent: boolean }`

### Phase 2: Core generation API (Nano Banana Pro)

**Goal**: A server route that takes reference images + a prompt and returns a 16:9 thumbnail from `gemini-3-pro-image`.

**Steps**:
1. Build `app/api/generate/route.ts` to accept `multipart/form-data` (images) + JSON fields (title, presetId, variations, aspectRatio).
2. Convert uploaded files to the SDK's inline image parts; cap at 6 references.
3. Call the model with `response_modalities: ['TEXT','IMAGE']` and request `aspect_ratio: "16:9"`, `image_size: "2K"`.
4. Loop to produce `variations` images (default 3), each with slight prompt-emphasis variation.
5. Return an array of `{ base64, mimeType }` plus any model text and a `requestId`.

**Reference implementation** (`app/api/generate/route.ts`, simplified):
```ts
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

export async function POST(req: Request) {
  const form = await req.formData();
  const title = String(form.get("title") ?? "");
  const presetId = String(form.get("presetId") ?? "clean-tutorial");
  const variations = Math.min(Number(form.get("variations") ?? 3), 6);

  const files = form.getAll("images").slice(0, 6) as File[];
  const imageParts = await Promise.all(
    files.map(async (f) => ({
      inlineData: {
        mimeType: f.type,
        data: Buffer.from(await f.arrayBuffer()).toString("base64"),
      },
    }))
  );

  const prompt = buildPrompt(presetId, title); // shared util

  const results = [];
  for (let i = 0; i < variations; i++) {
    const res = await ai.models.generateContent({
      model: "gemini-3-pro-image",
      contents: [{ role: "user", parts: [{ text: prompt }, ...imageParts] }],
      config: {
        responseModalities: ["TEXT", "IMAGE"],
        // 16:9 + 2K so it's a true YouTube thumbnail
        imageConfig: { aspectRatio: "16:9", imageSize: "2K" },
      },
    });
    const part = res.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
    if (part?.inlineData) {
      results.push({
        base64: part.inlineData.data,
        mimeType: part.inlineData.mimeType,
      });
    }
  }

  return Response.json({ results });
}
```
> Note: confirm the exact `@google/genai` config field names against the installed SDK version (`imageConfig`/`aspectRatio`/`imageSize` vs `response_format`) during Phase 2 — the docs and SDK are evolving. Adjust to whatever the installed version exposes.

**Files to create**:
- `app/api/generate/route.ts` - generation endpoint
- `lib/prompt.ts` - `buildPrompt(presetId, title, opts)`
- `lib/presets.ts` - preset/template definitions

### Phase 3: Upload UI, presets, and results grid

**Goal**: A usable single-page UI to upload images, pick a preset, enter a title, generate, preview, and download.

**Steps**:
1. Build the upload panel: drag-and-drop + file picker, up to 6 thumbnails, client-side validation (≤10MB each, jpg/png/webp).
2. Add controls: title text input, preset dropdown (from `lib/presets.ts`), variations stepper (1–6), aspect ratio (default 16:9).
3. Wire `fetch('/api/generate')` with `FormData`; show a loading state (model takes ~2–5s/image).
4. Render results in a grid with per-image **Download** (YouTube-ready file).
5. Empty/error states and a friendly message when `GOOGLE_API_KEY` is missing.

**Files to create**:
- `app/page.tsx` - main UI
- `components/UploadPanel.tsx`, `components/PresetPicker.tsx`, `components/ResultsGrid.tsx`
- `app/globals.css` (or Tailwind setup) - styling

### Phase 4: YouTube-spec export + refine/edit loop

**Goal**: Guarantee downloadable files meet YouTube requirements, and let users iteratively refine a chosen thumbnail (consistency-preserving edits).

**Steps**:
1. Add `lib/normalize.ts` using `sharp`: force exact 16:9 (`1920×1080`/`1280×720`), encode JPEG with quality tuned to stay **<2MB**, return data URL.
2. Apply normalization in the API route before returning (or in a dedicated `/api/export`).
3. Add **"Refine this one"**: re-submit a selected result as a reference image plus an edit instruction (e.g., "make the text bigger, brighter background") — uses Nano Banana Pro conversational editing to keep identity.
4. Add a one-click **"Generate 3 A/B variations"** action that returns a comparison set.

**Files to create**:
- `lib/normalize.ts` - sharp-based YouTube-spec encoder
- update `app/api/generate/route.ts` - call normalize before returning
- update `components/ResultsGrid.tsx` - add Refine + A/B actions

### Phase 5 (optional / stretch): Brand kit & extras

**Goal**: Higher-end features that match premium competitors. Implement only if time allows.

**Steps**:
1. **Brand kit**: save channel colors, font preference, and a default face reference so every generation is on-brand.
2. **Multi-platform export**: also output 9:16 (Shorts) and 1:1 from the same inputs.
3. **Prompt assist**: optional field where a creator pastes the video title/description and we auto-suggest a thumbnail concept (text model call).
4. **Background removal/magic eraser** for uploaded subjects before composition.

**Files to create**:
- `lib/brandKit.ts`, related UI, and optional `/api/suggest` route.

## Testing Strategy

### Manual Testing
- [ ] Upload a single selfie → generate → result is recognizably the same person, 16:9.
- [ ] Upload 2 people + 1 icon (6-ref limit respected) → both faces stay consistent.
- [ ] Title text appears legibly and correctly spelled on the thumbnail (text rendering check).
- [ ] Request 3 variations → 3 distinct on-brand options returned.
- [ ] Each downloaded file is 16:9 and **under 2MB** (valid for YouTube upload).
- [ ] "Refine this one" keeps the subject's identity while applying the edit.
- [ ] Missing/empty `GOOGLE_API_KEY` shows a clear, non-crashing error.
- [ ] Oversized/wrong-type upload is rejected client-side with a message.

### Automated Tests
- [ ] Unit test `buildPrompt()` — correct composition per preset + title.
- [ ] Unit test `normalize()` — output is 16:9 and <2MB for large inputs.
- [ ] Integration test for `/api/generate` with a mocked Gemini client (assert request shape: model id, 16:9, ≤6 refs).
- [ ] Route returns a structured error (not a 500 stack) when the key is absent.

## Success Criteria
- [ ] From upload to downloadable thumbnail in **under ~15 seconds** for 3 variations.
- [ ] Generated subjects are **identity-consistent** with the uploaded references (visual pass).
- [ ] All downloads are valid YouTube thumbnails: **16:9, ≤2MB**.
- [ ] App runs locally with only `GOOGLE_API_KEY` set — no other config required.
- [ ] At least **5 presets** and the core market features (text overlay, variations/A-B, refine, export) are present.

## Potential Challenges

1. **SDK field names / API drift**: Nano Banana Pro config keys (`aspectRatio`, `imageSize`, `response_modalities`) differ across SDK versions and docs. *Address:* pin the `@google/genai` version, verify against its TypeScript types in Phase 2, and centralize the call in `lib/gemini.ts` so there's one place to fix.
2. **Text accuracy on thumbnails**: even strong models occasionally misspell overlay text. *Address:* keep titles short (≤6 words), and as a fallback offer a client-side text-overlay layer (canvas) so the headline can be added deterministically over the AI image.
3. **Identity drift across variations**: more creative variation can reduce likeness. *Address:* always include the original references in every call, and expose a "consistency vs. creativity" slider that adjusts prompt emphasis.
4. **File size / 2MB limit**: 2K/4K outputs can exceed 2MB. *Address:* `sharp` re-encode with adaptive JPEG quality targeting <2MB at 1280×720.
5. **Cost & rate limits**: each image (~$0.13 at 2K) and N variations add up. *Address:* default variations to 3, cap at 6, and surface a simple per-session generation count.
6. **SynthID watermark**: all outputs carry an invisible SynthID watermark — note this in the UI; it does not affect YouTube usage but is worth disclosing.

## Notes

### Research — common features across existing generators (3 tools)
- **1of10** — trained on YouTube outlier data; produces finished, upload-ready thumbnails optimized for color, composition, text placement, and emotional cues. → *We mirror: production-ready 16:9 export + emotion/tone presets.*
- **Canva AI thumbnail maker** — hundreds of 16:9 templates, prompt-based generation, magic eraser, and Magic Edit object swapping. → *We mirror: preset/template library + refine/edit loop (and optional bg removal in Phase 5).*
- **Test My Thumbnails / Thumbmagic** — face swap, multiple variations, and A/B testing (YouTube allows up to 3 thumbnails per test). → *We mirror: identity-consistent faces + multi-variation A/B output.*

Common denominators implemented across the board: **image upload/reference**, **bold text overlay**, **style/template presets**, **multiple variations for A/B testing**, **YouTube-spec (16:9, <2MB) export**, and **re-edit/refine**.

### Nano Banana Pro key facts (for implementers)
- Model ID: `gemini-3-pro-image`. Endpoint: `…/v1/models/gemini-3-pro-image:generateContent`.
- Supports up to **6 object** + **5 character** reference images; identity locked across outputs.
- Aspect ratios include **16:9** (and 9:16, 1:1 for stretch goals); resolutions 512/1K/**2K**/4K.
- ~2–5s per image; ~$0.134/image at 2K; outputs carry an invisible **SynthID** watermark.

### Sources
- [Gemini API: image generation (Nano Banana) — Google](https://ai.google.dev/gemini-api/docs/image-generation)
- [Developers can build with Nano Banana Pro — Google blog](https://blog.google/technology/developers/gemini-3-pro-image-developers/)
- [10 Best AI Thumbnail Generators for YouTube in 2026 — 1of10](https://1of10.com/blog/best-ai-thumbnail-generator/)
- [Best AI Thumbnail Generators for YouTube in 2026 — CapCut](https://www.capcut.com/resource/best-7-ai-thumbnail-generators-for-youtube)
- [YouTube Thumbnail A/B Testing Guide (2026) — Thumbmagic](https://www.thumbmagic.co/blog/ab-test-youtube-thumbnails)

---

*Created: 2026-06-07*
*Status: todo*
