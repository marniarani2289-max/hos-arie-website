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
          padding: "64px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "28px",
            color: "#f59e0b",
            letterSpacing: "6px",
          }}
        >
          DR. HOS ARIE SIBARANI
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "76px",
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: "120px",
          }}
        >
          Legal Scholar
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "34px",
            color: "#cbd5e1",
            marginTop: "28px",
          }}
        >
          Constitutional Theory • Malay Ethical Constitutionalism
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "34px",
            color: "#cbd5e1",
            marginTop: "12px",
          }}
        >
          Raja Ali Haji Studies • Legal Thought
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "26px",
            color: "#fbbf24",
            marginTop: "auto",
          }}
        >
          www.hossibarani.com
        </div>
      </div>
    ),
    size
  );
}