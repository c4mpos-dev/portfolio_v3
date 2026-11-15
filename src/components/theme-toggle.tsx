"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { localePath, stripLang, tr } from "@/i18n";
import { LANG_SWITCH_KEY, useLang } from "@/i18n/lang-context";

/** Paper (light), Blueprint (navy) and Graphite (charcoal), in this order. */
const THEMES = ["light", "dark", "graphite"] as const;
type Theme = (typeof THEMES)[number];

const isTheme = (v: unknown): v is Theme => THEMES.includes(v as Theme);

/** Runs before paint (inlined in <head>) so the saved theme never flashes. */
export const themeInitScript = `try{var t=localStorage.getItem("theme");if(${JSON.stringify(THEMES)}.indexOf(t)>-1)document.documentElement.dataset.theme=t}catch(e){}`;

const listeners = new Set<() => void>();
const getTheme = (): Theme => {
  const t = document.documentElement.dataset.theme;
  return isTheme(t) ? t : "light";
};

function applyTheme(t: Theme) {
  document.documentElement.dataset.theme = t;
  try {
    localStorage.setItem("theme", t);
  } catch {}
  listeners.forEach((l) => l());
}

/**
 * Switch themes like a blueprint copier: the new sheet is revealed by a scan (View
 * Transitions), down when moving right in the list, up when moving left.
 * Instant where unsupported or with reduced motion.
 */
function setTheme(t: Theme) {
  const from = getTheme();
  if (t === from) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !document.startViewTransition) return applyTheme(t);
  document.documentElement.dataset.scan = THEMES.indexOf(t) > THEMES.indexOf(from) ? "down" : "up";
  const vt = document.startViewTransition(() => applyTheme(t));
  vt.finished.finally(() => delete document.documentElement.dataset.scan);
}

// Swatch for each theme: sheet colour with its ink line.
const SWATCH: Record<Theme, { bg: string; line: string }> = {
  light: { bg: "#f3f2ec", line: "#1b1e23" },
  dark: { bg: "#0d2140", line: "#e8eef8" },
  graphite: { bg: "#18191b", line: "#e9e7e1" },
};

export function ThemeToggle({ className = "" }: { className?: string }) {
  const lang = useLang();
  const theme = useSyncExternalStore(
    (l) => {
      listeners.add(l);
      // LangProvider restores the theme after a language switch and announces it.
      window.addEventListener("themerestore", l);
      return () => {
        listeners.delete(l);
        window.removeEventListener("themerestore", l);
      };
    },
    getTheme,
    () => "light" as Theme,
  );

  const names: Record<Theme, string> = { light: tr(lang, "Papel", "Paper"), dark: "Blueprint", graphite: tr(lang, "Grafite", "Graphite") };

  return (
    <div role="group" aria-label={tr(lang, "Tema", "Theme")} className={`flex items-center gap-1 border border-line px-1.5 py-1 font-mono text-[10.5px] uppercase ${className}`}>
      {THEMES.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setTheme(t)}
          aria-pressed={theme === t}
          title={names[t]}
          className={`flex cursor-pointer items-center gap-1.5 px-1 py-0.5 transition-colors ${theme === t ? "text-ink" : "text-faint hover:text-ink"}`}
        >
          <span
            aria-hidden
            className={`size-3 border ${theme === t ? "border-accent outline outline-1 outline-offset-1 outline-accent" : "border-line"}`}
            style={{ background: `linear-gradient(135deg, ${SWATCH[t].bg} 58%, ${SWATCH[t].line} 58% 64%, ${SWATCH[t].bg} 64%)` }}
          />
          {/* Only the active theme is named, to keep the bar short */}
          <span className={theme === t ? "" : "sr-only"}>{names[t]}</span>
        </button>
      ))}
    </div>
  );
}

/** PT / EN switch: the same page in the other language. */
export function LangToggle({ className = "" }: { className?: string }) {
  const lang = useLang();
  const path = stripLang(usePathname());
  return (
    <div role="group" aria-label={tr(lang, "Idioma", "Language")} className={`flex items-center border border-line px-1.5 py-1 font-mono text-[10.5px] uppercase ${className}`}>
      {(["pt", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="text-faint">/</span>}
          <Link
            href={localePath(l, path)}
            hrefLang={l === "en" ? "en" : "pt-BR"}
            scroll={false}
            onClick={() => {
              if (l === lang) return;
              // Remember the reading position; LangProvider restores it on the other side.
              try {
                const h = document.documentElement.scrollHeight - window.innerHeight;
                sessionStorage.setItem(LANG_SWITCH_KEY, JSON.stringify({ y: window.scrollY, h }));
              } catch {}
            }}
            aria-current={lang === l ? "true" : undefined}
            className={`px-1 transition-colors ${lang === l ? "text-ink underline decoration-accent decoration-2 underline-offset-4" : "text-faint hover:text-ink"}`}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}
