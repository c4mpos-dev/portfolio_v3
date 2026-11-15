import { isLang, LANGS, tr } from "@/i18n";
import { ogCard } from "../_og/card";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}


/** One preview per page; the alt text follows the page's language (and project). */
export async function generateImageMetadata({ params }: { params: { lang: string } | Promise<{ lang: string }> }) {
  const p = await params;
  const lang = isLang(p.lang) ? p.lang : "pt";
  return [{ id: "card", alt: tr(lang, "Cauã Campos, desenvolvedor Full Stack", "Cauã Campos, Full Stack Developer"), size, contentType }];
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = isLang(l) ? l : "pt";
  return ogCard({
    sheet: tr(lang, "Folha 00 / Apresentação", "Sheet 00 / Introduction"),
    title: tr(lang, "TypeScript nas duas pontas.", "TypeScript on both ends."),
    subtitle: tr(
      lang,
      "Cauã Campos, desenvolvedor Full Stack. Sistemas distribuídos, IoT e Clean Architecture, do requisito ao deploy na AWS.",
      "Cauã Campos, Full Stack Developer. Distributed systems, IoT and Clean Architecture, from requirements to deploy on AWS.",
    ),
    tags: ["NestJS", "Node.js", "React", "Next.js", "AWS"],
    dimension: tr(lang, "back-end · front-end", "back end · front end"),
  });
}
