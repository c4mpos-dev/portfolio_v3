import type { Metadata } from "next";
import { LogoMark } from "@/components/logo";
import { Dimension, Figure, Footer, Reveal, Section } from "@/components/ui";
import { highlights, roboticsRole, stats, teams } from "@/content/robotica";
import { AchievementLog } from "./achievement-log";

export const metadata: Metadata = { title: "Robótica" };

export default function RoboticaPage() {
  return (
    <main>
      <header className="pt-[clamp(56px,12vh,130px)]">
        <Reveal>
          <div className="label">
            <span className="text-accent">Folha 00</span> / Robótica · 2017 → 2024
          </div>
          <h1 className="display mt-5 max-w-[14ch] text-[clamp(2.4rem,6.6vw,5rem)] leading-[0.96]">
            Três equipes, dois mundiais, 33 conquistas.
          </h1>
        </Reveal>
        <Dimension className="mt-8" start="2017 · OMERJ" end="2024 · ConstruTech" label="8 anos" />

        <div className="mt-10 grid items-start gap-10 desk:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <Reveal>
            <p className="text-[18px] leading-relaxed text-ink-2">
              Oito anos de robótica competitiva, hackathons e olimpíadas científicas. Houston, Wolfenbüttel e muita
              madrugada de oficina no meio.
            </p>
            <p className="mt-5 flex gap-3 border-l-2 border-accent pl-4 text-[15px] leading-relaxed text-muted">
              <LogoMark className="mt-0.5 size-5 shrink-0 text-ink" />
              {roboticsRole}
            </p>
          </Reveal>
          <Reveal>
            <dl className="crop grid grid-cols-2 border border-line bg-sheet">
              {stats.map((s, i) => (
                <div key={s.label} className={`px-5 py-4 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t" : ""} border-line`}>
                  <dt className="display text-[clamp(2rem,4vw,2.8rem)] leading-none">{s.n}</dt>
                  <dd className="label mt-2 text-[10px]">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </header>

      <Section
        id="destaques"
        index={1}
        label="Destaques"
        title="Dois mundiais no mesmo ano."
        dimension="2023 · Houston, EUA ⟷ Wolfenbüttel, Alemanha"
      >
        <div className="grid gap-[clamp(48px,8vh,80px)]">
          {highlights.map((h, i) => (
            <article key={h.event}>
              <Figure src={h.image} alt={h.event} fig={String(i + 1).padStart(2, "0")} caption={`${h.event}, ${h.place} — ${h.year}.`} className="aspect-[16/9]" />
              <Reveal className="mt-6 grid gap-6 border-t-2 border-ink pt-5 desk:grid-cols-[minmax(0,1fr)_240px]">
                <div>
                  <div className="font-mono text-[11px] text-accent">DST-{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="display mt-1 text-[clamp(1.6rem,3.2vw,2.3rem)] leading-tight">{h.event}</h3>
                  <p className="mt-3 text-[16px] font-semibold text-ink-2">{h.result}</p>
                </div>
                <dl className="self-start border border-line bg-sheet font-mono text-[11.5px]">
                  {[
                    ["Data", h.year],
                    ["Local", h.place],
                    ["Equipe", h.team],
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
        label="Linha do tempo"
        title="Tudo, em ordem."
        lead="Cada competição, hackathon e olimpíada de 2017 a 2024, com foto e o registro original. Clique para ampliar."
      >
        <AchievementLog />
      </Section>

      <Section id="equipes" index={3} label="Equipes" title="Três times, três fases.">
        <div className="grid gap-8 desk:grid-cols-3 desk:gap-6">
          {teams.map((t, i) => (
            <article key={t.name} className="flex flex-col">
              <Figure src={t.image} alt={t.name} fig={String(i + 3).padStart(2, "0")} caption={t.name} className="aspect-[4/3]" />
              <Reveal className="mt-4 flex flex-1 flex-col border-t-2 border-ink pt-4">
                <h3 className="display text-[1.35rem] leading-tight">{t.name}</h3>
                <div className="mt-1 font-mono text-[11px] text-faint">
                  {t.period} · {t.place}
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">{t.desc}</p>
                <ul className="mt-auto pt-4">
                  {t.awards.map((a) => (
                    <li key={a} className="flex gap-2 border-t border-line-soft py-2 text-[13px] text-ink-2">
                      <span className="font-mono text-accent">+</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </article>
          ))}
        </div>
      </Section>

      <Footer />
    </main>
  );
}
