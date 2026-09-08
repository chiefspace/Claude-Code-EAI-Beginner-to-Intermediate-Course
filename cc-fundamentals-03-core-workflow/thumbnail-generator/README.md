# YouTube Thumbnail Generator

Generates identity-consistent 16:9 YouTube thumbnails from your own reference images using
**Nano Banana Pro** (`gemini-3-pro-image`).

Built from `specs/done/01-thumbnail-generator-core.md`.

## Setup

```bash
npm install
echo "GOOGLE_API_KEY=your-key-here" > .env.local   # get one at https://aistudio.google.com/apikey
npm run dev
```

Open http://localhost:3000. `GET /api/health` reports whether the key was picked up.

## How it works

Upload reference images and tag each one, because the model treats the three kinds differently:

| Tag | Max | What the model does with it |
|---|---|---|
| **Person** | 5 | Locks facial identity — same face across every output |
| **Object / logo** | 6 | Reproduces it faithfully without restyling |
| **Style reference** | 3 | Borrows palette, lighting, and composition only |

Fourteen references total. Anything over a cap is rejected with a message naming the limit.

Pick a preset, write a headline (six words or fewer renders most reliably), and generate. Each
run produces up to 6 variations — 3 by default, which is what a YouTube A/B test takes.

Every result is normalised to exactly 1280×720 JPEG under 2MB, so it is always a valid upload.

## Per-result actions

- **Download** — YouTube-ready file.
- **Refine this one** — resubmits that image with a plain-language edit instruction, keeping the
  subject's identity. Note this replaces the current result set.
- **Add text myself** — a canvas layer for when the headline has to be spelled and placed exactly.
  Use it with the "let the model render the headline" checkbox turned off.

The **feed-size preview** next to each result shows it at 168px, roughly how it appears on mobile.
If the headline is unreadable there, it is unreadable on YouTube.

## Costs and caveats

Roughly $0.134 per image, so a default 3-variation run is about $0.40. The session counter on the
page tracks the running total. All outputs carry an invisible SynthID watermark; this does not
affect YouTube usage.

## Commands

```bash
npm run dev     # dev server
npm run build   # production build (also typechecks)
npm test        # 83 unit + integration tests, Gemini mocked
npm run lint
```

## Saved personas and styles

Personas (a saved face) and Styles (a saved channel look) persist in SQLite at `.data/app.db`,
with their reference images as files under `.data/refs/`. Both are gitignored — delete `.data/`
to reset. Point `THUMBNAIL_DATA_DIR` elsewhere to use a different store.

A persona or style selected on the generate page is merged with that request's uploads by
`lib/resolveRefs.ts`, which keeps the combined set inside the model's caps (5 character,
6 object, 3 style, 14 total). Uploads outrank saved references, and anything that does not fit
is dropped and reported in the response `warnings` rather than raising an error.

> **`better-sqlite3` is pinned to v11.** The v13 prebuilt binary segfaults (SIGSEGV) on
> Node v22.3.0, which is what this machine runs; v11's prebuild works. If you upgrade to
> Node 22.12+ you can move back to v13.

## Recreate

Paste a YouTube link (or upload a thumbnail) on the **Recreate** tab. The reference is never
handed to the image model. It is first sent to a text model for a structured composition
breakdown — subject placement, framing, expression, palette, text treatment, background — which
you can edit before rebuilding. That indirection is the point: it carries over the *format*, and
the describe prompt explicitly excludes the original's identity and brand marks. Recreating needs
a persona selected, so the face in the output is yours.

## Packaging

Each result can be scored 1–10 on clarity, curiosity, emotion, contrast, and mobile legibility,
each with a concrete fix; **Apply top fix** feeds the weakest dimension's note back through the
refine loop. **Titles** generates five matched titles. The **Brand kit** page holds channel
colours, a lettering description, and the default persona and style — the colours and lettering
are injected into every prompt.

Output format is selectable per run: 16:9 thumbnail, 9:16 Shorts cover, or 1:1.

## Models

| Purpose | Model |
| --- | --- |
| Image generation | `gemini-3-pro-image` |
| Descriptions, composition breakdown, scoring, titles | `gemini-3.6-flash` |

Both are set in `lib/gemini.ts` and nowhere else. Note there is **no** `gemini-3-pro` text model —
`ListModels` was checked; the flash tier is the correct home for the text tasks anyway.
