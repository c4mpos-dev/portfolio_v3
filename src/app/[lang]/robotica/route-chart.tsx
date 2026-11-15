import type { CSSProperties } from "react";
import { routeOrigin, routesFor } from "@/content/robotica";
import { tr, type Lang } from "@/i18n";
import { LAND_ROWS } from "./route-map-data";

/**
 * Map of the two 2023 trips, as a pinned scene: the page holds still while the scroll
 * plots each leg from Resende (see globals.css, "Route map"). Land is a dot matrix on
 * the same grid as the paper; routes are true great circles; a plotter crosshair rides
 * the line and the readout below counts the kilometres.
 */

// Equirectangular window: 115°W–35°E at 5px/°, 68°N–42°S at 4px/° (standard parallel ≈ 37°).
const LON0 = -115;
const LAT0 = 68;
const W = 750;
const H = 440;
const CELL = 10;
const X = (lon: number) => (lon - LON0) * 5;
const Y = (lat: number) => (LAT0 - lat) * 4;

const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

/** Points along the great circle between two places, projected onto the plot. */
function greatCircle(a: { lat: number; lon: number }, b: { lat: number; lon: number }, steps = 48) {
  const v = (p: { lat: number; lon: number }) => [
    Math.cos(rad(p.lat)) * Math.cos(rad(p.lon)),
    Math.cos(rad(p.lat)) * Math.sin(rad(p.lon)),
    Math.sin(rad(p.lat)),
  ];
  const [va, vb] = [v(a), v(b)];
  const w = Math.acos(va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2]);
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const [ka, kb] = [Math.sin((1 - t) * w) / Math.sin(w), Math.sin(t * w) / Math.sin(w)];
    const [x, y, z] = [0, 1, 2].map((k) => ka * va[k] + kb * vb[k]);
    return `${X(deg(Math.atan2(y, x))).toFixed(1)} ${Y(deg(Math.asin(z))).toFixed(1)}`;
  });
}

// Land as horizontal runs of cells, filled with a dot pattern.
const landPath = LAND_ROWS.map((row, y) =>
  [...row.matchAll(/X+/g)].map((m) => `M${m.index * CELL} ${y * CELL}h${m[0].length * CELL}v${CELL}h-${m[0].length * CELL}z`).join(""),
).join("");

const origin = { x: X(routeOrigin.lon), y: Y(routeOrigin.lat) };
const legsFor = (lang: Lang) =>
  routesFor(lang).map((r, i) => ({
  ...r,
  n: i + 1,
  x: X(r.lon),
  y: Y(r.lat),
  d: `M${greatCircle(routeOrigin, r).join("L")}`,
  }));

const pad = (n: number) => String(n).padStart(2, "0");
const km = (n: number) => n.toLocaleString("pt-BR").replace(".", " "); // thin-space thousands, both languages
const coord = (lat: number, lon: number, lang: Lang) =>
  `${Math.abs(lat).toFixed(2)}°${lat < 0 ? "S" : "N"} ${Math.abs(lon).toFixed(2)}°${lon < 0 ? tr(lang, "O", "W") : tr(lang, "L", "E")}`;
const at = (x: number, y: number): CSSProperties => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });

const lons = [-100, -80, -60, -40, -20, 0, 20];
const lats = [60, 40, 20, 0, -20, -40];
const pill = "border border-line bg-sheet px-1 py-px text-[8.5px] tracking-[0.04em] text-muted";

