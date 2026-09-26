import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Program Kerja Bendahara PW Persis Kepulauan Riau",
  description: "Draf program kerja tahunan bidang kebendaharaan PW Persis Kepulauan Riau: 12 program, kalender pelaksanaan, strategi pendanaan, dan pelaporan.",
  alternates: { canonical: "/persis-kepri" },
  openGraph: { title: "Program Kerja Bendahara PW Persis Kepri", description: "Keuangan amanah, organisasi mandiri, dakwah berkelanjutan. Draf untuk pembahasan rapat kerja.", url: "https://www.hossibarani.com/persis-kepri", locale: "id_ID", type: "website" },
};

const programs = [
  { title: "Penertiban administrasi & saldo awal", time: "Januari", action: "Memeriksa saldo kas dan bank, dokumen serah terima, kewajiban yang belum dibayar, uang muka, serta dana yang penggunaannya telah ditentukan.", target: "Berita acara saldo awal serta daftar kewajiban dan dana terikat.", evidence: "Berita acara, rekening koran, daftar kas, dan register kewajiban." },
  { title: "Penyusunan RAPB tahunan", time: "Januari–Februari", action: "Menghimpun usulan setiap bidang, menghitung kemampuan pendanaan, dan menyusun Rencana Anggaran Pendapatan dan Belanja untuk disahkan sesuai mekanisme organisasi.", target: "Satu RAPB tahunan dan proyeksi arus kas bulanan.", evidence: "Dokumen RAPB dan hasil pembahasan pengurus." },
  { title: "Tata kelola keuangan", time: "Januari–Februari", action: "Menetapkan alur permohonan dana, persetujuan, pembayaran, uang muka, pertanggungjawaban, serta penyimpanan bukti.", target: "Satu pedoman ringkas dan formulir standar yang disetujui pimpinan.", evidence: "Pedoman, formulir pengajuan, dan format pertanggungjawaban." },
  { title: "Penataan iuran organisasi", time: "Setiap bulan", action: "Memetakan kewajiban iuran sesuai ketentuan organisasi; menyusun daftar pembayar, jadwal, kanal pembayaran, dan pengingat yang santun.", target: "Seluruh penerimaan iuran tercatat; tingkat pembayaran dievaluasi setiap triwulan.", evidence: "Register iuran dan rekap evaluasi triwulanan." },
  { title: "Pengembangan donatur rutin", time: "Februari–Desember", action: "Memetakan calon donatur, menyiapkan profil program, menawarkan dukungan sukarela, dan menyampaikan laporan penggunaan dana.", target: "Target awal 10 donatur rutin aktif, disesuaikan dengan hasil pemetaan.", evidence: "Rekap dukungan dan laporan penggunaan dana; identitas donatur dikelola secara terbatas." },
  { title: "Pendanaan program prioritas", time: "Sesuai kalender kegiatan", action: "Mendampingi bidang terkait menyusun kebutuhan biaya dan rencana penghimpunan dana untuk kegiatan yang telah disetujui.", target: "Setiap kegiatan prioritas memiliki anggaran dan sumber pendanaan yang jelas.", evidence: "Rencana biaya, rencana pendanaan, dan persetujuan kegiatan." },
  { title: "Pembukuan & arsip digital", time: "Sepanjang tahun", action: "Mencatat kas dan bank, mengelompokkan transaksi per program dan sumber dana, serta menyimpan bukti digital.", target: "Seluruh transaksi dicatat paling lambat tiga hari kerja setelah bukti diterima.", evidence: "Buku kas, buku bank, dan arsip bukti transaksi." },
  { title: "Pengendalian kas & pengeluaran", time: "Setiap bulan", action: "Mencocokkan catatan dengan rekening bank dan kas fisik; memantau uang muka, tagihan, serta selisih anggaran dan realisasi.", target: "Rekonsiliasi setiap bulan; selisih ditelusuri dan diselesaikan.", evidence: "Lembar rekonsiliasi dan daftar tindak lanjut." },
  { title: "Pelaporan & evaluasi keuangan", time: "Bulanan, triwulanan & tahunan", action: "Menyusun laporan kepada pimpinan dan forum yang berwenang untuk mendukung pengambilan keputusan.", target: "12 laporan bulanan, 4 evaluasi triwulanan, dan 1 laporan tahunan.", evidence: "Laporan keuangan dan catatan keputusan evaluasi." },
  { title: "Koordinasi wilayah–daerah", time: "Setiap semester", action: "Menyepakati format laporan dana bersama atau titipan, serta berbagi praktik pembukuan dengan bendahara PD sesuai kewenangan PW.", target: "Dua pertemuan koordinasi; dapat dilaksanakan secara daring.", evidence: "Notula pertemuan dan format pelaporan yang disepakati." },
  { title: "Pembentukan dana cadangan", time: "Mulai triwulan II", action: "Menghitung biaya operasional pokok dan menyisihkan penerimaan tidak terikat sesuai keputusan pengurus.", target: "Cadangan dibentuk bertahap hingga sebesar satu bulan biaya operasional pokok.", evidence: "Perhitungan kebutuhan operasional dan catatan dana cadangan." },
  { title: "Telaah internal & pertanggungjawaban", time: "Juni & Desember", action: "Memeriksa kelengkapan bukti, saldo, uang muka, kewajiban, dan kepatuhan penggunaan dana melalui pihak yang ditunjuk sesuai mekanisme organisasi.", target: "Dua telaah internal beserta tindak lanjut dan laporan akhir tahun.", evidence: "Hasil telaah, daftar perbaikan, dan pertanggungjawaban tahunan." },
];

