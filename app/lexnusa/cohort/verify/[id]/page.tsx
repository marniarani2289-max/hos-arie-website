import {notFound} from 'next/navigation';
import {createClient} from '@/lib/supabase/server';
export const metadata={title:'Verifikasi Sertifikat | LexNusa',robots:{index:false,follow:false}};
export default async function Page({params}:{params:Promise<{id:string}>}){
 const {id}=await params;if(!/^[0-9a-f-]{36}$/i.test(id))notFound();const supabase=await createClient();
 const {data,error}=await supabase.rpc('lexnusa_verify_certificate',{p_id:id});
 if(error)return <main className="p-10"><h1>Verifikasi sementara tidak tersedia</h1><p>Coba kembali nanti.</p></main>;
 const c=data?.[0];if(!c)notFound();
 return <main className="mx-auto max-w-2xl px-6 py-20"><p className="font-bold text-teal-800">LEXNUSA COHORT</p><h1 className="mt-5 text-3xl font-bold">{c.status==='valid'?'Sertifikat tercatat dan berlaku':'Sertifikat telah dicabut'}</h1><p className="mt-5">{c.title}</p><p className="mt-3">Diterbitkan {new Date(c.issued_at).toLocaleDateString('id-ID')}</p><p className="mt-5 break-all text-sm">Nomor: LN-{c.certificate_id}</p><p className="mt-6">Cocokkan nomor ini dengan sertifikat yang ditunjukkan pemilik. Nama dan pekerjaan peserta tidak ditampilkan pada halaman publik.</p></main>;
}
