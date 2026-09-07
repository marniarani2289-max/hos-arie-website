"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { session } from "@/lib/lexnusa/cohort-access";
import {
  cohortCode,
  workspacePath,
  parseWork,
  complete,
} from "@/lib/lexnusa/cohort";
import {
  parseDocument,
  parseGenerationRefs,
  uuidPattern,
} from "@/lib/lexnusa/document-workflow";
export async function enroll(form: FormData) {
  const { supabase, user } = await session();
  const display_name = String(form.get("display_name") ?? "").trim();
  if (display_name.length < 2 || display_name.length > 120)
    redirect(`${workspacePath}?error=enrollment`);
  const { error } = await supabase
    .from("lexnusa_cohort_members")
    .insert({ cohort_code: cohortCode, user_id: user.id, display_name });
  if (error && error.code !== "23505")
    redirect(`${workspacePath}?error=enrollment`);
  revalidatePath(workspacePath);
  redirect(workspacePath);
}
export async function saveVersion(
  previous: { message: string; versionId: string | null; ok: boolean },
  form: FormData,
) {
  const { supabase, user } = await session();
  const work = parseWork(form);
  const submitted = form.get("intent") === "submit";
  const fail = (message: string) => ({ ...previous, message, ok: false });
  if (!work || (submitted && !complete(work)))
    return fail(
      "Isi kelima tahap minimal 20 karakter untuk mengirim tugas. Maksimal 20.000 karakter per tahap.",
    );
  const document = parseDocument(
    Object.fromEntries(
      ["document_title", "risk_level", "source_notes"].map((k) => [
        k,
        form.get(k),
      ]),
    ),
  );
  let refs;
  try {
    refs = parseGenerationRefs(
      JSON.parse(String(form.get("generation_refs") ?? "{}")),
    );
  } catch {
    return fail("Jejak AI tidak valid. Isi pekerjaan tetap tersedia.");
  }
  const parent = String(form.get("parent_version_id") ?? "") || null;
  const human_checked = form.get("human_checked") === "on";
  if (!document || !refs || (parent && !uuidPattern.test(parent)))
    return fail("Periksa judul dokumen, tingkat risiko, dan dokumen acuan.");
  if (submitted && (!human_checked || document.source_notes.length < 20))
    return fail(
      "Catat dokumen acuan minimal 20 karakter dan konfirmasi pemeriksaan manusia sebelum mengirim.",
    );
  const { data, error } = await supabase
    .from("lexnusa_cohort_versions")
    .insert({
      cohort_code: cohortCode,
      user_id: user.id,
      ...work,
      ...document,
      submitted,
      human_checked,
      generation_refs: refs,
      parent_version_id: parent,
    })
    .select("id")
    .single();
  if (error || !data)
    return fail(
      error?.message.includes("stale_version")
        ? "Ada versi lebih baru dari sesi lain. Salin perubahan Anda, lalu muat ulang untuk melanjutkan versi terbaru."
        : "Penyimpanan belum berhasil. Isi kolom tetap tersedia; coba lagi.",
    );
  revalidatePath(workspacePath);
  revalidatePath("/lexnusa/cohort/facilitator");
  return {
    versionId: data.id as string,
    ok: true,
    message: submitted
      ? "Versi dikirim untuk persetujuan manusia."
      : "Draf versi baru tersimpan. Persetujuan versi lama tidak berlaku untuk draf ini.",
  };
}
