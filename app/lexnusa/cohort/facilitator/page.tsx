import Link from "next/link";
import { riskLevels, workflowStatus } from "@/lib/lexnusa/document-workflow";
import { toggleEnrollment, review } from "./actions";
import { staffSession } from "@/lib/lexnusa/cohort-access";
import { cohortCode, stages } from "@/lib/lexnusa/cohort";
export const metadata = {
  title: "Fasilitator | LexNusa Cohort",
  robots: { index: false, follow: false },
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const query = await searchParams;
  const { supabase } = await staffSession();
  const [
    { data: cohort, error: cohortError },
    { data: members, error: memberError },
    { data: versions, error },
    { data: reviews, error: reviewError },
  ] = await Promise.all([
    supabase
      .from("lexnusa_cohorts")
      .select("enrollment_open")
      .eq("code", cohortCode)
      .single(),
    supabase
      .from("lexnusa_cohort_members")
      .select("user_id,display_name")
      .eq("cohort_code", cohortCode),
    supabase
      .from("lexnusa_cohort_versions")
      .select("*")
      .eq("cohort_code", cohortCode)
      .order("version_number", { ascending: false }),
    supabase
      .from("lexnusa_cohort_reviews")
      .select(
        "version_id,decision,participant_score,notes,created_at,assessed_risk",
      )
      .eq("cohort_code", cohortCode)
      .order("created_at", { ascending: false }),
  ]);
  if (cohortError || memberError || reviewError || error)
    return (
      <main className="p-10">
        <h1>Antrean persetujuan belum dapat dimuat</h1>
        <p>Muat ulang sebelum mengambil keputusan.</p>
      </main>
    );
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-bold">Fasilitator LexNusa Cohort</h1>
      <p className="mt-3">
        {members?.length ?? 0} peserta ·{" "}
        {versions?.filter((v) => v.submitted).length ?? 0} versi dikirim
      </p>
      {query.saved && (
        <p role="status" className="my-4 bg-emerald-50 p-4">
          Perubahan tersimpan.
        </p>
      )}
      {(query.error || error) && (
        <p role="alert" className="my-4 bg-red-50 p-4">
          Proses belum berhasil. Verifikasi membutuhkan nilai minimal 75; Anda
          tidak dapat menilai pekerjaan sendiri. Versi harus terbaru dan belum
          pernah direview. Risiko CRITICAL perlu revisi; risiko HIGH memerlukan
          alasan minimal 80 karakter.
        </p>
      )}
      <form action={toggleEnrollment} className="my-8">
        <input
          type="hidden"
          name="open"
          value={String(!cohort?.enrollment_open)}
        />
        <button className="rounded-xl bg-teal-800 px-6 py-3 text-white">
          {cohort?.enrollment_open ? "Tutup pendaftaran" : "Buka pendaftaran"}
        </button>
      </form>
      <p className="mb-8">
        Review menilai versi tertentu. Versi baru memerlukan review baru. Skor
        peserta bukan skor LEX-EVAL; verifikasi pertama menerbitkan sertifikat
        penyelesaian setelah nilai minimal 75 dan pemeriksaan kualitas
        disetujui.
      </p>
      <section className="mb-8 rounded-xl border p-5">
        <h2 className="text-xl font-bold">Progres peserta</h2>
        {members?.map((m) => {
          const latest = versions?.find((v) => v.user_id === m.user_id);
          return (
            <p className="mt-3 break-all" key={m.user_id}>
              {m.display_name}:{" "}
              {latest
                ? stages.filter((s) => latest[s.key]?.trim().length >= 20)
                    .length
                : 0}
              /5 tahap terisi ·{" "}
              {workflowStatus(
                latest,
                reviews?.find((r) => r.version_id === latest?.id),
              )}
            </p>
          );
        })}
      </section>
      {versions
        ?.filter((v) => v.submitted)
        .map((v) => (
          <article
            key={v.id}
            className="mb-8 rounded-2xl border bg-stone-50 p-6"
          >
            <h2 className="break-all font-bold">
              {members?.find((m) => m.user_id === v.user_id)?.display_name ??
                v.user_id}
            </h2>
            <p className="mt-2 font-semibold">
              {v.document_title} · Versi {v.version_number} · Risiko peserta{" "}
              {v.risk_level}
            </p>
            <Link
              className="mt-2 inline-block text-teal-800 underline"
              href={`/lexnusa/cohort/workspace/versions/${v.id}`}
            >
              Periksa dokumen acuan dan jejak AI versi ini
            </Link>
            <p className="mt-3 whitespace-pre-wrap rounded-lg bg-white p-3">
              {v.source_notes || "Belum ada catatan sumber pada versi lama."}
            </p>
            <p className="text-sm">
              {new Date(v.created_at).toLocaleString("id-ID")}
            </p>
            {stages.map((s) => (
              <details key={s.key} className="mt-4">
                <summary className="cursor-pointer font-bold">
                  {s.title}
                </summary>
                <p className="mt-2 whitespace-pre-wrap break-words">
                  {v[s.key]}
                </p>
              </details>
            ))}
            {reviews
              ?.filter((r) => r.version_id === v.id)
              .map((r) => (
                <p key={r.created_at} className="my-4 rounded-lg bg-white p-4">
                  {r.decision} · {r.participant_score}/100 · {r.notes}
                </p>
              ))}
            {versions.find((item) => item.user_id === v.user_id)?.id === v.id &&
            !reviews?.some((r) => r.version_id === v.id) ? (
              <form action={review} className="mt-6 grid gap-4">
                <input type="hidden" name="version" value={v.id} />
                <label>
                  Nilai kemampuan peserta (0–100)
                  <input
                    required
                    name="score"
                    type="number"
                    min="0"
                    max="100"
                    className="ml-4 w-24 border bg-white p-2"
                  />
                </label>
                <label>
                  Risiko setelah pemeriksaan
                  <select
                    name="assessed_risk"
                    defaultValue={v.risk_level}
                    className="ml-4 border bg-white p-2"
                  >
                    {riskLevels.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </label>
                <p className="text-sm">
                  CRITICAL: pilih perlu revisi. HIGH: uraikan alasan penanganan
                  minimal 80 karakter sebelum menyetujui.
                </p>
                <label>
                  Keputusan
                  <select name="decision" className="ml-4 border bg-white p-2">
                    <option value="revision_requested">Perlu revisi</option>
                    <option value="verified">Setujui untuk praktik</option>
                  </select>
                </label>
                <label>
                  Umpan balik dan alasan keputusan
                  <textarea
                    required
                    name="notes"
                    minLength={20}
                    maxLength={10000}
                    rows={4}
                    className="mt-2 w-full border bg-white p-3"
                  />
                </label>
                <label className="flex items-start gap-3">
                  <input type="checkbox" name="quality_gate" className="mt-1" />
                  <span>
                    Saya telah memeriksa kelima tahap, memverifikasi sumber yang
                    digunakan, dan memastikan tidak ada Critical Legal Failure
                    yang belum ditangani. Wajib untuk keputusan terverifikasi
                    dan penerbitan sertifikat.
                  </span>
                </label>
                <button className="rounded-xl bg-slate-900 px-6 py-3 text-white">
                  Simpan keputusan versi ini
                </button>
              </form>
            ) : (
              <p className="mt-5 font-semibold text-slate-600">
                Riwayat: versi sudah diputuskan atau digantikan versi baru.
              </p>
            )}
          </article>
        ))}
    </main>
  );
}
