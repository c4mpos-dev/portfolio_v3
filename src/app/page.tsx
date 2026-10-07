import Link from "next/link";
import { ArchDiagram } from "@/components/arch-diagram";
import { ProjectList } from "@/components/project-list";
import { Telemetry } from "@/components/telemetry";
import { Chips, Dimension, Figure, Footer, Reveal, Section } from "@/components/ui";
import { channels, portrait, story } from "@/content/info";
import { social } from "@/content/site";
import { education, experience, skills } from "@/content/work";

const spec = [
  { k: "Nome", v: "Cauã Campos de Souza e Silva" },
  { k: "Função", v: "Desenvolvedor Full Stack" },
  { k: "Base", v: "Resende, RJ · Brasil" },
  { k: "Foco", v: "TypeScript · NestJS · React · Next.js · AWS" },
  { k: "Formação", v: "Engenharia de Software · AEDB" },
  { k: "Origem", v: "Robótica competitiva desde 2018", href: "/robotica" },
];

export default function HomePage() {
  return (
    <main>
      {/* Folha 00 — Apresentação */}
      <header className="pt-[clamp(56px,12vh,130px)]">
        <Reveal>
          <div className="label">
            <span className="text-accent">Folha 00</span> / Apresentação
          </div>
          <h1 className="display mt-5 text-[clamp(2.6rem,7.4vw,5.6rem)] leading-[0.94]">
            TypeScript
            <br />
            nas duas pontas.
          </h1>
        </Reveal>
        <Dimension className="mt-8" start="← back-end · NestJS · Node.js" end="React · Next.js · front-end →" label="full stack" />

        <div className="mt-10 grid items-start gap-10 desk:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <Reveal>
            <p className="text-[18px] leading-relaxed text-ink-2">
              Desenvolvedor Full Stack, da definição de requisitos ao deploy e à manutenção em produção na AWS. Experiência
              com sistemas distribuídos, microserviços, dispositivos IoT e evolução de bases legadas em Clean Architecture.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              <a href="#experiencia" className="link-u">
                ver experiência ↓
              </a>
              <a href={`mailto:${social.email}`} className="link-u text-muted">
                email ↗
              </a>
              <a href={social.github} target="_blank" rel="noreferrer" className="link-u text-muted">
                github ↗
              </a>
              <a href={social.linkedin} target="_blank" rel="noreferrer" className="link-u text-muted">
                linkedin ↗
              </a>
            </div>
          </Reveal>

          <Reveal>
            <dl className="crop border border-line bg-sheet font-mono text-[12.5px]">
              <div className="border-b border-line px-4 py-2 label text-[10px]">Ficha técnica</div>
              {spec.map((r) => (
                <div key={r.k} className="grid grid-cols-[96px_1fr] border-b border-line-soft last:border-b-0">
                  <dt className="border-r border-line-soft px-4 py-2.5 text-[10.5px] tracking-[0.08em] text-faint uppercase">{r.k}</dt>
                  <dd className="px-4 py-2.5 text-ink">
                    {r.href ? (
                      <Link href={r.href} className="link-u text-[12.5px]">
                        {r.v} →
                      </Link>
                    ) : (
                      r.v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </header>

      {/* Folha 01 — Experiência */}
      <Section
        id="experiencia"
        index={1}
        label="Experiência"
        title="Do requisito ao deploy."
        dimension="Abr 2024 → Set 2026 · 3 empresas"
      >
        <div className="grid gap-[clamp(56px,9vh,96px)]">
          {experience.map((j, ji) => (
            <article key={j.id}>
              <Reveal className="grid gap-6 border-t-2 border-ink pt-5 desk:grid-cols-[minmax(0,1fr)_260px]">
                <div>
                  <div className="font-mono text-[11px] text-accent">EXP-{String(ji + 1).padStart(2, "0")}</div>
                  <h3 className="display mt-1 text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight">{j.company}</h3>
                  {j.fullName && <div className="font-mono text-[11px] text-faint">{j.fullName}</div>}
                  <div className="mt-2 text-[15px] font-semibold text-ink-2">{j.role}</div>
                  <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-ink-2">{j.context}</p>
                </div>
                <dl className="self-start border border-line bg-sheet font-mono text-[11.5px]">
                  {[
                    ["Período", j.period],
                    ["Vínculo", j.type],
                    ["Local", j.place],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[78px_1fr] border-b border-line-soft last:border-b-0">
                      <dt className="px-3 py-2 text-[10px] tracking-[0.08em] text-faint uppercase">{k}</dt>
                      <dd className="px-3 py-2 text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <ol className="mt-8 grid gap-0 border-t border-line">
                {j.bullets.map((b, bi) => (
                  <li key={bi} data-r="" className="reveal grid grid-cols-[44px_1fr] gap-3 border-b border-line py-4">
                    <span className="font-mono text-[11.5px] text-accent">
                      {ji + 1}.{bi + 1}
                    </span>
                    <span className="text-[15px] leading-relaxed text-ink-2">{b}</span>
                  </li>
                ))}
              </ol>

              {j.diagram && (
                <div className="mt-8">
                  <ArchDiagram />
                </div>
              )}

              <Reveal className="mt-6 grid gap-3 desk:grid-cols-[88px_1fr]">
                <div className="label pt-1 text-[10px]">Stack</div>
                <Chips items={j.stack} />
              </Reveal>
            </article>
          ))}
        </div>
      </Section>

      {/* Folha 02 — Projetos */}
      <Section
        id="projetos"
        index={2}
        label="Projetos"
        title="Lista de peças."
        lead="Sistemas de empresa, produtos, desafios e estudos. Nem todos são sites que dá pra visitar — cada peça diz o que você consegue abrir."
      >
        <ProjectList />
      </Section>

      {/* Folha 03 — Telemetria */}
      <Section
        id="telemetria"
        index={3}
        label="Telemetria"
        title="Sinal de atividade."
        lead="Meu GitHub lido como um sensor em campo: cada barra é uma semana de commits nos últimos doze meses."
      >
        <Telemetry />
      </Section>

      {/* Folha 04 — Competências */}
      <Section id="competencias" index={4} label="Competências" title="O que eu uso, sem porcentagem.">
        <Reveal>
          <dl className="border-t-2 border-ink">
            {skills.map((g) => (
              <div key={g.label} className="grid gap-2 border-b border-line py-4 desk:grid-cols-[160px_1fr]">
                <dt className="font-mono text-[11px] tracking-[0.1em] text-accent uppercase">{g.label}</dt>
                <dd className="text-[15px] leading-relaxed text-ink-2">{g.items.join(" / ")}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      {/* Folha 05 — Formação */}
      <Section id="formacao" index={5} label="Formação" title="Engenharia, de base.">
        <ol className="border-t-2 border-ink">
          {education.map((e) => (
            <li key={e.school + e.period} data-r="" className="reveal grid gap-2 border-b border-line py-5 desk:grid-cols-[160px_1fr_auto]">
              <span className="font-mono text-[12px] text-ink-2">{e.period}</span>
              <div>
                <div className="text-[17px] font-semibold">{e.course}</div>
                <div className="mt-0.5 text-[14px] text-muted">
                  {e.school}
                  {e.fullName && <span className="text-faint"> — {e.fullName}</span>}
                </div>
              </div>
              <span className="font-mono text-[11px] text-faint desk:text-right">{e.note}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* Folha 06 — Sobre */}
      <Section id="sobre" index={6} label="Sobre" title="Sou o Cauã.">
        <div className="grid items-start gap-10 desk:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)]">
          <Figure src={portrait} alt="Cauã Campos" fig="02" caption="Autor, em escala 1:1." className="aspect-[4/5]" />
          <Reveal className="grid gap-5 text-[16px] leading-relaxed text-ink-2">
            <p>
              Sou desenvolvedor Full Stack em Resende, RJ, e estudo Engenharia de Software na AEDB. Gosto de sistemas que
              precisam funcionar de verdade — com dispositivo em campo, dado chegando em tempo real e usuário do outro lado.
            </p>
            <p className="text-muted">
              Antes do código profissional veio a robótica competitiva: três equipes, dois mundiais em 2023 e os
              algoritmos de navegação autônoma dos robôs. É de lá que vem a forma como trabalho — prazo curto, restrição
              real, entrega funcionando.
            </p>
          </Reveal>
        </div>

        <ol className="mt-12 border-t-2 border-ink">
          {story.map((s) => (
            <li key={s.title} data-r="" className="reveal grid gap-2 border-b border-line py-5 desk:grid-cols-[200px_1fr]">
              <div className="font-mono text-[11.5px] text-faint">{s.meta}</div>
              <div>
                <h3 className="text-[18px] font-semibold">{s.title}</h3>
                <p className="mt-1.5 max-w-[62ch] text-[14.5px] leading-relaxed text-muted">{s.body}</p>
                {s.link && (
                  <Link href={s.link.href} className="link-u mt-3 inline-block text-[12px]">
                    {s.link.label}
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Folha 07 — Contato */}
      <Section
        id="contato"
        index={7}
        label="Contato"
        title="Vamos conversar."
        lead="Para projetos, conversas ou só trocar uma ideia. Respondo em até 24 horas."
      >
        <ul className="crop border border-line bg-sheet">
          {channels.map((c) => (
            <li key={c.label} data-r="" className="reveal border-b border-line-soft last:border-b-0">
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-[100px_1fr_auto] items-center gap-4 px-4 py-4 transition-colors hover:bg-paper"
              >
                <span className="font-mono text-[10.5px] tracking-[0.1em] text-faint uppercase">{c.label}</span>
                <span className="truncate font-mono text-[14px]">{c.value}</span>
                <span className="font-mono text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Footer />
    </main>
  );
}
