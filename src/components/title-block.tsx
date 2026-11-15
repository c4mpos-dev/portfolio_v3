"use client";

import { usePathname } from "next/navigation";
import { navFor } from "@/content/site";
import { stripLang, tr } from "@/i18n";
import { useLang } from "@/i18n/lang-context";
import { PixelRobot } from "./pixel-robot";
import { LogoMark } from "./logo";
import { useActiveSection } from "./use-active-section";

/**
 * Engineering-drawing title block ("carimbo") pinned to the corner, with the small
 * pixel robot standing on it. Wide screens only.
 */
export function TitleBlock() {
  const lang = useLang();
  const pathname = usePathname();
  const path = stripLang(pathname);
  const nav = navFor(path, lang);
  const active = useActiveSection(pathname);
  const index = active ? nav.sections.findIndex((s) => s.id === active.id) + 1 : 0;
  const total = String(nav.sections.length).padStart(2, "0");
  const section = index
    ? nav.sections[index - 1].label
    : path === "/robotica"
      ? tr(lang, "Robótica", "Robotics")
      : path === "/robotica/equipes"
        ? tr(lang, "Equipes", "Teams")
        : path === "/competicoes"
          ? tr(lang, "Competições", "Competitions")
        : path.startsWith("/projetos/")
          ? tr(lang, "Projeto", "Project")
          : tr(lang, "Apresentação", "Introduction");

  const cell = "border-line px-2 py-1.5";
  return (
    <div className="pointer-events-none fixed right-5 bottom-5 z-30 hidden w-[232px] min-[1440px]:block">
      <div className="mb-[-1px] flex justify-end pr-3">
        <PixelRobot size={44} className="animate-bob" />
      </div>

      <aside aria-hidden className="border border-line bg-sheet/95 font-mono text-[9.5px] tracking-[0.06em] text-muted uppercase backdrop-blur">
        <div className="grid grid-cols-[1fr_auto] border-b border-line">
          <div className={`${cell} flex items-center gap-2 border-r text-ink`}>
            <LogoMark className="size-4" />
            Cauã Campos
          </div>
          <div className={cell}>
            {tr(lang, "Folha", "Sheet")} <span className="text-accent">{String(index).padStart(2, "0")}</span>/{total}
          </div>
        </div>
        <div className={`${cell} border-b`}>
          {tr(lang, "Seção", "Section")}: <span className="text-ink">{section}</span>
        </div>
        <div className="grid grid-cols-3">
          <div className={`${cell} border-r`}>{tr(lang, "Esc. 1:1", "Scale 1:1")}</div>
          <div className={`${cell} border-r`}>Rev. {process.env.NEXT_PUBLIC_REV}</div>
          <div className={cell}>Resende</div>
        </div>
      </aside>
    </div>
  );
}
