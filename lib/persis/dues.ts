export const REGIONS = ['Batam','Tanjungpinang','Bintan','Karimun','Lingga','Natuna','Kepulauan Anambas','Lainnya'] as const;
export const STATUS = { pending: 'Menunggu verifikasi', verified: 'Terverifikasi', rejected: 'Perlu diperbaiki' } as const;
export const MAX_RECEIPT = 3 * 1024 * 1024;
export const BUCKET = 'persis-receipts';
export type Due = {
  id: string; user_id: string; member_name: string; member_number: string; region: string;
  period: string; amount: number; paid_on: string; method: string; note: string;
  status: keyof typeof STATUS; review_note: string; reviewed_at: string | null; created_at: string;
};
export function jakartaDate() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}
export function monthLabel(period: string) {
  return new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${period}T00:00:00Z`));
}
export function rupiah(amount: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
}
export function validateDue(form: FormData, today = jakartaDate()) {
  const text = (key: string) => String(form.get(key) || '').trim();
  const member_name=text('member_name'), member_number=text('member_number'), region=text('region');
  const period=text('period'), paid_on=text('paid_on'), amount=Number(text('amount')), method=text('method'), note=text('note');
  if (member_name.length<2 || member_name.length>120 || member_number.length>60) throw new Error('Periksa nama dan nomor anggota.');
  if (!REGIONS.some(r=>r===region)) throw new Error('Pilih daerah anggota.');
  if (!/^(20[2-9]\d|2100)-(0[1-9]|1[0-2])$/.test(period)) throw new Error('Pilih bulan iuran yang valid (2020–2100).');
  const date = new Date(`${paid_on}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(paid_on) || Number.isNaN(date.getTime()) || date.toISOString().slice(0,10)!==paid_on || paid_on<'2020-01-01' || paid_on>today) throw new Error('Tanggal pembayaran tidak valid atau masih di masa depan.');
  if (!Number.isSafeInteger(amount) || amount<1 || amount>100000000) throw new Error('Nominal harus berupa rupiah utuh antara 1 dan 100.000.000.');
  if (!['transfer','tunai','lainnya'].includes(method) || note.length>500) throw new Error('Periksa metode pembayaran dan catatan (maksimal 500 karakter).');
  return { member_name, member_number, region, period:`${period}-01`, paid_on, amount, method, note };
}
export function receiptType(bytes: Uint8Array, declared: string) {
  if (declared==='image/jpeg' && bytes[0]===255 && bytes[1]===216 && bytes[2]===255) return { mime:declared, extension:'jpg' };
  if (declared==='image/png' && [137,80,78,71,13,10,26,10].every((b,i)=>bytes[i]===b)) return { mime:declared, extension:'png' };
  if (declared==='application/pdf' && new TextDecoder().decode(bytes.slice(0,5))==='%PDF-') return { mime:declared, extension:'pdf' };
  throw new Error('Bukti harus berupa berkas JPG, PNG, atau PDF yang valid.');
}
