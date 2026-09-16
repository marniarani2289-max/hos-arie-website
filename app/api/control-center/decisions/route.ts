import { NextRequest, NextResponse } from "next/server";
import { decisionUser, decisionService } from "@/lib/ai-control-center/decision-server";
import { parseBrief } from "@/lib/ai-control-center/decisions";
export const dynamic = "force-dynamic";
const fail = (error: string, status: number) => NextResponse.json({ error }, { status });
export async function GET() {
  const user = await decisionUser();
  if (!user) return fail("Akses administrator diperlukan.", 403);
  try {
    const { data, error } = await decisionService().from("control_center_decisions").select("*").eq("owner_id", user.id).order("created_at", { ascending: false }).limit(200);
    if (error) throw error;
    return NextResponse.json({ decisions: data }, { headers: { "Cache-Control": "private, no-store" } });
  } catch { return fail("Penyimpanan keputusan belum tersedia. Hubungi administrator untuk memeriksa penyiapan database.", 503); }
}
export async function POST(req: NextRequest) {
  if (req.headers.get("origin") !== req.nextUrl.origin) return fail("Permintaan tidak diizinkan.", 403);
  const user = await decisionUser();
  if (!user) return fail("Akses administrator diperlukan.", 403);
  let value;
  try {
    const raw = await req.text();
    if (raw.length > 24000) return fail("Data terlalu panjang.", 413);
    value = JSON.parse(raw);
  } catch { return fail("Data tidak valid.", 400); }
  const brief = parseBrief(value);
  if (!brief) return fail("Lengkapi judul, masalah, bukti, sumber, indikator, dan tingkat risiko.", 400);
  try {
    const { data, error } = await decisionService().from("control_center_decisions").insert({
      ...brief, owner_id: user.id, history: [{ at: new Date().toISOString(), action: "Draf dibuat", note: "Bukti dimasukkan oleh administrator; belum diverifikasi otomatis." }]
    }).select("*").single();
    if (error) throw error;
    return NextResponse.json({ decision: data }, { status: 201 });
  } catch { return fail("Draf belum tersimpan. Data dalam formulir tetap tersedia; coba lagi setelah penyimpanan pulih.", 503); }
}
