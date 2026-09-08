"use client";

import { useState } from "react";
import Image from "next/image";
import { PersonaPicker } from "@/components/PersonaPicker";
import { StylePicker } from "@/components/StylePicker";
import type { Persona, Style } from "@/lib/models";
import type { NormalizedImage } from "@/lib/spec";

export function RecreatePanel({
  personas,
  styles,
  onResults,
  disabled,
}: {
  personas: Persona[];
  styles: Style[];
  onResults: (results: NormalizedImage[], warnings: string[], count: number) => void;
  disabled?: boolean;
}) {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [breakdown, setBreakdown] = useState("");
  const [title, setTitle] = useState("");
  const [personaId, setPersonaId] = useState("");
  const [styleId, setStyleId] = useState("");
  const [variations, setVariations] = useState(1);
  const [describing, setDescribing] = useState(false);
  const [rebuilding, setRebuilding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function describe() {
    setDescribing(true);
    setError(null);
    try {
      const form = new FormData();
      if (file) form.append("reference", file);
      else form.set("url", url);

      const res = await fetch("/api/recreate", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not read that thumbnail.");
        return;
      }
      setBreakdown(data.breakdown);
      setSource(data.source);
    } catch {
      setError("Could not reach the server.");
    } finally {
      setDescribing(false);
    }
  }

  async function rebuild() {
    setRebuilding(true);
    setError(null);
    try {
      const form = new FormData();
      form.set("breakdown", breakdown);
      form.set("title", title);
      form.set("personaId", personaId);
      form.set("styleId", styleId);
      form.set("variations", String(variations));

      const res = await fetch("/api/recreate", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Recreate failed.");
        return;
      }
      onResults(data.results, data.warnings ?? [], variations);
    } catch {
      setError("Could not reach the server.");
    } finally {
      setRebuilding(false);
    }
  }

  return (
    <section className="space-y-5">
      <p className="text-sm text-neutral-500">
        Point at a thumbnail that already works and rebuild its composition with your own face
        and style. It copies the <em>format</em> — framing, palette, energy, text placement — not
        the original creator&apos;s face or brand marks.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="ytUrl" className="text-sm font-semibold">
            YouTube link
          </label>
          <input
            id="ytUrl"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setFile(null);
            }}
            placeholder="https://youtu.be/…"
            className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="refFile" className="text-sm font-semibold">
            …or upload a thumbnail
          </label>
          <input
            id="refFile"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => {
              setFile(e.target.files?.[0] ?? null);
              setUrl("");
            }}
            className="block w-full text-sm"
          />
        </div>
      </div>

      <button
        onClick={describe}
        disabled={disabled || describing || (!url.trim() && !file)}
        className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium disabled:opacity-40 dark:border-neutral-700"
      >
        {describing ? "Reading composition…" : "Read composition"}
      </button>

      {error && (
        <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {breakdown && (
        <div className="space-y-4 rounded-lg border border-neutral-300 p-4 dark:border-neutral-700">
          <div className="flex flex-col gap-4 sm:flex-row">
            {source && (
              <Image
                src={source}
                alt="Reference thumbnail"
                width={224}
                height={126}
                unoptimized
                className="h-auto w-56 shrink-0 rounded-md"
              />
            )}
            <div className="flex-1 space-y-1">
              <label htmlFor="breakdown" className="text-sm font-semibold">
                Composition breakdown
              </label>
              <textarea
                id="breakdown"
                value={breakdown}
                onChange={(e) => setBreakdown(e.target.value)}
                rows={8}
                className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-xs dark:border-neutral-700"
              />
              <p className="text-xs text-neutral-500">
                Edit this before rebuilding — it is exactly what gets carried over.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="recreateTitle" className="text-sm font-semibold">
                Your headline
              </label>
              <input
                id="recreateTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="I Tried This For 30 Days"
                className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="recreateVariations" className="text-sm font-semibold">
                Variations: {variations}
              </label>
              <input
                id="recreateVariations"
                type="range"
                min={1}
                max={6}
                value={variations}
                onChange={(e) => setVariations(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <PersonaPicker personas={personas} value={personaId} onChange={setPersonaId} />
            <StylePicker styles={styles} value={styleId} onChange={setStyleId} />
          </div>

          {!personaId && (
            <p className="text-xs text-amber-600">
              Pick a persona — without one there is no face to rebuild the composition around.
            </p>
          )}

          <button
            onClick={rebuild}
            disabled={disabled || rebuilding || !personaId}
            className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
          >
            {rebuilding ? "Rebuilding…" : "Recreate with my face"}
          </button>
        </div>
      )}
    </section>
  );
}
