import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { labs } from "./labs";

export const metadata: Metadata = {
  title: "AI & Digital Systems Lab",
  description: "Temukan kelas, panduan praktik, dan sistem AI untuk riset, pendidikan, hukum, serta otomasi bersama Dr. Hos Arie Sibarani.",
  alternates: { canonical: "/ai-lab" },
};

const groups = [
  { id: "tata-kelola", title: "Tata kelola AI", description: "Nilai risiko, periksa bukti, dan tetapkan tanggung jawab.", items: [
    { id: "chathpt", title: "ChatHPT · Studi kasus RAG", description: "Periksa sumber, hierarki otoritas, dan batas kewenangan AI melalui praktikum 60 menit.", href: "/ai-lab/chathpt", status: "Studi dokumentasi · praktikum & rubrik mandiri" },
    { id: "ai-governance-title", title: "AI Governance", description: "Jalur 12 minggu dengan praktik layanan hukum LexNusa dan pendidikan.", href: "/ai-lab/ai-governance", status: "Program mandiri · panduan & template" },
  ]},
  { id: "belajar", title: "Belajar & membuat materi", description: "Mulai dari SOP AI hingga video pembelajaran.", items: [
    { id: "examgo", title: "ExamGO · Asesmen Digital", description: "Kenali platform CBT dan rencanakan asesmen untuk kelas hukum.", href: "/ai-lab/examgo", status: "Panduan & tautan resmi · server belum terhubung" },
    { id: "agent-skills-title", title: "Agent Skills", description: "Rancang SOP AI, tentukan standar hasil, dan gunakan lembar kerja.", href: "/ai-lab/agent-skills", status: "Panduan & lembar kerja" },
    { id: "video-studio", title: "AI Video Studio", description: "Siapkan brief, naskah, dan rencana produksi video dengan MoneyPrinterTurbo.", href: "/ai-lab/video-studio", status: "Ruang persiapan aktif · rendering belum terhubung" },
    { id: "concat", title: "Concat", description: "Susun slide, narasi, subtitle, dan alur ekspor video pembelajaran.", href: "/ai-lab/concat", status: "Panduan · aplikasi eksternal" },
  ]},
  { id: "riset", title: "Riset & publikasi", description: "Telusuri literatur, bangun argumen, dan perjelas tulisan.", items: [
    { id: "academic-writing", title: "Academic Writing AI", description: "Pelajari alur literatur, argumentasi, dan persiapan publikasi ilmiah.", href: "/ai-lab/academic-writing", status: "Panduan praktik" },
    { id: "paper-review", title: "Paper Review AI", description: "Bandingkan artikel dan susun matriks bukti sebelum menulis.", href: "/ai-lab/paper-review", status: "Panduan praktik" },
    { id: "humanize-writing", title: "Humanize Writing AI", description: "Sunting bahasa sambil menjaga makna, kutipan, dan kepastian klaim.", href: "/ai-lab/humanize-writing", status: "Panduan praktik" },
  ]},
  { id: "pengembangan", title: "Agen & pengembangan aplikasi", description: "Rancang cara kerja agen dan evaluasi hasil pengembangan.", items: [
    { id: "hermes-agent", title: "Hermes Agent", description: "Latih agen menyusun memo riset hukum dan periksa sumbernya.", href: "/ai-lab/hermes", status: "Praktikum riset hukum" },
    { id: "engineering-skills-title", title: "AI Engineering Skills", description: "Perjelas kebutuhan, susun spesifikasi, uji fitur, dan perbaiki aplikasi.", href: "/ai-lab/engineering-skills", status: "Panduan praktik" },
    { id: "agents-md", title: "AGENTS.md", description: "Tulis panduan proyek yang terukur untuk agen pemrograman AI.", href: "/ai-lab/referensi#agents-md", status: "Panduan & latihan" },
    { id: "agency-agents-title", title: "Agency Agents", description: "Pilih agen spesialis dan susun brief untuk riset serta pengembangan.", href: "/ai-lab/agency-agents", status: "Katalog · eksekusi otomatis belum aktif" },
    { id: "nakama-title", title: "Nakama", description: "Rancang peran agen untuk riset, pembelajaran, dan kolaborasi tim.", href: "/ai-lab/nakama", status: "Panduan eksplorasi" },
    { id: "hallmark", title: "Hallmark", description: "Audit dan perbaiki desain bersama agen, lalu nilai hasil dengan bukti.", href: "/ai-lab/hallmark", status: "Praktikum & rubrik mandiri" },
    { id: "antislop-title", title: "Anti-Slop", description: "Tinjau kejelasan desain, tulisan, dan kode hasil AI.", href: "/ai-lab/anti-slop", status: "Panduan evaluasi manual" },
  ]},
  { id: "keamanan", title: "Keamanan & analisis aplikasi", description: "Pelajari risiko dan periksa bukti teknis.", items: [
    { id: "cve-intelligence-title", title: "CVE Intelligence AI", description: "Pahami kerentanan, konteks aset, dan prioritas perbaikan.", href: "/ai-lab/cve-intelligence", status: "Panduan & latihan" },
    { id: "rea", title: "REA", description: "Telusuri perilaku aplikasi dan bedakan observasi dari dugaan.", href: "/ai-lab/rea", status: "Panduan analisis" },
  ]},
  { id: "model-data", title: "Model, data & referensi", description: "Kenali layanan eksternal sebelum menyiapkan eksperimen.", items: [
    { id: "api-workbench", title: "FreeLLMAPI & RuangAPI", description: "Hubungkan konsep akses model dan sumber data dalam satu praktikum.", href: "/ai-lab/referensi#api-workbench", status: "Panduan · API website belum aktif" },
    { id: "sekai-gateway", title: "SEKAI Gateway", description: "Pelajari akses model AI dan pembayaran rupiah pada penyedia eksternal.", href: "/ai-lab/referensi#sekai-gateway", status: "Referensi · belum diuji Lab" },
    { id: "bridgeplay", title: "Bridgeplay", description: "Eksplorasi kompatibilitas gim Windows pada Mac.", href: "/ai-lab/referensi#bridgeplay", status: "Referensi · belum diuji Lab" },
  ]},
];
const summaries: Record<string, string> = {
  "001": "Kerangka dan sampel evaluasi jawaban AI hukum; validasi empiris masih pada tahap pilot.",
  "002": "Layanan riset hukum dengan verifikasi sumber dan tinjauan manusia.",
  "003": "Ruang kerja bukti akreditasi sekolah dengan pembagian peran dan akses.",
  "004": "Delapan modul pemikiran Raja Ali Haji, dengan alur penilaian dan progres peserta.",
  "005": "Pusat kendali agen untuk pemeriksaan dan rekomendasi; tindakan produksi otomatis dinonaktifkan.",
  "006": "Alur pemantauan cohort empat minggu; menunggu validasi pada peserta langsung.",
  "007": "Editor video lokal di browser untuk klip dan subtitle; belum terhubung ke penyimpanan cloud.",
};
const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700";

