"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { registrationCourse, examPath } from "@/lib/kuliah/registration";
export async function registerStudent(form:FormData){
  const course=registrationCourse(form.get("course")),UTS_PATH=examPath(course);
  const name=String(form.get("name")||"").trim(),email=String(form.get("email")||"").trim(),password=String(form.get("password")||"");
  if(!name||name.length>160||!email||email.length>254||password.length<8)redirect("/kuliah/daftar?course="+course+"&error=1");
  const db=await createClient();
  const {data,error}=await db.auth.signUp({email,password,options:{data:{full_name:name},emailRedirectTo:"https://www.hossibarani.com/auth/callback?next="+encodeURIComponent(UTS_PATH)}});
  if(error)redirect("/kuliah/daftar?course="+course+"&error=1");
  if(data.session)redirect(UTS_PATH);
  redirect("/kuliah/daftar?course="+course+"&success=1");
}
