import { randomUUID } from "node:crypto";
import { readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { getDb, refsDir } from "@/lib/db";
import type { StoredImage } from "@/lib/models";

/** Server-only. On-disk reference images shared by the persona and style stores. */

export type OwnerType = "persona" | "style";

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export type ImageInput = { bytes: Buffer; mimeType: string };

type Row = { id: string; filename: string; mime_type: string };

function toStoredImage(row: Row): StoredImage {
  return { id: row.id, mimeType: row.mime_type, url: `/api/refs/${row.id}` };
}

export function imagePath(filename: string): string {
  return path.join(refsDir(), filename);
}

export async function saveImages(
  ownerType: OwnerType,
  ownerId: string,
  images: ImageInput[]
): Promise<StoredImage[]> {
  const now = new Date().toISOString();
  const rows: (Row & { position: number })[] = images.map((image, position) => {
    const id = randomUUID();
    return {
      id,
      filename: `${id}.${EXTENSIONS[image.mimeType] ?? "bin"}`,
      mime_type: image.mimeType,
      position,
    };
  });

  await Promise.all(
    rows.map((row, i) => writeFile(imagePath(row.filename), images[i].bytes))
  );

  const insert = getDb().prepare(
    `INSERT INTO ref_images (id, owner_type, owner_id, filename, mime_type, position, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  for (const row of rows) {
    insert.run(row.id, ownerType, ownerId, row.filename, row.mime_type, row.position, now);
  }

  return rows.map(toStoredImage);
}

export function listImages(ownerType: OwnerType, ownerId: string): StoredImage[] {
  const rows = getDb()
    .prepare(
      `SELECT id, filename, mime_type FROM ref_images
       WHERE owner_type = ? AND owner_id = ? ORDER BY position`
    )
    .all(ownerType, ownerId) as Row[];
  return rows.map(toStoredImage);
}

export async function deleteImages(ownerType: OwnerType, ownerId: string): Promise<void> {
  const db = getDb();
  const rows = db
    .prepare(`SELECT filename FROM ref_images WHERE owner_type = ? AND owner_id = ?`)
    .all(ownerType, ownerId) as { filename: string }[];

  // Unlink before the rows go, so a crash leaves orphan rows rather than orphan files.
  await Promise.all(
    rows.map((row) => unlink(imagePath(row.filename)).catch(() => undefined))
  );
  db.prepare(`DELETE FROM ref_images WHERE owner_type = ? AND owner_id = ?`).run(
    ownerType,
    ownerId
  );
}

export async function readImage(
  id: string
): Promise<{ bytes: Buffer; mimeType: string } | null> {
  const row = getDb()
    .prepare(`SELECT filename, mime_type FROM ref_images WHERE id = ?`)
    .get(id) as { filename: string; mime_type: string } | undefined;
  if (!row) return null;

  try {
    return { bytes: await readFile(imagePath(row.filename)), mimeType: row.mime_type };
  } catch {
    return null;
  }
}
