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
          width: "100%",
          height: "100%",
          background: "#0f172a",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          fontFamily: "Arial",
        }}
      >
        <div style={{fontSize: 28, color: "#f59e0b", letterSpacing: 6}}>
          DR. HOS ARIE SIBARANI
        </div>

        <div>
          <div style={{fontSize: 72, fontWeight: 800, lineHeight: 1.05}}>
            Legal Scholar
          </div>
          <div style={{marginTop: 24, fontSize: 34, color: "#cbd5e1"}}>
            Constitutional Theory • Malay Ethical Constitutionalism • Raja Ali Haji
          </div>
        </div>

        <div style={{fontSize: 26, color: "#fbbf24"}}>
          www.hossibarani.com
        </div>
      </div>
    ),
    size
  );
}