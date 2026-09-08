import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

let dir: string;
let brand: typeof import("@/lib/brandKit");
let db: typeof import("@/lib/db");

beforeAll(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "thumbgen-brand-"));
  process.env.THUMBNAIL_DATA_DIR = dir;
  brand = await import("@/lib/brandKit");
  db = await import("@/lib/db");
});

afterAll(async () => {
  db.closeDb();
  await rm(dir, { recursive: true, force: true });
});

beforeEach(() => {
  brand.saveBrandKit({ colors: [], font: "", defaultPersonaId: null, defaultStyleId: null });
});

describe("brand kit", () => {
  it("returns an empty kit before anything is saved", () => {
    expect(brand.getBrandKit()).toEqual({
      colors: [],
      font: "",
      defaultPersonaId: null,
      defaultStyleId: null,
    });
  });

  it("round-trips colours, font, and defaults", () => {
    brand.saveBrandKit({
      colors: ["#1d4ed8", "#c2410c"],
      font: "heavy condensed grotesque",
      defaultPersonaId: "p1",
      defaultStyleId: "s1",
    });

    expect(brand.getBrandKit()).toEqual({
      colors: ["#1d4ed8", "#c2410c"],
      font: "heavy condensed grotesque",
      defaultPersonaId: "p1",
      defaultStyleId: "s1",
    });
  });

  it("drops anything that is not a six-digit hex colour", () => {
    brand.saveBrandKit({ colors: ["#1d4ed8", "blue", "#fff", "rgb(1,2,3)", "#GGGGGG"] });
    expect(brand.getBrandKit().colors).toEqual(["#1d4ed8"]);
  });

  it("caps the palette at six colours", () => {
    const many = ["#111111", "#222222", "#333333", "#444444", "#555555", "#666666", "#777777"];
    brand.saveBrandKit({ colors: many });
    expect(brand.getBrandKit().colors).toHaveLength(6);
  });

  it("leaves untouched fields alone on a partial save", () => {
    brand.saveBrandKit({ colors: ["#1d4ed8"], font: "slab" });
    brand.saveBrandKit({ font: "grotesque" });

    const kit = brand.getBrandKit();
    expect(kit.colors).toEqual(["#1d4ed8"]);
    expect(kit.font).toBe("grotesque");
  });

  it("builds a prompt fragment only from what is set", () => {
    expect(brand.describeBrandKit(brand.getBrandKit())).toBe("");

    brand.saveBrandKit({ colors: ["#1d4ed8"], font: "slab serif" });
    const fragment = brand.describeBrandKit(brand.getBrandKit());
    expect(fragment).toContain("#1d4ed8");
    expect(fragment).toContain("slab serif");
  });
});
