import type { Metadata } from "next";
import Link from "next/link";
import Practice from "./Practice";
export const metadata: Metadata = {
  title: "Hallmark: Praktik Audit dan Desain Website",
  description: "Praktikum 60 menit untuk memasang Hallmark pada agen pengembang, mengaudit halaman, memperbaiki desain, dan mengevaluasi hasil dengan bukti.",
  alternates: { canonical: "/ai-lab/hallmark" },
};
const linkStyle = "inline-flex min-h-11 items-center font-semibold text-amber-900 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700";
const codeStyle = "mt-4 overflow-x-auto rounded-lg bg-slate-950 p-5 text-sm leading-7 text-slate-100";
export default function HallmarkPage() {
  return <div lang="id" className="bg-stone-50 text-slate-950">
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
      <Link href="/ai-lab#hallmark" className={linkStyle}>Kembali ke katalog AI Lab</Link>
      <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">Hallmark: audit, perbaiki, buktikan</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">Latihan desain website bersama agen AI, dari temuan hingga perbaikan teruji.</p>
      <a href="#praktikum" className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">Mulai praktik 60 menit</a>
      <p className="mt-5 text-sm leading-6 text-slate-600">Materi oleh Dr. Hos Arie Sibarani. Untuk mahasiswa, dosen, peneliti, dan pengembang yang sudah mengenal berkas proyek serta terminal.</p>
    </div></header>
    <div className="mx-auto max-w-4xl space-y-10 px-5 py-10 sm:px-8">
      <section id="video" aria-labelledby="video-title" className="scroll-mt-6">
        <h2 id="video-title" className="text-2xl font-bold">Video pembelajaran dan materi presentasi</h2>
        <p className="mt-3 leading-8 text-slate-700">Jangan Asal Suruh AI! Pelajari cara mengaudit dan memperbaiki website dengan Hallmark, menetapkan batas kerja agen, serta memeriksa hasilnya. Materi oleh Dr. Hos Arie Sibarani; video berdurasi sekitar 20 menit dengan subtitle bahasa Indonesia.</p>
        <div className="mt-5 aspect-video overflow-hidden rounded-xl border border-slate-300 bg-slate-950">
          <iframe src="https://www.youtube-nocookie.com/embed/F8iAcDLHALQ" title="Jangan Asal Suruh AI! Cara Audit dan Perbaiki Website dengan Hallmark — Dr. Hos Arie Sibarani" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="h-full w-full border-0" />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href="/downloads/hallmark/audit-desain-web-berbasis-ai.pdf" download className="inline-flex min-h-12 items-center rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">Unduh materi presentasi PDF · 15 halaman</a>
          <a href="https://youtu.be/F8iAcDLHALQ" target="_blank" rel="noopener noreferrer" className={linkStyle}>Tonton di YouTube</a>
        </div>
      </section>
      <section aria-labelledby="hasil"><h2 id="hasil" className="text-2xl font-bold">Hasil yang Anda buat</h2>
        <p className="mt-3 leading-8 text-slate-700">Satu laporan audit, satu perbaikan halaman pada salinan proyek, bukti sebelum dan sesudah, serta refleksi berbasis rubrik. Pilih halaman sederhana dengan satu tujuan pengunjung.</p>
        <p className="mt-3 leading-8 text-slate-700">Hallmark adalah skill untuk agen pengembang seperti Codex, Claude Code, dan Cursor. Ia menyediakan aturan desain, referensi tema, dan pemeriksa statis. Halaman ini menyediakan materi praktik dan rubrik; tidak menjalankan agen atau memindai URL pengunjung secara otomatis.</p>
      </section>
      <section aria-labelledby="setup" className="border-t border-slate-300 pt-8"><h2 id="setup" className="text-2xl font-bold">Siapkan lingkungan pengembang</h2>
        <p className="mt-3 leading-8 text-slate-700">Gunakan komputer dengan Git, Node.js, dan agen yang kompatibel. Hallmark memerlukan Node 18 atau lebih baru; ikuti kebutuhan versi Node proyek Anda bila lebih tinggi. Dari folder proyek, pasang untuk Codex:</p>
        <pre className={codeStyle}><code>{'npx skills add nutlope/hallmark --agent codex'}</code></pre>
        <p className="mt-3 leading-7 text-slate-700">Perintah mengikuti versi yang tersedia di repositori sumber. Tinjau versi dan pilihan pemasangannya. Gunakan <code>--agent claude-code</code> atau <code>--agent cursor</code> sesuai lingkungan Anda; tambahkan <code>-g</code> hanya jika ingin pemasangan global.</p>
        <details className="mt-5 rounded-lg border border-slate-300 bg-white p-5"><summary className="cursor-pointer font-semibold focus-visible:outline-2 focus-visible:outline-amber-700">Pengembangan di proyek Hossibarani</summary>
          <p className="mt-3 leading-7 text-slate-700">Salinan Hallmark dikunci pada versi sumber yang ditinjau dalam proyek. Setelah mengambil kode proyek, muat dependensi skill dan jalankan audit:</p>
          <pre className={codeStyle}><code>{'git submodule update --init --depth 1\nnpm run audit:design -- app/ai-lab/page.tsx'}</code></pre>
          <p className="mt-3 text-sm leading-6 text-slate-600">Perintah audit memeriksa berkas lokal dan meneruskan hasil pemeriksa. Temuan FAIL dapat menghasilkan kode keluar gagal; ini berbeda dari kegagalan pemasangan. Agen membutuhkan akses ke folder proyek untuk menggunakan skill.</p>
        </details>
      </section>
      <section id="praktikum" aria-labelledby="langkah" className="scroll-mt-6 border-t border-slate-300 pt-8"><h2 id="langkah" className="text-2xl font-bold">Praktikum 60 menit</h2>
        <ol className="mt-5 list-decimal space-y-6 pl-6 leading-8 text-slate-700">
          <li><strong className="text-slate-950">Tetapkan tujuan — 10 menit.</strong> Pilih halaman, audiens, dan satu tindakan utama. Catat URL, tautan, isi, formulir, dan fungsi yang harus tetap tersedia. Simpan tangkapan layar awal.</li>
          <li><strong className="text-slate-950">Audit — 15 menit.</strong> Minta Hallmark membaca halaman. Catat tiga temuan beserta bukti dan dampaknya. Tandai temuan sebagai terkonfirmasi, positif palsu, atau belum diperiksa.</li>
          <li><strong className="text-slate-950">Perbaiki — 20 menit.</strong> Kerjakan satu prioritas pada cabang atau salinan proyek. Pertahankan informasi yang benar, identitas visual, dan fungsi. Periksa perubahan kode.</li>
          <li><strong className="text-slate-950">Uji dan refleksi — 15 menit.</strong> Jalankan audit ulang dan build. Periksa layar ponsel serta desktop, keyboard, tautan, dan isi yang dipertahankan. Isi rubrik dan sebutkan batas pengujian.</li>
        </ol>
        <a href="/downloads/hallmark/lembar-kerja-hallmark.txt" download className={linkStyle}>Unduh lembar kerja praktik (.txt)</a>
      </section>
      <section aria-labelledby="prompt" className="border-t border-slate-300 pt-8"><h2 id="prompt" className="text-2xl font-bold">Instruksi untuk agen</h2>
        <p className="mt-3 leading-7 text-slate-700">Contoh berikut menggunakan Codex. Claude Code dan Cursor menggunakan <code>/hallmark</code>. Sesuaikan lokasi berkas dengan proyek.</p>
        <pre className={codeStyle}><code>{'$hallmark audit app/ai-lab/page.tsx\n\nTujuan: pengunjung menemukan materi yang sesuai.\nLaporkan temuan, bukti, dampak, dan prioritas.\nBedakan pemeriksaan statis dari hasil browser.\nJangan ubah berkas atau terbitkan perubahan.'}</code></pre>
        <pre className={codeStyle}><code>{'$hallmark redesign app/ai-lab/page.tsx\n\nKerjakan pada salinan proyek. Pertahankan warna,\nURL, isi faktual, status layanan, dan fungsi.\nPerbaiki satu masalah prioritas hasil audit.\nTampilkan perbandingan dan hasil pengujian.\nJangan deploy sebelum hasil ditinjau.'}</code></pre>
      </section>
      <section aria-labelledby="contoh" className="border-t border-slate-300 pt-8"><h2 id="contoh" className="text-2xl font-bold">Contoh nyata: membaca hasil audit Lab</h2>
        <p className="mt-3 leading-8 text-slate-700">Audit statis katalog pada 2 November 2026 mencatat 3 FAIL, 1 REFLEX, dan 2 WARN. Hasil ini adalah rekaman versi awal setelah peringkasan katalog, bukan skor halaman terkini. Pemeriksaan render tidak dijalankan.</p>
        <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[540px] border-collapse text-left text-sm leading-6"><caption className="mb-3 text-left text-slate-600">Contoh interpretasi, bukan keputusan otomatis</caption><thead><tr className="border-b border-slate-400"><th className="p-3">Temuan</th><th className="p-3">Makna untuk praktik</th></tr></thead><tbody>
          <tr className="border-b border-slate-200"><td className="p-3 align-top">Fokus keyboard tidak terdeteksi</td><td className="p-3">Kode menggunakan variabel kelas bersama. Pemeriksa statis mungkin tidak menelusurinya; uji tombol Tab dan indikator fokus pada browser sebelum menyimpulkan.</td></tr>
          <tr className="border-b border-slate-200"><td className="p-3 align-top">Rangkaian teks dengan tanda titik tengah</td><td className="p-3">Ini aturan gaya Hallmark. Pertimbangkan pemisahan label; jangan menyamakannya dengan kerusakan fungsi atau pelanggaran aksesibilitas.</td></tr>
          <tr className="border-b border-slate-200"><td className="p-3 align-top">Palet bawaan dan paragraf pembuka</td><td className="p-3">Tinjau konsistensi identitas serta kejelasan pesan. Peringatan merupakan masukan untuk evaluasi, bukan bukti bahwa pengguna gagal memahami halaman.</td></tr>
        </tbody></table></div>
        <a href="/downloads/hallmark/audit-awal-katalog.json" download className={linkStyle}>Unduh hasil audit dan identitas versi (.json)</a>
      </section>
      <Practice />
      <section aria-labelledby="batas" className="border-t border-slate-300 pt-8"><h2 id="batas" className="text-2xl font-bold">Batas alat dan sumber</h2>
        <p className="mt-3 leading-8 text-slate-700">Pemeriksaan statis tidak membuktikan fungsi backend, kontras aktual, atau pengalaman pengguna. Mode render Hallmark memerlukan Chrome dan puppeteer-core pada lingkungan yang mendukungnya. Tetap lakukan tinjauan manusia dan catat pemeriksaan yang belum dikerjakan.</p>
        <p className="mt-3 leading-8 text-slate-700">Materi merujuk Hallmark v2.0.0, commit <code className="break-all">4f6a46c6dc325d40ab268c93e25c7b96676ebccd</code>. Proyek berlisensi MIT; foto mengikuti lisensi masing-masing. Lab tidak berafiliasi dengan pengembang Hallmark.</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2"><a href="https://github.com/Nutlope/hallmark" className={linkStyle}>Repositori resmi Hallmark</a><Link href="/ai-lab/anti-slop" className={linkStyle}>Panduan Anti-Slop</Link><Link href="/ai-lab/agent-skills" className={linkStyle}>Dasar Agent Skills</Link></div>
      </section>
    </div>
  </div>;
}
