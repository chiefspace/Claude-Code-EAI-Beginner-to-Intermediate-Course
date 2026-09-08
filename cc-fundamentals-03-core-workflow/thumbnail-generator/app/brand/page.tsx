"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { BrandKit, Persona, Style } from "@/lib/models";

const HEX = /^#[0-9a-fA-F]{6}$/;

export default function BrandPage() {
  const [kit, setKit] = useState<BrandKit>({
    colors: [],
    font: "",
    defaultPersonaId: null,
    defaultStyleId: null,
  });
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [styles, setStyles] = useState<Style[]>([]);
  const [colorDraft, setColorDraft] = useState("#");
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Must settle before the form renders — a late resolve would overwrite edits already typed.
    fetch("/api/brand")
      .then((r) => r.json())
      .then((d) => setKit(d.brandKit))
      .catch(() => {})
      .finally(() => setLoaded(true));
    fetch("/api/personas").then((r) => r.json()).then((d) => setPersonas(d.personas ?? [])).catch(() => {});
    fetch("/api/styles").then((r) => r.json()).then((d) => setStyles(d.styles ?? [])).catch(() => {});
  }, []);

  async function save(next: BrandKit) {
    setSaving(true);
    try {
      const res = await fetch("/api/brand", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      const data = await res.json();
      if (res.ok) {
        setKit(data.brandKit);
        setSaved(true);
        setTimeout(() => setSaved(false), 1500);
      }
    } finally {
      setSaving(false);
    }
  }

  function addColor() {
    if (!HEX.test(colorDraft) || kit.colors.includes(colorDraft)) return;
    setKit({ ...kit, colors: [...kit.colors, colorDraft].slice(0, 6) });
    setColorDraft("#");
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <header className="space-y-1">
        <Link href="/" className="text-xs text-blue-600 underline">
          ← Back to generator
        </Link>
        <h1 className="text-2xl font-bold">Brand kit</h1>
        <p className="text-sm text-neutral-500">
          Channel colours and lettering, injected into every generation, plus the persona and
          style selected by default.
        </p>
      </header>

      {!loaded ? (
        <p className="text-sm text-neutral-500">Loading…</p>
      ) : (
        <>
      <section className="space-y-3 rounded-lg border border-neutral-300 p-4 dark:border-neutral-700">
        <h2 className="text-sm font-semibold">Colours</h2>

        <div className="flex flex-wrap gap-2">
          {kit.colors.map((color) => (
            <button
              key={color}
              onClick={() => setKit({ ...kit, colors: kit.colors.filter((c) => c !== color) })}
              title={`Remove ${color}`}
              className="flex items-center gap-2 rounded-md border border-neutral-300 px-2 py-1 text-xs dark:border-neutral-700"
            >
              <span className="h-4 w-4 rounded" style={{ backgroundColor: color }} />
              {color} ×
            </button>
          ))}
          {kit.colors.length === 0 && (
            <p className="text-xs text-neutral-500">No brand colours set.</p>
          )}
        </div>

        <div className="flex gap-2">
          <input
            value={colorDraft}
            onChange={(e) => setColorDraft(e.target.value)}
            placeholder="#1d4ed8"
            className="w-32 rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
          />
          <button
            onClick={addColor}
            disabled={!HEX.test(colorDraft) || kit.colors.length >= 6}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm disabled:opacity-40 dark:border-neutral-700"
          >
            Add colour
          </button>
        </div>
        <p className="text-xs text-neutral-500">Six-digit hex, up to 6 colours.</p>
      </section>

      <section className="space-y-3 rounded-lg border border-neutral-300 p-4 dark:border-neutral-700">
        <h2 className="text-sm font-semibold">Lettering</h2>
        <input
          value={kit.font}
          onChange={(e) => setKit({ ...kit, font: e.target.value })}
          placeholder="e.g. heavy condensed grotesque, all caps"
          className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
        />
        <p className="text-xs text-neutral-500">
          Described in words, not a font file — the model renders letterforms, it does not load
          fonts.
        </p>
      </section>

      <section className="grid gap-4 rounded-lg border border-neutral-300 p-4 sm:grid-cols-2 dark:border-neutral-700">
        <div className="space-y-1">
          <label htmlFor="defaultPersona" className="text-sm font-semibold">
            Default persona
          </label>
          <select
            id="defaultPersona"
            value={kit.defaultPersonaId ?? ""}
            onChange={(e) => setKit({ ...kit, defaultPersonaId: e.target.value || null })}
            className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
          >
            <option value="">None</option>
            {personas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="defaultStyle" className="text-sm font-semibold">
            Default style
          </label>
          <select
            id="defaultStyle"
            value={kit.defaultStyleId ?? ""}
            onChange={(e) => setKit({ ...kit, defaultStyleId: e.target.value || null })}
            className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
          >
            <option value="">None</option>
            {styles.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <button
          onClick={() => save(kit)}
          disabled={saving}
          className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save brand kit"}
        </button>
        {saved && <span className="text-xs text-green-600">Saved</span>}
      </div>
        </>
      )}
    </main>
  );
}
