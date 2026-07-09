import {ImageResponse} from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0f172a",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{display: "flex", color: "#f59e0b", fontSize: 28, letterSpacing: 6}}>
          DR. HOS ARIE SIBARANI
        </div>

        <div style={{display: "flex", flexDirection: "column"}}>
          <div style={{display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05}}>
            Legal Scholar
          </div>

          <div style={{display: "flex", marginTop: 28, fontSize: 34, color: "#cbd5e1"}}>
            Constitutional Theory
          </div>

          <div style={{display: "flex", marginTop: 10, fontSize: 34, color: "#cbd5e1"}}>
            Malay Ethical Constitutionalism
          </div>

          <div style={{display: "flex", marginTop: 10, fontSize: 34, color: "#cbd5e1"}}>
            Raja Ali Haji Studies
          </div>
        </div>

        <div style={{display: "flex", fontSize: 26, color: "#fbbf24"}}>
          www.hossibarani.com
        </div>
      </div>
    ),
    size
  );
}