"use client";

import { useState } from "react";
import { tr } from "@/i18n";
import { useLang } from "@/i18n/lang-context";

export type Week = { start: string; count: number };

/**
 * The weekly bars of the telemetry trace, read like an instrument: a needle follows
 * the pointer (or the arrow keys) along a tick scale and reads out that week.
 */
export function SignalChart({ weeks, peak, summary }: { weeks: Week[]; peak: number; summary: string }) {
  const lang = useLang();
  const [at, setAt] = useState<number | null>(null);
  const n = weeks.length;
  const clampIndex = (i: number) => Math.max(0, Math.min(n - 1, i));

  const pick = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setAt(clampIndex(Math.floor(((e.clientX - r.left) / r.width) * n)));
  };
  const onKey = (e: React.KeyboardEvent) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    setAt((i) => clampIndex((i ?? (step > 0 ? -1 : n)) + step));
  };

  const week = at === null ? null : weeks[at];
  // Keep the readout inside the chart near either end.
  const side = at === null ? "" : at < 7 ? "left-0" : at > n - 8 ? "right-0" : "left-1/2 -translate-x-1/2";

  return (
    <div
      data-r=""
      role="group"
      aria-label={`${summary} ${tr(lang, "Use as setas para ler cada semana.", "Use the arrow keys to read each week.")}`}
      tabIndex={0}
      onPointerMove={pick}
      onPointerDown={pick}
      onPointerLeave={() => setAt(null)}
      onBlur={() => setAt(null)}
      onKeyDown={onKey}
      className="relative cursor-crosshair touch-pan-y pt-7 outline-offset-4"
    >
      {/* Tick scale: one tick per week */}
      <div aria-hidden className="absolute inset-x-0 top-4 flex h-2 gap-[2px]">
        {weeks.map((w, i) => (
          <span key={w.start} className={`flex-1 border-l ${i === at ? "border-accent" : "border-line"} ${i % 4 ? "mt-1" : ""}`} />
        ))}
      </div>

      <div className="relative flex h-40 items-end gap-[2px]">
        {weeks.map((w, i) => (
          <span
            key={w.start}
            className={`sig flex-1 ${i === at || (at === null && w.count === peak) ? "bg-accent" : at === null ? "bg-ink/70" : "bg-ink/35"}`}
            style={{ height: `${Math.max(2, (w.count / peak) * 100)}%`, transitionDelay: `${i * 14}ms` }}
          />
        ))}
      </div>

      {week && at !== null && (
        <div aria-hidden className="pointer-events-none absolute inset-y-0" style={{ left: `${((at + 0.5) / n) * 100}%` }}>
          <span className="absolute top-3 bottom-0 left-0 w-px -translate-x-1/2 bg-accent" />
          <span className={`absolute top-[-6px] bg-accent px-1.5 py-0.5 font-mono text-[10.5px] whitespace-nowrap text-accent-ink ${side}`}>
            {tr(lang, "sem.", "wk.")} {week.start} · {week.count} {week.count === 1 ? "commit" : "commits"}
          </span>
        </div>
      )}
      <span role="status" className="sr-only">
        {week ? tr(lang, `Semana de ${week.start}: ${week.count} commits`, `Week of ${week.start}: ${week.count} commits`) : ""}
      </span>
    </div>
  );
}
