import { ImageResponse } from "next/og";
import { logoDataUrl } from "./brand-image";

export const alt = "ISMI Kepulauan Riau — Ikatan Sarjana Melayu Indonesia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await logoDataUrl();
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#163d32", color: "#fbf8ee", padding: "64px", alignItems: "center", borderBottom: "14px solid #d9b86b" }}>
      <div style={{ display: "flex", width: 370, height: 370, flexShrink: 0, padding: 12, background: "#d9b86b", borderRadius: 28, marginRight: 54 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="Lambang ISMI Kepri" width={346} height={346} style={{ objectFit: "contain", borderRadius: 18 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontSize: 24, color: "#d9b86b", letterSpacing: 3, marginBottom: 22 }}>ILMU · ADAB · PENGABDIAN</div>
        <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.08 }}>ISMI KEPRI</div>
        <div style={{ fontSize: 29, lineHeight: 1.35, marginTop: 22 }}>Ikatan Sarjana Melayu Indonesia</div>
        <div style={{ fontSize: 27, color: "#d9b86b", marginTop: 8 }}>Kepulauan Riau</div>
        <div style={{ fontSize: 23, lineHeight: 1.5, marginTop: 30 }}>Merawat ilmu. Menguatkan Melayu.</div>
        <div style={{ fontSize: 22, lineHeight: 1.5 }}>Mengabdi untuk kepulauan.</div>
        <div style={{ fontSize: 20, color: "#c3d0c8", marginTop: 30 }}>hossibarani.com/ismi-kepri</div>
      </div>
    </div>,
    size
  );
}
