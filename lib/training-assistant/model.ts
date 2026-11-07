export const audiences = ['Guru perorangan', 'Sekolah / madrasah', 'Komunitas / mitra'] as const;
export const topics = ['Dasar penggunaan AI', 'Materi ajar digital', 'Asesmen dan rubrik', 'Pembelajaran STEM', 'Administrasi sekolah', 'Pelatihan tim guru'] as const;
export const levels = ['Pemula', 'Pernah mencoba', 'Sudah rutin menggunakan'] as const;
export const formats = ['Daring', 'Tatap muka', 'Gabungan', 'Belum menentukan'] as const;
export const statuses = ['Baru', 'Perlu klarifikasi', 'Sudah dihubungi', 'Diskusi program', 'Terdaftar / sepakat', 'Ditutup'] as const;
export type Interest = { name: string; email: string; phone: string; organization: string; audience: string; topics: string[]; level: string; format: string; participants: number; timing: string; message: string };
export type Lead = Interest & { id: string; created_at: string; updated_at: string; version: number; segment: string; draft: string; status: string; follow_up_on: string | null; notes: string };
const text = (form: FormData, key: string, max: number) => String(form.get(key) || '').trim().slice(0, max);
export function parseInterest(form: FormData): Interest {
  const input: Interest = { name: text(form,'name',120), email: text(form,'email',254).toLowerCase(), phone: text(form,'phone',30), organization: text(form,'organization',180), audience: text(form,'audience',60), topics: [...new Set(form.getAll('topics').map(String))], level: text(form,'level',60), format: text(form,'format',40), participants: Number(form.get('participants')), timing: text(form,'timing',200), message: text(form,'message',3000) };
  if (input.name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email) || !audiences.some(x=>x===input.audience) || !levels.some(x=>x===input.level) || !formats.some(x=>x===input.format) || !input.topics.length || input.topics.some(x=>!topics.some(t=>t===x)) || !Number.isInteger(input.participants) || input.participants<1 || input.participants>10000 || form.get('consent')!=='accepted' || (input.audience!==audiences[0] && !input.organization) || (input.phone && !/^\+?[\d ()-]{8,30}$/.test(input.phone))) throw new Error('invalid');
  return input;
}
export function prepareInterest(input: Interest, now = new Date()) {
  const segment = input.audience === audiences[0] ? 'Peserta individu' : input.audience === audiences[1] ? 'Program sekolah' : 'Kemitraan komunitas';
  const question = segment === 'Peserta individu' ? 'Mata pelajaran dan jenjang apa yang Bapak/Ibu ampu? Adakah contoh hasil belajar yang ingin dibuat?' : 'Apa sasaran utama pelatihan, jenjang peserta, dan siapa penanggung jawab koordinasinya?';
  const draft = `Yth. Bapak/Ibu ${input.name},\n\nTerima kasih atas minat pada Pelatihan AI untuk Guru${input.organization ? ` dari ${input.organization}` : ''}. Kami mencatat kebutuhan ${input.topics.join(', ').toLowerCase()}, dengan pengalaman ${input.level.toLowerCase()}, untuk ${input.participants} peserta.\n\nPreferensi pelaksanaan: ${input.format.toLowerCase()}${input.timing ? `; waktu yang diusulkan: ${input.timing}` : ''}.\n\n${question}\n\nJadwal, ketersediaan tempat, dan rincian program akan dikonfirmasi pengelola setelah kebutuhan dibahas. Formulir minat belum merupakan pendaftaran final.\n\nSalam,\nTim Pelatihan AI untuk Guru\nDr. Hos Arie Sibarani`;
  const date = new Date(now.getTime()+2*86400000);
  return { segment, draft, follow_up_on: jakartaDate(date) };
}
export function jakartaDate(date = new Date()) { return new Intl.DateTimeFormat('en-CA',{ timeZone:'Asia/Jakarta',year:'numeric',month:'2-digit',day:'2-digit' }).format(date); }
export function validDate(value: string) { return /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0,10)===value; }
export function isClosed(status: string) { return status==='Terdaftar / sepakat' || status==='Ditutup'; }
export function isDue(lead: Pick<Lead,'status'|'follow_up_on'>, today=jakartaDate()) { return !isClosed(lead.status) && Boolean(lead.follow_up_on && lead.follow_up_on<=today); }
export function calendarEvent(id: string, date: string) {
  if(!validDate(date)) throw new Error('invalid');
  const day=date.replaceAll('-','');
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Hossibarani//Pelatihan AI//ID','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:training-${id}@hosariesibarani.com`,`DTSTAMP:${new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'')}`,`DTSTART:${day}T020000Z`,`DTEND:${day}T023000Z`,'SUMMARY:Tindak lanjut Pelatihan AI untuk Guru','DESCRIPTION:Buka Control Center untuk memeriksa calon peserta atau mitra.','BEGIN:VALARM','TRIGGER:-PT15M','ACTION:DISPLAY','DESCRIPTION:Tindak lanjut pelatihan AI','END:VALARM','END:VEVENT','END:VCALENDAR',''].join('\r\n');
}
