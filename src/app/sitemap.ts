import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { localePath } from "@/i18n";
import { SITE_URL } from "@/i18n/seo";

/** Every page in both languages, each pointing at its translation. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/robotica", "/robotica/equipes", "/competicoes", ...projects.map((p) => `/projetos/${p.slug}`)];
  return paths.flatMap((path) =>
    (["pt", "en"] as const).map((lang) => ({
      url: SITE_URL + localePath(lang, path),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path.startsWith("/projetos/") ? 0.6 : 0.8,
      alternates: { languages: { "pt-BR": SITE_URL + localePath("pt", path), en: SITE_URL + localePath("en", path) } },
    })),
  );
}