const quarters = [
  { period: "Januari–Maret", title: "Menata fondasi", items: ["Verifikasi saldo awal dan kewajiban", "Penyusunan RAPB dan pedoman keuangan", "Pemetaan iuran serta donatur"], result: "Dasar pengelolaan tersedia dan disepakati." },
  { period: "April–Juni", title: "Menguatkan pendanaan", items: ["Penguatan penerimaan rutin", "Pembukuan konsisten dan telaah semester", "Awal pembentukan dana cadangan"], result: "Arus kas terencana dan administrasi tertib." },
  { period: "Juli–September", title: "Menjaga pelaksanaan", items: ["Evaluasi efektivitas pendanaan", "Penyesuaian anggaran berdasarkan realisasi", "Dukungan program paling prioritas"], result: "Pendanaan selaras dengan kemampuan kas." },
  { period: "Oktober–Desember", title: "Mempertanggungjawabkan", items: ["Penyelesaian pertanggungjawaban kegiatan", "Telaah dan laporan keuangan tahunan", "RAPB untuk tahun berikutnya"], result: "Penutupan tahun tertib; rencana berikutnya siap." },
];

const funding = [
  ["Iuran organisasi", "Penagihan terjadwal berdasarkan ketentuan yang berlaku. Besaran dan pembagian mengikuti keputusan organisasi."],
  ["Kontribusi sukarela pengurus", "Dukungan sesuai kemampuan; tidak menjadi kewajiban tanpa dasar keputusan."],
  ["Donatur rutin", "Dukungan bulanan untuk operasional dan dakwah, sesuai tujuan yang disepakati."],
  ["Donasi kegiatan", "Kebutuhan biaya jelas, dicatat terpisah per kegiatan, dan dilaporkan setelah selesai."],
  ["Kemitraan", "Dukungan yang sesuai nilai organisasi; persyaratannya didokumentasikan dan disetujui pimpinan."],
  ["Hasil kegiatan atau usaha", "Dikaji bersama bidang berwenang; penerimaan, biaya, dan hasil bersih dicatat terpisah."],
];

const principles = [
  "Dana dikelola melalui rekening resmi organisasi; akses dan kewenangan transaksi ditetapkan pimpinan.",
  "Peran pemohon, pemberi persetujuan, dan pelaksana pembayaran jelas. Bendahara memeriksa anggaran, dokumen, serta pencatatan.",
  "Setiap penerimaan dan pengeluaran memiliki bukti yang dapat ditelusuri.",
  "Dana bertujuan khusus dipisahkan pencatatannya dan digunakan sesuai amanah pemberi dana.",
  "Usulan batas pertanggungjawaban uang muka adalah 14 hari setelah kegiatan selesai.",
  "Laporan disampaikan kepada pihak yang berwenang; informasi pribadi donatur tetap dijaga.",
  "Kegiatan mengikuti kemampuan kas. Perubahan besar anggaran dibahas sesuai mekanisme organisasi.",
];

