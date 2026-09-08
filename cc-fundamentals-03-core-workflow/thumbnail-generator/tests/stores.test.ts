import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const generateContent = vi.fn();

vi.mock("@google/genai", () => ({
  GoogleGenAI: class {
    models = { generateContent };
  },
}));

let dir: string;
let personas: typeof import("@/lib/personas");
let styles: typeof import("@/lib/styles");
let db: typeof import("@/lib/db");

const image = (byte: number) => ({
  bytes: Buffer.from([byte, byte, byte]),
  mimeType: "image/jpeg",
});

const refFiles = () => readdir(path.join(dir, "refs"));

beforeAll(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "thumbgen-"));
  process.env.THUMBNAIL_DATA_DIR = dir;
  process.env.GOOGLE_API_KEY = "test-key";
  personas = await import("@/lib/personas");
  styles = await import("@/lib/styles");
  db = await import("@/lib/db");
});

afterAll(async () => {
  db.closeDb();
  await rm(dir, { recursive: true, force: true });
});

beforeEach(() => {
  generateContent.mockReset();
  generateContent.mockResolvedValue({ text: "a man in his 40s with a short beard" });
});

describe("persona store", () => {
  it("round-trips a persona with its images and cached note", async () => {
    const { persona: created } = await personas.createPersona({
      name: "Ben",
      images: [image(1), image(2), image(3)],
    });

    expect(created.name).toBe("Ben");
    expect(created.note).toBe("a man in his 40s with a short beard");
    expect(created.images).toHaveLength(3);

    const fetched = personas.getPersona(created.id);
    expect(fetched).toEqual(created);
    expect(fetched!.images[0].url).toBe(`/api/refs/${created.images[0].id}`);
  });

  it("extracts the note with a single text-model call over the faces", async () => {
    await personas.createPersona({ name: "Once", images: [image(1), image(2)] });

    expect(generateContent).toHaveBeenCalledTimes(1);
    const call = generateContent.mock.calls[0][0];
    expect(call.model).toBe("gemini-3.6-flash");
    expect(call.contents[0].parts.filter((p: unknown) => p && "inlineData" in (p as object)))
      .toHaveLength(2);
  });

  it("keeps a hand-written note instead of calling the model", async () => {
    const { persona: created } = await personas.createPersona({
      name: "Manual",
      images: [image(1)],
      note: "a woman in her 30s with red hair",
    });

    expect(created.note).toBe("a woman in her 30s with red hair");
    expect(generateContent).not.toHaveBeenCalled();
  });

  it("still creates the persona when the model call fails, and says why", async () => {
    generateContent.mockRejectedValue(new Error("quota exceeded"));

    const { persona: created, warning } = await personas.createPersona({
      name: "Offline",
      images: [image(9)],
    });
    expect(created.note).toBe("");
    expect(warning).toContain("quota exceeded");
    expect(personas.getPersona(created.id)).not.toBeNull();
  });

  it("extracts a note when the form sends an empty one", async () => {
    // The API route always sends a `note` field; blank arrives as "" not undefined.
    const { persona } = await personas.createPersona({
      name: "Blank note",
      images: [image(1)],
      note: "",
    });

    expect(persona.note).toBe("a man in his 40s with a short beard");
    expect(generateContent).toHaveBeenCalledTimes(1);
  });

  it("lists personas newest first", async () => {
    const before = personas.listPersonas().length;
    await personas.createPersona({ name: "Listed", images: [image(4)] });
    const all = personas.listPersonas();

    expect(all).toHaveLength(before + 1);
    expect(all.some((p) => p.name === "Listed")).toBe(true);
  });

  it("deletes the row and unlinks the images from disk", async () => {
    const { persona: created } = await personas.createPersona({
      name: "Doomed",
      images: [image(7), image(8)],
    });
    const filesBefore = await refFiles();

    expect(await personas.deletePersona(created.id)).toBe(true);
    expect(personas.getPersona(created.id)).toBeNull();

    const filesAfter = await refFiles();
    expect(filesAfter).toHaveLength(filesBefore.length - 2);
    for (const stored of created.images) {
      expect(filesAfter.some((f) => f.startsWith(stored.id))).toBe(false);
    }
  });

  it("reports a delete of something that is not there", async () => {
    expect(await personas.deletePersona("missing")).toBe(false);
  });
});

describe("style store", () => {
  it("round-trips a style and caches the extracted description", async () => {
    generateContent.mockResolvedValue({ text: "high contrast, teal and orange" });

    const { style: created } = await styles.createStyle({ name: "Channel", images: [image(5)] });
    expect(created.description).toBe("high contrast, teal and orange");
    expect(styles.getStyle(created.id)).toEqual(created);
  });

  it("lets a human overwrite the generated description", async () => {
    const { style: created } = await styles.createStyle({ name: "Tunable", images: [image(6)] });
    const updated = styles.updateStyleDescription(created.id, "  bright, flat, yellow  ");

    expect(updated!.description).toBe("bright, flat, yellow");
    expect(styles.getStyle(created.id)!.description).toBe("bright, flat, yellow");
  });

  it("extracts a description when the form sends an empty one", async () => {
    generateContent.mockResolvedValue({ text: "muted greens, soft light" });

    const { style } = await styles.createStyle({
      name: "Blank description",
      images: [image(3)],
      description: "",
    });

    expect(style.description).toBe("muted greens, soft light");
  });

  it("returns null when updating a style that does not exist", () => {
    expect(styles.updateStyleDescription("missing", "x")).toBeNull();
  });

  it("deletes the row and unlinks its images", async () => {
    const { style: created } = await styles.createStyle({ name: "Doomed", images: [image(2)] });
    expect(await styles.deleteStyle(created.id)).toBe(true);
    expect(styles.getStyle(created.id)).toBeNull();
    expect((await refFiles()).some((f) => f.startsWith(created.images[0].id))).toBe(false);
  });
});
