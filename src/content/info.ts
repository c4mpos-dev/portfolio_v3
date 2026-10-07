import { social } from "./site";

export type StoryChapter = {
  title: string;
  body: string;
  meta: string;
  link?: { href: string; label: string };
};

export const story: StoryChapter[] = [
  {
    title: "Onde começou.",
    body: "Aprendi os fundamentos de programação e de trabalho em equipe na robótica competitiva, a partir do 7º ano. Foram três equipes até 2023 — a trajetória completa tem uma página só dela.",
    meta: "2018–2023 · Piraí e Resende, RJ",
    link: { href: "/robotica", label: "Ver robótica →" },
  },
  {
    title: "Primeiros estágios.",
    body: "Fui para Santa Rita do Sapucaí, o Vale da Eletrônica, cursar Engenharia de Software no INATEL. Estagiei lá mesmo, com sistemas internos em Vue.js e Python, e depois na Oracclum, remoto, numa plataforma de tracking em Next.js e Node.",
    meta: "2024 → 2026 · INATEL e Oracclum",
  },
  {
    title: "Next Devices.",
    body: "Primeiro emprego efetivo: aplicações web de rastreamento integradas a dispositivos IoT, de ponta a ponta — arquitetura, documentação, APIs, tempo real e deploy na AWS.",
    meta: "Jan → Set 2026 · Santa Rita do Sapucaí, MG",
  },
];

export const portrait: string | undefined = undefined;

export const channels = [
  { label: "Email", value: social.email, href: `mailto:${social.email}` },
  { label: "WhatsApp", value: social.whatsappLabel, href: social.whatsapp },
  { label: "LinkedIn", value: social.linkedinLabel, href: social.linkedin },
  { label: "GitHub", value: social.githubUser, href: social.github },
];
