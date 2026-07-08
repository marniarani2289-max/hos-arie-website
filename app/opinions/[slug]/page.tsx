import {groq} from "next-sanity";
import {PortableText} from "@portabletext/react";
import {sanityFetch} from "../../../sanity/lib/live";

const opinionQuery = groq`
*[_type == "opinion" && slug.current == $slug][0]{
  title,
  topic,
  summary,
  publishedAt,
  body,
  "image": coverImage.asset->url
}
`;

export default async function OpinionDetailPage({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;

  const {data} = await sanityFetch({
    query: opinionQuery,
    params: {slug},
  });

  const opinion = data as any;

  if (!opinion) {
    return <main className="p-20">Opinion not found.</main>;
  }

  return (
    <main className="bg-white px-8 py-24 text-gray-900">
      <article className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
          Opinion
        </p>

        <h1 className="mt-6 text-5xl font-extrabold leading-tight">
          {opinion.title}
        </h1>

        <p className="mt-6 text-xl leading-8 text-gray-600">
          {opinion.summary}
        </p>

        {opinion.image && (
          <div className="mt-10 overflow-hidden rounded-3xl">
            <img
              src={opinion.image}
              alt={opinion.title}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        <div className="mt-12 prose prose-lg max-w-none">
          <PortableText value={opinion.body} />
        </div>
      </article>
    </main>
  );
}