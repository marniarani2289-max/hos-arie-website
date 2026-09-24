import { createHash, createHmac } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { pilotService } from "@/lib/blue-education/pilot-server";
import { consentVersion, uuidPattern, validatePilot } from "@/lib/blue-education/pilot";
export const runtime = "nodejs";
function reply(body: object, status=200) { return NextResponse.json(body,{status,headers:{"Cache-Control":"no-store"}}); }
export async function POST(request: NextRequest) {
 const origin=request.headers.get("origin");
 const allowed = new Set([request.nextUrl.origin,"https://www.hossibarani.com","https://hossibarani.com"]);
 if(!origin || !allowed.has(origin)) return reply({error:"Permintaan tidak diizinkan. Buka formulir melalui website."},403);
 if(!request.headers.get("content-type")?.includes("application/json")) return reply({error:"Format permintaan tidak valid."},415);
 if(Number(request.headers.get("content-length"))>20000) return reply({error:"Isian terlalu panjang."},413);
 let raw: Record<string,unknown>;
 try {
  const reader=request.body?.getReader(); if(!reader) return reply({error:"Isian tidak terbaca."},400);
  const chunks: Uint8Array[]=[]; let size=0;
  while(true){const {done,value}=await reader.read(); if(done)break;size+=value.byteLength;if(size>20000){await reader.cancel();return reply({error:"Isian terlalu panjang."},413);}chunks.push(value);}
  const parsed:unknown=JSON.parse(Buffer.concat(chunks).toString("utf8"));
  if(!parsed || typeof parsed!=="object" || Array.isArray(parsed)) return reply({error:"Isian tidak valid."},400);
  raw=parsed as Record<string,unknown>;
 } catch { return reply({error:"Isian tidak terbaca. Silakan coba kembali."},400); }
 if(raw.website) return reply({error:"Pendaftaran tidak dapat diproses."},400);
 const {data,errors}=validatePilot(raw);
 if(Object.keys(errors).length) return reply({error:"Periksa isian yang ditandai.",errors},422);
 const requestId=raw.requestId;
 if(typeof requestId!=="string" || !uuidPattern.test(requestId)) return reply({error:"Muat ulang halaman, lalu kirim kembali."},400);
 try {
  const db=pilotService();
  const ip=request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const secret=process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const rateKeys=[["ip:"+ip,10],["email:"+data.email,5]] as const;
  for(const [value,limit] of rateKeys) {
   const key=createHmac("sha256",secret).update("blue-pilot-v1:"+value).digest("hex");
   const {data:ok,error}=await db.rpc("lexnusa_check_rate_limit",{p_key:key,p_limit:limit,p_window_seconds:900});
   if(error) { console.error("Blue pilot rate check failed",error.code); return reply({error:"Layanan sedang tidak tersedia. Isian tetap ada; coba lagi nanti."},503); }
   if(!ok) return reply({error:"Terlalu banyak percobaan. Tunggu 15 menit sebelum mencoba kembali."},429);
  }
  const hash=createHash("sha256").update(JSON.stringify(data)).digest("hex");
  const {data:existing,error:lookupError}=await db.from("blue_education_pilot_registrations").select("id,request_hash").eq("id",requestId).maybeSingle();
  if(lookupError) throw new Error("lookup_failed");
  if(existing) return existing.request_hash===hash ? reply({ok:true,reference:existing.id}) : reply({error:"Isian berbeda dari pengiriman sebelumnya. Muat ulang halaman untuk pendaftaran baru."},409);
  const {consent: _consent,...record}=data;
  const {error}=await db.from("blue_education_pilot_registrations").insert({...record,id:requestId,request_hash:hash,consent_version:consentVersion});
  if(error) {
   if(error.code==="23505") {
    const {data:retry}=await db.from("blue_education_pilot_registrations").select("id,request_hash").eq("id",requestId).maybeSingle();
    if(retry?.request_hash===hash) return reply({ok:true,reference:retry.id});
   }
   console.error("Blue pilot insert failed",error.code);
   return reply({error:"Pendaftaran belum dapat dikonfirmasi. Isian tetap ada; coba kirim kembali."},503);
  }
  return reply({ok:true,reference:requestId},201);
 } catch { console.error("Blue pilot capture unavailable");return reply({error:"Pendaftaran belum dapat dikonfirmasi. Isian tetap ada; coba lagi nanti."},503); }
}
