import { ImageResponse } from "next/og";

export const alt = "BIAF — Batam International Academic Forum. Dari Batam, mempertemukan gagasan.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#102c37", color: "#f8f7f2", padding: "62px 72px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 52, color: "#d9c18d", fontWeight: 700 }}>BIAF.</span>
        <span style={{ fontSize: 20, letterSpacing: 3 }}>BATAM · INDONESIA</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 72, lineHeight: 1.12 }}>Dari Batam,</span>
        <span style={{ fontSize: 72, lineHeight: 1.12, color: "#d9c18d" }}>mempertemukan gagasan.</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #657b80", paddingTop: 25, fontSize: 21 }}>
        <span>Batam International Academic Forum</span><span>hossibarani.com/biaf</span>
      </div>
    </div>, size,
  );
}
