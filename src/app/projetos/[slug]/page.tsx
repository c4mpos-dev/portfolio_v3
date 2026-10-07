import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AccessBadge } from "@/components/access-badge";
import { Chips, Dimension, Figure, Footer, Reveal, Section } from "@/components/ui";
import { ACCESS, KINDS, PLATFORMS, getProject, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projetos/[slug]">): Promise<Metadata> {
  const p = getProject((await props.params).slug);
  return p ? { title: p.name, description: p.summary } : {};
}

export default async function ProjectPage(props: PageProps<"/projetos/[slug]">) {
  const { slug } = await props.params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.indexOf(p);
  const prev = projects[i - 1];
  const next = projects[i + 1];
  const item = String(i + 1).padStart(3, "0");

  const spec: [string, React.ReactNode][] = [
    ["Tipo", KINDS[p.kind]],
    ["Plataforma", p.platforms.map((x) => PLATFORMS[x]).join(" · ")],
    ["Acesso", <AccessBadge key="a" access={p.access} />],
    ...(p.org ? [["Onde", p.org] as [string, string]] : []),
    ...(p.year ? [["Ano", p.year] as [string, string]] : []),
    ...(p.role ? [["Papel", p.role] as [string, string]] : []),
  ];

  return (
    <main>
      <header className="pt-[clamp(40px,8vh,90px)]">
        <Link href="/#projetos" className="link-u text-[12px]">
          ← lista de peças
        </Link>
        <Reveal className="mt-8">
          <div className="label">
            <span className="text-accent">Item {item}</span> / {KINDS[p.kind]}
          </div>
          <h1 className="display mt-4 max-w-[18ch] text-[clamp(2.2rem,6vw,4.4rem)] leading-[0.98]">{p.name}</h1>
          <p className="mt-5 max-w-[56ch] text-[18px] leading-relaxed text-ink-2">{p.summary}</p>
        </Reveal>
        <Dimension className="mt-8" label={p.platforms.map((x) => PLATFORMS[x]).join(" · ")} />
      </header>

      <Section id="visao-geral" index={1} label="Visão geral" title="Ficha da peça.">
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
              <p className="font-mono text-[12.5px] text-faint">Descrição detalhada em breve.</p>
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
                  Abrir online ↗
                </a>
              )}
              {p.links?.repo && (
                <a href={p.links.repo} target="_blank" rel="noreferrer" className="border border-line px-4 py-3 text-center font-mono text-[12px] uppercase transition-colors hover:border-accent hover:text-accent">
                  Ver código no GitHub ↗
                </a>
              )}
              {p.access === "privado" && (
                <p className="border border-dashed border-line px-4 py-3 font-mono text-[11.5px] leading-relaxed text-muted">
                  ■ {ACCESS.privado.hint} Por isso não há link nem código público.
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="galeria" index={2} label="Galeria" title="Registros.">
        <div className="grid gap-8 desk:grid-cols-2">
          {(p.shots?.length ? p.shots : [{ caption: "Captura principal" }]).map((s, si) => (
            <Figure
              key={s.caption}
              src={s.src}
              alt={`${p.name} — ${s.caption}`}
              fig={`${item}.${si + 1}`}
              caption={s.caption}
              className={`aspect-[16/10] ${si === 0 && (p.shots?.length ?? 1) % 2 === 1 ? "desk:col-span-2" : ""}`}
            />
          ))}
        </div>
      </Section>

      <nav aria-label="Outros projetos" className="mt-[clamp(72px,12vh,120px)] grid gap-px border border-line bg-line sm:grid-cols-2">
        {[prev, next].map((q, qi) =>
          q ? (
            <Link key={q.slug} href={`/projetos/${q.slug}`} className={`group bg-sheet px-5 py-4 transition-colors hover:bg-paper ${qi ? "sm:text-right" : ""}`}>
              <div className="label text-[10px]">{qi ? "Próxima peça →" : "← Peça anterior"}</div>
              <div className="mt-1 text-[16px] font-semibold group-hover:text-accent">{q.name}</div>
            </Link>
          ) : (
            <span key={qi} className="hidden bg-sheet sm:block" />
          ),
        )}
      </nav>

      <Footer />
    </main>
  );
}
