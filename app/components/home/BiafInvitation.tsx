import Link from "next/link";

export default function BiafInvitation({ locale = "en" }: { locale?: "en" | "id" }) {
  const id = locale === "id";
  return <section className="border-y border-slate-200 bg-[#eef0e9] px-6 py-12" aria-labelledby="biaf-invitation-title">
    <div className="mx-auto flex max-w-7xl flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">{id ? "Jejaring akademik · Inisiatif dalam pengembangan" : "Academic network · Initiative in development"}</p>
        <h2 id="biaf-invitation-title" className="mt-3 font-academic text-2xl font-bold text-slate-950 sm:text-3xl">Batam International Academic Forum</h2>
        <p className="mt-3 text-base leading-7 text-slate-600">{id ? "Dari Batam, mempertemukan gagasan. Kenali profil BIAF, arah keilmuan, rancangan tata kelola, dan ruang kolaborasi lintas disiplin." : "Connecting ideas from Batam. Explore BIAF’s profile, academic priorities, proposed governance, and opportunities for interdisciplinary collaboration."}</p>
      </div>
      <Link href="/biaf" className="inline-flex shrink-0 items-center justify-center gap-6 rounded-xl bg-[#102c37] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#254f5c]">{id ? "Mengenal BIAF" : "Explore BIAF"}<span aria-hidden="true">↗</span></Link>
    </div>
  </section>;
}
