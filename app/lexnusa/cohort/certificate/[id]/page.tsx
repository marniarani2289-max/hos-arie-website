import Link from 'next/link';
import {notFound} from 'next/navigation';
import {session} from '@/lib/lexnusa/cohort-access';
import PrintButton from './PrintButton';
export const metadata={title:'Sertifikat Penyelesaian | LexNusa',robots:{index:false,follow:false}};
export default async function Page({params}:{params:Promise<{id:string}>}){
 const {id}=await params;const {supabase}=await session();
 if(!/^[0-9a-f-]{36}$/i.test(id))notFound();
 const {data:c}=await supabase.from('lexnusa_cohort_certificates').select('*').eq('id',id).maybeSingle();if(!c)notFound();
 return <main className="mx-auto max-w-4xl px-6 py-16"><div className="mb-8 flex justify-between print:hidden"><Link href="/lexnusa/cohort/workspace" className="underline">Ruang praktik</Link><PrintButton/></div><article className="border-4 border-amber-600 bg-white p-10 text-center text-slate-900"><p className="font-bold tracking-widest text-teal-800">LEXNUSA LEGAL AI · COHORT</p><h1 className="my-8 text-4xl font-bold">Sertifikat Penyelesaian</h1>{c.revoked_at&&<p className="font-bold text-red-700">SERTIFIKAT DICABUT</p>}<p>Diberikan kepada</p><h2 className="my-6 text-3xl font-bold">{c.recipient_name}</h2><p>Telah menyelesaikan praktik lima tahap</p><h3 className="my-5 text-2xl font-bold">{c.title}</h3><p>Memahami kebutuhan · Menyusun instruksi · Membuat draf · Memeriksa · Merevisi</p><p className="mt-8">Nilai peserta: {c.participant_score}/100 · Diverifikasi fasilitator</p><p className="mt-3">Diterbitkan {new Date(c.issued_at).toLocaleDateString('id-ID',{dateStyle:'long',timeZone:'Asia/Jakarta'})}</p><p className="mt-8 break-all text-xs">Nomor: LN-{c.id}</p><Link href={`/lexnusa/cohort/verify/${c.id}`} className="mt-3 block break-all text-sm underline">https://www.hossibarani.com/lexnusa/cohort/verify/{c.id}</Link><p className="mt-6 text-xs text-slate-600">Bukti penyelesaian pelatihan. Bukan sertifikasi profesi atau jaminan keabsahan suatu kontrak.</p></article></main>;
}
