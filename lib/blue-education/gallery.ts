import { focusOptions } from "./pilot";
export { focusOptions };
export const galleryKinds=[["praktik","Praktik lapangan"],["dokumentasi","Dokumentasi pembelajaran"],["rancangan","Contoh rancangan"]] as const;
export const galleryStatuses=[["draft","Draf"],["published","Terbit"],["archived","Arsip"]] as const;
export const galleryFields=[
 ["title","Judul",5,180],["institution","Sekolah, komunitas, atau penyelenggara",2,180],["district","Wilayah / kabupaten / kota",2,120],
 ["context","Konteks dan masalah",20,3000],["action","Langkah yang dilakukan / direncanakan",20,4000],
 ["results","Bukti hasil dan keterbatasan",20,4000],["lessons","Pelajaran dan tindak lanjut",20,3000],
] as const;
export type GalleryItem={id:string;title:string;institution:string;district:string;theme:string;kind:string;activity_date:string;context:string;action:string;results:string;lessons:string;source_url:string;image_url:string;image_alt:string;image_credit:string};
export type GalleryRecord=GalleryItem & {status:string;publication_confirmed:boolean;updated_at:string};
export type GalleryState={ok:boolean;message:string;errors?:Record<string,string>;id?:string;updatedAt?:string};
export function httpsUrl(value:string){
 try {const url=new URL(value);return url.protocol==="https:" && !url.username && !url.password && !!url.hostname && !/[\s<>]/.test(value);}catch{return false;}
}
export function galleryDate(value:string){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
 const d=new Date(value+"T00:00:00Z");return !Number.isNaN(d.getTime()) && d.toISOString().slice(0,10)===value;
}
export function parseGallery(form:FormData){
 const get=(key:string)=>typeof form.get(key)==="string"?String(form.get(key)).trim():"";
 const data={
  title:get("title"),institution:get("institution"),district:get("district"),theme:get("theme"),kind:get("kind"),
  activity_date:get("activity_date"),context:get("context"),action:get("action"),results:get("results"),lessons:get("lessons"),
  source_url:get("source_url"),image_url:get("image_url"),image_alt:get("image_alt"),image_credit:get("image_credit"),
  status:get("status"),publication_confirmed:form.get("publication_confirmed")==="accepted",
 };
 const errors:Record<string,string>={};
 for(const [key,label,min,max] of galleryFields)if(data[key].length<min || data[key].length>max)errors[key]=label+" harus berisi "+min+"–"+max+" karakter.";
 if(!focusOptions.some(([v])=>v===data.theme))errors.theme="Pilih tema.";
 if(!galleryKinds.some(([v])=>v===data.kind))errors.kind="Pilih jenis konten.";
 if(!galleryStatuses.some(([v])=>v===data.status))errors.status="Pilih status.";
 if(!galleryDate(data.activity_date))errors.activity_date="Isi tanggal yang valid.";
 if(!httpsUrl(data.source_url)||data.source_url.length>1500)errors.source_url="Isi tautan sumber HTTPS yang valid (maksimal 1.500 karakter).";
 if(data.image_url && (!httpsUrl(data.image_url)||data.image_url.length>1500))errors.image_url="Gunakan tautan langsung foto HTTPS (maksimal 1.500 karakter).";
 if(data.image_alt.length>300 || (data.image_url && data.image_alt.length<5))errors.image_alt="Foto memerlukan deskripsi 5–300 karakter.";
 if(data.image_credit.length>300 || (data.image_url && data.image_credit.length<2))errors.image_credit="Foto memerlukan kredit 2–300 karakter.";
 if(data.status==="published" && !data.publication_confirmed)errors.publication_confirmed="Konfirmasikan pemeriksaan sumber dan izin sebelum menerbitkan.";
 return {data,errors};
}
