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
  async headers() {
    return bilingualPages.flatMap(({ en, id }) => {
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
  },
};

export default nextConfig;
