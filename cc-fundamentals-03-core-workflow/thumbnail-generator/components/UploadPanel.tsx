"use client";

import { useRef, useState } from "react";
import { CAPS, ROLES, type Role } from "@/lib/refs";

export type Upload = { id: string; file: File; role: Role; previewUrl: string };

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

const ROLE_LABELS: Record<Role, string> = {
  character: "Person",
  object: "Object / logo",
  style: "Style reference",
};

export function UploadPanel({
  uploads,
  onChange,
}: {
  uploads: Upload[];
  onChange: (next: Upload[]) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const [rejected, setRejected] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const counts = ROLES.reduce(
    (acc, role) => ({ ...acc, [role]: uploads.filter((u) => u.role === role).length }),
    {} as Record<Role, number>
  );

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const problems: string[] = [];
    const accepted: Upload[] = [];

    for (const file of Array.from(fileList)) {
      if (!ALLOWED.includes(file.type)) {
        problems.push(`${file.name} — not a JPEG, PNG, or WebP.`);
        continue;
      }
      if (file.size > MAX_BYTES) {
        problems.push(`${file.name} — larger than 10MB.`);
        continue;
      }
      // First image defaults to the person; later ones default to objects.
      const role: Role = uploads.length + accepted.length === 0 ? "character" : "object";
      accepted.push({
        id: crypto.randomUUID(),
        file,
        role,
        previewUrl: URL.createObjectURL(file),
      });
    }

    setRejected(problems);
    if (accepted.length) onChange([...uploads, ...accepted]);
  }

  function remove(id: string) {
    const target = uploads.find((u) => u.id === id);
    if (target) URL.revokeObjectURL(target.previewUrl);
    onChange(uploads.filter((u) => u.id !== id));
  }

  function setRole(id: string, role: Role) {
    onChange(uploads.map((u) => (u.id === id ? { ...u, role } : u)));
  }

  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-semibold">Reference images</h2>
        <span className="text-xs text-neutral-500">
          {counts.character}/{CAPS.character} people · {counts.object}/{CAPS.object} objects ·{" "}
          {counts.style}/{CAPS.style} styles
        </span>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center text-sm transition ${
          dragging
            ? "border-blue-500 bg-blue-500/10"
            : "border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-600"
        }`}
      >
        <p className="font-medium">Drop images here, or click to browse</p>
        <p className="mt-1 text-xs text-neutral-500">
          JPEG, PNG, or WebP · up to 10MB each · tag each one so the model knows what to do with it
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ALLOWED.join(",")}
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {rejected.length > 0 && (
        <ul className="rounded-md bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
          {rejected.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      )}

      {uploads.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {uploads.map((u) => (
            <li
              key={u.id}
              className="space-y-2 rounded-lg border border-neutral-200 p-2 dark:border-neutral-800"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={u.previewUrl}
                alt={u.file.name}
                className="aspect-video w-full rounded object-cover"
              />
              <select
                value={u.role}
                onChange={(e) => setRole(u.id, e.target.value as Role)}
                className="w-full rounded border border-neutral-300 bg-transparent px-2 py-1 text-xs dark:border-neutral-700"
              >
                {ROLES.map((role) => (
                  <option key={role} value={role}>
                    {ROLE_LABELS[role]}
                  </option>
                ))}
              </select>
              <button
                onClick={() => remove(u.id)}
                className="w-full text-xs text-neutral-500 hover:text-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
