import Link from "next/link";
import { ArchDiagram } from "@/components/arch-diagram";
import { ProjectList } from "@/components/project-list";
import { StackExploded } from "@/components/stack-exploded";
import { Telemetry } from "@/components/telemetry";
import { notFound } from "next/navigation";
import { PhotoReel } from "@/components/photo-reel";
import { Chips, Dimension, Footer, Reveal, Section } from "@/components/ui";
import { channels, storyFor, travelPhotosFor } from "@/content/info";
import { social } from "@/content/site";
import { educationFor, experienceFor, skillsFor } from "@/content/work";
import { isLang, localePath, tr, type Lang } from "@/i18n";
import { pageMetadata } from "@/i18n/seo";
import type { Metadata } from "next";

const specFor = (lang: Lang) => [
  { k: tr(lang, "Nome", "Name"), v: "Cauã Campos de Souza e Silva" },
  { k: tr(lang, "Função", "Role"), v: tr(lang, "Desenvolvedor Full Stack", "Full Stack Developer") },
  { k: tr(lang, "Base", "Based in"), v: tr(lang, "Resende, RJ · Brasil", "Resende, RJ · Brazil") },
  { k: tr(lang, "Foco", "Focus"), v: "TypeScript · NestJS · React · Next.js · AWS" },
  { k: tr(lang, "Formação", "Education"), v: tr(lang, "Engenharia de Software · AEDB", "Software Engineering · AEDB") },
  { k: tr(lang, "Origem", "Roots"), v: tr(lang, "Robótica competitiva desde 2018", "Competitive robotics since 2018"), href: "/robotica" },
];

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata(lang, "/", {
    description: tr(
      lang,
      "Desenvolvedor Full Stack em Resende, RJ: TypeScript nas duas pontas, de NestJS e Node.js a React e Next.js. Sistemas distribuídos, IoT, projetos e robótica competitiva desde 2018.",
      "Full Stack Developer in Resende, Brazil: TypeScript on both ends, from NestJS and Node.js to React and Next.js. Distributed systems, IoT, projects and competitive robotics since 2018.",
    ),
  });
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const spec = specFor(lang);
  const experience = experienceFor(lang);
  const skills = skillsFor(lang);
  const education = educationFor(lang);
  const story = storyFor(lang);

  return (
    <main>
      {/* Folha 00 — Apresentação */}
      <header className="pt-[clamp(56px,12vh,130px)]">
        <Reveal>
          <div className="label">
            <span className="text-accent">{tr(lang, "Folha", "Sheet")} 00</span> / {tr(lang, "Apresentação", "Introduction")}
          </div>
          <h1 className="display mt-5 text-[clamp(2.6rem,7.4vw,5.6rem)] leading-[0.94]">
            TypeScript
            <br />
            {tr(lang, "nas duas pontas.", "on both ends.")}
          </h1>
        </Reveal>
        <Dimension
          className="mt-8"
          start={tr(lang, "← back-end · NestJS · Node.js", "← back end · NestJS · Node.js")}
          end={tr(lang, "React · Next.js · front-end →", "React · Next.js · front end →")}
          label="full stack"
        />

        <div className="mt-10 grid items-start gap-10 desk:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div>
            <p className="text-[18px] leading-relaxed text-ink-2">
              {tr(
                lang,
                "Desenvolvedor Full Stack. Defino requisitos, escrevo a API e a interface e mantenho o sistema em produção na AWS. Experiência com sistemas distribuídos, microserviços, dispositivos IoT e evolução de bases legadas em Clean Architecture.",
                "Full Stack Developer. I define requirements, write the API and the interface, and keep the system running in production on AWS. Experienced with distributed systems, microservices, IoT devices and evolving legacy codebases with Clean Architecture.",
              )}
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              <a href="#experiencia" className="link-u">
                {tr(lang, "ver experiência ↓", "see experience ↓")}
              </a>
              <a href="/cv_CauaCampos.pdf" download="cv_CauaCampos.pdf" className="link-u">
                {tr(lang, "baixar currículo ↓", "download CV ↓")}
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
          </div>

          <div>
            <div className="crop border border-line bg-sheet font-mono text-[12.5px]">
              <div className="border-b border-line px-4 py-2 label text-[10px]">{tr(lang, "Ficha técnica", "Spec sheet")}</div>
              <dl>
                {spec.map((r) => (
                  <div key={r.k} className="grid grid-cols-[96px_1fr] border-b border-line-soft last:border-b-0">
                    <dt className="border-r border-line-soft px-4 py-2.5 text-[10.5px] tracking-[0.08em] text-faint uppercase">{r.k}</dt>
                    <dd className="px-4 py-2.5 text-ink">
                      {r.href ? (
                        <Link href={localePath(lang, r.href)} className="link-u text-[12.5px]">
                          {r.v} →
                        </Link>
                      ) : (
                        r.v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </header>

      {/* Folha 01 — Experiência */}
      <Section
        id="experiencia"
        index={1}
        label={tr(lang, "Experiência", "Experience")}
        title={tr(lang, "Do requisito ao deploy.", "From requirements to deploy.")}
        dimension={tr(lang, "3 empresas · INATEL, Oracclum, Next Devices", "3 companies · INATEL, Oracclum, Next Devices")}
        lang={lang}
      >
        <div className="grid grid-cols-1 gap-[clamp(56px,9vh,96px)]">
          {experience.map((j, ji) => (
            <article key={j.id}>
              <div className="grid gap-6 border-t-2 border-ink pt-5 desk:grid-cols-[minmax(0,1fr)_260px]">
                <div>
                  <div className="font-mono text-[11px] text-accent">EXP-{String(ji + 1).padStart(2, "0")}</div>
                  <h3 className="display mt-1 text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight">{j.company}</h3>
                  {j.fullName && <div className="font-mono text-[11px] text-faint">{j.fullName}</div>}
                  <div className="mt-2 text-[15px] font-semibold text-ink-2">{j.role}</div>
                  <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-ink-2">{j.context}</p>
                </div>
                <dl className="self-start border border-line bg-sheet font-mono text-[11.5px]">
                  {[
                    [tr(lang, "Período", "Period"), j.period],
                    [tr(lang, "Vínculo", "Type"), j.type],
                    [tr(lang, "Local", "Location"), j.place],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[78px_1fr] border-b border-line-soft last:border-b-0">
                      <dt className="px-3 py-2 text-[10px] tracking-[0.08em] text-faint uppercase">{k}</dt>
                      <dd className="px-3 py-2 text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <ol className="mt-8 grid gap-0 border-t border-line">
                {j.bullets.map((b, bi) => (
                  <li key={bi} className="grid grid-cols-[44px_1fr] gap-3 border-b border-line py-4">
                    <span className="font-mono text-[11.5px] text-accent">
                      {ji + 1}.{bi + 1}
                    </span>
                    <span className="text-[15px] leading-relaxed text-ink-2">{b}</span>
                  </li>
                ))}
              </ol>

              {j.diagram && (
                <div className="mt-8">
                  <ArchDiagram lang={lang} />
                </div>
              )}

              <div className="mt-6 grid gap-3 desk:grid-cols-[88px_1fr]">
                <div className="label pt-1 text-[10px]">Stack</div>
                <Chips items={j.stack} />
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Folha 02 — Projetos */}
      <Section
        id="projetos"
        index={2}
        label={tr(lang, "Projetos", "Projects")}
        title={tr(lang, "Projetos selecionados.", "Selected projects.")}
        lead={tr(
          lang,
          "Sistemas que construí em empresas, produtos próprios, sites para clientes, mobile e robótica. Os destaques vêm primeiro; o resto está nas abas.",
          "Systems I built at companies, my own products, client sites, mobile and robotics. Highlights first; the rest is in the tabs.",
        )}
        lang={lang}
      >
        <ProjectList />
      </Section>

      {/* Folha 03 — Telemetria */}
      <Section
        id="telemetria"
        index={3}
        label={tr(lang, "Telemetria", "Telemetry")}
        title={tr(lang, "Sinal de atividade.", "Activity signal.")}
        lead={tr(
          lang,
          "Meu GitHub lido como um sensor em campo: cada barra é uma semana de commits nos últimos doze meses.",
          "My GitHub read like a sensor in the field: each bar is one week of commits over the last twelve months.",
        )}
        lang={lang}
      >
        <Telemetry lang={lang} />
      </Section>

      {/* Folha 04 — Competências */}
      <Section
        id="competencias"
        index={4}
        label={tr(lang, "Competências", "Skills")}
        title={tr(lang, "O que eu uso, sem porcentagem.", "What I use, no percentages.")}
        lang={lang}
      >
        <div className="grid items-start gap-10 desk:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <StackExploded lang={lang} />
          <div>
            <dl className="border-t-2 border-ink">
              {skills.map((g) => (
                <div key={g.label} className="grid gap-1.5 border-b border-line py-4">
                  <dt className="font-mono text-[11px] tracking-[0.1em] text-accent uppercase">{g.label}</dt>
                  <dd className="text-[15px] leading-relaxed text-ink-2">{g.items.join(" / ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Folha 05 — Formação */}
      <Section id="formacao" index={5} label={tr(lang, "Formação", "Education")} title={tr(lang, "Engenharia, de base.", "Engineering, from the basics.")} lang={lang}>
        <ol className="border-t-2 border-ink">
          {education.map((e) => (
            <li key={e.school + e.period} className="grid gap-2 border-b border-line py-5 desk:grid-cols-[160px_1fr_auto]">
              <span className="font-mono text-[12px] text-ink-2">{e.period}</span>
              <div>
                <div className="text-[17px] font-semibold">{e.course}</div>
                <div className="mt-0.5 text-[14px] text-muted">
                  {e.school}
                  {e.fullName && <span className="text-faint"> · {e.fullName}</span>}
                </div>
              </div>
              <span className="font-mono text-[11px] text-faint desk:text-right">{e.note}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* Folha 06 — Sobre */}
      <Section id="sobre" index={6} label={tr(lang, "Sobre", "About")} title={tr(lang, "Sou o Cauã.", "I'm Cauã.")} lang={lang}>
        <div className="grid items-start gap-10 desk:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)]">
          <PhotoReel photos={travelPhotosFor(lang)} fig="03" />
          <div className="grid gap-5 text-[16px] leading-relaxed text-ink-2">
            <p>
              {tr(
                lang,
                "Sou desenvolvedor Full Stack em Resende, RJ, e estudo Engenharia de Software na AEDB. Gosto de sistemas que precisam funcionar de verdade, com dispositivo em campo, dado chegando em tempo real e usuário do outro lado.",
                "I'm a Full Stack Developer in Resende, Brazil, studying Software Engineering at AEDB. I like systems that have to work for real, with a device in the field, data arriving in real time and a user on the other end.",
              )}
            </p>
            <p className="text-muted">
              {tr(
                lang,
                "Antes do código profissional veio a robótica competitiva: três equipes, dois mundiais em 2023 e os algoritmos de navegação autônoma dos robôs.",
                "Before professional code came competitive robotics: three teams, two world events in 2023 and the robots' autonomous navigation algorithms.",
              )}
            </p>
          </div>
        </div>

        <ol className="mt-12 border-t-2 border-ink">
          {story.map((s) => (
            <li key={s.title} className="grid gap-2 border-b border-line py-5 desk:grid-cols-[200px_1fr]">
              <div className="font-mono text-[11.5px] text-faint">{s.meta}</div>
              <div>
                <h3 className="text-[18px] font-semibold">{s.title}</h3>
                <p className="mt-1.5 max-w-[62ch] text-[14.5px] leading-relaxed text-muted">{s.body}</p>
                {s.link && (
                  <Link href={localePath(lang, s.link.href)} className="link-u mt-3 inline-block text-[12px]">
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
        label={tr(lang, "Contato", "Contact")}
        title={tr(lang, "Vamos conversar.", "Let's talk.")}
        lead={tr(lang, "Respondo email e WhatsApp em até um dia.", "I answer email and WhatsApp within a day.")}
        lang={lang}
      >
        <ul className="crop border border-line bg-sheet">
          {channels.map((c) => (
            <li key={c.label} className="border-b border-line-soft last:border-b-0">
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
          <li>
            <a
              href="/cv_CauaCampos.pdf"
              download="cv_CauaCampos.pdf"
              className="group grid grid-cols-[100px_1fr_auto] items-center gap-4 px-4 py-4 transition-colors hover:bg-paper"
            >
              <span className="font-mono text-[10.5px] tracking-[0.1em] text-faint uppercase">{tr(lang, "Currículo", "CV")}</span>
              <span className="truncate font-mono text-[14px]">{tr(lang, "Baixar em PDF", "Download PDF")}</span>
              <span className="font-mono text-muted transition-transform group-hover:translate-y-0.5 group-hover:text-accent">↓</span>
            </a>
          </li>
        </ul>
      </Section>

      <Footer lang={lang} />
    </main>
  );
}
