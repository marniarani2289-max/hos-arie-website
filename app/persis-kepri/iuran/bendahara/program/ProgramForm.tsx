import {randomUUID} from 'node:crypto';
import {PROGRAM_STATUS,type Program} from '@/lib/persis/program';
import {saveProgram} from './actions';
import SubmitButton from './SubmitButton';
const field='w-full rounded-lg border border-slate-300 bg-white p-3 text-base font-normal';
export default function ProgramForm({program,year}:{program?:Program;year:number}){
 return <form action={saveProgram} className="mt-5 grid gap-4 sm:grid-cols-2">
  <input type="hidden" name="id" value={program?.id||''}/><input type="hidden" name="new_id" value={program?'':randomUUID()}/><input type="hidden" name="version" value={program?.updated_at||''}/>
  <label className="grid gap-2 text-sm font-semibold">Tahun anggaran<input name="year" type="number" min="2020" max="2100" required defaultValue={program?.year||year} readOnly={!!program} className={field}/></label>
  <label className="grid gap-2 text-sm font-semibold">Nama program<input name="title" minLength={3} maxLength={160} required defaultValue={program?.title} className={field}/></label>
  <label className="grid gap-2 text-sm font-semibold">Bidang / bagian<input name="division" minLength={2} maxLength={120} required defaultValue={program?.division} placeholder="Contoh: Dakwah" className={field}/></label>
  <label className="grid gap-2 text-sm font-semibold">Penanggung jawab<input name="responsible" minLength={2} maxLength={160} required defaultValue={program?.responsible} className={field}/></label>
  <label className="grid gap-2 text-sm font-semibold">Tanggal mulai<input name="start_date" type="date" required defaultValue={program?.start_date} className={field}/></label>
  <label className="grid gap-2 text-sm font-semibold">Tanggal selesai<input name="end_date" type="date" required defaultValue={program?.end_date} className={field}/></label>
  <label className="grid gap-2 text-sm font-semibold">Anggaran (Rp, tanpa titik)<input name="budget" type="number" min="0" max="100000000000" step="1" required defaultValue={program?.budget} className={field}/></label>
  <label className="grid gap-2 text-sm font-semibold">Rencana sumber dana<input name="funding_source" minLength={3} maxLength={500} required defaultValue={program?.funding_source} placeholder="Contoh: Iuran dan infak anggota" className={field}/></label>
  <label className="grid gap-2 text-sm font-semibold sm:col-span-2">Target / hasil yang diharapkan<textarea name="target" minLength={3} maxLength={2000} required rows={3} defaultValue={program?.target} className={field}/></label>
  <label className="grid gap-2 text-sm font-semibold">Status kegiatan<select name="status" defaultValue={program?.status||'planned'} className={field}>{Object.entries(PROGRAM_STATUS).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label>
  <label className="grid gap-2 text-sm font-semibold">Progres kegiatan (%)<input name="progress" type="number" min="0" max="100" step="1" required defaultValue={program?.progress||0} className={field}/></label>
  <label className="grid gap-2 text-sm font-semibold sm:col-span-2">Laporan perkembangan / hasil kegiatan<textarea name="report" maxLength={2000} rows={4} defaultValue={program?.report} placeholder="Tuliskan capaian, kendala, dan tindak lanjut. Progres kegiatan berbeda dari persentase penyerapan anggaran." className={field}/></label>
  <label className="grid gap-2 text-sm font-semibold sm:col-span-2">{program?'Alasan perubahan / pembaruan':'Dasar penetapan program dan anggaran'}<textarea name="change_reason" minLength={3} maxLength={500} required rows={2} placeholder="Contoh: Hasil rapat pengurus tanggal …" className={field}/></label>
  <p className="text-sm leading-6 text-slate-600 sm:col-span-2">Tahun program tetap setelah disimpan. Jadwal harus berada dalam tahun tersebut. Setiap perubahan anggaran dan perkembangan kegiatan dicatat dalam riwayat.</p>
  <SubmitButton label={program?'Simpan perubahan program':'Tambahkan program'}/>
 </form>;
}
