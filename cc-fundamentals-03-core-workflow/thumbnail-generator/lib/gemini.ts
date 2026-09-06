import { GoogleGenAI } from "@google/genai";

export const IMAGE_MODEL = "gemini-3-pro-image";

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
  imageParts: ImagePart[]
): Promise<{ data: string; mimeType: string } | null> {
  const res = await getClient().models.generateContent({
    model: IMAGE_MODEL,
    contents: [{ role: "user", parts: [{ text: prompt }, ...imageParts] }],
    config: {
      responseModalities: ["TEXT", "IMAGE"],
      imageConfig: { aspectRatio: "16:9", imageSize: "2K" },
    },
  });

  const part = res.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!part?.inlineData?.data) return null;
  return {
    data: part.inlineData.data,
    mimeType: part.inlineData.mimeType ?? "image/png",
  };
}
