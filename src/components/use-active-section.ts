"use client";

import { useEffect, useState } from "react";

type Active = { path: string; id: string; quip?: string } | null;

/**
 * The [data-section] currently crossing the middle band of the viewport,
 * with its data-quip. Null before the first section.
 */
export function useActiveSection(pathname: string) {
  const [active, setActive] = useState<Active>(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) setActive({ path: pathname, id: el.id, quip: el.dataset.quip });
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const onScroll = () => {
      if (sections[0].getBoundingClientRect().top > window.innerHeight * 0.5) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  // Ignore state left over from the previous page.
  return active?.path === pathname ? active : null;
}
