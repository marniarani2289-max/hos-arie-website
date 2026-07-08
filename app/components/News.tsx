import {groq} from "next-sanity";
import {sanityFetch} from "../../sanity/lib/live";

const newsQuery = groq`
  *[_type == "news"] | order(date desc) {
    title,
    category,
    date,
    source,
    description,
    link
  }
`;

export default async function News() {
  const {data} = await sanityFetch({
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
              key={item.title}
              className="rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
                  {item.category}
                </span>

                <span className="text-sm font-medium text-gray-500">
                  {item.date}
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-bold leading-tight text-gray-900">
                {item.title}
              </h3>

              <p className="mt-3 text-sm font-semibold text-amber-700">
                {item.source}
              </p>

              <p className="mt-5 leading-7 text-gray-600">
                {item.description}
              </p>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  className="mt-8 inline-flex font-semibold text-gray-900 hover:text-amber-700"
                >
                  Read More →
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}