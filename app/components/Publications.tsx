import {groq} from "next-sanity";
import {sanityFetch} from "../../sanity/lib/live";

const publicationsQuery = groq`
  *[_type == "publication"] | order(year desc) {
    title,
    journal,
    year,
    authors,
    abstract,
    doi,
    link,
    "pdfUrl": pdf.asset->url
  }
`;

function renderAbstract(abstract: any[] = []) {
  return abstract
    ?.map((block) =>
      block.children?.map((child: any) => child.text).join("")
    )
    .join("\n\n");
}

export default async function Publications() {
  const {data: publications} = await sanityFetch({
    query: publicationsQuery,
  });

  return (
    <section id="publications" className="bg-gray-950 px-8 py-28 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">
          Publications
        </p>

        <h2 className="mt-4 text-5xl font-extrabold">Selected Publications</h2>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
          Selected journal articles, conference papers, manuscripts, and ongoing research projects.
        </p>

        <div className="mt-12 space-y-6">
          {publications?.map((item: any) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:border-amber-500/50 hover:bg-white/10"
            >
              <div className="flex flex-wrap gap-3 text-sm font-semibold text-amber-400">
                <span>{item.year}</span>
                <span>•</span>
                <span>{item.journal}</span>
              </div>

              <h3 className="mt-4 text-2xl font-bold leading-snug">
                {item.title}
              </h3>

              <p className="mt-3 text-gray-400">{item.authors}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <details className="w-full">
                  <summary className="inline-block cursor-pointer rounded-xl bg-white px-5 py-3 font-semibold text-gray-950">
                    Abstract
                  </summary>

                  <p className="mt-5 whitespace-pre-line leading-8 text-gray-300">
                    {renderAbstract(item.abstract)}
                  </p>
                </details>

                {item.pdfUrl && (
                  <a
                    href={item.pdfUrl}
                    target="_blank"
                    className="rounded-xl border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/10"
                  >
                    PDF
                  </a>
                )}

                {item.doi && (
                  <a
                    href={item.doi}
                    target="_blank"
                    className="rounded-xl border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/10"
                  >
                    DOI
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}