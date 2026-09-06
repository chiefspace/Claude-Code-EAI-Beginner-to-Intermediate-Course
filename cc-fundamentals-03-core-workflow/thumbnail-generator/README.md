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
npm test        # 29 unit + integration tests, Gemini mocked
npm run lint
```
