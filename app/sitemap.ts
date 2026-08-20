import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.hossibarani.com";

  return [
    {
      url: base,
      priority: 1,
      changeFrequency: "weekly",
    },

    {
      url: `${base}/about`,
      priority: 0.9,
    },

    {
      url: `${base}/research`,
      priority: 0.9,
    },

    {
      url: `${base}/publications`,
      priority: 0.9,
    },

    {
      url: `${base}/opinions`,
      priority: 0.9,
    },

    {
      url: `${base}/gallery`,
      priority: 0.8,
    },

    {
      url: `${base}/raja-ali-haji`,
      priority: 0.95,
    },
    { url: `${base}/start`, priority: 0.95 },
    { url: `${base}/books`, priority: 0.8 },
    { url: `${base}/digital-archive`, priority: 0.8 },
  ];
}
