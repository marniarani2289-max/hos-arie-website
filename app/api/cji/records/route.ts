import { createClient } from '@/lib/supabase/server';
import { parseRecord, parentKind } from '@/lib/cji/model';
const headers = { 'Cache-Control': 'private, no-store' };
export async function POST(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) return Response.json({ error: 'Permintaan tidak diizinkan.' }, { status: 403, headers });
  const client = await createClient();
  const { data: { user } } = await client.auth.getUser();
  if (!user || user.is_anonymous || !user.email_confirmed_at) return Response.json({ error: 'Silakan masuk kembali.' }, { status: 401, headers });
  const { data: member } = await client.from('cji_members').select('role').eq('user_id', user.id).maybeSingle();
  if (!member || member.role === 'viewer') return Response.json({ error: 'Akses mengubah data tidak tersedia.' }, { status: 403, headers });
  let value, version: string | null;
  try {
    const text = await request.text(); if (text.length > 25000) throw new Error('Data terlalu besar.');
    const raw = JSON.parse(text); value = parseRecord(raw); version = raw.updated_at || null;
    if (version && (typeof version !== 'string' || Number.isNaN(Date.parse(version)))) throw new Error('Versi data tidak valid.');
  } catch (e) { return Response.json({ error: e instanceof Error ? e.message : 'Data tidak valid.' }, { status: 400, headers }); }
  if (value.parent_id) {
    const { data: parent, error } = await client.from('cji_records').select('kind').eq('id', value.parent_id).maybeSingle();
    if (error || parent?.kind !== parentKind(value.kind)) return Response.json({ error: 'Klien atau perkara terkait tidak ditemukan.' }, { status: 400, headers });
  }
  const query = version ? client.from('cji_records').update(value).eq('id', value.id).eq('updated_at', version) : client.from('cji_records').insert({ ...value, created_by: user.id });
  const { data, error } = await query.select('*').maybeSingle();
  if (error || !data) return Response.json({ error: version ? 'Data berubah atau gagal disimpan. Muat ulang sebelum mencoba kembali.' : 'Belum tersimpan. Muat ulang untuk memeriksa hasil sebelum mencoba kembali.' }, { status: 409, headers });
  return Response.json({ record: data }, { status: version ? 200 : 201, headers });
}
