import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "1200px",
          height: "630px",
          backgroundColor: "#0f172a",
          color: "#ffffff",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#f59e0b",
            fontWeight: 700,
            marginBottom: 30,
          }}
        >
          DR. HOS ARIE SIBARANI
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Legal Scholar
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#cbd5e1",
            marginBottom: 40,
          }}
        >
          Constitutional Theory • Malay Ethical Constitutionalism
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#fbbf24",
          }}
        >
          www.hossibarani.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}