import Link from "next/link";
import { groq } from "next-sanity";
import { sanityFetch } from "../../sanity/lib/live";

const newsQuery = groq`
*[_type == "news"] | order(publishedAt desc){
  title,
  slug,
  summary,
  publishedAt,
  "coverImage": coverImage.asset->url
}
`;

export default async function News() {
  const { data } = await sanityFetch({
    query: newsQuery,
  });

  const news = Array.isArray(data) ? data : [];

  return (
    <section id="news" className="bg-white px-8 py-28">
      <div className="mx-auto max-w-7xl">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
          News
        </p>

        <h2 className="mt-4 text-5xl font-extrabold text-gray-900">
          Latest News & Updates
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          Selected news, media commentary, academic updates, and public scholarship activities.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          {news.map((item: any) => (

            <article
              key={item.slug.current}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >

              {item.coverImage && (
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="h-56 w-full object-cover"
                />
              )}

              <div className="p-8">

                <span className="text-sm font-medium text-gray-500">
                  {item.publishedAt
                    ? new Date(item.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </span>

                <h3 className="mt-5 text-2xl font-bold leading-tight text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-5 leading-7 text-gray-600">
                  {item.summary}
                </p>

                <Link
                  href={`/news/${item.slug.current}`}
                  className="mt-8 inline-flex font-semibold text-amber-700 hover:text-black"
                >
                  Read More →
                </Link>

              </div>

            </article>

          ))}

        </div>

      </div>
    </section>
  );
}