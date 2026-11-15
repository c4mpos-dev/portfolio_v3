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
  competicao: "Competição",
  jogo: "Jogo",
} as const;

export const PLATFORMS = {
  web: "Web",
  mobile: "Mobile",
  api: "API / Back-end",
  iot: "IoT",
  desktop: "Desktop",
  embarcado: "Embarcado",
} as const;

export const ACCESS = {
  online: { label: "Online", hint: "Dá pra abrir e usar." },
  "codigo-aberto": { label: "Código aberto", hint: "O código está no GitHub." },
  privado: { label: "Privado", hint: "Código privado, sem acesso público." },
  "em-breve": { label: "Em breve", hint: "Ainda não lançado ao público." },
} as const;

export type Kind = keyof typeof KINDS;
export type Platform = keyof typeof PLATFORMS;
export type Access = keyof typeof ACCESS;

/** `tall` marks a phone-sized screenshot: shown whole, two side by side in previews. */
export type Shot = { src?: string; caption: string; tall?: boolean };

/** Shelves of the project section. A project can sit on more than one. */
export const AREAS = {
  empresa: "Em empresas",
  web: "Web e APIs",
  mobile: "Mobile",
  robotica: "Robótica",
} as const;
export type Area = keyof typeof AREAS;

export type Project = {
  slug: string;
  name: string;
  kind: Kind;
  platforms: Platform[];
  access: Access;
  areas: Area[];
  /** Shown in the "Destaques" tab, which is what a visitor sees first. */
  featured?: boolean;
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
    areas: ["empresa"],
    featured: true,
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
    areas: ["empresa"],
    featured: true,
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
    areas: ["empresa"],
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

  // Own and client work: products, client sites and the code behind the robots. Course exercises
  // and small studies were left out on purpose; they are still on GitHub.
  {
    slug: "campos-ctf",
    name: "Campos CTF",
    kind: "produto",
    platforms: ["web", "api"],
    access: "em-breve",
    areas: ["web"],
    featured: true,
    summary: "Plataforma brasileira de Capture The Flag: desafios de segurança ofensiva, flags e ranking ao vivo.",
    year: "2026",
    role: "Produto, back-end e front-end",
    about: [
      "Uma plataforma de CTF em português para aprender segurança ofensiva na prática: cada desafio esconde uma flag no formato campos{...}, e quem a encontra soma pontos no ranking. São sete categorias, de Web Hacking e Criptografia a OSINT, Forense, Engenharia Reversa e Pwn, do fácil ao insano.",
      "Construí os dois lados: a API, que guarda os desafios, confere as flags e mantém o placar honesto, e a interface que os jogadores usam. O código ainda é privado; o site abre ao público em breve.",
    ],
    highlights: [
      "API em NestJS 11 com Clean Architecture (domínio separado da infraestrutura), PostgreSQL e TypeORM.",
      "Flags guardadas como hash, como senhas: nem quem administra consegue lê-las, só conferir se a enviada está certa.",
      "First blood decidido pelo banco quando duas pessoas resolvem ao mesmo tempo, sem empate e sem ponto em dobro.",
      "Sessão com JWT RS256 em cookies httpOnly, verificação de conta por e-mail e limite de tentativas no login, no cadastro e no envio de flags.",
      "Testes unitários e e2e com Jest nos fluxos de conta, sessão e envio de flags; deploy com Docker.",
    ],
    stack: ["NestJS", "TypeScript", "PostgreSQL", "TypeORM", "JWT", "Jest", "Docker", "React", "React Router", "SWR", "Zod", "Tailwind CSS"],
    shots: [
      { src: "/images/projetos/campos-ctf/desafios.png", caption: "Painel de desafios por categoria, com o progresso do jogador" },
      { src: "/images/projetos/campos-ctf/desafio.png", caption: "Um desafio aberto, com o envio da flag" },
      { src: "/images/projetos/campos-ctf/ranking.png", caption: "Ranking ao vivo com pódio e a posição do jogador" },
    ],
  },
  {
    slug: "site-nine-tails",
    name: "Site da Nine Tails #9219",
    kind: "cliente",
    platforms: ["web"],
    access: "em-breve",
    areas: ["web", "robotica"],
    featured: true,
    summary: "Site oficial da equipe de FRC, com 3D, animação guiada pela rolagem e o histórico completo da equipe.",
    year: "2026",
    org: "Nine Tails #9219",
    role: "Design e desenvolvimento",
    about: [
      "Site oficial da equipe de FIRST Robotics Competition da Firjan SENAI SESI Resende, onde comecei na FRC. Conta seis robôs, cinco troféus e 122 partidas com foto real, e foi pensado para ser explorado: cada página tem uma interação própria.",
      "Os robôs foram recortados das fotos e atravessam a quadra conforme a rolagem; o primeiro deles tem um modelo 3D que repete a jogada da temporada Charged Up.",
    ],
    highlights: [
      "Hangar com uma página por robô: ficha técnica, comparação oficina × arena e a fita de partidas de cada evento.",
      "Vitrine de prêmios como um anel 3D que dá para arrastar, em three.js.",
      "Painel de embarque com todas as viagens da equipe e um telão de recordes em letreiro de LED.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion", "three.js"],
    links: { repo: "https://github.com/c4mpos-dev/site-nine-tails-9219" },
    shots: [
      { src: "/images/projetos/site-nine-tails/robots-showcase.webp", caption: "Hangar: cada robô atravessa a quadra com a rolagem" },
      { src: "/images/projetos/site-nine-tails/travel.webp", caption: "Painel de embarque com as viagens da equipe" },
      { src: "/images/projetos/site-nine-tails/records.webp", caption: "Telão de recordes e as 122 partidas" },
    ],
  },
  {
    slug: "tolle-lege",
    name: "Tolle Lege",
    kind: "produto",
    platforms: ["web"],
    access: "online",
    areas: ["web"],
    featured: true,
    summary: "Introdução à fé católica: trilhas por perfil, liturgia diária e uma visita guiada por uma igreja em 3D.",
    year: "2026",
    role: "Produto, design e desenvolvimento",
    about: [
      "Um caminho simples para quem está chegando, voltando ou só quer entender o que a Igreja Católica crê, celebra e vive. Fiz do zero, do design ao deploy.",
      "É uma SPA estática que se comporta como app: instala como PWA, salva o progresso no navegador e gera no build uma página com título e descrição próprios para cada rota, para que os links tenham prévia nas redes.",
    ],
    highlights: [
      "Liturgia do dia consumida de uma API externa, com cache e criação de imagem para compartilhar.",
      "Visita guiada em 3D com React Three Fiber; o modelo foi otimizado de 8,2 MB para 1,6 MB.",
      "Ano litúrgico calculado a partir da data da Páscoa e conteúdo sazonal que aparece sozinho no período certo.",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "TanStack Query", "React Three Fiber", "Motion"],
    links: { live: "https://tolle-et-lege.vercel.app", repo: "https://github.com/c4mpos-dev/tolle-lege" },
    shots: [{ src: "/images/projetos/tolle-lege/capa.jpg", caption: "Capa do site" }],
  },
  {
    slug: "zonas-geograficas",
    name: "Zonas geográficas no mapa",
    kind: "desafio-tecnico",
    platforms: ["web", "api"],
    access: "codigo-aberto",
    areas: ["web"],
    summary: "Cadastro de zonas geográficas desenhadas no mapa, com API em NestJS. Desafio técnico da Next Devices.",
    year: "2025",
    org: "Next Devices",
    role: "Full Stack",
    about: [
      "Avaliação técnica do processo seletivo da Next Devices. Uma aplicação full stack para criar, listar e remover zonas geográficas, com a geometria guardada em GeoJSON.",
      "O código está em dois repositórios: a API (link abaixo) e o front-end, em desafio-next-devices-frontend no mesmo perfil.",
    ],
    highlights: [
      "API REST em NestJS com TypeORM, validação de GeoJSON por um validador próprio e documentação em Swagger.",
      "Front-end em React com Leaflet para desenhar e exibir as zonas no mapa.",
      "Testes no controller e no service da API e no componente principal do front-end.",
    ],
    stack: ["NestJS", "TypeScript", "TypeORM", "SQLite", "Swagger", "React", "Vite", "Leaflet", "Tailwind CSS"],
    links: { repo: "https://github.com/c4mpos-dev/desafio-next-devices-backend" },
    shots: shots("Zonas desenhadas no mapa"),
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    kind: "estudo",
    platforms: ["mobile"],
    access: "codigo-aberto",
    areas: ["mobile"],
    featured: true,
    summary: "App de conversão de moedas em React Native, com cotação em tempo real e tema claro e escuro.",
    year: "2025",
    role: "Desenvolvimento",
    about: [
      "Aplicativo mobile em React Native com Expo que converte moedas de vários países usando cotações em tempo real da AwesomeAPI. O layout veio de um design aberto da Rocketseat pensado para Kotlin, que reconstruí em React Native.",
    ],
    highlights: [
      "Cotação buscada na hora da conversão, com seleção das moedas de origem e destino.",
      "Tema claro e escuro com NativeWind (Tailwind no React Native).",
      "Animações com Reanimated e ícones em SVG.",
    ],
    stack: ["React Native", "Expo", "TypeScript", "NativeWind", "Reanimated", "AwesomeAPI"],
    links: { repo: "https://github.com/c4mpos-dev/currency-converter" },
    shots: [
      { src: "/images/projetos/currency-converter/light.jpg", caption: "Tema claro", tall: true },
      { src: "/images/projetos/currency-converter/dark.jpg", caption: "Tema escuro", tall: true },
    ],
  },
  {
    slug: "daily-diet",
    name: "Daily Diet",
    kind: "estudo",
    platforms: ["mobile"],
    access: "codigo-aberto",
    areas: ["mobile"],
    summary: "App em React Native para registrar refeições e acompanhar quanto da dieta foi cumprida.",
    year: "2024",
    role: "Desenvolvimento",
    about: [
      "Aplicativo mobile em React Native com Expo para controlar a dieta: cada refeição é registrada com data, hora e se ficou dentro ou fora da dieta, e o app mostra o desempenho do período. O layout veio de um design aberto da Rocketseat no Figma.",
    ],
    highlights: [
      "Cadastro, edição e exclusão de refeições, agrupadas por dia.",
      "Estatísticas calculadas a partir dos registros: porcentagem dentro da dieta, melhor sequência e total de refeições.",
      "Dados guardados no próprio aparelho com AsyncStorage, navegação em pilha com React Navigation e estilos com styled-components.",
    ],
    stack: ["React Native", "Expo", "TypeScript", "styled-components", "React Navigation", "AsyncStorage"],
    links: { repo: "https://github.com/c4mpos-dev/daily-diet" },
    shots: [
      { src: "/images/projetos/daily-diet/tela-2.png", caption: "Início: porcentagem dentro da dieta e refeições por dia (layout do Figma)", tall: true },
      { src: "/images/projetos/daily-diet/tela-1.png", caption: "Retorno depois de registrar uma refeição (layout do Figma)", tall: true },
    ],
  },
  {
    slug: "jogo-charged-up",
    name: "Jogo FRC Charged Up",
    kind: "jogo",
    platforms: ["mobile"],
    access: "privado",
    areas: ["mobile", "robotica"],
    summary: "Jogo para Android feito em Unity pela Nine Tails na preparação da temporada 2023.",
    year: "2023",
    org: "Nine Tails #9219",
    role: "Interface do jogo: menu, loja e customização",
    about: [
      "Jogo criado pela Nine Tails #9219 durante a preparação para a temporada Charged Up da FRC, como forma de engajar a equipe com o tema do ano. Foi feito em Unity, em C#, para Android, por três pessoas da equipe.",
      "Minha parte foi a interface: a tela de menu, a junção das cenas, a rotação do personagem e a loja de customização, com a vitrine de camisas e a rolagem dinâmica dos itens.",
    ],
    stack: ["Unity", "C#", "Android"],
    shots: shots("Tela do jogo"),
  },
  {
    slug: "green-reverse-logistics",
    name: "Green Reverse Logistics",
    kind: "cliente",
    platforms: ["web"],
    access: "codigo-aberto",
    areas: ["web"],
    summary: "Landing page de uma empresa de logística reversa e sustentabilidade no Rio de Janeiro.",
    year: "2025",
    role: "Desenvolvimento",
    about: [
      "Landing page institucional da Green Reverse Logistics, empresa de logística reversa e sustentabilidade ambiental no estado do Rio de Janeiro: como funciona, impacto ambiental, parceiros, perguntas frequentes e contato.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "Vercel"],
    links: { repo: "https://github.com/c4mpos-dev/green-reverse-logistics-site" },
    shots: [{ src: "/images/projetos/green-reverse-logistics/desktop.png", caption: "Página inicial" }],
  },
  {
    slug: "sucatao-forte-itaguai",
    name: "Sucatão Forte Itaguaí",
    kind: "cliente",
    platforms: ["web"],
    access: "codigo-aberto",
    areas: ["web"],
    summary: "Landing page de um centro de compra e venda de sucata em Itaguaí, RJ.",
    year: "2025",
    role: "Desenvolvimento",
    about: [
      "Landing page do Sucatão Forte Itaguaí, que compra e vende sucata na região: materiais aceitos, como funciona a venda, benefícios, galeria do pátio, localização e contato direto pelo WhatsApp.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "Vercel"],
    links: { repo: "https://github.com/trans-tech-solutions/sucatao-forte-itaguai-site" },
    shots: [{ src: "/images/projetos/sucatao-forte-itaguai/desktop.png", caption: "Página inicial" }],
  },
  {
    slug: "robo-frc-charged-up",
    name: "Código do robô · FRC Charged Up",
    kind: "competicao",
    platforms: ["embarcado"],
    access: "codigo-aberto",
    areas: ["robotica"],
    summary: "O código que rodou no robô da Nine Tails no regional de Brasília, no mundial em Houston e no off-season.",
    year: "2023",
    org: "Nine Tails #9219",
    role: "Programação do robô",
    about: [
      "Código Java do robô da Nine Tails na temporada Charged Up da FRC, da preparação aos três eventos do ano. Cada evento tem a sua versão oficial no repositório, junto com os testes feitos na oficina.",
    ],
    highlights: [
      "Versões oficiais do regional de Brasília, do mundial em Houston e do off-season do Rio.",
      "Testes de mira com câmera Limelight e controle PID, lendo a visão pelo NetworkTables.",
      "Controle de braço e extensão com motores dedicados, além da tração do robô.",
    ],
    stack: ["Java", "WPILib", "Limelight", "PID", "CTRE Phoenix"],
    links: { repo: "https://github.com/c4mpos-dev/frc-charged-up" },
    shots: [{ src: "/images/conquistas/frc-houston.jpg", caption: "A equipe no mundial em Houston, com o robô deste código" }],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
