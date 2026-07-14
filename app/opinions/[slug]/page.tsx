import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "../../../sanity/lib/live";
import type { Metadata } from "next";

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
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { data } = await sanityFetch({
    query: opinionQuery,
    params: { slug },
  });

  const opinion = data as any;

  if (!opinion) {
    return {
      title: "Opinion",
    };
  }

  const title = opinion.title;
  const description =
    opinion.summary ??
    "Academic opinion by Dr. Hos Arie Rhamadhan Sibarani.";

  return {
    title,
    description,

    authors: [
      {
        name: "Dr. Hos Arie Rhamadhan Sibarani",
      },
    ],

    keywords: [
      "Constitutional Law",
      "Malay Ethical Constitutionalism",
      "Raja Ali Haji",
      "Constitutional Theory",
      "Indonesia",
      "Governance",
    ],

    openGraph: {
      title,
      description,
      type: "article",
      images: opinion.image ? [opinion.image] : [],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: opinion.image ? [opinion.image] : [],
    },
  };
}

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
    : "Publication date unavailable";

  return (
    <main className="bg-white px-6 py-20 text-slate-900 md:px-8 md:py-28">
      <article className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
          Opinion
        </p>

        <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-6xl">
          {opinion.title}
        </h1>

        {opinion.summary && (
          <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-600 md:text-2xl md:leading-10">
            {opinion.summary}
          </p>
        )}

        <div className="mt-10 grid gap-8 border-y border-slate-200 py-7 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Author
            </p>

            <p className="mt-2 font-semibold text-slate-950">
              Dr. Hos Arie Rhamadhan Sibarani
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Published
            </p>

            <p className="mt-2 font-semibold text-slate-950">
              {formattedDate}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Topic
            </p>

            <p className="mt-2 font-semibold text-slate-950">
              {opinion.topic || "Law and Public Affairs"}
            </p>
          </div>
        </div>

        {opinion.image && (
          <figure className="mt-12">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
              <img
                src={opinion.image}
                alt={opinion.title ?? "Opinion cover image"}
                className="h-[280px] w-full object-cover sm:h-[380px] lg:h-[460px]"
              />
            </div>

            <figcaption className="mt-3 text-sm leading-6 text-slate-500">
              Cover image for this opinion.
            </figcaption>
          </figure>
        )}

        <div className="mt-16 border-t border-slate-200 pt-12">
          <div className="article-content prose prose-lg max-w-none prose-headings:text-slate-950 prose-p:text-slate-700 prose-a:text-amber-700 prose-blockquote:border-amber-700 prose-blockquote:text-slate-700">
            {opinion.body ? (
              <PortableText value={opinion.body} />
            ) : (
              <p>This opinion does not yet contain article content.</p>
            )}
          </div>
        </div>

        <aside className="mt-16 rounded-3xl border border-slate-200 bg-stone-50 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            About the Author
          </p>

          <h2 className="mt-3 text-2xl font-bold text-slate-950">
            Dr. Hos Arie Rhamadhan Sibarani
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-slate-600">
            Constitutional law scholar whose research focuses on Raja Ali Haji,
            Malay Ethical Constitutionalism, indigenous constitutionalism, and
            comparative constitutional theory.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/academic-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-amber-700"
            >
              Academic CV
            </a>

            <a
              href="https://scholar.google.com/citations?user=teno_PYAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:border-amber-700 hover:text-amber-800"
            >
              Google Scholar
            </a>
          </div>
        </aside>

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