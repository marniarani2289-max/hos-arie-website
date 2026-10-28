import type { Metadata } from "next";
import Link from "next/link";

const title = "Nakama: Ruang Kerja Agen AI untuk Riset, Pendidikan, dan Kolaborasi";
export const metadata: Metadata = {
  title,
  description: "Kenali Nakama dan rancang agen AI untuk riset, pembelajaran, serta kolaborasi tim. Panduan AI Lab dengan penghubung ke LexNusa dan Journal/RAHRN.",
  alternates: { canonical: "/ai-lab/nakama" },
};
const button = "inline-flex min-h-11 items-center rounded-xl px-5 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700";
const agents = [
  {name: "Agen Riset", goal: "Menata sumber dan memetakan argumentasi.", task: "Baca bahan yang disediakan, susun matriks literatur, pisahkan temuan dari interpretasi, dan tandai informasi yang belum terverifikasi.", output: "Matriks sumber, peta argumen, dan pertanyaan lanjutan.", href: "/ai-lab/paper-review", link: "Pelajari Paper Review AI"},
  {name: "Agen Pendidikan", goal: "Membantu dosen menyiapkan pengalaman belajar.", task: "Berdasarkan materi dan capaian pembelajaran, buat penjelasan bertahap, contoh, serta latihan dengan pembahasan. Sesuaikan tingkat kesulitan dengan peserta.", output: "Rancangan pembelajaran, bahan diskusi, dan latihan yang ditinjau dosen.", href: "/kuliah", link: "Jelajahi modul kuliah"},
  {name: "Agen Kolaborasi", goal: "Merangkum pekerjaan dan tindak lanjut tim.", task: "Dari catatan rapat yang diberikan, bedakan keputusan, usulan, dan pertanyaan terbuka. Catat penanggung jawab dan tenggat hanya jika dinyatakan dalam sumber.", output: "Ringkasan rapat dan daftar tindak lanjut untuk diperiksa tim.", href: "/journals", link: "Jelajahi Journal / RAHRN"},
];
const steps = [
  ["Tentukan pekerjaan", "Pilih satu tugas berulang dan keluaran yang jelas. Mulai dengan dokumen publik atau bahan latihan."],
  ["Siapkan ruang kerja", "Pilih Nakama Cloud atau pemasangan mandiri sesuai dokumentasi resmi. Konfigurasikan penyedia model dan API key; biaya layanan dan pemakaian model perlu diperiksa terpisah."],
  ["Rancang agen", "Tetapkan peran, instruksi, sumber, keterampilan, dan akses alat sesuai tugas. Undang anggota tim dengan peran yang sesuai."],
  ["Uji dengan contoh", "Bandingkan hasil agen dengan sumber asli. Periksa ketepatan, kelengkapan, waktu kerja, dan biaya pemakaian sebelum memperluas penggunaan."],
  ["Tinjau dan perbaiki", "Simpan catatan kesalahan dan revisi instruksi. Publikasi, pengiriman pesan, atau perubahan data dilakukan melalui kewenangan dan pemeriksaan yang ditetapkan tim."],
];

