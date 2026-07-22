import Image from "next/image";

const galleryItems = [
  {
    title: "International Conference",
    category: "International Conferences",
    description:
      "Presenting research and engaging in international academic dialogue.",
    image: "/gallery/conference-1.jpg",
  },
  {
    title: "Visiting Lecture",
    category: "Visiting Lectures",
    description:
      "Academic exchange on constitutional law and Malay intellectual history.",
    image: "/gallery/visiting-lecture-1.jpg",
  },
  {
    title: "Research Activity",
    category: "Research Activities",
    description:
      "Archival and field research supporting long-term scholarly projects.",
    image: "/gallery/research-1.jpg",
  },
  {
    title: "Raja Ali Haji Studies",
    category: "Raja Ali Haji Studies",
    description:
      "Research and public engagement concerning Raja Ali Haji's intellectual legacy.",
    image: "/gallery/raja-ali-haji-1.jpg",
  },
  {
    title: "Public Seminar",
    category: "Public Lectures",
    description:
      "Sharing constitutional and educational ideas with wider audiences.",
    image: "/gallery/seminar-1.jpg",
  },
  {
    title: "Institutional Leadership",
    category: "Institutional Leadership",
    description:
      "Leadership, collaboration, and public service in education and academia.",
    image: "/gallery/leadership-1.jpg",
  },
];

export default function GalleryPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-slate-200 bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Academic Journey
          </p>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
            Academic Gallery
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Selected moments from international conferences, visiting lectures,
            research activities, public seminars, institutional leadership,
            and the study of Raja Ali Haji.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
                    {item.category}
                  </p>

                  <h2 className="mt-3 text-xl font-bold text-slate-950">
                    {item.title}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",

  description:
    "Academic activities, international seminars, lectures, research programmes, institutional engagements, and public events involving Dr. Hos Arie Sibarani.",

  alternates: {
    canonical: "/gallery",
  },

  openGraph: {
    title: "Academic Gallery | Dr. Hos Arie Sibarani",
    description:
      "Photographs and documentation of academic lectures, seminars, research activities, and institutional engagements.",
    url: "/gallery",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Academic Gallery | Dr. Hos Arie Sibarani",
    description:
      "Academic lectures, research activities, seminars, and institutional engagements.",
  },
};