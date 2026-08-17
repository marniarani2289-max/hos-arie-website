import {
  Archive,
  BookOpen,
  Building2,
  GraduationCap,
  Landmark,
  Presentation,
} from "lucide-react";

const galleryItems = [
  {
    title: "International Conference",
    category: "International Conferences",
    description:
      "Presenting research and engaging in international academic dialogue.",
    icon: Presentation,
  },
  {
    title: "Visiting Lecture",
    category: "Visiting Lectures",
    description:
      "Academic exchange on constitutional law and Malay intellectual history.",
    icon: GraduationCap,
  },
  {
    title: "Research Activity",
    category: "Research Activities",
    description:
      "Archival and field research supporting long-term scholarly projects.",
    icon: Archive,
  },
  {
    title: "Raja Ali Haji Studies",
    category: "Raja Ali Haji Studies",
    description:
      "Research and public engagement concerning Raja Ali Haji's intellectual legacy.",
    icon: BookOpen,
  },
  {
    title: "Public Seminar",
    category: "Public Lectures",
    description:
      "Sharing constitutional and educational ideas with wider audiences.",
    icon: Landmark,
  },
  {
    title: "Institutional Leadership",
    category: "Institutional Leadership",
    description:
      "Leadership, collaboration, and public service in education and academia.",
    icon: Building2,
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
            {galleryItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-950">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(217,119,6,0.32),transparent_32%),linear-gradient(145deg,#020617,#1e293b)]" />
                    <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full border border-amber-400/15" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-amber-300/30 bg-white/5 text-amber-300 transition duration-500 group-hover:scale-110 group-hover:bg-amber-400/10">
                      <Icon size={42} strokeWidth={1.5} />
                    </div>
                    <span className="absolute bottom-5 right-6 text-xs font-bold tracking-[0.3em] text-white/35">
                      {String(index + 1).padStart(2, "0")}
                    </span>
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
              );
            })}
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
