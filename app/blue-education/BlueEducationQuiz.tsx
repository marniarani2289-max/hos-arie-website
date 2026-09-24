"use client";

import { useRef, useState, type FormEvent } from "react";
import s from "./LearningActivities.module.css";

const questions = [
  {
    "topic": "Konsep",
    "prompt": "Sekolah jauh dari pantai ingin menerapkan Pendidikan Biru. Kegiatan mana yang paling sesuai?",
    "options": [
      "Mempelajari hubungan penggunaan air dan sampah sekolah dengan sungai serta laut.",
      "Menunda program sampai sekolah memiliki akses langsung ke pantai.",
      "Membatasi kegiatan pada hafalan nama ikan laut.",
      "Mengganti semua mata pelajaran dengan pelajaran kelautan."
    ],
    "answer": 0,
    "explanation": "Aktivitas di darat terhubung dengan perairan melalui air, sungai, saluran pembuangan, dan konsumsi. Sekolah di pedalaman tetap dapat terlibat.",
    "section": "konsep"
  },
  {
    "topic": "Literasi laut",
    "prompt": "Seorang siswa hafal nama ekosistem laut, tetapi belum mempertimbangkan dampak perilakunya. Apa yang perlu diperkuat?",
    "options": [
      "Jumlah istilah kelautan yang dihafalkan.",
      "Kemampuan mengambil keputusan yang bertanggung jawab berdasarkan hubungan manusia dan laut.",
      "Frekuensi kunjungan wisata tanpa kegiatan refleksi.",
      "Kemampuan menyebutkan luas samudra dengan tepat."
    ],
    "answer": 1,
    "explanation": "Literasi laut mencakup pemahaman hubungan timbal balik manusia dan laut, komunikasi, serta keputusan yang bertanggung jawab; hafalan saja belum cukup.",
    "section": "konsep"
  },
  {
    "topic": "Model Kepri",
    "prompt": "Sekolah menelaah mangrove, usaha nelayan, tradisi pelayaran, dan aturan pemanfaatan pesisir. Empat dimensi apa yang sedang dihubungkan?",
    "options": [
      "Pariwisata, transportasi, teknologi, dan investasi.",
      "Air, udara, tanah, dan energi.",
      "Ekologi perairan, penghidupan masyarakat, budaya maritim, dan tata kelola.",
      "Pengetahuan, ujian, peringkat, dan kelulusan."
    ],
    "answer": 2,
    "explanation": "Kerangka konseptual Kepri pada materi menghubungkan empat dimensi tersebut. Kerangka ini merupakan usulan kontekstual yang perlu divalidasi, bukan sertifikasi resmi.",
    "section": "kepri"
  },
  {
    "topic": "Sekolah menyeluruh",
    "prompt": "Kelas membahas pengurangan sampah, tetapi kantin dan aturan sekolah belum berubah. Langkah mana yang menunjukkan pendekatan sekolah menyeluruh?",
    "options": [
      "Menambah poster di kelas tanpa meninjau praktik sekolah.",
      "Mengadakan lomba sekali setahun tanpa tindak lanjut.",
      "Membatasi tanggung jawab program kepada guru IPA.",
      "Menyelaraskan kurikulum, kebiasaan kantin, pendampingan guru, dan keputusan sekolah."
    ],
    "answer": 3,
    "explanation": "Pendekatan sekolah menyeluruh menyatukan kurikulum, budaya dan praktik, kapasitas pendidik, serta tata kelola dan kemitraan.",
    "section": "sekolah"
  },
  {
    "topic": "Data awal",
    "prompt": "Sebelum menguji pengurangan kemasan kantin, data awal seperti apa yang paling berguna?",
    "options": [
      "Foto kantin tanpa tanggal atau keterangan.",
      "Jumlah atau berat kemasan pada lokasi dan durasi tertentu, disertai satuan serta jumlah siswa hadir.",
      "Perkiraan umum petugas tanpa cara pengukuran yang dicatat.",
      "Jumlah kemasan sesudah program saja."
    ],
    "answer": 1,
    "explanation": "Data awal menjadi pembanding. Satuan, lokasi, durasi, kehadiran, dan kondisi pengamatan perlu dicatat agar pengukuran ulang dapat dibandingkan secara adil.",
    "section": "proyek"
  },
  {
    "topic": "Etika pengetahuan lokal",
    "prompt": "Siswa akan merekam cerita warga tentang perubahan pesisir. Apa langkah yang tepat sebelum merekam dan membagikannya?",
    "options": [
      "Merekam diam-diam agar ceritanya lebih alami.",
      "Membagikan nama dan kontak semua narasumber di media sosial.",
      "Menjelaskan tujuan, meminta persetujuan, dan menyepakati atribusi serta penggunaan rekaman.",
      "Menganggap semua cerita boleh dipublikasikan karena disampaikan secara lisan."
    ],
    "answer": 2,
    "explanation": "Wawancara, dokumentasi, dan penggunaan pengetahuan lokal memerlukan persetujuan. Pengakuan terhadap narasumber serta batas penggunaan disepakati, dan data pribadi yang tidak diperlukan tidak dikumpulkan.",
    "section": "penerapan"
  },
  {
    "topic": "Memilih aksi",
    "prompt": "Tim sekolah memiliki beberapa usulan pengurangan sampah. Dasar terbaik untuk memilih satu uji coba adalah…",
    "options": [
      "Kesesuaian dengan penyebab, biaya, kelayakan, keadilan, dan indikator yang disepakati.",
      "Potensi menghasilkan foto kegiatan paling menarik.",
      "Jumlah peserta terbesar walaupun sarana belum tersedia.",
      "Pilihan yang paling mahal karena pasti lebih efektif."
    ],
    "answer": 0,
    "explanation": "Intervensi perlu menanggapi penyebab yang didukung bukti, layak dilakukan, dan tidak membebani kelompok tertentu. Indikator disepakati sebelum uji coba.",
    "section": "proyek"
  },
  {
    "topic": "Membaca data",
    "prompt": "Pada pengamatan yang sebanding, kemasan turun dari 100 menjadi 80 buah, tetapi siswa hadir turun dari 50 menjadi 40 orang. Apa yang ditunjukkan rasio kemasan per siswa?",
    "options": [
      "Turun 20%, sama seperti penurunan jumlah kemasan total.",
      "Naik dari 1 menjadi 2 kemasan per siswa.",
      "Turun dari 2 menjadi 1 kemasan per siswa.",
      "Tetap 2 kemasan per siswa, sehingga penurunan total belum menunjukkan perbaikan rasio."
    ],
    "answer": 3,
    "explanation": "Sebelum: 100 ÷ 50 = 2 kemasan per siswa. Sesudah: 80 ÷ 40 = 2. Perubahan jumlah siswa harus dipertimbangkan sebelum menilai keberhasilan.",
    "section": "evaluasi"
  },
  {
    "topic": "Batas kesimpulan",
    "prompt": "Setelah uji coba, sampah kemasan sekolah berkurang. Kesimpulan mana yang paling sesuai dengan bukti tersebut?",
    "options": [
      "Kesehatan laut di seluruh Kepulauan Riau pasti membaik.",
      "Seluruh penurunan pasti disebabkan program sekolah.",
      "Sampah sekolah berkurang pada periode yang diamati; faktor lain dan dampak lebih luas masih perlu diperiksa.",
      "Program pasti meningkatkan pendapatan semua warga pesisir."
    ],
    "answer": 2,
    "explanation": "Perbandingan sebelum–sesudah saja belum membuktikan sebab-akibat. Hasil di sekolah tidak otomatis membuktikan perubahan ekologi laut atau manfaat ekonomi masyarakat.",
    "section": "evaluasi"
  },
  {
    "topic": "Tindak lanjut",
    "prompt": "Apa keluaran yang paling berguna pada akhir proyek delapan minggu?",
    "options": [
      "Album kegiatan tanpa data hasil.",
      "Portofolio bukti, refleksi, dan keputusan tindak lanjut dengan penanggung jawab.",
      "Sertifikat bagi semua peserta tanpa meninjau proses.",
      "Pernyataan keberhasilan tanpa mencatat kendala."
    ],
    "answer": 1,
    "explanation": "Hasil dibagikan beserta keberhasilan, kegagalan, dan ketidakpastiannya. Sekolah kemudian memutuskan apakah praktik dilanjutkan, diperbaiki, atau dihentikan, dengan penanggung jawab yang jelas.",
    "section": "proyek"
  }
];

