"use client";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { decisionProjects, statusLabels, type Decision, type DecisionStatus } from "@/lib/ai-control-center/decisions";

const input = "mt-2 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-amber-600";
const button = "rounded-lg bg-slate-950 px-4 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50";
const secondary = "rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold disabled:opacity-50";
const date = (v: string) => new Date(v).toLocaleString("id-ID", { timeZone: "Asia/Jakarta", dateStyle: "medium", timeStyle: "short" });
async function request(url: string, method: string, body?: unknown) {
  const response = await fetch(url, { method, headers: body ? { "Content-Type": "application/json" } : undefined, body: body ? JSON.stringify(body) : undefined, cache: "no-store" });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Permintaan belum berhasil. Silakan coba kembali.");
  return data;
}
export default function DecisionWorkspace() {
  const [rows, setRows] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [creating, setCreating] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [project, setProject] = useState("");
  const [query, setQuery] = useState("");
  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await request("/api/control-center/decisions", "GET");
      setRows(data.decisions); setError("");
    } catch (e) { setError(e instanceof Error ? e.message : "Tidak dapat memuat keputusan."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void refresh(); const id = new URLSearchParams(window.location.search).get("id"); setSelected(id); }, [refresh]);
  function select(id: string | null) {
    setSelected(id); setCreating(false);
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("id", id); else url.searchParams.delete("id");
    window.history.replaceState(null, "", url);
  }
  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    setBusy(true); setError("");
    try {
      const data = await request("/api/control-center/decisions", "POST", values);
      setRows(current => [data.decision, ...current]); select(data.decision.id);
    } catch (e) { setError(e instanceof Error ? e.message : "Draf belum tersimpan."); }
    finally { setBusy(false); }
  }
  const current = rows.find(d => d.id === selected);
  const filtered = rows.filter(d => (!filter || d.status === filter) && (!project || d.project === project) && (d.title + " " + d.problem).toLowerCase().includes(query.toLowerCase()));
  return <div className="space-y-6">
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {[["Tercatat", rows.length], ["Perlu keputusan", rows.filter(d => d.status === "review").length], ["Tindak lanjut", rows.filter(d => d.status === "approved").length], ["Selesai", rows.filter(d => d.status === "completed").length]].map(([label, count]) =>
        <div key={label} className="rounded-xl border border-stone-300 bg-white p-5"><p className="text-sm text-slate-600">{label}</p><p className="mt-2 text-3xl font-black">{loading ? "—" : count}</p></div>)}
    </div>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="max-w-2xl text-sm leading-6 text-slate-600">Sumber saat ini: bukti yang dimasukkan administrator. Sinkronisasi otomatis SIMAKS, Institute, dan layanan lain belum terhubung.</p>
      <div className="flex gap-2"><button className={secondary} onClick={() => void refresh()} disabled={loading || busy}>Muat ulang</button><button className={button} onClick={() => { setCreating(true); setSelected(null); }} disabled={busy}>+ Keputusan baru</button></div>
    </div>
    {error && <div role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-900">{error}</div>}
    {creating ? <form onSubmit={create} className="rounded-2xl border border-stone-300 bg-white p-5 sm:p-7">
      <h2 className="text-2xl font-bold">Susun masalah keputusan</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">Gunakan ringkasan atau data agregat. Jangan masukkan identitas peserta, dokumen klien rahasia, kata sandi, atau kunci API.</p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="text-sm font-semibold">Program<select name="project" className={input}>{decisionProjects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
        <label className="text-sm font-semibold">Risiko keputusan<select name="risk" defaultValue="medium" className={input}><option value="low">Rendah</option><option value="medium">Sedang</option><option value="high">Tinggi</option></select></label>
        <label className="text-sm font-semibold md:col-span-2">Judul<input name="title" required minLength={5} maxLength={160} placeholder="Contoh: Prioritas pendampingan peserta pelatihan AI" className={input}/></label>
        <label className="text-sm font-semibold md:col-span-2">Masalah dan keputusan yang diperlukan<textarea name="problem" required minLength={20} maxLength={4000} rows={3} className={input} placeholder="Apa yang perlu diputuskan, untuk siapa, dan mengapa sekarang?"/></label>
        <label className="text-sm font-semibold md:col-span-2">Bukti dan data pendukung<textarea name="evidence" required minLength={20} maxLength={12000} rows={5} className={input} placeholder="Tuliskan data agregat, periode pengamatan, temuan, serta hal yang belum diketahui."/></label>
        <label className="text-sm font-semibold">Sumber dan periode data<textarea name="source" required minLength={3} maxLength={2000} rows={3} className={input} placeholder="Nama laporan, tanggal, tautan bila tersedia. Isi tautan tidak diambil otomatis."/></label>
        <label className="text-sm font-semibold">Indikator keberhasilan<textarea name="metric" required minLength={5} maxLength={1000} rows={3} className={input} placeholder="Hasil yang ingin dicapai, target, dan waktu evaluasi."/></label>
      </div>
      <div className="mt-6 flex flex-wrap gap-3"><button type="submit" className={button} disabled={busy}>{busy ? "Menyimpan…" : "Simpan draf"}</button><button type="button" className={secondary} disabled={busy} onClick={() => setCreating(false)}>Batal</button></div>
    </form> : current ? <DecisionDetail key={current.id} decision={current} back={() => select(null)} changed={refresh} onBusy={setBusy}/> : <>
      <div className="grid gap-3 md:grid-cols-3">
        <label className="text-sm font-semibold">Cari keputusan<input type="search" className={input} value={query} onChange={e => setQuery(e.target.value)} placeholder="Judul atau masalah"/></label>
        <label className="text-sm font-semibold">Program<select className={input} value={project} onChange={e => setProject(e.target.value)}><option value="">Semua program</option>{decisionProjects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
        <label className="text-sm font-semibold">Status<select className={input} value={filter} onChange={e => setFilter(e.target.value)}><option value="">Semua status</option>{Object.entries(statusLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
      </div>
      {loading ? <p role="status" className="py-10 text-slate-600">Memuat keputusan…</p> : selected && !current ? <p role="status">Keputusan pada tautan tidak ditemukan atau tidak dapat diakses. <button className={secondary} onClick={() => select(null)}>Lihat daftar</button></p> : !filtered.length ? <div className="rounded-2xl border border-dashed border-stone-400 bg-white px-6 py-12 text-center"><h2 className="text-xl font-bold">{rows.length ? "Tidak ada keputusan yang sesuai filter" : "Mulai dengan satu keputusan nyata"}</h2><p className="mt-3 text-slate-600">{rows.length ? "Ubah pencarian atau filter program." : "Buat draf dengan masalah, bukti, dan hasil yang ingin dicapai."}</p></div> :
      <div className="grid gap-4 lg:grid-cols-2">{filtered.map(d => <button key={d.id} onClick={() => select(d.id)} className="rounded-xl border border-stone-300 bg-white p-6 text-left transition hover:border-amber-600 focus-visible:outline-2 focus-visible:outline-amber-700">
        <div className="flex flex-wrap justify-between gap-3 text-sm"><span className="font-semibold text-amber-800">{decisionProjects.find(p => p.id === d.project)?.name}</span><span className="rounded-full bg-stone-100 px-3 py-1 font-semibold">{statusLabels[d.status]}</span></div>
        <h2 className="mt-4 text-xl font-bold">{d.title}</h2><p className="mt-3 line-clamp-2 leading-7 text-slate-600">{d.problem}</p>
        <p className="mt-5 text-sm text-slate-500">Risiko {({ low: "rendah", medium: "sedang", high: "tinggi" })[d.risk]} · {date(d.created_at)} WIB</p>
      </button>)}</div>}
      <p className="text-sm text-slate-500">Menampilkan maksimal 200 keputusan terbaru milik akun ini.</p>
    </>}
  </div>;
}
function DecisionDetail({ decision: d, back, changed, onBusy }: { decision: Decision; back: () => void; changed: () => Promise<void>; onBusy: (value: boolean) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [note, setNote] = useState(d.note);
  const [assignee, setAssignee] = useState(d.assignee);
  const [due, setDue] = useState(d.due_date || "");
  const [message, setMessage] = useState("");
  async function act(status?: DecisionStatus) {
    setBusy(true); onBusy(true); setError(""); setMessage("");
    try {
      await request("/api/control-center/decisions/" + d.id + (status ? "" : "/analyze"), status ? "PATCH" : "POST", status ? { status, note, assignee, due_date: due } : { consent });
      await changed(); setMessage(status ? "Keputusan dan riwayat tersimpan." : "Analisis tersimpan. Periksa sebelum mengambil keputusan.");
    } catch (e) { setError(e instanceof Error ? e.message : "Tindakan belum berhasil."); await changed(); }
    finally { setBusy(false); onBusy(false); }
  }
  function exportDecision() {
    const text = [d.title, "Program: " + d.project, "Status: " + statusLabels[d.status], "Masalah\n" + d.problem, "Bukti\n" + d.evidence, "Sumber\n" + d.source, "Indikator\n" + d.metric, "Analisis AI (perlu pemeriksaan manusia)\n" + (d.analysis || "Belum tersedia"), "Model: " + (d.model || "—"), "Keputusan/tindak lanjut\n" + d.note, "Penanggung jawab: " + d.assignee, "Tenggat: " + (d.due_date || "—"), "Riwayat\n" + d.history.map(h => date(h.at) + " WIB — " + h.action + ": " + h.note).join("\n")].join("\n\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = "keputusan-" + d.id + ".txt"; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const stale = d.status === "analyzing" && !!d.analysis_started_at && Date.now() - Date.parse(d.analysis_started_at) > 120000;
  return <article className="space-y-5">
    <div className="flex flex-wrap justify-between gap-3"><button className={secondary} disabled={busy} onClick={back}>Kembali ke daftar</button><button className={secondary} onClick={exportDecision}>Unduh catatan</button></div>
    <div className="rounded-2xl border border-stone-300 bg-white p-5 sm:p-7"><p className="text-sm font-bold text-amber-800">{decisionProjects.find(p => p.id === d.project)?.name} · {statusLabels[d.status]}</p><h2 className="mt-3 text-2xl font-black">{d.title}</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">{[["Masalah", d.problem], ["Bukti yang diberikan", d.evidence], ["Sumber dan periode", d.source], ["Indikator keberhasilan", d.metric]].map(([label, value]) => <section key={label}><h3 className="font-bold">{label}</h3><p className="mt-2 whitespace-pre-wrap break-words leading-7 text-slate-600">{value}</p></section>)}</div>
    </div>
    <section className="rounded-2xl border border-stone-300 bg-[#111526] p-5 text-white sm:p-7"><h3 className="text-xl font-bold">Analisis dan pilihan tindakan</h3>
      {d.analysis ? <><p className="mt-2 text-sm text-amber-300">Masukan AI — perlu pemeriksaan manusia. Model: {d.model}</p><div className="mt-5 whitespace-pre-wrap break-words leading-8 text-slate-100">{d.analysis}</div><p className="mt-5 text-sm text-slate-400">ID analisis: {d.generation_id}. Pemakaian token tersimpan; biaya aktual mengikuti tagihan penyedia.</p></> :
      <><p className="mt-3 leading-7 text-slate-300">{d.status === "analyzing" ? "Analisis sedang berjalan. Muat ulang untuk melihat hasil. Proses yang terputus dapat dicoba lagi setelah dua menit." : "AI akan menggunakan masalah dan bukti dalam draf ini untuk menyusun alternatif. Tidak ada data program yang diambil otomatis."}</p>
      <label className="mt-5 flex items-start gap-3 text-sm leading-6"><input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1 h-5 w-5 shrink-0"/><span>Saya telah memeriksa data ini dan mengizinkan pengirimannya ke layanan AI yang dikonfigurasi. Analisis memakai kuota layanan AI.</span></label>
      <button className="mt-5 rounded-lg bg-amber-400 px-5 py-3 font-bold text-slate-950 disabled:opacity-50" disabled={busy || !consent || (d.status !== "draft" && !stale) || d.attempts >= 3} onClick={() => void act()}>{busy ? "Menganalisis…" : stale ? "Coba ulang proses terputus" : "Analisis dengan AI"}</button>
      {d.attempts >= 3 && <p className="mt-3 text-sm text-amber-200">Batas tiga percobaan untuk draf ini tercapai.</p>}</>}
    </section>
    {error && <p role="alert" className="rounded-lg bg-red-50 p-4 text-red-900">{error}</p>}
    {message && <p role="status" className="rounded-lg bg-emerald-50 p-4 text-emerald-900">{message}</p>}
    {["review", "deferred", "approved"].includes(d.status) && <section className="rounded-2xl border border-stone-300 bg-white p-5 sm:p-7"><h3 className="text-xl font-bold">Keputusan Bapak dan tindak lanjut</h3><p className="mt-2 text-sm leading-6 text-slate-600">Pencatatan persetujuan tidak menjalankan tindakan otomatis. Tindak lanjut dilaksanakan oleh penanggung jawab.</p>
      {d.risk === "high" && <p className="mt-4 rounded-lg bg-amber-50 p-3 text-amber-900">Risiko tinggi: pastikan bukti dan dampak telah diperiksa sebelum menyetujui.</p>}
      <div className="mt-5 grid gap-5 md:grid-cols-2"><label className="text-sm font-semibold md:col-span-2">{d.status === "approved" ? "Hasil pelaksanaan dan evaluasi" : "Pilihan yang diputuskan, alasan, dan langkah selanjutnya"}<textarea value={note} onChange={e => setNote(e.target.value)} maxLength={2000} rows={4} className={input}/></label><label className="text-sm font-semibold">Penanggung jawab<input value={assignee} onChange={e => setAssignee(e.target.value)} maxLength={160} className={input}/></label><label className="text-sm font-semibold">Tenggat<input type="date" value={due} onChange={e => setDue(e.target.value)} className={input}/></label></div>
      <div className="mt-5 flex flex-wrap gap-3">{d.status === "approved" ? <button className={button} disabled={busy || note.trim().length < 10} onClick={() => void act("completed")}>Catat selesai dan hasilnya</button> :
      <><button className={button} disabled={busy || note.trim().length < 10 || !assignee.trim() || !due} onClick={() => void act("approved")}>Setujui dan catat tindak lanjut</button>{d.status === "review" && <button className={secondary} disabled={busy || note.trim().length < 10} onClick={() => void act("deferred")}>Tunda</button>}<button className={secondary} disabled={busy || note.trim().length < 10} onClick={() => void act("rejected")}>Tolak</button></>}</div>
    </section>}
    <section className="rounded-2xl border border-stone-300 bg-white p-5 sm:p-7"><h3 className="text-xl font-bold">Riwayat keputusan</h3><ol className="mt-5 space-y-5">{d.history.map((h, i) => <li key={i} className="border-l-2 border-amber-600 pl-4"><p className="font-semibold">{statusLabels[h.action as DecisionStatus] || h.action}</p><p className="mt-1 text-sm text-slate-500">{date(h.at)} WIB</p><p className="mt-2 whitespace-pre-wrap break-words leading-7 text-slate-700">{h.note}</p></li>)}</ol></section>
  </article>;
}
