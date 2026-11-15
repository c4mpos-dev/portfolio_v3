import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { social } from "@/content/site";
import { localePath, tr, type Lang } from "@/i18n";
import { PixelRobot } from "./pixel-robot";
import { FxReady } from "./scroll-fx";
import { LogoMark } from "./logo";

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/** Wrapper revealed on scroll (fade + rise). */
export function Reveal({ className, ...props }: ComponentProps<"div">) {
  return <div data-r="" className={cx("reveal", className)} {...props} />;
}

/**
 * Dimension line: ├──── label ────┤, drawn left → right when revealed.
 * With `start`/`end` it labels both extremities instead of the middle.
 */
export function Dimension({ label, start, end, className }: { label?: ReactNode; start?: ReactNode; end?: ReactNode; className?: string }) {
  return (
    <div data-r="" className={cx("font-mono text-[10.5px] tracking-[0.08em] text-muted uppercase", className)}>
      <div className="relative flex h-3 items-center">
        <span className="h-full w-px bg-ink" />
        <span className="dim h-px flex-1 bg-ink" />
        <span className="h-full w-px bg-ink" />
        {label && <span className="absolute left-1/2 -translate-x-1/2 bg-paper px-2">{label}</span>}
      </div>
      {(start || end) && (
        <div className="mt-1.5 flex justify-between gap-4">
          <span>{start}</span>
          <span className="text-right">{end}</span>
        </div>
      )}
    </div>
  );
}

/** A "folha": numbered sheet header + display title + dimension line. */
export function Section({
  id,
  index,
  label,
  title,
  lead,
  dimension,
  lang = "pt",
  children,
}: {
  id: string;
  index: number;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  dimension?: ReactNode;
  lang?: Lang;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-label={label} data-section="" className="pt-[clamp(88px,14vh,160px)]">
      <Reveal>
        <div className="label">
          <span className="text-accent">{tr(lang, "Folha", "Sheet")} {String(index).padStart(2, "0")}</span>
        </div>
        <h2 className="display mt-4 max-w-[20ch] text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.02]">{title}</h2>
      </Reveal>
      {dimension && <Dimension label={dimension} className="mt-6" />}
      {lead && (
        <div>
          <p className="mt-6 max-w-[62ch] text-[16px] leading-relaxed text-ink-2">{lead}</p>
        </div>
      )}
      <div className="mt-[clamp(32px,5vh,48px)]">{children}</div>
    </section>
  );
}

/** Square outlined mono tags. */
export function Chips({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cx("flex flex-wrap gap-1.5", className)}>
      {items.map((t) => (
        <li key={t} className="border border-line px-2 py-0.5 font-mono text-[11.5px] text-ink-2">
          {t}
        </li>
      ))}
    </ul>
  );
}

/**
 * A numbered figure, plotted in from the left. Without `src` it shows a
 * hatched placeholder (photos haven't been added yet).
 */
export function Figure({
  src,
  alt = "",
  caption,
  fig,
  fit = "cover",
  overlay,
  lang = "pt",
  className,
}: {
  src?: string;
  alt?: string;
  caption: string;
  fig: string;
  /** "contain" shows the whole image (screenshots) on the sheet, without the drift. */
  fit?: "cover" | "contain";
  /** Rendered over the frame, e.g. a button that opens the image in a viewer. */
  overlay?: ReactNode;
  lang?: Lang;
  className?: string;
}) {
  return (
    <figure>
      {/* The corner marks sit outside the frame, so they can't share the element that clips the photo */}
      <div className="crop">
        <div data-r="" data-scrub="" className={cx("plot relative overflow-hidden border border-line bg-sheet", className)}>
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 900px, 100vw"
              className={fit === "contain" ? "object-contain p-3" : "drift object-cover"}
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-[repeating-linear-gradient(45deg,var(--line-soft)_0_1px,transparent_1px_8px)]">
              <span className="border border-line bg-sheet px-2 py-1 font-mono text-[10.5px] tracking-[0.08em] text-faint uppercase">
                {tr(lang, "foto pendente", "photo pending")}
              </span>
            </div>
          )}
          {overlay}
        </div>
      </div>
      <figcaption className="mt-2 font-mono text-[11px] text-muted">
        <span className="text-accent">FIG. {fig}</span> · {caption}
      </figcaption>
    </figure>
  );
}

export function Footer({ lang = "pt" }: { lang?: Lang }) {
  return (
    <footer className="relative mt-[clamp(96px,16vh,180px)] mb-8 grid border border-line font-mono text-[10.5px] tracking-[0.06em] text-muted uppercase sm:grid-cols-[auto_1fr_auto]">
      <FxReady />
      {/* The robot stands on the footer when the corner title block isn't shown */}
      <PixelRobot size={36} className="absolute right-4 bottom-full animate-bob min-[1440px]:hidden" />
      <div className="flex items-center gap-2 border-b border-line px-3 py-2.5 text-ink sm:border-r sm:border-b-0">
        <LogoMark className="size-4" /> Cauã Campos
      </div>
      <div className="border-b border-line px-3 py-2.5 sm:border-r sm:border-b-0">© 2026 · {tr(lang, "feito à mão em Next.js", "hand-built in Next.js")} · rev. {process.env.NEXT_PUBLIC_REV}</div>
      <div className="flex gap-4 px-3 py-2.5">
        <Link href={localePath(lang, "/")} className="hover:text-accent">
          {tr(lang, "Início", "Home")}
        </Link>
        <Link href={localePath(lang, "/robotica")} className="hover:text-accent">
          {tr(lang, "Robótica", "Robotics")}
        </Link>
        <Link href={localePath(lang, "/competicoes")} className="hover:text-accent">
          {tr(lang, "Competições", "Competitions")}
        </Link>
        <a href={social.github} target="_blank" rel="noreferrer" className="hover:text-accent">
          GitHub ↗
        </a>
      </div>
    </footer>
  );
}
