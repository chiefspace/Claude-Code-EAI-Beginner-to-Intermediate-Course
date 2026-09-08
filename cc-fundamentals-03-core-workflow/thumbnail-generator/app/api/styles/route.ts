import { createStyle, listStyles } from "@/lib/styles";
import { STYLE_MAX_IMAGES } from "@/lib/models";
import { imageFiles, toImageInputs, UploadError } from "@/lib/uploads";

export async function GET() {
  return Response.json({ styles: listStyles() });
}

export async function POST(req: Request) {
  const form = await req.formData();
  const name = String(form.get("name") ?? "").trim();
  const files = imageFiles(form);

  if (!name) return Response.json({ error: "Give the style a name." }, { status: 400 });
  if (files.length === 0 || files.length > STYLE_MAX_IMAGES) {
    return Response.json(
      { error: `Add between 1 and ${STYLE_MAX_IMAGES} thumbnails.` },
      { status: 400 }
    );
  }

  try {
    const { style, warning } = await createStyle({
      name,
      images: await toImageInputs(files),
      description: String(form.get("description") ?? ""),
    });
    return Response.json(
      { style, warnings: warning ? [warning] : [] },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof UploadError) {
      return Response.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }
}
