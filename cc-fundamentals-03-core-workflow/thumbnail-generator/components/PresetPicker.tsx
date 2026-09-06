"use client";

import { PRESETS } from "@/lib/presets";

export function PresetPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  const active = PRESETS.find((p) => p.id === value);

  return (
    <div className="space-y-1">
      <label htmlFor="preset" className="text-sm font-semibold">
        Style preset
      </label>
      <select
        id="preset"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
      >
        {PRESETS.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      {active && <p className="text-xs text-neutral-500">{active.description}</p>}
    </div>
  );
}
