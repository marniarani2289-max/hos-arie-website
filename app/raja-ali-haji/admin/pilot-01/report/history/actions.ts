"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRahiAdmin } from "../../../admin";
import { loadPilotData } from "@/lib/rahi/pilot-data";
import { reportSummary } from "@/lib/rahi/report-summary";

export async function generateReportSnapshot(formData:FormData){const week=Math.min(5,Math.max(1,Number(formData.get("week"))||1)),type=week===5?"final":"weekly";const {admin,user}=await requireRahiAdmin("/raja-ali-haji/admin/pilot-01/report/history");const metrics=reportSummary(await loadPilotData(admin));const title=type==="final"?"Laporan Akhir Pilot Cohort 1":`Laporan Mingguan Pilot - Minggu ${week}`;const narrative=type==="final"?`Pilot ditutup dengan ${metrics.completed} dari ${metrics.participants} peserta menyelesaikan delapan modul dan ${metrics.eligible} memenuhi syarat sertifikat.`:`Snapshot Minggu ${week}: ${metrics.completed} peserta menyelesaikan delapan modul, ${metrics.checkins} check-in, dan ${metrics.interventions} intervensi tercatat.`;const {error}=await admin.from("rahi_report_snapshots").upsert({cohort_code:"RAHI-PILOT-01",report_type:type,week_number:week,title,metrics,narrative,generated_by:user.id,generated_at:new Date().toISOString()},{onConflict:"cohort_code,report_type,week_number"});if(error)redirect(`/raja-ali-haji/admin/pilot-01/report/history?error=${encodeURIComponent(error.message)}`);revalidatePath("/raja-ali-haji/admin/pilot-01/report/history");redirect("/raja-ali-haji/admin/pilot-01/report/history?saved=1");}
