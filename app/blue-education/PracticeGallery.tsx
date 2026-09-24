"use client";
import Image from "next/image";
import { useState } from "react";
import { BookOpen, Waves, ArrowUpRight } from "lucide-react";
import { focusOptions, galleryKinds } from "@/lib/blue-education/gallery";
import type { GalleryItem } from "@/lib/blue-education/gallery";
import s from "./PracticeGallery.module.css";

function Cover({item}:{item:GalleryItem}){
 const [failed,setFailed]=useState(false);
 return item.image_url && !failed ? <figure className={s.photo}><Image src={item.image_url} alt={item.image_alt} width={960} height={600} unoptimized loading="lazy" referrerPolicy="no-referrer" onError={()=>setFailed(true)}/><figcaption>{item.image_credit}</figcaption></figure> :
 <div className={s.cover}><Waves size={40} aria-hidden="true"/><span>{item.kind==="praktik"?"Catatan lapangan":item.kind==="rancangan"?"Inspirasi untuk dicoba":"Belajar bersama"}</span><small>{item.image_url?"Foto belum dapat dimuat":"Dokumentasi berbasis sumber"}</small></div>;
}
export default function PracticeGallery({items,unavailable=false}:{items:GalleryItem[];unavailable?:boolean}){
 const [query,setQuery]=useState("");const [theme,setTheme]=useState("");const [district,setDistrict]=useState("");const [kind,setKind]=useState("");
 const regions=[...new Set(items.map(i=>i.district))].sort((a,b)=>a.localeCompare(b,"id"));
 const q=query.trim().toLocaleLowerCase("id");
 const filtered=items.filter(item=>(!theme||item.theme===theme)&&(!district||item.district===district)&&(!kind||item.kind===kind)&&(!q||[item.title,item.institution,item.district,item.context,item.action,item.results,item.lessons].join(" ").toLocaleLowerCase("id").includes(q)));
 const [limit,setLimit]=useState(6);
 const changed=()=>setLimit(6);
 const reset=()=>{setQuery("");setTheme("");setDistrict("");setKind("");changed();};
 return <div>
  <div className={s.filters} role="search" aria-label="Cari praktik baik">
   <label>Cari judul atau lembaga<input type="search" value={query} maxLength={160} onChange={e=>{setQuery(e.target.value);changed();}} placeholder="Cari gagasan atau pengalaman…"/></label>
   <label>Tema<select value={theme} onChange={e=>{setTheme(e.target.value);changed();}}><option value="">Semua tema</option>{focusOptions.map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label>
   <label>Wilayah<select value={district} onChange={e=>{setDistrict(e.target.value);changed();}}><option value="">Semua wilayah</option>{regions.map(v=><option key={v} value={v}>{v}</option>)}</select></label>
   <label>Jenis konten<select value={kind} onChange={e=>{setKind(e.target.value);changed();}}><option value="">Semua jenis</option>{galleryKinds.map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label>
  </div>
  <div className={s.resultsBar}><p role="status">{unavailable?"Galeri belum dapat dimuat. Coba muat ulang halaman.":filtered.length+" dokumentasi sesuai pilihan Anda."}</p><button type="button" onClick={reset} className={s.reset}>Reset filter</button></div>
  {!unavailable && filtered.length===0 && <div className={s.empty}><BookOpen size={30} aria-hidden="true"/><h3>{items.length?"Belum ada hasil yang sesuai.":"Galeri sedang menghimpun dokumentasi."}</h3><p>{items.length?"Ubah kata pencarian atau reset filter untuk melihat dokumentasi lainnya.":"Sekolah dan komunitas dapat menyiapkan catatan praktik untuk ditelaah pengelola."}</p></div>}
  <div className={s.grid}>{filtered.slice(0,limit).map(item=><article className={s.card} key={item.id} id={"praktik-"+item.id}>
   <Cover key={item.image_url} item={item}/>
   <div className={s.body}><div className={s.badges}><span>{galleryKinds.find(([v])=>v===item.kind)?.[1]}</span><span>{focusOptions.find(([v])=>v===item.theme)?.[1]}</span></div>
    <h3>{item.title}</h3><p className={s.meta}>{item.institution}<br/>{item.district} · <time dateTime={item.activity_date}>{new Date(item.activity_date+"T00:00:00Z").toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"})}</time></p>
    {item.kind==="rancangan" && <p className={s.notice}>Contoh rancangan untuk diadaptasi; belum merupakan laporan pelaksanaan.</p>}
    {item.kind==="dokumentasi" && <p className={s.notice}>Bahan pembelajaran; bukan laporan dampak praktik sekolah.</p>}
    <p>{item.context}</p>
    <details className={s.detail}><summary>Baca langkah, bukti, dan pelajaran</summary><div>
     <h4>{item.kind==="rancangan"?"Langkah yang direncanakan":"Langkah / kegiatan"}</h4><p>{item.action}</p>
     <h4>Bukti hasil dan keterbatasan</h4><p>{item.results}</p>
     <h4>Pelajaran dan tindak lanjut</h4><p>{item.lessons}</p>
    </div></details>
    <a className={s.source} href={item.source_url} target="_blank" rel="noopener noreferrer">Buka sumber / dokumentasi <ArrowUpRight size={16} aria-hidden="true"/><span className={s.srOnly}> (tab baru)</span></a>
   </div>
  </article>)}</div>
  {filtered.length>limit && <button type="button" className={s.more} onClick={()=>setLimit(limit+6)}>Tampilkan lebih banyak</button>}
  <div className={s.invitation}><div><p className={s.kicker}>Bagikan pengalaman lembaga Anda</p><h3>Dari satu aksi, lahir pelajaran bersama.</h3><p>Siapkan konteks, langkah, hasil beserta bukti, keterbatasan, dan pelajaran. Sertakan sumber serta izin penggunaan foto. Pengelola menelaah materi sebelum menerbitkannya.</p></div><div className={s.inviteActions}><a href="#pendaftaran">Daftarkan sekolah / komunitas</a><a href="mailto:riesib8@gmail.com?subject=Usulan%20Praktik%20Baik%20Blue%20Education">Kirim usulan dokumentasi</a></div></div>
 </div>;
}
