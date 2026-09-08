"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { classroomSession, lecturerSession } from "@/lib/lexnusa/mayantara/access";
import { getAssignment, rubric, roomPath } from "@/lib/lexnusa/mayantara/course";
import { createClient } from "@/lib/supabase/server";
export type FormState = {ok:boolean;message:string;versionId?:string|null};
const field=(f:FormData,k:string)=>String(f.get(k)??"").trim();
export async function requestSeat(_previous:FormState,form:FormData):Promise<FormState>{
 const {db,user}=await classroomSession();
 const display_name=field(form,"display_name"),student_number=field(form,"student_number");
 if(display_name.length<2||display_name.length>120||student_number.length<2||student_number.length>50) return {ok:false,message:"Enter your full name and student number."};
 const {error}=await db.from("lexnusa_mayantara_members").insert({user_id:user.id,display_name,student_number});
 if(error)return {ok:false,message:"The request could not be saved. Refresh to check whether you already have a seat request."};
 revalidatePath(roomPath);return {ok:true,message:"Request saved. Your lecturer must confirm your class membership."};
}
export async function setMemberStatus(_previous:FormState,form:FormData):Promise<FormState>{
 const {db}=await lecturerSession();
 const status=field(form,"status");
 if(!["active","suspended"].includes(status))return {ok:false,message:"Invalid status."};
 const {error}=await db.from("lexnusa_mayantara_members").update({status}).eq("user_id",field(form,"student_id"));
 if(error)return {ok:false,message:"Membership could not be updated."};
 revalidatePath(roomPath);revalidatePath("/lexnusa/mayantara/lecturer");
 return {ok:true,message:status==="active"?"Student admitted.":"Submission access suspended."};
}
export async function saveWork(previous:FormState,form:FormData):Promise<FormState>{
 const {db,user}=await classroomSession();
 const assignment=field(form,"assignment"),answer=field(form,"answer"),sources=field(form,"sources"),reflection=field(form,"reflection");
 const intent=field(form,"intent"),submitted=intent==="submit",attested=field(form,"attested")==="on";
 const parent_id=field(form,"parent_id")||null;
 const fail=(message:string)=>({ok:false,message,versionId:previous.versionId});
 if(!getAssignment(assignment)||!["save","submit"].includes(intent)||answer.length>30000||sources.length>12000||reflection.length>8000)return fail("Check the assignment and field lengths.");
 if(submitted&&(!attested||answer.length<200||sources.length<40||reflection.length<40))return fail("Submission requires at least 200 characters of analysis, 40 characters of sources, 40 characters of reflection, and your integrity declaration.");
 const {data,error}=await db.from("lexnusa_mayantara_work").insert({user_id:user.id,assignment,answer,sources,reflection,submitted,attested,parent_id,version_number:1}).select("id").single();
 if(error||!data)return fail(error?.message.includes("stale_version")?"A newer version exists. Copy your changes before refreshing and compare with the latest version.":"Work could not be saved. Your text remains here; check membership and try again.");
 revalidatePath(roomPath);revalidatePath("/lexnusa/mayantara/lecturer");
 return {ok:true,message:submitted?"Version submitted for lecturer review.":"Draft version saved.",versionId:data.id};
}
export async function reviewWork(_previous:FormState,form:FormData):Promise<FormState>{
 const {db,user}=await lecturerSession();
 const scores=Object.fromEntries(rubric.map(r=>[r.key,field(form,r.key)===""?NaN:Number(field(form,r.key))]));
 const feedback=field(form,"feedback"),decision=field(form,"decision");
 if(rubric.some(r=>!Number.isInteger(scores[r.key])||scores[r.key]<0||scores[r.key]>r.max)||feedback.length<40||feedback.length>10000||!["reviewed","revise"].includes(decision))return {ok:false,message:"Enter each rubric score and at least 40 characters of feedback."};
 const {data:work,error:loadError}=await db.from("lexnusa_mayantara_work").select("id,user_id,assignment").eq("id",field(form,"work_id")).maybeSingle();
 if(loadError||!work||work.user_id===user.id)return {ok:false,message:"This work cannot be reviewed by this account."};
 const {error}=await db.from("lexnusa_mayantara_reviews").insert({work_id:work.id,student_id:work.user_id,assignment:work.assignment,reviewer_id:user.id,...scores,feedback,decision});
 if(error)return {ok:false,message:"Review not saved. Refresh: only the latest submitted version can receive one review."};
 revalidatePath(roomPath);revalidatePath("/lexnusa/mayantara/lecturer");
 return {ok:true,message:"Review recorded against this version."};
}
export async function registerAccount(form:FormData){
 const name=field(form,"name"),email=field(form,"email"),password=String(form.get("password")??"");
 if(name.length<2||name.length>120||email.length>254||password.length<8)redirect("/lexnusa/mayantara/register?error=1");
 const db=await createClient();
 const {data,error}=await db.auth.signUp({email,password,options:{data:{full_name:name},emailRedirectTo:`${process.env.NEXT_PUBLIC_SITE_URL||"https://www.hossibarani.com"}/auth/callback?next=${encodeURIComponent(roomPath)}`}});
 if(error)redirect("/lexnusa/mayantara/register?error=1");
 if(data.session)redirect(roomPath);
 redirect("/lexnusa/mayantara/register?success=1");
}
