import { NextRequest, NextResponse } from 'next/server';
import { context } from '@/lib/lexnusa/notaris/server';
import { uuid } from '@/lib/lexnusa/notaris/model';

export const dynamic = 'force-dynamic';
const bucket = 'lexnusa-notary-private';
export async function POST(req: NextRequest) {
  if (req.headers.get('origin') !== req.nextUrl.origin) return NextResponse.json({ error: 'Permintaan tidak diizinkan.' }, { status: 403 });
  try {
    const { db, user, office } = await context();
    if (!office) return NextResponse.json({ error: 'Buat kantor terlebih dahulu.' }, { status: 403 });
    const form = await req.formData();
    const file = form.get('file');
    const parent = String(form.get('parent_id') || '');
    if (!(file instanceof File) || !file.size || file.size > 4 * 1024 * 1024 || !['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) return NextResponse.json({ error: 'Pilih PDF, JPG, atau PNG, maksimal 4 MB.' }, { status: 400 });
    if (parent) {
      if (!uuid(parent)) return NextResponse.json({ error: 'Pekerjaan tidak valid.' }, { status: 400 });
      const { data } = await db.from('lexnusa_notary_records').select('id').eq('office_id', office.id).eq('id', parent).eq('kind', 'matter').eq('archived', false).single();
      if (!data) return NextResponse.json({ error: 'Pekerjaan tidak ditemukan.' }, { status: 404 });
    }
    const ext = file.type === 'application/pdf' ? 'pdf' : file.type === 'image/png' ? 'png' : 'jpg';
    const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await db.storage.from(bucket).upload(path, file, { contentType: file.type, upsert: false });
    if (uploadError) return NextResponse.json({ error: 'Unggah gagal. Silakan coba lagi.' }, { status: 503 });
    const { error } = await db.from('lexnusa_notary_records').insert({ office_id: office.id, kind: 'document', title: file.name.slice(0,160), parent_id: parent || null, data: { file_path: path, file_name: file.name.slice(0,160), content: '', notes: '' } });
    if (error) { await db.storage.from(bucket).remove([path]); return NextResponse.json({ error: 'Metadata belum tersimpan; ulangi unggahan.' }, { status: 503 }); }
    return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch { return NextResponse.json({ error: 'Sesi atau unggahan tidak valid. Masuk kembali lalu coba lagi.' }, { status: 400 }); }
}
export async function GET(req: NextRequest) {
  try {
    const { db, office } = await context();
    const id = req.nextUrl.searchParams.get('id');
    if (!office || !uuid(id)) return new NextResponse('Tidak ditemukan', { status: 404 });
    const { data } = await db.from('lexnusa_notary_records').select('data').eq('id', id).eq('office_id', office.id).eq('kind','document').single();
    if (!data?.data?.file_path) return new NextResponse('Tidak ditemukan', { status: 404 });
    const { data: link, error } = await db.storage.from(bucket).createSignedUrl(data.data.file_path, 60, { download: data.data.file_name || 'dokumen' });
    if (error || !link) return new NextResponse('Unduhan belum tersedia', { status: 503 });
    return NextResponse.redirect(link.signedUrl, { headers: { 'Cache-Control': 'private, no-store', 'Referrer-Policy': 'no-referrer' } });
  } catch { return new NextResponse('Silakan masuk', { status: 401 }); }
}
