import { social } from "./site";

/**
 * Three independent axes, so a project that isn't a public website still fits:
 *  - kind:     what it is / why it exists
 *  - platform: where it runs
 *  - access:   what a visitor can actually open
 */
export const KINDS = {
  produto: "Produto",
  "sistema-interno": "Sistema interno",
  cliente: "Cliente",
  "desafio-tecnico": "Desafio técnico",
  estudo: "Estudo",
  pessoal: "Pessoal",
  hackathon: "Hackathon",
} as const;

export const PLATFORMS = {
  web: "Web",
  mobile: "Mobile",
  api: "API / Back-end",
  iot: "IoT",
  desktop: "Desktop",
} as const;

export const ACCESS = {
  online: { label: "Online", hint: "Dá pra abrir e usar." },
  "codigo-aberto": { label: "Código aberto", hint: "O código está no GitHub." },
  privado: { label: "Privado", hint: "Sistema de empresa ou cliente, sem acesso público." },
} as const;

export type Kind = keyof typeof KINDS;
export type Platform = keyof typeof PLATFORMS;
export type Access = keyof typeof ACCESS;

export type Shot = { src?: string; caption: string };

export type Project = {
  slug: string;
  name: string;
  kind: Kind;
  platforms: Platform[];
  access: Access;
  /** One line for the list. */
  summary: string;
  year?: string;
  org?: string;
  role?: string;
  /** Longer text for the project page; one string per paragraph. */
  about?: string[];
  highlights?: string[];
  stack: string[];
  links?: { live?: string; repo?: string };
  /** Screenshots/photos. Without src they render as "foto pendente". */
  shots?: Shot[];
};

const shots = (...captions: string[]): Shot[] => captions.map((caption) => ({ caption }));

