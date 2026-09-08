import { getBrandKit, saveBrandKit } from "@/lib/brandKit";

export async function GET() {
  return Response.json({ brandKit: getBrandKit() });
}

export async function PUT(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return Response.json({ error: "Send a brand kit object." }, { status: 400 });
  }
  return Response.json({ brandKit: saveBrandKit(body) });
}
