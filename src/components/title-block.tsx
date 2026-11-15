"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { navFor } from "@/content/site";
import { stripLang, tr, type Lang } from "@/i18n";
import { useLang } from "@/i18n/lang-context";
import { PixelRobot } from "./pixel-robot";
import { LogoMark } from "./logo";
import { useActiveSection } from "./use-active-section";

const QUIPS: Record<Lang, Record<string, string>> = {
  pt: {
    experiencia: "do requisito ao deploy. bip.",
    projetos: "alguns são privados. eu guardo segredo.",
    telemetria: "sinal recebido. tudo verde.",
    competencias: "sem barra de 85%. prometo.",
    formacao: "engenharia de software. de base.",
    sobre: "esse aí me montou.",
    contato: "ele responde em até 24h.",
    destaques: "houston, temos um prêmio.",
    "linha-do-tempo": "2017 → 2024, sem pular etapa.",
    equipes: "três times. uma oficina de cada vez.",
    "pequeno-gigante": "aqui eu ainda era parafuso.",
    "smart-lego": "primeira viagem internacional. bip.",
    "nine-tails": "primeira geração. rookie com prêmio.",
    "visao-geral": "do que se trata.",
    galeria: "fotos tiradas em escala 1:1.",
  },
  en: {
    experiencia: "from requirements to deploy. beep.",
    projetos: "some are private. i keep secrets.",
    telemetria: "signal received. all green.",
    competencias: "no 85% bars. promise.",
    formacao: "software engineering. from the ground up.",
    sobre: "that one built me.",
    contato: "he replies within 24h.",
    destaques: "houston, we have an award.",
    "linha-do-tempo": "2017 → 2024, no steps skipped.",
    equipes: "three teams. one workshop at a time.",
    "pequeno-gigante": "back then i was just a bolt.",
    "smart-lego": "first trip abroad. beep.",
    "nine-tails": "first generation. award-winning rookie.",
    "visao-geral": "what it's about.",
    galeria: "photos at 1:1 scale.",
  },
};

const PAGE_QUIP = (path: string, lang: Lang) =>
  path === "/robotica"
    ? tr(lang, "bip. aqui é a minha casa.", "beep. this is my home.")
    : path === "/robotica/equipes"
      ? tr(lang, "três times. escolha um.", "three teams. pick one.")
      : path.startsWith("/projetos/")
        ? tr(lang, "projeto aberto. bip.", "project open. beep.")
        : tr(lang, "bip bop. role pra baixo.", "beep boop. scroll down.");

const JOKES: Record<Lang, string[]> = {
  pt: ["não é bug, é feature.", "funciona na minha máquina.", "já tentou desligar e ligar?", "git push --force? nunca."],
  en: ["it's not a bug, it's a feature.", "works on my machine.", "tried turning it off and on?", "git push --force? never."],
};

/**
 * Engineering-drawing title block ("carimbo") pinned to the corner, with the
 * pixel robot standing on it commenting on the current section. Wide screens only.
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
        : path.startsWith("/projetos/")
          ? tr(lang, "Projeto", "Project")
          : tr(lang, "Apresentação", "Introduction");

  const base = (active && QUIPS[lang][active.id]) ?? PAGE_QUIP(path, lang);
  // A click swaps in a joke until the section (and so the base quip) changes.
  const [joke, setJoke] = useState<{ on: string; n: number } | null>(null);
  const quip = joke?.on === base ? JOKES[lang][joke.n % JOKES[lang].length] : base;

  const cell = "border-line px-2 py-1.5";
  return (
    <div className="pointer-events-none fixed right-5 bottom-5 z-30 hidden w-[232px] min-[1440px]:block">
      <div className="mb-[-1px] flex items-end justify-end gap-2 pr-3">
        <p
          key={quip}
          role="status"
          className="mb-3 max-w-[150px] animate-fade-in border border-ink bg-sheet px-2 py-1 font-mono text-[10px] leading-snug text-ink shadow-[2px_2px_0_var(--ink)]"
        >
          {quip}
        </p>
        <button
          type="button"
          aria-label={tr(lang, "Robô: clique para outra frase", "Robot: click for another line")}
          onClick={() => setJoke((j) => ({ on: base, n: j?.on === base ? j.n + 1 : 0 }))}
          className="pointer-events-auto animate-bob cursor-pointer"
        >
          <PixelRobot size={44} />
        </button>
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
          <div className={`${cell} border-r`}>Rev. 26.10</div>
          <div className={cell}>Resende</div>
        </div>
      </aside>
    </div>
  );
}
