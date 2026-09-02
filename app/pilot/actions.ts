"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type AssessmentType = "baseline" | "endline" | "evaluation";

const itemCount: Record<AssessmentType, number> = {
  baseline: 10,
  endline: 10,
  evaluation: 12,
};

const destinations: Record<AssessmentType, string> = {
  baseline: "/pilot/baseline",
  endline: "/pilot/endline",
  evaluation: "/pilot/evaluation",
};

export async function savePilotAssessment(formData: FormData) {
  const type = String(formData.get("assessmentType") || "") as AssessmentType;
  if (!Object.hasOwn(itemCount, type)) redirect("/dashboard?error=invalid-assessment");

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(destinations[type])}`);

  const ratings: number[] = [];
  for (let index = 1; index <= itemCount[type]; index += 1) {
    const value = Number(formData.get(`item_${index}`));
    if (!Number.isInteger(value) || value < 1 || value > 5) {
      redirect(`${destinations[type]}?error=Lengkapi+semua+pernyataan`);
    }
    ratings.push(value);
  }

  const openAnswers: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("open_") && typeof value === "string") {
      openAnswers[key] = value.trim().slice(0, 4000);
    }
  }

  const testimonial = String(formData.get("testimonial") || "").trim().slice(0, 2000);
  const consent = formData.get("testimonialConsent") === "on";
  const totalScore = ratings.reduce((sum, value) => sum + value, 0);
  const { error } = await supabase.from("rahi_pilot_assessments").upsert({
    user_id: user.id,
    cohort_code: "RAHI-PILOT-01",
    assessment_type: type,
    answers: { ratings, ...openAnswers },
    total_score: totalScore,
    testimonial: testimonial || null,
    testimonial_consent: consent,
    completed_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id,cohort_code,assessment_type" });

  redirect(error
    ? `${destinations[type]}?error=${encodeURIComponent(error.message)}`
    : `${destinations[type]}?success=1`);
}

