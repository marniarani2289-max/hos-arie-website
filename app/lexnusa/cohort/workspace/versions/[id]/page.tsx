import Link from "next/link";
import { notFound } from "next/navigation";
import { session } from "@/lib/lexnusa/cohort-access";
import { cohortCode, stages } from "@/lib/lexnusa/cohort";
import {
  uuidPattern,
  workflowStatus,
  parseGenerationRefs,
} from "@/lib/lexnusa/document-workflow";

export const metadata = {
  title: "Jejak Dokumen | LexNusa",
  robots: { index: false, follow: false },
};
export default async function VersionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!uuidPattern.test(id)) notFound();
  const { supabase } = await session();
  const { data: version, error } = await supabase
    .from("lexnusa_cohort_versions")
    .select("*")
    .eq("id", id)
    .eq("cohort_code", cohortCode)
    .maybeSingle();
  if (error) throw new Error("Riwayat dokumen belum dapat dimuat.");
  if (!version) notFound();
  const refs = parseGenerationRefs(version.generation_refs) ?? {};
  const ids = Object.values(refs);
  const [
    { data: reviews, error: reviewError },
    { data: latest, error: latestError },
    generationResult,
  ] = await Promise.all([
    supabase
      .from("lexnusa_cohort_reviews")
      .select(
        "id,decision,notes,participant_score,assessed_risk,created_at,reviewer_id,quality_gate_passed",
      )
      .eq("version_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("lexnusa_cohort_versions")
      .select("id")
      .eq("cohort_code", cohortCode)
      .eq("user_id", version.user_id)
      .order("version_number", { ascending: false })
      .limit(1)
      .maybeSingle(),
    ids.length
      ? supabase
          .from("lexnusa_cohort_generations")
          .select("id,stage,input,output,model,created_at")
          .in("id", ids)
          .eq("cohort_code", cohortCode)
          .eq("user_id", version.user_id)
      : Promise.resolve({ data: [], error: null }),
  ]);
  if (reviewError || latestError || generationResult.error)
    throw new Error("Jejak keputusan atau AI belum dapat dimuat.");
  const decision = reviews?.[0];
  return (
    <main className="mx-auto max-w-5xl px-6 py-14 text-slate-900">
      <nav className="flex flex-wrap gap-4">
        <Link
          href="/lexnusa/cohort/workspace"
          className="text-teal-800 underline"
        >
          Ruang praktik
        </Link>
        <Link
          href="/lexnusa/cohort/facilitator"
          className="text-teal-800 underline"
        >
          Dashboard fasilitator
        </Link>
      </nav>
      <p className="mt-8 text-sm font-bold uppercase tracking-widest text-teal-700">
        Dokumen tersimpan · Versi {version.version_number}
      </p>
      <h1 className="mt-3 text-3xl font-bold">{version.document_title}</h1>
      <p className="mt-3 font-semibold">
        {workflowStatus(version, decision)} · Risiko {version.risk_level}
      </p>
      {latest?.id !== id && (
        <p className="mt-4 rounded-lg bg-amber-50 p-4">
          Ini versi historis. Ada versi lebih baru; keputusan pada halaman ini
          tidak berlaku untuk versi baru.
        </p>
      )}
      <p className="mt-3 text-sm">
        {new Date(version.created_at).toLocaleString("id-ID")} · Pemeriksaan
        peserta: {version.human_checked ? "dikonfirmasi" : "belum tercatat"}
      </p>
      <section className="mt-8 rounded-xl border bg-stone-50 p-6">
        <h2 className="text-xl font-bold">Dokumen acuan</h2>
        <p className="mt-3 whitespace-pre-wrap break-words">
          {version.source_notes || "Belum dicatat pada versi lama."}
        </p>
      </section>
      {stages.map((stage) => (
        <section key={stage.key} className="mt-6 rounded-xl border p-6">
          <h2 className="text-xl font-bold">{stage.title}</h2>
          <p className="mt-3 whitespace-pre-wrap break-words">
            {version[stage.key] || "Belum diisi."}
          </p>
          {generationResult.data
            ?.filter((g) => g.id === refs[stage.key])
            .map((g) => (
              <details key={g.id} className="mt-5 rounded-lg bg-teal-50 p-4">
                <summary className="cursor-pointer font-semibold">
                  Jejak usulan AI yang diterapkan
                </summary>
                <p className="mt-3 text-sm">
                  {g.model} · {new Date(g.created_at).toLocaleString("id-ID")}
                </p>
                <p className="mt-2 text-sm">
                  Hasil asli AI di bawah dapat berbeda dari dokumen setelah
                  diedit manusia.
                </p>
                <h3 className="mt-4 font-bold">Hasil asli AI</h3>
                <p className="mt-2 whitespace-pre-wrap break-words">
                  {g.output}
                </p>
                <details className="mt-4">
                  <summary className="cursor-pointer">
                    Konteks yang digunakan AI
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap break-words font-sans text-sm">
                    {JSON.stringify(g.input, null, 2)}
                  </pre>
                </details>
              </details>
            ))}
        </section>
      ))}
      <section className="mt-8 rounded-xl border border-teal-200 p-6">
        <h2 className="text-xl font-bold">Keputusan manusia</h2>
        {reviews?.length ? (
          reviews.map((r) => (
            <article key={r.id} className="mt-4">
              <p className="font-semibold">
                {workflowStatus(version, r)} · {r.participant_score}/100 ·
                Risiko reviewer {r.assessed_risk}
              </p>
              <p className="mt-2 text-sm">
                {new Date(r.created_at).toLocaleString("id-ID")} · Pemeriksaan
                kualitas{" "}
                {r.quality_gate_passed ? "dikonfirmasi" : "belum disetujui"}
              </p>
              <p className="mt-3 whitespace-pre-wrap break-words">{r.notes}</p>
              <p className="mt-3 break-all text-xs text-slate-500">
                Referensi reviewer: {r.reviewer_id}
              </p>
            </article>
          ))
        ) : (
          <p className="mt-3">
            {version.submitted
              ? "Menunggu keputusan fasilitator."
              : "Versi kerja belum dikirim untuk persetujuan."}
          </p>
        )}
      </section>
      <p className="mt-6 text-sm text-slate-600">
        Dokumen ini untuk praktik. Persetujuan fasilitator dan sertifikat
        pembelajaran tidak menyatakan kontrak siap ditandatangani untuk
        transaksi nyata.
      </p>
    </main>
  );
}
