"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRahiAdmin } from "../admin";

export async function createIntervention(formData: FormData) {
  const enrollmentId=String(formData.get("enrollmentId")||"");
  const participantId=String(formData.get("participantId")||"");
  const risk=String(formData.get("riskStatus")||"");
  const note=String(formData.get("note")||"").trim().slice(0,2000);
  if(!enrollmentId||!participantId||!["green","yellow","red"].includes(risk)||note.length<2) redirect("/raja-ali-haji/admin/pilot-01?error=invalid-intervention");
  const { admin, user }=await requireRahiAdmin(`/raja-ali-haji/admin/pilot-01/${participantId}`);
  const { data: enrollment }=await admin.from("enrollments").select("id,user_id").eq("id",enrollmentId).eq("user_id",participantId).maybeSingle();
  if(!enrollment) redirect("/raja-ali-haji/admin/pilot-01?error=enrollment-not-found");
  const { error }=await admin.from("rahi_pilot_interventions").insert({enrollment_id:enrollmentId,actor_user_id:user.id,risk_status:risk,note,action_status:"open"});
  if(error) redirect(`/raja-ali-haji/admin/pilot-01/${participantId}?error=${encodeURIComponent(error.message)}`);
  revalidatePath(`/raja-ali-haji/admin/pilot-01/${participantId}`);
  redirect(`/raja-ali-haji/admin/pilot-01/${participantId}?saved=1`);
}

export async function updateInterventionStatus(formData:FormData){
  const id=String(formData.get("id")||"");
  const participantId=String(formData.get("participantId")||"");
  const status=String(formData.get("status")||"");
  if(!id||!participantId||!["open","contacted","resolved"].includes(status)) redirect("/raja-ali-haji/admin/pilot-01?error=invalid-status");
  const { admin }=await requireRahiAdmin(`/raja-ali-haji/admin/pilot-01/${participantId}`);
  await admin.from("rahi_pilot_interventions").update({action_status:status,updated_at:new Date().toISOString()}).eq("id",id);
  revalidatePath(`/raja-ali-haji/admin/pilot-01/${participantId}`);
}
