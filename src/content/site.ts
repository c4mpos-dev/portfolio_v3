import type { Lang } from "@/i18n";

export const social = {
  email: "campos.eet@gmail.com",
  whatsapp: "https://wa.me/5524981372475",
  whatsappLabel: "+55 (24) 98137-2475",
  linkedin: "https://www.linkedin.com/in/caua-campos",
  linkedinLabel: "caua-campos",
  github: "https://github.com/c4mpos-dev",
  githubUser: "c4mpos-dev",
};

export type NavSection = { id: string; label: string };

/** Navigation for each page: its own sections (the "folhas") plus a link to the other page. */
export const pageNav: Record<string, { sections: NavSection[]; other: { href: string; label: string } }> = {
  "/": {
    sections: [
      { id: "experiencia", label: "Experiência" },
      { id: "projetos", label: "Projetos" },
      { id: "telemetria", label: "Telemetria" },
      { id: "competencias", label: "Competências" },
      { id: "formacao", label: "Formação" },
      { id: "sobre", label: "Sobre" },
      { id: "contato", label: "Contato" },
    ],
    other: { href: "/robotica", label: "Robótica" },
  },
  "/robotica": {
    sections: [
      { id: "destaques", label: "Destaques" },
      { id: "linha-do-tempo", label: "Linha do tempo" },
      { id: "equipes", label: "Equipes" },
    ],
    other: { href: "/", label: "Início" },
  },
  "/robotica/equipes": {
    sections: [
      { id: "pequeno-gigante", label: "Pequeno Gigante" },
      { id: "smart-lego", label: "Smart Lego" },
      { id: "nine-tails", label: "Nine Tails" },
    ],
    other: { href: "/robotica", label: "Robótica" },
  },
  "/projetos": {
    sections: [
      { id: "visao-geral", label: "Visão geral" },
      { id: "galeria", label: "Galeria" },
    ],
    other: { href: "/#projetos", label: "Projetos" },
  },
};

const LABELS_EN: Record<string, string> = {
  Experiência: "Experience",
  Projetos: "Projects",
  Telemetria: "Telemetry",
  Competências: "Skills",
  Formação: "Education",
  Sobre: "About",
  Contato: "Contact",
  Robótica: "Robotics",
  Destaques: "Highlights",
  "Linha do tempo": "Timeline",
  Equipes: "Teams",
  Início: "Home",
  "Visão geral": "Overview",
  Galeria: "Gallery",
};

/**
 * Nav for a pathname (without the language prefix); every /projetos/<slug> page shares
 * one entry. Unknown paths (the 404 page) have no sections.
 */
export function navFor(pathname: string, lang: Lang = "pt") {
  const nav = pageNav[pathname.startsWith("/projetos/") ? "/projetos" : pathname] ?? { sections: [], other: { href: "/", label: "Início" } };
  if (lang === "pt") return nav;
  const en = (l: string) => LABELS_EN[l] ?? l;
  return { sections: nav.sections.map((s) => ({ ...s, label: en(s.label) })), other: { ...nav.other, label: en(nav.other.label) } };
}
