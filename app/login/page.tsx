import Link from "next/link";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; next?: string; success?: string }> }) {
  const { error, next, success } = await searchParams;
  return <main className="min-h-screen bg-[#070916] px-5 py-20 text-white"><section className="mx-auto max-w-lg border border-white/15 bg-[#111526] p-8 sm:p-12">
    <p className="text-xs font-bold uppercase tracking-[.28em] text-amber-400">Learning platform</p><h1 className="mt-4 text-4xl font-black">Masuk</h1>
    {success === "password-updated" && <p className="mt-6 border border-emerald-400/40 bg-emerald-950/40 p-4 text-emerald-100">Kata sandi berhasil diperbarui. Silakan masuk dengan kata sandi baru.</p>}
    {error && <p className="mt-6 border border-red-400/40 bg-red-950/40 p-4 text-red-100">{error}</p>}
    <form action="/auth/sign-in" method="post" className="mt-8 grid gap-5">
      <input type="hidden" name="next" value={next || "/dashboard"} />
      <label className="grid gap-2 text-sm font-bold">Email<input className="bg-white px-4 py-3 font-normal text-slate-950" name="email" type="email" required /></label>
      <label className="grid gap-2 text-sm font-bold">Kata sandi<input className="bg-white px-4 py-3 font-normal text-slate-950" name="password" type="password" required /></label>
      <button className="bg-amber-400 px-6 py-4 font-bold text-slate-950 hover:bg-amber-300">Masuk ke dashboard</button>
    </form>
    <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
      <p>Belum punya akun? <Link href="/register" className="font-bold text-amber-400">Daftar</Link></p>
      <Link href="/forgot-password" className="font-bold text-amber-400">Lupa kata sandi?</Link>
    </div>
  </section></main>;
}
