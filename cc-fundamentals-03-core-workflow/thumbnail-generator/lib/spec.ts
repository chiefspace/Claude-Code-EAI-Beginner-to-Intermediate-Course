/** YouTube thumbnail spec. Kept free of server-only imports so client code can use it. */
export const WIDTH = 1280;
export const HEIGHT = 720;
export const YOUTUBE_MAX_BYTES = 2 * 1024 * 1024;

/** Aspect ratios the image model supports and we export at. */
export const FORMATS = {
  "16:9": { width: 1280, height: 720, label: "Thumbnail" },
  "9:16": { width: 1080, height: 1920, label: "Shorts cover" },
  "1:1": { width: 1080, height: 1080, label: "Square" },
} as const;

export type AspectRatio = keyof typeof FORMATS;
export const ASPECT_RATIOS = Object.keys(FORMATS) as AspectRatio[];
export const DEFAULT_ASPECT_RATIO: AspectRatio = "16:9";

export function isAspectRatio(value: string): value is AspectRatio {
  return (ASPECT_RATIOS as string[]).includes(value);
}

export type NormalizedImage = {
  dataUrl: string;
  mimeType: "image/jpeg";
  bytes: number;
  width: number;
  height: number;
  aspectRatio: AspectRatio;
};
