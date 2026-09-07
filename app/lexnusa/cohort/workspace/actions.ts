"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { session } from "@/lib/lexnusa/cohort-access";
import { cohortCode, workspacePath, parseWork, complete } from "@/lib/lexnusa/cohort";
export async function enroll() {
  const {supabase,user} = await session();
  const {error}=await supabase.from("lexnusa_cohort_members").insert({cohort_code:cohortCode,user_id:user.id});
  if(error && error.code!=="23505") redirect(`${workspacePath}?error=enrollment`);
  revalidatePath(workspacePath);redirect(workspacePath);
}
export async function saveVersion(form:FormData) {
  const {supabase,user}=await session();const work=parseWork(form);const submitted=form.get("intent")==="submit";
  if(!work || (submitted && !complete(work))) redirect(`${workspacePath}?error=incomplete`);
  const {error}=await supabase.from("lexnusa_cohort_versions").insert({cohort_code:cohortCode,user_id:user.id,...work,submitted});
  if(error) redirect(`${workspacePath}?error=save`);
  revalidatePath(workspacePath);redirect(`${workspacePath}?saved=1`);
}
