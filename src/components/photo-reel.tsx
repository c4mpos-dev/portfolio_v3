"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { TravelPhoto } from "@/content/info";
import { tr } from "@/i18n";
import { useLang } from "@/i18n/lang-context";

const coord = (lat: number, lon: number, en: boolean) =>
  `${Math.abs(lat).toFixed(2)}°${lat < 0 ? "S" : "N"} ${Math.abs(lon).toFixed(2)}°${lon < 0 ? (en ? "W" : "O") : en ? "E" : "L"}`;

/**
 * Travel photos in the "Sobre" sheet, one after another, like prints coming out of a
 * blueprint copier: a scan line runs down the frame, the new photo appears behind it
 * still in blueprint tones and develops into colour, then drifts slowly while shown.
 * The segments on top fill up and, when full, hand over to the next photo. Pauses on hover, on focus and when
 * off screen; with reduced motion it doesn't advance on its own.
 */
export function PhotoReel({ photos, fig }: { photos: TravelPhoto[]; fig: string }) {
  const lang = useLang();
  const en = lang === "en";
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [hold, setHold] = useState(false);
  const [offscreen, setOffscreen] = useState(true);
  const [still, setStill] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(media.matches);
    sync();
    media.addEventListener("change", sync);
    const io = new IntersectionObserver(([e]) => setOffscreen(!e.isIntersecting), { threshold: 0.3 });
    if (root.current) io.observe(root.current);
    return () => {
      media.removeEventListener("change", sync);
      io.disconnect();
    };
  }, []);

  const go = (n: number) => {
    if (n === i) return;
    setPrev(i);
    setI((n + photos.length) % photos.length);
  };
  const paused = hold || offscreen;
  const current = photos[i];

  return (
    <figure>
      <div className="crop">
        <div
          ref={root}
          data-r=""
          onPointerEnter={() => setHold(true)}
          onPointerLeave={() => setHold(false)}
          onFocus={() => setHold(true)}
          onBlur={() => setHold(false)}
          className="plot relative aspect-[4/5] overflow-hidden border border-line bg-sheet"
          aria-roledescription={tr(lang, "carrossel", "carousel")}
          aria-label={tr(lang, "Fotos de viagens", "Travel photos")}
        >
          {photos.map((p, n) => {
            const shown = n === i;
            const under = n === prev;
            // Every photo stays mounted (hidden when idle) so it is already loaded when its turn comes.
            return (
              <div
                key={`${n}-${shown ? i : "under"}`}
                aria-hidden={!shown}
                className={`absolute inset-0 ${shown ? "reel-in z-10" : under ? "z-0" : "invisible"}`}
              >
                {p.src ? (
                  <Image
                    src={p.src}
                    alt={shown ? [p.place, p.country].filter(Boolean).join(", ") : ""}
                    fill
                    sizes="(min-width: 1024px) 420px, 100vw"
                    loading="eager"
                    className={`object-cover ${shown && !still ? "reel-develop" : ""}`}
                  />
                ) : (
                  // Placeholder until the photo arrives: the place, plotted on the sheet
                  <div className="flex size-full flex-col items-center justify-center gap-3 bg-sheet bg-[repeating-linear-gradient(45deg,var(--line-soft)_0_1px,transparent_1px_8px)] p-6 text-center">
                    <svg viewBox="0 0 40 40" className="size-10" aria-hidden>
                      <circle cx="20" cy="20" r="13" fill="none" strokeWidth="1" style={{ stroke: "var(--accent)" }} />
                      <path d="M20 2V38M2 20H38" strokeWidth="1" strokeDasharray="2 2" style={{ stroke: "var(--accent)" }} />
                      <rect x="17" y="17" width="6" height="6" style={{ fill: "var(--accent)" }} />
                    </svg>
                    <span className="display text-[clamp(1.6rem,3vw,2.2rem)] leading-none">{p.place}</span>
                    <span className="font-mono text-[11px] tracking-[0.1em] text-muted uppercase">{p.country}</span>
                    <span className="mt-2 border border-line bg-sheet px-2 py-1 font-mono text-[10px] tracking-[0.08em] text-faint uppercase">
                      {tr(lang, "foto pendente", "photo pending")}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {/* The copier's scan line, riding the edge of the new print (outside it, so the clip doesn't hide it) */}
          {prev !== null && !still && (
            <span key={`scan-${i}`} aria-hidden className="reel-scan pointer-events-none absolute inset-x-0 z-[15] h-[2px] -translate-y-1/2 bg-accent" />
          )}

          {/* Progress segments: the active one fills up, and when it is full the next photo comes in */}
          <div className="absolute inset-x-3 top-3 z-20 flex gap-1.5" data-paused={paused || still ? "" : undefined}>
            {photos.map((p, n) => (
              <button
                key={n}
                type="button"
                onClick={() => go(n)}
                aria-label={`${tr(lang, "Foto", "Photo")} ${n + 1}: ${p.place}`}
                aria-current={n === i ? "true" : undefined}
                className="h-3 flex-1 cursor-pointer py-1"
              >
                <span className="block h-[3px] overflow-hidden bg-ink/25">
                  <span
                    key={n === i ? `on-${i}` : "off"}
                    onAnimationEnd={n === i ? () => go(i + 1) : undefined}
                    className={`block h-full origin-left bg-accent ${n < i ? "" : n === i ? (still ? "scale-x-0" : "reel-bar") : "scale-x-0"}`}
                  />
                </span>
              </button>
            ))}
          </div>

          {/* Caption strip, like the label on a print */}
          <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent px-4 pt-10 pb-3 font-mono text-[10.5px] tracking-[0.06em] text-white uppercase">
            <span key={i} className="animate-fade-in">
              <span className="block text-[13px] tracking-normal normal-case">{[current.place, current.country].filter(Boolean).join(", ")}</span>
              {[current.lat !== undefined && current.lon !== undefined && coord(current.lat, current.lon, en), current.year].filter(Boolean).join(" · ")}
            </span>
            <span className="flex shrink-0 gap-1">
              <button type="button" onClick={() => go(i - 1)} aria-label={tr(lang, "Foto anterior", "Previous photo")} className="cursor-pointer border border-white/50 px-2 py-1 hover:border-accent hover:text-accent">
                ←
              </button>
              <button type="button" onClick={() => go(i + 1)} aria-label={tr(lang, "Próxima foto", "Next photo")} className="cursor-pointer border border-white/50 px-2 py-1 hover:border-accent hover:text-accent">
                →
              </button>
            </span>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 font-mono text-[11px] text-muted">
        <span className="text-accent">
          FIG. {fig}.{i + 1}
        </span>{" "}
        · {tr(lang, "Por onde passei.", "Places I've been.")} {String(i + 1).padStart(2, "0")}/{String(photos.length).padStart(2, "0")}
      </figcaption>
    </figure>
  );
}
