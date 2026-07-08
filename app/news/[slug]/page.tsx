import type {Metadata} from "next";
import {groq} from "next-sanity";
import {PortableText} from "@portabletext/react";
import {sanityFetch} from "../../../sanity/lib/live";

const newsDetailQuery = groq`
*[_type == "news" && slug.current == $slug][0]{
  title,
  summary,
  publishedAt,
  body,
  "image": coverImage.asset->url + "?w=1200&h=630&fit=crop&auto=format"
}
`;

async function getNews(slug: string) {
  const {data} = await sanityFetch({
    query: newsDetailQuery,
    params: {slug},
  });

  return data as any;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>;
}): Promise<Metadata> {
  const {slug} = await params;
  const news = await getNews(slug);

  if (!news) {
    return {
      title: "News not found",
    };
  }

  const imageUrl = news.image || "https://www.hossibarani.com/og-image.jpg";

  return {
    metadataBase: new URL("https://www.hossibarani.com"),
    title: news.title,
    description: news.summary,
    openGraph: {
      title: news.title,
      description: news.summary,
      url: `https://www.hossibarani.com/news/${slug}`,
      siteName: "Dr. Hos Arie Sibarani | Legal Scholar",
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: news.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.summary,
      images: [imageUrl],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const news = await getNews(slug);

  if (!news) {
    return <main className="p-20">News not found.</main>;
  }

  return (
    <main className="bg-white px-8 py-24 text-gray-900">
      <article className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
          News
        </p>

        <h1 className="mt-6 text-5xl font-extrabold leading-tight">
          {news.title}
        </h1>

        <p className="mt-6 text-xl leading-8 text-gray-600">
          {news.summary}
        </p>

        {news.image && (
          <div className="mt-10 overflow-hidden rounded-3xl">
            <img
              src={news.image}
              alt={news.title}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        <div className="mt-12 prose prose-lg max-w-none">
          <PortableText value={news.body} />
        </div>
      </article>
    </main>
  );
}