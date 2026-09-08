"use client";

const LABELS: Record<string, string> = {
  clarity: "Clarity",
  curiosity: "Curiosity",
  emotion: "Emotion",
  contrast: "Contrast",
  mobileLegibility: "Mobile legibility",
};

export type ScoreCardData = Record<string, { score: number; note: string } | number> & {
  overall: number;
};

function barColor(score: number): string {
  if (score >= 8) return "bg-green-600";
  if (score >= 5) return "bg-amber-500";
  return "bg-red-500";
}

export function ScoreCard({
  data,
  topFix,
  onApplyTopFix,
  applying,
}: {
  data: ScoreCardData;
  topFix?: { dimension: string; note: string };
  onApplyTopFix?: () => void;
  applying?: boolean;
}) {
  return (
    <div className="space-y-3 rounded-md border border-neutral-200 p-3 dark:border-neutral-800">
      <div className="flex items-baseline justify-between">
        <h4 className="text-xs font-semibold">Scorecard</h4>
        <span className="text-xs text-neutral-500">{data.overall} / 10 overall</span>
      </div>

      <ul className="space-y-2">
        {Object.keys(LABELS).map((key) => {
          const entry = data[key];
          if (typeof entry !== "object") return null;
          return (
            <li key={key} className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-28 shrink-0">{LABELS[key]}</span>
                <div className="h-1.5 flex-1 rounded-full bg-neutral-200 dark:bg-neutral-800">
                  <div
                    className={`h-1.5 rounded-full ${barColor(entry.score)}`}
                    style={{ width: `${entry.score * 10}%` }}
                  />
                </div>
                <span className="w-6 shrink-0 text-right tabular-nums">{entry.score}</span>
              </div>
              <p className="pl-30 text-xs text-neutral-500">{entry.note}</p>
            </li>
          );
        })}
      </ul>

      {topFix && onApplyTopFix && (
        <button
          onClick={onApplyTopFix}
          disabled={applying}
          className="w-full rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-500 disabled:opacity-50"
        >
          {applying ? "Applying…" : `Apply top fix (${LABELS[topFix.dimension] ?? topFix.dimension})`}
        </button>
      )}
    </div>
  );
}
