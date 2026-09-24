export const dimensions = [
  { number: "01", title: "Ekologi perairan", subtitle: "Memahami hubungan kehidupan", text: "Pelajari keterhubungan sungai, pesisir, mangrove, lamun, dan terumbu karang. Gunakan pengamatan serta data untuk membaca perubahan lingkungan.", question: "Bagaimana kegiatan di darat memengaruhi perairan di sekitar kita?", example: "Peta aliran air dan audit sumber sampah sekolah." },
  { number: "02", title: "Penghidupan masyarakat", subtitle: "Menilai manfaat dan keberlanjutan", text: "Telusuri perikanan, pengolahan hasil laut, transportasi, dan pariwisata. Baca rantai nilai, biaya, akses pasar, serta dampaknya bagi warga dan ekosistem.", question: "Siapa yang memperoleh manfaat, dan siapa yang menanggung biayanya?", example: "Wawancara pelaku usaha dan pemetaan rantai nilai lokal." },
  { number: "03", title: "Budaya maritim", subtitle: "Belajar bersama pemilik pengetahuan", text: "Hubungkan sejarah pelayaran, tradisi Melayu, bahasa, dan pengetahuan ekologis masyarakat dengan pembelajaran. Dokumentasikan dengan persetujuan dan atribusi.", question: "Pengetahuan lokal apa yang membantu kita merawat perairan?", example: "Sejarah lisan dan cerita perubahan pesisir lintas generasi." },
  { number: "04", title: "Tata kelola", subtitle: "Berpartisipasi dalam keputusan", text: "Kenali aturan, pembagian peran, keadilan akses, dan ruang partisipasi warga. Siswa berlatih menyusun usulan yang dapat ditindaklanjuti lembaga.", question: "Bagaimana keputusan bersama melindungi perairan dan hak masyarakat?", example: "Forum sekolah–warga untuk menyepakati pengurangan sampah." },
] as const;

export const principles = [
  "Bumi memiliki satu samudra besar yang saling terhubung.",
  "Laut dan kehidupan di dalamnya membentuk ciri-ciri Bumi.",
  "Laut berpengaruh besar terhadap cuaca dan iklim.",
  "Laut memungkinkan Bumi menjadi tempat yang layak dihuni.",
  "Laut mendukung keanekaragaman kehidupan dan ekosistem.",
  "Manusia dan laut memiliki hubungan yang tidak terpisahkan.",
  "Sebagian besar laut masih belum dieksplorasi dan dipahami.",
] as const;

