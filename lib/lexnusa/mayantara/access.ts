import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { roomPath } from "./course";
export async function classroomSession(next = roomPath) {
 const db = await createClient();
 const {data:{user}} = await db.auth.getUser();
 if (!user) redirect("/login?next="+encodeURIComponent(next));
 return {db,user};
}
export async function lecturerSession() {
 const context = await classroomSession("/lexnusa/mayantara/lecturer");
 const {data,error} = await context.db.from("lexnusa_mayantara_staff").select("user_id").eq("user_id",context.user.id).maybeSingle();
 if(error || !data) redirect(roomPath);
 return context;
}
