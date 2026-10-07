// o = outline, b = body, s = screen, e = eye, a = antenna light
const ROBOT = [
  "      aa      ",
  "       o      ",
  " oooooooooooo ",
  " obbbbbbbbbbo ",
  " obssssssssbo ",
  " obseesseesbo ",
  " obseesseesbo ",
  " obssssssssbo ",
  " obbbbbbbbbbo ",
  " oooooooooooo ",
  "   obbbbbbo   ",
  "oo obbbbbbo oo",
  "   oooooooo   ",
  "   o o  o o   ",
  "  oo o  o oo  ",
];

const FILL: Record<string, string> = { o: "var(--ink)", b: "var(--accent)", s: "var(--ink)", a: "var(--accent)" };

function cells(match: (c: string) => boolean) {
  return ROBOT.flatMap((row, y) =>
    [...row].flatMap((c, x) =>
      match(c) ? [<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" style={{ fill: FILL[c] ?? "var(--sheet)" }} />] : [],
    ),
  );
}

/** The little pixel robot. Eyes blink on their own. */
export function PixelRobot({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 14 15" width={size} height={(size * 15) / 14} shapeRendering="crispEdges" className={className} aria-hidden>
      {cells((c) => c !== " " && c !== "e")}
      <g className="animate-blink-slow">{cells((c) => c === "e")}</g>
    </svg>
  );
}
