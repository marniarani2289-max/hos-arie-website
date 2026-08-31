import { ImageResponse } from "next/og";

export const alt = "LexNusa Legal AI - Human Legal Judgment. AI-Ready Intelligence.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#0D1B2A", color: "white", padding: "72px 82px", borderTop: "14px solid #C9A24B" }}>
      <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 4, color: "#C9A24B" }}>LEXNUSA LEGAL AI</div>
      <div style={{ marginTop: 34, fontSize: 64, lineHeight: 1.05, fontWeight: 800 }}>Human Legal Judgment.</div>
      <div style={{ marginTop: 8, fontSize: 64, lineHeight: 1.05, fontWeight: 800, color: "#69C2C1" }}>AI-Ready Intelligence.</div>
      <div style={{ marginTop: 42, fontSize: 28, color: "#D5DEE8" }}>Boutique Legal Intelligence & AI Evaluation</div>
      <div style={{ marginTop: 18, fontSize: 23, color: "#D5DEE8" }}>Indonesia & ASEAN · LEX-EVAL™ · Legal AI Benchmarking</div>
      <div style={{ marginTop: 46, display: "flex", width: "fit-content", borderRadius: 14, background: "#0E6B6F", padding: "15px 24px", fontSize: 21, fontWeight: 700 }}>www.hossibarani.com/lexnusa</div>
    </div>,
    size
  );
}
