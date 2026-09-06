import { beforeEach, describe, expect, it, vi } from "vitest";
import sharp from "sharp";

const generateContent = vi.fn();

vi.mock("@google/genai", () => ({
  GoogleGenAI: class {
    models = { generateContent };
  },
}));

async function pngBase64() {
  const buf = await sharp({
    create: { width: 320, height: 180, channels: 3, background: "#123456" },
  })
    .png()
    .toBuffer();
  return buf.toString("base64");
}

function imageResponse(data: string) {
  return {
    candidates: [{ content: { parts: [{ inlineData: { data, mimeType: "image/png" } }] } }],
  };
}

function file(name = "face.jpg", type = "image/jpeg") {
  return new File([new Uint8Array([1, 2, 3, 4])], name, { type });
}

async function post(form: FormData) {
  const { POST } = await import("@/app/api/generate/route");
  return POST(new Request("http://localhost/api/generate", { method: "POST", body: form }));
}

beforeEach(() => {
  vi.resetModules();
  generateContent.mockReset();
  process.env.GOOGLE_API_KEY = "test-key";
});

describe("POST /api/generate", () => {
  it("calls the model with the right id, 16:9, and 2K", async () => {
    generateContent.mockResolvedValue(imageResponse(await pngBase64()));

    const form = new FormData();
    form.set("title", "Hello");
    form.set("variations", "1");
    form.append("images", file());
    form.append("roles", "character");

    const res = await post(form);
    expect(res.status).toBe(200);

    const call = generateContent.mock.calls[0][0];
    expect(call.model).toBe("gemini-3-pro-image");
    expect(call.config.imageConfig).toEqual({ aspectRatio: "16:9", imageSize: "2K" });
    expect(call.config.responseModalities).toEqual(["TEXT", "IMAGE"]);
  });

  it("orders character references ahead of objects in the parts array", async () => {
    generateContent.mockResolvedValue(imageResponse(await pngBase64()));

    const form = new FormData();
    form.set("variations", "1");
    form.set("title", "Hi");
    form.append("images", file("logo.png", "image/png"));
    form.append("roles", "object");
    form.append("images", file("face.jpg"));
    form.append("roles", "character");

    await post(form);

    const parts = generateContent.mock.calls[0][0].contents[0].parts;
    expect(parts[0].text).toContain("Image 1: a person");
    expect(parts[1].inlineData.mimeType).toBe("image/jpeg");
    expect(parts[2].inlineData.mimeType).toBe("image/png");
  });

  it("generates one image per requested variation", async () => {
    generateContent.mockResolvedValue(imageResponse(await pngBase64()));

    const form = new FormData();
    form.set("title", "Hi");
    form.set("variations", "3");

    const res = await post(form);
    const body = await res.json();

    expect(generateContent).toHaveBeenCalledTimes(3);
    expect(body.results).toHaveLength(3);
  });

  it("rejects a sixth character reference with a clear message, not a 500", async () => {
    const form = new FormData();
    form.set("title", "Hi");
    for (let i = 0; i < 6; i++) {
      form.append("images", file(`face-${i}.jpg`));
      form.append("roles", "character");
    }

    const res = await post(form);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toContain("max 5");
    expect(generateContent).not.toHaveBeenCalled();
  });

  it("rejects a non-image upload", async () => {
    const form = new FormData();
    form.set("title", "Hi");
    form.append("images", file("notes.txt", "text/plain"));
    form.append("roles", "object");

    const res = await post(form);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toContain("not a JPEG");
  });

  it("returns a structured 503 when the API key is absent", async () => {
    delete process.env.GOOGLE_API_KEY;

    const form = new FormData();
    form.set("title", "Hi");

    const res = await post(form);
    expect(res.status).toBe(503);
    expect((await res.json()).error).toContain("GOOGLE_API_KEY");
  });

  it("returns a structured 502 rather than throwing when the model errors", async () => {
    generateContent.mockRejectedValue(new Error("quota exceeded"));

    const form = new FormData();
    form.set("title", "Hi");
    form.set("variations", "1");

    const res = await post(form);
    expect(res.status).toBe(502);
    expect((await res.json()).error).toContain("quota exceeded");
  });

  it("uses the refine prompt and skips preset scaffolding when refining", async () => {
    generateContent.mockResolvedValue(imageResponse(await pngBase64()));

    const form = new FormData();
    form.set("variations", "1");
    form.set("refineInstruction", "brighter background");
    form.append("images", file());
    form.append("roles", "character");

    await post(form);

    const text = generateContent.mock.calls[0][0].contents[0].parts[0].text;
    expect(text).toContain("brighter background");
    expect(text).toContain("Edit the attached");
  });

  it("requires either a reference image or a headline", async () => {
    const res = await post(new FormData());
    expect(res.status).toBe(400);
    expect((await res.json()).error).toContain("at least one");
  });
});