export default function AiLabPage() {
  return (
    <div lang="id" className="bg-stone-50 text-slate-950">
      <header className="bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
          <Link href="/" className={`inline-flex min-h-11 items-center text-sm text-amber-300 ${focus}`}>← Dr. Hos Arie Sibarani</Link>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">AI &amp; Digital Systems Lab</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Temukan kelas, panduan praktik, dan sistem AI untuk riset, pendidikan, hukum, serta otomasi.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#katalog" className={`inline-flex min-h-12 items-center gap-2 rounded-lg bg-amber-400 px-5 py-3 font-semibold text-slate-950 hover:bg-amber-300 ${focus}`}>Jelajahi panduan <ArrowRight size={18} aria-hidden="true" /></a>
            <a href="#sistem" className={`inline-flex min-h-12 items-center rounded-lg border border-slate-500 px-5 py-3 font-semibold hover:bg-slate-800 ${focus}`}>Lihat sistem Lab</a>
          </div>
        </div>
      </header>

      <section aria-labelledby="governance-program-title" className="border-b border-teal-200 bg-teal-50"><div className="mx-auto max-w-6xl px-5 py-8 sm:px-8"><p className="text-sm font-semibold text-teal-800">Program praktik · 12 minggu · Hukum dan pendidikan</p><h2 id="governance-program-title" className="mt-2 text-3xl font-bold">AI Governance: dari risiko ke bukti praktik.</h2><p className="mt-3 max-w-3xl leading-7 text-slate-700">Pelajari tata kelola AI melalui jalur layanan hukum LexNusa dan praktik pendidikan. Mulai dengan verifikasi hasil AI, lalu susun daftar risiko dan SOP pengawasan manusia.</p><Link href="/ai-lab/ai-governance" className={`mt-5 inline-flex min-h-12 items-center rounded-lg bg-teal-900 px-5 py-3 font-semibold text-white hover:bg-teal-800 ${focus}`}>Buka program AI Governance →</Link></div></section>

      <section aria-labelledby="openmaic-title" className="border-b border-amber-200 bg-amber-50">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 py-8 sm:px-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-semibold text-amber-900">Mulai di sini · Kelas percontohan · 45 menit</p>
            <h2 id="openmaic-title" className="mt-2 text-2xl font-bold">Agent Skill: Merancang SOP AI</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-700">Buat satu SOP, uji tiga kondisi, lalu perbaiki dengan rubrik. Materi tersedia di Lab; sesi AI menggunakan layanan eksternal OpenMAIC.</p>
          </div>
          <Link href="/ai-lab/openmaic" className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800 ${focus}`}>Buka kelas <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>

      <section id="katalog" aria-labelledby="katalog-title" className="mx-auto max-w-6xl scroll-mt-6 px-5 py-10 sm:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="katalog-title" className="text-3xl font-bold">Pilih sesuai kebutuhan</h2>
          <p className="text-sm text-slate-600">{groups.reduce((n, group) => n + group.items.length, 0)} panduan &amp; referensi</p>
        </div>
        <nav aria-label="Kategori katalog" className="mt-5 flex flex-wrap gap-2">
          {groups.map(group => <a key={group.id} href={`#${group.id}`} className={`inline-flex min-h-11 items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold hover:border-amber-700 hover:bg-amber-50 ${focus}`}>{group.title}</a>)}
        </nav>
        <div className="mt-8 space-y-8">
          {groups.map(group => (
            <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`} className="scroll-mt-6">
              <div className="mb-4 border-t border-slate-300 pt-5">
                <h3 id={`${group.id}-heading`} className="text-xl font-bold">{group.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{group.description}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map(item => (
                  <article key={item.id} id={item.id} className="flex scroll-mt-6 flex-col rounded-xl border border-slate-200 bg-white p-5">
                    {item.id === "api-workbench" && <><span id="freellmapi" /><span id="ruangapi" /></>}
                    <h4 className="text-lg font-bold"><Link href={item.href} className={`inline-flex min-h-11 items-center gap-2 hover:text-amber-800 ${focus}`}>{item.title}<ArrowRight size={16} className="shrink-0" aria-hidden="true" /></Link></h4>
                    <p className="mt-1 flex-1 text-sm leading-6 text-slate-600">{item.description}</p>
                    <p className="mt-4 border-t border-slate-100 pt-3 text-xs font-medium leading-5 text-slate-600">{item.status}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-6 text-sm leading-6 text-slate-600">Panduan menjelaskan cara penggunaan. Pemasangan aplikasi, akun, dan koneksi layanan mengikuti keterangan pada masing-masing halaman.</p>
      </section>

      <section id="sistem" aria-labelledby="sistem-title" className="scroll-mt-6 border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
          <h2 id="sistem-title" className="text-3xl font-bold">{labs.length} sistem Lab</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">Jelajahi produk dan eksperimen beserta statusnya. Catatan lengkap memuat metode, batas kemampuan, serta tanggal pengujian.</p>
          <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
            {[...labs].sort((a, b) => a.number.localeCompare(b.number)).map(lab => (
              <article key={lab.number} className="grid gap-3 py-5 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3"><h3 className="text-lg font-bold">{lab.title}</h3><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{lab.status}</span></div>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{summaries[lab.number]}</p>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-1 md:justify-end">
                  <Link href={lab.href} className={`inline-flex min-h-11 items-center gap-1 text-sm font-bold text-amber-900 ${focus}`}>Buka sistem<span className="sr-only">: {lab.title}</span><ArrowRight size={15} aria-hidden="true" /></Link>
                  <Link href={`/ai-lab/sistem#lab-${lab.number}`} className={`inline-flex min-h-11 items-center text-sm text-slate-600 underline underline-offset-4 ${focus}`}>Catatan uji<span className="sr-only">: {lab.title}</span></Link>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-600">Prototype: rancangan awal · Pilot: uji terbatas · Production: digunakan dalam operasional. Label mengikuti dokumentasi sistem, bukan jaminan semua fitur telah tervalidasi.</p>
        </div>
      </section>
      <section className="bg-amber-100">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-8 sm:px-8">
          <div><h2 className="text-2xl font-bold">Punya masalah untuk diteliti bersama?</h2><p className="mt-2 text-slate-700">Diskusikan kebutuhan riset, pendidikan, atau otomasi institusi.</p></div>
          <Link href="/contact" className={`inline-flex min-h-12 items-center rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-slate-800 ${focus}`}>Diskusikan kolaborasi</Link>
        </div>
      </section>
    </div>
  );
}
