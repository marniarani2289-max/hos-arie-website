import type { SupabaseClient } from "@supabase/supabase-js";
import type { PilotAssessment, PilotCheckin, PilotEnrollment } from "./pilot-metrics";

export async function loadPilotData(admin:SupabaseClient){
  const [{data:profiles},{data:enrollments},{data:assessments},{data:checkins},{data:certificates},{data:messages},{data:interventions}]=await Promise.all([
    admin.from("profiles").select("id,full_name,institution,participant_category,whatsapp_number").eq("cohort_code","RAHI-PILOT-01").order("full_name"),
    admin.from("enrollments").select("id,user_id,module_progress(module_number,completed,quiz_score)").eq("programme_code","RAHI-01"),
    admin.from("rahi_pilot_assessments").select("user_id,assessment_type,total_score").eq("cohort_code","RAHI-PILOT-01"),
    admin.from("rahi_pilot_checkins").select("user_id,week_number,confidence,workload_status").eq("cohort_code","RAHI-PILOT-01"),
    admin.from("certificates").select("id,enrollment_id,certificate_number,issued_at"),
    admin.from("rahi_pilot_message_log").select("id,user_id,message_kind,delivery_status,week_number,created_at").eq("cohort_code","RAHI-PILOT-01"),
    admin.from("rahi_pilot_interventions").select("id,enrollment_id,action_status,risk_status,created_at"),
  ]);
  return {profiles:profiles||[],enrollments:(enrollments||[]) as PilotEnrollment[],assessments:(assessments||[]) as PilotAssessment[],checkins:(checkins||[]) as PilotCheckin[],certificates:certificates||[],messages:messages||[],interventions:interventions||[]};
}
