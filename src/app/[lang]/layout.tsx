import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { ScrollFx } from "@/components/scroll-fx";
import { ScrollRuler } from "@/components/scroll-ruler";
import { ThemeScript } from "@/components/theme-script";
import { TitleBlock } from "@/components/title-block";
import { Topbar } from "@/components/topbar";
import { htmlLang, isLang, LANGS, tr } from "@/i18n";
import { pageMetadata, SITE_NAME, SITE_URL } from "@/i18n/seo";
import { LangProvider } from "@/i18n/lang-context";
import "../globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] });

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const description = tr(
    lang,
    "Desenvolvedor Full Stack com TypeScript nas duas pontas: NestJS e Node.js no back-end, React e Next.js no front. Sistemas distribuídos, IoT e Clean Architecture. Resende, RJ.",
    "Full Stack Developer with TypeScript on both ends: NestJS and Node.js on the back end, React and Next.js on the front. Distributed systems, IoT and Clean Architecture. Resende, Brazil.",
  );
  return {
    ...pageMetadata(lang, "/", { description }),
    metadataBase: new URL(SITE_URL),
    title: {
      default: "Cauã Campos | Full Stack Developer",
      template: `%s | ${SITE_NAME}`,
    },
    applicationName: SITE_NAME,
    authors: [{ name: "Cauã Campos", url: SITE_URL }],
    creator: "Cauã Campos",
    keywords: ["Cauã Campos", "Full Stack", "TypeScript", "NestJS", "React", "Next.js", "Node.js", "AWS", "IoT", "Resende"],
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={htmlLang(lang)} data-theme="light" data-scroll-behavior="smooth" suppressHydrationWarning className={`${archivo.variable} ${plexMono.variable}`}>
      <head>
        {/* Without JavaScript nothing would ever be revealed: show everything in its finished state. */}
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}.dim,.sig,.gantt-bar,.redact{transform:none}.stamp{opacity:.9;transform:rotate(-7deg)}.plot{clip-path:none}.arch .arch-node{opacity:1}.arch-wire{stroke-dashoffset:0}.route-land{clip-path:none}.pin-track{height:auto}[data-scrub]{--p:1}`}</style>
        </noscript>
      </head>
      <body>
        <ThemeScript />
        <LangProvider lang={lang}>
          <div
            data-bar=""
            style={{ transform: "scaleX(0)" }}
            className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-accent"
          />
          <Topbar />
          <ScrollRuler />
          <div className="mx-auto max-w-[960px] px-[clamp(16px,4vw,40px)]">{children}</div>
          <TitleBlock />
          <ScrollFx />
        </LangProvider>
      </body>
    </html>
  );
}
