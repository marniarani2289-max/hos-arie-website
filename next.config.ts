import type { NextConfig } from "next";

const base = "https://www.hossibarani.com";

const bilingualPages = [
  { en: "/", id: "/id" },
  { en: "/about", id: "/id/about" },
  { en: "/research", id: "/id/research" },
  { en: "/publications", id: "/id/publications" },
  { en: "/contact", id: "/id/contact" },
] as const;

function alternateLinkHeader(enPath: string, idPath: string) {
  return [
    `<${base}${enPath}>; rel="alternate"; hreflang="en"`,
    `<${base}${idPath}>; rel="alternate"; hreflang="id"`,
    `<${base}${enPath}>; rel="alternate"; hreflang="x-default"`,
  ].join(", ");
}

const nextConfig: NextConfig = {
  async rewrites() {
    return { beforeFiles: [
      { source: "/dkpp", destination: "/dkpp/index.html" },
      { source: "/coaching-mentoring", destination: "/coaching-mentoring/index.html" },
      { source: "/clip-studio", destination: "/clip-studio/index.html" },
      { source: "/blue-education", destination: "/blue-education/portal/index.html" },
      { source: "/blue-education/jbe", destination: "/blue-education/portal/journal.html" },
    ], afterFiles: [], fallback: [] };
  },
  async headers() {
    const bilingualHeaders = bilingualPages.flatMap(({ en, id }) => {
      const value = alternateLinkHeader(en, id);

      return [
        {
          source: en,
          headers: [{ key: "Link", value }],
        },
        {
          source: id,
          headers: [{ key: "Link", value }],
        },
      ];
    });

    return [
      ...bilingualHeaders,
      {
        source: "/biaf/documents/ASEAN_Summit_Working_Draft_v1_1.pdf",
        headers: [
          { key: "Content-Type", value: "application/pdf" },
          { key: "Content-Disposition", value: 'attachment; filename="ASEAN_Summit_Working_Draft_v1_1.pdf"' },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
      {
        source: "/manifest.webmanifest",
        headers: [
          { key: "Content-Type", value: "application/manifest+json" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
    ];
  },
};

export default nextConfig;
