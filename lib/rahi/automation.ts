import { createClient } from "@supabase/supabase-js";
import { completedModules, expectedModulesAt, pilotWeekAt, type PilotEnrollment } from "./pilot-metrics";

const cohort="RAHI-PILOT-01";
const programme="RAHI-01";
const esc=(v:string)=>v.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]||c));

function serviceClient(){const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!url||!key)throw new Error("Supabase service configuration unavailable");return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});}

async function deliver(to:string,subject:string,body:string){
  const key=process.env.RESEND_API_KEY;const from=process.env.RAHI_EMAIL_FROM||process.env.LEXNUSA_LEAD_FROM_EMAIL||"Raja Ali Haji Institute <onboarding@resend.dev>";
  if(!key)return {status:"skipped" as const,id:null,error:"RESEND_API_KEY is not configured"};
  try{const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${key}`,"Content-Type":"application/json"},body:JSON.stringify({from,to:[to],subject,text:body,html:`<div style="font-family:Arial,sans-serif;line-height:1.7;color:#111827"><h2 style="color:#92400e">Raja Ali Haji Institute</h2><div style="white-space:pre-wrap">${esc(body).replace(/\n/g,"<br/>")}</div></div>`})});if(!response.ok)return {status:"failed" as const,id:null,error:(await response.text()).slice(0,1000)};const data=await response.json().catch(()=>null) as {id?:string}|null;return {status:"sent" as const,id:data?.id||null,error:null};}catch(error){return {status:"failed" as const,id:null,error:error instanceof Error?error.message:"Unknown delivery error"};}
}

export async function runPilotAutomation(now=new Date()){
  const admin=serviceClient();const week=pilotWeekAt(now);const expected=expectedModulesAt(now);
  if(week<1||now.getTime()>Date.parse("2026-11-02T23:59:59+07:00"))return {ok:true,active:false,week,sent:0,skipped:0,failed:0};
  const jakartaWeekday=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Jakarta",weekday:"short"}).format(now);
  const [{data:profiles},{data:enrollments},{data:{users}}]=await Promise.all([
    admin.from("profiles").select("id,full_name").eq("cohort_code",cohort),
    admin.from("enrollments").select("id,user_id,module_progress(module_number,completed,quiz_score)").eq("programme_code",programme),
    admin.auth.admin.listUsers({page:1,perPage:1000}),
  ]);
  const emailMap=new Map(users.map(u=>[u.id,u.email||""]));const enrollmentMap=new Map(((enrollments||[]) as PilotEnrollment[]).map(x=>[x.user_id,x]));
  let sent=0,skipped=0,failed=0;
  for(const person of profiles||[]){const email=emailMap.get(person.id);if(!email)continue;const completed=completedModules(enrollmentMap.get(person.id));const kinds:("weekly"|"behind_reminder")[]=[];if(jakartaWeekday==="Mon")kinds.push("weekly");if(completed<expected)kinds.push("behind_reminder");
    for(const kind of kinds){const {data:existing}=await admin.from("rahi_pilot_message_log").select("id").eq("user_id",person.id).eq("cohort_code",cohort).eq("week_number",week).eq("message_kind",kind).maybeSingle();if(existing){skipped++;continue;}
      const subject=kind==="weekly"?`RAHI Pilot - Target Minggu ${week}`:`Pengingat progres RAHI Pilot Minggu ${week}`;
      const body=kind==="weekly"?`Assalamu'alaikum ${person.full_name},\n\nMinggu ${week} Pilot Cohort 1 telah dimulai. Target kumulatif minggu ini adalah ${expected} dari 8 modul. Progres Anda saat ini ${completed} modul.\n\nSilakan lanjutkan pembelajaran dan isi check-in mingguan agar fasilitator dapat membantu bila ada kendala.\n\nRaja Ali Haji Institute`:`Assalamu'alaikum ${person.full_name},\n\nKami melihat progres Anda saat ini ${completed} modul, sedangkan target Minggu ${week} adalah ${expected} modul. Ini bukan teguran; kami ingin memastikan Anda mendapatkan dukungan yang diperlukan.\n\nSilakan buka dashboard, lanjutkan modul, dan isi check-in kendala. Fasilitator siap mendampingi.\n\nRaja Ali Haji Institute`;
      const {data:log,error:logError}=await admin.from("rahi_pilot_message_log").insert({user_id:person.id,cohort_code:cohort,week_number:week,message_kind:kind,recipient_email:email,expected_modules:expected,completed_modules:completed,delivery_status:"queued"}).select("id").single();if(logError||!log){failed++;continue;}
      const result=await deliver(email,subject,body);await admin.from("rahi_pilot_message_log").update({delivery_status:result.status,provider_id:result.id,error_message:result.error,sent_at:result.status==="sent"?new Date().toISOString():null}).eq("id",log.id);if(result.status==="sent")sent++;else if(result.status==="skipped")skipped++;else failed++;
    }
  }
  return {ok:true,active:true,week,expected,sent,skipped,failed};
}
