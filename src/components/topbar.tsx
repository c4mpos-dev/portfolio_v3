"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navFor } from "@/content/site";
import { RobotMark } from "./robot-mark";
import { ThemeToggle } from "./theme-toggle";
import { useActiveSection } from "./use-active-section";

export function Topbar() {
  const pathname = usePathname();
  const nav = navFor(pathname);
  const active = useActiveSection(pathname);
  // Remember which page the menu was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);

  const items = nav.sections.map((s, i) => ({ ...s, n: String(i + 1).padStart(2, "0"), on: active?.id === s.id }));

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1160px] items-center justify-between gap-6 px-[clamp(16px,4vw,40px)]">
          <Link href="/" className="flex items-center gap-2.5" onClick={close}>
            <RobotMark className="size-[22px]" />
            <span className="display text-[13px] tracking-[0.02em] whitespace-nowrap uppercase">Cauã Campos</span>
            <span className="hidden font-mono text-[11px] whitespace-nowrap text-faint 2xl:inline">/ full stack</span>
          </Link>

          <nav aria-label="Seções" className="hidden items-center gap-4 xl:flex">
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
            <Link href={nav.other.href} className="border border-line px-2 py-1 font-mono text-[11px] whitespace-nowrap uppercase transition-colors hover:border-accent hover:text-accent">
              {nav.other.label} →
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle className="hidden whitespace-nowrap sm:flex" />
            <button
              type="button"
              onClick={() => setOpenOn(open ? null : pathname)}
              aria-expanded={open}
              className="cursor-pointer border border-line px-3 py-1.5 font-mono text-[11px] uppercase xl:hidden"
            >
              {open ? "Fechar" : "Índice"}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-x-0 top-14 bottom-0 z-40 overflow-y-auto border-t border-line bg-paper px-[clamp(16px,4vw,40px)] py-8 xl:hidden">
          <div className="label mb-4">Índice de folhas</div>
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
          <div className="mt-8 flex items-center justify-between">
            <Link href={nav.other.href} onClick={close} className="link-u">
              {nav.other.label} →
            </Link>
            <ThemeToggle className="sm:hidden" />
          </div>
        </div>
      )}
    </>
  );
}
