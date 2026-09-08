import { deleteStyle, getStyle, updateStyleDescription } from "@/lib/styles";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const style = getStyle((await params).id);
  if (!style) return Response.json({ error: "No such style." }, { status: 404 });
  return Response.json({ style });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const body = await req.json().catch(() => null);
  if (typeof body?.description !== "string") {
    return Response.json({ error: "Send a description string." }, { status: 400 });
  }
  const style = updateStyleDescription((await params).id, body.description);
  if (!style) return Response.json({ error: "No such style." }, { status: 404 });
  return Response.json({ style });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const removed = await deleteStyle((await params).id);
  if (!removed) return Response.json({ error: "No such style." }, { status: 404 });
  return Response.json({ ok: true });
}
