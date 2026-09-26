import {cashApiAuth,loadCashReport} from '@/lib/persis/cash-server';
import {cashMonth} from '@/lib/persis/cash';
import {cashExcel,cashPdf} from '@/lib/persis/cash-export';
export const runtime='nodejs';
export async function GET(request:Request){
 const auth=await cashApiAuth();if(auth.error)return auth.error;
 const params=new URL(request.url).searchParams,raw=params.get('month')||'',month=cashMonth(raw),format=params.get('format');
 if(raw!==month||!['xlsx','pdf'].includes(format||''))return new Response('Bulan atau format tidak valid.',{status:400});
 try{
  const report=await loadCashReport(auth.client,month);
  if(!report.settings||month<report.settings.start_date.slice(0,7))return new Response('Tetapkan saldo awal dan pilih periode pembukuan.',{status:400});
  const bytes=format==='xlsx'?await cashExcel(report):await cashPdf(report);
  return new Response(Buffer.from(bytes),{headers:{'Content-Type':format==='xlsx'?'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':'application/pdf','Content-Disposition':`attachment; filename="Buku-Kas-Persis-Kepri-${month}.${format}"`,'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
 }catch{return new Response('Laporan belum dapat diunduh. Coba kembali.',{status:503});}
}
