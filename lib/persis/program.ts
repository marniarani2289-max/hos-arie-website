import {UUID} from './cash';
import {jakartaDate} from './dues';
export const PROGRAM_BASE='/persis-kepri/iuran/bendahara/program';
export const PROGRAM_BUCKET='persis-program-documents';
export const PROGRAM_STATUS={planned:'Direncanakan',ongoing:'Berjalan',completed:'Selesai',cancelled:'Dibatalkan'} as const;
export type Program={id:string;year:number;title:string;division:string;responsible:string;start_date:string;end_date:string;budget:number;funding_source:string;target:string;status:keyof typeof PROGRAM_STATUS;progress:number;report:string;change_reason:string;updated_at:string;spent:number;expense_count:number};
export type ProgramOption=Pick<Program,'id'|'year'|'title'|'status'>;
export type ProgramExpense={id:string;transacted_on:string;party:string;description:string;amount:number;voided_at:string|null;void_reason:string;program_id?:string|null};
export type ProgramReport={year:number;programs:Program[];unassigned:ProgramExpense[];cash_start_date:string|null};
export function programYear(value?:string){return /^(20[2-9]\d|2100)$/.test(value||'')?Number(value):Number(jakartaDate().slice(0,4));}
export function programValues(form:FormData){
 const text=(key:string)=>String(form.get(key)||'').trim();
 const yearText=text('year'),year=Number(yearText),title=text('title'),division=text('division'),responsible=text('responsible'),start_date=text('start_date'),end_date=text('end_date'),budgetText=text('budget'),budget=Number(budgetText),funding_source=text('funding_source'),target=text('target'),status=text('status'),progressText=text('progress'),progress=Number(progressText),report=text('report'),change_reason=text('change_reason');
 if(!/^(20[2-9]\d|2100)$/.test(yearText))throw new Error('Tahun program harus antara 2020 dan 2100.');
 for(const [value,min,max,label]of [[title,3,160,'Nama program'],[division,2,120,'Bidang'],[responsible,2,160,'Penanggung jawab'],[funding_source,3,500,'Sumber dana'],[target,3,2000,'Target kegiatan'],[change_reason,3,500,'Dasar / alasan perubahan']] as const){if(value.length<min||value.length>max)throw new Error(`${label}: isi ${min}–${max} karakter.`);}
 const validDate=(value:string)=>{const d=new Date(`${value}T00:00:00Z`);return /^\d{4}-\d{2}-\d{2}$/.test(value)&&!Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===value&&value.slice(0,4)===yearText;};
 if(!validDate(start_date)||!validDate(end_date)||end_date<start_date)throw new Error('Jadwal harus valid, berurutan, dan berada dalam tahun program.');
 if(!/^\d+$/.test(budgetText)||!Number.isSafeInteger(budget)||budget<0||budget>100000000000)throw new Error('Anggaran harus rupiah utuh antara 0 dan 100.000.000.000.');
 if(!Object.prototype.hasOwnProperty.call(PROGRAM_STATUS,status)||!/^\d+$/.test(progressText)||progress<0||progress>100||report.length>2000)throw new Error('Periksa status, progres 0–100%, dan laporan maksimal 2.000 karakter.');
 if(status==='completed'&&progress!==100)throw new Error('Program selesai harus memiliki progres 100%.');
 return {year,title,division,responsible,start_date,end_date,budget,funding_source,target,status,progress,report,change_reason};
}
export function programLink(form:FormData,kind:string){const value=String(form.get('program_id')||'').trim();if(!value)return null;if(!UUID.test(value)||kind!=='expense')throw new Error('Program hanya dapat ditautkan ke pengeluaran.');return value;}
export function programTotals(report:ProgramReport){const totals=report.programs.reduce((s,p)=>({budget:s.budget+p.budget,spent:s.spent+p.spent,over:s.over+(p.spent>p.budget?1:0),completed:s.completed+(p.status==='completed'?1:0)}),{budget:0,spent:0,over:0,completed:0});return {...totals,remaining:totals.budget-totals.spent,unassigned:report.unassigned.reduce((s,r)=>s+r.amount,0)};}
