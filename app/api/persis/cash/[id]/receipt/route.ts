import {cashApiAuth} from '@/lib/persis/cash-server';
import {CASH_BUCKET,UUID} from '@/lib/persis/cash';
export async function GET(_request:Request,{params}:{params:Promise<{id:string}>}){
 const auth=await cashApiAuth();if(auth.error)return auth.error;
 const {id}=await params;if(!UUID.test(id))return new Response('Bukti tidak ditemukan.',{status:404});
 const {data,error}=await auth.client.from('persis_cash_entries').select('receipt_path,transacted_on').eq('id',id).maybeSingle();
 if(error||!data)return new Response('Bukti tidak ditemukan.',{status:404});
 const ext=data.receipt_path.split('.').pop();
 const {data:signed,error:signError}=await auth.client.storage.from(CASH_BUCKET).createSignedUrl(data.receipt_path,60,{download:`bukti-kas-${data.transacted_on}-${id.slice(0,8)}.${ext}`});
 if(signError||!signed)return new Response('Bukti belum dapat diunduh.',{status:503});
 return new Response(null,{status:303,headers:{Location:signed.signedUrl,'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer'}});
}
