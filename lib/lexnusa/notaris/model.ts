export const kinds = ['client', 'matter', 'document', 'appointment', 'invoice'] as const;
export type Kind = typeof kinds[number];
export type Data = Record<string, string | number | boolean>;
export type Office = { id: string; name: string; owner_id?: string };
export type RecordItem = { id: string; office_id: string; kind: Kind; title: string; parent_id: string | null; data: Data; version: number; archived: boolean; created_at: string; updated_at: string };
export type Audit = { id: number; action: string; record_title: string; created_at: string };
export const labels: Record<Kind, string> = { client: 'Klien', matter: 'Pekerjaan', document: 'Dokumen', appointment: 'Agenda', invoice: 'Tagihan' };
export const stages = ['Berkas masuk', 'Pemeriksaan', 'Penyusunan draf', 'Penjadwalan', 'Selesai'] as const;
export const rupiah = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
export const uuid = (v: unknown): v is string => typeof v === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
export function validateRecord(input: unknown) {
  if (!input || typeof input !== 'object') throw new Error('Data tidak valid.');
  const v = input as Record<string, unknown>;
  if (!kinds.includes(v.kind as Kind)) throw new Error('Jenis data tidak dikenal.');
  const kind = v.kind as Kind;
  const title = String(v.title ?? '').trim();
  if (!title || title.length > 160) throw new Error('Nama wajib diisi, maksimal 160 karakter.');
  if (v.parent_id && !uuid(v.parent_id)) throw new Error('Relasi data tidak valid.');
  const raw = (v.data && typeof v.data === 'object' ? v.data : {}) as Data;
  const data: Data = {};
  const fields: Record<Kind, string[]> = {
    client: ['category', 'phone', 'email', 'address', 'notes'],
    matter: ['service', 'status', 'due', 'assignee', 'notes', 'identity_checked', 'authority_checked', 'support_checked', 'draft_checked'],
    document: ['content', 'notes'], appointment: ['date', 'time', 'location', 'notes'],
    invoice: ['amount', 'paid', 'due', 'notes'],
  };
  for (const key of fields[kind]) {
    if (key.endsWith('_checked')) data[key] = raw[key] === true;
    else if (key === 'amount' || key === 'paid') {
      const n = Number(raw[key] ?? 0);
      if (!Number.isSafeInteger(n) || n < 0 || n > 1e12) throw new Error('Nominal harus rupiah bulat antara 0 dan 1 triliun.');
      data[key] = n;
    } else {
      const s = String(raw[key] ?? '').trim();
      if (s.length > (key === 'content' ? 30000 : key === 'notes' ? 4000 : 500)) throw new Error('Isian terlalu panjang.');
      data[key] = s;
    }
  }
  for (const key of ['due', 'date']) if (data[key] && (!/^\d{4}-\d{2}-\d{2}$/.test(String(data[key])) || new Date(String(data[key]) + 'T00:00:00Z').toISOString().slice(0,10) !== data[key])) throw new Error('Tanggal tidak valid.');
  if (kind === 'appointment' && (!data.date || !/^([01]\d|2[0-3]):[0-5]\d$/.test(String(data.time)))) throw new Error('Tanggal dan waktu agenda wajib diisi.');
  if (kind === 'matter' && !stages.includes(data.status as typeof stages[number])) throw new Error('Status pekerjaan tidak valid.');
  if (kind === 'invoice' && (Number(data.amount) <= 0 || Number(data.paid) > Number(data.amount))) throw new Error('Tagihan harus positif dan pembayaran tidak boleh melebihi tagihan.');
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) throw new Error('Alamat email tidak valid.');
  return { kind, title, parent_id: v.parent_id ? String(v.parent_id) : null, data };
}
export function csvCell(value: unknown) {
  let s = String(value ?? '');
  if (/^[\s]*[=+@-]/.test(s)) s = "'" + s;
  return '"' + s.replace(/"/g, '""') + '"';
}
export function brief(matter: RecordItem, client?: RecordItem) {
  return ['DRAF CATATAN PERSIAPAN — BUKAN AKTA', '', 'Pekerjaan: ' + matter.title, 'Klien: ' + (client?.title || 'Belum ditautkan'), 'Layanan: ' + (matter.data.service || '-'), 'Penanggung jawab: ' + (matter.data.assignee || '-'), 'Target: ' + (matter.data.due || '-'), '', 'CATATAN', String(matter.data.notes || '-'), '', 'UNTUK PEMERIKSAAN NOTARIS', '1. Verifikasi identitas dan kewenangan para pihak.', '2. Periksa dokumen pendukung dan konsistensi data.', '3. Tetapkan isi dan bentuk dokumen berdasarkan pemeriksaan profesional.', '', 'Catatan ini diisi dari data pekerjaan; bukan hasil verifikasi hukum atau akta autentik.'].join('\n');
}
