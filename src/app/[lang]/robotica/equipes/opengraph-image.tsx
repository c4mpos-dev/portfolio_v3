import { isLang, LANGS, tr } from "@/i18n";
import { ogCard } from "../../../_og/card";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}


/** One preview per page; the alt text follows the page's language (and project). */
export async function generateImageMetadata({ params }: { params: { lang: string } | Promise<{ lang: string }> }) {
  const p = await params;
  const lang = isLang(p.lang) ? p.lang : "pt";
  return [{ id: "card", alt: tr(lang, "Equipes de robótica — Cauã Campos", "Robotics teams — Cauã Campos"), size, contentType }];
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = isLang(l) ? l : "pt";
  return ogCard({
    sheet: tr(lang, "Robótica · Equipes", "Robotics · Teams"),
    title: tr(lang, "Três times, três fases.", "Three teams, three stages."),
    subtitle: tr(
      lang,
      "Da primeira equipe, em Piraí, ao nível mais alto da robótica, na FRC.",
      "From my first team, in Piraí, to the top level of robotics, in FRC.",
    ),
    tags: ["Pequeno Gigante", "Smart Lego", "Nine Tails #9219"],
    dimension: "2018 → 2023",
  });
}
