import { describe, expect, it } from "vitest";
import sharp from "sharp";
import { normalize } from "@/lib/normalize";
import { HEIGHT, WIDTH, YOUTUBE_MAX_BYTES } from "@/lib/spec";

async function noisyPng(width: number, height: number) {
  // Random noise is near-incompressible, so this exercises the quality ladder.
  const pixels = Buffer.alloc(width * height * 3);
  for (let i = 0; i < pixels.length; i++) pixels[i] = Math.floor(Math.random() * 256);
  return sharp(pixels, { raw: { width, height, channels: 3 } })
    .png({ compressionLevel: 0 })
    .toBuffer();
}

describe("normalize", () => {
  it("forces exact 1280x720 from a square input", async () => {
    const input = await sharp({
      create: { width: 1000, height: 1000, channels: 3, background: "#4488cc" },
    })
      .png()
      .toBuffer();

    const result = await normalize(input.toString("base64"));
    const meta = await sharp(Buffer.from(result.dataUrl.split(",")[1], "base64")).metadata();

    expect(meta.width).toBe(WIDTH);
    expect(meta.height).toBe(HEIGHT);
    expect(meta.width! / meta.height!).toBeCloseTo(16 / 9, 3);
  });

  it("keeps a large noisy 4K image under the 2MB YouTube limit", async () => {
    const input = await noisyPng(3840, 2160);
    const result = await normalize(input.toString("base64"));

    expect(result.bytes).toBeLessThanOrEqual(YOUTUBE_MAX_BYTES);
    expect(result.bytes).toBe(Buffer.from(result.dataUrl.split(",")[1], "base64").length);
  }, 30000);

  it("reports jpeg and a matching data URL prefix", async () => {
    const input = await sharp({
      create: { width: 400, height: 225, channels: 3, background: "#000000" },
    })
      .png()
      .toBuffer();

    const result = await normalize(input.toString("base64"));
    expect(result.mimeType).toBe("image/jpeg");
    expect(result.dataUrl.startsWith("data:image/jpeg;base64,")).toBe(true);
  });
});
