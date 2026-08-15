import Link from "next/link";
import { redirect } from "next/navigation";
import { Award, BookOpen, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: enrollment } = await supabase.from("enrollments").select("id,module_progress(module_number,completed,progress_percent),certificates(certificate_number)").eq("user_id", user.id).eq("programme_code", "RAHI-01").maybeSingle();
  const progress = enrollment?.module_progress || [];
  const completed = progress.filter((item: { completed: boolean }) => item.completed).length;
  const certificate = enrollment?.certificates?.[0];
  const name = user.user_metadata?.full_name || user.email;
  return <main className="min-h-screen bg-[#f7f4ef] px-5 py-16 text-slate-950"><div className="mx-auto max-w-6xl">
    <div className="flex flex-wrap items-end justify-between gap-6 border-b border-stone-300 pb-10"><div><p className="text-xs font-bold uppercase tracking-[.28em] text-amber-700">Participant dashboard</p><h1 className="mt-4 text-4xl font-black sm:text-6xl">Selamat datang, {name}</h1></div><form action={signOut}><button className="inline-flex items-center gap-2 border border-slate-950 px-5 py-3 font-bold"><LogOut size={18}/> Keluar</button></form></div>
    <section className="mt-10 grid gap-7 lg:grid-cols-[1fr_.55fr]">
      <article className="border border-stone-300 bg-white p-8"><BookOpen className="text-amber-700"/><h2 className="mt-5 text-2xl font-black">Foundations of Raja Ali Haji&apos;s Thought</h2><p className="mt-3 text-slate-600">{completed} dari 8 modul selesai</p><div className="mt-5 h-3 overflow-hidden rounded-full bg-stone-200"><div className="h-full bg-emerald-600" style={{ width: `${completed / 8 * 100}%` }}/></div><Link href="/raja-ali-haji/programmes/pemikiran-raja-ali-haji" className="mt-7 inline-block bg-slate-950 px-6 py-4 font-bold text-white">Lanjutkan pembelajaran</Link></article>
      <article className="border border-stone-300 bg-[#111526] p-8 text-white"><Award className="text-amber-400"/><h2 className="mt-5 text-2xl font-black">Sertifikat Program 01</h2>{certificate ? <><p className="mt-3 text-emerald-300">Sertifikat telah diterbitkan.</p><Link href={`/certificates/${certificate.certificate_number}`} className="mt-7 inline-block bg-amber-400 px-6 py-4 font-bold text-slate-950">Lihat sertifikat</Link></> : <p className="mt-3 leading-7 text-slate-300">Selesaikan delapan modul dan raih nilai kuis minimal 70 pada setiap modul.</p>}</article>
    </section>
  </div></main>;
}
