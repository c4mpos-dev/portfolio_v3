"use client";

import Link from "next/link";
import { useEffect, useState, ViewTransition } from "react";
import { ACCESS, KINDS, PLATFORMS, projects, type Access } from "@/content/projects";
import { AccessBadge } from "./access-badge";
import { requestRevealScan } from "./scroll-fx";

type Filter = "todos" | Access;
const FILTERS: Filter[] = ["todos", "privado", "codigo-aberto", "online"];

/** Bill-of-materials list of projects, filterable by access; each row opens the project page. */
export function ProjectList() {
  const [filter, setFilter] = useState<Filter>("todos");
  const rows = projects
    .map((p, i) => ({ ...p, n: String(i + 1).padStart(3, "0") }))
    .filter((p) => filter === "todos" || p.access === filter);

  useEffect(() => {
    requestRevealScan();
  }, [filter]);

  return (
    <div>
      <div role="tablist" aria-label="Filtrar por acesso" className="mb-5 flex flex-wrap border-t border-l border-line font-mono text-[11px] uppercase">
        {FILTERS.map((f) => {
          const count = f === "todos" ? projects.length : projects.filter((p) => p.access === f).length;
          if (!count) return null;
          const on = filter === f;
          return (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setFilter(f)}
              className={`cursor-pointer border-r border-b border-line px-3 py-2 transition-colors ${on ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}
            >
              {f === "todos" ? "Todos" : ACCESS[f].label} <span className="opacity-60">{String(count).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      <div className="border border-line bg-sheet">
        <div className="hidden grid-cols-[52px_1fr_190px_150px_28px] gap-4 border-b border-ink px-4 py-2 font-mono text-[10px] tracking-[0.1em] text-faint uppercase desk:grid">
          <span>Item</span>
          <span>Peça</span>
          <span>Tipo · plataforma</span>
          <span>Acesso</span>
          <span />
        </div>
        <ol>
          {rows.map((p) => (
            <li key={p.slug} data-r="" className="reveal border-b border-line-soft last:border-b-0">
              <Link
                href={`/projetos/${p.slug}`}
                className="group grid grid-cols-[44px_1fr_auto] items-start gap-x-4 gap-y-2 px-4 py-4 transition-colors hover:bg-paper desk:grid-cols-[52px_1fr_190px_150px_28px]"
              >
                <span className="pt-0.5 font-mono text-[11.5px] text-accent">{p.n}</span>
                <span>
                  <ViewTransition name={`project-title-${p.slug}`} share="morph" default="none">
                    <span className="block w-fit text-[15.5px] font-semibold group-hover:text-accent">{p.name}</span>
                  </ViewTransition>
                  <span className="mt-0.5 block text-[13.5px] text-muted">
                    {p.summary}
                    {p.org && <span className="font-mono text-[11.5px] text-faint"> · {p.org}</span>}
                  </span>
                </span>
                <span className="col-start-2 font-mono text-[11px] leading-relaxed text-ink-2 uppercase desk:col-start-auto desk:pt-1">
                  {KINDS[p.kind]}
                  <span className="block text-faint">{p.platforms.map((x) => PLATFORMS[x]).join(" · ")}</span>
                </span>
                <span className="col-start-2 desk:col-start-auto desk:pt-0.5">
                  <AccessBadge access={p.access} />
                </span>
                <span
                  aria-hidden
                  className="col-start-3 row-start-1 pt-0.5 text-right font-mono text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent desk:col-start-auto desk:row-start-auto"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-3 font-mono text-[11px] text-faint">
        {Object.values(ACCESS)
          .map((a) => `${a.label}: ${a.hint.toLowerCase()}`)
          .join("  ·  ")}
      </p>
    </div>
  );
}
