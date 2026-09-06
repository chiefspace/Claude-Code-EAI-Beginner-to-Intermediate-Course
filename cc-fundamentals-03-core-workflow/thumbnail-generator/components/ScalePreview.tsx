"use client";

/**
 * YouTube's feed renders thumbnails around 168px wide on mobile. Checking
 * legibility at that size before download is the whole point of this component.
 */
export function ScalePreview({ src }: { src: string }) {
  return (
    <div className="flex items-center gap-3 rounded-md bg-neutral-100 p-2 dark:bg-neutral-900">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="Thumbnail at feed size" width={168} height={94} className="rounded" />
      <div className="text-xs text-neutral-500">
        <p className="font-medium text-neutral-700 dark:text-neutral-300">Feed size (168px)</p>
        <p>If the headline is hard to read here, it will be hard to read on YouTube.</p>
      </div>
    </div>
  );
}
