import type { Metadata } from "next";
import Link from "next/link";
import { Suspense, ViewTransition } from "react";
import { notFound } from "next/navigation";
import { AccessBadge } from "@/components/access-badge";
import { Chips, Dimension, Footer, Reveal, Section } from "@/components/ui";
import { projects } from "@/content/projects";
import { accessFor, getProjectFor, kindsFor, platformsFor, projectsFor } from "@/content/projects-en";
import { isLang, localePath, tr } from "@/i18n";
import { pageMetadata } from "@/i18n/seo";
import { ProjectGallery } from "./gallery";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/[lang]/projetos/[slug]">): Promise<Metadata> {
  const { lang, slug } = await props.params;
  if (!isLang(lang)) return {};
  const p = getProjectFor(lang, slug);
  return p ? pageMetadata(lang, `/projetos/${slug}`, { title: p.name, description: p.summary }) : {};
}

/**
 * The slug is URL data: reading it at the top would leave the route's shared navigation
 * shell empty. The page body reads it behind <Suspense>, so a navigation shows the sheet
 * frame at once and the (prerendered) content streams in.
 */
export default function ProjectPage(props: PageProps<"/[lang]/projetos/[slug]">) {
  return (
    <Suspense fallback={<ProjectSkeleton />}>
      <ProjectContent params={props.params} />
    </Suspense>
  );
}

function ProjectSkeleton() {
  return (
    <main aria-busy className="pt-[clamp(40px,8vh,90px)]">
      <div className="h-4 w-24 bg-line-soft" />
      <div className="mt-8 h-3 w-40 bg-line-soft" />
      <div className="mt-5 h-[clamp(2.2rem,6vw,4.4rem)] w-[min(18ch,90%)] bg-line-soft" />
      <div className="mt-6 h-5 w-[min(56ch,100%)] bg-line-soft" />
      <div className="mt-10 h-px w-full bg-line" />
    </main>
  );
}

