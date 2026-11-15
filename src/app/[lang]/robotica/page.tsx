import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/logo";
import { Dimension, Figure, Footer, Reveal, Section } from "@/components/ui";
import { highlightsFor, roboticsRoleFor, teamsFor } from "@/content/robotica";
import { isLang, localePath, tr } from "@/i18n";
import { pageMetadata } from "@/i18n/seo";
import { notFound } from "next/navigation";
import { AchievementLog } from "./achievement-log";
import { RouteChart } from "./route-chart";
import { StatCounters } from "./stat-counters";

export async function generateMetadata({ params }: PageProps<"/[lang]/robotica">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata(lang, "/robotica", {
    title: tr(lang, "Robótica", "Robotics"),
    description: tr(
      lang,
      "Três equipes, dois mundiais em 2023 (FRC em Houston e FIRA na Alemanha) e 33 conquistas em oito anos de robótica competitiva, hackathons e olimpíadas.",
      "Three teams, two world events in 2023 (FRC in Houston and FIRA in Germany) and 33 achievements over eight years of competitive robotics, hackathons and olympiads.",
    ),
  });
}

export default async function RoboticaPage({ params }: PageProps<"/[lang]/robotica">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const highlights = highlightsFor(lang);
  const teams = teamsFor(lang);
  return (
    <main>
      <header className="pt-[clamp(56px,12vh,130px)]">
        <Reveal>
          <div className="label">
            <span className="text-accent">{tr(lang, "Folha", "Sheet")} 00</span> / {tr(lang, "Robótica", "Robotics")} · 2017 → 2024
          </div>
          <h1 className="display mt-5 max-w-[14ch] text-[clamp(2.4rem,6.6vw,5rem)] leading-[0.96]">
            {tr(lang, "Três equipes, dois mundiais, 33 conquistas.", "Three teams, two world events, 33 achievements.")}
          </h1>
        </Reveal>
        <Dimension className="mt-8" start="2017 · OMERJ" end="2024 · ConstruTech" label={tr(lang, "8 anos", "8 years")} />

        <Reveal className="mt-10 grid items-start gap-6 desk:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] desk:gap-10">
          <p className="text-[18px] leading-relaxed text-ink-2">
            {tr(
              lang,
              "Oito anos de robótica competitiva, hackathons e olimpíadas científicas. Houston, Wolfenbüttel e muita madrugada de oficina no meio.",
              "Eight years of competitive robotics, hackathons and science olympiads. Houston, Wolfenbüttel and plenty of late nights in the workshop along the way.",
            )}
          </p>
          <p className="flex gap-3 border-l-2 border-accent pl-4 text-[15px] leading-relaxed text-muted">
            <LogoMark className="mt-0.5 size-5 shrink-0 text-ink" />
            {roboticsRoleFor(lang)}
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <StatCounters />
        </Reveal>
      </header>

      <Section
        id="destaques"
        index={1}
        label={tr(lang, "Destaques", "Highlights")}
        title={tr(lang, "Dois mundiais no mesmo ano.", "Two world events in one year.")}
        dimension={tr(lang, "2023 · Houston, EUA ⟷ Wolfenbüttel, Alemanha", "2023 · Houston, USA ⟷ Wolfenbüttel, Germany")}
        lang={lang}
      >
        <div className="grid gap-[clamp(48px,8vh,80px)]">
          <RouteChart lang={lang} />
          {highlights.map((h, i) => (
            <article key={h.event}>
              <Figure src={h.image} alt={h.event} fig={String(i + 2).padStart(2, "0")} caption={`${h.event}, ${h.place} — ${h.year}.`} lang={lang} className="aspect-[16/9]" />
              <Reveal className="mt-6 grid gap-6 border-t-2 border-ink pt-5 desk:grid-cols-[minmax(0,1fr)_240px]">
                <div>
                  <div className="font-mono text-[11px] text-accent">DST-{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="display mt-1 text-[clamp(1.6rem,3.2vw,2.3rem)] leading-tight">{h.event}</h3>
                  <p className="mt-3 text-[16px] font-semibold text-ink-2">{h.result}</p>
                </div>
                <dl className="self-start border border-line bg-sheet font-mono text-[11.5px]">
                  {[
                    [tr(lang, "Data", "Date"), h.year],
                    [tr(lang, "Local", "Place"), h.place],
                    [tr(lang, "Equipe", "Team"), h.team],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[70px_1fr] border-b border-line-soft last:border-b-0">
                      <dt className="px-3 py-2 text-[10px] tracking-[0.08em] text-faint uppercase">{k}</dt>
                      <dd className="px-3 py-2 text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="linha-do-tempo"
        index={2}
        label={tr(lang, "Linha do tempo", "Timeline")}
        title={tr(lang, "Tudo, em ordem.", "All of it, in order.")}
        lead={tr(
          lang,
          "Cada competição, hackathon e olimpíada de 2017 a 2024, com foto e o registro original. Clique para ampliar.",
          "Every competition, hackathon and olympiad from 2017 to 2024, with a photo and the original record. Click to enlarge.",
        )}
        lang={lang}
      >
        <AchievementLog />
      </Section>

      <Section
        id="equipes"
        index={3}
        label={tr(lang, "Equipes", "Teams")}
        title={tr(lang, "Três times, três fases.", "Three teams, three stages.")}
        lead={tr(lang, "Cada equipe tem a sua folha, com período, prêmios e todos os registros dela.", "Each team has its own sheet, with its period, awards and every record.")}
        lang={lang}
      >
        <ol className="crop border border-line bg-sheet">
          {teams.map((t, i) => (
            <li key={t.slug} data-r="" className="reveal border-b border-line-soft last:border-b-0">
              <Link
                href={localePath(lang, `/robotica/equipes#${t.slug}`)}
                className="group grid grid-cols-[36px_1fr_auto] items-center gap-x-4 gap-y-1 px-4 py-4 transition-colors hover:bg-paper desk:grid-cols-[44px_1fr_200px_28px]"
              >
                <span className="font-mono text-[11.5px] text-accent">{String(teams.length - i).padStart(2, "0")}</span>
                <span>
                  <span className="display block text-[1.25rem] leading-tight group-hover:text-accent">{t.name}</span>
                  <span className="mt-1 block text-[13.5px] text-muted">{t.awards[0]}</span>
                </span>
                <span className="col-start-2 font-mono text-[11px] text-faint uppercase desk:col-start-auto">
                  {t.period} · {t.place}
                </span>
                <span
                  aria-hidden
                  className="col-start-3 row-start-1 text-right font-mono text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent desk:col-start-auto desk:row-start-auto"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <Reveal className="mt-5">
          <Link href={localePath(lang, "/robotica/equipes")} className="link-u">
            {tr(lang, "abrir a página das equipes →", "open the teams page →")}
          </Link>
        </Reveal>
      </Section>

      <Footer lang={lang} />
    </main>
  );
}
