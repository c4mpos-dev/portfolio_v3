import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";
import { logoCells } from "@/components/logo";

/**
 * Link preview (Open Graph) image shared by every page: a sheet of the engineering
 * notebook — graph paper, sheet label, the page title in the display face, a dimension
 * line and the title block in the corner. 1200 × 630, as WhatsApp, LinkedIn and X expect.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#f3f2ec";
const SHEET = "#fbfaf6";
const INK = "#1b1e23";
const INK_2 = "#3c414a";
const MUTED = "#5f6570";
const LINE = "rgba(27,30,35,0.22)";
const GRID = "rgba(27,30,35,0.06)";
const GRID_MAJOR = "rgba(27,30,35,0.1)";
const ACCENT = "#e2471b";

/**
 * Font files, read once and cached: with Cache Components, uncached IO can't render on
 * demand. Cached as base64 text, since the cache doesn't keep binary data intact.
 */
async function loadFonts() {
  "use cache";
  cacheLife("max");
  const dir = join(process.cwd(), "src/app/_og/fonts");
  return Promise.all(
    ["archivo-expanded-700.ttf", "plex-mono-400.ttf", "plex-mono-500.ttf"].map(async (f) => (await readFile(join(dir, f))).toString("base64")),
  );
}

const CELLS = logoCells();

function Mark({ px }: { px: number }) {
  return (
    <div style={{ position: "relative", width: px * 6, height: px * 10, display: "flex" }}>
      {CELLS.map((c) => (
        <div
          key={`${c.x}-${c.y}`}
          style={{ position: "absolute", left: c.x * px, top: c.y * px, width: px, height: px, background: c.accent ? ACCENT : INK }}
        />
      ))}
    </div>
  );
}

export type CardProps = {
  /** "Folha 02 / Projetos" */
  sheet: string;
  title: string;
  subtitle?: string;
  /** Short facts shown as mono tags (kind, year, stack…). */
  tags?: string[];
  /** Label in the middle of the dimension line. */
  dimension?: string;
};

export async function ogCard({ sheet, title, subtitle, tags = [], dimension = "cauacampos.dev" }: CardProps) {
  const [display, mono, monoMedium] = (await loadFonts()).map((b64) => {
    const buf = Buffer.from(b64, "base64");
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  });
  // Long titles step down so they stay on two or three lines.
  const titleSize = title.length > 46 ? 58 : title.length > 30 ? 70 : 84;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: PAPER, fontFamily: "Plex Mono", color: INK }}>
        {/* Graph paper: minor squares every 24px, major every 120px */}
        {Array.from({ length: 50 }, (_, i) => (
          <div key={`v${i}`} style={{ position: "absolute", top: 0, bottom: 0, left: i * 24, width: 1, background: i % 5 ? GRID : GRID_MAJOR }} />
        ))}
        {Array.from({ length: 27 }, (_, i) => (
          <div key={`h${i}`} style={{ position: "absolute", left: 0, right: 0, top: i * 24, height: 1, background: i % 5 ? GRID : GRID_MAJOR }} />
        ))}

        {/* The sheet */}
        <div
          style={{
            position: "absolute",
            left: 48,
            top: 48,
            right: 48,
            bottom: 48,
            display: "flex",
            flexDirection: "column",
            border: `1.5px solid ${LINE}`,
            background: SHEET,
            padding: "44px 56px 40px",
          }}
        >
          {/* Registration marks */}
          <div style={{ position: "absolute", left: -8, top: -8, width: 18, height: 18, borderLeft: `3px solid ${ACCENT}`, borderTop: `3px solid ${ACCENT}` }} />
          <div style={{ position: "absolute", right: -8, bottom: -8, width: 18, height: 18, borderRight: `3px solid ${ACCENT}`, borderBottom: `3px solid ${ACCENT}` }} />

          {/* Header: mark + name, sheet label */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Mark px={4} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "Archivo", fontSize: 22, letterSpacing: 1 }}>CAUÃ CAMPOS</span>
                <span style={{ fontSize: 14, letterSpacing: 3, color: MUTED }}>FULL STACK · RESENDE</span>
              </div>
            </div>
            <span style={{ fontFamily: "Plex Mono Medium", fontSize: 18, letterSpacing: 3, color: ACCENT, textTransform: "uppercase" }}>{sheet}</span>
          </div>

          {/* Title + subtitle */}
          <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
            <div style={{ fontFamily: "Archivo", fontSize: titleSize, lineHeight: 1.02, letterSpacing: -1.5, maxWidth: 1000 }}>{title}</div>
            {subtitle && <div style={{ marginTop: 22, fontSize: 24, lineHeight: 1.4, color: INK_2, maxWidth: 940 }}>{subtitle}</div>}
            {tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 }}>
                {tags.map((t) => (
                  <span key={t} style={{ border: `1.5px solid ${LINE}`, padding: "4px 12px", fontSize: 17, color: INK_2 }}>
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Dimension line |———— label ————| */}
          <div style={{ display: "flex", alignItems: "center", marginTop: 34 }}>
            <div style={{ width: 2, height: 18, background: INK }} />
            <div style={{ flex: 1, height: 2, background: INK }} />
            <span style={{ padding: "0 16px", fontSize: 16, letterSpacing: 3, color: MUTED, textTransform: "uppercase" }}>{dimension}</span>
            <div style={{ flex: 1, height: 2, background: INK }} />
            <div style={{ width: 2, height: 18, background: INK }} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: display, weight: 700, style: "normal" },
        { name: "Plex Mono", data: mono, weight: 400, style: "normal" },
        { name: "Plex Mono Medium", data: monoMedium, weight: 500, style: "normal" },
      ],
    },
  );
}
