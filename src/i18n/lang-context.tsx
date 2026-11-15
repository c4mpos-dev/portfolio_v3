"use client";

import { createContext, useContext, useLayoutEffect, type ReactNode } from "react";
import type { Lang } from "./index";

const LangContext = createContext<Lang>("pt");

/** Where the page was when the language switch was clicked (see LangToggle). */
export const LANG_SWITCH_KEY = "lang-switch";

/**
 * Set once in the root layout from the [lang] segment. Switching language swaps the
 * root layout, so React builds a fresh <html>: before the first paint, put back the
 * saved theme (the inline head script doesn't run again) and the reading position.
 */
export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  useLayoutEffect(() => {
    try {
      const theme = localStorage.getItem("theme");
      if (theme && document.documentElement.dataset.theme !== theme) {
        document.documentElement.dataset.theme = theme;
        window.dispatchEvent(new Event("themerestore"));
      }

      const saved = sessionStorage.getItem(LANG_SWITCH_KEY);
      if (saved) {
        sessionStorage.removeItem(LANG_SWITCH_KEY);
        const { y, h } = JSON.parse(saved) as { y: number; h: number };
        // Same spot, scaled by page height (the two languages differ a little in length).
        const max = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: h > 0 ? (y / h) * max : y, behavior: "instant" });
      }
    } catch {}
  }, [lang]);

  return <LangContext value={lang}>{children}</LangContext>;
}

export const useLang = () => useContext(LangContext);
