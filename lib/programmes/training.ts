export const trainingOffers = [
  {
    id: "guru", title: "AI untuk Guru", subtitle: "Merancang pembelajaran dan memeriksa hasil AI", label: "Pelatihan unggulan guru",
    audience: "Guru SD, SMP, SMA, dan SMK. Tidak perlu bisa pemrograman; siapkan laptop, internet, serta satu topik pembelajaran.",
    format: "2 sesi daring × 2 jam + praktik selama 7 hari", capacity: "Maksimal 20 peserta", price: "Rp350.000/orang",
    outcome: "Perangkat pembelajaran yang sesuai kebutuhan kelas dan telah diperiksa oleh guru.",
    curriculum: ["Sesi 1: merumuskan kebutuhan kelas, menyusun instruksi AI, dan membuat rancangan aktivitas serta lembar kerja.", "Praktik 7 hari: menyempurnakan perangkat dengan bahan ajar dan konteks kelas sendiri.", "Sesi 2: memeriksa fakta dan kesesuaian, menyusun asesmen serta rubrik, lalu merevisi hasil AI."],
    deliverables: ["Ringkasan kebutuhan kelas dan instruksi AI", "Rancangan aktivitas serta lembar kerja siswa", "Asesmen, rubrik, dan catatan pemeriksaan serta revisi"],
    support: "Satu putaran umpan balik tertulis dan satu kesempatan revisi dalam 7 hari.",
    assessment: "Kehadiran minimal 75%, seluruh tugas diserahkan, dan nilai portofolio minimal 70/100 dari fasilitator. Kesalahan kritis harus diperbaiki.",
    scope: "Gunakan contoh anonim; jangan memasukkan identitas atau data pribadi siswa. Langganan aplikasi AI pribadi tidak termasuk.",
    action: "Tanyakan kelas guru",
  },
  {
    id: "institusi", title: "Pelatihan AI Institusi", subtitle: "Dari pelatihan ke penerapan tim", label: "Paket untuk organisasi",
    audience: "Sekolah, kampus, dinas, dan organisasi yang ingin memperbaiki satu alur kerja prioritas. Institusi menunjuk satu PIC dan menyediakan contoh pekerjaan yang aman digunakan.",
    format: "1 hari · 6 jam belajar + pendampingan 14 hari", capacity: "Maksimal 25 peserta dalam 5 kelompok", price: "Rp9.500.000/paket",
    outcome: "Lima prototipe kerja kelompok, panduan penggunaan AI, dan laporan evaluasi penerapan.",
    curriculum: ["Sebelum pelatihan: wawancara kebutuhan 45 menit dan pemilihan satu alur kerja bersama PIC.", "Hari pelatihan: pemetaan masalah, praktik instruksi, pemeriksaan hasil, pembuatan prototipe, dan presentasi kelompok. Enam jam belajar di luar istirahat.", "Dalam 14 hari: uji coba tim, satu klinik daring 60 menit, dan satu putaran ulasan untuk setiap kelompok."],
    deliverables: ["5 prototipe penerapan pada satu alur kerja prioritas", "Panduan penggunaan AI 2–3 halaman", "Laporan evaluasi maksimal 5 hari kerja setelah data lengkap"],
    support: "Satu fasilitator utama dan satu asisten, penyesuaian satu kasus, klinik daring, serta laporan evaluasi.",
    assessment: "Penilaian kebutuhan, kesesuaian konteks, pemeriksaan fakta, kegunaan hasil, dan refleksi. Target pendampingan: minimal 4 dari 5 kelompok mencapai 70/100 setelah revisi; hasil diukur, bukan dijamin.",
    scope: "Tempat, konsumsi, perjalanan, penginapan, lisensi/API, serta pajak bila berlaku dihitung terpisah. Pembuatan aplikasi, integrasi basis data, dan dukungan tanpa batas tidak termasuk.",
    action: "Minta proposal institusi",
  },
  {
    id: "lexnusa", title: "LexNusa Legal AI Practice", subtitle: "Analisis kontrak dan evaluasi AI", label: "Spesialisasi hukum",
    audience: "Mahasiswa hukum dengan dasar kontrak, pengajar, peneliti, dan praktisi yang ingin menyusun serta mengevaluasi dokumen berbantuan AI.",
    format: "4 minggu · 4 sesi daring × 2 jam", capacity: "Maksimal 15 peserta", price: "Rp1.250.000/orang",
    outcome: "Portofolio satu kasus kontrak kerja fiktif, dari kebutuhan sampai revisi yang dapat dipertanggungjawabkan.",
    curriculum: ["Minggu 1: analisis kebutuhan dan identifikasi persoalan kontrak.", "Minggu 2: menyusun instruksi dan draf berbantuan AI.", "Minggu 3: mengevaluasi ketepatan hukum, sumber, penalaran, dan penerapan.", "Minggu 4: revisi beralasan serta presentasi portofolio. Sediakan sekitar 2 jam praktik mandiri setiap minggu."],
    deliverables: ["Ringkasan kebutuhan dan instruksi AI", "Draf kontrak dan laporan evaluasi", "Kontrak revisi beserta alasan perubahan"],
    support: "Dua putaran umpan balik. Rencana akses ruang kerja selama program dan 30 hari setelahnya; kuota AI dan fasilitas ekspor dikonfirmasi sebelum pembayaran.",
    assessment: "Kehadiran minimal 75%, lima hasil kerja lengkap, nilai peserta minimal 70/100, dan kesalahan kritis telah diperbaiki. Kelulusan diputuskan manusia; skor LEX-EVAL menilai keluaran AI secara terpisah.",
    scope: "Gunakan kontrak fiktif dan sumber yang diperiksa fasilitator. Jangan mengunggah dokumen rahasia klien. Program merupakan pelatihan, bukan sertifikasi profesi atau layanan penanganan perkara.",
    action: "Tanyakan kelas LexNusa",
  },
] as const;

export function trainingInquiry(title: string) {
  const body = `Saya tertarik mengikuti ${title}.\n\nNama:\nInstitusi (jika ada):\nPeran/jenjang:\nKebutuhan belajar atau alur kerja:\nJumlah peserta:\nPreferensi waktu:\n\nMohon informasi jadwal dan penawaran final.`;
  return `mailto:riesib8@gmail.com?subject=${encodeURIComponent(`Informasi ${title}`)}&body=${encodeURIComponent(body)}`;
}
