"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";

export default function CollaborationForm() {
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const output = useRef<HTMLHeadingElement>(null);

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const name = String(values.get("name") ?? "").trim();
    const idea = String(values.get("idea") ?? "").trim();
    if (!name || idea.length < 20) {
      setError(!name ? "Tuliskan nama lengkap Anda." : "Tuliskan gagasan minimal 20 karakter, selain spasi.");
      event.currentTarget.querySelector<HTMLInputElement | HTMLTextAreaElement>(!name ? "#biaf-name" : "#biaf-idea")?.focus();
      return;
    }
    setError("");
    setDraft([
      "USULAN KOLABORASI — BIAF", "Batam International Academic Forum", "",
      `Nama: ${name}`,
      `Institusi / komunitas: ${String(values.get("institution") ?? "").trim() || "Belum dicantumkan"}`,
      `Bentuk kolaborasi: ${values.get("interest")}`, "", "Gagasan awal:", idea, "",
      "Draf untuk pembicaraan awal. Belum dikirim kepada BIAF.",
    ].join("\n"));
    setStatus("Draf siap disalin atau diunduh. Belum dikirim.");
    requestAnimationFrame(() => output.current?.focus());
  }

  async function copy() {
    try { await navigator.clipboard.writeText(draft); setStatus("Ringkasan berhasil disalin. Lanjutkan melalui halaman kontak bila ingin menyampaikannya."); }
    catch { setStatus("Penyalinan otomatis tidak tersedia. Pilih teks ringkasan untuk menyalinnya atau gunakan Unduh .txt."); }
  }

  function download() {
    const url = URL.createObjectURL(new Blob([draft], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = "Usulan-Kolaborasi-BIAF.txt";
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("Unduhan disiapkan. Draf belum dikirim kepada BIAF.");
  }

  return <div className="form-panel">
    <span className="mini-label">LANGKAH PERTAMA</span>
    <h3>Siapkan usulan kolaborasi</h3>
    <p>Susun ringkasan singkat untuk pembicaraan awal.</p>
    <form onSubmit={prepare} onChange={() => { setDraft(""); setStatus(""); setError(""); }}>
      <label htmlFor="biaf-name">Nama lengkap <span>*</span></label>
      <input id="biaf-name" name="name" autoComplete="name" required maxLength={120} placeholder="Nama Anda" />
      <label htmlFor="biaf-institution">Institusi / komunitas</label>
      <input id="biaf-institution" name="institution" autoComplete="organization" maxLength={180} placeholder="Institusi atau peneliti independen" />
      <label htmlFor="biaf-interest">Bentuk kolaborasi <span>*</span></label>
      <select id="biaf-interest" name="interest" required defaultValue="">
        <option value="">Pilih ruang kolaborasi</option>
        <option>Diskusi & forum ilmiah</option><option>Riset lintas disiplin</option>
        <option>Pertukaran pengetahuan</option><option>Kemitraan kelembagaan</option>
      </select>
      <label htmlFor="biaf-idea">Gagasan awal <span>*</span></label>
      <textarea id="biaf-idea" name="idea" rows={3} required minLength={20} maxLength={2400} placeholder="Topik, tujuan, dan kontribusi yang ingin Anda tawarkan (minimal 20 karakter)." />
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      <button className="button dark" type="submit">Buat ringkasan usulan <span aria-hidden="true">↗</span></button>
      <p className="form-note">Formulir ini membuat draf di perangkat Anda. Isian tidak dikirim atau disimpan oleh formulir ini. Salin ringkasannya untuk disampaikan melalui halaman kontak Hos Arie.</p>
    </form>
    {draft ? <div id="draft-result">
      <h4 ref={output} tabIndex={-1}>Ringkasan usulan Anda</h4>
      <pre id="draft-text">{draft}</pre>
      <div className="draft-actions"><button type="button" onClick={copy}>Salin teks</button><button type="button" onClick={download}>Unduh .txt</button></div>
      <Link className="contact-link" href="/id/contact">Buka kontak Hos Arie ↗</Link>
    </div> : null}
    <p id="draft-status" role="status" aria-live="polite">{status}</p>
  </div>;
}
