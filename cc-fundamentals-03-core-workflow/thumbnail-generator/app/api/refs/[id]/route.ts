import { readImage } from "@/lib/refStore";

/** Serves stored reference images so the UI can preview them by id. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const image = await readImage((await params).id);
  if (!image) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(image.bytes), {
    headers: {
      "Content-Type": image.mimeType,
      "Cache-Control": "private, max-age=31536000, immutable",
    },
  });
}
