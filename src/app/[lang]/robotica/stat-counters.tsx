"use client";

import { stats, statsFor } from "@/content/robotica";
import { useLang } from "@/i18n/lang-context";

function Stat({ n, label, detail, index }: (typeof stats)[number] & { index: number }) {
  return (
    <div
      className={`flex flex-col gap-2 border-line py-5 pr-5 ${index % 2 ? "border-l pl-5" : ""} ${index > 1 ? "border-t sm:border-t-0" : ""} sm:pl-5 sm:first:pl-0 sm:[&:not(:first-child)]:border-l`}
    >
      <div className="flex items-baseline gap-2">
        <dt className="display text-[clamp(2.4rem,5vw,3.4rem)] leading-none tabular-nums">{n}</dt>
        <span className="font-mono text-[11px] tracking-[0.12em] text-accent uppercase">{label}</span>
      </div>
      <dd className="text-[13px] leading-snug text-muted">{detail}</dd>
    </div>
  );
}

/** The four robotics numbers as one readout strip. */
export function StatCounters() {
  const lang = useLang();
  return (
    <dl className="grid grid-cols-2 border-y-2 border-ink sm:grid-cols-4">
      {statsFor(lang).map((s, i) => (
        <Stat key={s.label} {...s} index={i} />
      ))}
    </dl>
  );
}
