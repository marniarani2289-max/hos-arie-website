import Link from "next/link";
import { stages } from "@/lib/lexnusa/cohort";
import { lexnusaCohort } from "@/lib/programmes/catalogue";

export const metadata = {
  title: "LexNusa Legal AI Practice | Pelatihan Hukum",
  description: "Program empat minggu untuk menyusun, memeriksa, dan merevisi kontrak dengan AI, disertai evaluasi dan umpan balik manusia. Lihat hasil belajar dan status pendaftaran.",
  alternates: { canonical: lexnusaCohort.href },
};

const faqs = [
  ["Apakah pendaftaran kelas sudah dibuka?", "Jadwal dan pembukaan pendaftaran belum diumumkan. Indikasi biaya Rp1.250.000/orang untuk maksimal 15 peserta. Biaya final dan kesiapan layanan dikonfirmasi tertulis sebelum pembayaran."],
  ["Apakah membuat akun berarti saya sudah mendapat tempat?", "Akun memberi akses ke ruang belajar. Kepastian keikutsertaan dan jadwal pendampingan mengikuti pengumuman pengelola kelas."],
  ["Apakah perlu bisa pemrograman?", "Praktik berfokus pada analisis kebutuhan, penyusunan instruksi, dan pemeriksaan dokumen. Anda perlu memahami dasar kontrak dan bersedia memeriksa sumber yang digunakan."],
  ["Apa hasil kerja yang saya simpan?", "Ringkasan kebutuhan, instruksi untuk AI, draf kontrak, catatan evaluasi, dan revisi beserta riwayat versinya."],
  ["Bagaimana penilaian dan sertifikat ditentukan?", "Lengkapi lima hasil kerja, kehadiran minimal 75%, dan nilai peserta minimal 70/100, serta perbaiki kesalahan kritis. Ajukan portofolio kepada fasilitator. Fasilitator memeriksa pekerjaan dan menentukan kelulusan; skor keluaran AI tidak otomatis menjadi nilai peserta atau menerbitkan sertifikat."],
  ["Bisakah memakai akun Institute?", "Ya. Akun Raja Ali Haji Institute dapat digunakan untuk masuk ke ruang kelas LexNusa."],
];

export default function Page() {
  return <div lang="id" className="bg-[#f7f5ef] text-slate-900">
    <section className="bg-[#101d2a] px-6 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-widest text-amber-300">LexNusa · Kelas Praktik Legal AI</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">Belajar hukum. Praktik dengan AI. Pertanggungjawabkan hasilnya.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Kelas empat minggu untuk menyusun dan meninjau kontrak kerja. Kerjakan satu kasus dari ringkasan kebutuhan sampai revisi, simpan setiap versi, dan terima umpan balik fasilitator.</p>
        <p className="mt-6 inline-block rounded-lg border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm font-semibold text-amber-200">{lexnusaCohort.status.id}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link className="rounded-xl bg-amber-400 px-6 py-4 font-bold text-slate-950 hover:bg-amber-300" href="#informasi-program">Lihat rincian program</Link>
          <Link className="rounded-xl border border-white/30 px-6 py-4 font-semibold hover:bg-white/10" href="/lexnusa/cohort/workspace">Masuk ruang kelas</Link>
        </div>
        <p className="mt-5 text-sm leading-6 text-slate-300">Sudah punya akun Institute? Gunakan akun yang sama untuk masuk. <Link className="underline underline-offset-4" href="/lexnusa/cohort/register">Buat akun belajar</Link> bila belum memiliki akun.</p>
      </div>
    </section>
    <section id="informasi-program" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-14">
      <h2 className="text-3xl font-bold">Sebelum mengikuti kelas</h2><Link href="/pelatihan-ai#lexnusa" className="mt-4 inline-block font-semibold text-teal-800 underline underline-offset-4">Rincian paket, cakupan pendampingan, dan konsultasi LexNusa →</Link>
      <dl className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Untuk siapa", "Mahasiswa hukum, pengajar, dan praktisi yang ingin berlatih menggunakan serta mengevaluasi AI dalam pekerjaan kontrak."],
          ["Bekal peserta", "Pemahaman dasar kontrak, perangkat dengan internet, dan kesediaan memeriksa fakta serta sumber hukum."],
          ["Metode", "Empat sesi daring masing-masing 2 jam, sekitar 2 jam praktik mandiri per minggu, dan dua putaran umpan balik."],
          ["Durasi dan jadwal", `Empat minggu. ${lexnusaCohort.dates.id}.`],
          ["Biaya", lexnusaCohort.fee.id],
          ["Hasil akhir", "Portofolio pribadi berisi ringkasan kebutuhan, instruksi, draf, evaluasi, dan revisi kontrak."],
        ].map(([title, text]) => <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6"><dt className="font-bold text-teal-800">{title}</dt><dd className="mt-3 leading-7 text-slate-600">{text}</dd></div>)}
      </dl>
    </section>
    <section className="mx-auto max-w-6xl px-6 pb-16">
      <h2 className="text-3xl font-bold">Satu kasus, lima hasil kerja</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2">{stages.map((s,i)=><article key={s.key} className="rounded-2xl border border-slate-200 bg-white p-6"><p className="font-bold text-teal-700">Minggu {s.week} · Tahap {i+1}</p><h3 className="mt-3 text-xl font-bold">{s.title}</h3><p className="mt-3 leading-7 text-slate-600">{s.help}</p></article>)}</div>
      <div className="mt-10 rounded-2xl bg-teal-800 p-8 text-white"><h2 className="text-2xl font-bold">Portofolio pribadi dan penilaian manusia</h2><p className="mt-4 leading-7">Ringkasan kebutuhan, instruksi, draf, catatan evaluasi, dan revisi menjadi bukti belajar. Nilai kemampuan peserta terpisah dari skor mutu keluaran LEX-EVAL. Pekerjaan bersifat privat; fasilitator kelas memberikan keputusan akhir.</p><Link className="mt-5 inline-block underline" href="/lexnusa/lex-eval">Pelajari metodologi LEX-EVAL</Link></div>
    </section>
    <section className="border-t border-slate-200 bg-white px-6 py-16"><div className="mx-auto max-w-4xl">
      <h2 className="text-3xl font-bold">Pertanyaan sebelum bergabung</h2>
      <div className="mt-8 divide-y divide-slate-200">{faqs.map(([question, answer]) => <details key={question} className="py-5"><summary className="cursor-pointer text-lg font-semibold">{question}</summary><p className="mt-3 leading-7 text-slate-600">{answer}</p></details>)}</div>
      <div className="mt-8 rounded-2xl bg-stone-50 p-6"><h3 className="text-xl font-bold">Ingin menanyakan pembukaan kelas?</h3><p className="mt-3 leading-7 text-slate-600">Kirim pertanyaan kepada pengelola dengan menyebut program LexNusa dan kebutuhan belajar Anda.</p><a className="mt-5 inline-flex rounded-xl bg-slate-950 px-5 py-3 font-bold text-white hover:bg-teal-800" href={`mailto:riesib8@gmail.com?subject=${encodeURIComponent("Informasi pembukaan Kelas Praktik Legal AI LexNusa")}`}>Tanyakan jadwal melalui email</a><p className="mt-3 text-sm text-slate-500">Tombol membuka aplikasi email; pesan dikirim setelah Anda menekan kirim.</p></div>
    </div></section>
  </div>;
}
