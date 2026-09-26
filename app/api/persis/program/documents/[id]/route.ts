import {cashApiAuth} from '@/lib/persis/cash-server';
import {PROGRAM_BUCKET} from '@/lib/persis/program';
import {UUID} from '@/lib/persis/cash';
export async function GET(_request:Request,{params}:{params:Promise<{id:string}>}){
 const auth=await cashApiAuth();if(auth.error)return auth.error;
 const {id}=await params;if(!UUID.test(id))return new Response('Dokumen tidak ditemukan.',{status:404});
 const {data,error}=await auth.client.from('persis_program_documents').select('file_path').eq('id',id).maybeSingle();if(error||!data)return new Response('Dokumen tidak ditemukan.',{status:404});
 const {data:signed,error:signError}=await auth.client.storage.from(PROGRAM_BUCKET).createSignedUrl(data.file_path,60,{download:`dokumentasi-program-${id.slice(0,8)}.${data.file_path.split('.').pop()}`});
 if(signError||!signed)return new Response('Dokumen belum dapat diunduh.',{status:503});
 return new Response(null,{status:303,headers:{Location:signed.signedUrl,'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer'}});
}
