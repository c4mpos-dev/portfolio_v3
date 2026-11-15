"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navFor } from "@/content/site";
import { stripLang, tr } from "@/i18n";
import { useLang } from "@/i18n/lang-context";

/**
 * Drafting ruler pinned to the left margin (wide screens): the whole page mapped onto
 * one scale, with a tick per "folha" and a marker that slides with the reading position.
 * ScrollFx moves the marker (--prog) and writes the percentage.
 */
export function ScrollRuler() {
  const lang = useLang();
  const pathname = usePathname();
  const { sections } = navFor(stripLang(pathname), lang);
  const [marks, setMarks] = useState<{ path: string; at: Record<string, number> }>({ path: "", at: {} });

  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const at: Record<string, number> = {};
      for (const el of document.querySelectorAll<HTMLElement>("[data-section]")) {
        // Where the page progress is when this section reaches the middle of the screen.
        const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.45;
        at[el.id] = Math.max(0, Math.min(1, top / max));
      }
      setMarks({ path: pathname, at });
    };
    // Fires once on observe, then whenever the page height changes (images, filters, fonts).
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, [pathname]);

  const at = marks.path === pathname ? marks.at : {};

  return (
    <nav
      data-ruler=""
      aria-label={tr(lang, "Posição na página", "Position on the page")}
      className="fixed top-1/2 left-6 z-30 hidden h-[min(56vh,480px)] w-24 -translate-y-1/2 font-mono text-[9.5px] tracking-[0.08em] text-faint uppercase min-[1280px]:block"
    >
      {/* Scale: a tick every 8px, a longer one every 40px */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-[11px] border-l border-line bg-[repeating-linear-gradient(var(--line)_0_1px,transparent_1px_8px),repeating-linear-gradient(var(--line)_0_1px,transparent_1px_40px)] bg-[length:5px_100%,11px_100%] bg-no-repeat"
      />
      {sections.map((s, i) =>
        at[s.id] === undefined ? null : (
          <a
            key={s.id}
            href={`#${s.id}`}
            style={{ top: `${at[s.id] * 100}%` }}
            className="group absolute left-0 flex -translate-y-1/2 items-center gap-1.5 py-1 transition-colors hover:text-accent"
          >
            <span className="h-px w-[18px] bg-ink transition-colors group-hover:bg-accent" />
            <span className="text-muted group-hover:text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span className="whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">{s.label}</span>
          </a>
        ),
      )}
      <div aria-hidden className="ruler-marker pointer-events-none absolute left-0 flex -translate-x-full -translate-y-1/2 items-center pr-1 text-accent">
        <span className="text-[8px] leading-none">▶</span>
      </div>
      <div aria-hidden className="absolute top-full left-0 mt-3 whitespace-nowrap">
        Y <span data-ruler-out="" className="text-accent tabular-nums">000</span>%
      </div>
    </nav>
  );
}
