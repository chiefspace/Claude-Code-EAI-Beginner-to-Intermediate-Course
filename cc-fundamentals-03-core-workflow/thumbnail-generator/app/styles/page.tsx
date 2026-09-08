"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StyleForm } from "@/components/StyleForm";
import type { Style } from "@/lib/models";

export default function StylesPage() {
  const [styles, setStyles] = useState<Style[]>([]);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/styles")
      .then((r) => r.json())
      .then((d) => setStyles(d.styles ?? []))
      .catch(() => setStyles([]))
      .finally(() => setLoading(false));
  }, []);

  async function remove(id: string) {
    const res = await fetch(`/api/styles/${id}`, { method: "DELETE" });
    if (res.ok) setStyles((all) => all.filter((s) => s.id !== id));
  }

  async function saveDescription(id: string) {
    setSaving(id);
    try {
      const res = await fetch(`/api/styles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: drafts[id] ?? "" }),
      });
      const data = await res.json();
      if (res.ok) {
        setStyles((all) => all.map((s) => (s.id === id ? data.style : s)));
        setDrafts((d) => {
          const next = { ...d };
          delete next[id];
          return next;
        });
      }
    } finally {
      setSaving(null);
    }
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <header className="space-y-1">
        <Link href="/" className="text-xs text-blue-600 underline">
          ← Back to generator
        </Link>
        <h1 className="text-2xl font-bold">Styles</h1>
        <p className="text-sm text-neutral-500">
          Learn a channel&apos;s look from thumbnails you already publish, then apply it to
          everything after. The description below is a prompt fragment — a hand-tuned one usually
          beats the generated one.
        </p>
      </header>

      <StyleForm onCreated={(s) => setStyles((all) => [s, ...all])} />

      {loading ? (
        <p className="text-sm text-neutral-500">Loading…</p>
      ) : styles.length === 0 ? (
        <p className="rounded-lg border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500 dark:border-neutral-700">
          No styles yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {styles.map((style) => {
            const draft = drafts[style.id];
            const dirty = draft !== undefined && draft !== style.description;

            return (
              <li
                key={style.id}
                className="space-y-2 rounded-lg border border-neutral-300 p-4 dark:border-neutral-700"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold">{style.name}</h3>
                  <button
                    onClick={() => remove(style.id)}
                    className="shrink-0 text-xs text-red-600 underline"
                  >
                    Delete
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {style.images.map((image) => (
                    <Image
                      key={image.id}
                      src={image.url}
                      alt=""
                      width={128}
                      height={72}
                      unoptimized
                      className="h-[72px] w-32 rounded-md object-cover"
                    />
                  ))}
                </div>

                <textarea
                  value={draft ?? style.description}
                  onChange={(e) =>
                    setDrafts((d) => ({ ...d, [style.id]: e.target.value }))
                  }
                  rows={3}
                  placeholder="No description was extracted — describe the look yourself."
                  className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-xs dark:border-neutral-700"
                />

                <button
                  onClick={() => saveDescription(style.id)}
                  disabled={!dirty || saving === style.id}
                  className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs disabled:opacity-40 dark:border-neutral-700"
                >
                  {saving === style.id ? "Saving…" : "Save description"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
