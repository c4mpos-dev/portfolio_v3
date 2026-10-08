import { ImageResponse } from "next/og";
import { logoCells } from "@/components/logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the pixel mark in paper on an ink tile, til in orange. */
export default function AppleIcon() {
  // 16-unit tile with the 6×10 mark centered at (5, 3), same as the favicon.
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#1b1e23" }}>
        <svg width="180" height="180" viewBox="0 0 16 16" shapeRendering="crispEdges">
          {logoCells().map((c) => (
            <rect key={`${c.x}-${c.y}`} x={c.x + 5} y={c.y + 3} width="1" height="1" fill={c.accent ? "#ff6a3d" : "#fbfaf6"} />
          ))}
        </svg>
      </div>
    ),
    size,
  );
}
