"use client";

import { useState } from "react";
import type { NormalizedImage } from "@/lib/spec";
import { ScalePreview } from "@/components/ScalePreview";
import { TextOverlay } from "@/components/TextOverlay";

function download(dataUrl: string, index: number) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = `thumbnail-${index + 1}.jpg`;
  a.click();
}

export function ResultsGrid({
  results,
  title,
  onRefine,
  refining,
}: {
  results: NormalizedImage[];
  title: string;
  onRefine: (image: NormalizedImage, instruction: string) => void;
  refining: boolean;
}) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [overlayId, setOverlayId] = useState<number | null>(null);
  const [instruction, setInstruction] = useState("");

  return (
    <section className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-semibold">
          {results.length} variation{results.length === 1 ? "" : "s"}
        </h2>
        <span className="text-xs text-neutral-500">
          1280×720 JPEG · YouTube-ready · SynthID watermarked
        </span>
      </div>

      <ul className="grid gap-6 lg:grid-cols-2">
        {results.map((result, i) => (
          <li key={i} className="space-y-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result.dataUrl}
              alt={`Variation ${i + 1}`}
              className="w-full rounded border border-neutral-200 dark:border-neutral-800"
            />

            <ScalePreview src={result.dataUrl} />

            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => download(result.dataUrl, i)}
                className="rounded-md bg-neutral-900 px-3 py-1.5 font-medium text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                Download
              </button>
              <button
                onClick={() => setOpenId(openId === i ? null : i)}
                className="rounded-md border border-neutral-300 px-3 py-1.5 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
              >
                Refine this one
              </button>
              <button
                onClick={() => setOverlayId(overlayId === i ? null : i)}
                className="rounded-md border border-neutral-300 px-3 py-1.5 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
              >
                {overlayId === i ? "Hide text editor" : "Add text myself"}
              </button>
              <span className="ml-auto self-center text-neutral-500">
                {(result.bytes / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>

            {openId === i && (
              <div className="space-y-2">
                <input
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  placeholder="e.g. brighter background, bigger text, more surprised expression"
                  className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
                />
                <button
                  disabled={refining || !instruction.trim()}
                  onClick={() => onRefine(result, instruction)}
                  className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-500 disabled:opacity-50"
                >
                  {refining ? "Refining…" : "Apply edit"}
                </button>
              </div>
            )}

            {overlayId === i && <TextOverlay src={result.dataUrl} initialText={title} />}
          </li>
        ))}
      </ul>
    </section>
  );
}
