import { localeDate, localizeList, type Lang } from "@/i18n";

// Generated from cauacampos.dev/achievements (the previous portfolio). Edit freely.

export type AchievementGroup =
  "robotica" | "hackathons" | "olimpiadas" | "outros";

export type Achievement = {
  id: string;
  title: string;
  /** Competition family: FRC, FIRA, FLL, OBR, TJR… */
  category: string;
  group: AchievementGroup;
  date: string;
  year: number;
  month: number;
  place: string;
  team?: string;
  description: string;
  image: string;
  /** News article or post about it. */
  link?: string;
};

export const ACHIEVEMENT_GROUPS: { id: AchievementGroup; label: string }[] = [
  { id: "robotica", label: "Robótica" },
  { id: "hackathons", label: "Hackathons" },
  { id: "olimpiadas", label: "Olimpíadas" },
  { id: "outros", label: "Outros" },
];

/** Newest first. */
export const achievements: Achievement[] = [
  {
    id: "hackathon-construtech-2024",
    title: "2º Hackathon ConstruTech",
    category: "Hackathon",
    group: "hackathons",
    date: "Mai 2024",
    year: 2024,
    month: 5,
    place: "Santa Rita do Sapucaí, MG",
    description:
      "A INTLOG ficou em 1º lugar no Hackathon ConstruTech 2024, voltado ao setor de construção civil.",
    image: "/images/conquistas/hackathon-construtech-2024.jpg",
    link: "https://inatel.br/noticias/hackathon-premia-melhores-solucoes-para-mercado-da-construcao-civil",
  },
  {
    id: "iron-cup-2024",
    title: "IronCup 2024",
    category: "Evento",
    group: "outros",
    date: "Mar 2024",
    year: 2024,
    month: 3,
    place: "Santa Rita do Sapucaí, MG",
    description: "Participei como Staff do evento, na categoria Combate.",
    image: "/images/conquistas/iron-cup-2024.png",
  },
  {
    id: "off-season-2023",
    title: "FRC Off-Season",
    category: "FRC",
    group: "robotica",
    date: "Ago 2023",
    year: 2023,
    month: 8,
    place: "Rio de Janeiro, RJ",
    team: "Nine Tails",
    description:
      "3º lugar geral e campeão da categoria 'Engineering Award' no evento FRC OFF-SEASON 2023 no Rio de Janeiro.",
    image: "/images/conquistas/off-season-2023.jpg",
    link: "https://www.instagram.com/p/Cv5QHVjO-j9/?img_index=1",
  },
  {
    id: "fira-roboworld-cup-2023",
    title: "FIRA RoboWorld Cup",
    category: "FIRA",
    group: "robotica",
    date: "Jul 2023",
    year: 2023,
    month: 7,
    place: "Wolfenbüttel, Alemanha",
    team: "Smart Lego",
    description:
      "3º lugar na categoria 'Cabo de Guerra' e Missão Impossível Hardware.",
    image: "/images/conquistas/fira-roboworld-cup-2023.jpg",
    link: "https://g1.globo.com/rj/sul-do-rio-costa-verde/noticia/2023/07/14/estudantes-de-resende-viajam-a-alemanha-para-disputar-copa-do-mundo-de-robotica.ghtml",
  },
  {
    id: "frc-houston",
    title: "FRC World Championship",
    category: "FRC",
    group: "robotica",
    date: "Abr 2023",
    year: 2023,
    month: 4,
    place: "Houston, EUA",
    team: "Nine Tails",
    description:
      "Conquistamos o prêmio 'Rookie Inspiration Award' da divisão Curie.",
    image: "/images/conquistas/frc-houston.jpg",
    link: "https://odia.ig.com.br/resende/2023/04/6618347-alunos-de-resende-ganham-premio-em-torneio-mundial-de-robotica-nos-eua.html",
  },
  {
    id: "frc-brasilia",
    title: "FRC Brasil Regional",
    category: "FRC",
    group: "robotica",
    date: "Mar 2023",
    year: 2023,
    month: 3,
    place: "Brasília, DF",
    team: "Nine Tails",
    description:
      "Conquistamos o prêmio 'Rookie All-Star' da competição, que nos deu a vaga no mundial em Houston.",
    image: "/images/conquistas/frc-brasilia.jpg",
    link: "https://www.instagram.com/p/Cp_YwuGOO4c/",
  },
  {
    id: "fll-superpowered",
    title: "FLL Superpowered",
    category: "FLL",
    group: "robotica",
    date: "Dez 2022",
    year: 2022,
    month: 12,
    place: "Duque de Caxias, RJ",
    team: "Smart Lego",
    description:
      "3º lugar geral no torneio nacional de robótica FLL Superpowered, o Champion's Award.",
    image: "/images/conquistas/fll-superpowered.jpg",
    link: "https://www.instagram.com/p/Co2PMGCOoTp/?img_index=2",
  },
  {
    id: "fira-nacional",
    title: "FIRA Nacional",
    category: "FIRA",
    group: "robotica",
    date: "Nov 2022",
    year: 2022,
    month: 11,
    place: "São Luís, MA",
    team: "Smart Lego",
    description:
      "Conquistamos o 4º lugar na categoria Missão Impossível. Nos classificamos para o mundial na Alemanha.",
    image: "/images/conquistas/fira-nacional.jpg",
  },
  {
    id: "fira-regional-rj",
    title: "FIRA Regional",
    category: "FIRA",
    group: "robotica",
    date: "Set 2022",
    year: 2022,
    month: 9,
    place: "Rio de Janeiro, RJ",
    team: "Smart Lego",
    description: "Campeão das categorias Cabo de Guerra e Missão Impossível.",
    image: "/images/conquistas/fira-regional-rj.jpg",
    link: "https://www.instagram.com/p/Ci-81jWOZul/",
  },
  {
    id: "fll-cargoconnect",
    title: "FLL Cargo Connect",
    category: "FLL",
    group: "robotica",
    date: "Mar 2022",
    year: 2022,
    month: 3,
    place: "Virtual",
    team: "Smart Lego",
    description:
      "2º lugar na categoria Projeto de Inovação na etapa estadual.",
    image: "/images/conquistas/fll-cargoconnect.png",
    link: "https://www.instagram.com/p/CcJaI-TO7CQ/?img_index=1",
  },
  {
    id: "tjr-nacional-2021",
    title: "TJR Nacional",
    category: "TJR",
    group: "robotica",
    date: "Dez 2021",
    year: 2021,
    month: 12,
    place: "São Paulo, SP",
    team: "Smart Lego",
    description: "Conquistamos o 4º lugar na categoria Sumô.",
    image: "/images/conquistas/tjr-nacional-2021.png",
    link: "https://www.instagram.com/p/CXrRpsRJFdd/",
  },
  {
    id: "tbr-nacional-2021",
    title: "TBR Nacional",
    category: "TBR",
    group: "robotica",
    date: "Dez 2021",
    year: 2021,
    month: 12,
    place: "Virtual",
    team: "Smart Lego",
    description:
      "Nossa equipe apresentou um projeto social baseado no tema da temporada.",
    image: "/images/conquistas/tbr-nacional-2021.png",
    link: "https://www.instagram.com/p/CXHW5YSpxz-/",
  },
  {
    id: "hacking-rio",
    title: "Hacking.Rio",
    category: "Hackathon",
    group: "hackathons",
    date: "Nov 2021",
    year: 2021,
    month: 11,
    place: "Virtual",
    description:
      "A equipe SmartHack ficou com o prêmio 'Melhor Código' da competição. Recebemos uma moção de louvor da prefeitura de Resende.",
    image: "/images/conquistas/hacking.rio.jpg",
  },
  {
    id: "tjr-regional-2021",
    title: "TJR Regional",
    category: "TJR",
    group: "robotica",
    date: "Out 2021",
    year: 2021,
    month: 10,
    place: "Volta Redonda, RJ",
    team: "Smart Lego",
    description: "Nossa equipe foi campeã da categoria Sumô.",
    image: "/images/conquistas/tjr-regional-2021.png",
  },
  {
    id: "obrvs-nacional-2021",
    title: "OBR Virtual Simulação (Nacional)",
    category: "OBR Virtual",
    group: "robotica",
    date: "Out 2021",
    year: 2021,
    month: 10,
    place: "Virtual",
    team: "Pequeno Gigante Skydroid",
    description: "",
    image: "/images/conquistas/obrvs-nacional-2021.png",
  },
  {
    id: "tbr-regional-2021",
    title: "TBR Regional",
    category: "TBR",
    group: "robotica",
    date: "Set 2021",
    year: 2021,
    month: 9,
    place: "Virtual",
    team: "Smart Lego",
    description:
      "A equipe apresentou um projeto sobre o tema e conseguiu a classificação para a etapa nacional.",
    image: "/images/conquistas/tbr-regional-2021.png",
    link: "https://www.instagram.com/p/CUTXGXisRy_/?img_index=1",
  },
  {
    id: "obrvs-estadual-2021",
    title: "OBR Virtual Simulação (Estadual)",
    category: "OBR Virtual",
    group: "robotica",
    date: "Ago 2021",
    year: 2021,
    month: 8,
    place: "Virtual",
    team: "Pequeno Gigante Skydroid",
    description:
      "Conquistamos o 2º lugar, com isso, garantimos nossa classificação para a etapa nacional.",
    image: "/images/conquistas/obrvs-estadual-2021.png",
    link: "https://globoplay.globo.com/v/9773030/",
  },
  {
    id: "obrvs-nacional-2020",
    title: "OBR Virtual Simulação (Nacional)",
    category: "OBR Virtual",
    group: "robotica",
    date: "Nov 2020",
    year: 2020,
    month: 11,
    place: "Virtual",
    team: "Pequeno Gigante Skydroid",
    description:
      "Nossa equipe ficou em 27º lugar no Brasil e saiu na capa da OBR.",
    image: "/images/conquistas/obrvs-nacional-2020.png",
    link: "https://www.facebook.com/photo?fbid=1621196931386299&set=a.236337473205592&locale=pt_BR",
  },
  {
    id: "obrvs-estadual-2020",
    title: "OBR Virtual Simulação (Estadual)",
    category: "OBR Virtual",
    group: "robotica",
    date: "Out 2020",
    year: 2020,
    month: 10,
    place: "Virtual",
    team: "Pequeno Gigante Skydroid",
    description:
      "Nossa equipe ficou em 3º lugar, garantindo nossa classificação para a etapa nacional.",
    image: "/images/conquistas/obrvs-estadual-2020.png",
    link: "https://www.facebook.com/photo/?fbid=3431539570293223&set=pcb.3431558560291324&locale=pt_BR",
  },
  {
    id: "obmep-2019",
    title: "OBMEP",
    category: "Olimpíada",
    group: "olimpiadas",
    date: "Dez 2019",
    year: 2019,
    month: 12,
    place: "Piraí, RJ",
    description:
      "Menção honrosa pelo desempenho na OBMEP (Olimpíada Brasileira de Matemática das Escolas Públicas).",
    image: "/images/conquistas/obmep-2019.png",
  },
  {
    id: "tjr-nacional-2019",
    title: "TJR Nacional",
    category: "TJR",
    group: "robotica",
    date: "Dez 2019",
    year: 2019,
    month: 12,
    place: "São Paulo, SP",
    team: "Pequeno Gigante Android",
    description:
      "A equipe Pequeno Gigante Android conquistou o 2º lugar na categoria Viagem ao Centro da Terra.",
    image: "/images/conquistas/tjr-nacional-2019.jpg",
    link: "https://www.facebook.com/photo/?fbid=10206295353938194&set=pb.1696644253.-2207520000",
  },
  {
    id: "obr-nacional-2019",
    title: "OBR Nacional",
    category: "OBR",
    group: "robotica",
    date: "Out 2019",
    year: 2019,
    month: 10,
    place: "Rio Grande, RS",
    team: "Pequeno Gigante Skydroid",
    description:
      "A equipe não conseguiu o pódio, mas volta com mais uma medalha como participação na etapa nacional.",
    image: "/images/conquistas/obr-nacional-2019.jpg",
    link: "https://www.facebook.com/PiraiPequenoGigante/posts/pfbid036idZdURcDMarMr5EYKhWv29QojMxbw99iDe52kRpQyptkhB93T4sn2mexjhjauhLl?locale=pt_BR",
  },
  {
    id: "obr-estadual-2019",
    title: "OBR Estadual",
    category: "OBR",
    group: "robotica",
    date: "Set 2019",
    year: 2019,
    month: 9,
    place: "Petrópolis, RJ",
    team: "Pequeno Gigante Skydroid",
    description:
      "A equipe foi campeã estadual e se classificou para a etapa nacional.",
    image: "/images/conquistas/obr-estadual-2019.jpg",
    link: "https://www.facebook.com/PiraiPequenoGigante/posts/pfbid02PeydRhAYLARs2F94ytMazgFDS9oxR3MvDAdVjZ5DPaMrgwezJK9YjATugYDjA3Eml?locale=pt_BR",
  },
  {
    id: "obr-regional-2019",
    title: "OBR Regional",
    category: "OBR",
    group: "robotica",
    date: "Ago 2019",
    year: 2019,
    month: 8,
    place: "São Gonçalo, RJ",
    team: "Pequeno Gigante Skydroid",
    description:
      "Nossa equipe ficou com o 2º lugar, se classificando para a etapa estadual.",
    image: "/images/conquistas/obr-regional-2019.jpg",
    link: "https://www.facebook.com/osni.silva.16/posts/pfbid0sxWqqDV85zDGw8NbqaecNWZEHnu2KivNZWtpWjvKUPCQEEvPatR2LzMJbmevhaWHl?locale=pt_BR",
  },
  {
    id: "tjr-regional-2019",
    title: "TJR Regional",
    category: "TJR",
    group: "robotica",
    date: "Jul 2019",
    year: 2019,
    month: 7,
    place: "Volta Redonda, RJ",
    team: "Pequeno Gigante Android",
    description:
      "A equipe Pequeno Gigante Android conquistou 1º lugar na categoria Viagem ao Centro da Terra, se classificando para a etapa nacional.",
    image: "/images/conquistas/tjr-regional-2019.jpg",
    link: "https://www.facebook.com/osni.silva.16/posts/pfbid02VRAEoreu991RgLVLH8U6xxdsWJsrHzU9DvUXmg8ZM24t96QFRdtL89ECSfGkr8v3l",
  },
  {
    id: "itr-2019",
    title: "ITR",
    category: "ITR",
    group: "robotica",
    date: "Jun 2019",
    year: 2019,
    month: 6,
    place: "São Luís, MA",
    team: "Pequeno Gigante Android/SkyDroid",
    description:
      "A equipe Android conquistou 1º lugar na categoria Viagem ao Centro da Terra, e a equipe SkyDroid conquistou 2º lugar na categoria Cabo de Guerra.",
    image: "/images/conquistas/itr-2019.jpg",
    link: "https://www.facebook.com/osni.silva.16/posts/pfbid02fu2KVuWUSvodAsMnhJTcyX49WP9ENEqMyY6FiuPP8cbJkuaiEckJA6CTSXXKvaSwl",
  },
  {
    id: "tjr-nacional-2018",
    title: "TJR Nacional",
    category: "TJR",
    group: "robotica",
    date: "Nov → Dez 2018",
    year: 2018,
    month: 11,
    place: "João Pessoa, PB",
    team: "Android",
    description:
      "A equipe Android conquistou 1º lugar na categoria Viagem ao Centro da Terra, se classificando para a etapa internacional.",
    image: "/images/conquistas/tjr-nacional-2018.jpg",
    link: "https://www.facebook.com/photo/?fbid=10205077555133985&set=pb.1696644253.-2207520000",
  },
  {
    id: "tjr-regional-2018",
    title: "TJR Regional",
    category: "TJR",
    group: "robotica",
    date: "Nov 2018",
    year: 2018,
    month: 11,
    place: "Botafogo, RJ",
    team: "Android",
    description:
      "A equipe Android conquistou 1º lugar na categoria Viagem ao Centro da Terra, se classificando para a etapa nacional.",
    image: "/images/conquistas/tjr-regional-2018.jpg",
    link: "https://www.facebook.com/osni.silva.16/posts/pfbid02AYDgougVJvUiCRmjfWEBtzfEciYgPKQ2B9HUa4CzuCGMFpKG52QSWycvQvV9omBQl",
  },
  {
    id: "mocao-2018",
    title: "Moção de aplausos da Prefeitura de Piraí",
    category: "Reconhecimento",
    group: "outros",
    date: "Set 2018",
    year: 2018,
    month: 9,
    place: "Piraí, RJ",
    description:
      "Moção de aplausos da prefeitura de Piraí pelo desempenho na Olimpíada Brasileira de Robótica.",
    image: "/images/conquistas/mocao-2018.png",
  },
  {
    id: "obr-estadual-2018",
    title: "OBR Estadual",
    category: "OBR",
    group: "robotica",
    date: "Set 2018",
    year: 2018,
    month: 9,
    place: "Volta Redonda, RJ",
    team: "Android",
    description:
      "Em nosso primeiro ano na OBR, conquistamos 5º lugar estadual.",
    image: "/images/conquistas/obr-estadual-2018.jpg",
    link: "https://www.facebook.com/osni.silva.16/posts/pfbid04CwuLo3gUMMyYGpFx5Bjm5b2NbBjLYMAR8YMeGgMmxYq5aaVa174tTgAC8mTdCu4l?locale=pt_BR",
  },
  {
    id: "obr-regional-2018",
    title: "OBR Regional",
    category: "OBR",
    group: "robotica",
    date: "Set 2018",
    year: 2018,
    month: 9,
    place: "Volta Redonda, RJ",
    team: "Android",
    description:
      "Em minha primeira competição, minha equipe, Android, conquistou 7º lugar, se classificando para a etapa estadual.",
    image: "/images/conquistas/obr-regional-2018.jpg",
    link: "https://www.facebook.com/osni.silva.16/posts/pfbid034Kc9KUeWQJqcE9PN1rq7EDckeFgS5vy6Gngy3zyJmRQe1nAJxm4kLTULZkyqKFvTl",
  },
  {
    id: "omerj-2017",
    title: "OMERJ",
    category: "Olimpíada",
    group: "olimpiadas",
    date: "Nov 2017",
    year: 2017,
    month: 11,
    place: "Piraí, RJ",
    description:
      "Menção honrosa pelo desempenho na prova da OMERJ (Olimpíada de Matemática do Estado do Rio de Janeiro).",
    image: "/images/conquistas/omerj-2017.jpg",
    link: "https://www.pirai.rj.gov.br/component/k2/alunso-da-rede-muncipal-destaques-em-olimpiadas-de-conhecimento-sao-homenageados",
  },
];

