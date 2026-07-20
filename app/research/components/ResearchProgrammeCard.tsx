import Link from "next/link";
import type { ResearchProgramme } from "../data/researchProgrammes";

type ResearchProgrammeCardProps = {
  programme: ResearchProgramme;
};

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Developing: "bg-amber-50 text-amber-700 ring-amber-200",
  Planned: "bg-slate-100 text-slate-600 ring-slate-200",
};

export default function ResearchProgrammeCard({
  programme,
}: ResearchProgrammeCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl md:p-10">
      <div className="flex items-start justify-between gap-6">
        <p className="text-4xl font-bold tracking-tight text-amber-700">
          {programme.number}
        </p>

        <span
          className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] ring-1 ring-inset ${
            statusStyles[programme.status]
          }`}
        >
          {programme.status}
        </span>
      </div>

      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
        {programme.category}
      </p>

      <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
        {programme.title}
      </h3>

      <p className="mt-5 text-lg leading-8 text-slate-600">
        {programme.description}
      </p>

      <div className="mt-7 rounded-2xl bg-slate-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
          Scholarly Contribution
        </p>

        <p className="mt-3 leading-7 text-slate-700">
          {programme.contribution}
        </p>
      </div>

      <div className="mt-7 flex flex-wrap gap-2">
        {programme.topics.map((topic) => (
          <span
            key={topic}
            className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600"
          >
            {topic}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-8">
        <Link
          href={programme.href}
          className="inline-flex items-center font-semibold text-slate-950 transition group-hover:text-amber-700"
        >
          Explore Research Programme
          <span className="ml-2 transition group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}