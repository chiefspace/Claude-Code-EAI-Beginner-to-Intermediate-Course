import { randomUUID } from "node:crypto";
import { getDb } from "@/lib/db";
import { generateText, type ImagePart } from "@/lib/gemini";
import type { Style } from "@/lib/models";
import { deleteImages, listImages, saveImages, type ImageInput } from "@/lib/refStore";

/** Server-only. CRUD over named styles — a channel's saved look. */

type Row = { id: string; name: string; description: string; created_at: string };

const DESCRIBE_PROMPT =
  "These are YouTube thumbnails from one channel. In at most 60 words, describe the " +
  "visual style they share so it can be reused as an image-generation prompt fragment: " +
  "colour palette, lighting, contrast, composition habits, and text treatment. " +
  "Describe the look only — no subjects, no specific words, no brand names. " +
  "Reply with the description only.";

function hydrate(row: Row): Style {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    createdAt: row.created_at,
    images: listImages("style", row.id),
  };
}

async function describeLook(
  images: ImageInput[]
): Promise<{ text: string; warning?: string }> {
  const parts: ImagePart[] = images.map((image) => ({
    inlineData: { mimeType: image.mimeType, data: image.bytes.toString("base64") },
  }));
  try {
    return { text: await generateText(DESCRIBE_PROMPT, parts) };
  } catch (err) {
    const reason = err instanceof Error ? err.message : "unknown error";
    console.error(`[describeLook] ${reason}`);
    return { text: "", warning: `Saved, but the description could not be generated: ${reason}` };
  }
}

export async function createStyle(input: {
  name: string;
  images: ImageInput[];
  description?: string;
}): Promise<{ style: Style; warning?: string }> {
  const id = randomUUID();
  // See the note in lib/personas.ts — a blank field arrives as "", not undefined.
  const supplied = input.description?.trim() || undefined;
  const extracted = supplied ? null : await describeLook(input.images);

  getDb()
    .prepare(`INSERT INTO styles (id, name, description, created_at) VALUES (?, ?, ?, ?)`)
    .run(id, input.name.trim(), supplied ?? extracted!.text, new Date().toISOString());

  await saveImages("style", id, input.images);
  return { style: getStyle(id)!, warning: extracted?.warning };
}

export function listStyles(): Style[] {
  const rows = getDb()
    .prepare(`SELECT id, name, description, created_at FROM styles ORDER BY created_at DESC`)
    .all() as Row[];
  return rows.map(hydrate);
}

export function getStyle(id: string): Style | null {
  const row = getDb()
    .prepare(`SELECT id, name, description, created_at FROM styles WHERE id = ?`)
    .get(id) as Row | undefined;
  return row ? hydrate(row) : null;
}

/** The description is a prompt fragment, so a hand-tuned one often beats the generated one. */
export function updateStyleDescription(id: string, description: string): Style | null {
  getDb()
    .prepare(`UPDATE styles SET description = ? WHERE id = ?`)
    .run(description.trim(), id);
  return getStyle(id);
}

export async function deleteStyle(id: string): Promise<boolean> {
  await deleteImages("style", id);
  return getDb().prepare(`DELETE FROM styles WHERE id = ?`).run(id).changes > 0;
}
