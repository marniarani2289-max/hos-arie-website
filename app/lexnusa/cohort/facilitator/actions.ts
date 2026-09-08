"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { staffSession } from "@/lib/lexnusa/cohort-access";
import { riskLevels } from "@/lib/lexnusa/document-workflow";
import { cohortCode } from "@/lib/lexnusa/cohort";
const path = "/lexnusa/cohort/facilitator";
export async function toggleEnrollment(form: FormData) {
  const { supabase } = await staffSession();
  const { error } = await supabase
    .from("lexnusa_cohorts")
    .update({ enrollment_open: form.get("open") === "true" })
    .eq("code", cohortCode);
  revalidatePath(path);
  revalidatePath("/lexnusa/cohort/workspace");
  redirect(`${path}?${error ? "error" : "saved"}=1`);
}
export async function review(form: FormData) {
  const { supabase, user } = await staffSession();
  const score = Number(form.get("score"));
  const notes = String(form.get("notes") ?? "").trim();
  const decision = String(form.get("decision"));
  if (
    !Number.isInteger(score) ||
    score < 0 ||
    score > 100 ||
    notes.length < 20 ||
    notes.length > 10000 ||
    !["verified", "revision_requested"].includes(decision)
  )
    redirect(`${path}?error=1`);
  const assessed_risk = String(form.get("assessed_risk"));
  if (!riskLevels.includes(assessed_risk as (typeof riskLevels)[number]))
    redirect(`${path}?error=1`);
  const { data: version } = await supabase
    .from("lexnusa_cohort_versions")
    .select("id,user_id")
    .eq("id", String(form.get("version")))
    .eq("cohort_code", cohortCode)
    .eq("submitted", true)
    .maybeSingle();
  if (!version || version.user_id === user.id) redirect(`${path}?error=1`);
  const { error } = await supabase
    .from("lexnusa_cohort_reviews")
    .insert({
      version_id: version.id,
      participant_id: version.user_id,
      cohort_code: cohortCode,
      reviewer_id: user.id,
      participant_score: score,
      decision,
      notes,
      assessed_risk,
      quality_gate_passed: form.get("quality_gate") === "on",
    });
  revalidatePath(path);
  revalidatePath("/lexnusa/cohort/workspace");
  redirect(`${path}?${error ? "error" : "saved"}=1`);
}
