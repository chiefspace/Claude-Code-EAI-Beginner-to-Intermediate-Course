import { describe, expect, it } from "vitest";
import { buildPrompt, buildRefinePrompt, VARIATION_HINTS } from "@/lib/prompt";
import { PRESETS } from "@/lib/presets";

describe("buildPrompt", () => {
  it("always requests a 16:9 YouTube thumbnail", () => {
    expect(buildPrompt("clean-tutorial", "Hi", [])).toContain("16:9");
  });

  it("includes the chosen preset's fragment", () => {
    for (const preset of PRESETS) {
      expect(buildPrompt(preset.id, "Hi", [])).toContain(preset.fragment);
    }
  });

  it("falls back to the default preset for an unknown id", () => {
    const fallback = PRESETS.find((p) => p.id === "clean-tutorial")!;
    expect(buildPrompt("nope", "Hi", [])).toContain(fallback.fragment);
  });

  it("numbers reference images in the order given", () => {
    const prompt = buildPrompt("gaming", "Hi", ["character", "object", "style"]);
    expect(prompt).toMatch(/Image 1: a person/);
    expect(prompt).toMatch(/Image 2: an object/);
    expect(prompt).toMatch(/Image 3: a style reference/);
  });

  it("omits the reference block when there are no references", () => {
    expect(buildPrompt("gaming", "Hi", [])).not.toContain("Reference images");
  });

  it("quotes the headline verbatim when rendering text", () => {
    expect(buildPrompt("vlog", "  30 Days  ", [])).toContain('"30 Days"');
  });

  it("suppresses text when renderText is false", () => {
    const prompt = buildPrompt("vlog", "30 Days", [], { renderText: false });
    expect(prompt).toContain("Do not render any text");
    expect(prompt).not.toContain('"30 Days"');
  });

  it("scales identity emphasis with the creativity setting", () => {
    const roles = ["character" as const];
    expect(buildPrompt("vlog", "x", roles, { creativity: 0 })).toContain("highest priority");
    expect(buildPrompt("vlog", "x", roles, { creativity: 50 })).toContain("clearly recognisable");
    expect(buildPrompt("vlog", "x", roles, { creativity: 100 })).toContain("family resemblance");
  });

  it("skips identity emphasis when no person was uploaded", () => {
    const prompt = buildPrompt("vlog", "x", ["object"], { creativity: 0 });
    expect(prompt).not.toContain("highest priority");
  });

  it("offers a distinct hint for each of the six variations", () => {
    expect(new Set(VARIATION_HINTS).size).toBe(6);
  });
});

describe("buildRefinePrompt", () => {
  it("carries the instruction and protects identity", () => {
    const prompt = buildRefinePrompt("  brighter background  ");
    expect(prompt).toContain("brighter background");
    expect(prompt).toContain("identity");
    expect(prompt).toContain("16:9");
  });
});
