import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Hossibarani Digital Ecosystem",
    short_name: "Hossibarani",
    description:
      "Research, law, education, and responsible AI in the Hossibarani Digital Ecosystem.",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    orientation: "portrait-primary",
    categories: ["education", "productivity"],
    lang: "id",
    icons: [
      {
        src: "/pwa/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Raja Ali Haji Learning",
        short_name: "RAH Learning",
        url: "/raja-ali-haji/programmes/pemikiran-raja-ali-haji?source=pwa",
        icons: [{ src: "/pwa/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "SIMAKS",
        short_name: "SIMAKS",
        url: "/simak?source=pwa",
        icons: [{ src: "/pwa/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "LexNusa AI",
        short_name: "LexNusa",
        url: "/lexnusa?source=pwa",
        icons: [{ src: "/pwa/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
