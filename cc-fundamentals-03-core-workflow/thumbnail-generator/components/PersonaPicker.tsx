"use client";

import Link from "next/link";
import type { Persona } from "@/lib/models";

export function PersonaPicker({
  personas,
  value,
  onChange,
}: {
  personas: Persona[];
  value: string;
  onChange: (id: string) => void;
}) {
  const active = personas.find((p) => p.id === value);

  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between">
        <label htmlFor="persona" className="text-sm font-semibold">
          Persona
        </label>
        <Link href="/personas" className="text-xs text-blue-600 underline">
          Manage
        </Link>
      </div>
      <select
        id="persona"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
      >
        <option value="">None — use uploads only</option>
        {personas.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} ({p.images.length} photo{p.images.length === 1 ? "" : "s"})
          </option>
        ))}
      </select>
      <p className="text-xs text-neutral-500">
        {active?.note || "A saved face, reused across sessions without re-uploading."}
      </p>
    </div>
  );
}
