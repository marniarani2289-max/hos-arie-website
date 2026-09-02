import { requireRahiAdmin } from "../../admin";

function csv(value:unknown){const text=String(value??"");return `"${text.replaceAll('"','""')}"`;}

export async function GET(){
  const {admin}=await requireRahiAdmin("/raja-ali-haji/admin/pilot-01/export");
  const [{data:profiles},{data:enrollments},{data:assessments},{data:checkins}]=await Promise.all([
    admin.from("profiles").select("id,full_name,institution,participant_category,whatsapp_number").eq("cohort_code","RAHI-PILOT-01").order("full_name"),
    admin.from("enrollments").select("user_id,module_progress(module_number,completed,quiz_score)").eq("programme_code","RAHI-01"),
    admin.from("rahi_pilot_assessments").select("user_id,assessment_type,total_score").eq("cohort_code","RAHI-PILOT-01"),
    admin.from("rahi_pilot_checkins").select("user_id,week_number").eq("cohort_code","RAHI-PILOT-01"),
  ]);
  const lines:unknown[][]=[["Nama","Institusi","Kategori","WhatsApp","Modul selesai","Kuis lulus","Baseline","Endline","Perubahan","Evaluasi","Check-in"]];
  for(const person of profiles||[]){const enrollment=(enrollments||[]).find(x=>x.user_id===person.id);const progress=(enrollment?.module_progress||[]) as {completed:boolean;quiz_score:number}[];const score=(type:string)=>(assessments||[]).find(x=>x.user_id===person.id&&x.assessment_type===type)?.total_score??"";const baseline=score("baseline"),endline=score("endline");lines.push([person.full_name,person.institution||"",person.participant_category||"",person.whatsapp_number||"",progress.filter(x=>x.completed).length,progress.filter(x=>x.quiz_score>=70).length,baseline,endline,typeof baseline==="number"&&typeof endline==="number"?endline-baseline:"",score("evaluation"),(checkins||[]).filter(x=>x.user_id===person.id).length]);}
  const body="\uFEFF"+lines.map(row=>row.map(csv).join(",")).join("\r\n");
  return new Response(body,{headers:{"content-type":"text/csv; charset=utf-8","content-disposition":"attachment; filename=rahi-pilot-cohort-1.csv","cache-control":"private, no-store"}});
}
