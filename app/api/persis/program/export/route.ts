import {cashApiAuth} from '@/lib/persis/cash-server';
import {loadProgramReport} from '@/lib/persis/program-server';
import {programExcel,programPdf} from '@/lib/persis/program-export';
export const runtime='nodejs';
export async function GET(request:Request){
 const auth=await cashApiAuth();if(auth.error)return auth.error;const query=new URL(request.url).searchParams,year=query.get('year')||'',format=query.get('format');
 if(!/^(20[2-9]\d|2100)$/.test(year)||!['xlsx','pdf'].includes(format||''))return new Response('Tahun atau format tidak valid.',{status:400});
 try{const report=await loadProgramReport(auth.client,Number(year)),bytes=format==='xlsx'?await programExcel(report):await programPdf(report);return new Response(Buffer.from(bytes),{headers:{'Content-Type':format==='xlsx'?'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':'application/pdf','Content-Disposition':`attachment; filename="Program-Anggaran-Persis-Kepri-${year}.${format}"`,'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});}catch{return new Response('Laporan belum dapat diunduh. Silakan coba kembali.',{status:503});}
}