async function ProjectContent({ params }: { params: PageProps<"/[lang]/projetos/[slug]">["params"] }) {
  const props = { params };
  const { lang, slug } = await props.params;
  if (!isLang(lang)) notFound();
  const list = projectsFor(lang);
  const p = list.find((x) => x.slug === slug);
  if (!p) notFound();
  const KINDS = kindsFor(lang);
  const PLATFORMS = platformsFor(lang);
  const ACCESS = accessFor(lang);

  const i = list.indexOf(p);
  const prev = list[i - 1];
  const next = list[i + 1];
  const item = String(i + 1).padStart(2, "0");
  const shots: { src?: string; caption: string }[] = p.shots?.length ? p.shots : [{ caption: tr(lang, "Captura principal", "Main screenshot") }];

  const spec: [string, React.ReactNode][] = [
    [tr(lang, "Tipo", "Type"), KINDS[p.kind]],
    [tr(lang, "Plataforma", "Platform"), p.platforms.map((x) => PLATFORMS[x]).join(" · ")],
    [tr(lang, "Acesso", "Access"), <AccessBadge key="a" access={p.access} lang={lang} />],
    ...(p.org ? [[tr(lang, "Onde", "Where"), p.org] as [string, string]] : []),
    ...(p.year ? [[tr(lang, "Ano", "Year"), p.year] as [string, string]] : []),
    ...(p.role ? [[tr(lang, "Papel", "Role"), p.role] as [string, string]] : []),
  ];

  return (
    <main>
      <header className="pt-[clamp(40px,8vh,90px)]">
        <Link href={localePath(lang, "/#projetos")} className="link-u text-[12px]">
          ← {tr(lang, "projetos", "projects")}
        </Link>
        {/* Not a Reveal: the title must be visible at once so the list → page morph lands on it. */}
        <div className="mt-8">
          <div className="label">
            <span className="text-accent">{tr(lang, "Projeto", "Project")} {item}</span> / {KINDS[p.kind]}
          </div>
          <ViewTransition name={`project-title-${p.slug}`} share="morph" default="none">
            <h1 className="display mt-4 w-fit max-w-[18ch] text-[clamp(2.2rem,6vw,4.4rem)] leading-[0.98]">{p.name}</h1>
          </ViewTransition>
          <p className="mt-5 max-w-[56ch] text-[18px] leading-relaxed text-ink-2">{p.summary}</p>
        </div>
        <Dimension className="mt-8" label={p.platforms.map((x) => PLATFORMS[x]).join(" · ")} />
      </header>

      <Section id="visao-geral" index={1} label={tr(lang, "Visão geral", "Overview")} title={tr(lang, "Sobre o projeto.", "About the project.")} lang={lang}>
        <div className="grid items-start gap-10 desk:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <Reveal className="grid gap-5">
            {p.about?.map((t) => (
              <p key={t} className="text-[16px] leading-relaxed text-ink-2">
                {t}
              </p>
            ))}
            {p.highlights && (
              <ol className="border-t border-line">
                {p.highlights.map((h, hi) => (
                  <li key={h} className="grid grid-cols-[40px_1fr] gap-2 border-b border-line py-3.5 text-[15px] leading-relaxed text-ink-2">
                    <span className="font-mono text-[11.5px] text-accent">{hi + 1}.</span>
                    {h}
                  </li>
                ))}
              </ol>
            )}
            {!p.about && !p.highlights && (
              <p className="font-mono text-[12.5px] text-faint">{tr(lang, "Descrição detalhada em breve.", "Detailed description coming soon.")}</p>
            )}
            <div>
              <div className="label mb-2 text-[10px]">Stack</div>
              <Chips items={p.stack} />
            </div>
          </Reveal>

          <Reveal>
            <dl className="crop border border-line bg-sheet font-mono text-[12px]">
              {spec.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[96px_1fr] border-b border-line-soft last:border-b-0">
                  <dt className="border-r border-line-soft px-3 py-2.5 text-[10px] tracking-[0.08em] text-faint uppercase">{k}</dt>
                  <dd className="px-3 py-2.5 text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 grid gap-2">
              {p.links?.live && (
                <a href={p.links.live} target="_blank" rel="noreferrer" className="border border-accent bg-accent px-4 py-3 text-center font-mono text-[12px] text-accent-ink uppercase">
                  {tr(lang, "Abrir online", "Open online")} ↗
                </a>
              )}
              {p.links?.repo && (
                <a href={p.links.repo} target="_blank" rel="noreferrer" className="border border-line px-4 py-3 text-center font-mono text-[12px] uppercase transition-colors hover:border-accent hover:text-accent">
                  {tr(lang, "Ver código no GitHub", "See the code on GitHub")} ↗
                </a>
              )}
              {p.access === "em-breve" && (
                <p className="border border-dashed border-accent px-4 py-3 font-mono text-[11.5px] leading-relaxed text-muted">
                  <span className="text-accent">◐</span> {ACCESS["em-breve"].hint} {tr(lang, "O link entra aqui quando o site abrir.", "The link goes here when the site opens.")}
                </p>
              )}
              {p.access === "privado" && (
                <p className="border border-dashed border-line px-4 py-3 font-mono text-[11.5px] leading-relaxed text-muted">
                  ■ {ACCESS.privado.hint} {tr(lang, "Por isso não há link nem código público.", "That is why there is no link or public code.")}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="galeria" index={2} label={tr(lang, "Galeria", "Gallery")} title={tr(lang, "Registros.", "Records.")} lang={lang}>
        <ProjectGallery name={p.name} item={item} org={p.org} company={p.areas.includes("empresa")} shots={shots} />
      </Section>

      <nav aria-label={tr(lang, "Outros projetos", "Other projects")} className="mt-[clamp(72px,12vh,120px)] grid gap-px border border-line bg-line sm:grid-cols-2">
        {[prev, next].map((q, qi) =>
          q ? (
            <Link key={q.slug} href={localePath(lang, `/projetos/${q.slug}`)} className={`group bg-sheet px-5 py-4 transition-colors hover:bg-paper ${qi ? "sm:text-right" : ""}`}>
              <div className="label text-[10px]">{qi ? tr(lang, "Próximo projeto →", "Next project →") : tr(lang, "← Projeto anterior", "← Previous project")}</div>
              <div className="mt-1 text-[16px] font-semibold group-hover:text-accent">{q.name}</div>
            </Link>
          ) : (
            <span key={qi} className="hidden bg-sheet sm:block" />
          ),
        )}
      </nav>

      <Footer lang={lang} />
    </main>
  );
}
