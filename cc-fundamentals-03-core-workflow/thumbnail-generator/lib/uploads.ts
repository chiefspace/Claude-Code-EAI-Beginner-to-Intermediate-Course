import type { ImageInput } from "@/lib/refStore";

/** Server-only. Boundary validation for multipart image uploads. */

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export class UploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UploadError";
  }
}

export function validateUpload(file: File): void {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new UploadError(`"${file.name}" is larger than 10MB.`);
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new UploadError(`"${file.name}" is not a JPEG, PNG, or WebP.`);
  }
}

export async function toImageInputs(files: File[]): Promise<ImageInput[]> {
  return Promise.all(
    files.map(async (file) => {
      validateUpload(file);
      return { bytes: Buffer.from(await file.arrayBuffer()), mimeType: file.type };
    })
  );
}

export function imageFiles(form: FormData, field = "images"): File[] {
  return form.getAll(field).filter((f): f is File => f instanceof File);
}
