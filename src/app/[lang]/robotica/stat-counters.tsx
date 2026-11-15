"use client";

import { useEffect, useRef, useState } from "react";
import { stats, statsFor } from "@/content/robotica";
import { useLang } from "@/i18n/lang-context";

/** Counts from 0 to `to` once the element is on screen. Shows the final value with reduced motion. */
function useCountUp(to: number, el: React.RefObject<HTMLElement | null>) {
  const [value, setValue] = useState(to);

  useEffect(() => {
    const node = el.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / 1100);
          setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame((t) => {
          setValue(0);
          tick(t);
        });
      },
      { threshold: 0.6 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, el]);

  return value;
}

function Stat({ n, label, detail, index }: (typeof stats)[number] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const value = useCountUp(n, ref);
  return (
    <div
      ref={ref}
      className={`flex flex-col gap-2 border-line py-5 pr-5 ${index % 2 ? "border-l pl-5" : ""} ${index > 1 ? "border-t sm:border-t-0" : ""} sm:pl-5 sm:first:pl-0 sm:[&:not(:first-child)]:border-l`}
    >
      <div className="flex items-baseline gap-2">
        <dt className="display text-[clamp(2.4rem,5vw,3.4rem)] leading-none tabular-nums">{value}</dt>
        <span className="font-mono text-[11px] tracking-[0.12em] text-accent uppercase">{label}</span>
      </div>
      <dd className="text-[13px] leading-snug text-muted">{detail}</dd>
    </div>
  );
}

/** The four robotics numbers as one readout strip; they count up when they come into view. */
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
