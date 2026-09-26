import { createClient } from '@/lib/supabase/server';
import { BUCKET } from '@/lib/persis/dues';

export async function GET(_request:Request,{params}:{params:Promise<{id:string}>}) {
  const {id}=await params;
  if(!/^[0-9a-f-]{36}$/i.test(id)) return new Response('Bukti tidak ditemukan.',{status:404});
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user) return new Response('Silakan masuk terlebih dahulu.',{status:401});
  const {data,error}=await supabase.from('persis_dues').select('receipt_path,period').eq('id',id).maybeSingle();
  if(error || !data) return new Response('Bukti tidak ditemukan atau akses tidak diizinkan.',{status:404});
  const extension=data.receipt_path.split('.').pop();
  const {data:signed,error:signError}=await supabase.storage.from(BUCKET).createSignedUrl(data.receipt_path,60,{download:`bukti-iuran-${data.period}.${extension}`});
  if(signError || !signed) return new Response('Bukti belum dapat diunduh. Coba kembali.',{status:503});
  return new Response(null,{status:303,headers:{Location:signed.signedUrl,'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer'}});
}
