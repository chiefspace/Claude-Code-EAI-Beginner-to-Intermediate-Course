import { randomUUID } from "node:crypto";
import { generateThumbnail, MissingApiKeyError, type ImagePart } from "@/lib/gemini";
import { normalize } from "@/lib/normalize";
import type { NormalizedImage } from "@/lib/spec";
import { buildPrompt, buildRefinePrompt, VARIATION_HINTS } from "@/lib/prompt";
import { isRole, orderAndValidate, RefLimitError, type Role } from "@/lib/refs";

export const maxDuration = 120;

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

type Ref = { role: Role; file: File };

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

  const files = form.getAll("images").filter((f): f is File => f instanceof File);
  const rawRoles = form.getAll("roles").map(String);

  const refs: Ref[] = [];
  for (const [i, file] of files.entries()) {
    if (file.size > MAX_UPLOAD_BYTES) {
      return bad(`"${file.name}" is larger than 10MB.`);
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return bad(`"${file.name}" is not a JPEG, PNG, or WebP.`);
    }
    const role = rawRoles[i];
    refs.push({ role: role && isRole(role) ? role : "object", file });
  }

  let ordered: Ref[];
  try {
    ordered = orderAndValidate(refs);
  } catch (err) {
    if (err instanceof RefLimitError) return bad(err.message);
    throw err;
  }

  if (ordered.length === 0 && !title.trim()) {
    return bad("Add at least one reference image or a headline to generate from.");
  }

  const imageParts: ImagePart[] = await Promise.all(
    ordered.map(async ({ file }) => ({
      inlineData: {
        mimeType: file.type,
        data: Buffer.from(await file.arrayBuffer()).toString("base64"),
      },
    }))
  );

  const roles = ordered.map((r) => r.role);
  const results: NormalizedImage[] = [];
  const failures: string[] = [];

  try {
    for (let i = 0; i < variations; i++) {
      const prompt = refineInstruction
        ? buildRefinePrompt(refineInstruction)
        : `${buildPrompt(presetId, title, roles, { creativity, renderText })}\n\n${
            VARIATION_HINTS[i % VARIATION_HINTS.length]
          }`;

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
    // Partial success is still useful — return what we generated alongside the error.
    if (results.length > 0) {
      return Response.json({
        results,
        requestId: randomUUID(),
        warnings: [...failures, message],
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

  return Response.json({ results, requestId: randomUUID(), warnings: failures });
}
