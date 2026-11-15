import { tr, type Lang } from "@/i18n";

/**
 * Stand-in for a screen that can't be published (private company or client work):
 * a filed document with its sensitive fields struck out. Nothing is hidden under
 * the bars — they are the drawing. Bars strike across and the stamp lands when revealed.
 */

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/** Small deterministic generator, so each sheet gets its own stable pattern of bars. */
function seeded(seed: string) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

const FIELDS: Record<Lang, string[]> = { pt: ["Cliente", "Ambiente", "Dados"], en: ["Client", "Environment", "Data"] };

export function Redacted({ fig, caption, org, lang = "pt", className }: { fig: string; caption: string; org?: string; lang?: Lang; className?: string }) {
  const rnd = seeded(fig + caption);
  let n = 0;
  const bar = (w: number) => (
    <span className="redact inline-block h-[1.05em] bg-ink align-middle" style={{ width: `${w}%`, transitionDelay: `${0.25 + n++ * 0.06}s` }} />
  );
  // "Paragraph" lines: two to four bars of uneven length, like struck-out sentences.
  const lines = Array.from({ length: 5 }, () => Array.from({ length: 2 + Math.floor(rnd() * 3) }, () => 10 + Math.floor(rnd() * 22)));

  return (
    <figure>
      <div className="crop">
        <div
          data-r=""
          className={cx("relative flex flex-col overflow-hidden border border-line bg-sheet p-5 font-mono text-[11px] leading-none text-ink-2 sm:p-7", className)}
        >
          <div className="flex justify-between gap-4 border-b border-line pb-3 text-[10px] tracking-[0.1em] text-faint uppercase">
            <span>
              Doc. <span className="text-accent">{fig}</span> · {tr(lang, "uso interno", "internal use")}
            </span>
            {org && <span>{org}</span>}
          </div>

          <dl className="mt-4 grid gap-2.5">
            <div className="grid grid-cols-[78px_1fr] items-center">
              <dt className="text-[10px] tracking-[0.08em] text-faint uppercase">{tr(lang, "Registro", "Record")}</dt>
              <dd className="text-[12px] text-ink">{caption}</dd>
            </div>
            {FIELDS[lang].map((f) => (
              <div key={f} className="grid grid-cols-[78px_1fr] items-center">
                <dt className="text-[10px] tracking-[0.08em] text-faint uppercase">{f}</dt>
                <dd>{bar(18 + Math.floor(rnd() * 20))}</dd>
              </div>
            ))}
          </dl>

          <div aria-hidden className="mt-5 grid gap-2.5 border-t border-line-soft pt-5">
            {lines.map((line, li) => (
              <div key={li} className="flex gap-[1.2%]">
                {line.map((w, wi) => (
                  <span key={wi} className="contents">
                    {bar(w)}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div
            aria-hidden
            className="stamp absolute top-[86px] right-[7%] border-2 border-accent px-3 py-1.5 text-[clamp(13px,2.2vw,19px)] font-medium tracking-[0.18em] text-accent uppercase"
          >
            {tr(lang, "Confidencial", "Confidential")}
          </div>
        </div>
      </div>
      <figcaption className="mt-2 font-mono text-[11px] text-muted">
        <span className="text-accent">FIG. {fig}</span> — {caption}. {tr(lang, "Tela não publicada: sistema privado.", "Screen not published: private system.")}
      </figcaption>
    </figure>
  );
}
