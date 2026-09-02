import { certificateEligible, completedModules } from "./pilot-metrics";
import type { loadPilotData } from "./pilot-data";

export function reportSummary(data:Awaited<ReturnType<typeof loadPilotData>>){
  const enrollmentMap=new Map(data.enrollments.map(x=>[x.user_id,x]));
  const countAssessment=(type:string)=>new Set(data.assessments.filter(x=>x.assessment_type===type).map(x=>x.user_id)).size;
  const changes=data.profiles.map(p=>{const b=data.assessments.find(x=>x.user_id===p.id&&x.assessment_type==="baseline")?.total_score;const e=data.assessments.find(x=>x.user_id===p.id&&x.assessment_type==="endline")?.total_score;return typeof b==="number"&&typeof e==="number"?e-b:null;}).filter((x):x is number=>x!==null);
  const categories=new Map<string,number>();for(const p of data.profiles)categories.set(p.participant_category||"belum diisi",(categories.get(p.participant_category||"belum diisi")||0)+1);
  return {participants:data.profiles.length,baseline:countAssessment("baseline"),endline:countAssessment("endline"),evaluation:countAssessment("evaluation"),completed:data.profiles.filter(p=>completedModules(enrollmentMap.get(p.id))>=8).length,eligible:data.profiles.filter(p=>certificateEligible(enrollmentMap.get(p.id))).length,certificates:data.certificates.length,averageChange:changes.length?changes.reduce((a,b)=>a+b,0)/changes.length:null,checkins:data.checkins.length,messagesSent:data.messages.filter(x=>x.delivery_status==="sent").length,interventions:data.interventions.length,resolved:data.interventions.filter(x=>x.action_status==="resolved").length,categorySummary:[...categories].map(([k,v])=>`${k}: ${v}`).join(", ")};
}