export default function BlueEducationQuiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const answered = Object.keys(answers).length;
  const correct = questions.filter((q, i) => answers[i] === q.answer).length;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (answered !== questions.length) {
      const missing = questions.findIndex((_, i) => answers[i] === undefined);
      setError("Jawab semua soal terlebih dahulu. Soal " + (missing + 1) + " belum dijawab.");
      formRef.current?.querySelector<HTMLInputElement>('input[name="blue-question-' + missing + '"]')?.focus();
      return;
    }
    setError("");
    setSubmitted(true);
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
    setError("");
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>("input")?.focus());
  }

  return <div className={s.quiz}>
    <p className={s.instructions} id="quiz-instructions">Pilih satu jawaban pada setiap soal. Skor dan pembahasan tampil setelah semua soal dijawab. Ini latihan mandiri; hasil tidak disimpan setelah halaman ditutup atau dimuat ulang.</p>
    <form ref={formRef} onSubmit={submit} aria-describedby="quiz-instructions" noValidate>
      <p className={s.progress} aria-live="polite">{answered} dari {questions.length} soal terjawab</p>
      <div className={s.questionList}>
        {questions.map((q, index) => <fieldset key={q.prompt} className={s.question} disabled={submitted}>
          <legend><span className={s.topic}>Soal {index + 1} · {q.topic}</span>{q.prompt}</legend>
          <div className={s.options}>
            {q.options.map((option, optionIndex) => <label key={option} className={s.option} data-selected={answers[index] === optionIndex}>
              <input type="radio" name={"blue-question-" + index} value={optionIndex} checked={answers[index] === optionIndex} onChange={() => { setAnswers(previous => ({ ...previous, [index]: optionIndex })); setError(""); }} />
              <span><strong>{String.fromCharCode(65 + optionIndex)}.</strong> {option}</span>
            </label>)}
          </div>
        </fieldset>)}
      </div>
      {error && <p role="alert" className={s.error}>{error}</p>}
      {!submitted && <button type="submit" className={s.button}>Lihat skor dan pembahasan</button>}
    </form>
    {submitted && <div className={s.results} ref={resultRef} tabIndex={-1} aria-labelledby="quiz-result-title">
      <p className={s.topic}>Hasil latihan</p>
      <h3 id="quiz-result-title">Skor Anda: {correct * 10}/100</h3>
      <p>{correct} dari {questions.length} jawaban benar. {correct === 10 ? "Semua jawaban tepat. Lanjutkan dengan menyusun rencana aksi pada lembar kerja." : correct >= 7 ? "Pemahaman Anda sudah baik. Tinjau pembahasan soal yang belum tepat sebelum melanjutkan." : "Baca kembali bagian materi yang ditautkan pada pembahasan, lalu coba lagi."}</p>
      <ol className={s.review}>
        {questions.map((q, index) => <li key={q.prompt}>
          <p className={answers[index] === q.answer ? s.correct : s.incorrect}><strong>Soal {index + 1}: {answers[index] === q.answer ? "Benar" : "Belum tepat"}</strong></p>
          <p>Jawaban Anda: {String.fromCharCode(65 + answers[index])}. {q.options[answers[index]]}</p>
          {answers[index] !== q.answer && <p><strong>Jawaban tepat: {String.fromCharCode(65 + q.answer)}. {q.options[q.answer]}</strong></p>}
          <p>{q.explanation}</p>
          <a href={"#" + q.section}>Pelajari kembali materi terkait</a>
        </li>)}
      </ol>
      <div className={s.actions}><button type="button" className={s.button} onClick={reset}>Ulangi kuis</button><a className={s.secondary} href="#lembar-kerja">Lanjut ke lembar kerja</a></div>
    </div>}
  </div>;
}
