import { createPersona, listPersonas } from "@/lib/personas";
import { PERSONA_MAX_IMAGES, PERSONA_MIN_IMAGES } from "@/lib/models";
import { imageFiles, toImageInputs, UploadError } from "@/lib/uploads";

export async function GET() {
  return Response.json({ personas: listPersonas() });
}

export async function POST(req: Request) {
  const form = await req.formData();
  const name = String(form.get("name") ?? "").trim();
  const files = imageFiles(form);

  if (!name) return Response.json({ error: "Give the persona a name." }, { status: 400 });
  if (files.length === 0 || files.length > PERSONA_MAX_IMAGES) {
    return Response.json(
      { error: `Add between 1 and ${PERSONA_MAX_IMAGES} photos.` },
      { status: 400 }
    );
  }

  try {
    const { persona, warning } = await createPersona({
      name,
      images: await toImageInputs(files),
      note: String(form.get("note") ?? ""),
    });
    // Below 3 photos identity consistency degrades, but it still works — warn, don't block.
    const warnings = [
      files.length < PERSONA_MIN_IMAGES
        ? `Only ${files.length} photo(s). Add ${PERSONA_MIN_IMAGES}+ from varied angles and lighting for reliable likeness.`
        : null,
      warning ?? null,
    ].filter((w): w is string => w !== null);

    return Response.json({ persona, warnings }, { status: 201 });
  } catch (err) {
    if (err instanceof UploadError) {
      return Response.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }
}
