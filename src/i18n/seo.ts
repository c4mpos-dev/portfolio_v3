import type { Metadata } from "next";
import { localePath, type Lang } from "./index";

/**
 * The public address. The apex (cauacampos.dev) redirects to www, so www is canonical.
 * Override with NEXT_PUBLIC_SITE_URL (e.g. for a preview domain).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cauacampos.dev").replace(/\/$/, "");

export const SITE_NAME = "Cauã Campos";
const DEFAULT_TITLE = "Cauã Campos — Full Stack Developer";

/**
 * Per-page metadata: title, description, canonical URL, PT/EN alternates and the
 * Open Graph / Twitter tags that WhatsApp, LinkedIn and X read for link previews.
 * The preview image itself comes from each route's opengraph-image file.
 */
export function pageMetadata(lang: Lang, path: string, { title, description }: { title?: string; description: string }): Metadata {
  const url = localePath(lang, path);
  const fullTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: url,
      languages: { "pt-BR": localePath("pt", path), en: localePath("en", path), "x-default": localePath("pt", path) },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: lang === "en" ? "en_US" : "pt_BR",
      alternateLocale: lang === "en" ? ["pt_BR"] : ["en_US"],
      url,
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
