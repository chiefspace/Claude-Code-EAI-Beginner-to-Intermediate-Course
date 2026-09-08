import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";

const generateContent = vi.fn();

vi.mock("@google/genai", () => ({
  GoogleGenAI: class {
    models = { generateContent };
  },
}));

const ID = "dQw4w9WgXcQ";
let dataDir: string;

async function jpegBytes() {
  return sharp({ create: { width: 320, height: 180, channels: 3, background: "#123456" } })
    .jpeg()
    .toBuffer();
}

function imageResponse(data: string) {
  return {
    candidates: [{ content: { parts: [{ inlineData: { data, mimeType: "image/png" } }] } }],
  };
}

async function post(form: FormData) {
  const { POST } = await import("@/app/api/recreate/route");
  return POST(new Request("http://localhost/api/recreate", { method: "POST", body: form }));
}

beforeAll(async () => {
  dataDir = await mkdtemp(path.join(tmpdir(), "thumbgen-recreate-"));
  process.env.THUMBNAIL_DATA_DIR = dataDir;
});

afterAll(async () => {
  await rm(dataDir, { recursive: true, force: true });
  vi.unstubAllGlobals();
});

beforeEach(() => {
  vi.resetModules();
  generateContent.mockReset();
  process.env.GOOGLE_API_KEY = "test-key";
});

describe("fetchThumbnail", () => {
  it("falls back past a missing maxresdefault", async () => {
    const bytes = await jpegBytes();
    const fetchMock = vi.fn(async (url: string) =>
      url.includes("maxresdefault")
        ? new Response(null, { status: 404 })
        : new Response(bytes, { status: 200, headers: { "content-type": "image/jpeg" } })
    );
    vi.stubGlobal("fetch", fetchMock);

    const { fetchThumbnail } = await import("@/lib/youtube");
    const result = await fetchThumbnail(ID);

    expect(result.mimeType).toBe("image/jpeg");
    expect(fetchMock.mock.calls[0][0]).toContain("maxresdefault");
    expect(fetchMock.mock.calls[1][0]).toContain("sddefault");
  });

  it("refuses an HTML placeholder rather than sending it to the model", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response("<html>nope</html>", {
            status: 200,
            headers: { "content-type": "text/html" },
          })
      )
    );

    const { fetchThumbnail, ThumbnailFetchError } = await import("@/lib/youtube");
    await expect(fetchThumbnail(ID)).rejects.toBeInstanceOf(ThumbnailFetchError);
  });
});

describe("POST /api/recreate — describe step", () => {
  it("fetches a thumbnail by URL and returns an editable breakdown", async () => {
    const bytes = await jpegBytes();
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(bytes, { status: 200, headers: { "content-type": "image/jpeg" } })
      )
    );
    generateContent.mockResolvedValue({ text: "Subject placement: centre-left, mid-shot." });

    const form = new FormData();
    form.set("url", `https://youtu.be/${ID}`);

    const res = await post(form);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.breakdown).toContain("Subject placement");
    expect(body.source).toMatch(/^data:image\/jpeg;base64,/);

    // The reference is described, never handed to the image model.
    expect(generateContent.mock.calls[0][0].model).toBe("gemini-3.6-flash");
  });

  it("excludes identity and brand marks in the describe prompt", async () => {
    const bytes = await jpegBytes();
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(bytes, { status: 200, headers: { "content-type": "image/jpeg" } })
      )
    );
    generateContent.mockResolvedValue({ text: "Subject placement: centre." });

    const form = new FormData();
    form.set("url", `https://youtu.be/${ID}`);
    await post(form);

    const prompt = generateContent.mock.calls[0][0].contents[0].parts[0].text;
    expect(prompt).toContain("Do not describe or name the specific person");
    expect(prompt).toContain("Do not transcribe the headline text");
  });

  it("rejects a link that is not a YouTube video", async () => {
    const form = new FormData();
    form.set("url", "https://vimeo.com/123");

    const res = await post(form);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toContain("Paste a YouTube link");
  });
});

describe("POST /api/recreate — rebuild step", () => {
  it("sends the breakdown as the prompt and the persona as character refs", async () => {
    const png = (await sharp({
      create: { width: 320, height: 180, channels: 3, background: "#654321" },
    })
      .png()
      .toBuffer()).toString("base64");
    generateContent.mockResolvedValue(imageResponse(png));

    const { createPersona } = await import("@/lib/personas");
    const { persona } = await createPersona({
      name: "Ben",
      note: "a man with a beard",
      images: [
        { bytes: Buffer.from([1, 2, 3]), mimeType: "image/jpeg" },
        { bytes: Buffer.from([4, 5, 6]), mimeType: "image/jpeg" },
      ],
    });

    const form = new FormData();
    form.set("breakdown", "Subject placement: hard right, shocked expression.");
    form.set("title", "I Tried It");
    form.set("personaId", persona.id);
    form.set("variations", "1");

    const res = await post(form);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.results).toHaveLength(1);

    const call = generateContent.mock.calls[0][0];
    expect(call.model).toBe("gemini-3-pro-image");
    expect(call.config.imageConfig.aspectRatio).toBe("16:9");

    const parts = call.contents[0].parts;
    expect(parts[0].text).toContain("Subject placement: hard right");
    expect(parts[0].text).toContain("I Tried It");
    expect(parts[0].text).toContain("Do not reproduce");
    expect(parts.filter((p: { inlineData?: unknown }) => p.inlineData)).toHaveLength(2);
  });

  it("refuses to rebuild without a persona, so it cannot clone the original's face", async () => {
    const form = new FormData();
    form.set("breakdown", "Subject placement: centre.");

    const res = await post(form);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toContain("Pick a persona");
    expect(generateContent).not.toHaveBeenCalled();
  });
});
