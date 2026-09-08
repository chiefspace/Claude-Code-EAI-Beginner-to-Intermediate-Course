import { randomUUID } from "node:crypto";
import { getDb } from "@/lib/db";
import { generateText, type ImagePart } from "@/lib/gemini";
import type { Persona } from "@/lib/models";
import { deleteImages, listImages, saveImages, type ImageInput } from "@/lib/refStore";

/** Server-only. CRUD over named personas — a saved subject reused across sessions. */

type Row = { id: string; name: string; note: string; created_at: string };

const DESCRIBE_PROMPT =
  "These photos are all of the same person. In one sentence of at most 25 words, " +
  "describe their durable physical appearance for an image-generation prompt: " +
  "approximate age, hair, facial hair, and any glasses. Do not name them, do not " +
  "guess who they are, and do not describe clothing, background, or expression. " +
  "Reply with the sentence only.";

function hydrate(row: Row): Persona {
  return {
    id: row.id,
    name: row.name,
    note: row.note,
    createdAt: row.created_at,
    images: listImages("persona", row.id),
  };
}

/**
 * One text-model call at creation time, cached on the row. A missing or failing
 * key degrades to an empty note rather than blocking persona creation.
 */
async function describeFaces(
  images: ImageInput[]
): Promise<{ text: string; warning?: string }> {
  const parts: ImagePart[] = images.map((image) => ({
    inlineData: { mimeType: image.mimeType, data: image.bytes.toString("base64") },
  }));
  try {
    return { text: await generateText(DESCRIBE_PROMPT, parts) };
  } catch (err) {
    const reason = err instanceof Error ? err.message : "unknown error";
    console.error(`[describeFaces] ${reason}`);
    return { text: "", warning: `Saved, but the description could not be generated: ${reason}` };
  }
}

export async function createPersona(input: {
  name: string;
  images: ImageInput[];
  note?: string;
}): Promise<{ persona: Persona; warning?: string }> {
  const id = randomUUID();
  // `|| undefined` not `?.trim()` alone: the route sends "" when the field is blank,
  // and `"" ?? extracted` keeps the empty string.
  const supplied = input.note?.trim() || undefined;
  const extracted = supplied ? null : await describeFaces(input.images);

  getDb()
    .prepare(`INSERT INTO personas (id, name, note, created_at) VALUES (?, ?, ?, ?)`)
    .run(id, input.name.trim(), supplied ?? extracted!.text, new Date().toISOString());

  await saveImages("persona", id, input.images);
  return { persona: getPersona(id)!, warning: extracted?.warning };
}

export function listPersonas(): Persona[] {
  const rows = getDb()
    .prepare(`SELECT id, name, note, created_at FROM personas ORDER BY created_at DESC`)
    .all() as Row[];
  return rows.map(hydrate);
}

export function getPersona(id: string): Persona | null {
  const row = getDb()
    .prepare(`SELECT id, name, note, created_at FROM personas WHERE id = ?`)
    .get(id) as Row | undefined;
  return row ? hydrate(row) : null;
}

export async function deletePersona(id: string): Promise<boolean> {
  await deleteImages("persona", id);
  return getDb().prepare(`DELETE FROM personas WHERE id = ?`).run(id).changes > 0;
}
