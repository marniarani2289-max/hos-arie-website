import { randomUUID } from 'node:crypto';
import { createClient } from '@/lib/supabase/server';
import { BUCKET, MAX_RECEIPT, receiptType, validateDue } from '@/lib/persis/dues';

export async function POST(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) return Response.json({ error:'Permintaan tidak diizinkan.' }, { status:403 });
  const supabase=await createClient();
  const { data:{user} }=await supabase.auth.getUser();
  if (!user || user.is_anonymous || !user.email_confirmed_at) return Response.json({ error:'Masuk dengan akun yang sudah diverifikasi untuk mencatat iuran.' }, { status:401 });
  if (Number(request.headers.get('content-length')) > MAX_RECEIPT+100000) return Response.json({error:'Ukuran bukti maksimal 3 MB.'},{status:413});
  let form: FormData;
  try { form=await request.formData(); } catch { return Response.json({error:'Formulir tidak dapat dibaca.'},{status:400}); }
  let values: ReturnType<typeof validateDue>, file: File, bytes: Uint8Array, type: ReturnType<typeof receiptType>;
  try {
    values=validateDue(form);
    const receipt=form.get('receipt');
    if (!(receipt instanceof File) || receipt.size===0 || receipt.size>MAX_RECEIPT) throw new Error('Unggah bukti pembayaran, maksimal 3 MB.');
    file=receipt; bytes=new Uint8Array(await file.arrayBuffer()); type=receiptType(bytes,file.type);
  } catch(error) { return Response.json({ error:error instanceof Error ? error.message : 'Periksa kembali formulir.' },{status:400}); }
  const {data:existing,error:lookupError}=await supabase.from('persis_dues').select('id').eq('user_id',user.id).eq('period',values.period).in('status',['pending','verified']).limit(1);
  if(lookupError) return Response.json({error:'Catatan belum dapat diperiksa. Silakan coba kembali.'},{status:503});
  if(existing?.length) return Response.json({error:'Iuran bulan ini sudah dicatat dan sedang menunggu verifikasi atau telah terverifikasi.'},{status:409});
  const id=randomUUID(), path=`${user.id}/${id}.${type.extension}`;
  const {error:uploadError}=await supabase.storage.from(BUCKET).upload(path,bytes,{contentType:type.mime,upsert:false});
  if(uploadError) return Response.json({error:'Bukti belum berhasil diunggah. Silakan coba kembali.'},{status:503});
  const {error}=await supabase.from('persis_dues').insert({...values,id,user_id:user.id,receipt_path:path});
  if(error){
    await supabase.storage.from(BUCKET).remove([path]);
    return Response.json({error:error.code==='23505'?'Iuran bulan ini sudah dicatat. Muat ulang riwayat Anda.':'Catatan belum tersimpan. Silakan coba kembali.'},{status:error.code==='23505'?409:503});
  }
  return Response.json({ok:true,id},{status:201,headers:{'Cache-Control':'private, no-store'}});
}
