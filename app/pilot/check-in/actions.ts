"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function saveWeeklyCheckin(formData: FormData) {
  const week = Number(formData.get("week"));
  const confidence = Number(formData.get("confidence"));
  const workload = String(formData.get("workload") || "");
  const allowedWorkload = ["ringan", "sesuai", "berat"];
  if (![1,2,3,4].includes(week) || ![1,2,3,4,5].includes(confidence) || !allowedWorkload.includes(workload)) {
    redirect("/pilot/check-in?error=Lengkapi+check-in+dengan+benar");
  }
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/pilot/check-in");
  const blocker = String(formData.get("blocker") || "").trim().slice(0, 3000);
  const supportRequest = String(formData.get("supportRequest") || "").trim().slice(0, 3000);
  const { error } = await supabase.from("rahi_pilot_checkins").upsert({
    user_id: user.id,
    cohort_code: "RAHI-PILOT-01",
    week_number: week,
    confidence,
    workload_status: workload,
    blocker,
    support_request: supportRequest,
    submitted_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id,cohort_code,week_number" });
  redirect(error ? `/pilot/check-in?error=${encodeURIComponent(error.message)}` : `/pilot/check-in?week=${week}&success=1`);
}
