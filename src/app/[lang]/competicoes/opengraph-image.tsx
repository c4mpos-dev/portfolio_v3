import { isLang, LANGS, tr } from "@/i18n";
import { ogCard } from "../../_og/card";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

/** One preview per page; the alt text follows the page's language. */
export async function generateImageMetadata({ params }: { params: { lang: string } | Promise<{ lang: string }> }) {
  const p = await params;
  const lang = isLang(p.lang) ? p.lang : "pt";
  return [{ id: "card", alt: tr(lang, "Hackathons e olimpíadas | Cauã Campos", "Hackathons and olympiads | Cauã Campos"), size, contentType }];
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = isLang(l) ? l : "pt";
  return ogCard({
    sheet: tr(lang, "Competições · 2017 → 2024", "Competitions · 2017 → 2024"),
    title: tr(lang, "Hackathons e olimpíadas.", "Hackathons and olympiads."),
    subtitle: tr(
      lang,
      "1º lugar no Hackathon ConstruTech 2024 e prêmio Melhor Código no Hacking.Rio 2021.",
      "1st place at the 2024 ConstruTech Hackathon and the Best Code award at Hacking.Rio 2021.",
    ),
    tags: ["ConstruTech", "Hacking.Rio", "OMERJ", "OBMEP"],
    dimension: tr(lang, "fora da robótica", "outside robotics"),
  });
}
