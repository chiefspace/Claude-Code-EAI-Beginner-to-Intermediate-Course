"use client";

import { useState } from "react";
import { STYLE_MAX_IMAGES, type Style } from "@/lib/models";

export function StyleForm({ onCreated }: { onCreated: (style: Style) => void }) {
  const [name, setName] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const form = new FormData();
      form.set("name", name);
      for (const file of files) form.append("images", file);

      const res = await fetch("/api/styles", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not save the style.");
        return;
      }
      onCreated(data.style);
      setWarnings(data.warnings ?? []);
      setName("");
      setFiles([]);
    } catch {
      setError("Could not reach the server.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="space-y-3 rounded-lg border border-neutral-300 p-4 dark:border-neutral-700">
      <h2 className="text-sm font-semibold">New style</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name (e.g. Main channel look)"
        className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
      />

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files ?? []).slice(0, STYLE_MAX_IMAGES))}
        className="block w-full text-sm"
      />

      <p className="text-xs text-neutral-500">
        1–{STYLE_MAX_IMAGES} thumbnails you have already published. The model reads their palette,
        lighting, and text treatment — not their subjects.
      </p>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {warnings.map((w) => (
        <p key={w} className="text-xs text-amber-600">
          {w}
        </p>
      ))}

      <button
        onClick={submit}
        disabled={busy || !name.trim() || files.length === 0}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
      >
        {busy ? "Saving…" : "Save style"}
      </button>
    </section>
  );
}
