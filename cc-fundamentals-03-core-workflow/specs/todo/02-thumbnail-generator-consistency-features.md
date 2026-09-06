# YouTube Thumbnail Generator — Part 2: Consistency & Market-Parity Features

> Depends on `01-thumbnail-generator-core.md`. Do not start until Part 1's Phases 1–4 are done.

## Problem Statement

Part 1 gets a creator from uploaded images to a downloadable 16:9 thumbnail with identity preserved *within a single generation*. That is not yet the thing creators actually need.

The real requirement is **consistency across an entire channel**: the same face rendered the same way in video 40 as in video 1, the same visual style, the same brand recognition — without re-uploading and re-describing everything each time. Competitor research (below) shows this is exactly where the market has converged, and it is the half of "it recreates it, it keeps the same consistency" that Part 1 doesn't cover.

This part adds persistent **Personas** and **Styles**, a **Recreate** flow that clones the format of a thumbnail that already works, and the packaging features (scoring, title generation) that round the app out to market parity.

## Objectives

1. **Personas** — save a subject once from 3+ photos; every future generation reuses it automatically.
2. **Styles** — learn a channel's look from 3 existing thumbnails; apply it to everything after.
3. **Recreate** — take a reference thumbnail (upload or YouTube URL) and rebuild its winning composition with the creator's own face, style, and topic.
4. **Packaging assist** — score a thumbnail on CTR-relevant dimensions and generate matched click-optimised titles.
5. **Brand kit + multi-format export** — channel colours and fonts, plus 9:16 and 1:1 output from the same inputs.

## Technical Approach

### Overview

Part 1 was stateless: every generation carried its own references. Part 2 introduces **persistence** — a small local store holding Personas, Styles, and Brand Kit, which the generation route reads and injects as references automatically.

Keep the store deliberately simple: **SQLite via `better-sqlite3`**, with reference images on disk under `.data/refs/`. No auth, no cloud, no ORM. This is a local-first creator tool, and a file-backed DB keeps the whole thing inspectable and beginner-legible. Swap for Postgres only if this ever becomes multi-user.

### Architecture

```
                        ┌──────────────────────────┐
Persona (3+ face pics) ─┤                          │
Style (3 thumbnails)   ─┤   SQLite + .data/refs/   │
Brand kit (colors/font)─┤                          │
                        └───────────┬──────────────┘
                                    │ auto-injected as typed refs
                                    ▼
Topic / title ──────────►  /api/generate (Part 1)  ──────► gemini-3-pro-image
Reference thumbnail ────►  /api/recreate           ──────►  (style + character
                                                              + object refs)
Result ─────────────────►  /api/score  ─────────────────►  gemini-3-pro (text)
                        └► /api/titles ─────────────────►  gemini-3-pro (text)
```

The important constraint carries over from Part 1: the model accepts **at most 14 references — 5 character, 6 object, 3 style**. Personas and Styles consume that budget. The reference resolver must merge saved refs with per-request uploads and stay inside the caps, dropping lowest-priority extras rather than erroring.

### Key Components

1. **Persona store (`lib/personas.ts`)** — CRUD over named personas, each holding 3–5 face images (the character-reference budget) plus an optional descriptive note the prompt builder uses ("a man in his 40s with a short beard").
2. **Style store (`lib/styles.ts`)** — named styles, each 1–3 reference thumbnails (the style-reference budget) plus an extracted text description of the look.
3. **Reference resolver (`lib/resolveRefs.ts`)** — the piece that matters most: merges persona + style + brand + per-request uploads into a single, correctly-typed, cap-respecting reference set with a documented priority order.
4. **Recreate route (`app/api/recreate/route.ts`)** — accepts a reference thumbnail, describes its composition with a text model, then regenerates that composition using the creator's persona and style.
5. **Scoring route (`app/api/score/route.ts`)** — sends the generated thumbnail + title to a text model for a structured critique across CTR dimensions.
6. **Titles route (`app/api/titles/route.ts`)** — generates click-optimised titles matched to the thumbnail.
7. **Brand kit (`lib/brandKit.ts`)** — channel colours, font preference, default persona and style.

## Implementation Phases

### Phase 1: Persistence layer & reference resolver