const report = ["Saldo awal kas dan bank", "Penerimaan menurut sumber dana", "Pengeluaran menurut bidang atau program", "Saldo akhir kas dan bank", "Dana terikat dan dana tersedia untuk operasional", "Uang muka serta kewajiban yang belum diselesaikan", "Perbandingan anggaran dengan realisasi", "Kebutuhan dana dan keputusan bulan berikutnya"];
const weeks = ["Verifikasi saldo, rekening, dokumen keuangan, dan kewajiban organisasi.", "Kumpulkan rencana kegiatan dan kebutuhan biaya setiap bidang.", "Susun rancangan RAPB, format pembukuan, dan alur pertanggungjawaban.", "Bahas bersama pimpinan; mulai pelaksanaan setelah ditetapkan."];
const sectionClass = "scroll-mt-24 border-t border-slate-200 py-12 sm:py-16";

export default function PersisKepriPage() {
  return <div lang="id" className="bg-slate-50 text-slate-900">
    <header className="border-b-4 border-amber-400 bg-emerald-950 px-5 py-10 text-white sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <Link href="/id" className="text-sm text-emerald-100 underline underline-offset-4 hover:text-white">Beranda Hos Arie Sibarani</Link>
        <div className="mt-7 flex flex-wrap items-center gap-3 text-sm"><span className="font-semibold tracking-wide text-emerald-100">PW PERSATUAN ISLAM · KEPULAUAN RIAU</span><span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-950">Draf rapat kerja</span></div>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">Program kerja tahunan<br className="hidden sm:block" /> bidang kebendaharaan</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-100">Keuangan amanah, organisasi mandiri, dakwah berkelanjutan.</p>
        <p className="mt-5 text-sm leading-6 text-emerald-100">Bendahara: Dr. Hos Arie Sibarani · Tahun pelaksanaan: menunggu penetapan pengurus</p>
      </div>
    </header>

    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <nav aria-label="Bagian program kerja" className="flex flex-wrap gap-2 border-b border-slate-200 py-5">
        {[["Program", "program"], ["Kalender", "kalender"], ["Pendanaan", "pendanaan"], ["Tata kelola", "tata-kelola"], ["Pelaporan", "pelaporan"], ["30 hari pertama", "langkah-awal"]].map(([label, id]) => <a key={id} href={`#${id}`} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-emerald-900 hover:border-emerald-700 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">{label}</a>)}
      </nav>
      <div className="py-8">
        <p className="max-w-4xl text-base leading-8 text-slate-700">Mewujudkan pengelolaan keuangan yang tertib, transparan, dan mendukung dakwah, pendidikan, kaderisasi, serta pelayanan umat. Seluruh jadwal dan target berikut merupakan <strong>usulan untuk satu tahun penuh</strong>; penetapannya mengikuti kondisi kas dan musyawarah pengurus.</p>
        <dl className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">{[["12", "Program kerja"], ["4", "Tahap triwulanan"], ["12", "Target laporan bulanan"], ["2", "Target telaah internal"]].map(([value, label]) => <div key={label} className="rounded-xl border border-slate-200 bg-white p-5"><dt className="text-sm text-slate-600">{label}</dt><dd className="mt-2 text-3xl font-bold text-emerald-900">{value}</dd></div>)}</dl>
        <p className="mt-3 text-sm text-slate-600">Angka di atas adalah rencana kerja, bukan capaian pelaksanaan.</p>
      </div>

      <section id="program" className={sectionClass} aria-labelledby="program-title">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-800">01 · Agenda kerja</p>
        <h2 id="program-title" className="mt-2 text-3xl font-bold">Dua belas program, satu amanah</h2>
        <p className="mt-3 leading-7 text-slate-600">Buka masing-masing program untuk melihat kegiatan, target, dan bukti pelaksanaannya.</p>
        <div className="mt-7 space-y-3">{programs.map((p, i) => <details key={p.title} className="group rounded-xl border border-slate-200 bg-white open:border-emerald-600">
          <summary className="cursor-pointer rounded-xl p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:p-6"><span className="ml-2 font-semibold text-emerald-900">{String(i + 1).padStart(2, "0")}.</span> <span className="text-base font-bold sm:text-lg">{p.title}</span><span className="mt-2 block pl-6 text-sm font-medium text-slate-600">{p.time}</span></summary>
          <div className="grid gap-5 border-t border-slate-100 p-5 leading-7 sm:p-6 lg:grid-cols-2"><div><h3 className="font-bold text-emerald-900">Kegiatan utama</h3><p className="mt-2 text-slate-700">{p.action}</p></div><div><h3 className="font-bold text-emerald-900">Target yang diusulkan</h3><p className="mt-2 text-slate-700">{p.target}</p><p className="mt-3 text-sm leading-6 text-slate-600"><strong>Bukti pelaksanaan:</strong> {p.evidence}</p></div></div>
        </details>)}</div>
      </section>

      <section id="kalender" className={sectionClass} aria-labelledby="calendar-title">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-800">02 · Kalender pelaksanaan</p><h2 id="calendar-title" className="mt-2 text-3xl font-bold">Dari penataan hingga pertanggungjawaban</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">{quarters.map((q, i) => <article key={q.title} className="rounded-xl border border-slate-200 border-t-4 border-t-emerald-700 bg-white p-6"><p className="text-sm font-semibold text-emerald-800">Triwulan {i + 1} · {q.period}</p><h3 className="mt-3 text-xl font-bold">{q.title}</h3><ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-700">{q.items.map(item => <li key={item}>{item}</li>)}</ul><p className="mt-5 border-t border-slate-100 pt-4 text-sm leading-6 text-emerald-900"><strong>Hasil yang diharapkan:</strong> {q.result}</p></article>)}</div>
      </section>

      <section id="pendanaan" className={sectionClass} aria-labelledby="funding-title">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-800">03 · Strategi pendanaan</p><h2 id="funding-title" className="mt-2 text-3xl font-bold">Membangun penerimaan berkelanjutan</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">Bendahara mengoordinasikan administrasi dan pengendalian keuangan. Kemitraan, kegiatan, dan usaha produktif dijalankan bersama ketua serta bidang terkait.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{funding.map(([title, text]) => <article key={title} className="rounded-xl border border-slate-200 bg-white p-6"><h3 className="text-lg font-bold text-emerald-900">{title}</h3><p className="mt-3 leading-7 text-slate-700">{text}</p></article>)}</div>
        <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5 leading-7 text-amber-950">Besaran iuran, nominal anggaran, dan target penerimaan ditetapkan setelah pemetaan kemampuan pendanaan serta pembahasan pengurus.</p>
      </section>

      <section id="tata-kelola" className={sectionClass} aria-labelledby="governance-title">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-800">04 · Tata kelola</p><h2 id="governance-title" className="mt-2 text-3xl font-bold">Tertib sejak penerimaan hingga pelaporan</h2>
        <ol className="mt-7 space-y-3">{principles.map((item, i) => <li key={item} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-900">{i + 1}</span><p className="leading-7 text-slate-700">{item}</p></li>)}</ol>
      </section>

      <section id="pelaporan" className={sectionClass} aria-labelledby="report-title">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-sm font-bold uppercase tracking-widest text-emerald-800">05 · Pelaporan</p><h2 id="report-title" className="mt-2 text-3xl font-bold">Laporan yang membantu keputusan</h2><p className="mt-4 leading-7 text-slate-600">Usulan jadwal penyampaian laporan bulanan: paling lambat <strong>tanggal 10 bulan berikutnya</strong>, kepada pimpinan dan pihak yang berwenang.</p><p className="mt-4 text-sm leading-6 text-slate-600">Halaman ini memuat rencana dan format pelaporan. Data kas, transaksi, serta identitas donatur tidak ditampilkan di sini.</p></div><ol className="list-decimal space-y-3 rounded-xl border border-slate-200 bg-white py-6 pl-12 pr-6 leading-7">{report.map(item => <li key={item} className="pl-1">{item}</li>)}</ol></div>
      </section>

      <section id="langkah-awal" className={sectionClass} aria-labelledby="first-title">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-800">06 · Langkah awal</p><h2 id="first-title" className="mt-2 text-3xl font-bold">Prioritas 30 hari pertama</h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{weeks.map((item, i) => <article key={item} className="rounded-xl border border-slate-200 bg-white p-5"><p className="text-sm font-bold text-emerald-800">Minggu {i + 1}</p><p className="mt-3 leading-7 text-slate-700">{item}</p></article>)}</div>
        <aside className="mt-8 rounded-2xl bg-emerald-950 p-6 text-white sm:p-8"><h3 className="text-xl font-bold">Agenda keputusan rapat kerja</h3><p className="mt-3 leading-8 text-emerald-100">Tetapkan tahun pelaksanaan, RAPB, ketentuan iuran sesuai kewenangan, target penghimpunan dana, pejabat pemberi persetujuan, batas kewenangan transaksi, dan mekanisme evaluasi. Seluruh target disesuaikan dengan kondisi keuangan serta ketentuan organisasi.</p></aside>
      </section>
    </div>
  </div>;
}
