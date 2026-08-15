import Link from "next/link";
import { requestPasswordReset } from "@/app/auth/actions";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const { error, success } = await searchParams;

  return (
    <main className="min-h-screen bg-[#070916] px-5 py-20 text-white">
      <section className="mx-auto max-w-lg border border-white/15 bg-[#111526] p-8 sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[.28em] text-amber-400">Learning platform</p>
        <h1 className="mt-4 text-4xl font-black">Lupa kata sandi</h1>
        <p className="mt-4 text-slate-300">Masukkan email akun Anda. Kami akan mengirimkan tautan untuk membuat kata sandi baru.</p>

        {success === "1" && (
          <p className="mt-6 border border-emerald-400/40 bg-emerald-950/40 p-4 text-emerald-100">
            Jika akun dengan email tersebut tersedia, tautan pemulihan telah dikirim. Periksa kotak masuk dan folder spam Anda.
          </p>
        )}
        {error && <p className="mt-6 border border-red-400/40 bg-red-950/40 p-4 text-red-100">{error}</p>}

        <form action={requestPasswordReset} className="mt-8 grid gap-5">
          <label className="grid gap-2 text-sm font-bold">
            Email
            <input className="bg-white px-4 py-3 font-normal text-slate-950" name="email" type="email" autoComplete="email" required />
          </label>
          <button className="bg-amber-400 px-6 py-4 font-bold text-slate-950 hover:bg-amber-300">Kirim tautan pemulihan</button>
        </form>

        <p className="mt-7 text-sm text-slate-300">
          Sudah ingat kata sandi? <Link href="/login" className="font-bold text-amber-400">Kembali ke halaman masuk</Link>
        </p>
      </section>
    </main>
  );
}
