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

let dataDir: string;
let dataUrl: string;

const textResponse = (text: string) => ({ text });

async function postTo(route: "score" | "titles", form: FormData) {
  const mod =
    route === "score"
      ? await import("@/app/api/score/route")
      : await import("@/app/api/titles/route");
  return mod.POST(new Request(`http://localhost/api/${route}`, { method: "POST", body: form }));
}

function form(extra: Record<string, string> = {}) {
  const f = new FormData();
  f.set("image", dataUrl);
  f.set("title", "I Tried This For 30 Days");
  for (const [k, v] of Object.entries(extra)) f.set(k, v);
  return f;
}

const FULL_SCORES = {
  clarity: { score: 8, note: "Crop tighter on the face." },
  curiosity: { score: 4, note: "The headline answers itself; hold back the result." },
  emotion: { score: 7, note: "Push the expression further." },
  contrast: { score: 9, note: "Good separation." },
  mobileLegibility: { score: 6, note: "Headline drops below 60px at feed size." },
};

beforeAll(async () => {
  dataDir = await mkdtemp(path.join(tmpdir(), "thumbgen-pack-"));
  process.env.THUMBNAIL_DATA_DIR = dataDir;
  const jpeg = await sharp({
    create: { width: 128, height: 72, channels: 3, background: "#334455" },
  })
    .jpeg()
    .toBuffer();
  dataUrl = `data:image/jpeg;base64,${jpeg.toString("base64")}`;
});

afterAll(async () => {
  await rm(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  vi.resetModules();
  generateContent.mockReset();
  process.env.GOOGLE_API_KEY = "test-key";
});

describe("POST /api/score", () => {
  it("returns all five dimensions with notes and an overall", async () => {
    generateContent.mockResolvedValue(textResponse(JSON.stringify(FULL_SCORES)));

    const res = await postTo("score", form());
    const body = await res.json();

    expect(res.status).toBe(200);
    for (const d of ["clarity", "curiosity", "emotion", "contrast", "mobileLegibility"]) {
      expect(body.scoreCard[d].score).toBeGreaterThanOrEqual(1);
      expect(typeof body.scoreCard[d].note).toBe("string");
    }
    expect(body.scoreCard.overall).toBeCloseTo(6.8, 1);
  });

  it("names the weakest dimension as the top fix", async () => {
    generateContent.mockResolvedValue(textResponse(JSON.stringify(FULL_SCORES)));

    const body = await (await postTo("score", form())).json();
    expect(body.topFix.dimension).toBe("curiosity");
    expect(body.topFix.note).toContain("hold back the result");
  });

  it("parses JSON wrapped in prose and a code fence", async () => {
    generateContent.mockResolvedValue(
      textResponse("Sure! Here you go:\n```json\n" + JSON.stringify(FULL_SCORES) + "\n```")
    );

    const res = await postTo("score", form());
    expect(res.status).toBe(200);
    expect((await res.json()).scoreCard.clarity.score).toBe(8);
  });

  it("clamps out-of-range and missing scores instead of trusting the model", async () => {
    generateContent.mockResolvedValue(
      textResponse(
        JSON.stringify({
          ...FULL_SCORES,
          clarity: { score: 47, note: "too high" },
          contrast: { score: -3, note: "too low" },
          emotion: {},
        })
      )
    );

    const body = await (await postTo("score", form())).json();
    expect(body.scoreCard.clarity.score).toBe(10);
    expect(body.scoreCard.contrast.score).toBe(1);
    expect(body.scoreCard.emotion.score).toBe(1);
    expect(body.scoreCard.emotion.note).toBe("No note returned.");
  });

  it("returns a 502 rather than throwing when the model returns unusable output", async () => {
    generateContent.mockResolvedValue(textResponse("I cannot help with that."));

    const res = await postTo("score", form());
    expect(res.status).toBe(502);
    expect((await res.json()).error).toContain("Scoring failed");
  });

  it("rejects a request with no image", async () => {
    const f = new FormData();
    f.set("image", "not-a-data-url");
    const res = await postTo("score", f);
    expect(res.status).toBe(400);
  });
});

describe("POST /api/titles", () => {
  it("returns five titles", async () => {
    generateContent.mockResolvedValue(
      textResponse(JSON.stringify({ titles: ["A", "B", "C", "D", "E"] }))
    );

    const body = await (await postTo("titles", form())).json();
    expect(body.titles).toHaveLength(5);
  });

  it("drops non-string entries and caps at five", async () => {
    generateContent.mockResolvedValue(
      textResponse(JSON.stringify({ titles: ["A", 7, "", "B", "C", "D", "E", "F"] }))
    );

    const body = await (await postTo("titles", form())).json();
    expect(body.titles).toEqual(["A", "B", "C", "D", "E"]);
  });

  it("returns a 502 when the model returns no usable titles", async () => {
    generateContent.mockResolvedValue(textResponse(JSON.stringify({ titles: [] })));

    const res = await postTo("titles", form());
    expect(res.status).toBe(502);
  });
});
