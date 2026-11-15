"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Redacted } from "@/components/redacted";
import { Figure } from "@/components/ui";
import type { Shot } from "@/content/projects";
import { tr } from "@/i18n";
import { useLang } from "@/i18n/lang-context";

/**
 * The project's figures. A figure with an image opens it in a viewer (same as the
 * robotics timeline): full size, caption, ← → between images, Esc or a click outside closes.
 */
export function ProjectGallery({
  name,
  item,
  org,
  company,
  shots,
}: {
  name: string;
  item: string;
  org?: string;
  /** Company work: a figure without an image becomes a redacted sheet. */
  company: boolean;
  shots: Shot[];
}) {
  const lang = useLang();
  const viewable = shots.filter((s) => s.src);
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const current = open === null ? null : viewable[open];

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (current && !d.open) d.showModal();
    if (!current && d.open) d.close();
  }, [current]);

  const step = (dir: number) => setOpen((i) => (i === null ? i : (i + dir + viewable.length) % viewable.length));
  const figOf = (s: Shot) => `${item}.${shots.indexOf(s) + 1}`;

  return (
    <>
      <div className="grid gap-8 desk:grid-cols-2">
        {shots.map((s, si) => {
          const fig = figOf(s);
          // With an odd number of shots, the first one spans the full width.
          const wide = si === 0 && shots.length % 2 === 1 ? "desk:col-span-2" : "";
          if (!s.src && company) {
            // A private system has no screens to show: file a redacted sheet in its place.
            return (
              <div key={s.caption} className={wide}>
                <Redacted fig={fig} caption={s.caption} org={org} lang={lang} />
              </div>
            );
          }
          const vi = viewable.indexOf(s);
          return (
            <div key={s.caption} className={wide}>
              {/* Screenshots are shown whole (contain), never cropped */}
              <Figure
                src={s.src}
                alt={`${name} — ${s.caption}`}
                fig={fig}
                caption={s.caption}
                fit="contain"
                lang={lang}
                className="group aspect-[16/10]"
                overlay={
                  s.src && (
                    <button
                      type="button"
                      onClick={() => setOpen(vi)}
                      aria-label={`${tr(lang, "Ampliar", "Enlarge")}: ${s.caption}`}
                      className="absolute inset-0 cursor-zoom-in"
                    >
                      <span className="absolute right-2 bottom-2 bg-ink/80 px-1.5 py-0.5 font-mono text-[10px] text-paper uppercase transition-colors group-hover:bg-accent">
                        {tr(lang, "ampliar", "enlarge")}
                      </span>
                    </button>
                  )
                }
              />
            </div>
          );
        })}
      </div>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(null);
        }}
        className="m-auto w-[min(1120px,calc(100vw-24px))] max-w-none border border-line bg-sheet p-0 text-ink backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div>
            <div className="flex items-center justify-between border-b border-line px-4 py-2 font-mono text-[11px] tracking-[0.06em] text-muted uppercase">
              <span>
                <span className="text-accent">Fig. {figOf(current)}</span> · {name}
              </span>
              <button type="button" onClick={() => setOpen(null)} className="cursor-pointer hover:text-accent" aria-label={tr(lang, "Fechar", "Close")}>
                {tr(lang, "Fechar", "Close")} ✕
              </button>
            </div>
            <div className="relative h-[min(72vh,720px)] bg-paper">
              <Image src={current.src!} alt={`${name} — ${current.caption}`} fill sizes="1120px" className="object-contain p-3" />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-3">
              <p className="font-mono text-[12px] text-ink-2">{current.caption}</p>
              {viewable.length > 1 && (
                <div className="flex shrink-0 items-center gap-2">
                  <span className="font-mono text-[11px] text-faint">
                    {String(open! + 1).padStart(2, "0")}/{String(viewable.length).padStart(2, "0")}
                  </span>
                  <button type="button" onClick={() => step(-1)} className="cursor-pointer border border-line px-3 py-2 font-mono text-[12px] hover:border-accent hover:text-accent" aria-label={tr(lang, "Anterior", "Previous")}>
                    ←
                  </button>
                  <button type="button" onClick={() => step(1)} className="cursor-pointer border border-line px-3 py-2 font-mono text-[12px] hover:border-accent hover:text-accent" aria-label={tr(lang, "Próxima", "Next")}>
                    →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
