"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRahiAdmin } from "../../admin";

export async function saveCommunicationTemplate(formData:FormData){
  const key=String(formData.get("templateKey")||""),subject=String(formData.get("subject")||"").trim().slice(0,300),body=String(formData.get("body")||"").trim().slice(0,10000),channel=String(formData.get("channel")||"");
  const {admin,user}=await requireRahiAdmin("/raja-ali-haji/admin/pilot-01/templates");const {data:record}=await admin.from("rahi_communication_templates").select("allowed_variables").eq("template_key",key).maybeSingle();if(!record||subject.length<2||body.length<10||!["email","whatsapp","both"].includes(channel))redirect("/raja-ali-haji/admin/pilot-01/templates?error=Data+template+tidak+valid");
  const allowed=new Set((record.allowed_variables||[]) as string[]),used=[...`${subject}\n${body}`.matchAll(/\{\{([a-z_]+)\}\}/g)].map(x=>x[1]),unknown=used.filter(x=>!allowed.has(x));if(unknown.length)redirect(`/raja-ali-haji/admin/pilot-01/templates?error=${encodeURIComponent(`Variabel tidak diizinkan: ${unknown.join(", ")}`)}`);
  const {error}=await admin.from("rahi_communication_templates").update({subject_template:subject,body_template:body,channel,active:formData.get("active")==="on",updated_by:user.id,updated_at:new Date().toISOString()}).eq("template_key",key);if(error)redirect(`/raja-ali-haji/admin/pilot-01/templates?error=${encodeURIComponent(error.message)}`);revalidatePath("/raja-ali-haji/admin/pilot-01/templates");redirect(`/raja-ali-haji/admin/pilot-01/templates?saved=${encodeURIComponent(key)}`);
}
