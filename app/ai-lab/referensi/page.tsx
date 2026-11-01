import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
export const metadata: Metadata = {title: "Referensi dan Praktikum AI Lab", alternates: {canonical: "/ai-lab/referensi"}};
export default function ReferencesPage() { return <div lang="id" className="bg-white"><header className="mx-auto max-w-7xl px-5 py-10"><Link href="/ai-lab#katalog" className="inline-flex min-h-11 items-center font-semibold text-amber-800">← Kembali ke katalog AI Lab</Link><h1 className="mt-4 text-4xl font-bold text-slate-950">Referensi dan praktikum</h1><p className="mt-4 text-slate-600">Panduan lengkap model AI, sumber data, instruksi proyek, dan kompatibilitas aplikasi.</p><nav aria-label="Daftar referensi" className="mt-6 flex flex-wrap gap-4">{[["api-workbench","Model & data"],["agents-md","AGENTS.md"],["bridgeplay","Bridgeplay"],["sekai-gateway","SEKAI Gateway"]].map(([id,title])=><a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center underline underline-offset-4">{title}</a>)}</nav></header>      <section id="api-workbench" aria-labelledby="api-workbench-title" lang="id" className="scroll-mt-24 border-b border-slate-200 bg-stone-50 px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-800">Panduan praktik · Model AI &amp; sumber data</p>
          <h2 id="api-workbench-title" className="mt-3 text-3xl font-bold leading-tight text-slate-950">FreeLLMAPI &amp; RuangAPI: Menghubungkan Model AI dan Data</h2>
          <p className="mt-4 max-w-3xl leading-8 text-slate-700">Pelajari dua lapisan aplikasi AI: mengambil data yang relevan, lalu mengolahnya menjadi keluaran yang dapat diperiksa. Gunakan panduan ini untuk merancang eksperimen riset dan pendidikan.</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">Status: panduan dan tautan tersedia. Panggilan API langsung belum diaktifkan di website ini; koneksi dan kualitas hasil belum diuji oleh Lab.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <article id="freellmapi" aria-labelledby="freellmapi-title" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-800">01 · Akses model</p>
              <h3 id="freellmapi-title" className="mt-3 text-2xl font-bold text-slate-950">FreeLLMAPI</h3>
              <p className="mt-4 leading-7 text-slate-700">Router yang dipasang sendiri untuk mengakses beberapa penyedia model melalui satu API kompatibel OpenAI. Menurut dokumentasi, router dapat berpindah penyedia saat terjadi pembatasan atau gangguan dan menyimpan API key terenkripsi.</p>
              <p className="mt-4 leading-7 text-slate-700">Latihan: bandingkan ringkasan dua model terhadap bahan publik yang sama. Catat model yang benar-benar melayani, ketepatan isi, waktu respons, dan pemakaian token.</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">Memerlukan pemasangan serta API key penyedia. Kuota gabungan dalam katalog bukan jatah otomatis pengguna. Pengembang membatasi tujuan proyek pada eksperimen pribadi; permintaan tetap dikirim ke penyedia yang dipilih.</p>
              <a href="https://github.com/tashfeenahmed/freellmapi" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">Dokumentasi FreeLLMAPI <ExternalLink size={16} aria-hidden="true" /><span className="sr-only"> (tab baru)</span></a>
            </article>
            <article id="ruangapi" aria-labelledby="ruangapi-title" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-teal-800">02 · Akses data</p>
              <h3 id="ruangapi-title" className="mt-3 text-2xl font-bold text-slate-950">RuangAPI</h3>
              <p className="mt-4 leading-7 text-slate-700">Layanan API untuk mengakses katalog sumber data, termasuk sekolah, kampus, cuaca, berita, dan marketplace. MCP server memungkinkan agen yang kompatibel menemukan serta menjalankan API dengan key aktif.</p>
              <p className="mt-4 leading-7 text-slate-700">Latihan: pilih API kampus, periksa parameter dan responsnya, lalu cocokkan beberapa hasil dengan sumber asli. Catat tanggal pengambilan, kelengkapan kolom, dan kuota yang terpakai.</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">Paket gratis mencantumkan 150 permintaan per bulan untuk API tingkat Free saat ditinjau. Akses endpoint dan biaya bergantung pada paket; periksa ketentuan terbaru sebelum memakai layanan.</p>
              <div className="mt-5 flex flex-wrap gap-3">{[["https://ruangapi.id/", "Jelajahi RuangAPI"], ["https://ruangapi.id/mcp", "Panduan MCP"], ["https://ruangapi.id/pricing", "Paket & kuota"]].map(([href, label]) => <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 font-semibold text-slate-950 hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700">{label}<ExternalLink size={16} aria-hidden="true" /><span className="sr-only"> (tab baru)</span></a>)}</div>
            </article>
          </div>
          <div className="mt-6 rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
            <h3 className="text-2xl font-bold">Praktikum bersama: ringkasan informasi kampus</h3>
            <ol className="mt-5 list-decimal space-y-3 pl-6 leading-8 text-slate-300">
              <li>Tentukan wilayah dan kolom informasi yang dibutuhkan; periksa skema API kampus di RuangAPI.</li>
              <li>Ambil sampel data melalui akun uji. Simpan sumber, waktu pengambilan, dan respons asli.</li>
              <li>Kirim kolom publik yang diperlukan ke model melalui FreeLLMAPI. Minta ringkasan berdasarkan data tersebut saja.</li>
              <li>Cocokkan setiap klaim dengan respons asli dan sumber kampus. Tandai data kosong atau informasi yang belum terverifikasi.</li>
            </ol>
            <details className="mt-6 rounded-xl border border-slate-700 p-5"><summary className="cursor-pointer font-semibold text-amber-300">Contoh instruksi untuk model</summary><p className="mt-4 leading-8 text-slate-300">Ringkas data kampus berikut dalam tabel nama, lokasi, dan informasi program studi yang tersedia. Gunakan hanya data yang diberikan. Jangan menambahkan akreditasi, peringkat, atau klaim lain yang tidak ada dalam sumber. Pertahankan URL sumber dan tanggal pengambilan. Tuliskan “belum tersedia” untuk data kosong, lalu sebutkan hal yang perlu diperiksa manusia.</p></details>
            <p className="mt-5 text-sm leading-7 text-slate-300">Penyiapan koneksi memerlukan akun RuangAPI, router FreeLLMAPI, dan key penyedia model. Simpan key pada konfigurasi server, gunakan data publik atau sintetis, dan tetapkan batas pemakaian sebelum menjalankan eksperimen.</p>
            <div className="mt-6 flex flex-wrap gap-5">{[["/ai-lab/nakama", "Agen Nakama"], ["/blue-education", "Blue Education"], ["/lexnusa", "LexNusa"], ["/ai-lab#sekai-gateway", "SEKAI Gateway"]].map(([href, label]) => <Link key={href} href={href} className="inline-flex min-h-11 items-center font-semibold text-amber-300 underline underline-offset-4">{label} →</Link>)}</div>
          </div>
          <p className="mt-5 text-xs leading-6 text-slate-500">Rujukan: repositori resmi FreeLLMAPI serta situs, halaman harga, dan dokumentasi MCP RuangAPI. Ditinjau 31 Oktober 2026. Informasi layanan berasal dari pengembang dan dapat berubah.</p>
        </div>
      </section>
      <section id="agents-md" aria-labelledby="agents-md-title" className="scroll-mt-24 border-b border-slate-200 bg-slate-50" lang="id">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-amber-800">Materi belajar · Panduan kerja agen AI</p>
            <h2 id="agents-md-title" className="mt-3 text-3xl font-bold leading-tight text-slate-950">AGENTS.md: Menulis Panduan Proyek untuk Agen AI</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">AGENTS.md adalah berkas Markdown yang memberi agen pemrograman AI konteks dan petunjuk kerja sebuah proyek. Isinya dapat mencakup struktur folder, perintah build dan pengujian, gaya kode, serta perhatian keamanan.</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">Tujuan belajar: menyusun instruksi yang jelas, dapat diperiksa, dan sesuai dengan proyek. Materi ini melengkapi AI Engineering Skills yang membahas cara mengerjakan tugas.</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-950">Kenali fungsinya</h3>
              <p className="mt-3 leading-7 text-slate-600">README memperkenalkan proyek kepada pembaca manusia. AGENTS.md melengkapinya dengan petunjuk khusus untuk agen AI. Tidak ada susunan bagian yang wajib; tuliskan informasi yang benar-benar diperlukan.</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">Berkas biasanya ditempatkan di folder utama repositori. Subfolder dapat memiliki petunjuk yang lebih khusus. Periksa dukungan dan cara membaca instruksi pada agen yang digunakan.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-950">Tulis instruksi yang terukur</h3>
              <p className="mt-3 leading-7 text-slate-600">Contoh latihan: ubah instruksi “buat halaman yang bagus” menjadi “gunakan satu judul utama, tautkan sumber materi, dan periksa agar teks tidak terpotong pada layar ponsel”.</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">Jelaskan hasil yang diharapkan dan cara memeriksanya. Cantumkan perintah hanya setelah memastikan perintah tersebut tersedia pada proyek.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-950">Latihan 15 menit</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7 text-slate-600">
                <li>Pilih proyek latihan dan tulis tujuannya dalam dua kalimat.</li>
                <li>Catat folder penting, tiga aturan kerja, dan cara memeriksa hasil.</li>
                <li>Minta agen mengubah satu teks pada salinan proyek menggunakan panduan itu.</li>
                <li>Bandingkan hasil dengan aturan; revisi instruksi yang masih ambigu.</li>
              </ol>
            </article>
          </div>
          <details className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <summary className="cursor-pointer text-lg font-bold text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">Lihat contoh AGENTS.md untuk proyek latihan</summary>
            <p className="mt-4 text-sm leading-7 text-slate-600">Contoh buatan Hossibarani Lab. Sesuaikan nama proyek, folder, dan pemeriksaannya sebelum digunakan.</p>
            <pre className="mt-4 overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-slate-950 p-5 text-sm leading-7 text-slate-100"><code>{`# Panduan agen untuk Portal Belajar

## Tujuan
Portal ini membantu pengunjung menemukan materi dan sumber belajar.

## Sebelum mengubah
- Baca README dan konfigurasi proyek.
- Kenali lokasi halaman, komponen, dan aset.
- Batasi perubahan pada tugas yang diminta.

## Konten dan tampilan
- Gunakan bahasa Indonesia yang jelas.
- Cantumkan tautan sumber untuk materi rujukan.
- Pertahankan navigasi dan identitas visual yang sudah ada.

## Pemeriksaan hasil
- Periksa tautan dan keterbacaan pada layar ponsel.
- Jalankan perintah build atau tes yang tersedia dan relevan.
- Laporkan pemeriksaan yang gagal atau belum dapat dijalankan.

## Data dan penerbitan
- Jangan menulis kata sandi atau API key dalam kode publik.
- Gunakan data contoh untuk latihan.
- Terbitkan hanya dalam lingkup permintaan pengguna.
- Laporkan perubahan dan hasil verifikasinya.
`}</code></pre>
          </details>
          <p className="mt-6 text-sm leading-7 text-slate-600"><strong className="text-slate-950">Refleksi:</strong> Apakah setiap aturan dapat diperiksa? Apakah ada instruksi yang bertentangan? Petunjuk tertulis membantu koordinasi, tetapi pengaturan izin akses dan pemeriksaan manusia tetap diperlukan.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="https://agents.md/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">
              Buka sumber AGENTS.md<ExternalLink size={16} aria-hidden="true" /><span className="sr-only"> (tab baru)</span>
            </a>
            <Link href="/ai-lab/engineering-skills" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 px-5 py-3 font-bold text-slate-950 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">Pelajari AI Engineering Skills</Link>
          </div>
          <p className="mt-4 text-xs leading-6 text-slate-500">Sumber konsep: agents.md, ditinjau 25 Oktober 2026. Contoh dan latihan disusun untuk pembelajaran; berkas panduan proyek tidak dibuat atau diaktifkan melalui halaman ini.</p>
        </div>
      </section>
      <section id="bridgeplay" aria-labelledby="bridgeplay-title" className="scroll-mt-24 border-b border-slate-200 bg-white" lang="id">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-amber-800">Referensi terbuka · Kompatibilitas lintas sistem</p>
            <h2 id="bridgeplay-title" className="mt-3 text-3xl font-bold leading-tight text-slate-950">Bridgeplay: Menjalankan Gim Windows di Steam Mac</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Bahan studi tentang cara perangkat lunak dari sistem operasi berbeda dapat bekerja bersama. Bridgeplay menghubungkan Steam Mac dengan Wine, Rosetta 2, dan teknologi grafis Apple untuk menjalankan gim Windows yang kompatibel.</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">Proyek eksternal Raymond Chin, berbasis NotProton. Halaman ini menyediakan referensi dan panduan eksplorasi; aplikasi dipasang dan dijalankan pada Mac pengguna, bukan melalui situs ini. Belum diuji langsung oleh Hossibarani Lab.</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-stone-50 p-6">
              <h3 className="text-lg font-bold text-slate-950">Persyaratan perangkat</h3>
              <p className="mt-3 leading-7 text-slate-600">Dokumentasi saat ditinjau mencantumkan Mac Apple Silicon M1 atau lebih baru, macOS 26 atau lebih baru, dan akun Steam. Mac Intel tidak didukung.</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">Bridgeplay gratis; lisensi gim berbayar tetap harus dimiliki. Periksa persyaratan terbaru sebelum memasang.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-stone-50 p-6">
              <h3 className="text-lg font-bold text-slate-950">Cara kerja dan batasan</h3>
              <p className="mt-3 leading-7 text-slate-600">Gim tetap berupa versi Windows yang berjalan melalui lapisan kompatibilitas. D3DMetal menerjemahkan grafis DirectX 11/12 ke Metal.</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">Tidak semua gim berjalan. Kebanyakan gim dengan anti-cheat tingkat kernel tidak didukung. Hasil pengembang tidak menjamin performa yang sama pada perangkat lain.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-stone-50 p-6">
              <h3 className="text-lg font-bold text-slate-950">Latihan eksplorasi</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7 text-slate-600">
                <li>Catat chip Mac, versi macOS, dan gim yang ingin diuji.</li>
                <li>Periksa laporan kompatibilitas beserta perangkat pengujinya.</li>
                <li>Jika sesuai, ikuti pemasangan resmi dan uji satu gim yang dimiliki.</li>
                <li>Catat pengaturan, kelancaran, kendala, dan kesimpulan; bedakan pengamatan sendiri dari klaim pengembang.</li>
              </ol>
            </article>
          </div>
          <aside className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-slate-700">
            <strong className="text-slate-950">Sebelum memasang:</strong> Bridgeplay memodifikasi dan menandatangani ulang aplikasi Steam. Pengembang menyatakan bahwa Valve tidak mendukung atau mengesahkannya dan modifikasi ini mungkin tidak sesuai dengan ketentuan Steam. Baca dokumentasi pemasangan serta pemulihan Steam pada sumber resmi.
          </aside>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              ["https://bridgeplay.dev", "Buka situs Bridgeplay"],
              ["https://github.com/raymondchins/Bridgeplay", "Pelajari kode di GitHub"],
              ["https://bridgeplay.dev/compatibility", "Cek kompatibilitas gim"],
            ].map(([href, label]) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">
                {label}<ExternalLink size={16} aria-hidden="true" /><span className="sr-only"> (tab baru)</span>
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs leading-6 text-slate-500">Sumber: situs dan repositori resmi Bridgeplay. Dokumentasi ditinjau 25 Oktober 2026; persyaratan dan kompatibilitas dapat berubah.</p>
        </div>
      </section>
      <section id="sekai-gateway" aria-labelledby="sekai-gateway-title" className="scroll-mt-24 border-b border-slate-200 bg-stone-50" lang="id">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-amber-800">Referensi layanan eksternal · API AI</p>
            <h2 id="sekai-gateway-title" className="mt-3 text-3xl font-bold leading-tight text-slate-950">SEKAI Gateway: Akses Model AI dengan Pembayaran Rupiah</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Pelajari cara satu layanan API menghubungkan aplikasi dan coding agent dengan berbagai model AI. SEKAI Gateway menawarkan pembayaran rupiah melalui QRIS, saldo bayar sesuai pemakaian, serta paket untuk kebutuhan coding.</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">Referensi untuk eksplorasi di AI &amp; Digital Systems Lab. Akses model, akun, dan pembayaran dikelola oleh penyedia eksternal. API SEKAI belum diaktifkan pada website ini dan belum diuji langsung oleh Hossibarani Lab.</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-950">Satu akses, berbagai model</h3>
              <p className="mt-3 leading-7 text-slate-600">Menurut situs penyedia, layanan memakai format API OpenAI dan menyediakan model dari beberapa penyedia. Aplikasi dihubungkan menggunakan alamat API, API key SEKAI, dan ID model.</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">Dapat menjadi bahan eksperimen asisten pembelajaran, prototipe aplikasi, dan perbandingan jawaban model dengan pertanyaan yang sama.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-950">Pilihan pembayaran</h3>
              <p className="mt-3 leading-7 text-slate-600">Pay As You Go mengenakan biaya berdasarkan token input dan output. Coding Plan menawarkan paket Basic, Pro, dan MAX dengan batas pemakaian sesuai paket.</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">Periksa harga, model yang tersedia, dan kuota terbaru di situs penyedia sebelum membeli. Pengisian saldo tersedia melalui QRIS.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-950">Latihan eksplorasi</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7 text-slate-600">
                <li>Pilih satu tugas sederhana dengan materi publik.</li>
                <li>Pelajari dokumentasi dan tentukan batas biaya uji.</li>
                <li>Jika menggunakan layanan, bandingkan dua model dengan instruksi yang sama.</li>
                <li>Catat ketepatan jawaban, sumber, waktu respons, dan biaya aktual.</li>
              </ol>
            </article>
          </div>
          <p className="mt-6 text-sm leading-7 text-slate-600">Untuk eksperimen, gunakan data publik atau sintetis. Tinjau kebijakan data penyedia sebelum mengirim dokumen rahasia, dan simpan API key di sisi server aplikasi Anda.</p>
          <div className="mt-6">
            <a href="https://sekaigateway.xyz/id" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-700">
              Buka SEKAI Gateway<ExternalLink size={16} aria-hidden="true" /><span className="sr-only"> (tab baru)</span>
            </a>
          </div>
          <p className="mt-4 text-xs leading-6 text-slate-500">Sumber: halaman utama SEKAI Gateway, ditinjau 25 Oktober 2026. Fitur dan ketentuan merupakan informasi dari penyedia dan dapat berubah.</p>
        </div>
      </section></div>; }