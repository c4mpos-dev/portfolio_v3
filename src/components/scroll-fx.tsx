"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Client components that mount new [data-r] nodes call this so they get revealed too. */
export const requestRevealScan = () => window.dispatchEvent(new Event("fx:scan"));

// Pathname whose page has finished hydrating (set by <FxReady/>).
let readyFor: string | null = null;

/**
 * Rendered inside every page (in the footer). Its effect runs only after the page
 * segment has hydrated, so ScrollFx never touches page elements before React owns
 * them — otherwise the attributes it adds show up as hydration mismatches.
 */
export function FxReady() {
  const pathname = usePathname();
  useEffect(() => {
    readyFor = pathname;
    requestRevealScan();
  }, [pathname]);
  return null;
}

/*
 * Page-wide motion driven by data attributes, so pages can stay server components:
 *   [data-r]    gets [data-in] once it scrolls into view (staggered among siblings)
 *   [data-bar]  scroll progress bar
 *   [data-tl]   timeline whose [data-fill] grows with scroll
 *   [data-scrub] gets --p (0 → 1) as it travels through the viewport: 0 when its top
 *               enters at the bottom, 1 when its bottom leaves at the top. CSS does the rest.
 *               With data-scrub="pin" (a tall track around a sticky first child), --p runs
 *               from the moment the child pins until it lets go.
 *   [data-ruler] gets --prog (page progress, 0 → 1); its [data-ruler-out] shows the percentage
 *
 * New nodes are found by an explicit scan (on "fx:scan": page ready, or a client
 * component mounting new nodes), not a MutationObserver: observing the whole body
 * fed back into dev tooling and DOM-touching browser extensions and froze the page in dev.
 */
export function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    let ready = readyFor === pathname;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          const el = e.target as HTMLElement;
          const i = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
          setTimeout(() => el.setAttribute("data-in", ""), Math.max(0, Math.min(i, 6)) * 70);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    let scrubs: HTMLElement[] = [];
    const scan = () => {
      document.querySelectorAll("[data-r]:not([data-in])").forEach((el) => io.observe(el));
      scrubs = Array.from(document.querySelectorAll<HTMLElement>("[data-scrub]"));
    };

    const frame = () => {
      const vh = window.innerHeight;
      // The bar and ruler live in the layout, which has hydrated by the time this runs.
      const max = document.documentElement.scrollHeight - vh;
      const prog = clamp(window.scrollY / Math.max(1, max));
      const bar = document.querySelector<HTMLElement>("[data-bar]");
      if (bar) bar.style.transform = `scaleX(${prog})`;
      const ruler = document.querySelector<HTMLElement>("[data-ruler]");
      if (ruler) {
        ruler.style.setProperty("--prog", prog.toFixed(4));
        const out = ruler.querySelector("[data-ruler-out]");
        if (out) out.textContent = String(Math.round(prog * 100)).padStart(3, "0");
      }
      if (!ready) return;
      for (const el of scrubs) {
        const r = el.getBoundingClientRect();
        // Skip elements far off screen; they keep their last (clamped) value.
        if (r.bottom < -vh || r.top > vh * 2) continue;
        let p: string;
        if (el.dataset.scrub === "pin") {
          // A tall track whose first child is sticky: progress runs while the child stays pinned.
          const stage = el.firstElementChild as HTMLElement | null;
          if (!stage) continue;
          const top = parseFloat(getComputedStyle(stage).top) || 0;
          p = clamp((top - r.top) / Math.max(1, r.height - stage.offsetHeight)).toFixed(3);
        } else {
          p = clamp((vh - r.top) / (vh + r.height)).toFixed(3);
        }
        if (el.dataset.p !== p) {
          el.dataset.p = p;
          el.style.setProperty("--p", p);
        }
      }
      const tl = document.querySelector<HTMLElement>("[data-tl]");
      const fill = tl?.querySelector<HTMLElement>("[data-fill]");
      if (tl && fill) {
        const r = tl.getBoundingClientRect();
        fill.style.height = `${clamp((vh * 0.55 - r.top) / Math.max(1, r.height)) * 100}%`;
      }
    };

    let raf = 0;
    const onScroll = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          frame();
        });
    };
    const onScan = () => {
      ready = readyFor === pathname;
      if (!ready) return;
      requestAnimationFrame(() => {
        scan();
        frame();
      });
    };

    if (ready) onScan();
    else frame();
    window.addEventListener("resize", frame);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("fx:scan", onScan);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("fx:scan", onScan);
    };
  }, [pathname]);

  return null;
}
