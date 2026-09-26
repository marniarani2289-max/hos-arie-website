import {randomUUID} from 'node:crypto';
import {revalidatePath} from 'next/cache';
import {cashApiAuth} from '@/lib/persis/cash-server';
import {requireTreasurer} from '@/lib/persis/master-server';
import {PROGRAM_BASE,PROGRAM_BUCKET} from '@/lib/persis/program';
import {UUID} from '@/lib/persis/cash';
import {MAX_RECEIPT,receiptType} from '@/lib/persis/dues';
export async function POST(request:Request,{params}:{params:Promise<{id:string}>}){
 if(request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'Permintaan tidak diizinkan.'},{status:403});
 const auth=await cashApiAuth();if(auth.error)return auth.error;
 const {id:programId}=await params;if(!UUID.test(programId))return Response.json({error:'Program tidak ditemukan.'},{status:404});
 if(Number(request.headers.get('content-length'))>MAX_RECEIPT+100000)return Response.json({error:'Berkas maksimal 3 MB.'},{status:413});
 let caption:string,file:File,bytes:Uint8Array,type:ReturnType<typeof receiptType>;
 try{const f=await request.formData();caption=String(f.get('caption')||'').trim();const value=f.get('file');if(caption.length<3||caption.length>300)throw new Error('Keterangan harus 3–300 karakter.');if(!(value instanceof File)||value.size===0||value.size>MAX_RECEIPT)throw new Error('Unggah JPG, PNG, atau PDF maksimal 3 MB.');file=value;bytes=new Uint8Array(await file.arrayBuffer());type=receiptType(bytes,file.type);}catch(e){return Response.json({error:e instanceof Error?e.message:'Periksa unggahan.'},{status:400});}
 const {service,user}=await requireTreasurer(PROGRAM_BASE);const {data:program,error:readError}=await service.from('persis_programs').select('id').eq('id',programId).maybeSingle();
 if(readError)return Response.json({error:'Program belum dapat diperiksa.'},{status:503});if(!program)return Response.json({error:'Program tidak ditemukan.'},{status:404});
 const id=randomUUID(),file_path=`${user.id}/${id}.${type.extension}`;
 const {error:uploadError}=await service.storage.from(PROGRAM_BUCKET).upload(file_path,bytes,{contentType:type.mime,upsert:false});
 if(uploadError)return Response.json({error:'Dokumen belum berhasil diunggah.'},{status:503});
 const {error}=await service.from('persis_program_documents').insert({id,program_id:programId,file_path,file_name:file.name.slice(0,180)||`dokumentasi.${type.extension}`,caption,created_by:user.id});
 if(error){const {data:linked,error:lookupError}=await service.from('persis_program_documents').select('id').eq('id',id).maybeSingle();if(!linked&&!lookupError)await service.storage.from(PROGRAM_BUCKET).remove([file_path]);if(!linked)return Response.json({error:'Dokumentasi belum tersimpan. Muat ulang sebelum mencoba lagi.'},{status:503});}
 revalidatePath(`${PROGRAM_BASE}/${programId}`);return Response.json({ok:true},{status:201,headers:{'Cache-Control':'private, no-store'}});
}
