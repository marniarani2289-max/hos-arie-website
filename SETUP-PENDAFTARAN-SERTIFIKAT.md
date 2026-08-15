# Instalasi sistem pendaftaran dan sertifikat

## 1. Instal paket

```powershell
cd C:\Users\User\hos-arie-website
npm install
```

## 2. Buat proyek Supabase

1. Buat proyek baru di Supabase.
2. Buka **SQL Editor**.
3. Salin seluruh isi `supabase/schema.sql`, lalu klik **Run**.
4. Buka **Authentication > URL Configuration**.
5. Isi Site URL dengan `https://www.hossibarani.com`.
6. Tambahkan Redirect URL:
   - `http://localhost:3000/auth/callback`
   - `https://www.hossibarani.com/auth/callback`

## 3. Environment lokal

Salin `.env.example` menjadi `.env.local`, lalu isi URL dan publishable/anon key dari **Supabase > Project Settings > API**.

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Anon/publishable key aman digunakan pada frontend bila RLS aktif. Jangan memakai service-role key.

## 4. Uji lokal

```powershell
npm run build
npm run dev
```

Buka `http://localhost:3000/register`, daftar, verifikasi email, lalu masuk ke `/dashboard`.

## 5. Environment Vercel

Tambahkan tiga environment variables yang sama pada Vercel, tetapi gunakan:

```env
NEXT_PUBLIC_SITE_URL=https://www.hossibarani.com
```

Setelah itu lakukan redeploy tanpa build cache.

## Cara kerja progres lama

Komponen `ProgressSync` membaca progres delapan modul yang sudah tersimpan di browser. Setelah peserta login, data itu disinkronkan ke Supabase setiap 30 detik. Sertifikat Program 01 diterbitkan otomatis ketika seluruh delapan modul lengkap dan setiap kuis bernilai minimal 70.
