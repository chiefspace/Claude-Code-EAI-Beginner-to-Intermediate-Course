"use client";

import { useState } from "react";

export function TitleSuggestions({ titles }: { titles: string[] }) {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(title: string) {
    try {
      await navigator.clipboard.writeText(title);
      setCopied(title);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  }

  return (
    <div className="space-y-2 rounded-md border border-neutral-200 p-3 dark:border-neutral-800">
      <h4 className="text-xs font-semibold">Matched titles</h4>
      <ul className="space-y-1">
        {titles.map((title) => (
          <li key={title} className="flex items-start gap-2 text-xs">
            <button
              onClick={() => copy(title)}
              className="shrink-0 text-blue-600 underline"
              aria-label={`Copy "${title}"`}
            >
              {copied === title ? "Copied" : "Copy"}
            </button>
            <span>{title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