**Goal**: Saved personas and styles that automatically feed every generation.

**Steps**:
1. Add `better-sqlite3`; create `lib/db.ts` with a migration creating `personas`, `styles`, `brand_kit`, and `ref_images` tables. Store image bytes on disk under `.data/refs/<id>.jpg`, paths in the DB. Add `.data/` to `.gitignore`.
2. Build `lib/personas.ts` and `lib/styles.ts` — create, list, get, delete. On persona creation, run one text-model call over the uploaded faces to extract a short descriptive note, and cache it.
3. Build `lib/resolveRefs.ts` with an explicit priority order:
   - character slots (max 5): per-request character uploads first, then persona images, truncated to 5;
   - style slots (max 3): per-request style uploads first, then style images;
   - object slots (max 6): per-request object uploads (logos, icons);
   - total hard-capped at 14; log what was dropped and return it in the response so the UI can say so.
4. Update `app/api/generate/route.ts` to accept optional `personaId` / `styleId` and route all reference assembly through the resolver.

**Reference implementation** (`lib/resolveRefs.ts`, core of it):
```ts
const CAPS = { character: 5, object: 6, style: 3 } as const;
const TOTAL = 14;

export function resolveRefs(input: {
  uploads: Ref[];          // this request, already role-tagged
  persona?: Persona;       // saved character images
  style?: Style;           // saved style images
}): { refs: Ref[]; dropped: Ref[] } {
  const buckets: Record<Role, Ref[]> = { character: [], object: [], style: [] };
  const dropped: Ref[] = [];

  // Per-request uploads always outrank saved references.
  const ordered = [
    ...input.uploads,
    ...(input.persona?.images ?? []).map(toRef("character")),
    ...(input.style?.images ?? []).map(toRef("style")),
  ];

  let total = 0;
  for (const ref of ordered) {
    if (buckets[ref.role].length >= CAPS[ref.role] || total >= TOTAL) {
      dropped.push(ref);
      continue;
    }
    buckets[ref.role].push(ref);
    total++;
  }

  // Character refs first — identity anchors read strongest early in the parts array.
  return { refs: [...buckets.character, ...buckets.object, ...buckets.style], dropped };
}
```

**Files to create**:
- `lib/db.ts`, `lib/personas.ts`, `lib/styles.ts`, `lib/resolveRefs.ts`
- `app/api/personas/route.ts`, `app/api/styles/route.ts` — CRUD endpoints
- update `app/api/generate/route.ts`, `.gitignore`

### Phase 2: Persona & Style management UI

**Goal**: Create and pick personas and styles without touching the filesystem.

