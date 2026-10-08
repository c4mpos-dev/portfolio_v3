"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

/** Runs before paint (inlined in <head>) so the saved theme never flashes. */
export const themeInitScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`;

const listeners = new Set<() => void>();
const getTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

function applyTheme(t: Theme) {
  document.documentElement.dataset.theme = t;
  try {
    localStorage.setItem("theme", t);
  } catch {}
  listeners.forEach((l) => l());
}

/**
 * Switch themes like a blueprint copier: the new sheet is revealed by a scan
 * moving down the screen (View Transitions). Instant where unsupported or with reduced motion.
 */
function setTheme(t: Theme) {
  if (t === getTheme()) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !document.startViewTransition) return applyTheme(t);
  document.documentElement.dataset.scan = t === "dark" ? "down" : "up";
  const vt = document.startViewTransition(() => applyTheme(t));
  vt.finished.finally(() => delete document.documentElement.dataset.scan);
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    getTheme,
    () => "light" as Theme,
  );

  const opt = (t: Theme, label: string) => (
    <button
      type="button"
      onClick={() => setTheme(t)}
      aria-pressed={theme === t}
      className={`cursor-pointer px-1 transition-colors ${theme === t ? "text-ink underline decoration-accent decoration-2 underline-offset-4" : "text-faint hover:text-ink"}`}
    >
      {label}
    </button>
  );

  return (
    <div role="group" aria-label="Tema" className={`flex items-center border border-line px-1.5 py-1 font-mono text-[10.5px] uppercase ${className}`}>
      {opt("light", "Papel")}
      <span className="text-faint">/</span>
      {opt("dark", "Blueprint")}
    </div>
  );
}
