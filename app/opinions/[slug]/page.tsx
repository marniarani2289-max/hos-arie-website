import type { Metadata } from "next";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";

import ArticleSchema from "@/app/components/seo/ArticleSchema";
import { sanityFetch } from "../../../sanity/lib/live";

type Opinion = {
  _id: string;
  title?: string;
  summary?: string;
  topic?: string;
  publishedAt?: string;
  body?: any[];
  image?: string;
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

const siteUrl = "https://www.hossibarani.com";
const authorName = "Dr. Hos Arie Rhamadhan Sibarani";
const defaultDescription =
  "Academic opinion by Dr. Hos Arie Rhamadhan Sibarani.";
const defaultImage = `${siteUrl}/opengraph-image.png`;

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

async function getOpinion(slug: string): Promise<Opinion | null> {
  const { data } = await sanityFetch({
    query: opinionQuery,
    params: { slug },
  });

  return (data as Opinion | null) ?? null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const opinion = await getOpinion(slug);

  if (!opinion) {
    return {
      title: "Opinion Not Found",
      description: "The requested opinion could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = opinion.title || "Opinion";
  const description = opinion.summary || defaultDescription;
  const canonicalUrl = `${siteUrl}/opinions/${slug}`;
  const socialImage = opinion.image || defaultImage;

  return {
    title,
    description,

    authors: [
      {
        name: authorName,
        url: siteUrl,
      },
    ],

    creator: authorName,
    publisher: authorName,

    keywords: [
      opinion.topic || "Law and Public Affairs",
      "Constitutional Law",
      "Malay Ethical Constitutionalism",
      "Raja Ali Haji",
      "Constitutional Theory",
      "Indigenous Constitutionalism",
      "Indonesia",
      "Governance",
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: authorName,
      type: "article",
      locale: "en_US",
      publishedTime: opinion.publishedAt,
      authors: [siteUrl],
      images: [
        {
          url: socialImage,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function OpinionDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const opinion = await getOpinion(slug);

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
    <>
      <ArticleSchema
        title={opinion.title || "Opinion"}
        description={opinion.summary}
        image={opinion.image}
        publishedAt={opinion.publishedAt}
        slug={slug}
      />

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
                {authorName}
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
                  alt={opinion.title || "Opinion cover image"}
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
              {authorName}
            </h2>

            <p className="mt-4 max-w-3xl leading-8 text-slate-600">
              Constitutional law scholar whose research focuses on Raja Ali
              Haji, Malay Ethical Constitutionalism, indigenous
              constitutionalism, and comparative constitutional theory.
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
    </>
  );
}