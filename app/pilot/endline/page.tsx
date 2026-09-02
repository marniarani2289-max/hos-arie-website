import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AssessmentForm from "../AssessmentForm";
import { knowledgeItems } from "../data";

export default async function EndlinePage({ searchParams }: { searchParams: Promise<{ error?: string; success?: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/pilot/endline");
  const { data } = await supabase.from("rahi_pilot_assessments").select("answers").eq("user_id", user.id).eq("cohort_code", "RAHI-PILOT-01").eq("assessment_type", "endline").maybeSingle();
  const params = await searchParams;
  return <AssessmentForm type="endline" title="Endline Peserta" introduction="Diisi setelah menyelesaikan Modul 8 untuk mengukur perubahan pemahaman dan rencana penerapan pembelajaran." items={knowledgeItems} openQuestions={["Gagasan apa yang paling mengubah cara Anda melihat diri, bahasa, masyarakat, atau kekuasaan?","Sebutkan satu tindakan konkret yang akan Anda lakukan setelah program.","Bagian program mana yang paling membantu perubahan tersebut?","Apa yang masih ingin Anda pelajari lebih lanjut?"]} savedAnswers={data?.answers as {ratings?:number[]} | null} error={params.error} success={params.success === "1"}/>;
}

