import WorkflowSummary from "./WorkflowSummary";
import { emptyDocument, workflowStatus } from "@/lib/lexnusa/document-workflow";
import WorkspaceEditor from "./WorkspaceEditor";
import type { Work } from "@/lib/lexnusa/cohort";
import Link from "next/link";
import { cohortCode, stages, dimensions } from "@/lib/lexnusa/cohort";
import { enroll } from "./actions";
import { session } from "@/lib/lexnusa/cohort-access";
export const metadata = {
  title: "Ruang Praktik | LexNusa Cohort",
  robots: { index: false, follow: false },
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const query = await searchParams;
  const { supabase, user } = await session();
  const [{ data: cohort, error: cohortError }, { data: member }] =
    await Promise.all([
      supabase
        .from("lexnusa_cohorts")
        .select("title,enrollment_open")
        .eq("code", cohortCode)
        .maybeSingle(),
      supabase
        .from("lexnusa_cohort_members")
        .select("user_id")
        .eq("cohort_code", cohortCode)
        .eq("user_id", user.id)
        .maybeSingle(),
    ]);
  if (cohortError || !cohort)
    return (
      <main className="p-10">
        <h1 className="text-3xl font-bold">Kelas sedang disiapkan</h1>
        <p className="mt-4">
          Ruang praktik belum dapat diakses. Silakan kembali setelah pengumuman
          pembukaan kelas.
        </p>
        <Link href="/lexnusa/cohort" className="mt-5 inline-block underline">
          Kembali ke informasi kelas
        </Link>
      </main>
    );
  if (!member)
    return (
      <main className="mx-auto max-w-xl px-6 py-16">
        <h1 className="text-3xl font-bold">{cohort.title}</h1>
        {query.error && (
          <p role="alert">Pendaftaran belum berhasil. Silakan coba kembali.</p>
        )}
        <p className="my-6">
          {cohort.enrollment_open
            ? "Bergabung untuk menyimpan pekerjaan pribadi dan menerima umpan balik fasilitator."
            : "Pendaftaran belum dibuka. Peserta undangan akan diberi akses oleh pengelola kelas."}
        </p>
        {cohort.enrollment_open && (
          <form action={enroll}>
            <label className="mb-4 block">
              Nama lengkap untuk sertifikat
              <input
                name="display_name"
                defaultValue={user.user_metadata?.full_name ?? ""}
                required
                minLength={2}
                maxLength={120}
                className="mt-2 w-full rounded-lg border p-3"
              />
            </label>
            <button className="rounded-xl bg-teal-800 px-6 py-3 text-white">
              Gabung cohort
            </button>
          </form>
        )}
      </main>
    );
  const { data: versions, error } = await supabase
    .from("lexnusa_cohort_versions")
    .select("*")
    .eq("user_id", user.id)
    .eq("cohort_code", cohortCode)
    .order("version_number", { ascending: false });
  if (error)
    return (
      <main className="p-10">
        <h1>Riwayat belum dapat dimuat</h1>
        <p>
          Coba muat ulang sebelum melanjutkan agar pekerjaan sebelumnya tetap
          tersedia.
        </p>
      </main>
    );
  const [{ data: generations }, { data: certificates }] = await Promise.all([
    supabase
      .from("lexnusa_cohort_generations")
      .select("id,stage,output,status,created_at")
      .eq("user_id", user.id)
      .eq("cohort_code", cohortCode)
      .order("created_at", { ascending: false })
      .limit(30),
    supabase
      .from("lexnusa_cohort_certificates")
      .select("id")
      .eq("user_id", user.id)
      .eq("cohort_code", cohortCode)
      .is("revoked_at", null),
  ]);
  const latest = versions?.[0];
  const { data: reviews, error: reviewError } = await supabase
    .from("lexnusa_cohort_reviews")
    .select(
      "version_id,participant_score,decision,notes,created_at,assessed_risk",
    )
    .eq("cohort_code", cohortCode)
    .eq("participant_id", user.id)
    .order("created_at", { ascending: false });
  if (reviewError)
    return (
      <main className="p-10">
        <h1>Keputusan belum dapat dimuat</h1>
        <p>Muat ulang halaman untuk memastikan status persetujuan terbaru.</p>
      </main>
    );
  return (
    <main className="bg-stone-50 px-6 py-14 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <Link href="/lexnusa/cohort" className="text-teal-800 underline">
          Informasi kelas
        </Link>
        <p className="mt-8 text-sm font-bold uppercase tracking-widest text-teal-700">
          {cohortCode} · Ruang praktik pribadi
        </p>
        <h1 className="mt-3 text-4xl font-bold">
          Kontrak kerja: dari kebutuhan ke revisi
        </h1>
        {query.saved && (
          <p role="status" className="mt-5 rounded-xl bg-emerald-100 p-4">
            Versi baru tersimpan. Versi sebelumnya tetap tersedia.
          </p>
        )}
        {query.error && (
          <p role="alert" className="mt-5 rounded-xl bg-red-100 p-4">
            {query.error === "incomplete"
              ? "Isi kelima tahap minimal 20 karakter untuk mengirim tugas. Maksimal 20.000 karakter per tahap."
              : "Penyimpanan belum berhasil. Silakan coba kembali."}
          </p>
        )}
        <article className="my-8 rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-bold">
            Kasus LN-KK-01 · Selat Digital Nusantara
          </h2>
          <p className="mt-3 leading-7">
            Perusahaan fiktif di Tanjungpinang merekrut Raka Pratama untuk
            digitalisasi 12.000 arsip lama. Estimasi 1 Oktober 2026–31 Maret
            2027, upah pokok Rp6 juta + tunjangan tetap Rp1 juta, Senin–Jumat
            08.00–17.00 dengan satu jam istirahat. Manajemen meminta masa
            percobaan, lembur termasuk upah, dan tanpa kompensasi akhir kontrak.
            Uji permintaan tersebut; jangan langsung menyetujuinya.
          </p>
          <p className="mt-3 text-sm text-slate-600">
            Gunakan data simulasi. Klarifikasi sifat proyek, kewenangan
            penandatangan, upah minimum dan hak normatif bersama fasilitator.
          </p>
        </article>
        <WorkflowSummary
          version={latest ?? null}
          review={reviews?.find((r) => r.version_id === latest?.id) ?? null}
        />
        <WorkspaceEditor
          document={
            latest
              ? {
                  document_title: latest.document_title,
                  risk_level: latest.risk_level,
                  source_notes: latest.source_notes,
                }
              : emptyDocument
          }
          versionId={latest?.id ?? null}
          initialRefs={latest?.generation_refs ?? {}}
          initial={
            Object.fromEntries(
              stages.map((s) => [s.key, latest?.[s.key] ?? ""]),
            ) as Work
          }
        />
        <section className="mt-10 rounded-2xl border bg-white p-6">
          <h2 className="text-2xl font-bold">Sertifikat penyelesaian</h2>
          {certificates?.length ? (
            certificates.map((c) => (
              <Link
                key={c.id}
                className="mt-3 block text-teal-800 underline"
                href={`/lexnusa/cohort/certificate/${c.id}`}
              >
                Lihat dan cetak sertifikat
              </Link>
            ))
          ) : (
            <p className="mt-3">
              Terbit setelah tugas diverifikasi fasilitator, nilai minimal 75,
              dan pemeriksaan kualitas selesai.
            </p>
          )}
        </section>
        <section className="mt-10 rounded-2xl border bg-white p-6">
          <h2 className="text-2xl font-bold">Riwayat generasi AI</h2>
          <p className="mt-2 text-sm">
            Hasil tersimpan terpisah dari versi tugas. Muat ulang halaman untuk
            melihat hasil terbaru.
          </p>
          {generations?.map((g) => (
            <details key={g.id} className="mt-4 border-t pt-3">
              <summary>
                {new Date(g.created_at).toLocaleString("id-ID")} ·{" "}
                {stages.find((s) => s.key === g.stage)?.title} · {g.status}
              </summary>
              <p className="mt-3 whitespace-pre-wrap break-words">
                {g.output || "Belum ada hasil tersimpan."}
              </p>
            </details>
          ))}
        </section>
        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border bg-white p-6">
            <h2 className="text-2xl font-bold">Riwayat versi</h2>
            {versions?.length ? (
              versions.map((v) => (
                <details key={v.id} className="mt-4 border-t pt-4">
                  <summary className="cursor-pointer font-semibold">
                    {new Date(v.created_at).toLocaleString("id-ID")} · Versi{" "}
                    {v.version_number} ·{" "}
                    {workflowStatus(
                      v,
                      reviews?.find((r) => r.version_id === v.id),
                    )}
                  </summary>
                  <Link
                    className="mt-3 inline-block text-teal-800 underline"
                    href={`/lexnusa/cohort/workspace/versions/${v.id}`}
                  >
                    Buka detail dan jejak versi
                  </Link>
                  {stages.map((s) => (
                    <div key={s.key} className="mt-3">
                      <h3 className="font-bold">{s.title}</h3>
                      <p className="whitespace-pre-wrap break-words">
                        {v[s.key] || "Belum diisi"}
                      </p>
                    </div>
                  ))}
                </details>
              ))
            ) : (
              <p className="mt-3">Belum ada versi tersimpan.</p>
            )}
          </article>
          <article className="rounded-2xl border bg-white p-6">
            <h2 className="text-2xl font-bold">Umpan balik fasilitator</h2>
            {reviews?.length ? (
              reviews.map((r) => (
                <div
                  key={`${r.version_id}-${r.created_at}`}
                  className="mt-4 border-t pt-4"
                >
                  <p className="font-bold">
                    {r.decision === "verified"
                      ? "Disetujui untuk praktik"
                      : "Perlu revisi"}{" "}
                    · Nilai peserta {r.participant_score}/100
                  </p>
                  <p className="text-xs">Versi {r.version_id}</p>
                  <p className="mt-2 whitespace-pre-wrap">{r.notes}</p>
                </div>
              ))
            ) : (
              <p className="mt-3">
                Belum ada review. Nilai peserta terpisah dari penilaian keluaran
                AI.
              </p>
            )}
            <h3 className="mt-8 font-bold">Bobot LEX-EVAL</h3>
            {dimensions.map(([name, weight]) => (
              <p key={name} className="mt-2 flex justify-between gap-4">
                <span>{name}</span>
                <b>{weight}</b>
              </p>
            ))}
          </article>
        </section>
      </div>
    </main>
  );
}
