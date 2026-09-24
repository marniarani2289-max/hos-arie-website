import Link from "next/link";
import { requireControlCenterAccess } from "@/lib/ai-control-center/access";
import { pilotService } from "@/lib/blue-education/pilot-server";
import { uuidPattern } from "@/lib/blue-education/pilot";
import { galleryKinds, galleryStatuses } from "@/lib/blue-education/gallery";
import type { GalleryRecord } from "@/lib/blue-education/gallery";
import GalleryEditor from "./GalleryEditor";
export const dynamic="force-dynamic";
export const metadata={title:"Kelola Galeri Praktik Baik",robots:{index:false,follow:false}};
export default async function GalleryAdmin({searchParams}:{searchParams:Promise<{edit?:string;page?:string}>}){
 await requireControlCenterAccess();const params=await searchParams;
 const page=Math.max(1,Math.min(100000,Number.parseInt(params.page||"1",10)||1));
 let failed=false;let selected:GalleryRecord|undefined;let rows:{id:string;title:string;kind:string;district:string;status:string}[]=[];let total=0;
 try{
  const db=pilotService();
  const result=await db.from("blue_education_gallery").select("id,title,kind,district,status",{count:"exact"}).order("updated_at",{ascending:false}).range((page-1)*20,page*20-1);
  if(result.error)failed=true;else{rows=result.data||[];total=result.count||0;}
  if(params.edit && params.edit!=="new"){
   if(!uuidPattern.test(params.edit))failed=true;
   else{const r=await db.from("blue_education_gallery").select("*").eq("id",params.edit).maybeSingle();if(r.error||!r.data)failed=true;else selected=r.data as GalleryRecord;}
  }
 }catch{failed=true;}
 return <main lang="id" className="min-h-screen bg-stone-50 px-5 py-12 text-slate-950"><div className="mx-auto max-w-5xl">
  <Link href="/control-center/blue-education" className="font-semibold text-teal-800 underline">← Pengelolaan Blue Education</Link>
  <h1 className="mt-6 text-3xl font-bold">Kelola Galeri Praktik Baik</h1><p className="mt-3 leading-7 text-slate-600">Simpan draf, telaah sumber dan izin dokumentasi, lalu terbitkan. Arsipkan untuk menyembunyikan konten dari halaman publik.</p>
  <div className="my-6 flex flex-wrap gap-4"><Link href="/control-center/blue-education/galeri?edit=new" className="rounded bg-teal-800 px-5 py-3 font-bold text-white">Tambah dokumentasi</Link><Link href="/blue-education#galeri-praktik" className="rounded border border-teal-800 px-5 py-3 font-semibold text-teal-800">Lihat galeri publik</Link></div>
  {failed?<p role="alert" className="rounded bg-red-50 p-5 text-red-800">Data tidak dapat dimuat atau entri tidak ditemukan. Muat ulang melalui daftar galeri.</p>:<>
   {params.edit && <section className="mb-8 rounded-xl border bg-white p-5 sm:p-8"><h2 className="text-2xl font-bold">{selected?"Sunting dokumentasi":"Dokumentasi baru"}</h2><GalleryEditor key={selected?.id||"new"} initial={selected}/></section>}
   <h2 className="text-xl font-bold">Daftar dokumentasi ({total})</h2>
   {rows.length===0?<p className="mt-4">Belum ada dokumentasi pada halaman ini.</p>:<div className="mt-5 space-y-3">{rows.map(row=><article key={row.id} className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-white p-5"><div><h3 className="font-bold">{row.title}</h3><p className="mt-1 text-sm text-slate-600">{row.district} · {galleryKinds.find(([id])=>id===row.kind)?.[1]} · {galleryStatuses.find(([id])=>id===row.status)?.[1]}</p></div><Link href={"/control-center/blue-education/galeri?edit="+row.id} className="font-bold text-teal-800 underline">Sunting</Link></article>)}</div>}
   <nav aria-label="Halaman dokumentasi" className="mt-6 flex gap-6">{page>1&&<Link href={"?page="+(page-1)} className="text-teal-800 underline">← Sebelumnya</Link>}{page*20<total&&<Link href={"?page="+(page+1)} className="text-teal-800 underline">Berikutnya →</Link>}</nav>
  </>}
 </div></main>;
}
