import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AssessmentForm from "../AssessmentForm";
import { knowledgeItems } from "../data";

export default async function BaselinePage({ searchParams }: { searchParams: Promise<{ error?: string; success?: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/pilot/baseline");
  const { data } = await supabase.from("rahi_pilot_assessments").select("answers").eq("user_id", user.id).eq("cohort_code", "RAHI-PILOT-01").eq("assessment_type", "baseline").maybeSingle();
  const params = await searchParams;
  return <AssessmentForm type="baseline" title="Baseline Peserta" introduction="Diisi sebelum memulai Modul 1 untuk memetakan pengetahuan awal, kebutuhan, dan hambatan belajar peserta." items={knowledgeItems} openQuestions={["Apa yang paling ingin Anda pelajari dari program ini?","Dalam konteks apa Anda ingin menerapkan pembelajaran tersebut?","Hambatan apa yang mungkin memengaruhi partisipasi Anda selama empat minggu?"]} savedAnswers={data?.answers as {ratings?:number[]} | null} error={params.error} success={params.success === "1"}/>;
}

