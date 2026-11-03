import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DOSEN_PATH } from "./politik-uts";
export async function utsLecturer(dosenPath=DOSEN_PATH){
  const db=await createClient();
  const {data:{user}}=await db.auth.getUser();
  if(!user)redirect("/login?next="+encodeURIComponent(dosenPath));
  const {data,error}=await db.from("kuliah_politik_staff").select("user_id").eq("user_id",user.id).maybeSingle();
  return {db,allowed:!error&&!!data};
}
