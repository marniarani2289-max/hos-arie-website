import type {ProgramOption} from '@/lib/persis/program';
import {assignProgram} from './actions';
import SubmitButton from './SubmitButton';
export default function AssignmentForm({entryId,programs,year,currentId='',returnId=''}:{entryId:string;programs:ProgramOption[];year:number;currentId?:string;returnId?:string}){
 return <form action={assignProgram} className="mt-3 grid gap-3"><input type="hidden" name="entry_id" value={entryId}/><input type="hidden" name="expected" value={currentId}/><input type="hidden" name="return_id" value={returnId}/><input type="hidden" name="year" value={year}/>
  <label className="grid gap-1 text-sm">Program tujuan<select name="program_id" defaultValue={currentId} className="w-full rounded-lg border border-slate-300 bg-white p-2"><option value="">Tanpa tautan program</option>{programs.some(p=>p.id===currentId&&p.status==='cancelled')&&<option value={currentId} disabled>Program saat ini (dibatalkan)</option>}{programs.filter(p=>p.year===year&&p.status!=='cancelled').map(p=><option key={p.id} value={p.id}>{p.title}</option>)}</select></label>
  <label className="grid gap-1 text-sm">Alasan penautan / koreksi<textarea name="reason" minLength={3} maxLength={500} required rows={2} className="rounded-lg border border-slate-300 p-2"/></label>
  <SubmitButton label="Simpan tautan"/>
 </form>;
}
