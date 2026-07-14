import type { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { sanityFetch } from "../sanity/lib/live";

type OpinionSitemapItem = {
  slug?: {
    current?: string;
  };
  publishedAt?: string;
  updatedAt?: string;
};

const siteUrl = "https://www.hossibarani.com";

const opinionsSitemapQuery = groq`
  *[
    _type == "opinion" &&
    defined(slug.current)
  ]
  | order(coalesce(publishedAt, _updatedAt) desc){
    slug,
    publishedAt,
    "updatedAt": _updatedAt
  }
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await sanityFetch({
    query: opinionsSitemapQuery,
  });

  const opinions: OpinionSitemapItem[] = Array.isArray(data)
    ? (data as OpinionSitemapItem[])
    : [];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/opinions`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/raja-ali-haji`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/academic-cv.pdf`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const opinionPages: MetadataRoute.Sitemap = opinions
    .filter((opinion) => opinion.slug?.current)
    .map((opinion) => ({
      url: `${siteUrl}/opinions/${opinion.slug!.current}`,
      lastModified: opinion.updatedAt
        ? new Date(opinion.updatedAt)
        : opinion.publishedAt
          ? new Date(opinion.publishedAt)
          : new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...staticPages, ...opinionPages];
}