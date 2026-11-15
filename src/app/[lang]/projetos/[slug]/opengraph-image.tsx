import { projects } from "@/content/projects";
import { getProjectFor, kindsFor } from "@/content/projects-en";
import { isLang, tr } from "@/i18n";
import { ogCard } from "../../../_og/card";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/** One preview per page; the alt text follows the page's language (and project). */
export async function generateImageMetadata({ params }: { params: { lang: string; slug: string } | Promise<{ lang: string; slug: string }> }) {
  const p = await params;
  const lang = isLang(p.lang) ? p.lang : "pt";
  return [{ id: "card", alt: `${getProjectFor(lang, p.slug)?.name ?? tr(lang, "Projeto", "Project")} — Cauã Campos`, size, contentType }];
}

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: l, slug } = await params;
  const lang = isLang(l) ? l : "pt";
  const p = getProjectFor(lang, slug);
  const n = String(projects.findIndex((x) => x.slug === slug) + 1).padStart(2, "0");
  return ogCard({
    sheet: `${tr(lang, "Projeto", "Project")} ${n} / ${p ? kindsFor(lang)[p.kind] : ""}`,
    title: p?.name ?? "Cauã Campos",
    subtitle: p?.summary,
    tags: p ? [...(p.year ? [p.year.replace(/\s/g, "")] : []), ...p.stack.slice(0, 4)] : [],
    dimension: p?.org ?? "cauacampos.dev",
  });
}
