/*
 * The mark: a pixel "C" (Cauã Campos) under the til of "Cauã" — the one letter
 * that makes the name unmistakable — in the same pixel language as the robot mascot.
 *
 * Drawn on an integer grid (6 × 10) so that, on the 16px favicon, every logo pixel
 * lands on a screen pixel. src/app/icon.svg, src/app/apple-icon.tsx and
 * public/brand/*.svg are built from LOGO_PIXELS — keep them in sync.
 */
export const LOGO_PIXELS = {
  til: [
    ".XX..X", //
    "X..XX.",
  ],
  c: [
    ".XXXX.",
    "XX..XX",
    "XX....",
    "XX....",
    "XX....",
    "XX..XX",
    ".XXXX.",
  ],
  /** Row where the C starts (one empty row under the til). */
  cTop: 3,
  width: 6,
  height: 10,
};

export type Cell = { x: number; y: number; accent: boolean };

/** Every filled pixel of the mark, in grid units. */
export function logoCells(): Cell[] {
  const cells: Cell[] = [];
  LOGO_PIXELS.til.forEach((row, y) => [...row].forEach((ch, x) => ch === "X" && cells.push({ x, y, accent: true })));
  LOGO_PIXELS.c.forEach((row, y) =>
    [...row].forEach((ch, x) => ch === "X" && cells.push({ x, y: y + LOGO_PIXELS.cTop, accent: false })),
  );
  return cells;
}

const CELLS = logoCells();

/** The mark alone, in a square box. Inherits text color; the til uses the accent. */
export function LogoMark({ className = "size-6", title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="-2 0 10 10"
      shapeRendering="crispEdges"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {CELLS.map((c) => (
        <rect
          key={`${c.x}-${c.y}`}
          x={c.x}
          y={c.y}
          width="1"
          height="1"
          style={{ fill: c.accent ? "var(--accent)" : "currentColor" }}
        />
      ))}
    </svg>
  );
}

/** Mark + name, for the header. */
export function LogoLockup({ withRole = true }: { withRole?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="size-[26px]" />
      <span className="flex flex-col leading-none">
        <span className="display text-[13px] tracking-[0.02em] whitespace-nowrap uppercase">Cauã Campos</span>
        {withRole && (
          <span className="mt-1 font-mono text-[9.5px] tracking-[0.14em] whitespace-nowrap text-faint uppercase">
            Full stack · Resende
          </span>
        )}
      </span>
    </span>
  );
}
