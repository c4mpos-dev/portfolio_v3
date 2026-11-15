import type { Metadata } from "next";
import Link from "next/link";
import { Dimension, Figure, Footer, Reveal, Section } from "@/components/ui";
import { teamRecords, teams, teamsFor } from "@/content/robotica";
import { isLang, localePath, tr, type Lang } from "@/i18n";
import { pageMetadata } from "@/i18n/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps<"/[lang]/robotica/equipes">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata(lang, "/robotica/equipes", {
    title: tr(lang, "Equipes de robótica", "Robotics teams"),
    description: tr(
      lang,
      "As três equipes de robótica competitiva de Cauã Campos: Pequeno Gigante, Smart Lego e Nine Tails #9219, com períodos, prêmios e todos os registros.",
      "Cauã Campos's three competitive robotics teams: Pequeno Gigante, Smart Lego and Nine Tails #9219, with periods, awards and every record.",
    ),
  });
}

// Oldest first, teams and their records alike: the page reads as three phases.
const phasesFor = (lang: Lang) => [...teamsFor(lang)].reverse().map((t) => ({ ...t, records: teamRecords(t, lang).reverse() }));
const FIRST = Math.min(...teams.map((t) => t.from));
const LAST = Math.max(...teams.map((t) => t.to));
const YEARS = Array.from({ length: LAST - FIRST + 1 }, (_, i) => FIRST + i);

const pad = (n: number) => String(n).padStart(2, "0");

