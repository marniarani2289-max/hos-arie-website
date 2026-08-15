import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type Payload = { moduleNumber: number; data: Record<string, unknown> };
const words = (value: unknown) => typeof value === "string" ? value.trim().split(/\s+/).filter(Boolean).length : 0;

function normalise(item: Payload) {
  const d = item.data;
  const score = Number(item.moduleNumber === 1 ? d.quizScore : d.score) || 0;
  const requirements = item.moduleNumber === 1
    ? [d.readingDone, d.podcastDone, words(d.reflection) >= 100, words(d.essay) >= 400, score >= 70]
    : [d.readingDone, d.analysisDone, d.podcastDone, words(d.reflection) >= 100, words(d.essay) >= 500, score >= 70];
  return {
    module_number: item.moduleNumber,
    quiz_score: score,
    completed: requirements.every(Boolean),
    progress_percent: Math.round(requirements.filter(Boolean).length / requirements.length * 100),
  };
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ synced: false }, { status: 401 });
  const body = await request.json() as { modules?: Payload[] };
  const modules = (body.modules || []).filter(m => Number.isInteger(m.moduleNumber) && m.moduleNumber >= 1 && m.moduleNumber <= 8);
  const { data: enrollment, error } = await supabase.from("enrollments").upsert({ user_id: user.id, programme_code: "RAHI-01" }, { onConflict: "user_id,programme_code" }).select("id").single();
  if (error || !enrollment) return NextResponse.json({ error: error?.message }, { status: 400 });
  if (modules.length) {
    const rows = modules.map(normalise).map(row => ({ ...row, enrollment_id: enrollment.id, updated_at: new Date().toISOString() }));
    const { error: progressError } = await supabase.from("module_progress").upsert(rows, { onConflict: "enrollment_id,module_number" });
    if (progressError) return NextResponse.json({ error: progressError.message }, { status: 400 });
  }
  await supabase.rpc("issue_certificate_if_eligible", { target_enrollment: enrollment.id });
  return NextResponse.json({ synced: true });
}
