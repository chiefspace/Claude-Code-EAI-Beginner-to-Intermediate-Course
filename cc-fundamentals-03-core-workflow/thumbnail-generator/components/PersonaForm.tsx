"use client";

import { useState } from "react";
import { PERSONA_MAX_IMAGES, PERSONA_MIN_IMAGES, type Persona } from "@/lib/models";

export function PersonaForm({ onCreated }: { onCreated: (persona: Persona) => void }) {
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

      const res = await fetch("/api/personas", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not save the persona.");
        return;
      }
      onCreated(data.persona);
      setWarnings(data.warnings ?? []);
      setName("");
      setFiles([]);
    } catch {
      setError("Could not reach the server.");
    } finally {
      setBusy(false);
    }
  }

  const tooFew = files.length > 0 && files.length < PERSONA_MIN_IMAGES;

  return (
    <section className="space-y-3 rounded-lg border border-neutral-300 p-4 dark:border-neutral-700">
      <h2 className="text-sm font-semibold">New persona</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name (e.g. Ben — main channel)"
        className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
      />

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files ?? []).slice(0, PERSONA_MAX_IMAGES))}
        className="block w-full text-sm"
      />

      <p className="text-xs text-neutral-500">
        {PERSONA_MIN_IMAGES}–{PERSONA_MAX_IMAGES} photos of the same person, from varied angles and
        lighting. The model caps character references at {PERSONA_MAX_IMAGES}.
      </p>

      {tooFew && (
        <p className="text-xs text-amber-600">
          {files.length} photo{files.length === 1 ? "" : "s"} selected — likeness gets unreliable
          below {PERSONA_MIN_IMAGES}.
        </p>
      )}

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
        {busy ? "Saving…" : "Save persona"}
      </button>
    </section>
  );
}
