import { tr, type Lang } from "@/i18n";

/**
 * Schematic of the Next Devices system described in the CV: three services
 * (web app, main API, geospatial microservice). Devices send telemetry straight
 * to the geospatial microservice, which talks to the main API; async flows on
 * the side, real-time out to the web app. Not to scale.
 *
 * Live: boxes and wires draw in when revealed, telemetry packets travel the wires
 * (SVG animateMotion), and hovering a box highlights only its flows (CSS :has).
 */

type NodeId = "iot" | "outbox" | "api" | "geo" | "web";
type Node = { id: NodeId; x: number; y: number; h: number; title: string; sub: string[]; main?: boolean };

const W = 170;
const NODES: Record<Lang, Node[]> = {
  pt: [
    { id: "iot", x: 20, y: 30, h: 64, title: "Dispositivos IoT", sub: ["telemetria em campo"] },
    { id: "geo", x: 295, y: 30, h: 64, title: "Microserviço", sub: ["processamento geoespacial"] },
    { id: "api", x: 295, y: 150, h: 92, title: "API principal", sub: ["NestJS · REST · Swagger", "Clean Arch · DDD", "JWT + roles"], main: true },
    { id: "outbox", x: 20, y: 164, h: 64, title: "Outbox · filas", sub: ["workers · jobs agendados"] },
    { id: "web", x: 570, y: 164, h: 64, title: "Aplicação web", sub: ["React · Next.js · Mapbox"] },
  ],
  en: [
    { id: "iot", x: 20, y: 30, h: 64, title: "IoT devices", sub: ["field telemetry"] },
    { id: "geo", x: 295, y: 30, h: 64, title: "Microservice", sub: ["geospatial processing"] },
    { id: "api", x: 295, y: 150, h: 92, title: "Main API", sub: ["NestJS · REST · Swagger", "Clean Arch · DDD", "JWT + roles"], main: true },
    { id: "outbox", x: 20, y: 164, h: 64, title: "Outbox · queues", sub: ["workers · scheduled jobs"] },
    { id: "web", x: 570, y: 164, h: 64, title: "Web application", sub: ["React · Next.js · Mapbox"] },
  ],
};
// Node ids and positions are the same in both languages; the hover rules come from either.
const nodes = NODES.pt;

/** `from`→`to` follows the path direction; `both` also sends packets back. */
const edges: { from: NodeId; to: NodeId; d: string; label: string; en?: string; lx: number; ly: number; both: boolean; dur: number }[] = [
  { from: "iot", to: "geo", d: "M190 62 H295", label: "HTTP · TCP", lx: 210, ly: 54, both: false, dur: 1.4 },
  { from: "geo", to: "api", d: "M380 94 V150", label: "contratos", en: "contracts", lx: 388, ly: 126, both: true, dur: 1.8 },
  { from: "api", to: "web", d: "M465 196 H570", label: "WebSocket · SSE", lx: 474, ly: 188, both: false, dur: 1.4 },
  { from: "api", to: "outbox", d: "M295 196 H190", label: "assíncrono", en: "async", lx: 200, ly: 188, both: true, dur: 1.8 },
];

// Hovering a node dims every wire and box it isn't connected to.
const hoverCss = nodes
  .map(
    (n) =>
      `.arch:has([data-node="${n.id}"]:hover) [data-edge]:not([data-${n.id}]){opacity:.15}` +
      `.arch:has([data-node="${n.id}"]:hover) [data-node]:not([data-node="${n.id}"]):not([data-near-${n.id}]){opacity:.35}`,
  )
  .join("");

const neighbours = (id: NodeId) =>
  Object.fromEntries(
    edges.filter((e) => e.from === id || e.to === id).map((e) => [`data-near-${e.from === id ? e.to : e.from}`, ""]),
  );

