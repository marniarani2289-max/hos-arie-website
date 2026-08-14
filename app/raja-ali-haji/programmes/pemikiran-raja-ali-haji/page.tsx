import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock, Headphones, PenLine } from "lucide-react";

const modules = [
  { number: "01", title: "Mengenal Raja Ali Haji dan Dunia Melayu", duration: "90–120 menit", available: true, href: "/raja-ali-haji/programmes/pemikiran-raja-ali-haji/module-1" },
  { number: "02", title: "Gurindam Dua Belas: Etika dan Pembentukan Karakter", duration: "120–150 menit", available: true, href: "/raja-ali-haji/programmes/pemikiran-raja-ali-haji/module-2" },
  { number: "03", title: "Bahasa, Sastra, dan Peradaban Melayu", duration: "Segera", available: false },
  { number: "04", title: "Muqaddimah fi Intizam: Pemerintahan dan Tertib Kekuasaan", duration: "Segera", available: false },
  { number: "05", title: "Tsamarat al-Muhimmah: Tanggung Jawab Pejabat", duration: "Segera", available: false },
  { number: "06", title: "Musyawarah dan Tanggung Jawab Bersama", duration: "Segera", available: false },
  { number: "07", title: "Keadilan dan Batas Moral Kekuasaan", duration: "Segera", available: false },
  { number: "08", title: "Relevansi Pemikiran Raja Ali Haji bagi Dunia Kontemporer", duration: "Segera", available: false },
];

export default function ProgrammePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-slate-950">
      <section className="bg-[#070916] px-5 py-16 text-white sm:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Link href="/raja-ali-haji" className="text-sm font-semibold text-amber-400 hover:text-amber-300">
            ← Raja Ali Haji Institute
          </Link>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.28em] text-amber-400">Program Pembelajaran Dasar</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-7xl">
                Program Dasar Pemikiran Raja Ali Haji
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
                Perjalanan belajar mandiri untuk mengenal Raja Ali Haji sebagai ulama, pujangga, ahli bahasa,
                sejarawan, pendidik, dan pemikir pemerintahan dunia Melayu.
              </p>
              <Link href="/raja-ali-haji/programmes/pemikiran-raja-ali-haji/module-1" className="mt-9 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-4 font-bold text-slate-950 transition hover:bg-amber-400">
                Mulai Modul 1 <ArrowRight size={18} />
              </Link>
            </div>
            <aside className="border-l border-amber-500/60 pl-7">
              <p className="text-xs font-bold uppercase tracking-[.22em] text-amber-400">Hasil akhir program</p>
              <p className="mt-4 text-xl font-semibold leading-8">Certificate of Achievement</p>
              <p className="mt-3 leading-7 text-slate-400">Diberikan setelah peserta menyelesaikan delapan modul, kuis, esai, dan tes akhir sesuai standar kelulusan.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [BookOpen, "8 modul", "Pembelajaran terstruktur"],
              [Clock, "12–16 jam", "Estimasi keseluruhan"],
              [Headphones, "Audio learning", "Podcast setiap modul"],
              [PenLine, "Kuis & esai", "Penilaian pemahaman"],
            ].map(([Icon, title, text]) => {
              const CardIcon = Icon as typeof BookOpen;
              return <div key={String(title)} className="border border-stone-300 bg-white p-6"><CardIcon className="text-amber-700" size={24}/><p className="mt-5 text-lg font-bold">{String(title)}</p><p className="mt-1 text-sm text-slate-600">{String(text)}</p></div>;
            })}
          </div>

          <div className="mt-16 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[.24em] text-amber-700">Kurikulum</p><h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">Delapan tahap pembelajaran</h2></div>
            <p className="max-w-xl leading-7 text-slate-600">Modul dibuka bertahap. Saat ini Modul 1 sudah tersedia sebagai produk pembelajaran percontohan.</p>
          </div>

          <div className="mt-10 divide-y divide-stone-300 border-y border-stone-300">
            {modules.map((module) => (
              <div key={module.number} className="grid gap-4 py-7 md:grid-cols-[70px_1fr_160px] md:items-center">
                <p className="text-sm font-bold text-amber-700">{module.number}</p>
                <div><h3 className="text-xl font-bold">{module.title}</h3><p className="mt-2 text-sm text-slate-500">{module.duration}</p></div>
                {module.available ? (
                  <Link href={module.href ?? "#"} className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-amber-700">Mulai belajar <ArrowRight size={16}/></Link>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400"><CheckCircle2 size={16}/> Belum dibuka</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
