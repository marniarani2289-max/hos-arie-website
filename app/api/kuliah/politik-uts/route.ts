import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { parseUtsInput, recordColumns, UTS_TABLE } from "@/lib/kuliah/politik-uts";
export const dynamic="force-dynamic";
const reply=(data:unknown,status=200)=>NextResponse.json(data,{status,headers:{"Cache-Control":"private, no-store"}});
export async function GET(){
  const db=await createClient();
  const {data:{user},error:authError}=await db.auth.getUser();
  if(authError||!user)return reply({error:"Silakan masuk ke akun mahasiswa."},401);
  const [work,staff]=await Promise.all([
    db.from(UTS_TABLE).select(recordColumns).eq("user_id",user.id).maybeSingle(),
    db.from("kuliah_politik_staff").select("user_id").eq("user_id",user.id).maybeSingle()
  ]);
  if(work.error||staff.error)return reply({error:"Data UTS belum dapat dimuat. Coba lagi; draf perangkat tetap tersedia."},503);
  return reply({user:{id:user.id,email:user.email},record:work.data,isLecturer:!!staff.data});
}
export async function POST(request:Request){
  if(request.headers.get("origin")!==new URL(request.url).origin)return reply({error:"Asal permintaan tidak diizinkan."},403);
  if(!request.headers.get("content-type")?.startsWith("application/json"))return reply({error:"Format permintaan tidak didukung."},415);
  if(Number(request.headers.get("content-length")||0)>1600000)return reply({error:"Jawaban terlalu panjang."},413);
  const db=await createClient();
  const {data:{user},error:authError}=await db.auth.getUser();
  if(authError||!user)return reply({error:"Sesi berakhir. Masuk kembali; draf perangkat tetap tersedia."},401);
  let body;
  try{const text=await request.text();if(text.length>1600000)return reply({error:"Jawaban terlalu panjang."},413);body=parseUtsInput(JSON.parse(text));}
  catch{return reply({error:"Permintaan tidak valid."},400);}
  if(!body)return reply({error:"Periksa identitas, lima jawaban, dan pernyataan pengumpulan. Maksimal 50.000 karakter per jawaban."},400);
  if(body.expectedUserId!==user.id)return reply({error:"Akun telah berubah. Muat ulang sebelum menyimpan."},409);
  const {data:current,error:readError}=await db.from(UTS_TABLE).select(recordColumns).eq("user_id",user.id).maybeSingle();
  if(readError)return reply({error:"Penyimpanan belum dapat diakses. Coba kembali."},503);
  if(current?.status==="submitted")return reply({record:current,alreadySubmitted:true});
  if((current?.revision??0)!==body.revision)return reply({error:"Ada draf server yang lebih baru. Periksa dan muat versi server sebelum menyimpan lagi.",record:current},409);
  const values={display_name:body.display_name,student_number:body.student_number,class_name:body.class_name,answers:body.answers,status:body.intent==="submit"?"submitted":"draft",attested:body.intent==="submit"&&body.attested};
  const result=current
    ?await db.from(UTS_TABLE).update(values).eq("user_id",user.id).eq("revision",body.revision).eq("status","draft").select(recordColumns).maybeSingle()
    :await db.from(UTS_TABLE).insert({user_id:user.id,...values}).select(recordColumns).single();
  if(result.error||!result.data){
    const {data:latest}=await db.from(UTS_TABLE).select(recordColumns).eq("user_id",user.id).maybeSingle();
    if(latest?.status==="submitted")return reply({record:latest,alreadySubmitted:true});
    if(latest&&latest.revision!==body.revision)return reply({error:"Draf berubah pada perangkat lain. Muat versi server sebelum menyimpan lagi.",record:latest},409);
    return reply({error:"Jawaban belum berhasil disimpan. Draf perangkat tetap tersedia; coba lagi."},503);
  }
  return reply({record:result.data});
}
