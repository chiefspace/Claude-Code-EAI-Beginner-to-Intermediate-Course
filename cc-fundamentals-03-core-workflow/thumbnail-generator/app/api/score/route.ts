import { generateJson, MissingApiKeyError, type ImagePart } from "@/lib/gemini";

export const maxDuration = 60;

export const DIMENSIONS = [
  "clarity",
  "curiosity",
  "emotion",
  "contrast",
  "mobileLegibility",
] as const;

export type Dimension = (typeof DIMENSIONS)[number];
export type Score = { score: number; note: string };
export type ScoreCard = Record<Dimension, Score> & { overall: number };

const SCHEMA = {
  type: "object",
  properties: Object.fromEntries(
    DIMENSIONS.map((d) => [
      d,
      {
        type: "object",
        properties: {
          score: { type: "integer", minimum: 1, maximum: 10 },
          note: { type: "string" },
        },
        required: ["score", "note"],
      },
    ])
  ),
  required: [...DIMENSIONS],
};

const PROMPT = (title: string) =>
  [
    "You are rating a YouTube thumbnail for click-through rate.",
    title.trim() ? `The video title is: "${title.trim()}".` : "There is no title yet.",
    "",
    "Score each dimension from 1 to 10 and give one concrete, specific improvement note",
    "for each — name what to change, not a general principle.",
    "",
    "- clarity: how fast the subject and idea read at a glance.",
    "- curiosity: how strongly it opens an information gap worth clicking.",
    "- emotion: how legible and compelling the emotional signal is.",
    "- contrast: figure/ground separation and colour punch in a crowded feed.",
    "- mobileLegibility: whether it survives being shown 168 pixels wide.",
  ].join("\n");

function clamp(n: unknown): number {
  const value = Math.round(Number(n));
  if (!Number.isFinite(value)) return 1;
  return Math.min(10, Math.max(1, value));
}

export async function POST(req: Request) {
  const form = await req.formData();
  const title = String(form.get("title") ?? "");
  const dataUrl = String(form.get("image") ?? "");

  const match = /^data:(image\/[a-z+]+);base64,(.+)$/i.exec(dataUrl);
  if (!match) {
    return Response.json({ error: "Send the thumbnail as a data URL." }, { status: 400 });
  }

  const part: ImagePart = { inlineData: { mimeType: match[1], data: match[2] } };

  try {
    const raw = await generateJson<Record<string, { score: unknown; note?: unknown }>>(
      PROMPT(title),
      SCHEMA,
      [part]
    );

    const scores = Object.fromEntries(
      DIMENSIONS.map((d) => [
        d,
        {
          score: clamp(raw?.[d]?.score),
          note: typeof raw?.[d]?.note === "string" ? raw[d].note : "No note returned.",
        },
      ])
    ) as Record<Dimension, Score>;

    const overall =
      Math.round(
        (DIMENSIONS.reduce((sum, d) => sum + scores[d].score, 0) / DIMENSIONS.length) * 10
      ) / 10;

    // The lowest score is the one worth acting on first.
    const weakest = DIMENSIONS.reduce((a, b) => (scores[a].score <= scores[b].score ? a : b));

    return Response.json({
      scoreCard: { ...scores, overall },
      topFix: { dimension: weakest, note: scores[weakest].note },
    });
  } catch (err) {
    if (err instanceof MissingApiKeyError) {
      return Response.json({ error: err.message }, { status: 503 });
    }
    return Response.json(
      { error: `Scoring failed: ${err instanceof Error ? err.message : "unknown error"}` },
      { status: 502 }
    );
  }
}
