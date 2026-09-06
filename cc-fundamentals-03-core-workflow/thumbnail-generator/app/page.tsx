"use client";

import { useEffect, useState } from "react";
import { PresetPicker } from "@/components/PresetPicker";
import { ResultsGrid } from "@/components/ResultsGrid";
import { UploadPanel, type Upload } from "@/components/UploadPanel";
import type { NormalizedImage } from "@/lib/spec";
import { DEFAULT_PRESET_ID } from "@/lib/presets";

const COST_PER_IMAGE = 0.134;

export default function Home() {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [title, setTitle] = useState("");
  const [presetId, setPresetId] = useState(DEFAULT_PRESET_ID);
  const [variations, setVariations] = useState(3);
  const [creativity, setCreativity] = useState(40);
  const [renderText, setRenderText] = useState(true);

  const [results, setResults] = useState<NormalizedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [refining, setRefining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [generated, setGenerated] = useState(0);
  const [keyMissing, setKeyMissing] = useState(false);

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((d) => setKeyMissing(!d.keyPresent))
      .catch(() => setKeyMissing(false));
  }, []);

  async function post(form: FormData, count: number) {
    setError(null);
    setWarnings([]);
    const res = await fetch("/api/generate", { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }
    setResults(data.results);
    setWarnings(data.warnings ?? []);
    setGenerated((n) => n + count);
  }

  async function generate() {
    setLoading(true);
    try {
      const form = new FormData();
      form.set("title", title);
      form.set("presetId", presetId);
      form.set("variations", String(variations));
      form.set("creativity", String(creativity));
      form.set("renderText", String(renderText));
      for (const u of uploads) {
        form.append("images", u.file);
        form.append("roles", u.role);
      }
      await post(form, variations);
    } catch {
      setError("Could not reach the server. Is the dev server still running?");
    } finally {
      setLoading(false);
    }
  }

  async function refine(image: NormalizedImage, instruction: string) {
    setRefining(true);
    try {
      const blob = await (await fetch(image.dataUrl)).blob();
      const form = new FormData();
      form.set("variations", "1");
      form.set("refineInstruction", instruction);
      form.append("images", new File([blob], "source.jpg", { type: "image/jpeg" }));
      form.append("roles", "character");
      await post(form, 1);
    } catch {
      setError("Refine failed. Try again.");
    } finally {
      setRefining(false);
    }
  }

  const titleWords = title.trim().split(/\s+/).filter(Boolean).length;

  return (
    <main className="mx-auto max-w-5xl space-y-8 p-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">YouTube Thumbnail Generator</h1>
        <p className="text-sm text-neutral-500">
          Bring in photos, logos, or style references. Nano Banana Pro rebuilds them as a 16:9
          thumbnail with the subjects&apos; identity intact.
        </p>
      </header>

      {keyMissing && (
        <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-400">
          <strong>No API key.</strong> Copy <code>.env.example</code> to <code>.env.local</code>,
          set <code>GOOGLE_API_KEY</code>, then restart the dev server. Get a key at{" "}
          <a className="underline" href="https://aistudio.google.com/apikey">
            aistudio.google.com/apikey
          </a>
          .
        </div>
      )}

      <UploadPanel uploads={uploads} onChange={setUploads} />

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="title" className="text-sm font-semibold">
            Headline
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="I Tried This For 30 Days"
            className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
          />
          <p className="text-xs text-neutral-500">
            {titleWords > 6
              ? `${titleWords} words — six or fewer renders more reliably.`
              : "Six words or fewer renders most reliably."}
          </p>
        </div>

        <PresetPicker value={presetId} onChange={setPresetId} />

        <div className="space-y-1">
          <label htmlFor="variations" className="text-sm font-semibold">
            Variations: {variations}
          </label>
          <input
            id="variations"
            type="range"
            min={1}
            max={6}
            value={variations}
            onChange={(e) => setVariations(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-neutral-500">
            YouTube A/B tests take 3. About ${(variations * COST_PER_IMAGE).toFixed(2)} per run.
          </p>
        </div>

        <div className="space-y-1">
          <label htmlFor="creativity" className="text-sm font-semibold">
            Consistency vs. creativity: {creativity}
          </label>
          <input
            id="creativity"
            type="range"
            min={0}
            max={100}
            value={creativity}
            onChange={(e) => setCreativity(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-neutral-500">
            Lower locks harder to the faces you uploaded.
          </p>
        </div>
      </section>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={renderText}
          onChange={(e) => setRenderText(e.target.checked)}
        />
        Let the model render the headline (uncheck to add text yourself afterwards)
      </label>

      <div className="flex items-center gap-4">
        <button
          onClick={generate}
          disabled={loading || keyMissing}
          className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? `Generating ${variations}…` : "Generate thumbnails"}
        </button>
        {generated > 0 && (
          <span className="text-xs text-neutral-500">
            {generated} generated this session · ~${(generated * COST_PER_IMAGE).toFixed(2)}
          </span>
        )}
      </div>

      {loading && (
        <p className="text-sm text-neutral-500">
          Nano Banana Pro takes roughly 2–5 seconds per image. Hang tight.
        </p>
      )}

      {error && (
        <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {warnings.length > 0 && (
        <ul className="rounded-md bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
          {warnings.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      )}

      {results.length > 0 ? (
        <ResultsGrid results={results} title={title} onRefine={refine} refining={refining} />
      ) : (
        !loading && (
          <p className="rounded-lg border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500 dark:border-neutral-700">
            Your thumbnails will appear here.
          </p>
        )
      )}
    </main>
  );
}
