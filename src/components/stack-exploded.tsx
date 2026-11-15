import { tr, type Lang } from "@/i18n";

/**
 * Exploded view of the stack, drawn like an assembly sheet: four isometric plates
 * that start apart and seat onto each other as the figure scrolls to mid-screen
 * (scrubbed by --p, see globals.css). Balloons number the parts, as in a BOM.
 */

const LAYERS = [
  { n: 1, name: "Front-end", parts: "React · Next.js" },
  { n: 2, name: "API", parts: "NestJS · Node.js" },
  { n: 3, name: "Dados", en: "Data", parts: "PostgreSQL · TypeORM" },
  { n: 4, name: "Infra", parts: "AWS · Docker · Nginx" },
];

// Isometric plate: half-width, half-height of the top face, and thickness.
const HW = 104;
const HH = 52;
const T = 26;
const CX = 126;
/** Vertical distance between seated plates, and extra gap per plate when exploded. */
const PITCH = 26;
const GAP = 34;
const TOP = 112;

export function StackExploded({ lang = "pt" }: { lang?: Lang }) {
  const last = LAYERS.length - 1;
  const seatedBottom = TOP + last * PITCH + HH + T;

  return (
    <figure>
      <div className="crop">
        <div data-scrub="" className="stack border border-line bg-sheet p-3">
          <svg
            viewBox="0 0 420 350"
            className="mx-auto block w-full max-w-[520px] font-mono"
            role="img"
            aria-label={tr(
              lang,
              "Vista explodida da stack em quatro camadas: front-end com React e Next.js, API com NestJS e Node.js, dados com PostgreSQL e TypeORM, e infraestrutura com AWS, Docker e Nginx.",
              "Exploded view of the stack in four layers: front end with React and Next.js, API with NestJS and Node.js, data with PostgreSQL and TypeORM, and infrastructure with AWS, Docker and Nginx.",
            )}
          >
            {/* Centre line of the assembly, visible while the plates are apart */}
            <line
              x1={CX}
              x2={CX}
              y1="14"
              y2="338"
              className="stack-axis"
              strokeWidth="1"
              strokeDasharray="10 4 2 4"
              style={{ stroke: "var(--accent)" }}
            />

            {/* Bottom plate first, so upper plates paint over it */}
            {[...LAYERS].reverse().map((l) => {
              const i = l.n - 1;
              const y = TOP + i * PITCH;
              // Upper plates lift, lower plates drop: the stack opens around its middle.
              const lift = (i - last / 2) * GAP;
              // Labels are spaced wider than the seated plates, so leaders fan out.
              const ly = y + T / 2 + (i - last / 2) * 10;
              return (
                <g key={l.n} className="stack-plate" style={{ "--lift": lift } as React.CSSProperties}>
                  <path
                    d={`M${CX - HW} ${y} L${CX} ${y + HH} V${y + HH + T} L${CX - HW} ${y + T} Z`}
                    style={{ fill: "var(--paper)", stroke: "var(--ink)" }}
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <path
                    d={`M${CX + HW} ${y} L${CX} ${y + HH} V${y + HH + T} L${CX + HW} ${y + T} Z`}
                    style={{ fill: "var(--line-soft)", stroke: "var(--ink)" }}
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <path
                    d={`M${CX} ${y - HH} L${CX + HW} ${y} L${CX} ${y + HH} L${CX - HW} ${y} Z`}
                    style={{ fill: "var(--sheet)", stroke: i === 0 ? "var(--accent)" : "var(--ink)" }}
                    strokeWidth={i === 0 ? 1.8 : 1.2}
                    strokeLinejoin="round"
                  />
                  {/* Leader line, balloon and part name */}
                  <path d={`M${CX + HW} ${y + T / 2} L262 ${ly}`} fill="none" strokeWidth="1" style={{ stroke: "var(--ink)" }} />
                  <circle cx="272" cy={ly} r="10" strokeWidth="1.2" style={{ fill: "var(--sheet)", stroke: "var(--ink)" }} />
                  <text x="272" y={ly + 3.5} fontSize="10.5" textAnchor="middle" fontWeight="600" style={{ fill: "var(--accent)" }}>
                    {l.n}
                  </text>
                  <text x="290" y={ly - 1} fontSize="12" fontWeight="600" style={{ fill: "var(--ink)" }}>
                    {lang === "en" && "en" in l ? l.en : l.name}
                  </text>
                  <text x="290" y={ly + 11} fontSize="8.6" style={{ fill: "var(--muted)" }}>
                    {l.parts}
                  </text>
                </g>
              );
            })}

            {/* Overall dimension, shown once the plates are seated */}
            <g className="stack-done" fontSize="9.5">
              <path
                d={`M${CX - HW - 12} ${TOP - 4} V${seatedBottom - HH + 4} M${CX - HW - 16} ${TOP - 4} h8 M${CX - HW - 16} ${seatedBottom - HH + 4} h8`}
                fill="none"
                strokeWidth="1"
                style={{ stroke: "var(--accent)" }}
              />
              <text x={CX} y={seatedBottom + 22} textAnchor="middle" letterSpacing="1.2" style={{ fill: "var(--accent)" }}>
                {tr(lang, "FULL STACK · MONTADO", "FULL STACK · ASSEMBLED")}
              </text>
            </g>
          </svg>
        </div>
      </div>
      <figcaption className="mt-2 font-mono text-[11px] text-muted">
        <span className="text-accent">FIG. 02</span> ·{" "}
        {tr(lang, "Vista explodida da stack. As camadas se encaixam conforme você rola.", "Exploded view of the stack. The layers seat as you scroll.")}
      </figcaption>
    </figure>
  );
}
