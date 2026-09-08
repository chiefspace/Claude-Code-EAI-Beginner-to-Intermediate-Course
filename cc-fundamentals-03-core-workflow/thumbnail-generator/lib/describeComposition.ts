import { generateText, type ImagePart } from "@/lib/gemini";

/**
 * Describe-then-rebuild. The reference thumbnail is never passed to the image model —
 * only this text breakdown is. That indirection is what makes Recreate a recreation of
 * the *format* rather than a copy of the image, and it is where identity and brand marks
 * are deliberately excluded.
 */
const PROMPT = [
  "Analyse this YouTube thumbnail and describe only its reusable composition pattern,",
  "so a different creator can rebuild the same layout with their own subject and branding.",
  "",
  "Cover, as short labelled lines:",
  "- Subject placement: where the person sits in frame, at what scale, facing which way.",
  "- Camera framing: shot size and angle.",
  "- Expression and energy: the emotion being performed.",
  "- Colour palette: dominant colours and how they are divided across the frame.",
  "- Text treatment: where any headline sits, its weight, case, and colour.",
  "- Background treatment: depth, props, and separation from the subject.",
  "",
  "Hard exclusions. Do not describe or name the specific person, their face, or any",
  "identifying features. Do not describe or name any logo, watermark, channel, or brand",
  "mark. Do not transcribe the headline text. Describe structure only, never identity.",
].join("\n");

export async function describeComposition(image: {
  bytes: Buffer;
  mimeType: string;
}): Promise<string> {
  const part: ImagePart = {
    inlineData: { mimeType: image.mimeType, data: image.bytes.toString("base64") },
  };
  return generateText(PROMPT, [part]);
}

/** Wraps a breakdown (generated or creator-edited) as the scaffold for a new thumbnail. */
export function buildRecreatePrompt(breakdown: string, title: string): string {
  const headline = title.trim();
  return [
    "Create a YouTube thumbnail image, 16:9 landscape, that follows the composition",
    "pattern described below. Use the supplied reference images for the subject and style —",
    "the person must be the one in the character references, not anyone else.",
    "",
    "Composition to follow:",
    breakdown.trim(),
    "",
    headline
      ? `Render this exact headline text: "${headline}". Spell it exactly as written, in a heavy bold sans-serif, large enough to read at 168 pixels wide.`
      : "Do not render any text on the image. Leave clean space where a headline can be placed later.",
    "",
    "Follow the layout, framing, palette, and energy of the description. Do not reproduce",
    "any logo, watermark, or brand mark from the original.",
  ].join("\n");
}
