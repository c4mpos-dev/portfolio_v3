import Link from "next/link";
import { lang as rootLang } from "next/root-params";
import { PixelRobot } from "@/components/pixel-robot";
import { Dimension, Footer } from "@/components/ui";
import { isLang, localePath, tr } from "@/i18n";

export default async function NotFound() {
  const value = await rootLang();
  const lang = isLang(value) ? value : "pt";

  return (
    <main>
      <title>{tr(lang, "Folha não encontrada | Cauã Campos", "Sheet not found | Cauã Campos")}</title>
      <header className="pt-[clamp(56px,12vh,130px)]">
        <div className="label">
          <span className="text-accent">{tr(lang, "Folha", "Sheet")} 404</span> / {tr(lang, "Fora do conjunto de desenhos", "Not in the drawing set")}
        </div>
        <h1 className="display mt-5 max-w-[14ch] text-[clamp(2.4rem,6.6vw,5rem)] leading-[0.96]">
          {tr(lang, "Folha não encontrada.", "Sheet not found.")}
        </h1>
        <Dimension
          className="mt-8"
          start={tr(lang, "o endereço pedido", "the address asked for")}
          end={tr(lang, "o que existe", "what exists")}
          label={tr(lang, "sem cota", "no dimension")}
        />

        <div className="mt-10 flex items-start gap-5">
          <PixelRobot size={36} className="shrink-0 animate-bob" />
          <div>
            <p className="max-w-[52ch] text-[18px] leading-relaxed text-ink-2">
              {tr(
                lang,
                "Procurei em todas as gavetas e essa folha não está no caderno. Pode ter sido renomeada, ou o endereço veio com um erro de digitação.",
                "I searched every drawer and this sheet isn't in the notebook. It may have been renamed, or the address has a typo.",
              )}
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              <Link href={localePath(lang, "/")} className="link-u">
                {tr(lang, "voltar ao início →", "back to home →")}
              </Link>
              <Link href={localePath(lang, "/#projetos")} className="link-u text-muted">
                {tr(lang, "projetos", "projects")}
              </Link>
              <Link href={localePath(lang, "/robotica")} className="link-u text-muted">
                {tr(lang, "robótica", "robotics")}
              </Link>
            </div>
          </div>
        </div>
      </header>
      <Footer lang={lang} />
    </main>
  );
}
