"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, Check, Download, Play, Target } from "lucide-react";
import styles from "./classroom.module.css";

const PDF = "/materials/kepala-sekolah-strategis.pdf";
const KEY = "hos-kelas-kepemimpinan-strategis-v1";
const topics = [
  { title: "Dari rutinitas menuju arah strategis", pages: "2–6", body: "Kepemimpinan strategis menghubungkan keputusan hari ini dengan pembelajaran murid di masa depan. Fokus operasional memastikan kegiatan berjalan; fokus strategis menentukan praktik apa yang perlu diperbaiki dan alasan pemilihannya.", points: ["Bangun arah dan harapan bersama yang dipahami warga sekolah.", "Pusatkan keputusan pada pembelajaran, kolaborasi, dan pengembangan kapasitas guru."], prompt: "Kegiatan apa yang menyita waktu sekolah Anda, tetapi dampaknya pada pembelajaran belum jelas?" },
  { title: "Diagnosis akar masalah berbasis bukti", pages: "7–8", body: "Pisahkan gejala, dugaan penyebab, dan bukti penguji sebelum memilih intervensi. Murid sulit memahami bacaan, misalnya, belum tentu memerlukan tambahan jam; penyebabnya perlu diperiksa melalui hasil kerja, observasi kelas, dan wawancara.", points: ["Triangulasikan hasil belajar, proses pembelajaran, dan suara murid, guru, serta orang tua.", "Periksa perbedaan antarkelompok agar nilai rata-rata tidak menutupi kebutuhan murid tertentu."], prompt: "Sebutkan satu dugaan akar masalah dan bukti yang dapat menguatkan atau membantahnya." },
  { title: "Memilih prioritas dan mengalokasikan sumber daya", pages: "9–11", body: "Rumuskan kemampuan yang diperbaiki, kelompok sasaran, batas waktu, serta bukti keberhasilannya. Nilai pilihan berdasarkan dampak, pemerataan, kelayakan, bukti, dan risiko. Tetapkan target setelah data awal tersedia.", points: ["Nyatakan program yang ditunda agar prioritas mendapat waktu dan anggaran.", "Perhitungkan beban kerja guru dan kesempatan yang hilang dari setiap pilihan."], prompt: "Jika hanya satu program dapat dijalankan, program apa yang Anda pilih dan apa yang ditunda?" },
  { title: "Supervisi, kolaborasi, dan kepemimpinan berbagi", pages: "12–14", body: "Supervisi menjadi siklus belajar: sepakati fokus, amati praktik dan respons murid, berikan umpan balik berbasis bukti, lalu periksa perubahan. Keberatan guru memberi informasi tentang keterampilan, beban kerja, kepercayaan, atau pembagian tugas.", points: ["Kepala sekolah menjaga arah, dukungan, dan akuntabilitas; tim guru mengembangkan praktik pembelajaran.", "Libatkan murid dan orang tua untuk memahami pengalaman belajar yang nyata."], prompt: "Bagaimana Anda menanggapi guru yang setuju dengan tujuan program tetapi keberatan dengan beban kerjanya?" },
  { title: "Menguji keputusan melalui studi kasus", pages: "15–17", body: "Kasus simulasi: sebuah SMP dengan 480 siswa dan 30 guru terlihat aktif, tetapi banyak murid kesulitan memahami bacaan dan soal cerita. Supervisi berfokus pada dokumen, guru lelah, dan orang tua meminta les tambahan.", points: ["Bandingkan pengadaan teknologi, seminar motivasi, pendampingan guru, dan dukungan belajar terarah.", "Dalam contoh PDF, pendampingan guru dan tambahan waktu bagi murid yang membutuhkan diprioritaskan. Uji kembali pilihan itu dengan bukti di sekolah Anda."], prompt: "Apa alasan pilihan Anda, bukti yang masih dibutuhkan, dan risiko yang harus dipantau?" },
  { title: "Rencana 90 hari dan evaluasi dampak", pages: "18–20", body: "Hari 1–30: asesmen awal, diagnosis, dan kesepakatan fokus. Hari 31–60: uji coba perubahan terbatas serta pendampingan guru. Hari 61–90: bandingkan hasil, dengarkan pengalaman peserta, lalu revisi sebelum memperluas program.", points: ["Ukur pelaksanaan, perubahan praktik guru, hasil belajar, dan pemerataan manfaat.", "Gunakan hasil asesmen yang sebanding dan bersedia merevisi keputusan ketika bukti berubah."], prompt: "Bukti apa yang akan membuat Anda melanjutkan, mengubah, atau menghentikan intervensi?" },
];
const questions = [
  { text: "Apa langkah pertama saat masalah belajar terus berulang?", options: ["Membeli perangkat baru", "Menguji dugaan akar masalah dengan bukti", "Menambah semua kegiatan sekolah"], answer: 1, why: "Diagnosis mendahului intervensi. Gejala yang sama dapat memiliki penyebab berbeda." },
  { text: "Apa yang membedakan tujuan strategis dari daftar kegiatan?", options: ["Tujuan menyebut kemampuan sasaran, waktu, dan bukti hasil", "Tujuan mencantumkan sebanyak mungkin acara", "Tujuan hanya mencatat anggaran terserap"], answer: 0, why: "Tujuan perbaikan menjelaskan perubahan belajar yang ingin diuji, bukan sekadar kegiatan yang selesai." },
  { text: "Mengapa program lain kadang perlu ditunda?", options: ["Supaya evaluasi tidak diperlukan", "Agar guru tidak perlu dilibatkan", "Agar prioritas memperoleh waktu dan sumber daya yang cukup"], answer: 2, why: "Setiap program memakai waktu dan perhatian. Prioritas harus terlihat pada jadwal dan pembagian anggaran." },
  { text: "Seorang guru mengeluhkan beban program. Respons yang tepat adalah…", options: ["Menganggapnya menolak perubahan", "Menelaah beban kerja dan menata ulang dukungan", "Mengabaikan keluhan selama target tercapai"], answer: 1, why: "Keberatan merupakan informasi untuk memperbaiki rancangan dan dukungan pelaksanaan." },
  { text: "Apa bukti terkuat untuk mengevaluasi rencana 90 hari?", options: ["Jumlah foto kegiatan", "Banyaknya rapat dan dokumen", "Perubahan praktik, hasil belajar, serta pemerataan manfaat"], answer: 2, why: "Pelaksanaan perlu diperiksa bersama perubahan praktik dan hasil, termasuk kelompok murid yang masih tertinggal." },
];
const fields = [
  ["context", "Konteks sekolah", "Tuliskan konteks secara anonim, tanpa data pribadi murid."],
  ["problem", "Masalah, dugaan penyebab, dan bukti awal", "Pisahkan gejala dari akar masalah. Bukti apa yang sudah dan belum tersedia?"],
  ["goal", "Tujuan perbaikan dan indikator", "Kemampuan apa, kelompok sasaran, batas waktu, data awal, dan target yang beralasan."],
  ["priority", "Pilihan prioritas dan konsekuensi", "Intervensi terpilih, alasan, risiko, dan kegiatan yang ditunda."],
  ["days30", "Hari 1–30 · Asesmen dan fokus", "Kegiatan, penanggung jawab, kebutuhan sumber daya, serta bukti yang dikumpulkan."],
  ["days60", "Hari 31–60 · Uji coba dan dukungan", "Lingkup uji coba, pendampingan guru, jadwal, dan cara mengatasi hambatan."],
  ["days90", "Hari 61–90 · Evaluasi dan revisi", "Cara membandingkan hasil dan dasar keputusan melanjutkan, mengubah, atau menghentikan."],
  ["reflection", "Refleksi kepemimpinan", "Keputusan apa yang perlu Anda ubah? Siapa yang perlu dilibatkan, dan mengapa?"],
] as const;
type Notes = Record<string, string>;

