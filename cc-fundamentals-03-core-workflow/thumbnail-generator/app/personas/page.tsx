"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PersonaForm } from "@/components/PersonaForm";
import { PERSONA_MIN_IMAGES, type Persona } from "@/lib/models";

export default function PersonasPage() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/personas")
      .then((r) => r.json())
      .then((d) => setPersonas(d.personas ?? []))
      .catch(() => setPersonas([]))
      .finally(() => setLoading(false));
  }, []);

  async function remove(id: string) {
    const res = await fetch(`/api/personas/${id}`, { method: "DELETE" });
    if (res.ok) setPersonas((all) => all.filter((p) => p.id !== id));
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <header className="space-y-1">
        <Link href="/" className="text-xs text-blue-600 underline">
          ← Back to generator
        </Link>
        <h1 className="text-2xl font-bold">Personas</h1>
        <p className="text-sm text-neutral-500">
          Save a face once. Every generation that selects it reuses the same photos, so video 40
          looks like video 1 without re-uploading anything.
        </p>
      </header>

      <PersonaForm onCreated={(p) => setPersonas((all) => [p, ...all])} />

      {loading ? (
        <p className="text-sm text-neutral-500">Loading…</p>
      ) : personas.length === 0 ? (
        <p className="rounded-lg border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500 dark:border-neutral-700">
          No personas yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {personas.map((persona) => (
            <li
              key={persona.id}
              className="space-y-2 rounded-lg border border-neutral-300 p-4 dark:border-neutral-700"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{persona.name}</h3>
                  <p className="text-xs text-neutral-500">
                    {persona.note || "No description was extracted."}
                  </p>
                </div>
                <button
                  onClick={() => remove(persona.id)}
                  className="shrink-0 text-xs text-red-600 underline"
                >
                  Delete
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {persona.images.map((image) => (
                  <Image
                    key={image.id}
                    src={image.url}
                    alt=""
                    width={64}
                    height={64}
                    unoptimized
                    className="h-16 w-16 rounded-md object-cover"
                  />
                ))}
              </div>

              {persona.images.length < PERSONA_MIN_IMAGES && (
                <p className="text-xs text-amber-600">
                  Only {persona.images.length} photo
                  {persona.images.length === 1 ? "" : "s"} — likeness gets unreliable below{" "}
                  {PERSONA_MIN_IMAGES}.
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
