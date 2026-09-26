# Asisten Pelatihan AI untuk Guru

## Alur penggunaan
1. Bagikan `/pelatihan-ai/minat` kepada guru, sekolah/madrasah, atau komunitas.
2. Formulir menyimpan kebutuhan dan persetujuan kontak ke Supabase. Pengelompokan mengikuti pilihan pendaftar: peserta individu, program sekolah, atau kemitraan komunitas. Topik dan tingkat pengalaman tetap tersimpan terpisah.
3. Buka `/control-center/pelatihan-ai` memakai akun pengelola yang terdaftar dalam `CONTROL_CENTER_ALLOWED_EMAILS`.
4. Tinjau draf, sunting, dan simpan. Draf menggunakan templat berdasarkan isian formulir, tanpa panggilan model AI atau biaya token. Draf tidak mengarang harga/jadwal, dan tidak otomatis terkirim.
5. Salin draf ke email/WhatsApp lalu ubah status setelah benar-benar menghubungi kontak. Simpan catatan dan tanggal tindak lanjut.
6. Daftar jatuh tempo mencakup tanggal hari ini dan yang terlewat (WIB). Tanggal awal dua hari kalender setelah formulir diterima.
7. Unduh berkas ICS dan impor ke kalender untuk pengingat pukul 09.00 WIB, alarm 15 menit sebelumnya. Kalender yang sudah diimpor tidak tersinkron otomatis; perubahan tanggal atau penutupan perlu diperbarui di kalender pengguna.

## Aktivasi
- Terapkan `docs/training-assistant-schema.sql` pada database website sebelum menerbitkan kode.
- Memakai variabel server yang sudah ada: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `CONTROL_CENTER_ALLOWED_EMAILS`.
- Memakai RPC pembatasan pengiriman yang sudah ada, `lexnusa_check_rate_limit`. Jika RPC gagal atau database belum siap, formulir gagal tertutup dan menampilkan pesan gagal; tidak mengklaim tersimpan.
- Tidak memerlukan n8n, layanan AI tambahan, atau akun pengiriman pesan untuk versi ini.
- Tabel tidak dapat diakses anon/authenticated lewat Data API; hanya kode server yang dapat mengakses melalui service role. Server memverifikasi hak Control Center untuk setiap pembacaan/perubahan admin dan ekspor kalender.
- Kunci UUID pada formulir mencegah penyimpanan ganda saat pengiriman yang sama diulang; pengajuan baru oleh kontak yang sama tetap dapat tercatat.
- Penyimpanan admin memakai versi untuk menolak penimpaan dari sesi lain. Mengubah status menjadi selesai/ditutup mengosongkan tanggal tindak lanjut.

## Verifikasi
`node --test tests/training-assistant.test.mjs` memeriksa validasi, pengelompokan, tanggal WIB, penghentian pengingat, dan format kalender. Workflow GitHub memeriksa TypeScript. Lakukan uji formulir hingga dashboard pada preview setelah konfigurasi database tersedia; gunakan data uji dan hapus sesudahnya.
