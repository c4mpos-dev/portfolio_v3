"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { navFor } from "@/content/site";
import { PixelRobot } from "./pixel-robot";
import { LogoMark } from "./logo";
import { useActiveSection } from "./use-active-section";

const QUIPS: Record<string, string> = {
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
  "visao-geral": "peça em inspeção.",
  galeria: "fotos tiradas em escala 1:1.",
};

const PAGE_QUIP = (pathname: string) =>
  pathname === "/robotica" ? "bip. aqui é a minha casa." : pathname.startsWith("/projetos/") ? "peça em inspeção." : "bip bop. role pra baixo.";

const JOKES = ["não é bug, é feature.", "funciona na minha máquina.", "já tentou desligar e ligar?", "git push --force? nunca."];

/**
 * Engineering-drawing title block ("carimbo") pinned to the corner, with the
 * pixel robot standing on it commenting on the current section. Wide screens only.
 */
export function TitleBlock() {
  const pathname = usePathname();
  const nav = navFor(pathname);
  const active = useActiveSection(pathname);
  const index = active ? nav.sections.findIndex((s) => s.id === active.id) + 1 : 0;
  const total = String(nav.sections.length).padStart(2, "0");
  const section = index ? nav.sections[index - 1].label : pathname === "/robotica" ? "Robótica" : pathname.startsWith("/projetos/") ? "Projeto" : "Apresentação";

  const base = (active && QUIPS[active.id]) ?? PAGE_QUIP(pathname);
  // A click swaps in a joke until the section (and so the base quip) changes.
  const [joke, setJoke] = useState<{ on: string; n: number } | null>(null);
  const quip = joke?.on === base ? JOKES[joke.n % JOKES.length] : base;

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
          aria-label="Robô: clique para outra frase"
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
            Folha <span className="text-accent">{String(index).padStart(2, "0")}</span>/{total}
          </div>
        </div>
        <div className={`${cell} border-b`}>
          Seção: <span className="text-ink">{section}</span>
        </div>
        <div className="grid grid-cols-3">
          <div className={`${cell} border-r`}>Esc. 1:1</div>
          <div className={`${cell} border-r`}>Rev. 26.10</div>
          <div className={cell}>Resende</div>
        </div>
      </aside>
    </div>
  );
}
