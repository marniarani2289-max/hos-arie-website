import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { gateway } from "@ai-sdk/gateway";
import { decisionUser, decisionService } from "@/lib/ai-control-center/decision-server";
import { decisionSystemPrompt } from "@/lib/ai-control-center/decisions";
export const runtime = "nodejs";
export const maxDuration = 60;
const fail = (error: string, status: number) => NextResponse.json({ error }, { status });
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (req.headers.get("origin") !== req.nextUrl.origin) return fail("Permintaan tidak diizinkan.", 403);
  const user = await decisionUser();
  if (!user) return fail("Akses administrator diperlukan.", 403);
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return fail("Keputusan tidak ditemukan.", 404);
  let body;
  try { const raw = await req.text(); if (raw.length > 1000) return fail("Permintaan terlalu panjang.", 413); body = JSON.parse(raw); }
  catch { return fail("Data tidak valid.", 400); }
  if (body?.consent !== true) return fail("Konfirmasi penggunaan data sebelum analisis.", 400);
  // Reuse the project's configured model. Do not silently choose a paid model.
  const model = process.env.CONTROL_CENTER_AI_MODEL || process.env.LEXNUSA_AI_MODEL;
  if (!model) return fail("Model AI belum dikonfigurasi. Draf tetap tersimpan.", 503);
  let db;
  try { db = decisionService(); } catch { return fail("Penyimpanan belum tersedia.", 503); }
  const { data: generation, error: reserveError } = await db.rpc("control_center_reserve_analysis", { p_id: id, p_owner: user.id, p_model: model });
  if (reserveError || !generation) return fail(reserveError?.message.includes("not_found") ? "Keputusan tidak ditemukan." : "Analisis belum dapat dimulai. Tunggu proses aktif selesai; batas 3 percobaan per draf dan 10 per jam.", reserveError?.message.includes("not_found") ? 404 : 409);
  try {
    const { data: saved, error: readError } = await db.from("control_center_decision_generations").select("input").eq("id", generation).eq("owner_id", user.id).single();
    if (readError) throw readError;
    const result = await generateText({
      model: gateway(model), system: decisionSystemPrompt, prompt: JSON.stringify(saved.input),
      maxOutputTokens: 3000, maxRetries: 0, abortSignal: AbortSignal.timeout(40000),
      providerOptions: { gateway: { user: user.id, tags: ["control-center-decisions", generation] } }
    });
    if (!result.text.trim()) throw new Error("empty_output");
    const { data: done, error: saveError } = await db.rpc("control_center_finish_analysis", {
      p_id: id, p_owner: user.id, p_generation: generation, p_output: result.text, p_usage: result.usage, p_error: null
    });
    if (saveError || !done) return fail("Analisis selesai tetapi penyimpanan belum terkonfirmasi. Muat ulang sebelum mencoba lagi.", 503);
    return NextResponse.json({ generation_id: generation });
  } catch {
    await db.rpc("control_center_finish_analysis", { p_id: id, p_owner: user.id, p_generation: generation, p_output: null, p_usage: null, p_error: "provider_or_storage_failure" });
    return fail("Analisis belum berhasil. Bukti dan draf tetap tersimpan; silakan coba lagi.", 502);
  }
}
