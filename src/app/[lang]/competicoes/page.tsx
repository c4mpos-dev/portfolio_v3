import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Dimension, Figure, Footer, Reveal, Section } from "@/components/ui";
import { achievementsFor } from "@/content/achievements";
import { isLang, localePath, tr, type Lang } from "@/i18n";
import { pageMetadata } from "@/i18n/seo";

/** What each hackathon won, in one line (the description carries the rest). */
const resultFor = (id: string, lang: Lang) =>
  ({
    "hackathon-construtech-2024": tr(lang, "1º lugar", "1st place"),
    "hacking-rio": tr(lang, "Prêmio Melhor Código", "Best Code award"),
  })[id];

const pad = (n: number) => String(n).padStart(2, "0");

export async function generateMetadata({ params }: PageProps<"/[lang]/competicoes">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata(lang, "/competicoes", {
    title: tr(lang, "Hackathons e olimpíadas", "Hackathons and olympiads"),
    description: tr(
      lang,
      "Fora da robótica: 1º lugar no Hackathon ConstruTech 2024, prêmio Melhor Código no Hacking.Rio 2021 e menções honrosas na OMERJ e na OBMEP.",
      "Outside robotics: 1st place at the 2024 ConstruTech Hackathon, the Best Code award at Hacking.Rio 2021 and honorable mentions at OMERJ and OBMEP.",
    ),
  });
}

export default async function CompeticoesPage({ params }: PageProps<"/[lang]/competicoes">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const all = achievementsFor(lang);
  const hackathons = all.filter((a) => a.group === "hackathons");
  const olympiads = all.filter((a) => a.group === "olimpiadas");
  const years = [...hackathons, ...olympiads].map((a) => a.year);
  const first = Math.min(...years);
  const last = Math.max(...years);

  return (
    <main>
      <header className="pt-[clamp(56px,12vh,130px)]">
        <Reveal>
          <Link href={localePath(lang, "/robotica")} className="link-u text-[12px]">
            ← {tr(lang, "robótica", "robotics")}
          </Link>
          <div className="label mt-8">
            <span className="text-accent">{tr(lang, "Folha", "Sheet")} 00</span> / {tr(lang, "Competições", "Competitions")} · {first} → {last}
          </div>
          <h1 className="display mt-5 max-w-[14ch] text-[clamp(2.4rem,6.6vw,5rem)] leading-[0.96]">
            {tr(lang, "Hackathons e olimpíadas.", "Hackathons and olympiads.")}
          </h1>
        </Reveal>
        <Dimension
          className="mt-8"
          start={`${first} · ${olympiads.at(-1)?.title}`}
          end={`${last} · ConstruTech`}
          label={tr(lang, "fora da robótica", "outside robotics")}
        />
        <p className="mt-10 max-w-[60ch] text-[18px] leading-relaxed text-ink-2">
          {tr(
            lang,
            "O que ficou fora da robótica: dois hackathons de software, com prêmio nos dois, e duas olimpíadas de matemática da época da escola.",
            "What sits outside robotics: two software hackathons, with an award at each, and two math olympiads from my school years.",
          )}
        </p>
      </header>

      <Section
        id="hackathons"
        index={1}
        label="Hackathons"
        title={tr(lang, "Dois hackathons, dois prêmios.", "Two hackathons, two awards.")}
        dimension={hackathons.map((h) => h.year).join(" · ")}
        lang={lang}
      >
        <div className="grid gap-[clamp(48px,8vh,80px)]">
          {hackathons.map((h, i) => (
            <article key={h.id}>
              <Figure src={h.image} alt={h.title} fig={pad(i + 1)} caption={`${h.title}, ${h.place}, ${h.date}.`} lang={lang} className="aspect-[16/9]" />
              <div className="mt-6 grid gap-6 border-t-2 border-ink pt-5 desk:grid-cols-[minmax(0,1fr)_240px]">
                <div>
                  <div className="font-mono text-[11px] text-accent">HCK-{pad(i + 1)}</div>
                  <h3 className="display mt-1 text-[clamp(1.6rem,3.2vw,2.3rem)] leading-tight">{h.title}</h3>
                  <p className="mt-3 text-[16px] font-semibold text-ink-2">{resultFor(h.id, lang)}</p>
                  <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-ink-2">{h.description}</p>
                  {h.link && (
                    <a href={h.link} target="_blank" rel="noreferrer" className="link-u mt-4 inline-block text-[12px]">
                      {tr(lang, "ver registro original", "see the original record")} ↗
                    </a>
                  )}
                </div>
                <dl className="self-start border border-line bg-sheet font-mono text-[11.5px]">
                  {[
                    [tr(lang, "Data", "Date"), h.date],
                    [tr(lang, "Local", "Place"), h.place],
                    [tr(lang, "Tipo", "Type"), h.category],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[70px_1fr] border-b border-line-soft last:border-b-0">
                      <dt className="px-3 py-2 text-[10px] tracking-[0.08em] text-faint uppercase">{k}</dt>
                      <dd className="px-3 py-2 text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="olimpiadas"
        index={2}
        label={tr(lang, "Olimpíadas", "Olympiads")}
        title={tr(lang, "Matemática, na escola.", "Math, at school.")}
        dimension={olympiads.map((o) => o.year).join(" · ")}
        lang={lang}
      >
        <ol className="border-t-2 border-ink">
          {olympiads.map((o) => (
            <li key={o.id} className="grid gap-x-6 gap-y-3 border-b border-line py-5 desk:grid-cols-[96px_1fr_168px]">
              <span className="pt-1 font-mono text-[12px] text-ink-2">{o.date}</span>
              <div>
                <span className="block font-mono text-[10.5px] tracking-[0.1em] text-accent uppercase">{o.category}</span>
                <h3 className="mt-1 text-[17px] leading-tight font-semibold">{o.title}</h3>
                <p className="mt-1.5 max-w-[60ch] text-[14px] leading-relaxed text-ink-2">{o.description}</p>
                <span className="mt-1.5 block font-mono text-[11.5px] text-faint">{o.place}</span>
                {o.link && (
                  <a href={o.link} target="_blank" rel="noreferrer" className="link-u mt-3 inline-block text-[12px]">
                    {tr(lang, "ver registro original", "see the original record")} ↗
                  </a>
                )}
              </div>
              <span className="relative block aspect-[4/3] w-full overflow-hidden border border-line bg-sheet desk:w-[168px]">
                <Image src={o.image} alt={o.title} fill sizes="(min-width: 1024px) 168px, 100vw" className="object-cover" />
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <div className="mt-[clamp(72px,12vh,120px)]">
        <Link href={localePath(lang, "/robotica")} className="group flex items-center justify-between gap-4 border border-line bg-sheet px-5 py-4 transition-colors hover:bg-paper">
          <span>
            <span className="label block text-[10px]">{tr(lang, "Continua em", "Continues in")}</span>
            <span className="mt-1 block text-[16px] font-semibold group-hover:text-accent">
              {tr(lang, "Robótica: mundiais, equipes e linha do tempo", "Robotics: world events, teams and timeline")}
            </span>
          </span>
          <span aria-hidden className="font-mono text-muted group-hover:text-accent">
            →
          </span>
        </Link>
      </div>

      <Footer lang={lang} />
    </main>
  );
}