export default function Classroom() {
  const [active, setActive] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [notes, setNotes] = useState<Notes>({});
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const [ready, setReady] = useState(false);
  const [storage, setStorage] = useState("");
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved.done)) setDone([...new Set<number>(saved.done.filter((n: unknown) => typeof n === "number" && Number.isInteger(n) && n >= 0 && n < topics.length))]);
        if (saved.notes && typeof saved.notes === "object") setNotes(Object.fromEntries(Object.entries(saved.notes).filter(([key, val]) => fields.some(([id]) => id === key) && typeof val === "string")) as Notes);
      }
      setStorage("Progres dan catatan tersimpan otomatis di browser ini. Unduh hasil untuk cadangan; data tidak dikirim ke pengajar.");
    } catch { setStorage("Penyimpanan browser tidak tersedia atau data lama tidak terbaca. Gunakan Unduh hasil belajar sebelum menutup halaman."); }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify({ done, notes })); }
    catch { setStorage("Catatan belum tersimpan di browser. Gunakan Unduh hasil belajar sebelum menutup halaman."); }
  }, [done, notes, ready]);
  const topic = topics[active];
  const score = questions.filter((q, i) => answers[i] === q.answer).length;
  const complete = questions.every((_, i) => answers[i] !== undefined);
  function download() {
    const content = ["MANAJEMEN KEPEMIMPINAN STRATEGIS", "Dr. Hos Arie Sibarani", "https://www.hossibarani.com/kelas/manajemen-kepemimpinan-strategis", `Tanggal: ${new Date().toLocaleDateString("id-ID")}`, `Progres mandiri: ${done.length}/${topics.length} pokok bahasan`, checked ? `Kuis latihan: ${score}/${questions.length} benar (bukan nilai resmi)` : "Kuis belum diperiksa", "", ...fields.flatMap(([id, label]) => [label.toUpperCase(), notes[id] || "Belum diisi", ""])].join("\n");
    const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a"); a.href = url; a.download = "Rencana_90_Hari_Kepemimpinan_Strategis.txt"; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <main lang="id" className={styles.page}>
    <div className={styles.wrap}>
      <nav aria-label="Jejak halaman" className={styles.breadcrumb}><Link href="/id">Beranda</Link><span>/</span><Link href="/kuliah">Pembelajaran</Link><span>/</span><span>Kepemimpinan strategis</span></nav>
      <header className={styles.hero}>
        <div><p className={styles.eyebrow}>RUANG BELAJAR · MANAJEMEN PENDIDIKAN</p><h1>Manajemen Kepemimpinan Strategis</h1><p className={styles.lead}>Mengubah rutinitas sekolah menjadi dampak pembelajaran.</p><p className={styles.intro}>Belajar mendiagnosis masalah, memilih prioritas, memimpin kolaborasi, dan menyusun rencana perbaikan 90 hari yang dapat diuji.</p><p className={styles.author}>Bersama Dr. Hos Arie Sibarani</p><div className={styles.actions}><a className={styles.primary} href="#video"><Play size={18} aria-hidden="true"/> Mulai belajar</a><a className={styles.secondary} href={PDF} download="Kepala_Sekolah_Strategis.pdf"><Download size={18} aria-hidden="true"/> Unduh materi PDF</a></div></div>
        <aside className={styles.overview}><Target size={30} aria-hidden="true"/><h2>Dari keputusan ke bukti.</h2><p>Untuk mahasiswa Magister Pendidikan, kepala sekolah, calon pemimpin sekolah, guru, dan pengawas.</p><dl><div><dt>Format</dt><dd>Belajar mandiri · Akses terbuka</dd></div><div><dt>Bahan belajar</dt><dd>1 video · 20 slide · 6 pokok bahasan</dd></div><div><dt>Hasil praktik</dt><dd>Rancangan perbaikan 90 hari</dd></div></dl></aside>
      </header>
      <nav aria-label="Bagian kelas" className={styles.sectionNav}><a href="#video">Video pembelajaran</a><a href="#materi">Pokok bahasan</a><a href="#kuis">Kuis pemahaman</a><a href="#praktik">Rencana 90 hari</a></nav>
      <section id="video" className={styles.section}><div className={styles.heading}><div><p className={styles.eyebrow}>TONTON & TELAAH</p><h2>Kepala Sekolah sebagai Pemimpin Strategis</h2></div><a href="https://youtu.be/iPH7dtKTW9o" target="_blank" rel="noopener noreferrer">Buka di YouTube</a></div>
        <div className={styles.videoGrid}><div className={styles.video}><iframe src="https://www.youtube-nocookie.com/embed/iPH7dtKTW9o?rel=0&hl=id" title="Kepala Sekolah sebagai Pemimpin Strategis — Dr. Hos Arie Sibarani" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/></div><div className={styles.watchGuide}><BookOpen size={26} aria-hidden="true"/><h3>Sambil menonton</h3><p>Pikirkan satu persoalan sekolah yang berulang meskipun sudah berkali-kali ditangani.</p><ol><li>Pisahkan gejala dan dugaan akar masalah.</li><li>Catat bukti yang diperlukan sebelum memilih program.</li><li>Tentukan perubahan belajar yang ingin dicapai.</li></ol><p className={styles.small}>Jika pemutar tidak tampil, gunakan tautan Buka di YouTube.</p></div></div>
        <details className={styles.pdf}><summary>Baca presentasi pendamping · 20 slide</summary><p>Cetak Biru Pemimpin Strategis: Mengubah Rutinitas Menjadi Dampak Pembelajaran.</p><div className={styles.actions}><a href={PDF} target="_blank" rel="noopener noreferrer">Buka PDF di tab baru</a><a href={PDF} download="Kepala_Sekolah_Strategis.pdf">Unduh PDF</a></div><iframe src={`${PDF}#view=FitH`} title="Presentasi Cetak Biru Pemimpin Strategis" loading="lazy"/><p className={styles.small}>Pratinjau PDF bergantung pada browser. Gunakan Buka PDF atau Unduh PDF bila tidak tampil.</p></details>
      </section>
      <section id="materi" className={styles.section}><div className={styles.heading}><div><p className={styles.eyebrow}>PAHAMI & REFLEKSIKAN</p><h2>Enam pokok bahasan</h2></div><p aria-live="polite">{done.length} dari {topics.length} selesai dipelajari</p></div><progress aria-label="Progres pokok bahasan" value={done.length} max={topics.length}/>
        <div className={styles.lessonGrid}><nav aria-label="Pilih pokok bahasan" className={styles.lessons}>{topics.map((t, i) => <button type="button" key={t.title} onClick={() => setActive(i)} aria-pressed={active === i} className={active === i ? styles.selected : ""}><span>{t.title}</span><small>{done.includes(i) ? "Selesai dipelajari" : `Slide ${t.pages}`}</small>{done.includes(i) && <Check size={18} aria-hidden="true"/>}</button>)}</nav><article className={styles.lesson}><p className={styles.eyebrow}>MATERI PENDAMPING · SLIDE {topic.pages}</p><h3>{topic.title}</h3><p>{topic.body}</p><ul>{topic.points.map(p => <li key={p}>{p}</li>)}</ul><div className={styles.prompt}><strong>Pertanyaan refleksi</strong><p>{topic.prompt}</p></div><div className={styles.actions}><button disabled={!ready} type="button" className={styles.primary} onClick={() => setDone(current => current.includes(active) ? current.filter(n => n !== active) : [...current, active])}>{done.includes(active) ? "Batalkan tanda selesai" : "Tandai sudah dipelajari"}</button>{active < topics.length - 1 && <button type="button" className={styles.secondary} onClick={() => setActive(active + 1)}>Bahasan berikutnya</button>}</div></article></div>
      </section>
      <section id="kuis" className={styles.section}><p className={styles.eyebrow}>UJI PEMAHAMAN</p><h2>Lima keputusan, satu fokus: pembelajaran.</h2><p className={styles.intro}>Pilih satu jawaban pada setiap soal. Kuis ini merupakan latihan mandiri dengan penjelasan, bukan nilai akademik resmi.</p><form onSubmit={event => { event.preventDefault(); if (complete) setChecked(true); }} className={styles.quiz}>{questions.map((q, i) => <fieldset key={q.text}><legend>{i + 1}. {q.text}</legend>{q.options.map((option, j) => <label key={option}><input type="radio" name={`question-${i}`} required checked={answers[i] === j} onChange={() => { setAnswers(previous => ({ ...previous, [i]: j })); setChecked(false); }}/><span>{option}</span></label>)}{checked && <p className={styles.feedback}><strong>{answers[i] === q.answer ? "Benar. " : `Perlu ditinjau. Jawaban: ${q.options[q.answer]}. `}</strong>{q.why}</p>}</fieldset>)}<div className={styles.actions}><button type="submit" className={styles.primary}>Periksa jawaban</button><span role="status">{checked ? `${score} dari ${questions.length} jawaban benar. Baca penjelasan pada setiap soal.` : `${Object.keys(answers).length} dari ${questions.length} soal terisi.`}</span></div></form></section>
      <section id="praktik" className={styles.section}><p className={styles.eyebrow}>TERAPKAN DI KONTEKS ANDA</p><h2>Lembar kerja rencana 90 hari</h2><p className={styles.intro}>Pilih satu masalah pembelajaran nyata atau gunakan studi kasus SMP dalam materi. Isi rancangan di bawah, lalu unduh untuk diskusi kelas atau pengumpulan sesuai arahan pengajar.</p><p className={styles.storage} role="status">{storage || "Menyiapkan catatan belajar…"}</p><div className={styles.fields}>{fields.map(([id, label, hint]) => <div key={id}><label htmlFor={`plan-${id}`}>{label}</label><p id={`hint-${id}`}>{hint}</p><textarea id={`plan-${id}`} aria-describedby={`hint-${id}`} rows={4} disabled={!ready} maxLength={12000} value={notes[id] || ""} onChange={e => setNotes(current => ({ ...current, [id]: e.target.value }))}/></div>)}</div><div className={styles.actions}><button disabled={!ready} type="button" onClick={download} className={styles.primary}><Download size={18} aria-hidden="true"/> Unduh hasil belajar (.txt)</button><span className={styles.small}>Memuat rencana, refleksi, progres, dan hasil kuis yang sudah diperiksa.</span></div>
        <details className={styles.rubric}><summary>Panduan menilai rancangan sendiri</summary><ul><li><strong>Diagnosis:</strong> dugaan penyebab diuji dengan lebih dari satu sumber bukti.</li><li><strong>Prioritas:</strong> alasan, kebutuhan murid, dan konsekuensi sumber daya dinyatakan jelas.</li><li><strong>Pelaksanaan:</strong> kegiatan, waktu, penanggung jawab, dan dukungan realistis.</li><li><strong>Evaluasi:</strong> indikator memeriksa praktik, hasil belajar, serta pemerataan manfaat.</li></ul></details>
      </section>
      <footer className={styles.classFooter}><p>Materi utama: “Cetak Biru Pemimpin Strategis”, Dr. Hos Arie Sibarani, 20 slide. Ringkasan, kuis, dan lembar kerja disusun sebagai pendamping belajar.</p><div className={styles.actions}><Link href="/hukumpreneur#kepala-sekolah-strategis">Video di Hukumpreneur</Link><Link href="/coaching-mentoring">Coaching & Mentoring</Link><Link href="/kuliah">Pembelajaran lainnya</Link></div></footer>
    </div>
  </main>;
}
