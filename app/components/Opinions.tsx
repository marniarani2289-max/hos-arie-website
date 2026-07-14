import Link from "next/link";
import { groq } from "next-sanity";
import { sanityFetch } from "../../sanity/lib/live";

type Opinion = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  summary?: string;
  topic?: string;
  publishedAt?: string;
  coverImage?: string;
};

const opinionsQuery = groq`
  *[
    _type == "opinion" &&
    defined(slug.current)
  ]
  | order(coalesce(publishedAt, _createdAt) desc)[0...6]{
    _id,
    title,
    slug,
    summary,
    topic,
    publishedAt,
    "coverImage": coverImage.asset->url
  }
`;

export default async function Opinions() {
  const { data } = await sanityFetch({
    query: opinionsQuery,
  });

  const opinions: Opinion[] = Array.isArray(data)
    ? (data as Opinion[])
    : [];

  const featuredOpinion = opinions[0];
  const otherOpinions = opinions.slice(1);

  return (
    <section
      id="opinions"
      className="border-y border-slate-200 bg-white px-6 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
              Opinions & Commentary
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Latest Opinions
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Essays and public commentary on constitutional law, governance,
              Malay intellectual history, education, public policy, and
              contemporary legal development.
            </p>
          </div>

          <Link
            href="/opinions"
            className="inline-flex w-fit items-center font-semibold text-amber-700 transition hover:text-amber-900"
          >
            View all opinions →
          </Link>
        </div>

        {opinions.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <p className="text-lg font-semibold text-slate-900">
              No published opinions are available yet.
            </p>

            <p className="mt-2 leading-7 text-slate-600">
              Publish an opinion in Sanity Studio and make sure its title,
              slug, and publication date are complete.
            </p>
          </div>
        ) : (
          <>
            {featuredOpinion && (
              <FeaturedOpinion opinion={featuredOpinion} />
            )}

            {otherOpinions.length > 0 && (
              <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {otherOpinions.map((opinion) => (
                  <OpinionCard
                    key={opinion._id}
                    opinion={opinion}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function FeaturedOpinion({
  opinion,
}: {
  opinion: Opinion;
}) {
  return (
    <article className="mt-14 overflow-hidden rounded-[2rem] border border-slate-200 bg-stone-50 shadow-sm">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="order-2 p-8 md:p-10 lg:order-1 lg:p-12">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-800">
              Featured Opinion
            </span>

            {opinion.topic && (
              <span className="font-semibold text-slate-600">
                {opinion.topic}
              </span>
            )}

            {opinion.publishedAt && (
              <span className="text-slate-500">
                {formatDate(opinion.publishedAt)}
              </span>
            )}
          </div>

          <h3 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-slate-950 md:text-4xl">
            {opinion.title}
          </h3>

          {opinion.summary && (
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              {opinion.summary}
            </p>
          )}

          <Link
            href={`/opinions/${opinion.slug.current}`}
            className="mt-8 inline-flex rounded-xl bg-slate-950 px-6 py-4 font-semibold text-white transition hover:bg-amber-700"
          >
            Read featured opinion
          </Link>
        </div>

        <div className="order-1 min-h-72 bg-slate-100 lg:order-2">
          {opinion.coverImage ? (
            <img
              src={opinion.coverImage}
              alt={opinion.title}
              className="h-full min-h-72 w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-72 items-center justify-center bg-gradient-to-br from-slate-950 to-slate-800 px-8 text-center">
              <p className="max-w-sm text-2xl font-bold leading-9 text-white">
                Constitutional law, public reasoning, and the Malay intellectual
                tradition.
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function OpinionCard({
  opinion,
}: {
  opinion: Opinion;
}) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="h-56 overflow-hidden bg-slate-100">
        {opinion.coverImage ? (
          <img
            src={opinion.coverImage}
            alt={opinion.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-amber-50 to-stone-100 p-8 text-center">
            <p className="text-lg font-bold leading-7 text-slate-800">
              {opinion.topic || "Opinion & Commentary"}
            </p>
          </div>
        )}
      </div>

      <div className="p-7">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {opinion.topic && (
            <span className="font-semibold text-amber-700">
              {opinion.topic}
            </span>
          )}

          {opinion.publishedAt && (
            <span className="text-slate-500">
              {formatDate(opinion.publishedAt)}
            </span>
          )}
        </div>

        <h3 className="mt-5 text-2xl font-bold leading-8 text-slate-950">
          {opinion.title}
        </h3>

        {opinion.summary && (
          <p className="mt-4 line-clamp-4 leading-7 text-slate-600">
            {opinion.summary}
          </p>
        )}

        <Link
          href={`/opinions/${opinion.slug.current}`}
          className="mt-7 inline-flex font-semibold text-amber-700 transition hover:text-amber-900"
        >
          Read opinion →
        </Link>
      </div>
    </article>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}