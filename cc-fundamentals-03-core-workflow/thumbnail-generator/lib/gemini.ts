import { GoogleGenAI } from "@google/genai";
import { DEFAULT_ASPECT_RATIO, type AspectRatio } from "@/lib/spec";

export const IMAGE_MODEL = "gemini-3-pro-image";
// Verified against ListModels: there is no plain "gemini-3-pro". Flash is the right
// tier for describing references and scoring anyway.
export const TEXT_MODEL = "gemini-3.6-flash";

export function hasApiKey(): boolean {
  return Boolean(process.env.GOOGLE_API_KEY?.trim());
}

let client: GoogleGenAI | null = null;

export function getClient(): GoogleGenAI {
  if (!hasApiKey()) {
    throw new MissingApiKeyError();
  }
  client ??= new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });
  return client;
}

export class MissingApiKeyError extends Error {
  constructor() {
    super("GOOGLE_API_KEY is not set. Add it to .env.local and restart the dev server.");
    this.name = "MissingApiKeyError";
  }
}

export type ImagePart = { inlineData: { mimeType: string; data: string } };

export async function generateThumbnail(
  prompt: string,
  imageParts: ImagePart[],
  aspectRatio: AspectRatio = DEFAULT_ASPECT_RATIO
): Promise<{ data: string; mimeType: string } | null> {
  const res = await getClient().models.generateContent({
    model: IMAGE_MODEL,
    contents: [{ role: "user", parts: [{ text: prompt }, ...imageParts] }],
    config: {
      responseModalities: ["TEXT", "IMAGE"],
      imageConfig: { aspectRatio, imageSize: "2K" },
    },
  });

  const part = res.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!part?.inlineData?.data) return null;
  return {
    data: part.inlineData.data,
    mimeType: part.inlineData.mimeType ?? "image/png",
  };
}

/** Text-only call used to describe personas, styles, and compositions. */
export async function generateText(
  prompt: string,
  imageParts: ImagePart[] = []
): Promise<string> {
  const res = await getClient().models.generateContent({
    model: TEXT_MODEL,
    contents: [{ role: "user", parts: [{ text: prompt }, ...imageParts] }],
  });
  return res.text?.trim() ?? "";
}

/**
 * Structured output. A schema is requested, but models still occasionally wrap JSON in
 * prose or a code fence, so the response is parsed defensively rather than trusted.
 */
export async function generateJson<T>(
  prompt: string,
  schema: Record<string, unknown>,
  imageParts: ImagePart[] = []
): Promise<T> {
  const res = await getClient().models.generateContent({
    model: TEXT_MODEL,
    contents: [{ role: "user", parts: [{ text: prompt }, ...imageParts] }],
    config: { responseMimeType: "application/json", responseSchema: schema },
  });
  return parseJson<T>(res.text ?? "");
}

export function parseJson<T>(raw: string): T {
  const text = raw.trim();
  const candidates = [
    text,
    text.replace(/^```(?:json)?\s*/i, "").replace(/```$/i, ""),
    text.slice(text.search(/[[{]/), Math.max(text.lastIndexOf("}"), text.lastIndexOf("]")) + 1),
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      return JSON.parse(candidate) as T;
    } catch {
      continue;
    }
  }
  throw new Error("The model did not return usable JSON.");
}
