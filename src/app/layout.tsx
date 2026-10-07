import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { ScrollFx } from "@/components/scroll-fx";
import { themeInitScript } from "@/components/theme-toggle";
import { TitleBlock } from "@/components/title-block";
import { Topbar } from "@/components/topbar";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: {
    default: "Cauã Campos — Full Stack Developer",
    template: "%s — Cauã Campos",
  },
  description:
    "Desenvolvedor Full Stack com TypeScript nas duas pontas — NestJS e Node.js no back-end, React e Next.js no front. Sistemas distribuídos, IoT e Clean Architecture. Resende, RJ.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" data-theme="light" suppressHydrationWarning className={`${archivo.variable} ${plexMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <div
          data-bar=""
          style={{ transform: "scaleX(0)" }}
          className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-accent"
        />
        <Topbar />
        <div className="mx-auto max-w-[960px] px-[clamp(16px,4vw,40px)]">{children}</div>
        <TitleBlock />
        <ScrollFx />
      </body>
    </html>
  );
}
