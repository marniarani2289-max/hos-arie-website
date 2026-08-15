import Link from "next/link";
import { redirect } from "next/navigation";
import { updatePassword } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/forgot-password?error=Tautan+pemulihan+tidak+valid+atau+telah+kedaluwarsa");
  }

  return (
    <main className="min-h-screen bg-[#070916] px-5 py-20 text-white">
      <section className="mx-auto max-w-lg border border-white/15 bg-[#111526] p-8 sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[.28em] text-amber-400">Learning platform</p>
        <h1 className="mt-4 text-4xl font-black">Buat kata sandi baru</h1>
        <p className="mt-4 text-slate-300">Gunakan minimal delapan karakter dan simpan kata sandi Anda dengan aman.</p>

        {error && <p className="mt-6 border border-red-400/40 bg-red-950/40 p-4 text-red-100">{error}</p>}

        <form action={updatePassword} className="mt-8 grid gap-5">
          <label className="grid gap-2 text-sm font-bold">
            Kata sandi baru
            <input className="bg-white px-4 py-3 font-normal text-slate-950" name="password" type="password" autoComplete="new-password" minLength={8} required />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Ulangi kata sandi baru
            <input className="bg-white px-4 py-3 font-normal text-slate-950" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required />
          </label>
          <button className="bg-amber-400 px-6 py-4 font-bold text-slate-950 hover:bg-amber-300">Simpan kata sandi baru</button>
        </form>

        <p className="mt-7 text-sm text-slate-300">
          Tidak meminta pemulihan? <Link href="/login" className="font-bold text-amber-400">Kembali ke halaman masuk</Link>
        </p>
      </section>
    </main>
  );
}
