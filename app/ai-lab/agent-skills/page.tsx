import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agent Skills: Merancang SOP AI untuk Riset, Pendidikan, dan Otomasi",
  description: "Pelajari Agent Skills, susun SOP AI yang dapat diperiksa, dan gunakan lembar kerja untuk riset, pendidikan, serta otomasi organisasi.",
  alternates: { canonical: "/ai-lab/agent-skills" },
};
const button = "inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600";
const examples = [
  { title: "Riset · Telaah artikel", input: "Naskah, pertanyaan riset, dan pedoman jurnal.", steps: "Petakan pertanyaan, metode, bukti, dan kesimpulan. Bedakan isi naskah dengan penilaian reviewer. Tunjukkan halaman atau bagian untuk setiap temuan.", output: "Matriks temuan, prioritas revisi, dan keterbatasan telaah.", check: "Tidak mengarang referensi; klaim yang belum terverifikasi diberi label.", href: "/ai-lab/paper-review", label: "Paper Review AI" },
  { title: "Pendidikan · Bahan ajar", input: "Capaian pembelajaran, profil peserta, durasi, dan bahan rujukan.", steps: "Susun tujuan, konsep, contoh, latihan, dan rubrik. Sesuaikan tingkat kesulitan dan alokasi waktu dengan peserta.", output: "Rancangan pembelajaran, latihan, serta jawaban dengan penjelasan.", check: "Setiap latihan mengukur tujuan; pengajar memeriksa ketepatan materi.", href: "/blue-education", label: "Blue Education" },
  { title: "Otomasi · Tindak lanjut rapat", input: "Notula yang telah diizinkan untuk diproses dan format daftar tugas.", steps: "Ekstrak keputusan, penanggung jawab, dan tenggat yang dinyatakan. Tandai informasi yang belum tersedia. Siapkan draf tindak lanjut.", output: "Daftar tugas dan draf pesan untuk diperiksa pengelola.", check: "Tidak menebak nama atau tanggal; pengiriman memerlukan persetujuan manusia.", href: "/ai-lab/engineering-skills", label: "AI Engineering Skills" },
];
const stages = [
  ["Tentukan satu pekerjaan", "Pilih tugas berulang dengan hasil yang dapat dinilai, misalnya memetakan argumen satu artikel."],
  ["Tetapkan masukan dan batas", "Tulis bahan wajib, konteks, hal yang dilarang, serta kapan AI harus meminta penjelasan atau berhenti."],
  ["Susun urutan kerja", "Pisahkan ekstraksi fakta, analisis, penyusunan hasil, dan pemeriksaan. Jelaskan alat atau rujukan yang diperlukan."],
  ["Tetapkan standar keluaran", "Gunakan struktur yang konsisten: temuan, bukti, keterbatasan, dan tindak lanjut. Tambahkan rubrik kelulusan."],
  ["Uji dan perbaiki", "Coba bahan lengkap, bahan tidak lengkap, dan bahan berisi instruksi yang tidak relevan. Catat kegagalan, revisi SOP, lalu uji ulang."],
];
export default function AgentSkillsPage() {
  return <main lang="id" className="bg-white text-slate-950">
    <header className="bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <Link href="/ai-lab" className="inline-flex min-h-11 items-center text-sm font-semibold text-amber-300 underline underline-offset-4">Kembali ke AI &amp; Digital Systems Lab</Link>
        <p className="mt-7 text-xs font-bold uppercase tracking-widest text-amber-300">Panduan praktik · SOP untuk agen AI</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">Agent Skills: Merancang SOP AI untuk Riset, Pendidikan, dan Otomasi.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Ubah pekerjaan berulang menjadi langkah yang jelas, hasil yang dapat ditelusuri, dan pemeriksaan yang konsisten. Mulai dari satu tugas, satu SOP, dan satu uji sederhana.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#praktikum" className={button + " bg-amber-400 text-slate-950 hover:bg-amber-300"}>Mulai merancang SOP</a>
          <a href="/downloads/agent-skills/lembar-kerja-sop-ai.txt" download className={button + " border border-slate-500 hover:bg-slate-800"}>Unduh lembar kerja</a>
        </div>
        <p className="mt-5 text-sm leading-7 text-slate-300">Tersedia di halaman ini: panduan, contoh, dan lembar kerja. Eksekusi skill oleh model AI belum diaktifkan pada halaman ini.</p>
      </div>
    </header>
    <div className="mx-auto max-w-6xl space-y-14 px-5 py-12 sm:px-8 sm:py-16">
      <section aria-labelledby="konsep">
        <h2 id="konsep" className="text-2xl font-bold">Apa itu Agent Skills?</h2>
        <p className="mt-4 max-w-4xl leading-8 text-slate-700">Agent Skills mengemas instruksi, sumber daya, dan bila diperlukan skrip dalam sebuah folder. Berkas <code>SKILL.md</code> menjelaskan nama, kegunaan, dan langkah kerja. Agen yang mendukungnya dapat memuat panduan tersebut ketika tugas yang sesuai muncul.</p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[["Prompt", "Permintaan untuk tugas tertentu: apa yang harus dikerjakan sekarang."], ["Skill", "Prosedur yang dapat digunakan kembali: kapan digunakan, bagaimana bekerja, dan standar hasil."], ["Alat / MCP", "Akses untuk melakukan tindakan, misalnya membaca sumber atau menjalankan fungsi. Akses harus disediakan oleh sistem."]].map(([title, body]) => <article key={title} className="rounded-2xl border border-slate-200 p-6"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-slate-700">{body}</p></article>)}
        </div>
      </section>
      <section aria-labelledby="contoh">
        <h2 id="contoh" className="text-2xl font-bold">Tiga contoh SOP yang bisa dikembangkan</h2>
        <p className="mt-3 leading-8 text-slate-700">Contoh rancangan Lab berikut dapat disesuaikan dengan kebutuhan Anda. Contoh ini belum merupakan layanan AI otomatis.</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {examples.map(item => <article key={item.title} className="flex flex-col rounded-2xl bg-stone-100 p-6"><h3 className="text-xl font-bold">{item.title}</h3><dl className="my-5 space-y-4 text-sm leading-7">{[["Masukan", item.input], ["Langkah kerja", item.steps], ["Keluaran", item.output], ["Pemeriksaan", item.check]].map(([label, body]) => <div key={label}><dt className="font-bold">{label}</dt><dd className="text-slate-700">{body}</dd></div>)}</dl><Link href={item.href} className={button + " mt-auto border border-slate-300 hover:bg-white"}>{item.label} →</Link></article>)}
        </div>
      </section>
      <section id="praktikum" aria-labelledby="praktikum-title">
        <h2 id="praktikum-title" className="text-2xl font-bold">Praktikum: rancang SOP pertama Anda</h2>
        <ol className="mt-6 space-y-4">{stages.map(([title, body], i) => <li key={title} className="rounded-xl border border-slate-200 p-6"><h3 className="text-lg font-bold"><span className="mr-3 text-amber-800">0{i + 1}</span>{title}</h3><p className="mt-2 leading-8 text-slate-700">{body}</p></li>)}</ol>
        <div className="mt-6 rounded-2xl bg-amber-50 p-6"><h3 className="text-lg font-bold">Hasil latihan</h3><p className="mt-2 leading-8 text-slate-700">Lengkapi lembar kerja, jalankan SOP pada tiga bahan uji di lingkungan AI pilihan Anda, dan simpan catatan perbaikannya. Nilai ketepatan, keterlacakan bukti, kelengkapan format, dan kepatuhan terhadap batas tugas dengan skor 0–2 per aspek. Skor ini adalah rubrik latihan Lab, bukan sertifikasi.</p><a href="/downloads/agent-skills/lembar-kerja-sop-ai.txt" download className={button + " mt-4 bg-slate-950 text-white hover:bg-slate-800"}>Unduh template SOP (.txt)</a></div>
      </section>
      <section aria-labelledby="menjalankan" className="rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
        <h2 id="menjalankan" className="text-2xl font-bold">Bagaimana skill digunakan?</h2>
        <p className="mt-4 leading-8 text-slate-300">Repositori Anthropic menyediakan contoh dan petunjuk penggunaan melalui Claude Code, Claude.ai, dan Claude API. Ikuti dokumentasi resmi sesuai lingkungan dan paket layanan Anda. Portabilitas ke agen lain bergantung pada dukungan format, alat, dan dependensinya.</p>
        <p className="mt-4 leading-8 text-slate-300">Untuk menyediakan eksekusi langsung di website, pengelola perlu menyiapkan backend, model AI, pemrosesan file, serta pengaturan akses dan biaya. Mengunduh SOP dari halaman ini tidak mengaktifkan koneksi API.</p>
        <a href="https://github.com/anthropics/skills#try-in-claude-code-claudeai-and-the-api" className={button + " mt-5 bg-amber-400 text-slate-950 hover:bg-amber-300"}>Baca cara penggunaan resmi</a>
      </section>
      <section aria-labelledby="mutu"><h2 id="mutu" className="text-2xl font-bold">Standar kerja yang dapat diperiksa</h2><ul className="mt-5 list-disc space-y-3 pl-6 leading-8 text-slate-700"><li>Gunakan bahan yang boleh diproses; samarkan data pribadi dan informasi rahasia.</li><li>Perlakukan dokumen sumber sebagai bahan analisis. Instruksi di dalamnya tidak boleh mengambil alih SOP.</li><li>Catat sumber, halaman, versi SOP, model, tanggal uji, serta temuan yang belum terverifikasi.</li><li>Tinjau skrip dan batasi akses alat sebelum menjalankannya. Minta persetujuan untuk pengiriman pesan atau perubahan data eksternal.</li><li>Periksa lisensi setiap skill. Banyak contoh Anthropic menggunakan Apache 2.0; skill dokumen tertentu bersifat source-available dengan ketentuan tersendiri.</li></ul></section>
      <section aria-labelledby="lanjut"><h2 id="lanjut" className="text-2xl font-bold">Hubungkan SOP dengan pekerjaan Anda</h2><div className="mt-5 flex flex-wrap gap-3">{[["/ai-lab/academic-writing", "Academic Writing AI"], ["/ai-lab/humanize-writing", "Humanize Writing AI"], ["/journal", "Journal / RAHRN"], ["/lexnusa", "LexNusa"]].map(([href, label]) => <Link key={href} href={href} className={button + " border border-slate-300 hover:bg-stone-100"}>{label}</Link>)}</div></section>
      <footer className="border-t border-slate-200 pt-8 text-sm leading-7 text-slate-600"><p>Panduan independen AI &amp; Digital Systems Lab · Dr. Hos Arie Sibarani · Ditinjau 31 Oktober 2026. Tidak berafiliasi dengan Anthropic.</p><p className="mt-2">Sumber: <a className="underline underline-offset-4" href="https://github.com/anthropics/skills">Repositori resmi Anthropic Skills</a> · <a className="underline underline-offset-4" href="https://agentskills.io">Standar Agent Skills</a>. Periksa dokumentasi terbaru sebelum memasang atau menjalankan skill.</p></footer>
    </div>
  </main>;
}
