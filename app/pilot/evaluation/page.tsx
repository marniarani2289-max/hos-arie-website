import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AssessmentForm from "../AssessmentForm";
import { evaluationItems } from "../data";

export default async function EvaluationPage({ searchParams }: { searchParams: Promise<{ error?: string; success?: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/pilot/evaluation");
  const { data } = await supabase.from("rahi_pilot_assessments").select("answers").eq("user_id", user.id).eq("cohort_code", "RAHI-PILOT-01").eq("assessment_type", "evaluation").maybeSingle();
  const params = await searchParams;
  return <AssessmentForm type="evaluation" title="Evaluasi Program" introduction="Berikan penilaian jujur agar Raja Ali Haji Institute dapat memperbaiki isi, pengalaman belajar, dan pendampingan cohort berikutnya." items={evaluationItems} openQuestions={["Apa bagian terbaik dari program?","Apa satu hal yang paling perlu diperbaiki?","Program lanjutan apa yang Anda butuhkan?"]} savedAnswers={data?.answers as {ratings?:number[]} | null} error={params.error} success={params.success === "1"}/>;
}

