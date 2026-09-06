/** YouTube thumbnail spec. Kept free of server-only imports so client code can use it. */
export const WIDTH = 1280;
export const HEIGHT = 720;
export const YOUTUBE_MAX_BYTES = 2 * 1024 * 1024;

export type NormalizedImage = {
  dataUrl: string;
  mimeType: "image/jpeg";
  bytes: number;
  width: number;
  height: number;
};