export const weeks = [
  { title: "Tentukan masalah", phase: "Penyelidikan", action: "Amati lingkungan sekolah bersama siswa. Pilih satu masalah yang dekat, aman diamati, dan berada dalam jangkauan tindakan sekolah.", evidence: "Pertanyaan penyelidikan, lokasi, batas masalah, dan pembagian peran.", prompt: "Ke mana sampah kemasan kantin kita berakhir?" },
  { title: "Ukur kondisi awal", phase: "Penyelidikan", action: "Catat jenis dan jumlah atau berat sampah pada lokasi serta durasi yang disepakati. Gunakan satuan yang konsisten, catat kehadiran dan kondisi pengamatan.", evidence: "Tabel baseline: tanggal, lokasi, jenis, satuan, hasil, dan kondisi pengamatan.", prompt: "Apa yang perlu diukur agar perbandingan nanti adil?" },
  { title: "Telusuri penyebab", phase: "Penyelidikan", action: "Petakan perjalanan sampah dari sumber hingga pengangkutan. Wawancarai pengelola kantin, petugas kebersihan, dan warga dengan persetujuan mereka.", evidence: "Peta aliran sampah dan ringkasan wawancara tanpa data pribadi yang tidak diperlukan.", prompt: "Mana penjelasan yang didukung bukti, mana yang masih dugaan?" },
  { title: "Pilih intervensi", phase: "Perencanaan aksi", action: "Bandingkan beberapa pilihan berdasarkan penyebab, biaya, kelayakan, dan keadilan. Sepakati satu perubahan kecil beserta indikator keberhasilannya sebelum uji coba.", evidence: "Rencana tindakan: tujuan, penanggung jawab, sumber daya, jadwal, dan indikator.", prompt: "Perubahan apa yang mungkin dilakukan dan dapat kita ukur?" },
  { title: "Siapkan uji coba", phase: "Aksi", action: "Siapkan sarana, izin, dan cara kerja. Misalnya, bersama kantin kurangi kemasan satu jenis produk; pastikan alternatifnya layak dan tidak membebani kelompok tertentu.", evidence: "Kesepakatan pelaksanaan, pembagian tugas, dan pemeriksaan kesiapan.", prompt: "Dukungan apa yang membuat perubahan ini bisa berjalan?" },
  { title: "Jalankan dan catat", phase: "Aksi", action: "Laksanakan uji coba dalam lingkup terbatas. Catat kepatuhan, kendala, perubahan tak terduga, dan masukan pengguna; dokumentasikan jika cara pelaksanaan berubah.", evidence: "Log pelaksanaan dan catatan hambatan beserta penyesuaiannya.", prompt: "Apakah intervensi benar-benar dilakukan seperti yang direncanakan?" },
  { title: "Ukur ulang", phase: "Evaluasi", action: "Ulangi pengukuran dengan satuan, lokasi, dan durasi yang sebanding. Pertimbangkan perubahan jumlah siswa, kegiatan sekolah, cuaca, serta faktor lain.", evidence: "Tabel dan grafik sebelum–sesudah, disertai penjelasan keterbatasan.", prompt: "Apa yang berubah, dan seberapa kuat bukti penjelasan kita?" },
  { title: "Bagikan dan tindak lanjuti", phase: "Evaluasi", action: "Presentasikan hasil kepada sekolah dan pihak terkait. Jelaskan keberhasilan, kegagalan, serta ketidakpastian; sepakati apakah kegiatan dilanjutkan, diperbaiki, atau dihentikan.", evidence: "Portofolio, refleksi peserta, dan keputusan sekolah dengan penanggung jawab tindak lanjut.", prompt: "Praktik mana yang layak menjadi kebiasaan lembaga?" },
] as const;

export const subjects = [
  ["IPA", "Sifat bahan, ekosistem, serta jalur pencemaran."],
  ["Matematika", "Jumlah, berat, rasio per siswa, persentase, dan grafik."],
  ["Bahasa", "Wawancara, argumentasi, laporan, dan komunikasi publik."],
  ["IPS & sejarah", "Pelaku, layanan persampahan, penghidupan, dan perubahan kawasan."],
  ["Pendidikan Pancasila", "Tanggung jawab, keadilan, musyawarah, dan aturan bersama."],
  ["Informatika & seni", "Pengolahan data dan komunikasi visual yang jujur."],
] as const;

export const sources = [
  { title: "Blue Education Framework", publisher: "BlueLightS", href: "https://blue-lights.eu/wp-content/uploads/2026/02/BlueLightS-Blue-Education-Framework.pdf", note: "Kerangka pendidikan biru dan transformasi pembelajaran." },
  { title: "Blue Curriculum", publisher: "UNESCO–IOC", href: "https://oceanliteracy.unesco.org/projects/blue-curriculum", note: "Pengintegrasian literasi laut ke dalam kurikulum." },
  { title: "Blue School Global Network", publisher: "UNESCO–IOC", href: "https://oceanliteracy.unesco.org/projects/blue-school-global-network", note: "Pendekatan sekolah dan jejaring pembelajaran laut." },
  { title: "How to become a Blue School", publisher: "UNESCO–IOC", href: "https://oceanliteracy.unesco.org/projects/blue-school-global-network/how-to-become-a-blue-school", note: "Kriteria dan jalur partisipasi pada jejaring resmi." },
  { title: "Ocean Literacy Principles", publisher: "National Park Service", href: "https://www.nps.gov/articles/000/ocean-literacy-principles.htm", note: "Tujuh prinsip dasar literasi laut; diringkas dalam bahasa Indonesia di halaman ini." },
] as const;