/** Team periods on one scale, like a schedule chart; bars draw in when revealed. */
function TeamChart({ lang }: { lang: Lang }) {
  const phases = phasesFor(lang);
  const cols = { gridTemplateColumns: `repeat(${YEARS.length}, minmax(0, 1fr))` };
  return (
    <figure>
      <div data-r="" className="crop border border-line bg-sheet font-mono">
        <div className="grid border-b border-line text-[10px] tracking-[0.08em] text-faint desk:grid-cols-[190px_1fr]">
          <div className="hidden border-r border-line px-4 py-2 uppercase desk:block">{tr(lang, "Equipe", "Team")}</div>
          <div className="grid" style={cols}>
            {YEARS.map((y) => (
              <div key={y} className="border-l border-line-soft px-2 py-2 first:border-l-0">
                {y}
              </div>
            ))}
          </div>
        </div>
        {phases.map((t, i) => (
          <a
            key={t.slug}
            href={`#${t.slug}`}
            className="group grid border-b border-line-soft transition-colors last:border-b-0 hover:bg-paper desk:grid-cols-[190px_1fr]"
          >
            <div className="flex items-baseline gap-2 self-center px-4 pt-3 text-[12px] text-ink desk:self-stretch desk:border-r desk:border-line desk:py-4">
              <span className="text-[10.5px] text-accent">{pad(i + 1)}</span>
              <span className="font-sans text-[14px] font-semibold group-hover:text-accent">{t.name}</span>
            </div>
            <div className="relative grid items-center py-3 desk:py-4" style={cols}>
              {/* Year gridlines behind the bar */}
              <div aria-hidden className="pointer-events-none absolute inset-0 grid" style={cols}>
                {YEARS.map((y) => (
                  <span key={y} className="border-l border-line-soft first:border-l-0" />
                ))}
              </div>
              <div
                className="gantt-bar relative mx-1 flex h-7 items-center justify-between gap-2 border border-ink bg-paper px-2 text-[10.5px] whitespace-nowrap text-ink-2 group-hover:border-accent"
                style={{ gridColumn: `${t.from - FIRST + 1} / ${t.to - FIRST + 2}`, transitionDelay: `${0.2 + i * 0.18}s` }}
              >
                <span className="hidden sm:inline">{t.period}</span>
                <span className="text-accent">
                  {pad(t.records.length)} {tr(lang, "reg.", "rec.")}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
      <figcaption className="mt-2 font-mono text-[11px] text-muted">
        <span className="text-accent">FIG. 01</span> ·{" "}
        {tr(
          lang,
          "As três equipes na mesma escala de tempo. Em 2021 e entre 2022 e 2023 competi por duas ao mesmo tempo.",
          "The three teams on one timeline. In 2021 and from 2022 to 2023 I competed for two at once.",
        )}
      </figcaption>
    </figure>
  );
}

export default async function EquipesPage({ params }: PageProps<"/[lang]/robotica/equipes">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const phases = phasesFor(lang);
  const total = phases.reduce((s, t) => s + t.records.length, 0);

  return (
    <main>
      <header className="pt-[clamp(56px,12vh,130px)]">
        <Reveal>
          <Link href={localePath(lang, "/robotica")} className="link-u text-[12px]">
            ← {tr(lang, "robótica", "robotics")}
          </Link>
          <div className="label mt-8">
            <span className="text-accent">{tr(lang, "Folha", "Sheet")} 00</span> / {tr(lang, "Robótica · Equipes", "Robotics · Teams")}
          </div>
          <h1 className="display mt-5 max-w-[14ch] text-[clamp(2.4rem,6.6vw,5rem)] leading-[0.96]">
            {tr(lang, "Três times, três fases.", "Three teams, three stages.")}
          </h1>
        </Reveal>
        <Dimension className="mt-8" start={`${FIRST} · Piraí, RJ`} end={`${LAST} · Resende, RJ`} label={`${YEARS.length} ${tr(lang, "anos", "years")}`} />

        <div className="mt-10">
          <p className="max-w-[60ch] text-[18px] leading-relaxed text-ink-2">
            {tr(
              lang,
              `Da primeira equipe, na prefeitura de Piraí, até a FRC, a liga de robôs de grande porte. Desses três times saíram ${total} das competições da linha do tempo.`,
              `From my first team, run by the Piraí city council, to FRC, the league for large robots. These three teams account for ${total} of the competitions in the timeline.`,
            )}
          </p>
        </div>

        <div className="mt-12">
          <TeamChart lang={lang} />
        </div>
      </header>

      {phases.map((t, i) => {
        const families = [...new Set(t.records.map((r) => r.category))];
        const spec = [
          [tr(lang, "Período", "Period"), t.period],
          [tr(lang, "Base", "Based in"), t.place],
          [tr(lang, "Registros", "Records"), pad(t.records.length)],
          [tr(lang, "Competições", "Competitions"), families.join(" · ")],
        ];
        return (
          <Section key={t.slug} id={t.slug} index={i + 1} label={`${tr(lang, "Fase", "Stage")} ${pad(i + 1)}`} title={t.name} dimension={`${t.period} · ${t.place}`} lang={lang}>
            <div className="grid items-start gap-10 desk:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              {/* The team sheet stays in view while its records scroll past */}
              <div className="grid gap-6 desk:sticky desk:top-24">
                <Figure src={t.image} alt={t.name} fig={pad(i + 2)} caption={t.name} lang={lang} className="aspect-[4/3]" />
                <div>
                  <p className="text-[16px] leading-relaxed text-ink-2">{t.desc}</p>
                  <dl className="mt-5 border border-line bg-sheet font-mono text-[11.5px]">
                    {spec.map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[104px_1fr] border-b border-line-soft last:border-b-0">
                        <dt className="px-3 py-2 text-[10px] tracking-[0.08em] text-faint uppercase">{k}</dt>
                        <dd className="px-3 py-2 text-ink">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div>
                <div>
                  <div className="label text-[10px]">{tr(lang, "Prêmios em destaque", "Featured awards")}</div>
                  <ul className="mt-2 border-t-2 border-ink">
                    {t.awards.map((a) => (
                      <li key={a} className="flex gap-3 border-b border-line py-3 text-[15px] text-ink-2">
                        <span className="font-mono text-accent">+</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="label mt-10 text-[10px]">
                  {tr(lang, "Registros da equipe", "Team records")} · {pad(t.records.length)}
                </div>
                <ol className="mt-2 border-t border-line">
                  {t.records.map((r) => (
                    <li key={r.id} className="grid grid-cols-[84px_1fr] gap-x-4 border-b border-line-soft py-3.5">
                      <span className="pt-0.5 font-mono text-[11.5px] text-ink-2">{r.date}</span>
                      <span>
                        <span className="block text-[15px] leading-tight font-semibold">
                          {r.title} <span className="ml-1 font-mono text-[10.5px] font-normal tracking-[0.08em] text-accent uppercase">{r.category}</span>
                        </span>
                        {r.description && <span className="mt-1 block text-[13.5px] leading-relaxed text-muted">{r.description}</span>}
                        <span className="mt-1 block font-mono text-[11px] text-faint">{r.place}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Section>
        );
      })}

      <div className="mt-[clamp(72px,12vh,120px)]">
        <Link href={localePath(lang, "/robotica#linha-do-tempo")} className="group flex items-center justify-between gap-4 border border-line bg-sheet px-5 py-4 transition-colors hover:bg-paper">
          <span>
            <span className="label block text-[10px]">{tr(lang, "Continua em", "Continues in")}</span>
            <span className="mt-1 block text-[16px] font-semibold group-hover:text-accent">
              {tr(lang, "Linha do tempo completa, com fotos", "The full timeline, with photos")}
            </span>
          </span>
          <span aria-hidden className="font-mono text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent">
            →
          </span>
        </Link>
      </div>

      <Footer lang={lang} />
    </main>
  );
}
