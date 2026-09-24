import Link from "next/link";
import { requireControlCenterAccess } from "@/lib/ai-control-center/access";
import { pilotService } from "@/lib/blue-education/pilot-server";
import { focusOptions, readinessOptions, statusOptions } from "@/lib/blue-education/pilot";
import { updatePilot } from "./actions";
export const metadata={title:"Pendaftar Perintis Blue Education",robots:{index:false,follow:false}};
export const dynamic="force-dynamic";
export default async function PilotAdmin({searchParams}:{searchParams:Promise<{page?:string;status?:string;result?:string}>}){
 await requireControlCenterAccess();
 const params=await searchParams;
 const page=Math.max(1,Math.min(100000,Number.parseInt(params.page||"1",10)||1));
 const filter=statusOptions.some(([id])=>id===params.status)?params.status:"";
 let rows:Record<string,string>[]=[];let count=0;let failed=false;
 try{
  let query=pilotService().from("blue_education_pilot_registrations").select("id,created_at,updated_at,institution_type,institution_name,province,district,contact_name,contact_role,email,phone,focus,readiness,plan,status,notes",{count:"exact"}).order("created_at",{ascending:false}).range((page-1)*20,page*20-1);
  if(filter)query=query.eq("status",filter);
  const result=await query; if(result.error)failed=true;else{rows=result.data||[];count=result.count||0;}
 }catch{failed=true;}
 const messages:Record<string,string>={saved:"Status dan catatan berhasil disimpan.",invalid:"Isian tidak valid.",failed:"Perubahan belum tersimpan. Coba kembali.",conflict:"Data sudah berubah atau tidak ditemukan. Tinjau versi terbaru sebelum menyimpan."};
 const field="mt-2 w-full rounded border border-slate-400 bg-white p-3 text-slate-950";
 const pageUrl=(n:number)=>"/control-center/blue-education?page="+n+(filter?"&status="+filter:"");
 return <main lang="id" className="min-h-screen bg-stone-50 px-5 py-12 text-slate-950"><div className="mx-auto max-w-5xl">
  <Link href="/control-center" className="font-semibold text-teal-800 underline">← Control Center</Link>
  <h1 className="mt-6 text-3xl font-bold">Pendaftar Perintis Blue Education</h1><p className="mt-3 leading-7 text-slate-600">Daftar privat sekolah dan komunitas. Telaah kebutuhan, hubungi penanggung jawab secara terpisah, lalu catat tindak lanjut. Mengubah status tidak mengirim pesan.</p>
  <Link href="/control-center/blue-education/galeri" className="mt-5 inline-flex min-h-12 items-center rounded bg-teal-800 px-5 py-3 font-bold text-white">Kelola Galeri Praktik Baik</Link>
  {params.result && messages[params.result] && <p role="status" className="mt-5 rounded border border-teal-300 bg-teal-50 p-4">{messages[params.result]}</p>}
  <form className="mt-6 flex flex-wrap items-end gap-3"><label className="font-semibold">Filter status<select name="status" defaultValue={filter} className={field}><option value="">Semua status</option>{statusOptions.map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label><button className="min-h-12 rounded bg-teal-800 px-5 py-3 font-semibold text-white">Tampilkan</button></form>
  {failed?<p role="alert" className="mt-6 rounded bg-red-50 p-5 text-red-800">Data belum dapat dimuat. Ini bukan berarti daftar pendaftar kosong. Coba muat ulang.</p>:<>
   <p className="my-5">{count} pendaftaran{filter?" sesuai filter":""} · Halaman {page}</p>
   {rows.length===0 && <p className="rounded border bg-white p-6">Belum ada pendaftaran pada halaman ini.</p>}
   <div className="space-y-5">{rows.map(row=><article key={row.id} className="rounded-xl border border-stone-300 bg-white p-5 sm:p-7">
    <div className="flex flex-wrap justify-between gap-3"><div><p className="text-sm font-bold uppercase text-teal-800">{row.institution_type}</p><h2 className="mt-2 text-xl font-bold">{row.institution_name}</h2><p className="mt-1 text-slate-600">{row.district}, {row.province}</p></div><p className="font-semibold">{statusOptions.find(([id])=>id===row.status)?.[1]}</p></div>
    <p className="mt-4 break-all text-sm text-slate-500">Nomor: {row.id} · {new Date(row.created_at).toLocaleString("id-ID",{timeZone:"Asia/Jakarta"})} WIB</p>
    <details className="mt-4"><summary className="cursor-pointer py-2 font-bold text-teal-800">Kontak, rencana, dan tindak lanjut</summary>
     <dl className="mt-4 space-y-3 leading-7"><div><dt className="font-bold">Penanggung jawab</dt><dd>{row.contact_name} · {row.contact_role}</dd></div><div><dt className="font-bold">Email dan WhatsApp</dt><dd className="break-all">{row.email} · {row.phone||"WhatsApp tidak diisi"}</dd></div><div><dt className="font-bold">Fokus dan kesiapan</dt><dd>{focusOptions.find(([id])=>id===row.focus)?.[1]} · {readinessOptions.find(([id])=>id===row.readiness)?.[1]}</dd></div><div><dt className="font-bold">Rencana awal</dt><dd className="whitespace-pre-wrap break-words">{row.plan}</dd></div></dl>
     <form action={updatePilot} className="mt-6 border-t pt-5"><input type="hidden" name="id" value={row.id}/><input type="hidden" name="updated_at" value={row.updated_at}/>
      <label className="block font-semibold">Status tindak lanjut<select name="status" defaultValue={row.status} className={field}>{statusOptions.map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label>
      <label className="mt-4 block font-semibold">Catatan internal<textarea name="notes" rows={3} maxLength={5000} defaultValue={row.notes} className={field}/></label>
      <button className="mt-4 min-h-12 rounded bg-teal-800 px-5 py-3 font-semibold text-white">Simpan tindak lanjut</button>
     </form>
    </details>
   </article>)}</div>
   <nav aria-label="Halaman pendaftar" className="mt-7 flex gap-6">{page>1&&<Link href={pageUrl(page-1)} className="text-teal-800 underline">← Sebelumnya</Link>}{page*20<count&&<Link href={pageUrl(page+1)} className="text-teal-800 underline">Berikutnya →</Link>}</nav>
  </>}
 </div></main>;
}
