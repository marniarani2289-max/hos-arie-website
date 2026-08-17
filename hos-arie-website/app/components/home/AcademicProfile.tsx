import Link from "next/link";

const profileDetails = [
  {
    label: "Academic Position",
    value: "Senior Lecturer",
  },
  {
    label: "Research Institution",
    value: "Raja Ali Haji Research Network",
  },
  {
    label: "Location",
    value: "Riau Islands, Indonesia",
  },
  {
    label: "Research Orientation",
    value: "Comparative and Global",
  },
];

export default function AcademicProfile() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:px-8 md:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
            Academic Profile
          </p>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
            Law, intellectual history, and constitutional traditions
          </h2>

          <div className="mt-8 space-y-6 text-lg leading-9 text-slate-700">
            <p>
              Dr. Hos Arie Rhamadhan Sibarani is a constitutional law scholar
              whose research explores the relationship between authority,
              ethics, accountability, and public responsibility.
            </p>

            <p>
              His work recovers constitutional ideas developed within the
              nineteenth-century Malay world, particularly through the writings
              of Raja Ali Haji, and places them in conversation with
              contemporary constitutional and comparative legal theory.
            </p>

            <p>
              Alongside constitutional thought, his private-law research
              examines the attribution of responsibility for harm arising from
              employment, agency, and organisational activity.
            </p>
          </div>

          <Link
            href="/about"
            className="mt-8 inline-flex font-semibold text-slate-950 transition hover:text-amber-700"
          >
            Read Full Academic Biography →
          </Link>
        </div>

        <div className="rounded-[2rem] bg-slate-50 p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Profile Overview
          </p>

          <dl className="mt-8">
            {profileDetails.map((item) => (
              <div
                key={item.label}
                className="border-t border-slate-200 py-6 first:border-t-0 first:pt-0"
              >
                <dt className="text-sm text-slate-500">{item.label}</dt>

                <dd className="mt-2 text-lg font-semibold text-slate-950">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}