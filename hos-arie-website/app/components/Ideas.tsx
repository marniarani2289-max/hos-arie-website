import Link from "next/link";
import {groq} from "next-sanity";
import {sanityFetch} from "../../sanity/lib/live";

const ideasQuery = groq`
*[_type == "opinion"] | order(publishedAt desc){
  title,
  topic,
  summary,
  slug
}
`;

export default async function Ideas() {
  const {data} = await sanityFetch({
    query: ideasQuery,
  });

  const ideas = Array.isArray(data) ? data : [];

  return (
    <section id="ideas" className="bg-white py-28 px-8">
      <div className="mx-auto max-w-7xl">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
          Ideas
        </p>

        <h2 className="mt-4 text-5xl font-extrabold text-gray-900">
          Ideas & Reflections
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          Essays, reflections, constitutional thought, and public scholarship.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {ideas.map((idea: any) => (

            <article
              key={idea.slug?.current}
              className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >

              <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
                {idea.topic}
              </span>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                {idea.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {idea.summary}
              </p>

              <Link
                href={`/opinions/${idea.slug.current}`}
                className="mt-8 inline-block rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-amber-700"
              >
                Read More →
              </Link>

            </article>

          ))}

        </div>

      </div>
    </section>
  );
}