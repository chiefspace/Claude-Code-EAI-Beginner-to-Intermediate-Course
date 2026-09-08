import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";

/** Server-only. Never import this from a client component — see lib/models.ts. */

export function dataDir(): string {
  return process.env.THUMBNAIL_DATA_DIR ?? path.join(process.cwd(), ".data");
}

export function refsDir(): string {
  return path.join(dataDir(), "refs");
}

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;
  mkdirSync(refsDir(), { recursive: true });
  db = new Database(path.join(dataDir(), "app.db"));
  db.pragma("journal_mode = WAL");
  migrate(db);
  return db;
}

/** Tests point THUMBNAIL_DATA_DIR at a temp dir and reset between cases. */
export function closeDb(): void {
  db?.close();
  db = null;
}

function migrate(conn: Database.Database): void {
  conn.exec(`
    CREATE TABLE IF NOT EXISTS personas (
      id         TEXT PRIMARY KEY,
      name       TEXT NOT NULL,
      note       TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS styles (
      id          TEXT PRIMARY KEY,
      name        TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      created_at  TEXT NOT NULL
    );

    -- Polymorphic parent (persona or style), so no real foreign key. Owners
    -- delete their own rows and unlink their files.
    CREATE TABLE IF NOT EXISTS ref_images (
      id         TEXT PRIMARY KEY,
      owner_type TEXT NOT NULL,
      owner_id   TEXT NOT NULL,
      filename   TEXT NOT NULL,
      mime_type  TEXT NOT NULL,
      position   INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS ref_images_owner
      ON ref_images (owner_type, owner_id, position);

    CREATE TABLE IF NOT EXISTS brand_kit (
      id                 INTEGER PRIMARY KEY CHECK (id = 1),
      colors             TEXT NOT NULL DEFAULT '[]',
      font               TEXT NOT NULL DEFAULT '',
      default_persona_id TEXT,
      default_style_id   TEXT,
      updated_at         TEXT NOT NULL
    );
  `);
}
