import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "../../../sanity/lib/live";

const opinionQuery = groq`
  *[
    _type == "opinion" &&
    slug.current == $slug
  ][0]{
    _id,
    title,
    summary,
    topic,
    publishedAt,
    body,
    "image": coverImage.asset->url
  }
`;

export default async function OpinionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data } = await sanityFetch({
    query: opinionQuery,
    params: { slug },
  });

  const opinion = data as
    | {
        _id: string;
        title?: string;
        summary?: string;
        topic?: string;
        publishedAt?: string;
        body?: any[];
        image?: string;
      }
    | null;

  if (!opinion) {
    return (
      <main className="min-h-screen bg-white px-6 py-24 md:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
            Opinion
          </p>

          <h1 className="mt-6 text-4xl font-bold text-slate-950">
            Opinion not found
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            The requested opinion may not have been published, or the link may
            be incorrect.
          </p>

          <a
            href="/opinions"
            className="mt-8 inline-flex rounded-xl bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-amber-700"
          >
            View all opinions
          </a>
        </div>
      </main>
    );
  }

  const formattedDate = opinion.publishedAt
    ? new Date(opinion.publishedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <main className="bg-white px-6 py-20 text-slate-900 md:px-8 md:py-28">
      <article className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="font-semibold uppercase tracking-[0.25em] text-amber-700">
            Opinion
          </span>

          {opinion.topic && (
            <span className="text-slate-500">{opinion.topic}</span>
          )}

          {formattedDate && (
            <span className="text-slate-500">{formattedDate}</span>
          )}
        </div>

        <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-6xl">
          {opinion.title}
        </h1>

        {opinion.summary && (
          <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-600 md:text-2xl md:leading-10">
            {opinion.summary}
          </p>
        )}

        {opinion.image && (
          <div className="mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            <img
              src={opinion.image}
              alt={opinion.title ?? "Opinion cover image"}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        <div className="mt-16 border-t border-slate-200 pt-12">
          <div className="article-content prose prose-lg max-w-none prose-headings:text-slate-950 prose-p:text-slate-700 prose-a:text-amber-700">
            {opinion.body ? (
              <PortableText value={opinion.body} />
            ) : (
              <p>This opinion does not yet contain article content.</p>
            )}
          </div>
        </div>

        <div className="mt-16 border-t border-slate-200 pt-8">
          <a
            href="/opinions"
            className="inline-flex font-semibold text-amber-700 transition hover:text-amber-900"
          >
            ← Back to all opinions
          </a>
        </div>
      </article>
    </main>
  );
}