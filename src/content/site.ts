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
  "/projetos": {
    sections: [
      { id: "visao-geral", label: "Visão geral" },
      { id: "galeria", label: "Galeria" },
    ],
    other: { href: "/#projetos", label: "Projetos" },
  },
};

/** Nav for a pathname; every /projetos/<slug> page shares one entry. */
export const navFor = (pathname: string) =>
  pageNav[pathname.startsWith("/projetos/") ? "/projetos" : pathname] ?? pageNav["/"];
