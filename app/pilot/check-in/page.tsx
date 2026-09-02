import { redirect } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { saveWeeklyCheckin } from "./actions";

type Checkin = { week_number:number; confidence:number; workload_status:string; blocker:string; support_request:string };

export default async function CheckinPage({ searchParams }:{ searchParams:Promise<{week?:string;success?:string;error?:string}> }) {
  const query = await searchParams;
  const selected = Math.min(4, Math.max(1, Number(query.week) || 1));
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/pilot/check-in");
  const { data } = await supabase.from("rahi_pilot_checkins").select("week_number,confidence,workload_status,blocker,support_request").eq("user_id",user.id).eq("cohort_code","RAHI-PILOT-01").order("week_number");
  const rows=(data||[]) as Checkin[];
  const saved=rows.find(x=>x.week_number===selected);
  return <main className="min-h-screen bg-[#f7f4ef] px-5 py-14 text-slate-950 sm:px-8"><div className="mx-auto max-w-4xl">
    <a href="/dashboard" className="font-bold text-amber-800">← Kembali ke dashboard</a>
    <p className="mt-10 text-xs font-bold uppercase tracking-[.25em] text-amber-700">Pendampingan Pilot Cohort 1</p>
    <h1 className="mt-4 text-4xl font-black sm:text-6xl">Check-in mingguan</h1>
    <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Sampaikan kondisi belajar secara singkat. Jawaban digunakan fasilitator untuk menentukan dukungan yang tepat.</p>
    <nav className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">{[1,2,3,4].map(week=><a key={week} href={`/pilot/check-in?week=${week}`} className={`rounded-xl border p-4 font-black ${selected===week?"border-slate-950 bg-slate-950 text-white":"border-stone-300 bg-white"}`}>Minggu {week}{rows.some(x=>x.week_number===week)&&<CheckCircle2 className="ml-2 inline" size={17}/>}</a>)}</nav>
    {query.success&&<p className="mt-6 border border-emerald-300 bg-emerald-50 p-4 font-bold text-emerald-800">Check-in Minggu {selected} tersimpan.</p>}
    {query.error&&<p className="mt-6 border border-red-300 bg-red-50 p-4 font-bold text-red-800">{query.error}</p>}
    <form action={saveWeeklyCheckin} className="mt-8 space-y-7 rounded-2xl border border-stone-300 bg-white p-6 sm:p-9">
      <input type="hidden" name="week" value={selected}/>
      <fieldset><legend className="text-xl font-black">Seberapa yakin Anda dapat mencapai target minggu ini?</legend><div className="mt-4 flex gap-3">{[1,2,3,4,5].map(n=><label key={n} className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-stone-300 has-[:checked]:border-amber-700 has-[:checked]:bg-amber-100"><input className="sr-only" type="radio" name="confidence" value={n} required defaultChecked={saved?.confidence===n}/><b>{n}</b></label>)}</div><p className="mt-2 text-sm text-slate-500">1 = sangat tidak yakin · 5 = sangat yakin</p></fieldset>
      <label className="block text-lg font-black">Beban belajar minggu ini<select name="workload" required defaultValue={saved?.workload_status||""} className="mt-3 w-full border border-stone-300 bg-white p-4 font-normal"><option value="" disabled>Pilih kondisi</option><option value="ringan">Terlalu ringan</option><option value="sesuai">Sesuai</option><option value="berat">Terlalu berat</option></select></label>
      <label className="block text-lg font-black">Kendala utama<textarea name="blocker" rows={4} defaultValue={saved?.blocker||""} className="mt-3 w-full border border-stone-300 p-4 font-normal" placeholder="Tuliskan kendala waktu, materi, teknologi, atau hal lain."/></label>
      <label className="block text-lg font-black">Dukungan yang dibutuhkan<textarea name="supportRequest" rows={4} defaultValue={saved?.support_request||""} className="mt-3 w-full border border-stone-300 p-4 font-normal" placeholder="Contoh: penjelasan materi, pengingat, atau diskusi singkat."/></label>
      <button className="w-full rounded-xl bg-slate-950 px-6 py-4 text-lg font-black text-white hover:bg-amber-700">Simpan check-in Minggu {selected}</button>
    </form>
  </div></main>;
}
