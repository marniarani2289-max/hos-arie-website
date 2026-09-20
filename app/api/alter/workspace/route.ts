import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { emptyWorkspace, parseWorkspace } from "@/lib/alter/model";
export const runtime = "nodejs";
const fail = (error: string, status: number) =>
  NextResponse.json({ error }, { status });
export async function GET() {
  try {
    const db = await createClient();
    const {
      data: { user },
    } = await db.auth.getUser();
    if (!user || user.is_anonymous)
      return fail("Silakan masuk untuk membuka ruang belajar.", 401);
    const [{ data, error }, history] = await Promise.all([
      db
        .from("alter_workspaces")
        .select("content,updated_at")
        .eq("user_id", user.id)
        .maybeSingle(),
      db
        .from("alter_generations")
        .select("id,role,question,output,status,created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50),
    ]);
    if (error || history.error)
      return fail("Ruang belajar belum dapat dimuat. Coba lagi nanti.", 503);
    return NextResponse.json(
      {
        workspace: parseWorkspace(data?.content) || emptyWorkspace,
        version: data?.updated_at || null,
        history: history.data || [],
      },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch {
    return fail("Layanan penyimpanan belum tersedia.", 503);
  }
}
export async function PUT(req: NextRequest) {
  if (req.headers.get("origin") !== req.nextUrl.origin)
    return fail("Permintaan tidak diizinkan.", 403);
  try {
    const raw = await req.text();
    if (raw.length > 120000) return fail("Ruang belajar terlalu besar.", 413);
    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return fail("Data tidak valid.", 400);
    }
    const workspace = parseWorkspace(body?.workspace);
    if (
      !workspace ||
      (body.version !== null && typeof body.version !== "string")
    )
      return fail("Periksa tujuan, sumber, dan bukti penyelesaian tugas.", 400);
    const db = await createClient();
    const {
      data: { user },
    } = await db.auth.getUser();
    if (!user || user.is_anonymous)
      return fail("Sesi berakhir. Masuk kembali sebelum menyimpan.", 401);
    const row = { content: workspace, updated_at: new Date().toISOString() };
    const result =
      body.version === null
        ? await db
            .from("alter_workspaces")
            .insert({ ...row, user_id: user.id })
            .select("updated_at")
            .single()
        : await db
            .from("alter_workspaces")
            .update(row)
            .eq("user_id", user.id)
            .eq("updated_at", body.version)
            .select("updated_at")
            .maybeSingle();
    if (result.error?.code === "23505" || (!result.error && !result.data))
      return fail(
        "Ruang belajar berubah di tab atau perangkat lain. Unduh catatan Anda sebelum memuat ulang halaman.",
        409,
      );
    if (result.error)
      return fail(
        "Belum tersimpan. Catatan tetap terbuka; coba simpan kembali.",
        503,
      );
    return NextResponse.json({ version: result.data?.updated_at });
  } catch {
    return fail("Penyimpanan belum berhasil. Silakan coba kembali.", 503);
  }
}
