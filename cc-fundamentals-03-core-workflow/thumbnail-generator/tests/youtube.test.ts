import { describe, expect, it } from "vitest";
import { parseVideoId, thumbnailUrls } from "@/lib/youtube";

const ID = "dQw4w9WgXcQ";

describe("parseVideoId", () => {
  it("reads a standard watch URL", () => {
    expect(parseVideoId(`https://www.youtube.com/watch?v=${ID}`)).toBe(ID);
  });

  it("reads a youtu.be short link", () => {
    expect(parseVideoId(`https://youtu.be/${ID}`)).toBe(ID);
  });

  it("ignores extra query parameters", () => {
    expect(parseVideoId(`https://www.youtube.com/watch?v=${ID}&t=42s&list=PLabc`)).toBe(ID);
    expect(parseVideoId(`https://youtu.be/${ID}?t=42`)).toBe(ID);
  });

  it("reads shorts, embed, and live URLs", () => {
    expect(parseVideoId(`https://www.youtube.com/shorts/${ID}`)).toBe(ID);
    expect(parseVideoId(`https://www.youtube.com/embed/${ID}`)).toBe(ID);
    expect(parseVideoId(`https://www.youtube.com/live/${ID}`)).toBe(ID);
  });

  it("accepts a bare video id", () => {
    expect(parseVideoId(ID)).toBe(ID);
    expect(parseVideoId(`  ${ID}  `)).toBe(ID);
  });

  it("handles URLs without a scheme and with m./music. hosts", () => {
    expect(parseVideoId(`youtube.com/watch?v=${ID}`)).toBe(ID);
    expect(parseVideoId(`https://m.youtube.com/watch?v=${ID}`)).toBe(ID);
  });

  it("rejects invalid input", () => {
    for (const bad of [
      "",
      "   ",
      "not a url",
      "https://vimeo.com/123456",
      "https://www.youtube.com/watch?v=tooshort",
      "https://www.youtube.com/",
      "https://youtu.be/",
      "https://example.com/watch?v=" + ID,
    ]) {
      expect(parseVideoId(bad)).toBeNull();
    }
  });
});

describe("thumbnailUrls", () => {
  it("walks from maxres down to hq", () => {
    expect(thumbnailUrls(ID)).toEqual([
      `https://img.youtube.com/vi/${ID}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${ID}/sddefault.jpg`,
      `https://img.youtube.com/vi/${ID}/hqdefault.jpg`,
    ]);
  });
});
