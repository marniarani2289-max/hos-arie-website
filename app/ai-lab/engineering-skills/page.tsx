import type { Metadata } from "next";
import Link from "next/link";

const title = "AI Engineering Skills: Merancang, Menguji, dan Memperbaiki Aplikasi";
export const metadata: Metadata = {
  title,
  description: "Panduan AI Engineering Skills di AI Lab: memperjelas kebutuhan, menyusun spesifikasi, menguji aplikasi, dan mendiagnosis masalah dengan rujukan Matt Pocock Skills.",
  alternates: { canonical: "/ai-lab/engineering-skills" },
};
const skills = [
  ["grill-with-docs", "Memperjelas kebutuhan dan mencatat keputusan serta istilah proyek."],
  ["to-spec", "Merangkum diskusi menjadi spesifikasi pekerjaan."],
  ["to-tickets", "Membagi rencana menjadi tugas dan ketergantungannya."],
  ["tdd", "Mengembangkan perubahan melalui siklus pengujian dan perbaikan."],
  ["diagnosing-bugs", "Menelusuri penyebab masalah dengan bukti dan pengujian regresi."],
  ["code-review", "Meninjau perubahan berdasarkan standar kode dan spesifikasi."],
  ["handoff", "Menyusun catatan agar agen berikutnya dapat melanjutkan pekerjaan."],
];
const stages = [
  ["Merancang", "Tuliskan siapa penggunanya, masalah yang dihadapi, dan hasil yang diharapkan. Tentukan contoh keberhasilan sebelum mengubah aplikasi.", "Keluaran: spesifikasi singkat, batas pekerjaan, dan daftar tugas."],
  ["Menguji", "Jalankan alur pengguna dari awal hingga hasilnya terlihat. Periksa keadaan berhasil, masukan keliru, dan kegagalan yang mungkin terjadi.", "Keluaran: bukti pengujian, hasil aktual, dan bagian yang belum diuji."],
  ["Memperbaiki", "Reproduksi masalah, telusuri penyebabnya, lalu ubah bagian yang relevan. Periksa kembali alur semula dan fungsi yang terkait.", "Keluaran: perbaikan terarah dan catatan hasil pemeriksaan."],
];
const button = "inline-flex min-h-11 items-center rounded-lg px-5 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700";

