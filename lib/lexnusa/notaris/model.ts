export const kinds = ['client', 'matter', 'document', 'appointment', 'invoice', 'submission'] as const;
export type Kind = typeof kinds[number];
export type Data = Record<string, string | number | boolean>;
export type Office = { id: string; name: string; owner_id?: string };
export type RecordItem = { id: string; office_id: string; kind: Kind; title: string; parent_id: string | null; data: Data; version: number; archived: boolean; created_at: string; updated_at: string };
export type Audit = { id: number; action: string; record_title: string; created_at: string };
export const labels: Record<Kind, string> = { client: 'Klien', matter: 'Pekerjaan', document: 'Dokumen', appointment: 'Agenda', invoice: 'Tagihan', submission: 'Permohonan portal' };
export const portalProviders = ['AHU', 'ATR-BPN'] as const;
export type PortalProvider = typeof portalProviders[number];
export const portalServices: Record<PortalProvider, readonly string[]> = {
  AHU: ['Perseroan terbatas', 'Badan usaha (CV/Firma/Persekutuan)', 'Yayasan', 'Perkumpulan', 'Fidusia', 'Wasiat', 'Pemilik manfaat korporasi', 'Layanan AHU lainnya'],
  'ATR-BPN': ['Pengecekan sertipikat', 'Surat Keterangan Pendaftaran Tanah (SKPT)', 'Hak Tanggungan elektronik', 'Layanan pertanahan lainnya'],
};
export const portalStatuses = ['Draf persiapan', 'Diajukan di portal', 'Perlu perbaikan', 'Hasil diterima', 'Dibatalkan'] as const;
export const officialPortals: Record<PortalProvider, string> = { AHU: 'https://ahu.go.id/', 'ATR-BPN': 'https://mitra.atrbpn.go.id/' };
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
    submission: ['provider', 'portal_service', 'portal_status', 'reference', 'submitted_on', 'checked_on', 'result_number', 'evidence_id', 'official_status', 'notes', 'prepared_checked', 'authority_checked', 'files_checked', 'reviewed_checked'],
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
  for (const key of ['due', 'date', 'submitted_on', 'checked_on']) if (data[key] && (!/^\d{4}-\d{2}-\d{2}$/.test(String(data[key])) || new Date(String(data[key]) + 'T00:00:00Z').toISOString().slice(0,10) !== data[key])) throw new Error('Tanggal tidak valid.');
  if (kind === 'submission') {
    if (!v.parent_id) throw new Error('Tautkan permohonan ke pekerjaan kantor.');
    if (!portalProviders.includes(data.provider as PortalProvider)) throw new Error('Pilih AHU atau ATR-BPN.');
    if (!portalServices[data.provider as PortalProvider].includes(String(data.portal_service))) throw new Error('Layanan tidak sesuai dengan portal.');
    if (!portalStatuses.includes(data.portal_status as typeof portalStatuses[number])) throw new Error('Status permohonan tidak valid.');
    if (data.evidence_id && !uuid(data.evidence_id)) throw new Error('Bukti hasil tidak valid.');
    if (data.portal_status !== 'Draf persiapan' && data.portal_status !== 'Dibatalkan' && (!data.reference || !data.submitted_on || !data.checked_on)) throw new Error('Isi nomor permohonan, tanggal pengajuan, dan tanggal pemeriksaan portal.');
    if (data.portal_status === 'Hasil diterima' && !data.evidence_id) throw new Error('Tautkan berkas bukti hasil yang telah diunggah.');
    if (data.submitted_on && data.checked_on && String(data.checked_on) < String(data.submitted_on)) throw new Error('Tanggal pemeriksaan tidak boleh sebelum tanggal pengajuan.');
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' });
    if ([data.submitted_on, data.checked_on].some(d => d && String(d) > today)) throw new Error('Tanggal pengajuan/pemeriksaan tidak boleh di masa depan.');
    // This release records operator observations; client input cannot claim API verification.
    data.source = 'manual';
  }
  if (kind === 'appointment' && (!data.date || !/^([01]\d|2[0-3]):[0-5]\d$/.test(String(data.time)))) throw new Error('Tanggal dan waktu agenda wajib diisi.');
  if (kind === 'matter' && !stages.includes(data.status as typeof stages[number])) throw new Error('Status pekerjaan tidak valid.');
  if (kind === 'invoice' && (Number(data.amount) <= 0 || Number(data.paid) > Number(data.amount))) throw new Error('Tagihan harus positif dan pembayaran tidak boleh melebihi tagihan.');
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) throw new Error('Alamat email tidak valid.');
  return { kind, title, parent_id: v.parent_id ? String(v.parent_id) : null, data };
}
export function portalPacket(submission: RecordItem, matter: RecordItem, client?: RecordItem) {
  const d = submission.data;
  return ['LEMBAR PENDAMPING PORTAL — LEXNUSA NOTARIS', 'Untuk pemeriksaan dan pengisian manual. Bukan format impor resmi atau bukti pengajuan.', '',
    'Portal: ' + d.provider, 'Layanan: ' + d.portal_service, 'Permohonan: ' + submission.title,
    'Pekerjaan: ' + matter.title, 'Klien: ' + (client?.title || 'Belum ditautkan'),
    'Penanggung jawab: ' + (matter.data.assignee || '-'), '',
    'Status catatan kantor: ' + d.portal_status, 'Sumber: dicatat manual oleh pengelola kantor',
    'Nomor permohonan: ' + (d.reference || 'Belum dicatat'), 'Tanggal pengajuan: ' + (d.submitted_on || '-'),
    'Tanggal pemeriksaan portal: ' + (d.checked_on || '-'), 'Status yang terlihat di portal: ' + (d.official_status || '-'),
    'Nomor hasil/SK: ' + (d.result_number || '-'), '', 'CATATAN PERSIAPAN', String(d.notes || '-'), '',
    'Buka portal resmi dan periksa persyaratan sesuai layanan. Dokumen ini tidak dikirim otomatis ke instansi.'].join('\n');
}
export function csvCell(value: unknown) {
  let s = String(value ?? '');
  if (/^[\s]*[=+@-]/.test(s)) s = "'" + s;
  return '"' + s.replace(/"/g, '""') + '"';
}
export function brief(matter: RecordItem, client?: RecordItem) {
  return ['DRAF CATATAN PERSIAPAN — BUKAN AKTA', '', 'Pekerjaan: ' + matter.title, 'Klien: ' + (client?.title || 'Belum ditautkan'), 'Layanan: ' + (matter.data.service || '-'), 'Penanggung jawab: ' + (matter.data.assignee || '-'), 'Target: ' + (matter.data.due || '-'), '', 'CATATAN', String(matter.data.notes || '-'), '', 'UNTUK PEMERIKSAAN NOTARIS', '1. Verifikasi identitas dan kewenangan para pihak.', '2. Periksa dokumen pendukung dan konsistensi data.', '3. Tetapkan isi dan bentuk dokumen berdasarkan pemeriksaan profesional.', '', 'Catatan ini diisi dari data pekerjaan; bukan hasil verifikasi hukum atau akta autentik.'].join('\n');
}
