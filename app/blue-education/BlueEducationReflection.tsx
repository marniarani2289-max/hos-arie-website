"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import s from "./BlueEducationReflection.module.css";

const KEY = "blue-education-reflection-v1";
const LIMIT = 3000;
const prompts = [
  { title: "Apa yang berubah dalam pemahaman Anda?", hint: "Bandingkan pandangan sebelum dan sesudah belajar. Sebutkan satu gagasan dari video, dialog publik, PDF, atau kuis." },
  { title: "Bagaimana gagasan itu berkaitan dengan lingkungan Anda?", hint: "Pilih satu situasi di sekolah atau komunitas. Jelaskan hubungannya dengan sungai, pesisir, laut, atau kehidupan masyarakat." },
  { title: "Bukti apa yang mendukung pemikiran Anda?", hint: "Sebutkan sumber atau hasil pengamatan. Bedakan hal yang sudah diamati dengan dugaan yang masih perlu diperiksa." },
  { title: "Apa yang belum Anda pahami atau masih perlu ditelusuri?", hint: "Tuliskan pertanyaan lanjutan, keterbatasan informasi, atau sudut pandang warga yang belum terwakili." },
  { title: "Apa satu aksi yang akan Anda coba bersama siapa?", hint: "Tentukan langkah kecil, lokasi, pihak yang perlu dilibatkan, serta dukungan atau izin yang diperlukan." },
  { title: "Bagaimana Anda akan menilai hasil aksi tersebut?", hint: "Sebutkan indikator, kondisi awal yang perlu dicatat, cara mengukur ulang, dan kapan hasil akan ditinjau." },
];
const stages = [
  { title: "Pahami", description: "Hubungkan gagasan dengan pengalaman Anda." },
  { title: "Telaah", description: "Periksa bukti dan hal yang masih belum diketahui." },
  { title: "Bertindak", description: "Rencanakan langkah yang dapat dilakukan dan ditinjau." },
];
const reviewItems = [
  "Saya membedakan bukti dengan dugaan.",
  "Aksi saya memiliki langkah dan pihak yang jelas.",
  "Saya menetapkan cara menilai hasilnya.",
];
type Draft = { version: 1; answers: string[]; date: string; checks: boolean[] };

function readDraft(raw: string): Draft | null {
  const d: unknown = JSON.parse(raw);
  if (!d || typeof d !== "object") return null;
  const v = d as Partial<Draft>;
  if (v.version !== 1 || !Array.isArray(v.answers) || v.answers.length !== 6 ||
      !v.answers.every(a => typeof a === "string" && a.length <= LIMIT) ||
      typeof v.date !== "string" || !/^(|\d{4}-\d{2}-\d{2})$/.test(v.date) ||
      !Array.isArray(v.checks) || v.checks.length !== 3 || !v.checks.every(c => typeof c === "boolean")) return null;
  return v as Draft;
}

