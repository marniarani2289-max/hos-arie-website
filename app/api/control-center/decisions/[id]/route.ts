import { NextRequest, NextResponse } from "next/server";
import { decisionUser, decisionService } from "@/lib/ai-control-center/decision-server";
import { canTransition, type Decision } from "@/lib/ai-control-center/decisions";
const fail = (error: string, status: number) => NextResponse.json({ error }, { status });
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (req.headers.get("origin") !== req.nextUrl.origin) return fail("Permintaan tidak diizinkan.", 403);
  const user = await decisionUser();
  if (!user) return fail("Akses administrator diperlukan.", 403);
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return fail("Keputusan tidak ditemukan.", 404);
  let body;
  try { const raw = await req.text(); if (raw.length > 5000) return fail("Catatan terlalu panjang.", 413); body = JSON.parse(raw); }
  catch { return fail("Data tidak valid.", 400); }
  if (!body || typeof body.note !== "string" || body.note.trim().length < 10 || body.note.length > 2000 ||
      typeof body.assignee !== "string" || body.assignee.length > 160 ||
      (body.due_date && (typeof body.due_date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(body.due_date) || !Number.isFinite(Date.parse(body.due_date)))))
    return fail("Isi alasan/tindak lanjut minimal 10 karakter dan periksa tanggal.", 400);
  if (body.status === "approved" && (!body.assignee.trim() || !body.due_date)) return fail("Tentukan penanggung jawab dan tenggat sebelum menyetujui.", 400);
  try {
    const db = decisionService();
    const { data, error } = await db.from("control_center_decisions").select("*").eq("id", id).eq("owner_id", user.id).maybeSingle();
    if (error) throw error;
    if (!data) return fail("Keputusan tidak ditemukan.", 404);
    const d = data as Decision;
    if (!canTransition(d.status, body.status)) return fail("Status sudah berubah atau tindakan tidak tersedia. Muat ulang daftar.", 409);
    const at = new Date().toISOString();
    const { data: updated, error: updateError } = await db.from("control_center_decisions").update({
      status: body.status, note: body.note.trim(), assignee: body.assignee.trim(), due_date: body.due_date || null, updated_at: at,
      history: [...d.history, { at, action: body.status, note: body.note.trim() }]
    }).eq("id", id).eq("owner_id", user.id).eq("updated_at", d.updated_at).select("*").maybeSingle();
    if (updateError) throw updateError;
    if (!updated) return fail("Keputusan telah berubah. Muat ulang sebelum mencoba kembali.", 409);
    return NextResponse.json({ decision: updated });
  } catch { return fail("Keputusan belum tersimpan. Silakan coba kembali.", 503); }
}
