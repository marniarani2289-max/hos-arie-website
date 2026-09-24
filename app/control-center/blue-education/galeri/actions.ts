"use server";
import { revalidatePath } from "next/cache";
import { requireControlCenterAccess } from "@/lib/ai-control-center/access";
import { pilotService } from "@/lib/blue-education/pilot-server";
import { parseGallery } from "@/lib/blue-education/gallery";
import type { GalleryState } from "@/lib/blue-education/gallery";
import { uuidPattern } from "@/lib/blue-education/pilot";
export async function saveGallery(_previous:GalleryState,form:FormData):Promise<GalleryState>{
 await requireControlCenterAccess();
 const {data,errors}=parseGallery(form);
 if(Object.keys(errors).length)return {..._previous,ok:false,message:"Periksa isian yang ditandai. Perubahan belum disimpan.",errors};
 const id=String(form.get("id")||"");const version=String(form.get("updated_at")||"");
 if(id && (!uuidPattern.test(id)||!version))return {..._previous,ok:false,message:"Identitas atau versi data tidak valid. Muat ulang halaman."};
 try{
  const db=pilotService();const now=new Date().toISOString();
  const response=id
   ?await db.from("blue_education_gallery").update({...data,updated_at:now}).eq("id",id).eq("updated_at",version).select("id,updated_at").maybeSingle()
   :await db.from("blue_education_gallery").insert({...data,updated_at:now}).select("id,updated_at").single();
  if(response.error)return {..._previous,ok:false,message:"Penyimpanan gagal. Isian tetap tersedia; silakan coba kembali."};
  if(!response.data)return {..._previous,ok:false,message:"Entri telah berubah. Buka ulang dari daftar galeri untuk menghindari menimpa perubahan lain."};
  revalidatePath("/blue-education");revalidatePath("/control-center/blue-education/galeri");
  return {ok:true,message:data.status==="published"?"Dokumentasi diterbitkan di galeri.":data.status==="archived"?"Entri diarsipkan dan disembunyikan dari galeri publik.":"Draf tersimpan. Belum ditampilkan kepada publik.",id:response.data.id,updatedAt:response.data.updated_at};
 }catch{return {..._previous,ok:false,message:"Penyimpanan belum dapat dikonfirmasi. Buka daftar galeri untuk memeriksa sebelum mengirim ulang."};}
}
