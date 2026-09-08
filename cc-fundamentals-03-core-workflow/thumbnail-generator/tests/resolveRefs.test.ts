import { describe, expect, it } from "vitest";
import { CAPS, TOTAL_CAP, type Role } from "@/lib/refs";
import { describeDropped, resolveRefs } from "@/lib/resolveRefs";

type TestRef = { role: Role; id: string };

const ref = (role: Role, id: string): TestRef => ({ role, id });
const many = (role: Role, n: number, prefix: string = role) =>
  Array.from({ length: n }, (_, i) => ref(role, `${prefix}-${i}`));

describe("resolveRefs", () => {
  it("accepts exactly the cap for each role without dropping", () => {
    for (const role of Object.keys(CAPS) as Role[]) {
      const { refs, dropped } = resolveRefs({ uploads: many(role, CAPS[role]) });
      expect(refs).toHaveLength(CAPS[role]);
      expect(dropped).toEqual([]);
    }
  });

  it("degrades rather than erroring one over each role cap", () => {
    for (const role of Object.keys(CAPS) as Role[]) {
      const { refs, dropped } = resolveRefs({ uploads: many(role, CAPS[role] + 1) });
      expect(refs).toHaveLength(CAPS[role]);
      expect(dropped).toHaveLength(1);
      expect(dropped[0].id).toBe(`${role}-${CAPS[role]}`);
    }
  });

  it("fills a complete 14-reference set at every per-role cap", () => {
    const uploads = [...many("character", 5), ...many("object", 6), ...many("style", 3)];
    const { refs, dropped } = resolveRefs({ uploads });
    expect(refs).toHaveLength(TOTAL_CAP);
    expect(dropped).toEqual([]);
  });

  it("never exceeds the total cap", () => {
    const uploads = [...many("character", 9), ...many("object", 9), ...many("style", 9)];
    const { refs } = resolveRefs({ uploads });
    expect(refs.length).toBeLessThanOrEqual(TOTAL_CAP);
  });

  it("orders character references first, then objects, then styles", () => {
    const uploads = [ref("style", "s"), ref("object", "o"), ref("character", "c")];
    expect(resolveRefs({ uploads }).refs.map((r) => r.role)).toEqual([
      "character",
      "object",
      "style",
    ]);
  });

  it("lets per-request uploads outrank persona images", () => {
    const { refs, dropped } = resolveRefs({
      uploads: many("character", 3, "upload"),
      persona: many("character", 5, "persona"),
    });

    expect(refs.map((r) => r.id)).toEqual([
      "upload-0",
      "upload-1",
      "upload-2",
      "persona-0",
      "persona-1",
    ]);
    expect(dropped.map((r) => r.id)).toEqual(["persona-2", "persona-3", "persona-4"]);
  });

  it("keeps a persona, uploaded objects, and a style together inside the caps", () => {
    const { refs, dropped } = resolveRefs({
      uploads: many("object", 3, "logo"),
      persona: many("character", 5, "persona"),
      style: many("style", 3, "style"),
    });

    expect(dropped).toEqual([]);
    expect(refs).toHaveLength(11);
    expect(refs.slice(0, 5).every((r) => r.role === "character")).toBe(true);
  });

  it("does not let one role's overflow consume another role's slots", () => {
    const { refs } = resolveRefs({
      uploads: [...many("character", 8, "face"), ...many("style", 2, "style")],
    });

    expect(refs.filter((r) => r.role === "character")).toHaveLength(5);
    expect(refs.filter((r) => r.role === "style")).toHaveLength(2);
  });

  it("accepts an empty request", () => {
    expect(resolveRefs({})).toEqual({ refs: [], dropped: [] });
  });
});

describe("describeDropped", () => {
  it("reports used-of-requested per affected role", () => {
    const { refs, dropped } = resolveRefs({ uploads: many("character", 7) });
    expect(describeDropped(refs, dropped)).toEqual([
      "Using 5 of 7 face references — the model caps character references at 5.",
    ]);
  });

  it("says nothing when everything fits", () => {
    const { refs, dropped } = resolveRefs({ uploads: many("character", 2) });
    expect(describeDropped(refs, dropped)).toEqual([]);
  });

  it("reports each affected role separately", () => {
    const { refs, dropped } = resolveRefs({
      uploads: [...many("character", 6), ...many("style", 4)],
    });
    expect(describeDropped(refs, dropped)).toHaveLength(2);
  });
});
