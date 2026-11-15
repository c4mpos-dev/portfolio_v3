import { type Lang } from "@/i18n";
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
    body: "Aprendi os fundamentos de programação e de trabalho em equipe na robótica competitiva, a partir do 7º ano. Foram três equipes até 2023, e a trajetória completa tem uma página só dela.",
    meta: "2018 → 2023 · Piraí e Resende, RJ",
    link: { href: "/robotica", label: "Ver robótica →" },
  },
  {
    title: "Primeiros estágios.",
    body: "Fui para Santa Rita do Sapucaí, o Vale da Eletrônica, cursar Engenharia de Software no INATEL. Estagiei lá mesmo, com sistemas internos em Vue.js e Python, e depois na Oracclum, remoto, numa plataforma de tracking em Next.js e Node.",
    meta: "2024 → 2026 · INATEL e Oracclum",
  },
  {
    title: "Next Devices.",
    body: "Primeiro emprego efetivo: aplicações web de rastreamento integradas a dispositivos IoT, cobrindo arquitetura, documentação, APIs, tempo real e deploy na AWS.",
    meta: "Jan → Set 2026 · Santa Rita do Sapucaí, MG",
  },
];

/**
 * Photos for the "Sobre" reel, from trips. Without src they show as a placeholder
 * frame; add the image to public/images/sobre/ and set src.
 */
/** Coordinates and year are optional: they are only shown when known. */
export type TravelPhoto = { src?: string; place: string; country?: string; year?: string; lat?: number; lon?: number };

export const travelPhotos: TravelPhoto[] = [
  { src: "/images/sobre/houston-curie.jpg", place: "Houston", country: "Estados Unidos", year: "2023", lat: 29.75, lon: -95.36 },
  { src: "/images/sobre/houston-space-center.jpg", place: "Space Center Houston", country: "Estados Unidos", year: "2023", lat: 29.55, lon: -95.1 },
  { src: "/images/sobre/alemanha-noite.jpg", place: "Baixa Saxônia", country: "Alemanha", year: "2023" },
  { src: "/images/sobre/frc-robo.jpg", place: "No pit da FRC", country: "Nine Tails #9219", year: "2023" },
  { src: "/images/sobre/litoral-rj.jpg", place: "Litoral do Rio", country: "Brasil" },
];

export const channels = [
  { label: "Email", value: social.email, href: `mailto:${social.email}` },
  { label: "WhatsApp", value: social.whatsappLabel, href: social.whatsapp },
  { label: "LinkedIn", value: social.linkedinLabel, href: social.linkedin },
  { label: "GitHub", value: social.githubUser, href: social.github },
];

// English
const STORY_EN: Partial<StoryChapter>[] = [
  {
    title: "Where it started.",
    body: "I learned the basics of programming and teamwork in competitive robotics, starting in 7th grade. Three teams through 2023, and the whole story has a page of its own.",
    meta: "2018 → 2023 · Piraí and Resende, RJ",
    link: { href: "/robotica", label: "See robotics →" },
  },
  {
    title: "First internships.",
    body: "I moved to Santa Rita do Sapucaí, Brazil's Electronics Valley, to study Software Engineering at INATEL. I interned there, on internal systems in Vue.js and Python, and then at Oracclum, remotely, on a tracking platform in Next.js and Node.",
    meta: "2024 → 2026 · INATEL and Oracclum",
  },
  {
    title: "Next Devices.",
    body: "My first full-time job: web tracking applications integrated with IoT devices, covering architecture, documentation, APIs, real time and deployment on AWS.",
    meta: "Jan → Sep 2026 · Santa Rita do Sapucaí, MG",
  },
];
export const storyFor = (lang: Lang) => (lang === "en" ? story.map((c, i) => ({ ...c, ...STORY_EN[i] })) : story);

const PLACES_EN: Record<string, string> = {
  Alemanha: "Germany",
  "Estados Unidos": "United States",
  Brasil: "Brazil",
  "Baixa Saxônia": "Lower Saxony",
  "No pit da FRC": "In the FRC pit",
  "Litoral do Rio": "Rio coastline",
};
const en = (s?: string) => (s && PLACES_EN[s]) ?? s;
export const travelPhotosFor = (lang: Lang) =>
  lang === "en" ? travelPhotos.map((t) => ({ ...t, place: en(t.place)!, country: en(t.country) })) : travelPhotos;
