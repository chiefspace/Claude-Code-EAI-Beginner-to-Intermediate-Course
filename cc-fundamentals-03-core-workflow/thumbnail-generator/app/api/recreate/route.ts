import { randomUUID } from "node:crypto";
import { generateThumbnail, MissingApiKeyError, type ImagePart } from "@/lib/gemini";
import { normalize } from "@/lib/normalize";
import type { NormalizedImage } from "@/lib/spec";
import { buildRecreatePrompt, describeComposition } from "@/lib/describeComposition";
import { fetchThumbnail, parseVideoId, ThumbnailFetchError } from "@/lib/youtube";
import { describeDropped, resolveRefs } from "@/lib/resolveRefs";
import type { Role } from "@/lib/refs";
import { getPersona } from "@/lib/personas";
import { getStyle } from "@/lib/styles";
import { readImage } from "@/lib/refStore";
import { imageFiles, validateUpload, UploadError } from "@/lib/uploads";

export const maxDuration = 120;

type StoredRef = { role: Role; id: string; label: string };

function bad(error: string, status = 400) {
  return Response.json({ error }, { status });
}

/** Step 1 fetches the reference and describes it; step 2 rebuilds from that description. */
export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return bad("Could not read the upload. Send multipart/form-data.");
  }

  const breakdown = String(form.get("breakdown") ?? "").trim();
  const title = String(form.get("title") ?? "");
  const url = String(form.get("url") ?? "").trim();
  const personaId = String(form.get("personaId") ?? "").trim();
  const styleId = String(form.get("styleId") ?? "").trim();
  const variations = Math.min(Math.max(Number(form.get("variations") ?? 1) || 1, 1), 6);

  // --- Step 1: describe the reference ---
  if (!breakdown) {
    let source: { bytes: Buffer; mimeType: string };

    const [upload] = imageFiles(form, "reference");
    if (upload) {
      try {
        validateUpload(upload);
      } catch (err) {
        if (err instanceof UploadError) return bad(err.message);
        throw err;
      }
      source = {
        bytes: Buffer.from(await upload.arrayBuffer()),
        mimeType: upload.type,
      };
    } else {
      const videoId = parseVideoId(url);
      if (!videoId) {
        return bad("Paste a YouTube link or upload a thumbnail image to recreate.");
      }
      try {
        source = await fetchThumbnail(videoId);
      } catch (err) {
        if (err instanceof ThumbnailFetchError) return bad(err.message, 404);
        throw err;
      }
    }

    try {
      const description = await describeComposition(source);
      if (!description) {
        return bad("The model returned no composition breakdown. Try another image.", 502);
      }
      return Response.json({
        breakdown: description,
        source: `data:${source.mimeType};base64,${source.bytes.toString("base64")}`,
      });
    } catch (err) {
      if (err instanceof MissingApiKeyError) return bad(err.message, 503);
      return bad(
        `Could not describe that thumbnail: ${err instanceof Error ? err.message : "unknown error"}`,
        502
      );
    }
  }

  // --- Step 2: rebuild the composition with the creator's own persona and style ---
  const persona = personaId ? getPersona(personaId) : null;
  if (personaId && !persona) return bad("That persona no longer exists.", 404);
  const style = styleId ? getStyle(styleId) : null;
  if (styleId && !style) return bad("That style no longer exists.", 404);

  const { refs, dropped } = resolveRefs<StoredRef>({
    persona: persona?.images.map((image) => ({
      role: "character" as const,
      id: image.id,
      label: `${persona.name} face`,
    })),
    style: style?.images.map((image) => ({
      role: "style" as const,
      id: image.id,
      label: `${style.name} style`,
    })),
  });

  if (refs.length === 0) {
    return bad("Pick a persona so the recreation uses your own face, not the original's.");
  }

  let imageParts: ImagePart[];
  try {
    imageParts = await Promise.all(
      refs.map(async (ref) => {
        const image = await readImage(ref.id);
        if (!image) throw new Error(`Saved reference "${ref.label}" is missing from disk.`);
        return {
          inlineData: { mimeType: image.mimeType, data: image.bytes.toString("base64") },
        };
      })
    );
  } catch (err) {
    return bad(err instanceof Error ? err.message : "A saved reference could not be read.", 500);
  }

  const prompt = buildRecreatePrompt(breakdown, title);
  const results: NormalizedImage[] = [];
  const failures: string[] = [];

  try {
    for (let i = 0; i < variations; i++) {
      const image = await generateThumbnail(prompt, imageParts);
      if (image) {
        results.push(await normalize(image.data));
      } else {
        failures.push(`Variation ${i + 1} returned no image (it may have been filtered).`);
      }
    }
  } catch (err) {
    if (err instanceof MissingApiKeyError) return bad(err.message, 503);
    const message = err instanceof Error ? err.message : "Unknown error";
    if (results.length > 0) {
      return Response.json({
        results,
        requestId: randomUUID(),
        warnings: [...describeDropped(refs, dropped), ...failures, message],
      });
    }
    return bad(`Recreate failed: ${message}`, 502);
  }

  if (results.length === 0) {
    return bad(failures[0] ?? "The model returned no images.", 502);
  }

  return Response.json({
    results,
    requestId: randomUUID(),
    warnings: [...describeDropped(refs, dropped), ...failures],
  });
}
