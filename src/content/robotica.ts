import { achievements } from "./achievements";

export const stats = [
  { n: "33", label: "conquistas" },
  { n: "8", label: "anos" },
  { n: "2", label: "mundiais" },
  { n: "3", label: "equipes" },
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

export const teams = [
  {
    name: "Nine Tails #9219",
    period: "2022–2023",
    place: "Resende, RJ",
    desc: "Equipe de FRC do SESI SENAI Resende, onde atingi o nível mais alto da robótica. Fiz parte da primeira geração.",
    awards: ["Rookie Inspiration Award · Houston 2023", "Rookie All-Star · FRC Brasil 2023", "Engineering Award · off-season 2023"],
    image: photo("off-season-2023"),
  },
  {
    name: "Smart Lego",
    period: "2021–2023",
    place: "Resende, RJ",
    desc: "Time de robótica do SESI Resende, que levei junto à primeira competição internacional da equipe.",
    awards: ["3º · FIRA RoboWorld Cup 2023", "3º geral e Champions Award · FLL 2022"],
    image: photo("fll-superpowered"),
  },
  {
    name: "Pequeno Gigante",
    period: "2018–2021",
    place: "Piraí, RJ",
    desc: "Time da prefeitura de Piraí, minha primeira equipe, onde aprendi os fundamentos de programação e trabalho em equipe.",
    awards: ["OBR · regional, estadual e nacional", "Moção de aplausos da prefeitura de Piraí · 2018"],
    image: photo("obr-estadual-2019"),
  },
];

// Source: CV_CauaCampos.pdf (Prêmios e projetos)
export const roboticsRole =
  "Responsável pelos algoritmos de navegação autônoma e manipulação de objetos com IA e IoT nas competições de 2023 (FRC e FIRA RoboWorld Cup).";
