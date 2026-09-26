import 'server-only';
import {createClient} from '@/lib/supabase/server';
import {programTotals,type ProgramReport,type ProgramOption} from './program';
export async function loadProgramReport(client:Awaited<ReturnType<typeof createClient>>,year:number):Promise<ProgramReport>{
 const {data,error}=await client.rpc('persis_program_report',{p_year:year});
 if(error||!data)throw new Error('Laporan program belum dapat dimuat. Silakan coba kembali.');
 const result={...data,year} as ProgramReport;
 if(!result.programs.every(p=>Number.isSafeInteger(p.budget)&&Number.isSafeInteger(p.spent))||!result.unassigned.every(r=>Number.isSafeInteger(r.amount)))throw new Error('Nilai laporan melebihi batas perhitungan.');
 if(!Object.values(programTotals(result)).every(Number.isSafeInteger))throw new Error('Total laporan melebihi batas perhitungan.');
 return result;
}
export async function loadProgramOptions(client:Awaited<ReturnType<typeof createClient>>,year?:number){
 const rows:ProgramOption[]=[];
 for(let offset=0;;offset+=500){let q=client.from('persis_programs').select('id,year,title,status').neq('status','cancelled');if(year)q=q.eq('year',year);const {data,error}=await q.order('year',{ascending:false}).order('id').range(offset,offset+499);if(error)throw new Error('Pilihan program belum dapat dimuat. Muat ulang sebelum mencatat transaksi.');rows.push(...(data||[]));if((data?.length||0)<500)break;}
 return rows;
}
