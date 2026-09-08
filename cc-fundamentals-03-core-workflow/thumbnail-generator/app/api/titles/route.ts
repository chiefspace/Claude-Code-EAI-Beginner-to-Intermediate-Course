import { generateJson, MissingApiKeyError, type ImagePart } from "@/lib/gemini";

export const maxDuration = 60;

const SCHEMA = {
  type: "object",
  properties: {
    titles: { type: "array", items: { type: "string" }, minItems: 5, maxItems: 5 },
  },
  required: ["titles"],
};

const PROMPT = (title: string) =>
  [
    "Write 5 YouTube titles for the attached thumbnail.",
    title.trim() ? `The working title is: "${title.trim()}".` : "",
    "",
    "Each must be under 60 characters, match what the thumbnail actually shows, and open a",
    "curiosity gap without overpromising. No clickbait that the video cannot pay off, no",
    "ALL CAPS, no emoji. Vary the angle across the five.",
  ]
    .filter(Boolean)
    .join("\n");

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
    const raw = await generateJson<{ titles?: unknown }>(PROMPT(title), SCHEMA, [part]);
    const titles = Array.isArray(raw?.titles)
      ? raw.titles.filter((t): t is string => typeof t === "string" && t.trim().length > 0)
      : [];

    if (titles.length === 0) {
      return Response.json({ error: "The model returned no titles." }, { status: 502 });
    }
    return Response.json({ titles: titles.slice(0, 5) });
  } catch (err) {
    if (err instanceof MissingApiKeyError) {
      return Response.json({ error: err.message }, { status: 503 });
    }
    return Response.json(
      { error: `Title generation failed: ${err instanceof Error ? err.message : "unknown"}` },
      { status: 502 }
    );
  }
}
