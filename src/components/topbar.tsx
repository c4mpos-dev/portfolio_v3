"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navFor } from "@/content/site";
import { localePath, stripLang, tr } from "@/i18n";
import { useLang } from "@/i18n/lang-context";
import { LogoLockup } from "./logo";
import { LangToggle, ThemeToggle } from "./theme-toggle";
import { useActiveSection } from "./use-active-section";

export function Topbar() {
  const lang = useLang();
  const pathname = usePathname();
  const path = stripLang(pathname);
  const nav = navFor(path, lang);
  const active = useActiveSection(pathname);
  // Remember which page the menu was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);

  // While the index covers the screen: Esc closes it and the page behind doesn't scroll.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const items = nav.sections.map((s, i) => ({ ...s, n: String(i + 1).padStart(2, "0"), on: active?.id === s.id }));
  const other = localePath(lang, nav.other.href);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-5 px-[clamp(16px,4vw,40px)]">
          <Link href={localePath(lang, "/")} aria-label={tr(lang, "Cauã Campos — início", "Cauã Campos — home")} onClick={close}>
            <LogoLockup />
          </Link>

          <nav aria-label={tr(lang, "Seções", "Sections")} className="hidden items-center gap-4 xl:flex">
            {items.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={s.on ? "location" : undefined}
                className={`relative py-4 font-mono text-[11px] tracking-[0.04em] whitespace-nowrap uppercase transition-colors ${s.on ? "text-ink" : "text-muted hover:text-ink"}`}
              >
                <span className={s.on ? "text-accent" : "text-faint"}>{s.n}</span> {s.label}
                <span className={`absolute inset-x-0 -bottom-px h-[2px] bg-accent transition-transform duration-300 ${s.on ? "scale-x-100" : "scale-x-0"}`} />
              </a>
            ))}
            <Link href={other} className="border border-line px-2 py-1 font-mono text-[11px] whitespace-nowrap uppercase transition-colors hover:border-accent hover:text-accent">
              {nav.other.label} →
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden whitespace-nowrap sm:flex" />
            <LangToggle className="hidden sm:flex" />
            <button
              type="button"
              onClick={() => setOpenOn(open ? null : pathname)}
              aria-expanded={open}
              className="cursor-pointer border border-line px-3 py-1.5 font-mono text-[11px] uppercase xl:hidden"
            >
              {open ? tr(lang, "Fechar", "Close") : tr(lang, "Índice", "Index")}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-x-0 top-14 bottom-0 z-40 overflow-y-auto border-t border-line bg-paper px-[clamp(16px,4vw,40px)] py-8 xl:hidden">
          <div className="label mb-4">{tr(lang, "Índice de folhas", "Sheet index")}</div>
          <ol className="border-t border-line">
            {items.map((s) => (
              <li key={s.id} className="border-b border-line">
                <a href={`#${s.id}`} onClick={close} className="flex items-baseline gap-4 py-4">
                  <span className="font-mono text-[12px] text-accent">{s.n}</span>
                  <span className="display text-[22px]">{s.label}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <Link href={other} onClick={close} className="link-u">
              {nav.other.label} →
            </Link>
            <div className="flex items-center gap-2 sm:hidden">
              <ThemeToggle />
              <LangToggle />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
