import {redirect} from "next/navigation";
import {createClient} from "@/lib/supabase/server";
import {cohortCode,workspacePath} from "./cohort";
export async function session() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(workspacePath)}`);
  return { supabase, user };
}
export async function staffSession(){
 const context=await session();const {data,error}=await context.supabase.from("lexnusa_cohort_staff").select("user_id").eq("cohort_code",cohortCode).eq("user_id",context.user.id).maybeSingle();
 if(error||!data) redirect("/lexnusa/cohort/workspace");return context;
}
