import Link from "next/link";
import { notFound } from "next/navigation";
import { utsLecturer } from "@/lib/kuliah/lecturer";
import { DOSEN_PATH, UTS_TABLE, recordColumns, questions, waktu, type UtsRecord } from "@/lib/kuliah/mayantara-uts";
export const dynamic="force-dynamic";
export const metadata={title:"Jawaban UTS · Hukum Kejahatan Mayantara",robots:{index:false,follow:false}};
export default async function Page({params}:{params:Promise<{id:string}>}){
  const {db,allowed}=await utsLecturer(DOSEN_PATH);if(!allowed)notFound();
  const {id}=await params;if(!/^[0-9a-f-]{36}$/i.test(id))notFound();
  const {data,error}=await db.from(UTS_TABLE).select(recordColumns).eq("id",id).eq("status","submitted").maybeSingle();
  if(error)return <main className="p-12"><h1>Jawaban belum dapat dimuat</h1><Link href={DOSEN_PATH}>Kembali ke daftar</Link></main>;
  if(!data)notFound();const work=data as UtsRecord;
  return <main lang="id" className="mx-auto max-w-4xl space-y-6 px-5 py-12"><Link href={DOSEN_PATH} className="text-teal-800 underline">← Daftar kiriman</Link><h1 className="text-3xl font-bold">{work.display_name}</h1><section className="rounded-2xl bg-teal-50 p-6"><p>NIM: {work.student_number}</p><p>Kelas / program studi: {work.class_name}</p><p>Dikirim: {waktu(work.submitted_at!)}</p><p className="break-all text-sm">Nomor bukti: {work.id}</p><p>Pengumpulan final · Pernyataan mahasiswa disetujui</p></section>{questions.map((q,i)=><article key={q.title} className="rounded-2xl border bg-white p-6"><p className="text-sm font-bold text-teal-800">SOAL {i+1} · {q.points} POIN</p><h2 className="mt-2 text-2xl font-bold">{q.title}</h2><p className="mt-5 whitespace-pre-wrap break-words leading-8">{work.answers[i]}</p></article>)}</main>;
}