export function RouteChart({ lang = "pt" }: { lang?: Lang }) {
  const legs = legsFor(lang);
  return (
    <div data-scrub="pin" className="route pin-track">
      <figure className="sticky top-[76px]">
        <div className="crop">
          <div data-r="" className="border border-line bg-sheet font-mono">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line px-4 py-2.5 text-[11px] tracking-[0.06em] text-muted uppercase">
              <span>
                <span className="text-accent">●</span> {tr(lang, "Carta de rotas", "Route chart")} · 2023
              </span>
              <span className="hidden text-faint sm:inline">{tr(lang, "rotas em grande círculo · origem: Resende", "great-circle routes · origin: Resende")}</span>
            </div>

            <div className="relative overflow-hidden" style={{ aspectRatio: `${W} / ${H}` }}>
              {/* Land: dot matrix, swept in from the origin when revealed */}
              <svg viewBox={`0 0 ${W} ${H}`} className="route-land absolute inset-0 size-full" aria-hidden>
                <defs>
                  <pattern id="land-dot" width={CELL} height={CELL} patternUnits="userSpaceOnUse">
                    <rect x="2.5" y="2.5" width="5" height="5" style={{ fill: "var(--muted)" }} />
                  </pattern>
                </defs>
                <path d={landPath} fill="url(#land-dot)" opacity="0.6" />
              </svg>

              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="absolute inset-0 size-full"
                role="img"
                aria-label={`${tr(lang, "Mapa das rotas a partir de Resende", "Map of the routes from Resende")}: ${legs.map((l) => `${l.to}, ${l.country}, ${km(l.km)} km`).join("; ")}.`}
              >
                {/* Graticule */}
                <g fontSize="9" style={{ fill: "var(--faint)" }}>
                  {lons.map((lon) => (
                    <g key={lon}>
                      <line x1={X(lon)} x2={X(lon)} y1="0" y2={H} strokeWidth="1" style={{ stroke: "var(--line-soft)" }} />
                      <text x={X(lon) + 4} y={H - 6}>
                        {Math.abs(lon)}°{lon < 0 ? tr(lang, "O", "W") : lon > 0 ? tr(lang, "L", "E") : ""}
                      </text>
                    </g>
                  ))}
                  {lats.map((lat) => (
                    <g key={lat}>
                      <line
                        x1="0"
                        x2={W}
                        y1={Y(lat)}
                        y2={Y(lat)}
                        strokeWidth="1"
                        strokeDasharray={lat === 0 ? "6 4" : undefined}
                        style={{ stroke: lat === 0 ? "var(--line)" : "var(--line-soft)" }}
                      />
                      <text x="6" y={Y(lat) - 4}>
                        {lat === 0 ? tr(lang, "EQUADOR", "EQUATOR") : `${Math.abs(lat)}°${lat > 0 ? "N" : "S"}`}
                      </text>
                    </g>
                  ))}
                </g>

                {legs.map((l) => (
                  <g key={l.to} className={`leg-${l.n}`}>
                    {/* Planned route (dotted), then the leg plotted over it */}
                    <path d={l.d} fill="none" strokeWidth="1" strokeDasharray="1 6" strokeLinecap="round" style={{ stroke: "var(--ink)" }} opacity="0.45" />
                    <path d={l.d} pathLength={1} fill="none" strokeWidth="2" className="route-line" style={{ stroke: "var(--accent)" }} />

                    {/* Plotter head: crosshair spanning the sheet, riding the line */}
                    <g className="route-rider" style={{ offsetPath: `path("${l.d}")` }}>
                      <path d={`M-${W} 0H${W}M0 -${H}V${H}`} fill="none" strokeWidth="0.8" strokeDasharray="3 3" style={{ stroke: "var(--accent)" }} opacity="0.7" />
                      <rect x="-9" y="-9" width="18" height="18" fill="none" strokeWidth="1.2" style={{ stroke: "var(--accent)" }} />
                      <rect x="-3.5" y="-3.5" width="7" height="7" style={{ fill: "var(--accent)" }} />
                    </g>

                    {/* Arrival: target rings and a repeating ping */}
                    <g className="route-end">
                      <circle cx={l.x} cy={l.y} r="34" fill="none" strokeWidth="1.2" className="route-ping" style={{ stroke: "var(--accent)" }} />
                      <circle cx={l.x} cy={l.y} r="20" fill="none" strokeWidth="0.8" strokeDasharray="2 3" style={{ stroke: "var(--accent)" }} />
                      <circle cx={l.x} cy={l.y} r="11" fill="none" strokeWidth="1" style={{ stroke: "var(--accent)" }} />
                    </g>
                    <rect x={l.x - 4} y={l.y - 4} width="8" height="8" strokeWidth="1.4" style={{ fill: "var(--sheet)", stroke: "var(--ink)" }} />
                  </g>
                ))}

                {/* Origin */}
                <circle cx={origin.x} cy={origin.y} r="11" fill="none" strokeWidth="1" style={{ stroke: "var(--ink)" }} />
                <rect x={origin.x - 4.5} y={origin.y - 4.5} width="9" height="9" style={{ fill: "var(--ink)" }} />
              </svg>

              {/* Place labels in HTML, so they stay legible when the map shrinks */}
              <div className="pointer-events-none absolute inset-0 text-[10.5px] leading-tight tracking-[0.06em] text-ink uppercase">
                <div style={at(origin.x, origin.y)} className="absolute translate-x-[-50%] translate-y-[14px] text-center">
                  <span className="bg-sheet/85 px-1 font-semibold">Resende</span>
                </div>
                <div style={at(legs[0].x, legs[0].y)} className="leg-1 route-end absolute translate-x-[16px] translate-y-[-120%]">
                  <div className="font-semibold">
                    <span className="bg-sheet/85 px-1">{legs[0].to}</span>
                  </div>
                  <span className={`mt-1 hidden sm:inline-block ${pill}`}>{coord(legs[0].lat, legs[0].lon, lang)}</span>
                </div>
                <div style={at(legs[1].x, legs[1].y)} className="leg-2 route-end absolute translate-x-[calc(-100%-16px)] translate-y-[-50%] text-right">
                  <div className="font-semibold">
                    <span className="bg-sheet/85 px-1">{legs[1].to}</span>
                  </div>
                  <span className={`mt-1 hidden sm:inline-block ${pill}`}>{coord(legs[1].lat, legs[1].lon, lang)}</span>
                </div>
              </div>
            </div>

            {/* Readout: one cell per leg; distance counts up as the leg is plotted */}
            <dl className="grid grid-cols-2 border-t border-line">
              {legs.map((l) => (
                <div key={l.to} className={`leg-${l.n} route-cell relative px-4 pt-3 pb-4 ${l.n > 1 ? "border-l border-line" : ""}`}>
                  <dt className="label text-[9.5px]">
                    <span className="text-accent">{tr(lang, "Trecho", "Leg")} {pad(l.n)}</span> · {l.when}
                  </dt>
                  <dd className="mt-1.5">
                    <div className="font-sans text-[15px] leading-tight font-semibold text-ink">
                      {l.to}, {l.country}
                    </div>
                    <div className="mt-0.5 text-[10.5px] text-muted">{l.event}</div>
                    <div className="display mt-2 text-[clamp(1.3rem,3.4vw,1.9rem)] leading-none text-ink tabular-nums">
                      <span aria-hidden className="route-km" style={{ "--dist": l.km } as CSSProperties} />
                      <span className="sr-only">{km(l.km)}</span>
                      <span className="ml-1.5 font-mono text-[11px] font-normal tracking-[0.1em] text-accent uppercase">km</span>
                    </div>
                  </dd>
                  <span aria-hidden className="route-bar absolute inset-x-0 bottom-0 h-[2px] bg-accent" />
                </div>
              ))}
            </dl>
          </div>
        </div>
        <figcaption className="mt-2 font-mono text-[11px] text-muted">
          <span className="text-accent">FIG. 01</span> ·{" "}
          {tr(
            lang,
            `Os dois mundiais de 2023 no mapa: ${km(legs.reduce((s, l) => s + l.km, 0))} km em linha reta, somando as duas idas. Role para traçar.`,
            `Both 2023 world events on the map: ${km(legs.reduce((s, l) => s + l.km, 0))} km in a straight line, both trips combined. Scroll to plot.`,
          )}
        </figcaption>
      </figure>
    </div>
  );
}
