import { localeDate, localizeList, type Lang } from "@/i18n";

export type Job = {
  id: string;
  company: string;
  fullName?: string;
  role: string;
  type: string;
  period: string;
  place: string;
  context: string;
  bullets: string[];
  stack: string[];
  diagram?: boolean;
};

// Source: CV_CauaCampos.pdf
export const experience: Job[] = [
  {
    id: "next-devices",
    company: "Next Devices",
    role: "Desenvolvedor Full Stack Júnior",
    type: "Efetivo",
    period: "Jan 2026 – Set 2026",
    place: "Santa Rita do Sapucaí, MG",
    context: "Aplicações web de rastreamento integradas a dispositivos IoT — da arquitetura ao deploy em produção.",
    bullets: [
      "Atuei de ponta a ponta em aplicações web de rastreamento integradas a dispositivos IoT, das decisões de arquitetura e da documentação técnica (PRDs, TDDs, fluxos de dados e análises arquiteturais) ao deploy em produção.",
      "Desenvolvi sistema distribuído em três serviços: aplicação web responsiva e interativa, API principal e microserviço de processamento geoespacial, definindo os contratos de comunicação e isolando o processamento pesado da API principal.",
      "Projetei e implementei APIs REST aplicando Clean Architecture e DDD, com documentação via Swagger, autenticação via JWT e refresh token e controle de acesso por roles.",
      "Implementei fluxos assíncronos com padrão Outbox, filas, workers e jobs agendados, e a ingestão de telemetria de dispositivos em campo via HTTP e sockets TCP, com transmissão em tempo real ao cliente por WebSocket e Server-Sent Events.",
    ],
    stack: [
      "TypeScript", "React", "Next.js", "Vite", "Tailwind CSS", "NestJS", "Node.js", "APIs REST", "Microserviços",
      "Clean Architecture", "DDD", "PostgreSQL", "TypeORM", "WebSocket", "SSE", "Mapbox", "AWS (EC2/ECR/IAM)",
      "Docker", "GitHub Actions", "Nginx", "Linux", "Git", "Scrum",
    ],
    diagram: true,
  },
  {
    id: "oracclum",
    company: "Oracclum",
    role: "Desenvolvedor Full Stack",
    type: "Estágio",
    period: "Abr 2025 – Jan 2026",
    place: "Remoto",
    context: "Plataforma de tracking de dados para campanhas digitais, sobre um back-end de grande porte em Clean Architecture.",
    bullets: [
      "Atuei full-stack em plataforma de tracking de dados para campanhas digitais, sobre um back-end de grande porte em Clean Architecture que exigia percorrer todas as camadas.",
      "Conduzi refatorações em código legado, mapeando fluxos e dependências antes de intervir para garantir evolução sem regressão em produção.",
      "Implementei autenticação baseada em cookies no Next.js, com renderização client-side, server-side e Server Actions, mantendo a sessão consistente entre servidor e cliente e protegendo rotas por perfil de acesso.",
      "Desenvolvi e mantive a integração com a API da Taboola, consumindo dados de campanhas de mídia paga, com tratamento de erros e normalização dos dados recebidos, além de endpoints REST e interfaces no front-end.",
    ],
    stack: [
      "TypeScript", "JavaScript", "React", "Next.js (Server Components, Server Actions)", "Tailwind CSS", "Node.js",
      "Express.js", "APIs REST", "Clean Architecture", "Autenticação com cookies", "APIs de terceiros", "Git", "Scrum",
    ],
  },
  {
    id: "inatel",
    company: "INATEL",
    fullName: "Instituto Nacional de Telecomunicações",
    role: "Desenvolvedor Full Stack",
    type: "Estágio",
    period: "Abr 2024 – Nov 2024",
    place: "Santa Rita do Sapucaí, MG",
    context: "Manutenção evolutiva de sistemas internos em produção, do discovery com os usuários à entrega.",
    bullets: [
      "Atuei na manutenção evolutiva de sistemas internos em produção, participando do discovery das demandas junto aos usuários, de refatorações e do desenvolvimento de novas funcionalidades.",
      "Desenvolvi interfaces web em Vue.js sobre plataforma low-code corporativa em ambiente restrito, adaptando soluções às limitações da ferramenta.",
      "Implementei funcionalidades de back-end em Python (Flask e Django), com rotinas de automação que substituíram processos manuais, exportação programática de dados e análise e visualização com Pandas e Matplotlib.",
    ],
    stack: ["Python", "Flask", "Django", "Pandas", "Matplotlib", "Vue.js", "JavaScript", "CSS", "Git", "Scrum", "Kanban"],
  },
];

export const skills = [
  { label: "Linguagens", items: ["TypeScript", "JavaScript", "Python", "C#", "SQL"] },
  {
    label: "Tecnologias",
    items: [
      "React", "Next.js", "Vite", "Vue.js", "React Native", "Node.js", "NestJS", "Express.js", "Flask", "Django",
      "PostgreSQL", "MySQL", "TypeORM", "Docker", "AWS (EC2, ECR, IAM)", "GitHub Actions", "Nginx", "Linux", "Tailwind CSS",
    ],
  },
  {
    label: "Práticas",
    items: [
      "Clean Architecture", "DDD", "Microserviços", "APIs REST", "CI/CD", "Testes automatizados",
      "Documentação técnica (PRD, TDD)", "Swagger/OpenAPI", "Git", "Scrum", "Kanban", "Code review",
    ],
  },
  { label: "Idiomas", items: ["Português nativo", "Inglês intermediário"] },
];