export default function BlueEducationReflection() {
  const [answers, setAnswers] = useState<string[]>(Array(6).fill(""));
  const [date, setDate] = useState("");
  const [checks, setChecks] = useState<boolean[]>([false, false, false]);
  const [stage, setStage] = useState(0);
  const [summary, setSummary] = useState(false);
  const [invalid, setInvalid] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState<"load" | "clear" | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const fields = useRef<(HTMLTextAreaElement | null)[]>([]);
  const completed = answers.filter(a => a.trim()).length;
  const reviewed = checks.filter(Boolean).length;
  const draft: Draft = { version: 1, answers, date, checks };

  function focusHeading() { requestAnimationFrame(() => heading.current?.focus()); }
  function changed() { setStatus("Ada perubahan yang belum disimpan. Klik Simpan draf sebelum meninggalkan halaman."); setPending(null); }
  function go(next: number) { setStage(next); setSummary(false); setInvalid(null); setPending(null); focusHeading(); }
  function advance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const missing = [stage * 2, stage * 2 + 1].find(i => !answers[i].trim());
    if (missing !== undefined) { setInvalid(missing); fields.current[missing]?.focus(); return; }
    setInvalid(null);
    if (stage < 2) go(stage + 1);
    else { setSummary(true); setPending(null); focusHeading(); }
  }
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(draft));
      setStatus("Draf tersimpan di browser ini. Gunakan Muat draf saat kembali pada perangkat dan browser yang sama.");
    } catch { setStatus("Draf tidak dapat disimpan di browser ini. Salin jawaban Anda atau unduh hasil setelah melengkapi refleksi."); }
    setPending(null);
  }
  function loadDraft() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) { setStatus("Belum ada draf tersimpan di browser ini."); setPending(null); return; }
      const saved = readDraft(raw);
      if (!saved) throw new Error("Invalid draft");
      setAnswers(saved.answers); setDate(saved.date); setChecks(saved.checks);
      go(0); setStatus("Draf berhasil dimuat. Anda dapat melanjutkan atau memperbaiki isian.");
    } catch { setStatus("Draf tidak dapat dibaca. Isian saat ini tetap dipertahankan."); setPending(null); }
  }
  function clear() {
    try {
      localStorage.removeItem(KEY);
      setAnswers(Array(6).fill("")); setDate(""); setChecks([false, false, false]);
      go(0); setStatus("Isian dan draf refleksi di browser ini telah dihapus.");
    } catch { setStatus("Draf tersimpan tidak dapat dihapus. Isian tetap dipertahankan."); setPending(null); }
  }
  function download() {
    const content = [
      "REFLEKSI PENDIDIKAN BIRU — KEPULAUAN RIAU",
      "Dr. Hos Arie Sibarani",
      "https://www.hossibarani.com/blue-education#refleksi",
      "",
      ...prompts.flatMap((p, i) => [(i + 1) + ". " + p.title, answers[i].trim(), ""]),
      "Tanggal tinjauan: " + (date || "Belum ditetapkan"),
      "", "Pemeriksaan mandiri:",
      ...reviewItems.map((item, i) => (checks[i] ? "[Sudah] " : "[Perlu ditinjau] ") + item),
      "", "Refleksi pribadi peserta; tidak dinilai otomatis dan tidak dikirim ke server.",
    ].join("\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF", content], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url; a.download = "refleksi-pendidikan-biru.txt"; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    setStatus("Berkas refleksi disiapkan. Periksa unduhan browser. Unduhan tidak memperbarui draf; klik Simpan draf untuk menyimpan perubahan di browser.");
  }

  return <div className={s.root}>
    <p className={s.intro}>Luangkan sekitar 5–10 menit untuk menjawab enam pertanyaan dengan pengalaman Anda sendiri. Refleksi ini tidak diberi skor.</p>
    <div className={s.storage}>
      <p>Isian tidak dikirim ke server dan tidak disimpan otomatis. Simpan draf hanya pada perangkat pribadi; draf dapat dibaca pengguna lain pada browser yang sama. Menghapus data browser juga menghapus draf.</p>
      <div className={s.actions}>
        <button type="button" className={s.secondary} onClick={save}>Simpan draf</button>
        <button type="button" className={s.secondary} onClick={() => { if (answers.some(a => a.length) || date || checks.some(Boolean)) setPending("load"); else loadDraft(); }}>Muat draf</button>
        <button type="button" className={s.textButton} onClick={() => setPending("clear")}>Hapus isian dan draf</button>
      </div>
      {pending && <div className={s.confirm} role="group" aria-label="Konfirmasi perubahan isian">
        <p>{pending === "load" ? "Ganti isian saat ini dengan draf terakhir yang tersimpan?" : "Hapus seluruh isian dan draf refleksi yang tersimpan di browser ini?"}</p>
        <div className={s.actions}>
          <button type="button" className={s.secondary} onClick={pending === "load" ? loadDraft : clear}>{pending === "load" ? "Ya, muat draf" : "Ya, hapus"}</button>
          <button type="button" className={s.secondary} onClick={() => setPending(null)}>Batal</button>
        </div>
      </div>}
      <p className={s.status} role="status">{status}</p>
    </div>
    <ol className={s.steps} aria-label="Tahapan refleksi">
      {stages.map((item, i) => <li key={item.title} aria-current={!summary && stage === i ? "step" : undefined} data-active={!summary && stage === i}><span>{i + 1}</span>{item.title}</li>)}
      <li aria-current={summary ? "step" : undefined} data-active={summary}><span>4</span>Ringkasan</li>
    </ol>
    <p className={s.progress} aria-live="polite">{completed} dari 6 pertanyaan terisi</p>
    {summary ? <div className={s.panel}>
      <h3 ref={heading} tabIndex={-1}>Ringkasan refleksi Anda</h3>
      <p>Baca kembali jawaban Anda. Gunakan ringkasan ini sebagai bekal berdiskusi dengan guru, pendamping, atau kelompok.</p>
      <dl className={s.summary}>
        {prompts.map((p, i) => <div key={p.title}><dt>{i + 1}. {p.title}</dt><dd>{answers[i]}</dd></div>)}
        <div><dt>Tanggal tinjauan</dt><dd>{date || "Belum ditetapkan"}</dd></div>
      </dl>
      <fieldset className={s.checklist}><legend>Periksa kembali rencana Anda (opsional)</legend>
        {reviewItems.map((item, i) => <label key={item}><input type="checkbox" checked={checks[i]} onChange={e => { setChecks(checks.map((c, n) => n === i ? e.target.checked : c)); changed(); }} />{item}</label>)}
      </fieldset>
      <div className={s.feedback} aria-live="polite">
        <strong>{reviewed} dari 3 hal telah Anda tinjau.</strong>
        <p>{reviewed === 3 ? "Anda telah meninjau ketiga hal. Diskusikan kelayakan rencana dengan pihak yang terlibat dan catat hasil pelaksanaannya." : "Sebelum mulai, tinjau kembali hal yang belum dicentang. Anda tetap dapat mengunduh ringkasan dan memperbaikinya kemudian."}</p>
        <p className={s.small}>Centang merupakan penilaian mandiri, bukan pemeriksaan otomatis atas kualitas jawaban.</p>
      </div>
      <div className={s.actions}>
        <button type="button" className={s.primary} onClick={download}>Unduh refleksi (.txt)</button>
        <button type="button" className={s.secondary} onClick={save}>Simpan draf hasil</button>
        <button type="button" className={s.secondary} onClick={() => go(0)}>Sunting jawaban</button>
      </div>
      <a className={s.link} href="#proyek">Kembangkan aksi melalui panduan proyek 8 minggu →</a>
    </div> : <form className={s.panel} onSubmit={advance} noValidate>
      <h3 ref={heading} tabIndex={-1}>Tahap {stage + 1}: {stages[stage].title}</h3>
      <p>{stages[stage].description}</p>
      {prompts.slice(stage * 2, stage * 2 + 2).map((p, offset) => {
        const i = stage * 2 + offset;
        return <div className={s.field} key={p.title}>
          <label htmlFor={"reflection-" + i}>{i + 1}. {p.title} <span className={s.small}>(wajib)</span></label>
          <p id={"reflection-hint-" + i} className={s.hint}>{p.hint}</p>
          <textarea id={"reflection-" + i} ref={el => { fields.current[i] = el; }} rows={5} maxLength={LIMIT} value={answers[i]} required aria-invalid={invalid === i} aria-describedby={"reflection-hint-" + i + (invalid === i ? " reflection-error" : "")} onChange={e => { setAnswers(answers.map((a, n) => n === i ? e.target.value : a)); if (invalid === i) setInvalid(null); changed(); }} />
          <small>{answers[i].length} / {LIMIT} karakter</small>
        </div>;
      })}
      {stage === 2 && <div className={s.field}><label htmlFor="reflection-date">Tanggal untuk meninjau hasil (opsional)</label><input id="reflection-date" type="date" value={date} onChange={e => { setDate(e.target.value); changed(); }} /></div>}
      {invalid !== null && <p className={s.error} id="reflection-error" role="alert">Isi pertanyaan {invalid + 1} sebelum melanjutkan.</p>}
      <div className={s.actions}>
        {stage > 0 && <button type="button" className={s.secondary} onClick={() => go(stage - 1)}>Kembali</button>}
        <button type="submit" className={s.primary}>{stage === 2 ? "Lihat ringkasan refleksi" : "Lanjut ke tahap " + (stage + 2)}</button>
      </div>
    </form>}
  </div>;
}
