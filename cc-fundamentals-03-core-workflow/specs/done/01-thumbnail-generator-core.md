# YouTube Thumbnail Generator — Part 1: Core Engine (Nano Banana Pro)

> Supersedes `youtube-thumbnail-generator-nano-banana-pro.md` (2026-06-07).
> Part 2 (`02-thumbnail-generator-consistency-features.md`) covers Personas, Styles, Recreate, and Scoring.

## Problem Statement

A YouTube channel's click-through rate is driven almost entirely by one 16:9 image. Making good thumbnails by hand is slow, needs design skill, and — the hard part — is nearly impossible to keep **visually consistent** across a channel: the same face, the same style, the same brand colours, video after video.

We want an app where a creator drops in images — photos of themselves, other people, icons, logos — and the app **recreates them as a polished, on-brand thumbnail** while preserving the identity of the subjects and the look of the channel. The image engine is **Nano Banana Pro (`gemini-3-pro-image`)**, which is built for identity-locked multi-reference generation with high-fidelity text rendering — precisely the thumbnail problem.

Part 1 delivers the working generator end-to-end. Part 2 layers on the persistent-consistency and market-parity features.

## Objectives

1. **Reference-driven generation** — upload images (faces, people, icons) and get a 16:9 thumbnail that keeps subject identity intact.
2. **Use Nano Banana Pro** (`gemini-3-pro-image`) with its real limits: up to **14 reference images** (6 high-fidelity objects + 5 character-consistency + 3 style references), 16:9, 2K output.
3. **Match baseline market features**: style presets, bold text overlay, multiple variations for A/B testing, YouTube-spec export, and a refine/edit loop.
4. Runs locally for a beginner-to-intermediate developer with a single API key and no other config.

## Technical Approach

### Overview

One **Next.js (App Router) + TypeScript** app. The browser handles upload, preset selection, and preview; a server-side route handler calls the Gemini API through the **`@google/genai`** SDK so the key never reaches the client. Images return as base64, get normalised to YouTube spec (16:9, ≤2MB), and land in a results grid the creator can download or send back for refinement.

> **Stack decision:** Next.js gives us UI + a secure server route in one project (no separate backend), matches the `GOOGLE_API_KEY` already in `.env.example`, and is beginner-friendly. Only Phase 2 is framework-specific — swap it for Express/FastAPI if you prefer.

### Architecture

```
Browser (React)                Next.js route handler              Google Gemini
─────────────────              ─────────────────────              ─────────────
Upload images        ─POST──►  /api/generate                ─────► gemini-3-pro-image
Pick preset + title            - validate + classify refs           :generateContent
Choose # variations            - build prompt from preset           16:9 · 2K · ≤14 refs
                               - attach reference images
Preview grid         ◄──JSON─  - normalise to YouTube spec  ◄────── base64 images
Download / Refine              - return data URLs + metadata
```

Key decisions:

