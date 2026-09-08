"use client";

import Link from "next/link";
import type { Style } from "@/lib/models";

export function StylePicker({
  styles,
  value,
  onChange,
}: {
  styles: Style[];
  value: string;
  onChange: (id: string) => void;
}) {
  const active = styles.find((s) => s.id === value);

  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between">
        <label htmlFor="style" className="text-sm font-semibold">
          Channel style
        </label>
        <Link href="/styles" className="text-xs text-blue-600 underline">
          Manage
        </Link>
      </div>
      <select
        id="style"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
      >
        <option value="">None — use the preset only</option>
        {styles.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
      <p className="line-clamp-2 text-xs text-neutral-500">
        {active?.description || "A saved look, learned from thumbnails you already publish."}
      </p>
    </div>
  );
}
