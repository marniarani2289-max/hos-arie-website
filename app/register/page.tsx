import Link from "next/link";
import { signUp } from "@/app/auth/actions";

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ error?: string; success?: string }> }) {
  const message = await searchParams;
  return <main className="min-h-screen bg-[#f7f4ef] px-5 py-20 text-slate-950">
    <section className="mx-auto max-w-xl border border-stone-300 bg-white p-8 shadow-sm sm:p-12">
      <p className="text-xs font-bold uppercase tracking-[.28em] text-amber-700">Raja Ali Haji Institute · Pilot Cohort 1</p>
      <h1 className="mt-4 text-4xl font-black">Daftar sebagai peserta pilot</h1>
      <p className="mt-4 leading-7 text-slate-600">Program gratis selama empat minggu, 5 Oktober–1 November 2026. Buat akun untuk mengikuti pendampingan, menyimpan progres, dan memperoleh sertifikat setelah memenuhi persyaratan.</p>
      <div className="mt-6 grid grid-cols-2 gap-3 border-y border-stone-200 py-5 text-sm"><div><p className="font-bold">Kuota</p><p className="mt-1 text-slate-600">20–30 peserta</p></div><div><p className="font-bold">Ritme belajar</p><p className="mt-1 text-slate-600">2 modul per minggu</p></div></div>
      {message.error && <p className="mt-6 border border-red-200 bg-red-50 p-4 text-red-800">{message.error}</p>}
      {message.success && <p className="mt-6 border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">Pendaftaran berhasil. Periksa email Anda untuk verifikasi.</p>}
      <form action={signUp} className="mt-8 grid gap-5">
        <Field name="fullName" label="Nama lengkap (untuk sertifikat)" />
        <Field name="institution" label="Institusi/organisasi" required={false} />
        <label className="grid gap-2 text-sm font-bold">Latar belakang peserta<select className="border border-stone-300 bg-white px-4 py-3 font-normal outline-none focus:border-amber-700" name="participantCategory" required defaultValue=""><option value="" disabled>Pilih kategori</option><option value="dosen">Dosen</option><option value="mahasiswa">Mahasiswa</option><option value="asn">ASN</option><option value="komunitas">Komunitas</option><option value="lainnya">Lainnya</option></select></label>
        <input type="hidden" name="pilotCohort" value="RAHI-PILOT-01" />
        <Field name="email" label="Email" type="email" />
        <Field name="password" label="Kata sandi (minimal 8 karakter)" type="password" minLength={8} />
        <button className="bg-slate-950 px-6 py-4 font-bold text-white hover:bg-amber-700">Daftar Pilot Cohort 1</button>
      </form>
      <p className="mt-7 text-sm text-slate-600">Sudah punya akun? <Link className="font-bold text-amber-700" href="/login">Masuk</Link></p>
    </section>
  </main>;
}

function Field({ name, label, type = "text", required = true, minLength }: { name: string; label: string; type?: string; required?: boolean; minLength?: number }) {
  return <label className="grid gap-2 text-sm font-bold">{label}<input className="border border-stone-300 px-4 py-3 font-normal outline-none focus:border-amber-700" name={name} type={type} required={required} minLength={minLength} /></label>;
}
