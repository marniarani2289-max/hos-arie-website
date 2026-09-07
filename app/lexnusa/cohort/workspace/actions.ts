"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { session } from "@/lib/lexnusa/cohort-access";
import { cohortCode, workspacePath, parseWork, complete } from "@/lib/lexnusa/cohort";
export async function enroll(form:FormData) {
  const {supabase,user} = await session();
  const display_name=String(form.get("display_name")??"").trim();
  if(display_name.length<2||display_name.length>120)redirect(`${workspacePath}?error=enrollment`);
  const {error}=await supabase.from("lexnusa_cohort_members").insert({cohort_code:cohortCode,user_id:user.id,display_name});
  if(error && error.code!=="23505") redirect(`${workspacePath}?error=enrollment`);
  revalidatePath(workspacePath);redirect(workspacePath);
}
export async function saveVersion(_previous:{message:string},form:FormData) {
  const {supabase,user}=await session();const work=parseWork(form);const submitted=form.get("intent")==="submit";
  if(!work || (submitted && !complete(work))) return {message:"Isi kelima tahap minimal 20 karakter untuk mengirim tugas. Maksimal 20.000 karakter per tahap."};
  const {error}=await supabase.from("lexnusa_cohort_versions").insert({cohort_code:cohortCode,user_id:user.id,...work,submitted});
  if(error) return {message:"Penyimpanan belum berhasil. Isi kolom tetap tersedia; coba lagi."};
  revalidatePath(workspacePath);return {message:submitted?"Tugas tersimpan dan dikirim ke fasilitator.":"Versi baru tersimpan. Versi sebelumnya tetap tersedia."};
}
