import {NextRequest,NextResponse} from 'next/server';
import {createClient} from '@/lib/supabase/server';
import {generateText,Output,jsonSchema} from 'ai';
import {gateway} from '@ai-sdk/gateway';
import {generationGate,validCitations,SYSTEM_PROMPT,type AIAnswer,type SearchResult} from '@/lib/etik-pemilu/model';
export const runtime='nodejs';
export const maxDuration=60;
const headers={'Cache-Control':'private, no-store','X-Robots-Tag':'noindex'};
const send=(body:unknown,status=200)=>NextResponse.json(body,{status,headers});
const actions=new Set(['init','search','reviews','revise','review','resolve','add_reviewer','generate']);
function errorMessage(message:string){
 if(message.includes('etik_rate_limit'))return ['Batas AI tercapai. Beri jeda 20 detik; maksimal 20 permintaan dalam 24 jam.',429] as const;
 if(message.includes('etik_duplicate_request'))return ['Permintaan ini sudah diterima. Jangan kirim ulang; mulai permintaan baru jika diperlukan.',409] as const;
 if(message.includes('etik_stale_revision'))return ['Versi sudah berubah. Muat ulang daftar dan periksa revisi terbaru.',409] as const;
 if(message.includes('etik_access_denied'))return ['Akun ini belum menjadi koordinator atau penelaah. Hubungi pengelola Lab untuk penetapan akses.',403] as const;
 if(message.includes('etik_registered_account_required'))return ['Email harus memiliki akun website dengan email terverifikasi.',400] as const;
 if(message.includes('etik_final_text_required'))return ['Koordinator perlu menyimpan teks final usulan sebelum persetujuan.',400] as const;
 if(message.includes('etik_two_reviews_required'))return ['Masalah memerlukan dua persetujuan penelaah aktif atas revisi terbaru tanpa keputusan koreksi atau tahan.',400] as const;
 if(message.includes('duplicate key'))return ['Anda sudah memberi keputusan untuk revisi ini. Perubahan memerlukan revisi baru.',409] as const;
 if(/etik_(coordinator|reviewer)_required/.test(message))return ['Peran akun ini tidak mengizinkan tindakan tersebut.',403] as const;
 if(/etik_(invalid|incomplete|entry_missing)/.test(message))return ['Lengkapi kolom yang wajib diisi dan periksa panjang teks.',400] as const;
 return ['Layanan belum dapat memproses permintaan. Muat ulang atau coba kembali nanti.',503] as const;
}
export async function POST(req:NextRequest){
 if(req.headers.get('origin')!==req.nextUrl.origin)return send({error:'Asal permintaan tidak diizinkan.'},403);
 const raw=await req.text();if(raw.length>35000)return send({error:'Data terlalu panjang.'},413);
 let body;try{body=JSON.parse(raw);}catch{return send({error:'Data tidak valid.'},400);}
 if(!body||!actions.has(body.action)||!body.payload||typeof body.payload!=='object'||Array.isArray(body.payload))return send({error:'Permintaan tidak valid.'},400);
 let reserved=false;
 const db=await createClient();
 const {data:{user}}=await db.auth.getUser();
 if(!user||user.is_anonymous)return send({error:'Masuk dengan akun website untuk membuka ruang riset.',login:'/login?next=%2Fai-lab%2Fasisten-etik-pemilu'},401);
 const rpc=async(action:string,payload:unknown={})=>{const {data,error}=await db.rpc('etik_pemilu_app',{p_action:action,p_payload:payload});if(error)throw Error(error.message);return data;};
 try{
  if(body.action!=='generate')return send({data:await rpc(body.action,body.payload)});
  const {query,consent,requestId}=body.payload;
  if(typeof query!=='string'||query.trim().length<3||query.length>1500||consent!==true||typeof requestId!=='string'||!/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(requestId))return send({error:'Isi pertanyaan 3–1500 karakter dan persetujuan pemrosesan AI.'},400);
  const research:SearchResult=await rpc('search',{query});
  const gate=generationGate(research);
  if(gate!=='ready')return send({data:{mode:gate,notice:gate==='held'?'Terdapat ketentuan terkait yang belum terselesaikan. Penyusunan jawaban AI ditahan; periksa bahan dan isu di bawah.':'Belum ditemukan jawaban acuan yang sesuai. Lengkapi konteks atau gunakan kata kunci yang lebih khusus. AI tidak dipanggil.',research}});
  const model=process.env.ETIK_AI_MODEL||process.env.LEXNUSA_AI_MODEL||'openai/gpt-5.4-mini';
  await rpc('reserve',{requestId,model,question:query,contextIds:research.answers.map(a=>a.id)});reserved=true;
  try{
   const result=await generateText({model:gateway(model),system:SYSTEM_PROMPT,prompt:JSON.stringify({question:query,context:research.answers.map(a=>({id:a.id,question:a.question,text:a.final_text||a.proposed_text,status:a.ai_disposition,approved:a.approved,issues:a.issues,source_evidence:a.source_evidence}))}),output:Output.object({schema:jsonSchema<AIAnswer>({type:'object',additionalProperties:false,properties:{summary:{type:'string'},points:{type:'array',maxItems:5,items:{type:'object',additionalProperties:false,properties:{text:{type:'string'},citationIds:{type:'array',items:{type:'string'}}},required:['text','citationIds']}},missingFacts:{type:'array',maxItems:6,items:{type:'string'}},cannotConclude:{type:'boolean'}},required:['summary','points','missingFacts','cannotConclude']})}),maxOutputTokens:1800,maxRetries:0,abortSignal:AbortSignal.timeout(40000)});
   if(!validCitations(result.output,new Set(research.answers.map(a=>a.id))))throw Error('citation_validation');
   await rpc('finish',{requestId,status:'completed',usage:result.usage});
   return send({data:{mode:'ai',notice:'Draf AI berbasis korpus. Belum disahkan penelaah dan bukan keputusan DKPP. Periksa kecocokan setiap sumber sebelum digunakan.',answer:result.output,research,model}});
  }catch(error){
   const failure=error as {name?:string;statusCode?:number;finishReason?:string;cause?:{name?:string;statusCode?:number}};
   console.warn('etik_generation_failed',JSON.stringify({name:failure?.name,status:failure?.statusCode,finishReason:failure?.finishReason,causeName:failure?.cause?.name,causeStatus:failure?.cause?.statusCode}));
   await rpc('finish',{requestId,status:'failed'}).catch(()=>{});
   return send({data:{mode:'retrieval',notice:'AI generatif belum berhasil merespons. Yang ditampilkan adalah bahan acuan dari database, bukan jawaban AI baru.',research}});
  }
 }catch(e){
  if(reserved)await rpc('finish',{requestId:body.payload.requestId,status:'failed'}).catch(()=>{});
  const [message,status]=errorMessage(e instanceof Error?e.message:'');return send({error:message},status);
 }
}
