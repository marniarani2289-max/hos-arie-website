export const coursePath = "/lexnusa/mayantara";
export const roomPath = coursePath + "/workspace";
export const courseTitle = "Hukum Kejahatan Mayantara";
export const assessmentPlan = [
  {
    "label": "Partisipasi berbasis bukti",
    "weight": 10,
    "when": "Minggu 3, 7, 11, dan 15: empat pengamatan terencana"
  },
  {
    "label": "Kuis individu",
    "weight": 10,
    "when": "Minggu 3 dan 10 · Masing-masing 5%"
  },
  {
    "label": "T1 · Peta isu dan unsur delik",
    "weight": 15,
    "when": "Minggu 4"
  },
  {
    "label": "UTS · Memorandum pertanggungjawaban pidana",
    "weight": 25,
    "when": "Minggu 8"
  },
  {
    "label": "T2 · Register bukti dan rencana penanganan",
    "weight": 15,
    "when": "Minggu 12"
  },
  {
    "label": "UAS · Pendapat hukum dan pembelaan lisan",
    "weight": 25,
    "when": "Minggu 16 · Tertulis 80%, lisan 20%"
  }
] as const;
export const assignments = [
  {
    "case": "Kasus fiktif HKM-01: SelatTiket. Akun staf digunakan di luar jam kerja; jadwal kapal dan rekening pembayaran diubah. Tangkapan layar, catatan perubahan, dan keterangan staf saling bertentangan. Identitas pengguna akun belum terbukti.",
    "deliverable": "Tulis 500–800 kata beserta peta pihak, kronologi, dan matriks unsur–fakta–bukti–kekosongan. Bedakan dugaan akses tanpa hak, penipuan, dan penjelasan nonpidana yang masuk akal. Cantumkan sedikitnya tiga rujukan atau ketentuan primer yang relevan. Gunakan tanggal kejadian yang ditetapkan dosen.",
    "id": "issue-map",
    "questions": [
      "Apa lingkup izin yang diberikan dan perbuatan apa yang benar-benar didukung bukti?",
      "Unsur dan bentuk kesalahan apa yang harus dibuktikan untuk setiap dugaan delik?",
      "Bahan apa yang dapat membedakan penjelasan yang bersaing?"
    ],
    "suggested": "Minggu 4 · Usulan bobot 15%",
    "title": "T1 · Peta isu dan unsur delik"
  },
  {
    "case": "Kasus fiktif HKM-02: KampusLink. Data mahasiswa dari aplikasi beredar dan digunakan untuk pesan pembayaran palsu. Penyedia layanan, staf, dan pihak luar saling menyalahkan. Bahan yang tersedia hanya kontrak singkat, pesan, dan catatan akses terbatas.",
    "deliverable": "Tulis 800–1.200 kata: pertanyaan hukum, aturan yang berlaku pada tanggal kejadian, matriks pihak dan unsur, dua argumentasi yang bersaing, dan kesimpulan sementara. Cantumkan sedikitnya empat rujukan atau ketentuan primer yang relevan. Bedakan kewajiban pemrosesan data dari unsur tindak pidana.",
    "id": "privacy-memo",
    "questions": [
      "Perbuatan dan kesalahan apa yang dapat dikaitkan dengan setiap pihak berdasarkan catatan yang tersedia?",
      "Persoalan administratif, perdata, dan pidana apa yang perlu dianalisis secara terpisah?",
      "Bukti tambahan apa yang dapat mengubah kesimpulan sementara?"
    ],
    "suggested": "Minggu 8 · Usulan bobot 25%",
    "title": "UTS · Memorandum pertanggungjawaban pidana"
  },
  {
    "case": "Kasus fiktif HKM-03: KanalPesisir. Akun anonim mengancam pelaku usaha dan memublikasikan nomor telepon pribadi. Bahan yang tersedia berupa potongan tangkapan layar, salinan percakapan, dan catatan saksi yang ditulis dua hari kemudian. Kepemilikan akun dan identitas pembuat pesan belum terbukti.",
    "deliverable": "Tulis 700–1.000 kata beserta register bukti berbentuk teks: ID, uraian, sumber, waktu, pemegang, metode pengumpulan, integritas, relevansi, dan keterbatasan. Rekomendasikan langkah prosedural dan pelindungan korban tanpa otomatis menganggap pemilik akun sebagai pelaku.",
    "id": "evidence-file",
    "questions": [
      "Apa yang dapat dibuktikan setiap bahan dan konteks apa yang belum tersedia?",
      "Apakah bahan diperoleh secara sah dan bagaimana bahan tersebut dijaga?",
      "Penanganan apa yang melindungi korban sekaligus menghormati hak prosedural?"
    ],
    "suggested": "Minggu 12 · Usulan bobot 15%",
    "title": "T2 · Register bukti dan rencana penanganan"
  },
  {
    "case": "Kasus fiktif HKM-04: MaritimHub. Detail pembayaran pada portal jasa logistik berubah, salinan data pelanggan beredar, dan rekaman sintetis digunakan untuk meminta transfer. Manajemen ingin menyalahkan kontraktor sebelum pemeriksaan selesai.",
    "deliverable": "Tulis 1.200–1.800 kata yang membahas fakta dan dugaan, yurisdiksi, unsur dan kesalahan, atribusi, bukti, hak para pihak, serta rekomendasi bertahap. Cantumkan sedikitnya lima rujukan atau ketentuan primer yang relevan. Sertakan catatan revisi dan pengungkapan alat bantu; siapkan pembelaan lisan sekitar lima menit. Usulan nilai UAS: pendapat tertulis 80%, pembelaan lisan 20%.",
    "id": "final-opinion",
    "questions": [
      "Dugaan apa yang memerlukan pengujian fakta dan hukum secara terpisah?",
      "Penjelasan alternatif apa yang harus ditanggapi sebelum menentukan pertanggungjawaban?",
      "Bagaimana pemeriksaan sumber dan umpan balik mengubah kesimpulan Anda?"
    ],
    "suggested": "Minggu 16 · Usulan bobot 25%",
    "title": "UAS · Pendapat hukum pidana terpadu"
  }
] as const;
export const outcomes = [
  "CPMK-1 · Menjelaskan kategori kejahatan mayantara, asas legalitas, keberlakuan hukum menurut waktu, dan yurisdiksi.",
  "CPMK-2 · Menguji unsur delik, kesalahan, penyertaan, dan pertanggungjawaban berdasarkan fakta serta hukum yang relevan.",
  "CPMK-3 · Mengevaluasi bukti elektronik, keabsahan pengumpulan, dan hak dalam proses pidana.",
  "CPMK-4 · Menyusun argumentasi dan penanganan dengan mempertimbangkan alternatif serta hak korban dan terduga pelaku.",
  "CPMK-5 · Mempertahankan pendapat tertulis dan lisan dengan sumber terverifikasi, riwayat revisi, dan pengungkapan alat bantu."
] as const;
export const rubric = [
  {
    "guide": "Identifikasi isu utama dan bedakan fakta yang telah terbukti, dugaan, serta informasi yang belum tersedia.",
    "key": "issue_score",
    "label": "Identifikasi isu dan ketelitian fakta",
    "max": 20
  },
  {
    "guide": "Gunakan sumber primer yang dapat ditelusuri, ketentuan relevan, dan versi yang berlaku pada tanggal kejadian.",
    "key": "source_score",
    "label": "Sumber primer dan integritas kutipan",
    "max": 25
  },
  {
    "guide": "Uji setiap unsur, kesalahan, dan atribusi berdasarkan bukti; tanggapi alternatif yang masuk akal.",
    "key": "reasoning_score",
    "label": "Penerapan unsur delik dan argumentasi tandingan",
    "max": 25
  },
  {
    "guide": "Usulkan langkah yang proporsional dan beralasan dengan memperhatikan prosedur, bukti, dan pelindungan korban.",
    "key": "remedy_score",
    "label": "Rekomendasi dan hak para pihak",
    "max": 15
  },
  {
    "guide": "Sajikan struktur yang jelas, ungkapkan keterbatasan dan alat bantu, serta dokumentasikan revisi beserta alasannya.",
    "key": "integrity_score",
    "label": "Transparansi, refleksi, dan penyajian",
    "max": 15
  }
] as const;
export const sources = [
  [
    "R1 · Penjaminan Mutu Pendidikan Tinggi · Permendiktisaintek 39/2025",
    "https://peraturan.bpk.go.id/Details/333967/permendikti-saintek-no-39-tahun-2025"
  ],
  [
    "R2 · Kitab Undang-Undang Hukum Pidana · UU 1/2023",
    "https://peraturan.bpk.go.id/Details/234935/uu-no-1-tahun-2023"
  ],
  [
    "R3 · Penyesuaian Pidana · UU 1/2026",
    "https://peraturan.bpk.go.id/Details/337869/uu-no-1-tahun-2026"
  ],
  [
    "R4 · Informasi dan Transaksi Elektronik · UU 11/2008",
    "https://peraturan.bpk.go.id/Details/37589/uu-no-11-tahun-2008"
  ],
  [
    "R4 · Perubahan pertama · UU 19/2016",
    "https://peraturan.bpk.go.id/Details/37582/uu-no-19-tahun-2016"
  ],
  [
    "R4 · Perubahan kedua · UU 1/2024",
    "https://peraturan.bpk.go.id/Details/274494/uu-no-1-tahun-2024"
  ],
  [
    "R5 · Pelindungan Data Pribadi · UU 27/2022",
    "https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022"
  ],
  [
    "R6 · Kitab Undang-Undang Hukum Acara Pidana · UU 20/2025",
    "https://peraturan.bpk.go.id/Details/337302/uu-no-20-tahun-2025"
  ],
  [
    "R7 · Tindak Pidana Kekerasan Seksual · UU 12/2022",
    "https://peraturan.bpk.go.id/Details/207944/uu-no-12-tahun-2022"
  ]
] as const;
export const units = [
  {
    "activity": "Klasifikasikan tiga skenario fiktif dan diskusikan kontrak perkuliahan. Penugasan terstruktur: buat peta para pihak. Belajar mandiri: baca R2–R4.",
    "assessment": "Peta konsep diagnostik: sedikitnya tiga klasifikasi beserta alasannya.",
    "cpmk": "CPMK-1",
    "meetings": "1",
    "n": 1,
    "note": "Mulailah dari peristiwa, pelaku yang terkait, dan ketidakpastian. Kegagalan layanan digital saja tidak membuktikan tindak pidana. Dalam konteks kepulauan, pisahkan lokasi pengguna, pengelola, dan infrastruktur. Catat fakta yang tersedia sebelum menentukan klasifikasi pidana.",
    "outcome": "Membedakan kejahatan terhadap sistem, kejahatan dengan bantuan teknologi, dan sengketa nonpidana.",
    "reading": [
      1,
      2,
      3,
      4,
      5
    ],
    "title": "Orientasi dan peta kejahatan digital"
  },
  {
    "activity": "Bandingkan linimasa fiktif yang melintasi perubahan hukum. Penugasan terstruktur: susun tabel versi aturan. Belajar mandiri: baca R2–R4.",
    "assessment": "Kronologi dan tabel dasar hukum yang menjelaskan persoalan keberlakuan waktu yang belum terjawab.",
    "cpmk": "CPMK-1",
    "meetings": "2",
    "n": 2,
    "note": "Baca KUHP bersama peraturan khusus dan penyesuaian pidana tahun 2026. Jangan menganggap semua ketentuan ITE terdahulu tetap berlaku. Uraikan tanggal kejadian, versi aturan, dan persoalan peralihan sebelum menyimpulkan yurisdiksi atau pertanggungjawaban.",
    "outcome": "Mengidentifikasi tanggal kejadian, persoalan wilayah, dan versi peraturan yang berlaku.",
    "reading": [
      1,
      2,
      3,
      4,
      5
    ],
    "title": "Legalitas, waktu, dan yurisdiksi"
  },
  {
    "activity": "Lengkapi matriks unsur dan kerjakan kuis individu 1. Penugasan terstruktur: bandingkan pihak yang mungkin terlibat. Belajar mandiri: verifikasi R2–R4.",
    "assessment": "Kuis 1: usulan bobot 5% dari nilai akhir. Hubungkan setiap unsur dengan bukti atau kekosongan bukti.",
    "cpmk": "CPMK-1, 2",
    "meetings": "3",
    "n": 3,
    "note": "Uji unsur yang disyaratkan oleh delik terkait. Bedakan kesengajaan atau kealpaan jika relevan, penyertaan, dan pertanggungjawaban korporasi. Nama akun tidak membuktikan siapa penggunanya. Tandai bukti yang belum tersedia; jangan mengisi kekosongan dengan asumsi.",
    "outcome": "Memisahkan perbuatan, akibat, kesalahan, dan identitas pihak yang diduga melakukan perbuatan.",
    "reading": [
      1,
      2,
      3,
      4,
      5
    ],
    "title": "Unsur delik dan pertanggungjawaban pidana"
  },
  {
    "activity": "Diskusikan SelatTiket (T1). Penugasan terstruktur: lengkapi peta isu dan unsur. Belajar mandiri: periksa ketentuan yang relevan.",
    "assessment": "Kumpulkan T1: usulan bobot 15% dari nilai akhir; 500–800 kata.",
    "cpmk": "CPMK-2",
    "meetings": "4",
    "n": 4,
    "note": "Rekonstruksi lingkup izin dan perbuatan yang diduga terjadi. Pelanggaran kebijakan internal, akses data, dan gangguan sistem menimbulkan persoalan berbeda. Identifikasi apa yang dibuktikan catatan yang tersedia dan bahan tambahan yang diperlukan. Perkuliahan ini tidak mencakup praktik penyusupan sistem.",
    "outcome": "Menilai dugaan akses tanpa hak, intersepsi, dan gangguan secara terpisah.",
    "reading": [
      1,
      2,
      3,
      4,
      5
    ],
    "title": "Akses tanpa hak dan gangguan sistem"
  },
  {
    "activity": "Debatkan penjualan tiket antarpulau fiktif. Penugasan terstruktur: tulis dua penjelasan kasus yang bersaing. Belajar mandiri: R2–R4.",
    "assessment": "Jelaskan bukti yang diperlukan untuk setiap penjelasan.",
    "cpmk": "CPMK-2",
    "meetings": "5",
    "n": 5,
    "note": "Perlakukan pengelabuan untuk memperoleh data dan penjualan tiket palsu sebagai dugaan cara melakukan perbuatan, bukan pengganti unsur hukum. Rekonstruksi pernyataan, transfer, kerugian, dan keterkaitan dengan pihak tertentu. Uji penjelasan nonpidana yang masuk akal; kerugian pelanggan saja tidak mengidentifikasi pelaku.",
    "outcome": "Membedakan kegagalan layanan dan wanprestasi dari dugaan penipuan.",
    "reading": [
      1,
      2,
      3,
      4,
      5
    ],
    "title": "Penipuan dan pemalsuan digital"
  },
  {
    "activity": "Diskusikan KampusLink. Penugasan terstruktur: petakan peran pihak dan dugaan perbuatan. Belajar mandiri: R5 dan R3.",
    "assessment": "Matriks peran yang memisahkan perbuatan terbukti, kemungkinan kewajiban, dan dugaan yang belum terbukti.",
    "cpmk": "CPMK-2, 4",
    "meetings": "6",
    "n": 6,
    "note": "Identifikasi siapa yang memperoleh, mengungkapkan, atau menggunakan data beserta tujuannya. Bedakan pengendali, prosesor, dan pihak yang diduga melakukan tindak pidana. Terbukanya data tidak otomatis membuktikan seluruh unsur delik. Baca UU PDP bersama penyesuaian hukum pidana yang relevan.",
    "outcome": "Memisahkan persoalan administratif, perdata, dan pidana terkait data pribadi.",
    "reading": [
      2,
      6
    ],
    "title": "Data pribadi dan tanggung jawab pidana"
  },
  {
    "activity": "Diskusikan kasus konten fiktif. Penugasan terstruktur: siapkan kerangka UTS. Belajar mandiri: R2–R4 dan R7.",
    "assessment": "Bedakan kebijakan platform, etika, dan hukum pidana dalam argumentasi beralasan.",
    "cpmk": "CPMK-2, 4",
    "meetings": "7",
    "n": 7,
    "note": "Pisahkan ancaman, pemerasan, persoalan reputasi, dan kekerasan seksual berbasis elektronik. Aturan platform bukan undang-undang pidana. Periksa tanggal kejadian, konteks lengkap, dan penafsiran relevan sebelum menentukan klasifikasi hukum. Gunakan bahan fiktif tanpa penggambaran eksplisit dan hormati martabat pihak terdampak.",
    "outcome": "Menilai dugaan tindak pidana terkait konten sesuai konteks dengan menghormati hak.",
    "reading": [
      1,
      2,
      3,
      4,
      5,
      8
    ],
    "title": "Konten digital, ekspresi, dan korban"
  },
  {
    "activity": "Penilaian berkas kasus secara individu. Penugasan terstruktur: selesaikan memorandum sesuai petunjuk dosen. Belajar mandiri: siapkan dan verifikasi sumber.",
    "assessment": "Kumpulkan UTS: usulan bobot 25% dari nilai akhir; 800–1.200 kata.",
    "cpmk": "CPMK-2, 4",
    "meetings": "8",
    "n": 8,
    "note": "Gunakan kasus KampusLink untuk mengintegrasikan minggu 1–7. Hubungkan setiap pernyataan dengan sumber primer relevan dan tanggal kejadian. Jelaskan penjelasan tandingan terkuat serta bukti yang dapat mengubah kesimpulan. Nyatakan ketidakpastian secara tegas.",
    "outcome": "Menulis pendapat hukum sementara tentang unsur dan pertanggungjawaban berdasarkan catatan terbatas.",
    "reading": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "title": "UTS · Memorandum pertanggungjawaban pidana"
  },
  {
    "activity": "Tinjau paket bukti KanalPesisir. Penugasan terstruktur: buat register bukti. Belajar mandiri: R4 dan R6.",
    "assessment": "Register yang membedakan isi, asal-usul, penguasaan, dan ketidakpastian.",
    "cpmk": "CPMK-3",
    "meetings": "9",
    "n": 9,
    "note": "Pisahkan isi tangkapan layar, catatan sistem, atau percakapan dari cara memperoleh dan menjaganya. Catat sumber, waktu, pemegang, metode pengumpulan, dan keterbatasannya. Nilai hash dapat membantu melacak integritas, tetapi tidak membuktikan kebenaran isi atau keabsahan pengumpulan. Gunakan hanya bukti simulasi.",
    "outcome": "Mengevaluasi asal-usul, integritas, relevansi, dan keterbatasan bukti elektronik.",
    "reading": [
      3,
      4,
      5,
      7
    ],
    "title": "Bukti elektronik dan rantai penguasaan"
  },
  {
    "activity": "Tinjau prosedur fiktif dan kerjakan kuis individu 2. Penugasan terstruktur: audit pengumpulan bukti. Belajar mandiri: R6.",
    "assessment": "Kuis 2: usulan bobot 5% dari nilai akhir; identifikasi persoalan prosedural dan dasar hukumnya.",
    "cpmk": "CPMK-3",
    "meetings": "10",
    "n": 10,
    "note": "Pelajari langkah penyidikan, upaya paksa, penilaian bukti, pendampingan, dan jaminan prosedural menurut KUHAP yang berlaku. Bedakan petunjuk awal penyelidikan yang berguna dari bukti yang dapat diterima atau mencukupi. Jangan mengada-adakan kewenangan penyidikan atau mengabaikan ketentuan peralihan.",
    "outcome": "Mengidentifikasi persoalan kewenangan dan hak dalam pengumpulan serta penggunaan bukti.",
    "reading": [
      3,
      4,
      5,
      7
    ],
    "title": "Proses pidana dan hak pihak terkait"
  },
  {
    "activity": "Diskusikan layanan maritim fiktif. Penugasan terstruktur: petakan yurisdiksi dan kebutuhan bukti. Belajar mandiri: R2–R6.",
    "assessment": "Rekomendasi yang mengakui identitas yang belum terbukti dan batas kewenangan.",
    "cpmk": "CPMK-3, 4",
    "meetings": "11",
    "n": 11,
    "note": "Kepemilikan akun, penguasaan perangkat, dan identitas pembuat konten merupakan pernyataan faktual yang berbeda. Periksa perbuatan individu, penyertaan, dan tanggung jawab organisasi secara terpisah. Data di luar negeri menimbulkan persoalan yurisdiksi dan kerja sama resmi; jangan menganggap hak akses berlaku lintas batas.",
    "outcome": "Menguji hubungan antara akun, perangkat, individu, dan organisasi.",
    "reading": [
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "title": "Atribusi, platform, dan lintas batas"
  },
  {
    "activity": "Klinik bukti KanalPesisir. Penugasan terstruktur: selesaikan T2. Belajar mandiri: R6–R7.",
    "assessment": "Kumpulkan T2: usulan bobot 15% dari nilai akhir; 700–1.000 kata beserta register bukti berbentuk teks.",
    "cpmk": "CPMK-3, 4",
    "meetings": "12",
    "n": 12,
    "note": "Utamakan penghentian kerugian yang masih berlangsung dan pelestarian bukti tanpa mendahului kesimpulan pertanggungjawaban. Pertimbangkan pelaporan, pendampingan, dan pemulihan. Jelaskan siapa yang perlu bertindak dan dasar hukum setiap rekomendasi. Jangan memasukkan bahan sensitif ke portofolio kelas.",
    "outcome": "Merencanakan penanganan yang melindungi bukti, privasi, keselamatan, dan hak prosedural.",
    "reading": [
      6,
      7,
      8
    ],
    "title": "Pelindungan korban dan penanganan perkara"
  },
  {
    "activity": "Audit klaim fiktif ini: ‘Pemilik akun pasti pelaku; setiap kebocoran data adalah kejahatan; tangkapan layar merupakan bukti konklusif.’ Penugasan terstruktur: tulis koreksi disertai batasan. Belajar mandiri: verifikasi sumber primer.",
    "assessment": "Catatan verifikasi yang mengidentifikasi klaim tanpa dukungan. Tidak memerlukan akses atau pembelian AI.",
    "cpmk": "CPMK-4, 5",
    "meetings": "13",
    "n": 13,
    "note": "Konten sintetis menimbulkan pertanyaan tentang keaslian, atribusi, dan tanggung jawab pengguna. Verifikasi keberadaan setiap kutipan serta dukungannya terhadap pernyataan dalam yurisdiksi dan waktu yang relevan. Audit teks yang sengaja keliru dapat dilakukan tanpa layanan AI.",
    "outcome": "Mengaudit klaim hukum dan keaslian konten tanpa menjadikan AI sebagai otoritas.",
    "reading": [
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ],
    "title": "AI, rekayasa konten, dan integritas sumber"
  },
  {
    "activity": "Telaah antarmahasiswa menggunakan rubrik yang dipublikasikan. Penugasan terstruktur: susun draf pendapat UAS. Belajar mandiri: telusuri sumber primer relevan.",
    "assessment": "Draf pendapat hukum dan umpan balik terstruktur dari rekan.",
    "cpmk": "CPMK-4, 5",
    "meetings": "14",
    "n": 14,
    "note": "Untuk MaritimHub, pisahkan perubahan detail pembayaran, terbukanya data, dan rekaman sintetis. Gunakan peta pihak dan linimasa untuk menyusun analisis. Sajikan penjelasan alternatif dan penanganan yang proporsional. Tuduhan yang tersusun rapi bukan pengganti pembuktian.",
    "outcome": "Mengintegrasikan fakta, unsur, bukti, prosedur, dan rekomendasi.",
    "reading": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ],
    "title": "Klinik pendapat hukum akhir"
  },
  {
    "activity": "Latih pembelaan lisan. Penugasan terstruktur: revisi draf UAS. Belajar mandiri: siapkan jawaban.",
    "assessment": "Catatan revisi yang menghubungkan kritik, perubahan, dan alasan.",
    "cpmk": "CPMK-5",
    "meetings": "15",
    "n": 15,
    "note": "Catat umpan balik yang diterima, perubahan yang dibuat, dan alasannya. Bedakan perbaikan kutipan dari perubahan kesimpulan hukum. Bersiaplah mengakui keterbatasan bukti dan menjawab keberatan yang kuat. Ungkapkan penggunaan alat bantu eksternal secara jujur.",
    "outcome": "Menjelaskan perubahan pendapat dan mempertahankan argumentasi secara etis.",
    "reading": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ],
    "title": "Revisi dan latihan pembelaan lisan"
  },
  {
    "activity": "Kumpulkan pendapat individu dan ikuti pembelaan lisan sekitar lima menit. Penugasan terstruktur: 100 menit. Belajar mandiri: 100 menit.",
    "assessment": "UAS: usulan bobot 25% dari nilai akhir; 1.200–1.800 kata. Nilai UAS: pendapat tertulis 80%, pembelaan lisan 20%.",
    "cpmk": "CPMK-3, 4, 5",
    "meetings": "16",
    "n": 16,
    "note": "Integrasikan pembelajaran dalam pendapat hukum MaritimHub. Utamakan kesimpulan yang sudah dapat didukung dan tandai kesimpulan yang memerlukan bukti tambahan. Jelaskan pelindungan prosedural bagi semua pihak. Dosen menjadwalkan pembelaan lisan individu dalam rencana pembelajaran yang disetujui.",
    "outcome": "Mempertahankan analisis mandiri dan rekomendasi berbasis bukti.",
    "reading": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ],
    "title": "UAS · Pendapat hukum dan pembelaan lisan"
  }
] as const;
export function getAssignment(id: string) { return assignments.find(a => a.id === id); }

export function membershipLabel(status: string) { return ({pending:"Menunggu persetujuan",active:"Aktif",suspended:"Akses ditangguhkan"} as Record<string,string>)[status] ?? "Status belum diketahui"; }
export function reviewLabel(decision: string) { return ({revise:"Perlu revisi",reviewed:"Sudah ditinjau"} as Record<string,string>)[decision] ?? "Status belum diketahui"; }
