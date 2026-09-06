# Session Handoff - 2026-09-06

## Context

Planned and built Part 1 of the YouTube thumbnail generator — a Next.js app that turns uploaded
reference images (faces, logos, style refs) into identity-consistent 16:9 thumbnails using Nano
Banana Pro (`gemini-3-pro-image`). Supersedes handoff 001, which covered the original single-file
spec from June.

## Completed

- **Re-researched the market** (Pikzels, Canva, 1of10) and rewrote the plan. Two corrections to the
  June draft: reference limits are **14 total (5 character / 6 object / 3 style)**, not 6 total; and
  the June spec missed that every serious competitor now sells *persistent* consistency (a saved
  face and a saved style) rather than per-request references.
- **Split the plan in two** — the consistency features are a whole second app surface:
  - `specs/done/01-thumbnail-generator-core.md` — built.
  - `specs/todo/02-thumbnail-generator-consistency-features.md` — not started.
- Retired the old `specs/todo/youtube-thumbnail-generator-nano-banana-pro.md` (recoverable in git
  history at `c38b2b5` and earlier).
- **Built all 4 phases of Part 1** in `thumbnail-generator/`: typed reference uploads with
  server-side per-role caps, 5 style presets, 1–6 variations, consistency-vs-creativity control,
  `sharp` normalization to exactly 1280×720 JPEG under 2MB, per-result download, conversational
  refine, canvas text-overlay fallback, and a 168px feed-size legibility preview.
- 29 tests passing (vitest, Gemini mocked). Lint clean. Production build green.
- Verified the whole pipeline in a real browser via Playwright: upload → role tagging → generate →
  results grid → feed preview → text overlay → refine. No console errors.
- Committed as `6516d70` on branch **`thumbnail-generator-core`** (40 files).

## In Progress

Nothing mid-edit. The working tree is clean and the build is green.

The one open thread is that the branch has **not been merged to `main`**. Every prior commit in this
repo went straight to main, so this branch is probably just an artifact of how the commit was made
rather than something intentional.

## Next Steps

1. **Merge the branch** (or confirm you want it kept separate):
   ```bash
   git checkout main && git merge thumbnail-generator-core && git branch -d thumbnail-generator-core
   ```
2. **Get a real API key in and do a visual pass.** This is the important one — see Blockers.
   ```bash
   cd thumbnail-generator
   echo "GOOGLE_API_KEY=..." > .env.local   # https://aistudio.google.com/apikey
   npm run dev
   ```
   Then work the manual checklist in `specs/done/01-thumbnail-generator-core.md` — especially
   whether a real selfie comes back recognisably the same person, and whether the headline renders
   spelled correctly.
3. **Build Part 2**: `/EA-build specs/todo/02-thumbnail-generator-consistency-features.md` —
   Personas, Styles, Recreate, scoring. Phase 1 there (the persistence layer and reference
   resolver) is the load-bearing piece.

## Key Files

- `thumbnail-generator/lib/gemini.ts` — the single place any model call happens. Model id, 16:9,
  2K config all live here. Fix SDK drift here and nowhere else.
- `thumbnail-generator/lib/refs.ts` — per-role caps (5/6/3, 14 total) and reference ordering.
  Part 2 replaces this with a resolver that merges saved personas and styles into the same budget.
- `thumbnail-generator/lib/prompt.ts` — prompt composition, reference-role descriptions, the
  consistency-vs-creativity language, and the 6 variation hints.
- `thumbnail-generator/lib/spec.ts` — YouTube dimension constants, deliberately free of server-only
  imports (see Blockers).
- `thumbnail-generator/lib/normalize.ts` — `sharp` quality ladder targeting <2MB at 1280×720.
- `thumbnail-generator/app/api/generate/route.ts` — validation, caps, generation loop, refine path.
- `thumbnail-generator/app/page.tsx` — all client state; the refine round-trip lives here.
- `thumbnail-generator/tests/` — 4 files, 29 tests. `generate-route.test.ts` mocks `@google/genai`.
- `thumbnail-generator/README.md` — setup and the reference-tag table.

## Blockers / Notes

- **Generation quality is unverified.** There was no `GOOGLE_API_KEY` anywhere on the machine, so no
  real Gemini call was ever made. The pipeline was proven by temporarily stubbing the model
  response in `lib/gemini.ts`; that stub was reverted and the file is back to the real
  implementation. Everything except the model call itself is confirmed working. Identity
  consistency, text rendering accuracy, and whether the presets actually look good are all still
  open questions.
- **Bug found and fixed during the build**: `TextOverlay.tsx` imported dimension constants from
  `lib/normalize.ts`, which pulled `sharp` (a native server module) into the client bundle and broke
  `next build`. Constants now live in `lib/spec.ts`. Keep client components off `lib/normalize.ts` —
  import types and constants from `lib/spec.ts` instead.
- **Known UX rough edge, deliberately not fixed**: "Refine this one" replaces the entire result set
  with the single refined image, discarding the other variations you paid for. This matches what the
  spec described, so it was built as written. Worth adding result history before real use.
- `@types/node` was bumped 20 → 22 to match the actual Node runtime; the create-next-app pin
  conflicted with vitest's peer range.
- `vitest.config.mts` must keep the `.mts` extension — the project has no `"type": "module"`, so a
  `.ts` config gets loaded as CommonJS and fails on ESM-only deps.
- Vitest 5 needs `@rolldown/binding-darwin-arm64`, which npm did not install automatically. It is
  now an explicit devDependency. A fresh `npm install` on a different platform may need the
  equivalent binding for that architecture.
