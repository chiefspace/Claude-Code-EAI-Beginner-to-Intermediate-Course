import { hasApiKey, IMAGE_MODEL } from "@/lib/gemini";

export async function GET() {
  return Response.json({ ok: true, keyPresent: hasApiKey(), model: IMAGE_MODEL });
}
