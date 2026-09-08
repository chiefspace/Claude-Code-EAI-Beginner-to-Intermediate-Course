import { getDb } from "@/lib/db";
import type { BrandKit } from "@/lib/models";

/** Server-only. A single row (id = 1) holding channel-wide defaults. */

const EMPTY: BrandKit = { colors: [], font: "", defaultPersonaId: null, defaultStyleId: null };

type Row = {
  colors: string;
  font: string;
  default_persona_id: string | null;
  default_style_id: string | null;
};

export function getBrandKit(): BrandKit {
  const row = getDb()
    .prepare(
      `SELECT colors, font, default_persona_id, default_style_id FROM brand_kit WHERE id = 1`
    )
    .get() as Row | undefined;
  if (!row) return EMPTY;

  let colors: string[] = [];
  try {
    const parsed = JSON.parse(row.colors);
    if (Array.isArray(parsed)) colors = parsed.filter((c) => typeof c === "string");
  } catch {
    colors = [];
  }

  return {
    colors,
    font: row.font,
    defaultPersonaId: row.default_persona_id,
    defaultStyleId: row.default_style_id,
  };
}

const HEX = /^#[0-9a-fA-F]{6}$/;

export function saveBrandKit(input: Partial<BrandKit>): BrandKit {
  const current = getBrandKit();
  const next: BrandKit = {
    colors: (input.colors ?? current.colors).filter((c) => HEX.test(c)).slice(0, 6),
    font: (input.font ?? current.font).trim().slice(0, 80),
    defaultPersonaId: input.defaultPersonaId ?? current.defaultPersonaId,
    defaultStyleId: input.defaultStyleId ?? current.defaultStyleId,
  };

  getDb()
    .prepare(
      `INSERT INTO brand_kit (id, colors, font, default_persona_id, default_style_id, updated_at)
       VALUES (1, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         colors = excluded.colors, font = excluded.font,
         default_persona_id = excluded.default_persona_id,
         default_style_id = excluded.default_style_id,
         updated_at = excluded.updated_at`
    )
    .run(
      JSON.stringify(next.colors),
      next.font,
      next.defaultPersonaId,
      next.defaultStyleId,
      new Date().toISOString()
    );

  return next;
}

/** Prompt fragment injected into every generation. */
export function describeBrandKit(kit: BrandKit): string {
  const parts: string[] = [];
  if (kit.colors.length > 0) {
    parts.push(`Use this channel's brand colours where they fit: ${kit.colors.join(", ")}.`);
  }
  if (kit.font.trim()) {
    parts.push(`Headline lettering should resemble ${kit.font.trim()}.`);
  }
  return parts.join(" ");
}
