'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { context } from '@/lib/lexnusa/notaris/server';
import { uuid, validateRecord } from '@/lib/lexnusa/notaris/model';

export async function signOutNotary() {
  const db = await createClient();
  await db.auth.signOut();
  redirect('/lexnusa/notaris');
}

export async function createOffice(name: string) {
  try {
    const { db, user, office } = await context();
    if (office) return { ok: true };
    if (!name.trim() || name.trim().length > 160) throw new Error('Nama kantor wajib diisi, maksimal 160 karakter.');
    const { error } = await db.from('lexnusa_notary_offices').insert({ name: name.trim(), owner_id: user.id });
    if (error) throw new Error('Kantor belum tersimpan. Muat ulang untuk memeriksa lalu coba lagi.');
    revalidatePath('/lexnusa/notaris/workspace');
    return { ok: true };
  } catch (e) { return { ok: false, error: e instanceof Error ? e.message : 'Terjadi kesalahan.' }; }
}

export async function saveRecord(input: unknown, id?: string, version?: number, archived?: boolean) {
  try {
    const value = validateRecord(input);
    const { db, office } = await context();
    if (!office) throw new Error('Buat ruang kerja kantor terlebih dahulu.');
    if (id && (!uuid(id) || !Number.isInteger(version) || Number(version) < 1)) throw new Error('Versi data tidak valid.');
    if (value.parent_id) {
      const { data: parent } = await db.from('lexnusa_notary_records').select('kind,archived').eq('office_id', office.id).eq('id', value.parent_id).single();
      const expected = value.kind === 'matter' ? 'client' : 'matter';
      if (!parent || parent.kind !== expected) throw new Error('Pilih relasi aktif dari kantor ini.');
    }
    if (value.kind === 'client') value.parent_id = null;
    if (value.kind === 'submission' && value.data.evidence_id) {
      const { data: evidence } = await db.from('lexnusa_notary_records').select('id,data,parent_id').eq('id', value.data.evidence_id).eq('office_id', office.id).eq('kind', 'document').single();
      if (!evidence?.data?.file_path || evidence.parent_id !== value.parent_id) throw new Error('Pilih berkas bukti dari pekerjaan yang sama, melalui modul Dokumen.');
    }
    if (id) {
      const { data: old } = await db.from('lexnusa_notary_records').select('kind,data').eq('id', id).eq('office_id', office.id).single();
      if (!old || old.kind !== value.kind) throw new Error('Data tidak ditemukan.');
      // Uploaded file paths can only be assigned by the authenticated upload handler.
      if (old.data?.file_path) Object.assign(value.data, { file_path: old.data.file_path, file_name: old.data.file_name });
    }
    const query = id
      ? db.from('lexnusa_notary_records').update({ ...value, archived: archived === true }).eq('id', id).eq('office_id', office.id).eq('version', version!)
      : db.from('lexnusa_notary_records').insert({ ...value, office_id: office.id });
    const { data, error } = await query.select('id').maybeSingle();
    if (error) throw new Error('Penyimpanan gagal. Periksa koneksi lalu coba kembali.');
    if (!data) throw new Error('Data telah berubah. Muat ulang sebelum menyimpan ulang.');
    revalidatePath('/lexnusa/notaris/workspace');
    return { ok: true };
  } catch (e) { return { ok: false, error: e instanceof Error ? e.message : 'Terjadi kesalahan.' }; }
}
