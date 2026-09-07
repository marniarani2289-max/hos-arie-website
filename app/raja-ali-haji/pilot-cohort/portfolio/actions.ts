"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { portfolioTracks } from "../outcome-portfolio";

const basePath = "/raja-ali-haji/pilot-cohort/portfolio";

async function requireParticipant() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(basePath)}`);
  const { data: enrollment } = await supabase.from("enrollments").select("id,user_id").eq("user_id", user.id).eq("programme_code", "RAHI-01").maybeSingle();
  if (!enrollment) redirect("/dashboard?error=rahi-enrollment-required");
  return { supabase, user, enrollment };
}

export async function savePortfolioProject(formData: FormData) {
  const { supabase, user, enrollment } = await requireParticipant();
  const projectId = String(formData.get("projectId") || "");
  const track = String(formData.get("track") || "");
  const title = String(formData.get("title") || "").trim().slice(0, 180);
  const problemStatement = String(formData.get("problemStatement") || "").trim().slice(0, 4000);
  const visibility = String(formData.get("visibility") || "private");
  if (!portfolioTracks.includes(track as (typeof portfolioTracks)[number]) || title.length < 3 || !["private", "unlisted", "public"].includes(visibility)) {
    redirect(`${basePath}?error=invalid-project`);
  }
  const payload = { enrollment_id: enrollment.id, user_id: user.id, cohort_code: "RAHI-PILOT-01", track, title, problem_statement: problemStatement, visibility, updated_at: new Date().toISOString() };
  const result = projectId
    ? await supabase.from("rahi_portfolio_projects").update(payload).eq("id", projectId).eq("user_id", user.id)
    : await supabase.from("rahi_portfolio_projects").insert(payload);
  if (result.error) redirect(`${basePath}?error=${encodeURIComponent(result.error.message)}`);
  revalidatePath(basePath);
  redirect(`${basePath}?saved=project`);
}

export async function submitPortfolioVersion(formData: FormData) {
  const { supabase } = await requireParticipant();
  const projectId = String(formData.get("projectId") || "");
  const artifactUrl = String(formData.get("artifactUrl") || "").trim().slice(0, 2000);
  const narrative = String(formData.get("narrative") || "").trim().slice(0, 20000);
  if (!projectId || narrative.length < 20) redirect(`${basePath}?error=submission-needs-narrative`);
  const evidenceRaw = String(formData.get("evidence") || "").trim();
  const evidence = evidenceRaw ? evidenceRaw.split("\n").map((item) => item.trim()).filter(Boolean).slice(0, 30) : [];
  const { error } = await supabase.rpc("submit_rahi_portfolio_version", { target_project: projectId, artifact: artifactUrl, narrative_text: narrative, evidence_items: evidence });
  if (error) redirect(`${basePath}?error=${encodeURIComponent(error.message)}`);
  revalidatePath(basePath);
  revalidatePath("/dashboard");
  redirect(`${basePath}?saved=submission`);
}