export const projects: Project[] = [
  // Professional work: private systems, described from the CV (no client data).
  {
    slug: "rastreamento-iot",
    name: "Plataforma de rastreamento IoT",
    kind: "sistema-interno",
    platforms: ["web", "api", "iot"],
    access: "privado",
    summary: "Rastreamento em tempo real de dispositivos em campo, em três serviços.",
    year: "2026",
    org: "Next Devices",
    role: "Full Stack — arquitetura, APIs, tempo real e deploy",
    about: [
      "Aplicações web de rastreamento integradas a dispositivos IoT. Trabalhei de ponta a ponta: das decisões de arquitetura e da documentação técnica (PRDs, TDDs, fluxos de dados) ao deploy em produção na AWS.",
      "O sistema foi dividido em três serviços — aplicação web, API principal e um microserviço de processamento geoespacial — para isolar o processamento pesado da API.",
    ],
    highlights: [
      "Ingestão de telemetria via HTTP e sockets TCP, com transmissão ao cliente por WebSocket e Server-Sent Events.",
      "APIs REST em Clean Architecture e DDD, com Swagger, JWT + refresh token e controle de acesso por roles.",
      "Fluxos assíncronos com padrão Outbox, filas, workers e jobs agendados.",
    ],
    stack: ["TypeScript", "NestJS", "React", "Next.js", "PostgreSQL", "TypeORM", "WebSocket", "SSE", "Mapbox", "AWS", "Docker"],
    shots: shots("Tela principal com o mapa", "Detalhe de um dispositivo"),
  },
  {
    slug: "tracking-campanhas",
    name: "Plataforma de tracking de campanhas",
    kind: "produto",
    platforms: ["web", "api"],
    access: "privado",
    summary: "Tracking de dados de campanhas digitais e integração com a Taboola.",
    year: "2025 – 2026",
    org: "Oracclum",
    role: "Full Stack — estágio",
    about: [
      "Plataforma de tracking de dados para campanhas digitais, sobre um back-end de grande porte em Clean Architecture que exigia percorrer todas as camadas.",
    ],
    highlights: [
      "Autenticação baseada em cookies no Next.js (client-side, server-side e Server Actions), com rotas protegidas por perfil.",
      "Integração com a API da Taboola: consumo de dados de mídia paga, tratamento de erros e normalização.",
      "Refatorações em código legado, mapeando fluxos e dependências antes de intervir.",
    ],
    stack: ["TypeScript", "React", "Next.js", "Node.js", "Express.js", "Tailwind CSS"],
    shots: shots("Painel de campanhas"),
  },
  {
    slug: "sistemas-inatel",
    name: "Sistemas internos do INATEL",
    kind: "sistema-interno",
    platforms: ["web", "api"],
    access: "privado",
    summary: "Manutenção evolutiva e automações para sistemas internos em produção.",
    year: "2024",
    org: "INATEL",
    role: "Full Stack — estágio",
    highlights: [
      "Interfaces em Vue.js sobre plataforma low-code corporativa, adaptadas às limitações da ferramenta.",
      "Back-end em Python (Flask e Django) com rotinas de automação que substituíram processos manuais.",
      "Exportação programática de dados e análises com Pandas e Matplotlib.",
    ],
    stack: ["Vue.js", "Python", "Flask", "Django", "Pandas", "Matplotlib"],
    shots: shots("Interface interna"),
  },

  // Personal and study projects
  {
    slug: "green-reverse-logistics",
    name: "Green Reverse Logistics",
    kind: "cliente",
    platforms: ["web"],
    access: "codigo-aberto",
    summary: "Landing page responsiva para a empresa.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "Vercel"],
    links: { repo: social.github },
    shots: shots("Página inicial", "Versão mobile"),
  },
  {
    slug: "scoder-fake-store",
    name: "Scoder Fake Store",
    kind: "desafio-tecnico",
    platforms: ["web"],
    access: "codigo-aberto",
    summary: "Loja com carrinho, feita em processo seletivo.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    links: { repo: social.github },
    shots: shots("Catálogo", "Carrinho"),
  },
  {
    slug: "github-blog",
    name: "GitHub Blog",
    kind: "estudo",
    platforms: ["web"],
    access: "codigo-aberto",
    summary: "Busca de usuários e repositórios pela API oficial do GitHub.",
    stack: ["React", "TypeScript", "Vite"],
    links: { repo: social.github },
    shots: shots("Busca"),
  },
  {
    slug: "ignite-timer",
    name: "Ignite Timer",
    kind: "estudo",
    platforms: ["web"],
    access: "codigo-aberto",
    summary: "Gerenciamento de tempo com Pomodoro.",
    stack: ["React", "TypeScript", "Vite"],
    links: { repo: social.github },
    shots: shots("Timer"),
  },
  {
    slug: "portfolio-v1",
    name: "Portfólio v1",
    kind: "pessoal",
    platforms: ["web"],
    access: "codigo-aberto",
    summary: "Primeira versão do portfólio, em HTML, CSS e JS puro.",
    stack: ["HTML", "CSS", "JavaScript"],
    links: { repo: social.github },
    shots: shots("Página inicial"),
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    kind: "estudo",
    platforms: ["mobile"],
    access: "codigo-aberto",
    summary: "Conversão de moedas em tempo real.",
    stack: ["React Native", "Expo", "NativeWind"],
    links: { repo: social.github },
    shots: shots("Conversor"),
  },
  {
    slug: "daily-diet",
    name: "Daily Diet",
    kind: "estudo",
    platforms: ["mobile"],
    access: "codigo-aberto",
    summary: "Controle de dieta.",
    stack: ["React Native", "Expo", "Styled Components"],
    links: { repo: social.github },
    shots: shots("Lista de refeições"),
  },
  {
    slug: "ignite-gym",
    name: "Ignite Gym",
    kind: "estudo",
    platforms: ["mobile"],
    access: "codigo-aberto",
    summary: "Gerenciamento de treinos.",
    stack: ["React Native", "Expo", "NativeWind"],
    links: { repo: social.github },
    shots: shots("Treinos"),
  },
  {
    slug: "to-do-list",
    name: "To Do List",
    kind: "estudo",
    platforms: ["mobile"],
    access: "codigo-aberto",
    summary: "Gerenciamento de tarefas.",
    stack: ["React Native", "Expo"],
    links: { repo: social.github },
    shots: shots("Tarefas"),
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
