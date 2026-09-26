import {PROGRAM_BASE,programLink} from '@/lib/persis/program';
import {revalidatePath} from 'next/cache';
import {cashApiAuth} from '@/lib/persis/cash-server';
import {requireTreasurer} from '@/lib/persis/master-server';
import {CASH_BASE,CASH_BUCKET,cashValues} from '@/lib/persis/cash';
import {MAX_RECEIPT,receiptType} from '@/lib/persis/dues';
export async function POST(request:Request){
 if(request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'Permintaan tidak diizinkan.'},{status:403});
 const auth=await cashApiAuth();if(auth.error)return auth.error;
 if(Number(request.headers.get('content-length'))>MAX_RECEIPT+100000)return Response.json({error:'Bukti maksimal 3 MB.'},{status:413});
 let programId:string|null=null;let values:ReturnType<typeof cashValues>,bytes:Uint8Array,type:ReturnType<typeof receiptType>;
 try{
  const form=await request.formData();values=cashValues(form);programId=programLink(form,values.kind);const file=form.get('receipt');
  if(!(file instanceof File)||!file.size||file.size>MAX_RECEIPT)throw new Error('Unggah bukti JPG, PNG, atau PDF maksimal 3 MB.');
  bytes=new Uint8Array(await file.arrayBuffer());type=receiptType(bytes,file.type);
 }catch(e){return Response.json({error:e instanceof Error?e.message:'Formulir tidak dapat dibaca.'},{status:400});}
 const {service,user}=await requireTreasurer(CASH_BASE);
 const {data:existing,error:lookupError}=await service.from('persis_cash_entries').select('id').eq('id',values.id).maybeSingle();
 if(lookupError)return Response.json({error:'Transaksi belum dapat diperiksa.'},{status:503});
 if(existing)return Response.json({ok:true,id:existing.id});
 const {data:settings,error:settingsError}=await service.from('persis_cash_settings').select('start_date').eq('id',true).maybeSingle();
 if(settingsError)return Response.json({error:'Saldo awal belum dapat diperiksa.'},{status:503});
 if(!settings||values.transacted_on<settings.start_date)return Response.json({error:'Tetapkan saldo awal. Tanggal transaksi harus sejak tanggal mulai buku kas.'},{status:400});
 if(programId){
  const {data:program,error:programError}=await service.from('persis_programs').select('year,status').eq('id',programId).maybeSingle();
  if(programError)return Response.json({error:'Program belum dapat diperiksa.'},{status:503});
  if(!program||program.status==='cancelled'||program.year!==Number(values.transacted_on.slice(0,4)))return Response.json({error:'Pilih program aktif dengan tahun yang sama dengan tanggal pengeluaran.'},{status:400});
 }
 const path=`${user.id}/${values.id}.${type.extension}`;
 const {error:uploadError}=await service.storage.from(CASH_BUCKET).upload(path,bytes,{contentType:type.mime,upsert:false});
 if(uploadError)return Response.json({error:'Bukti belum berhasil diunggah atau penyimpanan sedang diproses. Muat ulang buku kas sebelum mencoba lagi.'},{status:503});
 const {error}=await service.rpc('persis_create_cash_with_program',{p_entry:{...values,receipt_path:path},p_program_id:programId,p_actor:user.id});
 if(error){
  // Do not remove a receipt another successful retry has already linked.
  const {data:linked,error:checkError}=await service.from('persis_cash_entries').select('id,receipt_path').eq('id',values.id).maybeSingle();
  if(linked&&linked.receipt_path!==path)await service.storage.from(CASH_BUCKET).remove([path]);
  if(linked)return Response.json({ok:true,id:linked.id});
  if(!checkError)await service.storage.from(CASH_BUCKET).remove([path]);
  return Response.json({error:'Transaksi belum tersimpan. Periksa buku kas sebelum mencoba kembali.'},{status:503});
 }
 revalidatePath(CASH_BASE);revalidatePath(PROGRAM_BASE,'layout');return Response.json({ok:true,id:values.id},{status:201,headers:{'Cache-Control':'private, no-store'}});
}