export default function EngineeringSkillsPage() {
  return <main lang="id" className="bg-white text-slate-900">
    <header className="bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <Link href="/ai-lab" className="inline-flex min-h-11 items-center text-sm font-semibold text-amber-300 underline underline-offset-4">Kembali ke AI &amp; Digital Systems Lab</Link>
        <p className="mt-7 text-xs font-bold uppercase tracking-widest text-amber-300">Referensi terbuka · Pengembangan aplikasi</p>
        <h1 className="mt-4 max-w-5xl text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Dari kebutuhan yang jelas hingga aplikasi yang dapat diperiksa. Pelajari cara bekerja bersama agen AI melalui perencanaan, pengujian, dan perbaikan bertahap.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#alur" className={`${button} bg-amber-400 text-slate-950 hover:bg-amber-300`}>Pelajari alur kerja</a>
          <a href="https://github.com/mattpocock/skills" className={`${button} border border-slate-500 hover:bg-slate-800`}>Buka Matt Pocock Skills</a>
        </div>
      </div>
    </header>
    <div className="mx-auto max-w-6xl space-y-14 px-5 py-12 sm:px-8 sm:py-16">
      <section aria-labelledby="tentang-skills">
        <h2 id="tentang-skills" className="text-2xl font-bold">Panduan untuk bekerja bersama agen AI</h2>
        <p className="mt-4 max-w-4xl leading-8 text-slate-700">Matt Pocock Skills merupakan kumpulan instruksi bagi agen AI untuk pekerjaan pengembangan perangkat lunak. Skill dapat dipilih dan disesuaikan dengan kebutuhan proyek.</p>
        <p className="mt-3 max-w-4xl leading-8 text-slate-700">Halaman ini adalah panduan belajar dan rujukan. Membukanya tidak memasang skill atau menjalankan agen pada perangkat Anda. Pemasangan dilakukan pada lingkungan agen yang mendukungnya, mengikuti dokumentasi resmi.</p>
      </section>
      <section id="alur" aria-labelledby="alur-title" className="scroll-mt-8">
        <h2 id="alur-title" className="text-2xl font-bold">Alur praktik yang disarankan AI Lab</h2>
        <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
          {stages.map(([name, description, outcome], index) => <article key={name} className="grid gap-4 py-6 md:grid-cols-[13rem_1fr]"><h3 className="text-xl font-bold"><span className="mr-3 text-amber-800">0{index + 1}</span>{name}</h3><div><p className="leading-8 text-slate-700">{description}</p><p className="mt-3 font-semibold leading-7 text-slate-900">{outcome}</p></div></article>)}
        </div>
      </section>
      <section aria-labelledby="pilihan-skills">
        <h2 id="pilihan-skills" className="text-2xl font-bold">Skill yang dapat dipelajari</h2>
        <dl className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
          {skills.map(([name, description]) => <div key={name} className="grid gap-2 py-5 md:grid-cols-[14rem_1fr]"><dt className="break-words font-mono font-bold text-amber-800">{name}</dt><dd className="leading-7 text-slate-700">{description}</dd></div>)}
        </dl>
        <a href="https://github.com/mattpocock/skills#reference" className="mt-4 inline-flex min-h-11 items-center font-semibold text-amber-800 underline underline-offset-4">Lihat katalog dan petunjuk resmi</a>
      </section>
      <section aria-labelledby="latihan" className="rounded-xl bg-stone-100 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-800">Skenario latihan · Usulan AI Lab</p>
        <h2 id="latihan" className="mt-3 text-2xl font-bold">Contoh: formulir permintaan layanan LexNusa</h2>
        <p className="mt-4 leading-8 text-slate-700">Gunakan lingkungan pengujian dengan data contoh. Tentukan apa yang harus terjadi setelah pengguna mengirim formulir: data tersimpan, pesan konfirmasi muncul, dan permintaan dapat dilihat petugas yang berwenang.</p>
        <ul className="mt-4 list-disc space-y-3 pl-6 leading-8 text-slate-700">
          <li><strong>Spesifikasi:</strong> tentukan kolom wajib, hasil pengiriman, dan pesan kesalahan.</li>
          <li><strong>Pengujian:</strong> periksa pengiriman valid, kolom kosong, pengiriman ganda, dan gangguan koneksi.</li>
          <li><strong>Diagnosis:</strong> bila permintaan tidak muncul, periksa alur formulir, respons server, penyimpanan, dan hak akses.</li>
          <li><strong>Serah terima:</strong> catat perubahan, hasil pengujian, dan pekerjaan yang masih tersisa.</li>
        </ul>
        <p className="mt-4 text-sm leading-7 text-slate-600">Ini contoh latihan yang diusulkan, bukan laporan pengujian fitur LexNusa.</p>
      </section>
      <section aria-labelledby="mulai">
        <h2 id="mulai" className="text-2xl font-bold">Mulai menggunakan skill</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 leading-8 text-slate-700">
          <li>Buka dokumentasi sumber dan pilih cara pemasangan untuk agen yang digunakan.</li>
          <li>Ikuti penyiapan proyek, termasuk tempat menyimpan dokumentasi dan daftar pekerjaan.</li>
          <li>Mulai dengan satu tugas kecil dan tentukan bukti keberhasilannya.</li>
          <li>Tinjau hasil sebelum menerapkan perubahan pada aplikasi yang digunakan publik.</li>
        </ol>
        <a href="https://github.com/mattpocock/skills#installation-30-second-setup" className="mt-4 inline-flex min-h-11 items-center font-semibold text-amber-800 underline underline-offset-4">Baca petunjuk pemasangan</a>
      </section>
      <section aria-labelledby="sumber">
        <h2 id="sumber" className="text-2xl font-bold">Sumber dan panduan terkait</h2>
        <p className="mt-4 leading-8 text-slate-700">Sumber: <a href="https://github.com/mattpocock/skills" className="font-semibold underline underline-offset-4">mattpocock/skills</a>, berlisensi <a href="https://github.com/mattpocock/skills/blob/main/LICENSE" className="underline underline-offset-4">MIT</a>. AI Lab menyajikan panduan penerapan independen. Alur latihan di halaman ini disusun untuk konteks pembelajaran AI Lab.</p>
        <Link href="/ai-lab/anti-slop" className="mt-4 inline-flex min-h-11 items-center font-semibold text-amber-800 underline underline-offset-4">Lanjutkan dengan Anti-Slop untuk evaluasi desain dan konten</Link>
      </section>
    </div>
  </main>;
}
