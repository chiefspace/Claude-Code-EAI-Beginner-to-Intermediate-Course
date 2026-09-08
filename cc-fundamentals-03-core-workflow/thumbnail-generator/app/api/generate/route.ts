import { randomUUID } from "node:crypto";
import { generateThumbnail, MissingApiKeyError, type ImagePart } from "@/lib/gemini";
import { normalize } from "@/lib/normalize";
import { DEFAULT_ASPECT_RATIO, isAspectRatio, type NormalizedImage } from "@/lib/spec";
import type { RefOrigin } from "@/lib/models";
import { buildPrompt, buildRefinePrompt, VARIATION_HINTS } from "@/lib/prompt";
import { isRole, type Role } from "@/lib/refs";
import { describeDropped, resolveRefs } from "@/lib/resolveRefs";
import { getPersona } from "@/lib/personas";
import { getStyle } from "@/lib/styles";
import { describeBrandKit, getBrandKit } from "@/lib/brandKit";
import { readImage } from "@/lib/refStore";
import { imageFiles, validateUpload, UploadError } from "@/lib/uploads";

export const maxDuration = 120;

type RouteRef = {
  role: Role;
  origin: RefOrigin;
  label: string;
  load: () => Promise<ImagePart>;
};

function fromFile(file: File, role: Role): RouteRef {
  return {
    role,
    origin: "upload",
    label: file.name,
    load: async () => ({
      inlineData: {
        mimeType: file.type,
        data: Buffer.from(await file.arrayBuffer()).toString("base64"),
      },
    }),
  };
}

function fromStored(
  id: string,
  role: Role,
  origin: RefOrigin,
  label: string
): RouteRef {
  return {
    role,
    origin,
    label,
    load: async () => {
      const image = await readImage(id);
      if (!image) throw new Error(`Saved reference "${label}" is missing from disk.`);
      return {
        inlineData: { mimeType: image.mimeType, data: image.bytes.toString("base64") },
      };
    },
  };
}

function bad(error: string, status = 400) {
  return Response.json({ error }, { status });
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return bad("Could not read the upload. Send multipart/form-data.");
  }

  const title = String(form.get("title") ?? "");
  const presetId = String(form.get("presetId") ?? "clean-tutorial");
  const variations = Math.min(Math.max(Number(form.get("variations") ?? 3) || 3, 1), 6);
  const creativity = Math.min(Math.max(Number(form.get("creativity") ?? 40) || 0, 0), 100);
  const renderText = form.get("renderText") !== "false";
  const refineInstruction = String(form.get("refineInstruction") ?? "").trim();
  const personaId = String(form.get("personaId") ?? "").trim();
  const styleId = String(form.get("styleId") ?? "").trim();
  const rawFormat = String(form.get("format") ?? "");
  const aspectRatio = isAspectRatio(rawFormat) ? rawFormat : DEFAULT_ASPECT_RATIO;

  const files = imageFiles(form);
  const rawRoles = form.getAll("roles").map(String);

  const uploads: RouteRef[] = [];
  try {
    for (const [i, file] of files.entries()) {
      validateUpload(file);
      const role = rawRoles[i];
      uploads.push(fromFile(file, role && isRole(role) ? role : "object"));
    }
  } catch (err) {
    if (err instanceof UploadError) return bad(err.message);
    throw err;
  }

  const brandKit = getBrandKit();
  const persona = personaId ? getPersona(personaId) : null;
  if (personaId && !persona) return bad("That persona no longer exists.", 404);
  const style = styleId ? getStyle(styleId) : null;
  if (styleId && !style) return bad("That style no longer exists.", 404);

  const { refs, dropped } = resolveRefs<RouteRef>({
    uploads,
    persona: persona?.images.map((image) =>
      fromStored(image.id, "character", "persona", `${persona.name} face`)
    ),
    style: style?.images.map((image) =>
      fromStored(image.id, "style", "style", `${style.name} style`)
    ),
  });

  if (refs.length === 0 && !title.trim()) {
    return bad("Add at least one reference image or a headline to generate from.");
  }

  let imageParts: ImagePart[];
  try {
    imageParts = await Promise.all(refs.map((ref) => ref.load()));
  } catch (err) {
    return bad(err instanceof Error ? err.message : "A saved reference could not be read.", 500);
  }

  const roles = refs.map((r) => r.role);
  const notices = describeDropped(refs, dropped);
  const results: NormalizedImage[] = [];
  const failures: string[] = [];

  try {
    for (let i = 0; i < variations; i++) {
      const prompt = refineInstruction
        ? buildRefinePrompt(refineInstruction)
        : `${buildPrompt(presetId, title, roles, {
            creativity,
            renderText,
            personaNote: persona?.note,
            styleDescription: style?.description,
            brand: describeBrandKit(brandKit),
          })}\n\n${VARIATION_HINTS[i % VARIATION_HINTS.length]}`;

      const image = await generateThumbnail(prompt, imageParts, aspectRatio);
      if (image) {
        results.push(await normalize(image.data, aspectRatio));
      } else {
        failures.push(`Variation ${i + 1} returned no image (it may have been filtered).`);
      }
    }
  } catch (err) {
    if (err instanceof MissingApiKeyError) return bad(err.message, 503);
    const message = err instanceof Error ? err.message : "Unknown error";
    // Partial success is still useful — return what we generated alongside the error.
    if (results.length > 0) {
      return Response.json({
        results,
        requestId: randomUUID(),
        warnings: [...notices, ...failures, message],
      });
    }
    return bad(`Generation failed: ${message}`, 502);
  }

  if (results.length === 0) {
    return bad(
      failures[0] ?? "The model returned no images. Try rephrasing the headline or preset.",
      502
    );
  }

  return Response.json({
    results,
    requestId: randomUUID(),
    warnings: [...notices, ...failures],
  });
}
