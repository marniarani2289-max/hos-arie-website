"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireControlCenterAccess } from "@/lib/ai-control-center/access";
import { pilotService } from "@/lib/blue-education/pilot-server";
import { statusOptions, uuidPattern } from "@/lib/blue-education/pilot";
export async function updatePilot(form:FormData) {
 await requireControlCenterAccess();
 const id=String(form.get("id")||"");
 const status=String(form.get("status")||"");
 const notes=String(form.get("notes")||"").trim();
 const updatedAt=String(form.get("updated_at")||"");
 if(!uuidPattern.test(id)||!statusOptions.some(([v])=>v===status)||notes.length>5000||!updatedAt) redirect("/control-center/blue-education?result=invalid");
 let outcome="saved";
 try {
  const {data,error}=await pilotService().from("blue_education_pilot_registrations").update({status,notes,updated_at:new Date().toISOString()}).eq("id",id).eq("updated_at",updatedAt).select("id").maybeSingle();
  if(error)outcome="failed";else if(!data)outcome="conflict";
 }catch{outcome="failed";}
 revalidatePath("/control-center/blue-education");
 redirect("/control-center/blue-education?result="+outcome);
}