export function ArchDiagram({ lang = "pt" }: { lang?: Lang }) {
  const nodes = NODES[lang];
  return (
    <figure>
      <style>{hoverCss}</style>
      <div className="crop">
        <div className="overflow-x-auto border border-line bg-sheet">
          <div data-r="" className="arch plot min-w-[620px] p-3">
            <svg
              viewBox="0 0 760 286"
              className="w-full font-mono"
              role="img"
              aria-label={tr(
                lang,
                "Diagrama: dispositivos IoT enviam telemetria por HTTP e TCP para o microserviço geoespacial, que conversa com a API principal; a API usa filas assíncronas e transmite em tempo real para a aplicação web por WebSocket e SSE.",
                "Diagram: IoT devices send telemetry over HTTP and TCP to the geospatial microservice, which talks to the main API; the API uses asynchronous queues and streams to the web application in real time over WebSocket and SSE.",
              )}
            >
              <defs>
                <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0 0 L10 5 L0 10 z" style={{ fill: "var(--ink)" }} />
                </marker>
              </defs>

              {edges.map((e, i) => (
                <g key={e.label} data-edge="" {...{ [`data-${e.from}`]: "", [`data-${e.to}`]: "" }} className="arch-edge">
                  <path
                    id={`edge-${i}`}
                    d={e.d}
                    pathLength={1}
                    fill="none"
                    className="arch-wire"
                    style={{ stroke: "var(--ink)", transitionDelay: `${0.5 + i * 0.15}s` }}
                    strokeWidth="1.2"
                    markerEnd="url(#arr)"
                    markerStart={e.both ? "url(#arr)" : undefined}
                  />
                  <text x={e.lx} y={e.ly} fontSize="10.5" style={{ fill: "var(--accent)" }}>
                    {lang === "en" ? (e.en ?? e.label) : e.label}
                  </text>
                  {/* Telemetry packets */}
                  {[0, 0.5].map((offset) => (
                    <circle key={offset} r="3" className="arch-packet" style={{ fill: "var(--accent)" }}>
                      <animateMotion dur={`${e.dur}s`} begin={`${offset * e.dur}s`} repeatCount="indefinite" rotate="auto">
                        <mpath href={`#edge-${i}`} />
                      </animateMotion>
                    </circle>
                  ))}
                  {e.both && (
                    <circle r="3" className="arch-packet" style={{ fill: "var(--ink)" }}>
                      <animateMotion dur={`${e.dur}s`} begin={`${e.dur * 0.25}s`} repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                        <mpath href={`#edge-${i}`} />
                      </animateMotion>
                    </circle>
                  )}
                </g>
              ))}

              {nodes.map((n, i) => (
                <g key={n.id} data-node={n.id} {...neighbours(n.id)} className="arch-node" style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
                  <rect
                    x={n.x}
                    y={n.y}
                    width={W}
                    height={n.h}
                    style={{ fill: "var(--sheet)", stroke: n.main ? "var(--accent)" : "var(--ink)" }}
                    strokeWidth={n.main ? 1.8 : 1.2}
                  />
                  <text x={n.x + 12} y={n.y + 24} fontSize="12.5" fontWeight="600" style={{ fill: "var(--ink)" }}>
                    {n.title}
                  </text>
                  {n.sub.map((s, si) => (
                    <text key={s} x={n.x + 12} y={n.y + 42 + si * 16} fontSize="10.5" style={{ fill: "var(--muted)" }}>
                      {s}
                    </text>
                  ))}
                </g>
              ))}

              <text x="20" y="280" fontSize="9.5" style={{ fill: "var(--faint)" }}>
                {tr(lang, "ESQUEMÁTICO · SEM ESCALA", "SCHEMATIC · NOT TO SCALE")} · DEPLOY: AWS (EC2/ECR) · DOCKER · NGINX · GITHUB ACTIONS
              </text>
            </svg>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 font-mono text-[11px] text-muted">
        <span className="text-accent">FIG. 01</span> —{" "}
        {tr(lang, "Sistema distribuído em três serviços. Passe o mouse numa caixa para ver os fluxos dela.", "A distributed system in three services. Hover a box to see its flows.")}
      </figcaption>
    </figure>
  );
}