// English

const ACHIEVEMENT_GROUPS_EN: Record<AchievementGroup, string> = {
  robotica: "Robotics",
  hackathons: "Hackathons",
  olimpiadas: "Olympiads",
  outros: "Other",
};

const ACHIEVEMENTS_EN: Record<string, Partial<Achievement>> = {
  "hackathon-construtech-2024": {
    title: "2nd ConstruTech Hackathon",
    description: "Team INTLOG took 1st place at the 2024 ConstruTech Hackathon, focused on the construction industry.",
  },
  "iron-cup-2024": { category: "Event", description: "I worked as event staff in the Combat category." },
  "off-season-2023": {
    description: "3rd place overall and winner of the Engineering Award at the 2023 FRC Off-Season in Rio de Janeiro.",
  },
  "fira-roboworld-cup-2023": { place: "Wolfenbüttel, Germany", description: "3rd place in Tug of War and in Mission Impossible Hardware." },
  "frc-houston": { place: "Houston, USA", description: "We won the Rookie Inspiration Award in the Curie division." },
  "frc-brasilia": {
    description: "We won the competition's Rookie All-Star award, which earned us a spot at the world championship in Houston.",
  },
  "fll-superpowered": {
    description: "3rd place overall at the FLL Superpowered national robotics tournament: the Champion's Award.",
  },
  "fira-nacional": {
    title: "FIRA National",
    description: "4th place in Mission Impossible, which qualified us for the world championship in Germany.",
  },
  "fira-regional-rj": { description: "Champions in Tug of War and Mission Impossible." },
  "fll-cargoconnect": { description: "2nd place in the Innovation Project category at the state stage." },
  "tjr-nacional-2021": { title: "TJR National", description: "4th place in the Sumo category." },
  "tbr-nacional-2021": { title: "TBR National", description: "Our team presented a social project built around the season's theme." },
  "hacking-rio": {
    description: "Team SmartHack won the Best Code award. We also received a motion of praise from the Resende city council.",
  },
  "tjr-regional-2021": { description: "Our team won the Sumo category." },
  "obrvs-nacional-2021": { title: "OBR Virtual Simulation (National)" },
  "tbr-regional-2021": { description: "The team presented a project on the theme and qualified for the national stage." },
  "obrvs-estadual-2021": {
    title: "OBR Virtual Simulation (State)",
    description: "We took 2nd place, which qualified us for the national stage.",
  },
  "obrvs-nacional-2020": {
    title: "OBR Virtual Simulation (National)",
    description: "Our team finished 27th in Brazil and was featured on the OBR cover.",
  },
  "obrvs-estadual-2020": {
    title: "OBR Virtual Simulation (State)",
    description: "Our team placed 3rd, which qualified us for the national stage.",
  },
  "obmep-2019": {
    category: "Olympiad",
    description: "Honorable mention at OBMEP, the Brazilian Mathematics Olympiad for Public Schools.",
  },
  "tjr-nacional-2019": { title: "TJR National", description: "Team Pequeno Gigante Android took 2nd place in Journey to the Center of the Earth." },
  "obr-nacional-2019": {
    title: "OBR National",
    description: "No podium this time, but the team came home with another medal for taking part in the national stage.",
  },
  "obr-estadual-2019": { title: "OBR State", description: "The team became state champion and qualified for the national stage." },
  "obr-regional-2019": { description: "Our team took 2nd place and qualified for the state stage." },
  "tjr-regional-2019": {
    description: "Team Pequeno Gigante Android took 1st place in Journey to the Center of the Earth and qualified for the national stage.",
  },
  "itr-2019": {
    description: "Team Android took 1st place in Journey to the Center of the Earth, and team SkyDroid took 2nd in Tug of War.",
  },
  "tjr-nacional-2018": {
    title: "TJR National",
    description: "Team Android took 1st place in Journey to the Center of the Earth and qualified for the international stage.",
  },
  "tjr-regional-2018": {
    description: "Team Android took 1st place in Journey to the Center of the Earth and qualified for the national stage.",
  },
  "mocao-2018": {
    title: "Motion of applause from the Piraí city council",
    category: "Recognition",
    description: "Motion of applause from the Piraí city council for our performance at the Brazilian Robotics Olympiad.",
  },
  "obr-estadual-2018": { title: "OBR State", description: "In our first year at OBR, we placed 5th in the state." },
  "obr-regional-2018": {
    description: "At my first competition, my team, Android, placed 7th and qualified for the state stage.",
  },
  "omerj-2017": {
    category: "Olympiad",
    description: "Honorable mention at OMERJ, the Rio de Janeiro State Mathematics Olympiad.",
  },
};

export const achievementGroupsFor = (lang: Lang) =>
  lang === "en" ? ACHIEVEMENT_GROUPS.map((g) => ({ ...g, label: ACHIEVEMENT_GROUPS_EN[g.id] })) : ACHIEVEMENT_GROUPS;

export const achievementsFor = (lang: Lang): Achievement[] =>
  localizeList(lang, achievements, "id", ACHIEVEMENTS_EN).map((a) => ({ ...a, date: localeDate(lang, a.date) }));
