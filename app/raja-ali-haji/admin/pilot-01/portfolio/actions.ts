"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRahiAdmin } from "../../admin";

const path="/raja-ali-haji/admin/pilot-01/portfolio";
const limits=[20,20,15,20,15,10] as const;

export async function reviewPortfolio(formData:FormData){
  const projectId=String(formData.get("projectId")||"");
  const versionId=String(formData.get("versionId")||"");
  const participantId=String(formData.get("participantId")||"");
  const decision=String(formData.get("decision")||"");
  const notes=String(formData.get("notes")||"").trim().slice(0,6000);
  const showcase=formData.get("showcaseApproved")==="on";
  const scores=limits.map((max,i)=>Math.max(0,Math.min(max,Number(formData.get(`score${i+1}`)||0))));
  const total=scores.reduce((a,b)=>a+b,0);
  if(!projectId||!versionId||!participantId||!["revision_requested","verified"].includes(decision)) redirect(`${path}?error=invalid-review`);
  if(decision==="verified"&&total<60) redirect(`${path}?error=verified-score-must-be-60-or-higher`);
  const {admin,user}=await requireRahiAdmin(path);
  const {data:project}=await admin.from("rahi_portfolio_projects").select("id,user_id,visibility,status").eq("id",projectId).eq("user_id",participantId).maybeSingle();
  if(!project) redirect(`${path}?error=project-not-found`);
  const {data:latest}=await admin.from("rahi_portfolio_versions").select("id,version_number").eq("project_id",projectId).order("version_number",{ascending:false}).limit(1).maybeSingle();
  if(!latest||latest.id!==versionId) redirect(`${path}?error=review-latest-version-only`);
  const rubric_scores={concept:scores[0],analysis:scores[1],evidence:scores[2],application:scores[3],communication:scores[4],originality:scores[5]};
  const {error:reviewError}=await admin.from("rahi_portfolio_reviews").insert({project_id:projectId,version_id:versionId,reviewer_user_id:user.id,rubric_scores,total_score:total,decision,reviewer_notes:notes});
  if(reviewError) redirect(`${path}?error=${encodeURIComponent(reviewError.message)}`);
  const verified=decision==="verified";
  const {error:updateError}=await admin.from("rahi_portfolio_projects").update({status:decision,verified_at:verified?new Date().toISOString():null,showcase_approved:verified&&showcase&&project.visibility==="public",updated_at:new Date().toISOString()}).eq("id",projectId);
  if(updateError) redirect(`${path}?error=${encodeURIComponent(updateError.message)}`);
  revalidatePath(path);revalidatePath(`/raja-ali-haji/admin/pilot-01/${participantId}`);revalidatePath("/raja-ali-haji/pilot-cohort/showcase");revalidatePath("/dashboard");
  redirect(`${path}?saved=review`);
}
