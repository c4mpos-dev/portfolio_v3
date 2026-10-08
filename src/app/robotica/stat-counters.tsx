"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/content/robotica";

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

function Stat({ n, label, detail, className }: (typeof stats)[number] & { className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const value = useCountUp(n, ref);
  return (
    <div ref={ref} tabIndex={0} className={`stat group px-5 py-4 outline-offset-[-2px] ${className}`}>
      <dt className="display text-[clamp(2rem,4vw,2.8rem)] leading-none tabular-nums">{value}</dt>
      <dd className="label mt-2 text-[10px]">{label}</dd>
      <dd className="stat-detail mt-2 text-[12.5px] leading-snug text-muted">{detail}</dd>
    </div>
  );
}

/** The four robotics numbers: they count up on arrival, and each explains itself on hover/focus (always on touch). */
export function StatCounters() {
  return (
    <dl className="crop grid grid-cols-2 border border-line bg-sheet">
      {stats.map((s, i) => (
        <Stat key={s.label} {...s} className={`${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t" : ""} border-line`} />
      ))}
    </dl>
  );
}
