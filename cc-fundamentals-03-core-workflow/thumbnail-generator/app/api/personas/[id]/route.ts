import { deletePersona, getPersona } from "@/lib/personas";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const persona = getPersona((await params).id);
  if (!persona) return Response.json({ error: "No such persona." }, { status: 404 });
  return Response.json({ persona });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const removed = await deletePersona((await params).id);
  if (!removed) return Response.json({ error: "No such persona." }, { status: 404 });
  return Response.json({ ok: true });
}
