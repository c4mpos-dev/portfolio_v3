"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, ViewTransition } from "react";
import { AREAS, type Area, type Project } from "@/content/projects";
import { areasFor, kindsFor, projectsFor } from "@/content/projects-en";
import { localePath, tr, type Lang } from "@/i18n";
import { useLang } from "@/i18n/lang-context";
import { AccessBadge } from "./access-badge";
import { requestRevealScan } from "./scroll-fx";

type Tab = "destaques" | Area | "todos";

type Row = Project & { n: string };

function tabsFor(lang: Lang) {
  const numbered: Row[] = projectsFor(lang).map((p, i) => ({ ...p, n: String(i + 1).padStart(2, "0") }));
  const areas = areasFor(lang);
  const tabs: { id: Tab; label: string; items: Row[] }[] = [
    { id: "destaques", label: tr(lang, "Destaques", "Highlights"), items: numbered.filter((p) => p.featured) },
    ...(Object.keys(AREAS) as Area[]).map((a) => ({ id: a, label: areas[a], items: numbered.filter((p) => p.areas.includes(a)) })),
    { id: "todos", label: tr(lang, "Todos", "All"), items: numbered },
  ];
  return { numbered, tabs };
}

/** Preview at the top of a card: the first screenshot, a redacted sheet for company work, or a drawing-sheet placeholder. */
function Thumb({ p, lang, eager }: { p: Project; lang: Lang; eager?: boolean }) {
  // The first row is above the fold when the section is reached from the nav: load it at once.
  const loading = eager ? ("eager" as const) : undefined;
  const withSrc = (p.shots ?? []).filter((s) => s.src);
  const tall = withSrc.filter((s) => s.tall).slice(0, 2);

  if (tall.length) {
    return (
      <div className="flex size-full items-center justify-center gap-3 bg-paper px-4 pt-4">
        {tall.map((s) => (
          <div key={s.src} className="relative h-full w-[34%] overflow-hidden rounded-t-[10px] border border-b-0 border-line">
            <Image src={s.src!} alt="" fill sizes="160px" loading={loading} className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
          </div>
        ))}
      </div>
    );
  }
  if (withSrc[0]) {
    return (
      <Image
        src={withSrc[0].src!}
        alt=""
        fill
        sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
        loading={loading}
        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
      />
    );
  }
  if (p.areas.includes("empresa")) {
    // Miniature of the redacted sheet used on the project page
    return (
      <div aria-hidden className="relative flex size-full flex-col justify-center gap-2 bg-sheet px-6 pb-6">
        {[58, 40, 64, 32, 50].map((w, i) => (
          <span key={i} className="block h-2.5 bg-ink/85" style={{ width: `${w}%` }} />
        ))}
        <span className="absolute right-4 bottom-4 -rotate-6 border-2 border-accent px-2 py-0.5 font-mono text-[10px] tracking-[0.16em] text-accent uppercase">
          {tr(lang, "Confidencial", "Confidential")}
        </span>
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className="flex size-full items-center justify-center bg-[repeating-linear-gradient(45deg,var(--line-soft)_0_1px,transparent_1px_8px)]"
    >
      <span className="border border-line bg-sheet px-2 py-1 font-mono text-[10px] tracking-[0.1em] text-faint uppercase">
        {kindsFor(lang)[p.kind]} · {tr(lang, "foto em breve", "photo soon")}
      </span>
    </div>
  );
}

/**
 * Projects as preview cards, on shelves: "Destaques" first, then by area. Each card
 * shows a screenshot (or a stand-in) and opens the project page.
 */
export function ProjectList() {
  const [tab, setTab] = useState<Tab>("destaques");
  const lang = useLang();
  const { numbered, tabs: TABS } = tabsFor(lang);
  const KINDS = kindsFor(lang);
  const current = TABS.find((t) => t.id === tab)!;

  useEffect(() => {
    requestRevealScan();
  }, [tab]);

  return (
    <div>
      <div role="tablist" aria-label={tr(lang, "Filtrar projetos", "Filter projects")} className="mb-6 flex flex-wrap border-t border-l border-line font-mono text-[11px] uppercase">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`cursor-pointer border-r border-b border-line px-3 py-2 transition-colors ${tab === t.id ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}
          >
            {t.label} <span className="opacity-60">{String(t.items.length).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {current.items.map((p, idx) => (
          <li key={p.slug} data-r="" className="reveal">
            <Link
              href={localePath(lang, `/projetos/${p.slug}`)}
              className="group flex h-full flex-col border border-line bg-sheet transition-colors hover:border-accent"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
                <Thumb p={p} lang={lang} eager={idx < 3} />
                <span className="absolute top-2 left-2 bg-ink px-1.5 py-0.5 font-mono text-[10px] text-paper">{p.n}</span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="font-mono text-[10.5px] tracking-[0.08em] text-faint uppercase">
                  {KINDS[p.kind]}
                  {p.year && ` · ${p.year.replace(/\s/g, "")}`}
                  {p.org && ` · ${p.org}`}
                </div>
                <ViewTransition name={`project-title-${p.slug}`} share="morph" default="none">
                  <h4 className="mt-1.5 w-fit text-[16px] leading-snug font-semibold group-hover:text-accent">{p.name}</h4>
                </ViewTransition>
                <p className="mt-1.5 line-clamp-3 text-[13.5px] leading-snug text-muted">{p.summary}</p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                  <AccessBadge access={p.access} lang={lang} />
                  <span aria-hidden className="font-mono text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent">
                    →
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      {tab === "destaques" && (
        <button type="button" onClick={() => setTab("todos")} className="link-u mt-6 cursor-pointer">
          {tr(lang, `ver todos os ${numbered.length} projetos →`, `see all ${numbered.length} projects →`)}
        </button>
      )}
    </div>
  );
}
