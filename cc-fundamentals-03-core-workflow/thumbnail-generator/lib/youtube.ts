/** Video-ID parsing and thumbnail fetching for the Recreate flow. */

const ID = /^[A-Za-z0-9_-]{11}$/;

/** Accepts a bare id, a watch URL, a youtu.be short link, or a /shorts/ or /embed/ URL. */
export function parseVideoId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (ID.test(trimmed)) return trimmed;

  let url: URL;
  try {
    url = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "");

  if (host === "youtu.be") {
    const id = url.pathname.slice(1).split("/")[0];
    return ID.test(id) ? id : null;
  }

  if (host !== "youtube.com" && host !== "m.youtube.com" && host !== "music.youtube.com") {
    return null;
  }

  const v = url.searchParams.get("v");
  if (v && ID.test(v)) return v;

  const [, section, id] = url.pathname.split("/");
  if ((section === "shorts" || section === "embed" || section === "live") && ID.test(id ?? "")) {
    return id;
  }

  return null;
}

/** Highest quality first — not every video has a maxres or sd thumbnail. */
export const THUMBNAIL_QUALITIES = ["maxresdefault", "sddefault", "hqdefault"] as const;

export function thumbnailUrls(videoId: string): string[] {
  return THUMBNAIL_QUALITIES.map((q) => `https://img.youtube.com/vi/${videoId}/${q}.jpg`);
}

export class ThumbnailFetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ThumbnailFetchError";
  }
}

/**
 * Walks the quality ladder. A missing thumbnail 404s, but YouTube also answers some
 * misses with a placeholder served as HTML — both must fail rather than reach the model.
 */
export async function fetchThumbnail(
  videoId: string
): Promise<{ bytes: Buffer; mimeType: string }> {
  for (const url of thumbnailUrls(videoId)) {
    const res = await fetch(url);
    if (!res.ok) continue;

    const mimeType = res.headers.get("content-type") ?? "";
    if (!mimeType.startsWith("image/")) continue;

    const bytes = Buffer.from(await res.arrayBuffer());
    if (bytes.byteLength === 0) continue;
    return { bytes, mimeType };
  }

  throw new ThumbnailFetchError(
    "No thumbnail could be fetched for that video. Check the link, or upload the image instead."
  );
}
