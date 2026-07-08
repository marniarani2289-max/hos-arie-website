import {groq} from "next-sanity";
import {PortableText} from "@portabletext/react";
import {sanityFetch} from "../../../sanity/lib/live";

const newsDetailQuery = groq`
  *[_type == "news" && slug.current == $slug][0]{
    title,
    summary,
    publishedAt,
    body
  }
`;

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;

  const {data} = await sanityFetch({
    query: newsDetailQuery,
    params: {slug},
  });

  const news = data as any;

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

        <div className="mt-12 prose prose-lg max-w-none">
          <PortableText value={news.body} />
        </div>
      </article>
    </main>
  );
}