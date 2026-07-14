import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.hossibarani.com",
      lastModified: new Date(),
    },
    {
      url: "https://www.hossibarani.com/opinions",
      lastModified: new Date(),
    },
    {
      url: "https://www.hossibarani.com/publications",
      lastModified: new Date(),
    },
    {
      url: "https://www.hossibarani.com/research",
      lastModified: new Date(),
    },
  ];
}