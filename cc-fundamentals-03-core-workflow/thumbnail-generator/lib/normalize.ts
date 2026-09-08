import sharp from "sharp";
import {
  DEFAULT_ASPECT_RATIO,
  FORMATS,
  YOUTUBE_MAX_BYTES,
  type AspectRatio,
  type NormalizedImage,
} from "@/lib/spec";

const QUALITY_LADDER = [92, 85, 78, 70, 60, 50, 40];

export async function normalize(
  base64: string,
  aspectRatio: AspectRatio = DEFAULT_ASPECT_RATIO
): Promise<NormalizedImage> {
  const { width, height } = FORMATS[aspectRatio];
  const input = Buffer.from(base64, "base64");
  const resized = sharp(input).resize(width, height, { fit: "cover", position: "attention" });

  let output: Buffer | null = null;
  for (const quality of QUALITY_LADDER) {
    output = await resized.clone().jpeg({ quality, mozjpeg: true }).toBuffer();
    if (output.length <= YOUTUBE_MAX_BYTES) break;
  }

  const buffer = output!;
  return {
    dataUrl: `data:image/jpeg;base64,${buffer.toString("base64")}`,
    mimeType: "image/jpeg",
    bytes: buffer.length,
    width,
    height,
    aspectRatio,
  };
}
