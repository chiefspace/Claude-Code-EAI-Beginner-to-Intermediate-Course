import { getPreset } from "@/lib/presets";
import type { Role } from "@/lib/refs";

export type BuildPromptOptions = {
  /** 0 = lock hard to the references, 100 = let the model reinterpret freely. */
  creativity?: number;
  /** Renders the headline into the image. Off when the canvas overlay is used instead. */
  renderText?: boolean;
};

export const VARIATION_HINTS = [
  "Frame the subject close and centred, headline on the lower third.",
  "Frame the subject off to one side, headline filling the opposite side.",
  "Pull back for a wider establishing shot, headline across the top.",
  "Use a low dramatic camera angle with the headline tight beside the subject.",
  "Use a bold single-colour background with the subject cut out sharply against it.",
  "Split the frame into a before/after or versus composition.",
];

function describeReferences(roles: Role[]): string {
  if (roles.length === 0) return "";

  const lines = roles.map((role, i) => {
    const n = i + 1;
    if (role === "character")
      return `- Image ${n}: a person. Reproduce this person's face and identity exactly — same facial structure, hair, and skin tone.`;
    if (role === "object")
      return `- Image ${n}: an object, logo, or icon. Reproduce it faithfully, without distorting or restyling it.`;
    return `- Image ${n}: a style reference. Borrow its colour palette, lighting, and composition only. Do not copy its subject or any text.`;
  });

  return `\n\nReference images, in order:\n${lines.join("\n")}`;
}

function describeConsistency(creativity: number, hasCharacter: boolean): string {
  if (!hasCharacter) return "";
  if (creativity <= 33)
    return "\n\nIdentity is the highest priority. The person must be immediately recognisable as the same individual in the reference. Change the scene, not the face.";
  if (creativity <= 66)
    return "\n\nKeep the person clearly recognisable while adapting their pose, expression, and lighting to suit the composition.";
  return "\n\nKeep a clear family resemblance to the reference, but reinterpret pose, expression, and styling freely for the strongest possible composition.";
}

export function buildPrompt(
  presetId: string,
  title: string,
  roles: Role[],
  opts: BuildPromptOptions = {}
): string {
  const { creativity = 40, renderText = true } = opts;
  const preset = getPreset(presetId);
  const trimmedTitle = title.trim();

  const headline =
    renderText && trimmedTitle
      ? `\n\nRender this exact headline text on the image: "${trimmedTitle}". Spell it exactly as written. Use a heavy bold sans-serif, very large, with a strong outline or drop shadow so it stays legible when the image is scaled down to 168 pixels wide. Do not add any other text, captions, watermarks, or logos.`
      : "\n\nDo not render any text on the image. Leave clean, uncluttered space where a headline can be placed later.";

  return [
    "Create a YouTube thumbnail image, 16:9 landscape.",
    preset.fragment,
    describeReferences(roles),
    describeConsistency(creativity, roles.includes("character")),
    headline,
    "\n\nThe composition must read clearly at small sizes: one obvious focal point, strong contrast, and no fine detail that disappears when scaled down.",
  ].join("");
}

export function buildRefinePrompt(instruction: string): string {
  return [
    "Edit the attached YouTube thumbnail according to the instruction below.",
    "Keep the same person, their identity and facial features, the same overall composition, and the same style unless the instruction explicitly asks to change them.",
    "Keep the image 16:9 landscape.",
    `\n\nInstruction: ${instruction.trim()}`,
  ].join(" ");
}
