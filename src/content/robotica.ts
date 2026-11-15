import { localizeList, type Lang } from "@/i18n";
import { achievements, achievementsFor } from "./achievements";

export const stats = [
  { n: 33, label: "conquistas", detail: "Competições, hackathons e olimpíadas de 2017 a 2024, todas na linha do tempo abaixo." },
  { n: 8, label: "anos", detail: "De 2017 (OMERJ) a 2024 (2º Hackathon ConstruTech)." },
  { n: 2, label: "mundiais", detail: "FRC World Championship em Houston e FIRA RoboWorld Cup na Alemanha, ambos em 2023." },
  { n: 3, label: "equipes", detail: "Pequeno Gigante, Smart Lego e Nine Tails #9219." },
];

const photo = (id: string) => achievements.find((a) => a.id === id)?.image;

export const highlights = [
  {
    event: "FRC World Championship",
    year: "Abr 2023",
    result: "Rookie Inspiration Award — divisão Curie",
    team: "Nine Tails #9219",
    place: "Houston, EUA",
    image: photo("frc-houston"),
  },
  {
    event: "FIRA RoboWorld Cup",
    year: "Jul 2023",
    result: "3º em Missão Impossível Hardware e 3º em Cabo de Guerra",
    team: "Smart Lego",
    place: "Wolfenbüttel, Alemanha",
    image: photo("fira-roboworld-cup-2023"),
  },
];

export type Team = {
  slug: string;
  name: string;
  period: string;
  /** First and last year, for the timeline chart. */
  from: number;
  to: number;
  place: string;
  desc: string;
  awards: string[];
  image?: string;
  /** Matches the `team` field of an achievement (Pequeno Gigante competed as Android and SkyDroid). */
  match: RegExp;
};

/** Newest first. */
export const teams: Team[] = [
  {
    slug: "nine-tails",
    name: "Nine Tails #9219",
    period: "2022–2023",
    from: 2022,
    to: 2023,
    place: "Resende, RJ",
    desc: "Equipe de FRC do SESI SENAI Resende, onde atingi o nível mais alto da robótica. Fiz parte da primeira geração.",
    awards: ["Rookie Inspiration Award · Houston 2023", "Rookie All-Star · FRC Brasil 2023", "Engineering Award · off-season 2023"],
    image: "/images/equipes/nine-tails.jpg",
    match: /nine tails/i,
  },
  {
    slug: "smart-lego",
    name: "Smart Lego",
    period: "2021–2023",
    from: 2021,
    to: 2023,
    place: "Resende, RJ",
    desc: "Time de robótica do SESI Resende, que levei junto à primeira competição internacional da equipe.",
    awards: ["3º · FIRA RoboWorld Cup 2023", "3º geral e Champions Award · FLL 2022"],
    image: "/images/equipes/smart-lego.jpg",
    match: /smart lego/i,
  },
  {
    slug: "pequeno-gigante",
    name: "Pequeno Gigante",
    period: "2018–2021",
    from: 2018,
    to: 2021,
    place: "Piraí, RJ",
    desc: "Time da prefeitura de Piraí, minha primeira equipe, onde aprendi os fundamentos de programação e trabalho em equipe.",
    awards: ["OBR · regional, estadual e nacional", "Moção de aplausos da prefeitura de Piraí · 2018"],
    image: "/images/equipes/pequeno-gigante.jpg",
    match: /pequeno gigante|android|skydroid/i,
  },
];

/** Competition records of one team, newest first. */
export const teamRecords = (team: Team, lang: Lang = "pt") => achievementsFor(lang).filter((a) => a.team && team.match.test(a.team));

/** Straight-line (great-circle) distances from Resende to the two 2023 world championships. */
export const routes = [
  { to: "Houston", country: "EUA", event: "FRC World Championship", when: "Abr 2023", km: 7959, lat: 29.76, lon: -95.37 },
  { to: "Wolfenbüttel", country: "Alemanha", event: "FIRA RoboWorld Cup", when: "Jul 2023", km: 9858, lat: 52.16, lon: 10.53 },
];
export const routeOrigin = { name: "Resende", lat: -22.47, lon: -44.45 };

// Source: CV_CauaCampos.pdf (Prêmios e projetos)
export const roboticsRole =
  "Responsável pelos algoritmos de navegação autônoma e manipulação de objetos com IA e IoT nas competições de 2023 (FRC e FIRA RoboWorld Cup).";

// English
const STATS_EN = [
  { label: "achievements", detail: "Competitions, hackathons and olympiads from 2017 to 2024, all in the timeline below." },
  { label: "years", detail: "From 2017 (OMERJ) to 2024 (2nd ConstruTech Hackathon)." },
  { label: "world events", detail: "FRC World Championship in Houston and FIRA RoboWorld Cup in Germany, both in 2023." },
  { label: "teams", detail: "Pequeno Gigante, Smart Lego and Nine Tails #9219." },
];
export const statsFor = (lang: Lang) => (lang === "en" ? stats.map((s, i) => ({ ...s, ...STATS_EN[i] })) : stats);

const HIGHLIGHTS_EN = [
  { year: "Apr 2023", result: "Rookie Inspiration Award — Curie division", place: "Houston, USA" },
  { year: "Jul 2023", result: "3rd in Mission Impossible Hardware and 3rd in Tug of War", place: "Wolfenbüttel, Germany" },
];
export const highlightsFor = (lang: Lang) => (lang === "en" ? highlights.map((h, i) => ({ ...h, ...HIGHLIGHTS_EN[i] })) : highlights);

const TEAMS_EN: Record<string, Partial<Team>> = {
  "nine-tails": {
    desc: "The FRC team at SESI SENAI Resende, where I reached the top level of robotics. I was part of its first generation.",
    awards: ["Rookie Inspiration Award · Houston 2023", "Rookie All-Star · FRC Brazil 2023", "Engineering Award · 2023 off-season"],
  },
  "smart-lego": {
    desc: "The SESI Resende robotics team, which I helped take to its first international competition.",
    awards: ["3rd · FIRA RoboWorld Cup 2023", "3rd overall and Champion's Award · FLL 2022"],
  },
  "pequeno-gigante": {
    desc: "The Piraí city team, my first one, where I learned the basics of programming and teamwork.",
    awards: ["OBR · regional, state and national", "Motion of applause from the Piraí city council · 2018"],
  },
};
export const teamsFor = (lang: Lang) => localizeList(lang, teams, "slug", TEAMS_EN);

export const roboticsRoleFor = (lang: Lang) =>
  lang === "en"
    ? "In charge of the autonomous navigation and object manipulation algorithms, with AI and IoT, in the 2023 competitions (FRC and FIRA RoboWorld Cup)."
    : roboticsRole;

const ROUTES_EN = [
  { country: "USA", when: "Apr 2023" },
  { country: "Germany", when: "Jul 2023" },
];
export const routesFor = (lang: Lang) => (lang === "en" ? routes.map((r, i) => ({ ...r, ...ROUTES_EN[i] })) : routes);
