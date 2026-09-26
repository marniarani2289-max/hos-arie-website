import 'server-only';
import {createClient} from '@/lib/supabase/server';
import type {CashReport} from './cash';
export async function loadCashReport(client:Awaited<ReturnType<typeof createClient>>,month:string):Promise<CashReport>{
 const {data,error}=await client.rpc('persis_cash_report',{p_month:`${month}-01`});
 if(error||!data)throw new Error('Laporan kas belum dapat dimuat. Silakan coba kembali.');
 const report={...data,month,closing:data.opening+data.income-data.expense} as CashReport;
 if(![report.opening,report.income,report.expense,report.closing,...report.rows.flatMap(r=>[r.amount,r.balance])].every(Number.isSafeInteger))throw new Error('Nilai laporan melebihi batas perhitungan. Hubungi pengelola.');
 return report;
}
export async function cashApiAuth(){
 const client=await createClient();const {data:{user}}=await client.auth.getUser();
 if(!user||!user.email_confirmed_at||user.is_anonymous)return {error:Response.json({error:'Silakan masuk dengan akun bendahara.'},{status:401})} as const;
 const {data,error}=await client.from('persis_treasurers').select('user_id').eq('user_id',user.id).maybeSingle();
 if(error)return {error:Response.json({error:'Hak akses belum dapat diperiksa.'},{status:503})} as const;
 if(!data)return {error:Response.json({error:'Akses hanya untuk bendahara.'},{status:403})} as const;
 return {client,user} as const;
}
