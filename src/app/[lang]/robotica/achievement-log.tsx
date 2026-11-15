"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { requestRevealScan } from "@/components/scroll-fx";
import { achievementGroupsFor, achievementsFor, type AchievementGroup } from "@/content/achievements";
import { tr } from "@/i18n";
import { useLang } from "@/i18n/lang-context";

type Filter = "todas" | AchievementGroup;

/** Competition log for the given groups: filterable timeline, each entry with its photo; click opens a viewer. */
export function AchievementLog({ groups }: { groups: AchievementGroup[] }) {
  const [filter, setFilter] = useState<Filter>("todas");
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const lang = useLang();
  const achievements = achievementsFor(lang).filter((a) => groups.includes(a.group));
  const list = achievements.filter((a) => filter === "todas" || a.group === filter);
  const current = open === null ? null : list[open];

  useEffect(() => {
    requestRevealScan();
  }, [filter]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (current && !d.open) d.showModal();
    if (!current && d.open) d.close();
  }, [current]);

  const step = (dir: number) => setOpen((i) => (i === null ? i : (i + dir + list.length) % list.length));

  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: "todas", label: tr(lang, "Todas", "All"), count: achievements.length },
    ...achievementGroupsFor(lang)
      .filter((g) => groups.includes(g.id))
      .map((g) => ({ ...g, count: achievements.filter((a) => a.group === g.id).length })),
  ];

  return (
    <>
      <div role="tablist" aria-label={tr(lang, "Filtrar conquistas", "Filter achievements")} className="mb-8 flex flex-wrap border-t border-l border-line font-mono text-[11px] uppercase">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={filter === t.id}
            onClick={() => setFilter(t.id)}
            className={`cursor-pointer border-r border-b border-line px-3 py-2 transition-colors ${filter === t.id ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}
          >
            {t.label} <span className="opacity-60">{String(t.count).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      <div data-tl="" className="relative pl-7">
        <div className="absolute top-2 bottom-2 left-0 w-px bg-line">
          <div data-fill="" className="h-0 w-px bg-accent" />
        </div>
        <ol>
          {list.map((a, i) => (
            <li key={a.id} className="relative border-t border-line-soft">
              <span className="absolute top-[27px] -left-[31px] size-[9px] border-2 border-accent bg-paper" />
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group grid w-full cursor-pointer gap-x-6 gap-y-3 py-5 text-left desk:grid-cols-[96px_1fr_168px]"
              >
                <span className="pt-1 font-mono text-[12px] text-ink-2">{a.date}</span>
                <span>
                  <span className="block font-mono text-[10.5px] tracking-[0.1em] text-accent uppercase">{a.category}</span>
                  <span className="mt-1 block text-[17px] leading-tight font-semibold group-hover:text-accent">{a.title}</span>
                  {a.description && <span className="mt-1.5 block text-[14px] leading-relaxed text-ink-2">{a.description}</span>}
                  <span className="mt-1.5 block font-mono text-[11.5px] text-faint">
                    {[a.team, a.place].filter(Boolean).join(" · ")}
                  </span>
                </span>
                <span className="relative block aspect-[4/3] w-full overflow-hidden border border-line bg-sheet desk:w-[168px]">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    sizes="(min-width: 1024px) 168px, 100vw"
                    className="object-cover grayscale-[35%] transition-[filter] duration-500 group-hover:grayscale-0"
                  />
                  <span className="absolute right-1 bottom-1 bg-ink/80 px-1 font-mono text-[9.5px] text-paper uppercase">{tr(lang, "ampliar", "enlarge")}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
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
        className="m-auto w-[min(960px,calc(100vw-24px))] max-w-none border border-line bg-sheet p-0 text-ink backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div>
            <div className="flex items-center justify-between border-b border-line px-4 py-2 font-mono text-[11px] tracking-[0.06em] text-muted uppercase">
              <span>
                <span className="text-accent">{String(open! + 1).padStart(2, "0")}</span>/{String(list.length).padStart(2, "0")} · {current.category}
              </span>
              <button type="button" onClick={() => setOpen(null)} className="cursor-pointer hover:text-accent" aria-label={tr(lang, "Fechar", "Close")}>
                {tr(lang, "Fechar", "Close")} ✕
              </button>
            </div>
            <div className="relative h-[min(60vh,560px)] bg-paper">
              <Image src={current.image} alt={current.title} fill sizes="960px" className="object-contain" />
            </div>
            <div className="grid gap-4 border-t border-line p-5 desk:grid-cols-[1fr_auto]">
              <div>
                <h3 className="display text-[clamp(1.4rem,3vw,2rem)] leading-tight">{current.title}</h3>
                <p className="mt-1 font-mono text-[11.5px] text-faint">{[current.date, current.team, current.place].filter(Boolean).join(" · ")}</p>
                {current.description && <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-ink-2">{current.description}</p>}
                {current.link && (
                  <a href={current.link} target="_blank" rel="noreferrer" className="link-u mt-3 inline-block text-[12px]">
                    {tr(lang, "ver registro original", "see the original record")} ↗
                  </a>
                )}
              </div>
              <div className="flex items-end gap-2">
                <button type="button" onClick={() => step(-1)} className="cursor-pointer border border-line px-3 py-2 font-mono text-[12px] hover:border-accent hover:text-accent" aria-label={tr(lang, "Anterior", "Previous")}>
                  ←
                </button>
                <button type="button" onClick={() => step(1)} className="cursor-pointer border border-line px-3 py-2 font-mono text-[12px] hover:border-accent hover:text-accent" aria-label={tr(lang, "Próxima", "Next")}>
                  →
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
