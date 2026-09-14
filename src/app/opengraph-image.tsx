import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "HomeHacks - Smart Tips for Everyday Living";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "72px",
        background:
          "linear-gradient(135deg, #14532d 0%, #166534 55%, #0f3d28 100%)",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 42,
          fontWeight: 700,
        }}
      >
        <span style={{ marginRight: 18 }}>Home</span>
        <span style={{ color: "#86efac" }}>Hacks</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 34,
          fontSize: 68,
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        Smart Tips for Everyday Living
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 30,
          color: "#dcfce7",
        }}
      >
        Cleaning, kitchen, DIY, and organization ideas that work.
      </div>
      <div style={{ display: "flex", marginTop: 54, fontSize: 92 }}>🏠</div>
    </div>,
    { ...size },
  );
}