export default function NakamaPage() {
  return <main lang="id" className="bg-white text-slate-900">
    <header className="border-b-4 border-amber-400 bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
        <Link href="/ai-lab" className="inline-flex min-h-11 items-center text-sm font-semibold text-amber-300 underline underline-offset-4">Kembali ke AI &amp; Digital System Lab</Link>
        <p className="mt-7 text-xs font-bold uppercase tracking-widest text-amber-300">Panduan belajar · Agen AI untuk tim</p>
        <h1 className="mt-4 max-w-5xl font-academic text-3xl font-bold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Rancang agen dengan tugas yang jelas, sumber yang dapat ditelusuri, dan hasil yang dapat ditinjau bersama. Mulai dari satu pekerjaan, lalu kembangkan sesuai kebutuhan tim.</p>
        <nav aria-label="Panduan Nakama" className="mt-8 flex flex-wrap gap-3">
          <a href="#agen" className={button + " bg-amber-400 text-slate-950 hover:bg-amber-300"}>Jelajahi contoh agen</a>
          <a href="#mulai" className={button + " border border-slate-500 hover:bg-slate-800"}>Langkah memulai</a>
          <a href="https://github.com/ahmadrosid/nakama" className={button + " border border-slate-500 hover:bg-slate-800"}>Repositori Nakama ↗</a>
        </nav>
      </div>
    </header>
    <div className="mx-auto max-w-6xl space-y-16 px-5 py-12 sm:px-8 sm:py-16">
      <section aria-labelledby="tentang"><h2 id="tentang" className="text-2xl font-bold">Satu ruang kerja, beberapa peran agen</h2>
        <p className="mt-4 max-w-4xl leading-8 text-slate-700">Nakama adalah platform agen AI untuk tim dengan antarmuka percakapan. Setiap agen dapat memiliki instruksi, alat, skills, dan memori sendiri. Dokumentasi pengembang menjelaskan dukungan organisasi, peran anggota, serta kanal Telegram, WhatsApp, Discord, dan Slack.</p>
        <p className="mt-4 max-w-4xl leading-8 text-slate-700">Halaman ini merupakan panduan pembelajaran independen. Contoh di bawah adalah rancangan penerapan, bukan agen yang sudah aktif di website ini. Menjalankan Nakama memerlukan ruang kerja tersendiri dan konfigurasi layanan.</p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-3">{[["Agen", "Peran dengan tujuan dan instruksi khusus."], ["Skills & alat", "Panduan kerja dan kemampuan yang dikonfigurasi untuk menjalankan tugas."], ["Tim & memori", "Kolaborasi anggota dan konteks kerja yang dikelola sesuai akses."]].map(([name, text]) => <div key={name} className="rounded-xl border border-slate-200 p-6"><dt className="font-bold">{name}</dt><dd className="mt-3 leading-7 text-slate-700">{text}</dd></div>)}</dl>
      </section>
      <section id="agen" aria-labelledby="agen-title" className="scroll-mt-28"><p className="text-xs font-bold uppercase tracking-widest text-amber-800">Contoh rancangan · Dapat diadaptasi</p><h2 id="agen-title" className="mt-3 text-3xl font-bold">Tiga peran untuk pekerjaan akademik</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">{agents.map(agent => <article key={agent.name} className="rounded-2xl border border-slate-200 p-6"><h3 className="text-xl font-bold">{agent.name}</h3><p className="mt-3 font-semibold text-amber-800">{agent.goal}</p><p className="mt-4 leading-7 text-slate-700">{agent.task}</p><p className="mt-4 text-sm leading-7"><strong>Keluaran:</strong> {agent.output}</p><details className="mt-5 rounded-lg bg-stone-100 p-4"><summary className="cursor-pointer font-semibold">Contoh instruksi agen</summary><p className="mt-3 whitespace-pre-wrap leading-7">Anda adalah {agent.name.toLowerCase()}. {agent.task} Gunakan hanya sumber yang tersedia atau terverifikasi. Jangan mengarang kutipan, data, maupun keputusan. Nyatakan keterbatasan dan minta informasi yang kurang. Sajikan hasil untuk ditinjau manusia.</p></details><Link href={agent.href} className={button + " mt-5 bg-slate-950 text-white hover:bg-slate-800"}>{agent.link} →</Link></article>)}</div>
      </section>
      <section id="mulai" aria-labelledby="mulai-title" className="scroll-mt-28"><h2 id="mulai-title" className="text-3xl font-bold">Dari rancangan ke uji coba</h2><ol className="mt-6 divide-y divide-slate-200 border-y border-slate-200">{steps.map(([name, text], index) => <li key={name} className="grid gap-3 py-6 md:grid-cols-[15rem_1fr]"><h3 className="font-bold"><span className="mr-3 text-amber-800">0{index + 1}</span>{name}</h3><p className="leading-7 text-slate-700">{text}</p></li>)}</ol>
        <div className="mt-6 flex flex-wrap gap-3"><a href="https://ahmadrosid.github.io/nakama/" className={button + " bg-slate-950 text-white hover:bg-slate-800"}>Baca dokumentasi resmi ↗</a><a href="https://getnakama.cloud/" className={button + " border border-slate-400 hover:bg-stone-100"}>Lihat Nakama Cloud ↗</a></div>
      </section>
      <section aria-labelledby="latihan" className="rounded-2xl bg-stone-100 p-6 sm:p-9"><h2 id="latihan" className="text-2xl font-bold">Latihan: satu topik, tiga keluaran</h2><p className="mt-4 leading-8 text-slate-700">Pilih dua artikel terbuka dan satu topik perkuliahan. Agen Riset membuat matriks perbandingan; Agen Pendidikan menggunakan matriks yang sudah diperiksa untuk menyiapkan diskusi; Agen Kolaborasi menyusun daftar pekerjaan dari catatan evaluasi tim.</p><ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-slate-700"><li>Cocokkan setiap klaim utama dengan halaman atau bagian sumber.</li><li>Periksa apakah latihan sesuai tujuan pembelajaran dan memiliki pembahasan.</li><li>Tandai penanggung jawab atau tenggat yang masih perlu ditentukan.</li><li>Catat kesalahan, waktu pengerjaan, dan revisi instruksi untuk uji berikutnya.</li></ul></section>
      <section aria-labelledby="ekosistem" className="rounded-2xl bg-slate-950 p-6 text-white sm:p-9"><h2 id="ekosistem" className="text-3xl font-bold">Hubungkan dengan ekosistem pembelajaran</h2><div className="mt-7 grid gap-8 md:grid-cols-2"><div><h3 className="text-xl font-bold">LexNusa · Riset hukum</h3><p className="mt-3 leading-8 text-slate-300">Adaptasi agen untuk memetakan bahan hukum. Bedakan peraturan, putusan, dan doktrin; catat yurisdiksi, tanggal, serta rujukan sumber primer. Peneliti meninjau analisis sebelum digunakan.</p><Link href="/lexnusa" className={button + " mt-5 bg-amber-400 text-slate-950 hover:bg-amber-300"}>Jelajahi LexNusa →</Link></div><div><h3 className="text-xl font-bold">Journal / RAHRN · Pendampingan penulis</h3><p className="mt-3 leading-8 text-slate-300">Rancang asisten untuk pemeriksaan kelengkapan naskah, pemetaan literatur, dan pencatatan revisi. Keputusan editorial tetap mengikuti proses jurnal.</p><Link href="/journals" className={button + " mt-5 bg-amber-400 text-slate-950 hover:bg-amber-300"}>Jelajahi Journal / RAHRN →</Link></div></div><Link href="/ai-lab/academic-writing" className="mt-8 inline-flex min-h-11 items-center font-semibold text-amber-300 underline underline-offset-4">Lanjutkan ke Academic Writing AI →</Link></section>
      <section aria-labelledby="sumber"><h2 id="sumber" className="text-2xl font-bold">Sumber dan penggunaan</h2><p className="mt-4 leading-8 text-slate-700">Rujukan fitur dan penyiapan: README serta dokumentasi proyek ahmadrosid/nakama, berlisensi MIT. Periksa dokumentasi terkini saat memasang. Gunakan bahan sesuai hak akses, simpan API key pada konfigurasi yang aman, dan batasi akses agen sesuai tugas.</p><a href="https://github.com/ahmadrosid/nakama" className="mt-4 inline-flex min-h-11 items-center font-semibold text-amber-800 underline underline-offset-4">Buka sumber proyek Nakama ↗</a></section>
    </div>
  </main>;
}