- **Server-only API key.** The Gemini call lives in `app/api/generate/route.ts`, reading `process.env.GOOGLE_API_KEY`. Never bundled to the client.
- **References are typed, not just counted.** Nano Banana Pro treats character refs, object refs, and style refs differently. The UI tags each upload as `character | object | style`, and the prompt builder addresses them explicitly ("the person in image 1", "the logo in image 2"). This is what makes identity actually lock.
- **Presets are prompt templates.** Competitor "templates" are curated prompt + style scaffolding. Each preset is a reusable fragment (composition, lighting, colour, text treatment) the creator fills with their topic.
- **Variations for A/B testing.** Fire N generations (default 3 — YouTube's A/B test allows exactly 3 thumbnails) with varied prompt emphasis.
- **Deterministic text is a fallback, not the default.** Let the model render the headline first (it's good at it now); offer a canvas overlay layer for when spelling or placement needs to be exact.

### Key Components

1. **Upload & input panel (client)** — drag-and-drop, per-file role tagging (character/object/style), title field, preset picker, variations stepper. Validates type and size client-side.
2. **Prompt builder (`lib/prompt.ts`)** — `buildPrompt(preset, title, refs, opts)` composes the final instruction from preset + title + reference roles + tone toggles.
3. **Generation route (`app/api/generate/route.ts`)** — accepts images + options, enforces per-role reference caps, calls the model, returns normalised images.
4. **Image post-processor (`lib/normalize.ts`)** — `sharp`-based: exact 16:9, adaptive JPEG quality to land under 2MB.
5. **Results grid + refine loop (`components/ResultsGrid.tsx`)** — variations, per-image download, and "Refine this one" (re-submits the chosen output as a reference plus an edit instruction).
6. **Presets library (`lib/presets.ts`)** — typed starter templates: high-energy/MrBeast, clean tech tutorial, podcast/interview, vlog/lifestyle, gaming.

## Implementation Phases

### Phase 1: Scaffold & configuration

**Goal**: A runnable Next.js + TypeScript app with the Gemini SDK wired to the API key.

**Steps**:
1. Scaffold: `npx create-next-app@latest app --typescript --app --eslint --tailwind`.
2. Install: `npm i @google/genai sharp`.
3. Copy `.env.example` → `.env.local` and set `GOOGLE_API_KEY`. Confirm `.env*` is gitignored (it is).
4. Add a health-check route confirming the key is present, echoing no secret.

**Files to create**:
- Next.js scaffold (`package.json`, `tsconfig.json`, …)
- `.env.local` — local key, not committed
- `lib/gemini.ts` — single configured `GoogleGenAI` client; **all model calls go through here**
- `app/api/health/route.ts` — returns `{ ok: true, keyPresent: boolean }`

### Phase 2: Core generation route

**Goal**: A server route that takes typed reference images + a prompt and returns 16:9 thumbnails.

**Steps**:
1. Build `app/api/generate/route.ts` accepting `multipart/form-data` (images + a parallel `roles[]` array) plus title, presetId, variations.
2. Convert uploads to inline image parts. Enforce caps **per role**: ≤5 character, ≤6 object, ≤3 style, ≤14 total. Reject over-cap with a 400 and a clear message.
3. Call the model with `responseModalities: ['TEXT','IMAGE']` and `imageConfig: { aspectRatio: '16:9', imageSize: '2K' }`.
4. Generate `variations` images (default 3), each with a different prompt-emphasis suffix.
5. Return `{ results: [{ dataUrl, mimeType, bytes }], requestId }`.

**Reference implementation** (simplified):
```ts
import { GoogleGenAI } from "@google/genai";
import { buildPrompt } from "@/lib/prompt";
import { normalize } from "@/lib/normalize";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

const CAPS = { character: 5, object: 6, style: 3 } as const;

export async function POST(req: Request) {
  const form = await req.formData();
  const title = String(form.get("title") ?? "");
  const presetId = String(form.get("presetId") ?? "clean-tutorial");
  const variations = Math.min(Number(form.get("variations") ?? 3), 6);

  const files = form.getAll("images") as File[];
  const roles = form.getAll("roles").map(String) as (keyof typeof CAPS)[];

  // Enforce the model's per-role reference limits.
  const counts = { character: 0, object: 0, style: 0 };
  const refs: { role: keyof typeof CAPS; file: File }[] = [];
  for (const [i, file] of files.entries()) {
    const role = roles[i] ?? "object";
    if (++counts[role] > CAPS[role]) {
      return Response.json(
        { error: `Too many ${role} references (max ${CAPS[role]}).` },
        { status: 400 }
      );
    }
    refs.push({ role, file });
  }

  const imageParts = await Promise.all(
    refs.map(async ({ file }) => ({
      inlineData: {
        mimeType: file.type,
        data: Buffer.from(await file.arrayBuffer()).toString("base64"),
      },
    }))
  );

  const prompt = buildPrompt(presetId, title, refs.map((r) => r.role));

  const results = [];
  for (let i = 0; i < variations; i++) {
    const res = await ai.models.generateContent({
      model: "gemini-3-pro-image",
      contents: [{ role: "user", parts: [{ text: `${prompt}\n\nVariation ${i + 1}: ${VARIATION_HINTS[i % 3]}` }, ...imageParts] }],
      config: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: { aspectRatio: "16:9", imageSize: "2K" },
      },
    });
    const part = res.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
    if (part?.inlineData) results.push(await normalize(part.inlineData.data));
  }

  return Response.json({ results });
}
```

> **Verify against the installed SDK.** `imageConfig` / `aspectRatio` / `imageSize` are correct for current `@google/genai`, but pin the version and check the TypeScript types before building on them. Centralising the call in `lib/gemini.ts` means there's one place to fix if they drift.

**Files to create**:
- `app/api/generate/route.ts`
- `lib/prompt.ts` — `buildPrompt(presetId, title, roles, opts)`
- `lib/presets.ts` — preset definitions

### Phase 3: Upload UI, presets, results grid

**Goal**: A usable single page: upload → preset → title → generate → preview → download.

**Steps**:
1. Upload panel: drag-and-drop + file picker, thumbnail previews, a role selector on each file (defaults: first face → `character`, logos → `object`).
2. Controls: title input (with a ≤6-word hint), preset dropdown, variations stepper (1–6).
3. `fetch('/api/generate')` with `FormData`; loading state — expect ~2–5s per image.
4. Results grid with per-image **Download**.
5. Error and empty states, including a friendly message when `GOOGLE_API_KEY` is missing.

**Files to create**:
- `app/page.tsx`
- `components/UploadPanel.tsx`, `components/PresetPicker.tsx`, `components/ResultsGrid.tsx`

### Phase 4: YouTube-spec export + refine loop

**Goal**: Downloads that are always valid YouTube thumbnails, plus iterative consistency-preserving edits.

**Steps**:
1. `lib/normalize.ts` with `sharp`: force exact 16:9 (`1280×720`), encode JPEG with adaptive quality targeting **<2MB**, return a data URL and byte count.
2. Call `normalize()` in the generate route before returning.
3. **"Refine this one"**: re-submit a selected result as a `character`-role reference plus a free-text edit instruction — Nano Banana Pro's conversational editing keeps the identity.
4. **Text overlay fallback**: a canvas layer letting the creator place the headline deterministically over the generated image, for when model-rendered text isn't right.
5. **Mobile/dark-mode preview**: render results at ~168×94px next to the full size, so legibility at real feed scale is checked before download (a feature 1of10 makes a selling point).

**Files to create**:
- `lib/normalize.ts`
- `components/TextOverlay.tsx`, `components/ScalePreview.tsx`
- update `app/api/generate/route.ts`, `components/ResultsGrid.tsx`

## Testing Strategy

### Manual Testing
- [ ] Single selfie → generate → the result is recognisably the same person, 16:9.
- [ ] Two people + one logo, correctly role-tagged → both faces stay consistent and the logo is reproduced faithfully.
- [ ] Six character references → rejected with a clear "max 5" message, not a 500.
- [ ] Title text renders legibly and spelled correctly.
- [ ] 3 variations → 3 genuinely distinct on-brand options.
- [ ] Every download is 16:9 and **under 2MB**.
- [ ] "Refine this one" applies the edit while keeping the subject's identity.
- [ ] Missing `GOOGLE_API_KEY` → clear error, no crash.
- [ ] Oversized / wrong-type upload rejected client-side with a message.
- [ ] Result is still readable in the 168×94 scale preview.

### Automated Tests
- [ ] Unit: `buildPrompt()` composes correctly per preset, title, and reference roles.
- [ ] Unit: `normalize()` output is exactly 16:9 and <2MB for a large input.
- [ ] Unit: per-role reference caps (5/6/3/14) reject correctly at each boundary.
- [ ] Integration: `/api/generate` with a mocked Gemini client — assert model id, 16:9, 2K, and reference ordering.
- [ ] Route returns a structured error (not a stack trace) when the key is absent.

## Success Criteria
- [ ] Upload → downloadable thumbnail in **under ~15 seconds** for 3 variations.
- [ ] Generated subjects are **identity-consistent** with the references (visual pass on 5 test images).
- [ ] All downloads are valid YouTube thumbnails: **16:9, ≤2MB**.
- [ ] Runs locally with only `GOOGLE_API_KEY` set.
- [ ] At least **5 presets**, plus text overlay, variations/A-B, refine, and spec export all working.

## Potential Challenges

1. **SDK field drift.** Config keys have changed across `@google/genai` versions. *Address:* pin the version, verify against its types in Phase 2, keep every call in `lib/gemini.ts`.
2. **Text accuracy.** Even strong models occasionally misspell overlay text. *Address:* keep titles ≤6 words, and ship the deterministic canvas overlay (Phase 4.4) as the escape hatch.
3. **Identity drift across variations.** More creative variation reduces likeness. *Address:* always include the character references in every call, and expose a consistency-vs-creativity control that adjusts prompt emphasis rather than dropping references.
4. **2MB limit.** 2K/4K output can exceed it. *Address:* `sharp` re-encode at 1280×720 with adaptive quality.
5. **Cost.** ~$0.13 per 2K image, multiplied by variations. *Address:* default 3, cap at 6, show a per-session generation counter.
6. **SynthID watermark.** All outputs carry an invisible SynthID watermark. Disclose it in the UI; it doesn't affect YouTube usage.

## Notes

### Nano Banana Pro facts (verified 2026-09-05)
- Model ID: **`gemini-3-pro-image`**.
- References: **up to 14 total** — 6 high-fidelity objects + **5 character-consistency** + 3 style references. *(The June draft of this spec said 6 total; that was wrong.)*
- Aspect ratios: 1:1, 3:2, 2:3, 3:4, 4:3, 4:5, 5:4, 9:16, **16:9**, 21:9. Sizes: `1K`, `2K`, `4K` (uppercase K required).
- Config fields: `responseModalities`, `imageConfig.aspectRatio`, `imageConfig.imageSize`.
- ~2–5s per image; ~$0.134 per 1K/2K image, ~$0.24 at 4K. All outputs SynthID-watermarked.

### Sources
- [Gemini 3 Pro Image model page — Google](https://ai.google.dev/gemini-api/docs/models/gemini-3-pro-image)
- [Gemini API image generation docs — Google](https://ai.google.dev/gemini-api/docs/image-generation)
- [Build with Nano Banana Pro — Google blog](https://blog.google/innovation-and-ai/technology/developers-tools/gemini-3-pro-image-developers/)

---

*Created: 2026-09-05*
*Status: done*
