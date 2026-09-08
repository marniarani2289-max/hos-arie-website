import Link from "next/link";
import { workflowStatus } from "@/lib/lexnusa/document-workflow";
type Version = {
  id: string;
  document_title: string;
  risk_level: string;
  version_number: number;
  submitted: boolean;
  source_notes: string;
  generation_refs: Record<string, string>;
};
type Review = { decision: string; notes: string; assessed_risk: string };
export default function WorkflowSummary({
  version,
  review,
}: {
  version: Version | null;
  review: Review | null;
}) {
  return (
    <section
      aria-label="Status proses dokumen"
      className="my-8 rounded-2xl border border-teal-200 bg-white p-6"
    >
      <p className="text-sm font-bold uppercase tracking-widest text-teal-700">
        Dokumen → Bantuan AI → Keputusan manusia
      </p>
      <h2 className="mt-3 text-2xl font-bold">
        {version?.document_title ?? "Mulai dokumen praktik Anda"}
      </h2>
      <p className="mt-3 font-semibold">
        {workflowStatus(version, review)}
        {version &&
          ` · Versi ${version.version_number} · Risiko ${version.risk_level}`}
      </p>
      <ol className="mt-5 grid gap-4 sm:grid-cols-3">
        <li className="rounded-lg bg-stone-50 p-4">
          <b>1. Dokumen dan acuan</b>
          <p className="mt-2 text-sm">
            {version?.source_notes
              ? "Acuan tersimpan bersama versi."
              : "Catat kebutuhan dan dokumen acuan."}
          </p>
        </li>
        <li className="rounded-lg bg-stone-50 p-4">
          <b>2. Bantuan AI</b>
          <p className="mt-2 text-sm">
            {Object.keys(version?.generation_refs ?? {}).length} tahap memiliki
            jejak usulan AI diterapkan. Penggunaan AI bersifat opsional.
          </p>
        </li>
        <li className="rounded-lg bg-stone-50 p-4">
          <b>3. Keputusan manusia</b>
          <p className="mt-2 text-sm">
            {review
              ? `${workflowStatus(version, review)} · Risiko reviewer ${review.assessed_risk}`
              : "Fasilitator memeriksa versi yang Anda kirim."}
          </p>
        </li>
      </ol>
      {review && (
        <p className="mt-4 whitespace-pre-wrap rounded-lg bg-teal-50 p-4">
          {review.notes}
        </p>
      )}
      {version && (
        <Link
          className="mt-4 inline-block font-semibold text-teal-800 underline"
          href={`/lexnusa/cohort/workspace/versions/${version.id}`}
        >
          Buka dokumen, jejak AI, dan keputusan versi ini
        </Link>
      )}
      <p className="mt-4 text-sm text-slate-600">
        Persetujuan hanya berlaku untuk versi yang diperiksa dan tujuan praktik.
        Menyimpan perubahan akan membuat versi baru yang perlu diperiksa
        kembali.
      </p>
    </section>
  );
}
