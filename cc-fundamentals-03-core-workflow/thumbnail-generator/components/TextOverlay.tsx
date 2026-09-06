"use client";

import { useEffect, useRef, useState } from "react";
import { HEIGHT, WIDTH } from "@/lib/spec";

type VAlign = "top" | "middle" | "bottom";
type HAlign = "left" | "center" | "right";

const PADDING = 64;

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    let line = "";
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      const candidate = line ? `${line} ${word}` : word;
      if (ctx.measureText(candidate).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = candidate;
      }
    }
    lines.push(line);
  }
  return lines;
}

/**
 * Deterministic headline layer. The model renders text well, but when spelling
 * or placement has to be exact, this composites it client-side instead.
 */
export function TextOverlay({ src, initialText }: { src: string; initialText: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState(initialText);
  const [size, setSize] = useState(110);
  const [vAlign, setVAlign] = useState<VAlign>("bottom");
  const [hAlign, setHAlign] = useState<HAlign>("center");
  const [fill, setFill] = useState("#ffffff");
  const [stroke, setStroke] = useState("#000000");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.onload = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);
      if (!text.trim()) return;

      ctx.font = `900 ${size}px system-ui, -apple-system, "Segoe UI", sans-serif`;
      ctx.textBaseline = "top";
      ctx.lineJoin = "round";
      ctx.lineWidth = Math.max(6, size * 0.14);
      ctx.strokeStyle = stroke;
      ctx.fillStyle = fill;

      const lines = wrap(ctx, text, WIDTH - PADDING * 2);
      const lineHeight = size * 1.08;
      const blockHeight = lines.length * lineHeight;

      const y =
        vAlign === "top"
          ? PADDING
          : vAlign === "middle"
            ? (HEIGHT - blockHeight) / 2
            : HEIGHT - blockHeight - PADDING;

      lines.forEach((line, i) => {
        const w = ctx.measureText(line).width;
        const x =
          hAlign === "left" ? PADDING : hAlign === "right" ? WIDTH - PADDING - w : (WIDTH - w) / 2;
        ctx.strokeText(line, x, y + i * lineHeight);
        ctx.fillText(line, x, y + i * lineHeight);
      });
    };
    image.src = src;
  }, [src, text, size, vAlign, hAlign, fill, stroke]);

  function download() {
    canvasRef.current?.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "thumbnail-with-text.jpg";
        a.click();
        URL.revokeObjectURL(url);
      },
      "image/jpeg",
      0.92
    );
  }

  return (
    <div className="space-y-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        className="w-full rounded border border-neutral-200 dark:border-neutral-800"
      />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        placeholder="Headline text (Enter for a new line)"
        className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"
      />

      <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
        <label className="space-y-1">
          <span className="text-neutral-500">Size</span>
          <input
            type="range"
            min={40}
            max={200}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full"
          />
        </label>
        <label className="space-y-1">
          <span className="text-neutral-500">Vertical</span>
          <select
            value={vAlign}
            onChange={(e) => setVAlign(e.target.value as VAlign)}
            className="w-full rounded border border-neutral-300 bg-transparent px-2 py-1 dark:border-neutral-700"
          >
            <option value="top">Top</option>
            <option value="middle">Middle</option>
            <option value="bottom">Bottom</option>
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-neutral-500">Horizontal</span>
          <select
            value={hAlign}
            onChange={(e) => setHAlign(e.target.value as HAlign)}
            className="w-full rounded border border-neutral-300 bg-transparent px-2 py-1 dark:border-neutral-700"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </label>
        <div className="flex items-end gap-2">
          <label className="space-y-1">
            <span className="block text-neutral-500">Fill</span>
            <input type="color" value={fill} onChange={(e) => setFill(e.target.value)} />
          </label>
          <label className="space-y-1">
            <span className="block text-neutral-500">Outline</span>
            <input type="color" value={stroke} onChange={(e) => setStroke(e.target.value)} />
          </label>
        </div>
      </div>

      <button
        onClick={download}
        className="w-full rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        Download with text
      </button>
    </div>
  );
}
