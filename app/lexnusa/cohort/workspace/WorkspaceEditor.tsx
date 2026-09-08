"use client";
import { useActionState, useState } from "react";
import { stages, type Work } from "@/lib/lexnusa/cohort";
import {
  practiceAids,
  riskLevels,
  type DocumentContext,
  type GenerationRefs,
} from "@/lib/lexnusa/document-workflow";
import { saveVersion } from "./actions";
export default function WorkspaceEditor({
  initial,
  document,
  versionId,
  initialRefs,
}: {
  initial: Work;
  document: DocumentContext;
  versionId: string | null;
  initialRefs: GenerationRefs;
}) {
  const [work, setWork] = useState(initial),
    [consent, setConsent] = useState(false),
    [busy, setBusy] = useState(""),
    [error, setError] = useState(""),
    [suggestion, setSuggestion] = useState<{
      id: string;
      stage: keyof Work;
      output: string;
    } | null>(null);
  const [context, setContext] = useState(document),
    [refs, setRefs] = useState(initialRefs),
    [checked, setChecked] = useState(false),
    [dirty, setDirty] = useState(false);
  const [state, action, pending] = useActionState(
    async (
      previous: { message: string; versionId: string | null; ok: boolean },
      form: FormData,
    ) => {
      const result = await saveVersion(previous, form);
      if (result.ok) {
        setDirty(false);
        setChecked(false);
      }
      return result;
    },
    { message: "", versionId, ok: false },
  );
  function changed() {
    setDirty(true);
    setChecked(false);
  }
  async function generate(stage: keyof Work) {
    setBusy(stage);
    setError("");
    setSuggestion(null);
    try {
      const res = await fetch("/api/lexnusa/cohort/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage, work, document: context, consent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generasi belum berhasil.");
      setSuggestion({ id: data.id, stage, output: data.output });
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Koneksi terputus. Periksa riwayat AI sebelum mencoba lagi.",
      );
    } finally {
      setBusy("");
    }
  }
  return (
    <form action={action} className="space-y-6">
      <input
        type="hidden"
        name="parent_version_id"
        value={state.versionId ?? ""}
      />
      <input
        type="hidden"
        name="generation_refs"
        value={JSON.stringify(refs)}
      />
      <fieldset
        disabled={pending || !!busy}
        className="space-y-5 rounded-2xl border bg-white p-6 disabled:opacity-70"
      >
        <legend className="px-2 text-xl font-bold">Dokumen dan acuan</legend>
        <label className="block font-semibold">
          Judul dokumen
          <input
            required
            name="document_title"
            minLength={3}
            maxLength={200}
            value={context.document_title}
            onChange={(e) => {
              setContext({ ...context, document_title: e.target.value });
              changed();
            }}
            className="mt-2 w-full rounded-lg border p-3"
          />
        </label>
        <label className="block font-semibold">
          Risiko yang ditemukan
          <select
            name="risk_level"
            value={context.risk_level}
            onChange={(e) => {
              setContext({
                ...context,
                risk_level: e.target.value as DocumentContext["risk_level"],
              });
              changed();
            }}
            className="ml-3 rounded-lg border p-3"
          >
            {riskLevels.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
        <p className="text-sm text-slate-600">
          LOW: dampak terbatas. MEDIUM: perlu pemeriksaan. HIGH: perlu alasan
          penanganan terperinci. CRITICAL: masalah mendasar belum selesai;
          persetujuan ditahan sampai direvisi.
        </p>
        <label className="block font-semibold">
          Dokumen acuan dan catatan sumber
          <textarea
            name="source_notes"
            rows={4}
            maxLength={10000}
            value={context.source_notes}
            onChange={(e) => {
              setContext({ ...context, source_notes: e.target.value });
              changed();
            }}
            placeholder="Judul, versi/tanggal, bagian atau tautan sumber, kutipan relevan, serta hal yang belum diverifikasi."
            className="mt-2 w-full rounded-lg border p-3"
          />
        </label>
        <p className="text-sm text-slate-600">
          Tempel kutipan yang diperlukan dari dokumen simulasi. Tautan dicatat
          sebagai acuan; AI tidak otomatis membuka atau memverifikasinya.
        </p>
        <details>
          <summary className="cursor-pointer font-bold text-teal-800">
            Pustaka awal: 3 panduan praktik LexNusa
          </summary>
          <p className="mt-3 text-sm">
            Tambahkan kerangka latihan ke tahap terkait, lalu isi dan periksa.
          </p>
          {practiceAids.map((a) => (
            <article key={a.id} className="mt-4 rounded-lg border p-4">
              <h3 className="font-bold">
                {a.id} · {a.title}
              </h3>
              <pre className="my-3 whitespace-pre-wrap font-sans text-sm">
                {a.text}
              </pre>
              <button
                type="button"
                disabled={work[a.stage].length + a.text.length + 2 > 20000}
                onClick={() => {
                  setWork({
                    ...work,
                    [a.stage]: [work[a.stage], a.text]
                      .filter(Boolean)
                      .join("\n\n"),
                  });
                  changed();
                }}
                className="rounded-lg border border-teal-800 px-4 py-2 disabled:opacity-40"
              >
                Tambahkan ke {stages.find((s) => s.key === a.stage)?.title}
              </button>
            </article>
          ))}
        </details>
      </fieldset>
      <div className="rounded-xl bg-amber-50 p-5">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={consent}
            disabled={pending || !!busy}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1"
          />
          <span>
            Saya menggunakan data simulasi dan menyetujui pengiriman dokumen
            acuan serta isi kelima tahap ke layanan AI untuk latihan. Hasil AI
            perlu diperiksa manusia. Maksimal 12 generasi per peserta dalam 24
            jam.
          </span>
        </label>
      </div>
      {stages.map((s, i) => (
        <section key={s.key} className="rounded-2xl border bg-white p-6">
          <p className="text-sm font-bold text-teal-700">
            Minggu {s.week} · {i + 1}/5
          </p>
          <label htmlFor={s.key} className="mt-2 block text-2xl font-bold">
            {s.title}
          </label>
          <p id={`${s.key}-help`} className="my-3 leading-7 text-slate-600">
            {s.help}
          </p>
          <textarea
            id={s.key}
            name={s.key}
            aria-describedby={`${s.key}-help`}
            rows={8}
            maxLength={20000}
            readOnly={pending || !!busy}
            value={work[s.key]}
            onChange={(e) => {
              setWork({ ...work, [s.key]: e.target.value });
              changed();
            }}
            className="w-full rounded-xl border border-slate-400 p-4"
          />
          {refs[s.key] && (
            <p className="mt-2 text-sm text-teal-800">
              Jejak usulan AI diterapkan tersimpan bersama versi. Anda tetap
              dapat mengedit isinya.
            </p>
          )}
          <button
            type="button"
            onClick={() => generate(s.key)}
            disabled={!!busy || pending || !consent}
            className="mt-3 rounded-lg bg-teal-800 px-4 py-3 font-bold text-white disabled:opacity-40"
          >
            {busy === s.key
              ? "AI sedang bekerja…"
              : `Bantu dengan AI: ${s.title}`}
          </button>
          {suggestion?.stage === s.key && (
            <div className="mt-4 rounded-xl bg-teal-50 p-5">
              <h3 className="font-bold">Usulan AI — menunggu pilihan Anda</h3>
              <p className="my-3 whitespace-pre-wrap break-words">
                {suggestion.output}
              </p>
              <button
                disabled={pending || !!busy || suggestion.output.length > 20000}
                type="button"
                onClick={() => {
                  setWork({ ...work, [s.key]: suggestion.output });
                  setRefs({ ...refs, [s.key]: suggestion.id });
                  setSuggestion(null);
                  changed();
                }}
                className="rounded-lg border border-teal-800 px-4 py-2"
              >
                Gunakan usulan pada tahap ini
              </button>
              <button
                type="button"
                onClick={() => setSuggestion(null)}
                className="ml-3 rounded-lg border px-4 py-2"
              >
                Abaikan usulan
              </button>
              <p className="mt-2 text-sm">
                Mengganti isi kolom. Simpan versi kerja setelah meninjau hasil.
              </p>
            </div>
          )}
        </section>
      ))}
      <div className="rounded-xl border border-teal-200 bg-teal-50 p-5">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="human_checked"
            checked={checked}
            disabled={pending || !!busy}
            onChange={(e) => setChecked(e.target.checked)}
            className="mt-1"
          />
          <span>
            Saya telah membaca kelima tahap, mencatat sumber dan isu terbuka,
            serta memeriksa usulan AI yang digunakan. Saya mengirim versi ini
            untuk keputusan fasilitator.
          </span>
        </label>
        <p className="mt-3 text-sm">
          Setiap perubahan baru memerlukan konfirmasi ulang.
        </p>
      </div>
      {dirty && (
        <p role="status" className="text-amber-800">
          Ada perubahan belum disimpan. Status proses di atas berlaku untuk
          versi tersimpan.
        </p>
      )}
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-4">
          {error}
        </p>
      )}
      {state.message && (
        <p role="status" className="rounded-lg bg-teal-50 p-4">
          {state.message}
        </p>
      )}
      <div className="flex flex-wrap gap-4">
        <button
          disabled={pending || !!busy}
          name="intent"
          value="save"
          className="rounded-xl border bg-white px-6 py-4 font-bold disabled:opacity-40"
        >
          {pending ? "Menyimpan…" : "Simpan versi kerja"}
        </button>
        <button
          disabled={pending || !!busy || !checked}
          name="intent"
          value="submit"
          className="rounded-xl bg-teal-800 px-6 py-4 font-bold text-white disabled:opacity-40"
        >
          Kirim untuk persetujuan manusia
        </button>
      </div>
    </form>
  );
}
