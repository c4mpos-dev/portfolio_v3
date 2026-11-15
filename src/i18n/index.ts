/**
 * Two languages. Portuguese lives at the root ("/robotica"); English under "/en"
 * ("/en/robotica"). src/proxy.ts rewrites root URLs onto the [lang] segment.
 */
export const LANGS = ["pt", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v);

/** Pick the string for the current language. */
export const tr = (lang: Lang, pt: string, en: string) => (lang === "en" ? en : pt);

/** A site path ("/", "/robotica", "/#projetos") in the given language. */
export function localePath(lang: Lang, path: string) {
  if (lang === "pt") return path;
  if (path === "/") return "/en";
  if (path.startsWith("/#")) return `/en${path.slice(1)}`;
  return `/en${path}`;
}

/** The site path without its language prefix, whichever form the router reports. */
export function stripLang(pathname: string) {
  for (const l of LANGS) {
    if (pathname === `/${l}`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}

export const htmlLang = (lang: Lang) => (lang === "en" ? "en" : "pt-BR");

const MONTHS = {
  pt: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

/** Translate the month abbreviations in a Portuguese date string ("Abr 2024 – Set 2026"). */
export function localeDate(lang: Lang, s: string) {
  if (lang === "pt") return s;
  return MONTHS.pt.reduce((out, m, i) => out.replace(new RegExp(`\\b${m}\\b`, "g"), MONTHS.en[i]), s);
}

/**
 * Merge English overrides into Portuguese records by key. Only the fields given in
 * `en` change; slugs, images and links stay shared.
 */
export function localizeList<T, K extends keyof T>(lang: Lang, list: T[], key: K, en: Record<string, Partial<T>>): T[] {
  if (lang === "pt") return list;
  return list.map((item) => ({ ...item, ...en[String(item[key])] }));
}
