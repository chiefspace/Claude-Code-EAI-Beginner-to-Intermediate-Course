/**
 * Shared Persona/Style/BrandKit types.
 *
 * Kept free of server-only imports (no `lib/db.ts`, no `better-sqlite3`) so client
 * components can import these. Pulling a native module into the client bundle is
 * what broke `next build` in Part 1 — see AGENTS.md and lib/spec.ts.
 */
import type { Role } from "@/lib/refs";

export type RefOrigin = "upload" | "persona" | "style";

export type StoredImage = {
  id: string;
  mimeType: string;
  /** Served by `/api/refs/<id>`; the on-disk path never reaches the client. */
  url: string;
};

export type Persona = {
  id: string;
  name: string;
  /** Model-extracted descriptor, e.g. "a man in his 40s with a short beard". */
  note: string;
  createdAt: string;
  images: StoredImage[];
};

export type Style = {
  id: string;
  name: string;
  /** Model-extracted look description. Editable — it is a prompt fragment. */
  description: string;
  createdAt: string;
  images: StoredImage[];
};

export type BrandKit = {
  colors: string[];
  font: string;
  defaultPersonaId: string | null;
  defaultStyleId: string | null;
};

/** Reference that did not fit the model's caps, reported so the UI can say so. */
export type DroppedRef = { role: Role; origin: RefOrigin; label: string };

export const PERSONA_MIN_IMAGES = 3;
export const PERSONA_MAX_IMAGES = 5;
export const STYLE_MIN_IMAGES = 1;
export const STYLE_MAX_IMAGES = 3;
