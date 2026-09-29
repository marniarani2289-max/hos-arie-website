export const BASE = '/constitutional-justice/workspace';
export const modules = {
  client: { label: 'Klien', singular: 'klien', statuses: ['Menunggu', 'Aktif', 'Selesai'], fields: ['email', 'phone', 'address'] },
  matter: { label: 'Perkara', singular: 'perkara', statuses: ['Konsultasi', 'Aktif', 'Ditunda', 'Selesai'], fields: ['reference', 'court', 'category', 'constitutional_issue', 'assignee'] },
  hearing: { label: 'Jadwal sidang', singular: 'sidang', statuses: ['Terjadwal', 'Selesai', 'Ditunda', 'Dibatalkan'], fields: ['location', 'assignee'] },
  task: { label: 'Tindak lanjut', singular: 'tindak lanjut', statuses: ['Terbuka', 'Dikerjakan', 'Selesai'], fields: ['assignee', 'priority'] },
  appointment: { label: 'Janji temu', singular: 'janji temu', statuses: ['Terjadwal', 'Selesai', 'Dibatalkan'], fields: ['location', 'assignee'] },
  decision: { label: 'Putusan', singular: 'putusan', statuses: ['Dicatat', 'Ditelaah', 'Selesai'], fields: ['reference', 'court', 'outcome', 'source_url'] },
  finance: { label: 'Keuangan', singular: 'transaksi', statuses: ['Belum dibayar', 'Dibayar', 'Dibatalkan'], fields: ['direction', 'amount', 'reference'] },
  contact: { label: 'Relasi', singular: 'relasi', statuses: ['Aktif', 'Arsip'], fields: ['email', 'phone', 'organization'] },
} as const;
export type Kind = keyof typeof modules;
export type RecordItem = { id: string; kind: Kind; title: string; status: string; notes: string; parent_id: string | null; due_at: string | null; details: Record<string, string>; updated_at: string; created_at: string };
export const labels: Record<string, string> = { email: 'Email', phone: 'Telepon', address: 'Alamat', reference: 'Nomor / referensi', court: 'Pengadilan / forum', category: 'Jenis perkara', constitutional_issue: 'Isu konstitusional / hak yang diperjuangkan', assignee: 'Penanggung jawab', location: 'Lokasi / tautan pertemuan', priority: 'Prioritas', outcome: 'Amar / hasil putusan', source_url: 'Tautan sumber putusan (HTTPS)', direction: 'Jenis transaksi', amount: 'Nominal (Rp)', organization: 'Organisasi' };
export const parentKind = (kind: Kind): Kind | null => kind === 'matter' ? 'client' : ['hearing', 'task', 'decision', 'finance'].includes(kind) ? 'matter' : kind === 'appointment' ? 'client' : null;
export function parseRecord(input: unknown) {
  if (!input || typeof input !== 'object') throw new Error('Data tidak valid.');
  const v = input as Record<string, unknown>;
  if (typeof v.kind !== 'string' || !Object.hasOwn(modules, v.kind)) throw new Error('Modul tidak valid.');
  const kind = v.kind as Kind;
  const title = String(v.title || '').trim(), notes = String(v.notes || '').trim();
  if (!title || title.length > 200 || notes.length > 10000) throw new Error('Judul wajib diisi (maksimal 200 karakter), catatan maksimal 10.000 karakter.');
  const status = String(v.status || '');
  if (!(modules[kind].statuses as readonly string[]).includes(status)) throw new Error('Status tidak valid.');
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (typeof v.id !== 'string' || !uuid.test(v.id)) throw new Error('ID tidak valid.');
  const parent_id = v.parent_id ? String(v.parent_id) : null;
  if (parent_id && (!uuid.test(parent_id) || !parentKind(kind) || parent_id === v.id)) throw new Error('Hubungan data tidak valid.');
  if (['matter','hearing','decision'].includes(kind) && !parent_id) throw new Error('Pilih klien atau perkara terkait.');
  let due_at: string | null = null;
  if (v.due_at) { const d = new Date(String(v.due_at)); if (Number.isNaN(d.getTime())) throw new Error('Tanggal tidak valid.'); due_at = d.toISOString(); }
  if (['hearing','appointment','finance'].includes(kind) && !due_at) throw new Error('Tanggal wajib diisi.');
  const raw = (v.details && typeof v.details === 'object' ? v.details : {}) as Record<string, unknown>;
  const details: Record<string, string> = {};
  for (const key of modules[kind].fields) { const value = String(raw[key] || '').trim(); if (value.length > 2000) throw new Error('Isi kolom terlalu panjang.'); details[key] = value; }
  if (details.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) throw new Error('Email tidak valid.');
  if (details.source_url) { try { if (new URL(details.source_url).protocol !== 'https:') throw new Error(); } catch { throw new Error('Tautan sumber harus berupa URL HTTPS.'); } }
  if (kind === 'finance') { const amount = Number(details.amount); if (!Number.isSafeInteger(amount) || amount <= 0 || amount > 1e12) throw new Error('Nominal harus berupa rupiah utuh, lebih dari nol, maksimal 1 triliun.'); if (!['Pemasukan', 'Pengeluaran'].includes(details.direction)) throw new Error('Pilih jenis transaksi.'); }
  return { id: v.id, kind, title, status, notes, parent_id, due_at, details };
}