**Steps**:
1. `/personas` page: create a persona (name + 3–5 photos), preview stored faces, delete. Warn if fewer than 3 photos — consistency degrades below that.
2. `/styles` page: create a style from 1–3 existing thumbnails, show the extracted style description, allow editing that text (it's a prompt fragment, so a human-tuned one often beats the generated one).
3. Add persona and style pickers to the main generate page, defaulting to the brand kit's defaults.
4. Surface `dropped` references from the resolver as a non-blocking notice ("Using 5 of 7 face references — the model caps character references at 5").

**Files to create**:
- `app/personas/page.tsx`, `app/styles/page.tsx`
- `components/PersonaForm.tsx`, `components/StyleForm.tsx`, `components/PersonaPicker.tsx`, `components/StylePicker.tsx`
- update `app/page.tsx`

### Phase 3: Recreate

**Goal**: Point at a thumbnail that already works, get that composition rebuilt with the creator's own face, style, and topic. **This is the headline feature** — it's the direct answer to "bring in an image and it recreates it".

**Steps**:
1. `app/api/recreate/route.ts` accepts either an uploaded reference thumbnail or a YouTube video URL.
2. For a URL: derive the thumbnail via `https://img.youtube.com/vi/<videoId>/maxresdefault.jpg` (fall back to `hqdefault.jpg` when maxres 404s). Parse the video ID from both `youtube.com/watch?v=` and `youtu.be/` forms.
3. **Describe, then rebuild** — do not feed the reference straight in as a style ref. Send it to the text model for a structured composition breakdown (subject placement, camera framing, expression, colour palette, text position and weight, background treatment). This decomposition step is what makes the output a *recreation of the format* rather than a copy of the image.
4. Feed that description as the prompt scaffold, with the creator's persona as character references and their style as style references, into the existing generate path.
5. UI: a "Recreate" tab — paste a URL or drop an image, show the extracted composition breakdown (editable), then generate.

> **Boundary worth stating plainly:** this recreates *composition patterns* — framing, colour, emotion, text placement — with the creator's own subject. It must not reproduce another creator's face, logo, or copyrighted artwork. Make the composition breakdown visible and editable so the creator can see exactly what is being carried over, and have the describe step explicitly exclude identity and brand marks from its output.

**Files to create**:
- `app/api/recreate/route.ts`, `lib/describeComposition.ts`, `lib/youtube.ts`
- `components/RecreatePanel.tsx`

### Phase 4: Scoring, titles, brand kit, multi-format

**Goal**: Market-parity packaging features.

**Steps**:
1. `app/api/score/route.ts`: send the thumbnail + title to a text model, get structured JSON scored 1–10 on **clarity, curiosity, emotion, contrast, and mobile legibility**, each with one concrete improvement note. Render as a compact scorecard.
2. Add "Apply top fix" — feed the highest-impact note back through the refine loop from Part 1, Phase 4.
3. `app/api/titles/route.ts`: generate 5 click-optimised titles matched to the generated thumbnail.
4. Brand kit page: channel colours (hex), font preference, default persona and style — injected into every prompt.
5. Multi-format export: regenerate at `9:16` (Shorts) and `1:1` from the same references and prompt, using the aspect ratios the model already supports.

**Files to create**:
- `app/api/score/route.ts`, `app/api/titles/route.ts`, `lib/brandKit.ts`
- `app/brand/page.tsx`, `components/ScoreCard.tsx`, `components/TitleSuggestions.tsx`
- update `components/ResultsGrid.tsx`

## Testing Strategy

### Manual Testing
- [ ] Create a persona from 3 photos → generate 5 thumbnails across 5 sessions → the same person is recognisable in all 5.
- [ ] Create a style from 3 existing channel thumbnails → new output visibly matches that look.
- [ ] Persona (5 faces) + 3 uploaded object refs + a style → resolver produces a valid set, reports nothing dropped.
- [ ] Persona (5) + 3 extra uploaded faces → uploads win, 3 persona faces reported as dropped, no error.
- [ ] Recreate from a YouTube URL → composition matches the reference's framing and text placement, but the face is the creator's.
- [ ] Recreate from a `youtu.be` short link and from a video with no `maxresdefault` → both work.
- [ ] Composition breakdown contains no identity or brand-mark description from the source.
- [ ] Score returns all five dimensions with actionable notes; "Apply top fix" visibly improves the flagged issue.
- [ ] Brand-kit colours actually appear in generated output.
- [ ] 9:16 export is a valid Shorts cover.

### Automated Tests
- [ ] Unit: `resolveRefs()` at every boundary — 5/6/3 per-role and 14 total; priority order; correct `dropped` contents.
- [ ] Unit: `lib/youtube.ts` video-ID parsing for `watch?v=`, `youtu.be/`, URLs with extra query params, and invalid input.
- [ ] Unit: persona/style CRUD round-trips, including on-disk image cleanup on delete.
- [ ] Integration: `/api/generate` with a `personaId` — assert persona images appear as character refs, ordered first.
- [ ] Integration: `/api/recreate` with a mocked describe step — assert the description reaches the prompt and the persona reaches the refs.
- [ ] Contract: `/api/score` response parses against its schema even when the model returns prose around the JSON.

## Success Criteria
- [ ] A persona created once produces **identity-consistent** output across ≥5 separate sessions with no re-upload.
- [ ] A style created from 3 thumbnails produces visibly on-brand output across different topics.
- [ ] Recreate from a YouTube URL yields a thumbnail matching the source's composition with the creator's own subject.
- [ ] The resolver never exceeds the model's reference caps and never errors on over-supply — it degrades and reports.
- [ ] Scorecard returns all five dimensions with actionable notes.
- [ ] All Part 1 success criteria still hold (16:9, ≤2MB, <15s for 3 variations).

## Potential Challenges

1. **Reference budget contention.** Persona + style + logos can exceed 14 fast. *Address:* the resolver's documented priority order, plus a visible "using N of M references" notice — silent dropping would be the worst outcome.
2. **Style refs are weaker than character refs.** Style transfer from 3 images is fuzzier than identity locking. *Address:* pair the style images with the extracted *text* description, and let the creator hand-edit that text — the prompt fragment does more work than the images.
3. **Identity drift over long-lived personas.** A persona built from 3 photos in one lighting setup generalises poorly. *Address:* prompt for varied angles and lighting at creation time, and allow adding photos to an existing persona.
4. **YouTube thumbnail fetching.** `maxresdefault.jpg` doesn't exist for every video. *Address:* fall back through `sddefault` → `hqdefault`; handle 404s explicitly rather than passing an HTML error page to the model as an image.
5. **Copying vs. recreating.** Recreate could be used to clone someone's thumbnail wholesale. *Address:* the describe-then-rebuild indirection, an identity/brand-mark exclusion in the describe prompt, and a visible editable breakdown. Composition patterns are not protectable; a specific face or logo is.
6. **Structured output from a text model.** Score JSON may arrive wrapped in prose. *Address:* request a response schema, and parse defensively.

## Notes

### Research — common features across existing generators (verified 2026-09-05)

| Feature | Pikzels | Canva AI | 1of10 | We build it in |
|---|---|---|---|---|
| Prompt → thumbnail | ✅ | ✅ | ✅ | Part 1, Ph 2–3 |
| Templates / style presets | — | ✅ (hundreds of 16:9 templates, Magic Media preset art styles) | ✅ (CTR design frameworks) | Part 1, Ph 2 |
| Multiple variations | ✅ | ✅ | ✅ (several per run) | Part 1, Ph 2 |
| Conversational edit | ✅ ("Edit" — request changes in plain notes) | ✅ (Magic Edit, magic eraser) | ✅ (swap expressions, colours, moods) | Part 1, Ph 4 |
| **Saved face/persona** | ✅ (**Personas** — 3 photos, reused everywhere) | — | — | **Part 2, Ph 1–2** |
| **Saved channel style** | ✅ (**Styles** — trained on 3 thumbnails) | Brand Kit | ✅ (learns from linked channel) | **Part 2, Ph 1–2** |
| **Recreate from a reference** | ✅ (**Recreate** — paste a YouTube link, clone the format) | — | ✅ (reverse-engineer outliers) | **Part 2, Ph 3** |
| Scoring / critique | ✅ (Pikzels Score™ — virality, clarity, idea, curiosity, emotion; One-Click Fix™) | — | ✅ (data-backed patterns) | Part 2, Ph 4 |
| Title generation | ✅ | — | ✅ | Part 2, Ph 4 |
| Mobile / dark-mode legibility | — | — | ✅ | Part 1, Ph 4 |
| Background removal | — | ✅ | ✅ | Optional (see below) |

**The through-line:** every serious tool has converged on *persistent* consistency — a saved face and a saved style — rather than per-request references. That's why it's Part 2's first phase, not a stretch goal. Pikzels' Recreate is the closest existing analogue to what was asked for, and Phase 3 is modelled on it.

### Deliberately out of scope
- Background removal / magic eraser — Nano Banana Pro composes subjects onto new backgrounds directly, so a separate cutout step adds little. Revisit only if composition quality proves insufficient.
- Multi-user accounts, cloud storage, billing. Local-first by design.
- Direct YouTube upload/API integration — the download-and-upload loop is fine, and OAuth is a disproportionate amount of work here.

### Sources
- [Pikzels — AI Thumbnail Maker](https://pikzels.com/)
- [Canva — Free AI Thumbnail Maker](https://www.canva.com/ai-thumbnail-maker/)
- [1of10 — Free AI YouTube Thumbnail Maker](https://1of10.com/thumbnail-generator)
- [10 Best AI Thumbnail Generators for YouTube in 2026 — 1of10](https://1of10.com/blog/best-ai-thumbnail-generator/)
- [Gemini API image generation docs — Google](https://ai.google.dev/gemini-api/docs/image-generation)

---

*Created: 2026-09-05*
*Status: todo*