export const education = [
  { school: "AEDB", fullName: "Associação Educacional Dom Bosco", course: "Bacharelado em Engenharia de Software", period: "2026 – 2029", note: "Em andamento" },
  { school: "INATEL", fullName: "Instituto Nacional de Telecomunicações", course: "Bacharelado em Engenharia de Software", period: "2024 – 2026", note: "Transferido para a AEDB por mudança de cidade" },
  { school: "FIRJAN SENAI Resende", course: "Técnico em Desenvolvimento de Sistemas", period: "2021 – 2023", note: "Concluído" },
];

// English
const EXPERIENCE_EN: Record<string, Partial<Job>> = {
  "next-devices": {
    role: "Junior Full Stack Developer",
    type: "Full-time",
    context: "Web tracking applications integrated with IoT devices — from architecture to production deployment.",
    bullets: [
      "Worked end to end on web tracking applications integrated with IoT devices, from architecture decisions and technical documentation (PRDs, TDDs, data flows and architecture reviews) to production deployment.",
      "Built a distributed system of three services: a responsive, interactive web application, a main API and a geospatial processing microservice, defining the communication contracts and isolating heavy processing from the main API.",
      "Designed and implemented REST APIs with Clean Architecture and DDD, documented with Swagger, with JWT and refresh-token authentication and role-based access control.",
      "Implemented asynchronous flows with the Outbox pattern, queues, workers and scheduled jobs, plus telemetry ingestion from field devices over HTTP and TCP sockets, streamed to the client in real time over WebSocket and Server-Sent Events.",
    ],
    stack: [
      "TypeScript", "React", "Next.js", "Vite", "Tailwind CSS", "NestJS", "Node.js", "REST APIs", "Microservices",
      "Clean Architecture", "DDD", "PostgreSQL", "TypeORM", "WebSocket", "SSE", "Mapbox", "AWS (EC2/ECR/IAM)",
      "Docker", "GitHub Actions", "Nginx", "Linux", "Git", "Scrum",
    ],
  },
  oracclum: {
    role: "Full Stack Developer",
    place: "Remote",
    type: "Internship",
    context: "A data tracking platform for digital campaigns, on a large Clean Architecture back end.",
    bullets: [
      "Worked full stack on a data tracking platform for digital campaigns, on a large Clean Architecture back end that required working through every layer.",
      "Led refactors of legacy code, mapping flows and dependencies before changing anything so it could evolve without regressions in production.",
      "Implemented cookie-based authentication in Next.js across client-side rendering, server-side rendering and Server Actions, keeping the session consistent between server and client and protecting routes by access profile.",
      "Built and maintained the Taboola API integration, consuming paid-media campaign data with error handling and normalization, along with REST endpoints and front-end screens.",
    ],
    stack: [
      "TypeScript", "JavaScript", "React", "Next.js (Server Components, Server Actions)", "Tailwind CSS", "Node.js",
      "Express.js", "REST APIs", "Clean Architecture", "Cookie authentication", "Third-party APIs", "Git", "Scrum",
    ],
  },
  inatel: {
    role: "Full Stack Developer",
    fullName: "National Telecommunications Institute",
    type: "Internship",
    context: "Ongoing development of internal systems in production, from discovery with users to delivery.",
    bullets: [
      "Worked on the ongoing development of internal systems in production, taking part in discovery with users, refactors and new features.",
      "Built web interfaces in Vue.js on a corporate low-code platform in a restricted environment, adapting solutions to the tool's limits.",
      "Implemented back-end features in Python (Flask and Django), with automation routines that replaced manual processes, programmatic data exports, and analysis and charts with Pandas and Matplotlib.",
    ],
  },
};

const SKILLS_EN = [
  { label: "Languages" },
  { label: "Technologies" },
  {
    label: "Practices",
    items: [
      "Clean Architecture", "DDD", "Microservices", "REST APIs", "CI/CD", "Automated testing",
      "Technical documentation (PRD, TDD)", "Swagger/OpenAPI", "Git", "Scrum", "Kanban", "Code review",
    ],
  },
  { label: "Spoken languages", items: ["Portuguese (native)", "English (intermediate)"] },
];

const EDUCATION_EN = [
  { fullName: "Dom Bosco Educational Association", course: "B.Sc. in Software Engineering", note: "In progress" },
  { fullName: "National Telecommunications Institute", course: "B.Sc. in Software Engineering", note: "Transferred to AEDB after moving cities" },
  { course: "Technical degree in Systems Development", note: "Completed" },
];

export const experienceFor = (lang: Lang) =>
  localizeList(lang, experience, "id", EXPERIENCE_EN).map((j) => ({ ...j, period: localeDate(lang, j.period) }));
export const skillsFor = (lang: Lang) => (lang === "en" ? skills.map((g, i) => ({ ...g, ...SKILLS_EN[i] })) : skills);
export const educationFor = (lang: Lang) => (lang === "en" ? education.map((e, i) => ({ ...e, ...EDUCATION_EN[i] })) : education);
