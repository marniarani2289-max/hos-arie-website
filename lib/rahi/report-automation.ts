import type { SupabaseClient } from "@supabase/supabase-js";
import { loadPilotData } from "./pilot-data";
import { reportSummary } from "./report-summary";

export async function createAutomaticSnapshot(admin:SupabaseClient,now=new Date()){
  const weekday=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Jakarta",weekday:"short"}).format(now);
  const final=now.getTime()>=Date.parse("2026-11-02T00:00:00+07:00");
  const starts=["2026-10-05T00:00:00+07:00","2026-10-12T00:00:00+07:00","2026-10-19T00:00:00+07:00","2026-10-26T00:00:00+07:00"];
  let week=starts.filter(x=>now.getTime()>=Date.parse(x)).length;
  if(final)week=5;
  if((!final&&weekday!=="Sun")||week<1)return null;
  const type=final?"final":"weekly";const data=await loadPilotData(admin);const metrics=reportSummary(data);
  const title=final?"Laporan Akhir Pilot Cohort 1":`Laporan Mingguan Pilot - Minggu ${week}`;
  const narrative=final?`Pilot ditutup dengan ${metrics.completed} dari ${metrics.participants} peserta menyelesaikan delapan modul dan ${metrics.eligible} peserta memenuhi syarat sertifikat.`:`Pada akhir Minggu ${week}, ${metrics.completed} dari ${metrics.participants} peserta telah menyelesaikan seluruh modul. Tercatat ${metrics.checkins} check-in dan ${metrics.interventions} intervensi pendampingan.`;
  const {data:snapshot,error}=await admin.from("rahi_report_snapshots").upsert({cohort_code:"RAHI-PILOT-01",report_type:type,week_number:week,title,metrics,narrative,generated_at:new Date().toISOString()},{onConflict:"cohort_code,report_type,week_number"}).select("id").single();
  if(error)throw error;return snapshot;
}
