import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Embed the existing emblem so image generation never depends on an HTTP fetch.
export async function logoDataUrl() {
  const logo = await readFile(join(process.cwd(), "public/ismi-kepri/logo.jpeg"));
  return `data:image/jpeg;base64,${logo.toString("base64")}`;
}

export async function renderIcon(size: number) {
  const src = await logoDataUrl();
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#edbd12", alignItems: "center", justifyContent: "center" }}>
      {/* ImageResponse uses plain images, not the Next.js image optimizer. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="ISMI Kepri" width={size} height={size} style={{ objectFit: "contain" }} />
    </div>,
    { width: size, height: size }
  );
}
