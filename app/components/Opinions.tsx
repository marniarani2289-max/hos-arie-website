import Link from "next/link";
import { groq } from "next-sanity";
import { sanityFetch } from "../../sanity/lib/live";

const opinionsQuery = groq`
*[
  _type == "opinion" &&
  defined(slug.current)
]
| order(publishedAt desc)[0...6]{
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

  const opinions = Array.isArray(data) ? data : [];

  return (
    <section
      id="opinions"
      className="bg-white px-6 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
          Opinions & Commentary
        </p>

        <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Latest Opinions
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Essays and commentary on constitutional law, governance, Malay
              intellectual history, public policy, and contemporary legal
              development.
            </p>
          </div>

          <Link
            href="/opinions"
            className="inline-flex w-fit font-semibold text-amber-700 transition hover:text-amber-900"
          >
            View all opinions →
          </Link>
        </div>

        {opinions.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-slate-600">
            No published opinions are available yet.
          </div>
        ) : (
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {opinions.map((opinion: any) => (
              <article
                key={opinion._id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {opinion.coverImage && (
                  <img
                    src={opinion.coverImage}
                    alt={opinion.title}
                    className="h-56 w-full object-cover"
                  />
                )}

                <div className="p-7">
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    {opinion.topic && (
                      <span className="font-semibold text-amber-700">
                        {opinion.topic}
                      </span>
                    )}

                    {opinion.publishedAt && (
                      <span className="text-slate-500">
                        {new Date(opinion.publishedAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 text-2xl font-bold leading-8 text-slate-950">
                    {opinion.title}
                  </h3>

                  {opinion.summary && (
                    <p className="mt-4 leading-7 text-slate-600">
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
}