import { isLang, LANGS, tr } from "@/i18n";
import { ogCard } from "../../_og/card";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}


/** One preview per page; the alt text follows the page's language (and project). */
export async function generateImageMetadata({ params }: { params: { lang: string } | Promise<{ lang: string }> }) {
  const p = await params;
  const lang = isLang(p.lang) ? p.lang : "pt";
  return [{ id: "card", alt: tr(lang, "Robótica — Cauã Campos", "Robotics — Cauã Campos"), size, contentType }];
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = isLang(l) ? l : "pt";
  return ogCard({
    sheet: tr(lang, "Robótica · 2017 → 2024", "Robotics · 2017 → 2024"),
    title: tr(lang, "Três equipes, dois mundiais, 33 conquistas.", "Three teams, two world events, 33 achievements."),
    subtitle: tr(
      lang,
      "FRC World Championship em Houston e FIRA RoboWorld Cup na Alemanha, ambos em 2023.",
      "FRC World Championship in Houston and FIRA RoboWorld Cup in Germany, both in 2023.",
    ),
    tags: ["FRC", "FIRA", "FLL", "OBR"],
    dimension: tr(lang, "8 anos", "8 years"),
  });
}
