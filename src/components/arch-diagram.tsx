/**
 * Schematic of the Next Devices system described in the CV: three services
 * (web app, main API, geospatial microservice), device telemetry in, async
 * flows on the side, real-time out. Not to scale.
 */

type Node = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub: string[];
  main?: boolean;
};

const W = 170;
const nodes: Node[] = [
  {
    x: 20,
    y: 30,
    w: W,
    h: 64,
    title: "Dispositivos IoT",
    sub: ["telemetria em campo"],
  },
  {
    x: 20,
    y: 222,
    w: W,
    h: 64,
    title: "Outbox · filas",
    sub: ["workers · jobs agendados"],
  },
  {
    x: 295,
    y: 112,
    w: W,
    h: 92,
    title: "API principal",
    sub: ["NestJS · REST · Swagger", "Clean Arch · DDD", "JWT + roles"],
    main: true,
  },
  {
    x: 570,
    y: 30,
    w: W,
    h: 64,
    title: "Microserviço",
    sub: ["processamento geoespacial"],
  },
  {
    x: 570,
    y: 222,
    w: W,
    h: 64,
    title: "Aplicação web",
    sub: ["React · Next.js · Mapbox"],
  },
];

const edges = [
  {
    d: "M190 62 H242 V140 H295",
    label: "HTTP · TCP",
    lx: 196,
    ly: 54,
    both: false,
  },
  {
    d: "M465 140 H517 V62 H570",
    label: "contratos",
    lx: 474,
    ly: 54,
    both: true,
  },
  {
    d: "M465 176 H517 V254 H570",
    label: "WebSocket · SSE",
    lx: 472,
    ly: 272,
    both: false,
  },
  {
    d: "M295 176 H242 V254 H190",
    label: "assíncrono",
    lx: 196,
    ly: 272,
    both: true,
  },
];

export function ArchDiagram() {
  return (
    <figure>
      <div className="crop">
        <div className="overflow-x-auto border border-line bg-sheet">
          <div data-r="" className="plot min-w-[620px] p-3">
            <svg
              viewBox="0 0 760 316"
              className="w-full font-mono"
              role="img"
              aria-label="Diagrama: dispositivos IoT enviam telemetria por HTTP e TCP para a API principal, que conversa com o microserviço geoespacial, usa filas assíncronas e transmite em tempo real para a aplicação web por WebSocket e SSE."
            >
              <defs>
                <marker
                  id="arr"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M0 0 L10 5 L0 10 z" style={{ fill: "var(--ink)" }} />
                </marker>
              </defs>

              {edges.map((e) => (
                <g key={e.label}>
                  <path
                    d={e.d}
                    fill="none"
                    style={{ stroke: "var(--ink)" }}
                    strokeWidth="1.2"
                    markerEnd="url(#arr)"
                    markerStart={e.both ? "url(#arr)" : undefined}
                  />
                  <text
                    x={e.lx}
                    y={e.ly}
                    fontSize="10.5"
                    style={{ fill: "var(--accent)" }}
                  >
                    {e.label}
                  </text>
                </g>
              ))}

              {nodes.map((n) => (
                <g key={n.title}>
                  <rect
                    x={n.x}
                    y={n.y}
                    width={n.w}
                    height={n.h}
                    style={{
                      fill: "var(--sheet)",
                      stroke: n.main ? "var(--accent)" : "var(--ink)",
                    }}
                    strokeWidth={n.main ? 1.8 : 1.2}
                  />
                  <text
                    x={n.x + 12}
                    y={n.y + 24}
                    fontSize="12.5"
                    fontWeight="600"
                    style={{ fill: "var(--ink)" }}
                  >
                    {n.title}
                  </text>
                  {n.sub.map((s, i) => (
                    <text
                      key={s}
                      x={n.x + 12}
                      y={n.y + 42 + i * 16}
                      fontSize="10.5"
                      style={{ fill: "var(--muted)" }}
                    >
                      {s}
                    </text>
                  ))}
                </g>
              ))}

              <text
                x="20"
                y="310"
                fontSize="9.5"
                style={{ fill: "var(--faint)" }}
              >
                ESQUEMÁTICO · SEM ESCALA · DEPLOY: AWS (EC2/ECR) · DOCKER ·
                NGINX · GITHUB ACTIONS
              </text>
            </svg>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 font-mono text-[11px] text-muted">
        <span className="text-accent">FIG. 01</span> — Sistema distribuído em
        três serviços, com telemetria entrando e tempo real saindo.
      </figcaption>
    </figure>
  );
}
