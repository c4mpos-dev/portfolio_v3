import { cacheLife } from "next/cache";
import { social } from "@/content/site";
import { tr, type Lang } from "@/i18n";
import { SignalChart } from "./signal-chart";

type Day = { date: string; count: number };

async function getContributions(user: string): Promise<{ total: number; days: Day[] } | null> {
  "use cache";
  cacheLife("days");
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`);
    if (!res.ok) return null;
    const data: { total: { lastYear: number }; contributions: Day[] } = await res.json();
    return { total: data.total.lastYear, days: data.contributions };
  } catch {
    return null;
  }
}

const fmtDate = (iso: string, lang: Lang = "pt") => {
  const [, m, d] = iso.split("-");
  return lang === "en" ? `${m}/${d}` : `${d}/${m}`;
};

/**
 * GitHub activity read like a telemetry trace: one bar per week over the
 * last year (read with a needle, see SignalChart), plus readouts. Cached for a day.
 */
export async function Telemetry({ lang = "pt" }: { lang?: Lang }) {
  const num = (n: number) => n.toLocaleString(lang === "en" ? "en-US" : "pt-BR");
  const data = await getContributions(social.githubUser);

  if (!data) {
    return (
      <div className="border border-line bg-sheet p-6 font-mono text-[13px] text-muted">
        <span className="text-accent">● {tr(lang, "SEM SINAL", "NO SIGNAL")}</span> — {tr(lang, "não consegui ler o GitHub agora.", "couldn't read GitHub right now.")}{" "}
        <a href={social.github} target="_blank" rel="noreferrer" className="link-u">
          {tr(lang, "ver direto", "see it there")} ↗
        </a>
      </div>
    );
  }

  const weeks: { start: string; count: number }[] = [];
  data.days.forEach((d, i) => {
    if (i % 7 === 0) weeks.push({ start: d.date, count: 0 });
    weeks[weeks.length - 1].count += d.count;
  });
  const peak = Math.max(1, ...weeks.map((w) => w.count));
  const avg = Math.round(data.total / weeks.length);
  const lastActive = [...data.days].reverse().find((d) => d.count > 0);

  const readouts = [
    { k: tr(lang, "Total / 12 meses", "Total / 12 months"), v: num(data.total) },
    { k: tr(lang, "Pico semanal", "Weekly peak"), v: num(peak) },
    { k: tr(lang, "Média semanal", "Weekly average"), v: num(avg) },
    { k: tr(lang, "Último sinal", "Last signal"), v: lastActive ? fmtDate(lastActive.date, lang) : "—" },
  ];

  return (
    <div className="crop border border-line bg-sheet">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2.5 font-mono text-[11px] tracking-[0.06em] text-muted uppercase">
        <span>
          <span className="animate-blink text-accent">●</span> {tr(lang, "Canal", "Channel")}: github.com/{social.githubUser}
        </span>
        <span>{tr(lang, "commits / semana · atualizado 1×/dia", "commits / week · updated daily")}</span>
      </div>

      <div className="relative px-4 pt-6 pb-3">
        {/* Scope gridlines */}
        <div aria-hidden className="pointer-events-none absolute inset-x-4 top-[52px] bottom-[34px] flex flex-col justify-between">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="border-t border-dashed border-line-soft" />
          ))}
        </div>
        <SignalChart
          weeks={weeks.map((w) => ({ start: fmtDate(w.start, lang), count: w.count }))}
          peak={peak}
          summary={tr(lang, `${data.total} contribuições no último ano; pico de ${peak} em uma semana.`, `${data.total} contributions in the last year; peak of ${peak} in one week.`)}
        />
        <div className="mt-2 flex justify-between font-mono text-[10px] text-faint">
          <span>{fmtDate(weeks[0].start, lang)}</span>
          <span>{tr(lang, "hoje", "today")}</span>
        </div>
      </div>

      <dl className="grid grid-cols-2 border-t border-line sm:grid-cols-4">
        {readouts.map((r, i) => (
          <div key={r.k} className={`px-4 py-3 ${i ? "sm:border-l" : ""} ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""} border-line`}>
            <dt className="label text-[9.5px]">{r.k}</dt>
            <dd className="display mt-1 text-[22px]">{r.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
