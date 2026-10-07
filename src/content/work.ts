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
