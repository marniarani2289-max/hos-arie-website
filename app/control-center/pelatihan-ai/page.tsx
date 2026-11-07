import Link from 'next/link';
import { requireControlCenterAccess } from '@/lib/ai-control-center/access';
import { trainingService } from '@/lib/training-assistant/server';
import { isDue, isClosed, jakartaDate, statuses, type Lead } from '@/lib/training-assistant/model';
import { updateLead } from './actions';
export const dynamic='force-dynamic';
export const metadata={title:'Asisten Pelatihan AI | Control Center',robots:{index:false,follow:false}};
const input='mt-2 w-full rounded-lg border border-slate-300 bg-white p-3 text-base';
const dateLabel=(s:string)=>new Intl.DateTimeFormat('id-ID',{dateStyle:'medium',timeZone:'Asia/Jakarta'}).format(new Date(s.length===10?`${s}T00:00:00+07:00`:s));
export default async function TrainingAssistant({searchParams}:{searchParams:Promise<{id?:string;status?:string;due?:string;page?:string;result?:string}>}) {
 await requireControlCenterAccess();
 const q=await searchParams;
 const page=Math.max(1,Math.min(100000,Number.parseInt(q.page||'1')||1));
 const today=jakartaDate(); let leads:Lead[]=[], total=0, dueCount=0, activeCount=0, selected:Lead|null=null, failed=false;
 try {
  const client=trainingService();
  let query=client.from('training_interest_leads').select('*',{count:'exact'});
  if(statuses.some(x=>x===q.status)) query=query.eq('status',q.status!);
  if(q.due==='1') query=query.lte('follow_up_on',today).not('status','in','("Terdaftar / sepakat","Ditutup")');
  const [list,due,active,detail]=await Promise.all([
   query.order('created_at',{ascending:false}).range((page-1)*25,page*25-1),
   client.from('training_interest_leads').select('id',{count:'exact',head:true}).lte('follow_up_on',today).not('status','in','("Terdaftar / sepakat","Ditutup")'),
   client.from('training_interest_leads').select('id',{count:'exact',head:true}).not('status','in','("Terdaftar / sepakat","Ditutup")'),
   q.id&&/^[0-9a-f-]{36}$/i.test(q.id)?client.from('training_interest_leads').select('*').eq('id',q.id).maybeSingle():Promise.resolve({data:null,error:null})
  ]);
  if(list.error||due.error||active.error||detail.error) throw new Error('storage');
  leads=(list.data||[]) as Lead[]; total=list.count||0; dueCount=due.count||0; activeCount=active.count||0; selected=detail.data as Lead|null;
 } catch {failed=true;}
 const results:Record<string,string>={saved:'Perubahan tersimpan.',invalid:'Periksa tanggal tindak lanjut dan status.',conflict:'Data sudah berubah di sesi lain. Muat ulang dan periksa sebelum menyimpan lagi.',unavailable:'Perubahan belum berhasil disimpan. Coba lagi.'};
 const pageHref=(n:number)=>`?${new URLSearchParams({page:String(n),...(q.status?{status:q.status}:{}),...(q.due?{due:q.due}:{})})}`;
 return <main lang="id" className="min-h-screen bg-slate-50 px-5 py-10 text-slate-950"><div className="mx-auto max-w-7xl">
 <Link href="/control-center" className="text-sm text-teal-800 underline">Control Center</Link>
 <header className="mt-5 flex flex-wrap items-end justify-between gap-5"><div><p className="font-semibold uppercase tracking-widest text-teal-800">Peserta & mitra</p><h1 className="mt-2 text-3xl font-bold sm:text-4xl">Asisten Pelatihan AI</h1><p className="mt-3 text-slate-600">Kelola kebutuhan, siapkan balasan, dan selesaikan tindak lanjut.</p></div><Link href="/pelatihan-ai/minat" className="rounded-xl bg-teal-800 px-5 py-3 font-semibold text-white">Buka formulir minat</Link></header>
 {failed ? <p role="alert" className="mt-8 rounded-xl bg-red-50 p-5 text-red-800">Data belum dapat dimuat. Periksa konfigurasi penyimpanan atau coba kembali.</p> : <>
 <div className="my-7 grid gap-4 sm:grid-cols-3"><Link href="?due=1" className="rounded-xl border border-amber-300 bg-amber-50 p-5"><p>Perlu tindak lanjut</p><strong className="mt-2 block text-3xl">{dueCount}</strong><p className="mt-2 text-sm">Jatuh tempo atau terlewat · WIB</p></Link><div className="rounded-xl border border-slate-200 bg-white p-5"><p>Kontak aktif</p><strong className="mt-2 block text-3xl">{activeCount}</strong></div><div className="rounded-xl border border-slate-200 bg-white p-5"><p>Hari ini</p><strong className="mt-3 block text-xl">{dateLabel(today)}</strong><p className="mt-2 text-sm text-slate-600">Pengingat kalender: pukul 09.00 WIB</p></div></div>
 {q.result&&results[q.result]&&<p role="status" className="mb-5 rounded-xl bg-teal-50 p-4">{results[q.result]}</p>}
 <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.1fr]">
 <section className="rounded-2xl border border-slate-200 bg-white p-5"><h2 className="text-xl font-bold">Daftar minat</h2><form className="my-5 flex flex-wrap items-end gap-3"><label className="grow text-sm">Status<select name="status" defaultValue={q.status||''} className={input}><option value="">Semua status</option>{statuses.map(x=><option key={x}>{x}</option>)}</select></label><label className="flex min-h-12 items-center gap-2 text-sm"><input type="checkbox" name="due" value="1" defaultChecked={q.due==='1'}/>Jatuh tempo</label><button className="rounded-lg bg-slate-900 px-4 py-3 text-white">Terapkan</button></form>
 <p className="mb-3 text-sm text-slate-600">{total} kontak sesuai filter</p>
 {leads.length===0?<p className="rounded-xl bg-slate-50 p-6">Belum ada kontak pada daftar ini. Bagikan formulir minat untuk mulai menerima kebutuhan.</p>:<ul className="divide-y divide-slate-200">{leads.map(lead=><li key={lead.id}><Link href={`?id=${lead.id}`} className={`block rounded-lg p-4 hover:bg-slate-50 ${q.id===lead.id?'bg-teal-50':''}`}><div className="flex flex-wrap justify-between gap-2"><strong>{lead.name}</strong><span className="text-sm text-teal-800">{lead.status}</span></div><p className="mt-1 text-sm text-slate-600">{lead.organization||'Guru perorangan'} · {lead.segment}</p><p className="mt-2 text-sm">{lead.topics.join(' · ')}</p><p className={`mt-3 text-sm font-semibold ${isDue(lead)?'text-amber-800':'text-slate-600'}`}>{lead.follow_up_on?`${isDue(lead)?'Perlu ditindaklanjuti':'Tindak lanjut'}: ${dateLabel(lead.follow_up_on)}`:'Selesai / ditutup'}</p></Link></li>)}</ul>}
 <nav aria-label="Halaman kontak" className="mt-5 flex justify-between text-sm text-teal-800">{page>1?<Link href={pageHref(page-1)}>Sebelumnya</Link>:<span/>}<span>Halaman {page}</span>{page*25<total?<Link href={pageHref(page+1)}>Berikutnya</Link>:<span/>}</nav></section>
 <section className="rounded-2xl border border-slate-200 bg-white p-6">{!selected?<><h2 className="text-xl font-bold">Ruang tindak lanjut</h2><p className="mt-4 leading-7 text-slate-600">Pilih kontak untuk melihat kebutuhan dan menyiapkan balasan. Draf awal disusun otomatis dari pilihan formulir, lalu dapat Bapak sunting sebelum dikirim melalui email atau WhatsApp.</p>{q.id&&<p className="mt-4 text-amber-800">Kontak tidak ditemukan.</p>}</>:<>
 <h2 className="text-2xl font-bold">{selected.name}</h2><p className="mt-2 text-slate-600">{selected.organization||'Guru perorangan'} · {selected.segment}</p>
 <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">{[['Email',selected.email],['WhatsApp',selected.phone||'Tidak dicantumkan'],['Pengalaman AI',selected.level],['Jumlah peserta',String(selected.participants)],['Format',selected.format],['Preferensi waktu',selected.timing||'Belum ditentukan']].map(([k,v])=><div key={k}><dt className="text-slate-500">{k}</dt><dd className="mt-1 break-words font-medium">{v}</dd></div>)}</dl>
 <div className="mt-5 rounded-xl bg-slate-50 p-4"><h3 className="font-semibold">Kebutuhan</h3><p className="mt-2">{selected.topics.join(', ')}</p><p className="mt-2 whitespace-pre-wrap text-sm leading-7">{selected.message||'Tidak ada catatan tambahan.'}</p></div>
 <form action={updateLead} className="mt-6 space-y-5"><input type="hidden" name="id" value={selected.id}/><input type="hidden" name="version" value={selected.version}/><label className="block font-semibold">Draf balasan<textarea name="draft" defaultValue={selected.draft} key={`${selected.id}-${selected.version}-draft`} rows={13} maxLength={10000} className={`${input} font-normal leading-7`}/></label><p className="text-sm text-slate-600">Simpan perubahan, kemudian salin teks untuk dikirim melalui kanal pilihan Anda. Penyimpanan tidak mengirim pesan atau mengubah status menjadi sudah dihubungi.</p>
 <div className="grid gap-4 sm:grid-cols-2"><label>Status<select className={input} name="status" key={`${selected.id}-${selected.version}-status`} defaultValue={selected.status}>{statuses.map(x=><option key={x}>{x}</option>)}</select></label><label>Tindak lanjut (WIB)<input className={input} type="date" name="follow_up_on" defaultValue={selected.follow_up_on||''} key={`${selected.id}-${selected.version}-date`}/></label></div><p className="text-sm text-slate-500">Tanggal wajib untuk kontak aktif. Status terdaftar/sepakat atau ditutup menghentikan pengingat di dashboard.</p>
 <label className="block">Catatan pengelola<textarea name="notes" key={`${selected.id}-${selected.version}-notes`} defaultValue={selected.notes} rows={3} maxLength={5000} className={input}/></label><div className="flex flex-wrap items-center gap-4"><button className="rounded-xl bg-teal-800 px-5 py-3 font-semibold text-white">Simpan tindak lanjut</button>{selected.follow_up_on&&!isClosed(selected.status)&&<a href={`/api/training-assistant/calendar?id=${selected.id}`} className="font-semibold text-teal-800 underline">Unduh pengingat kalender</a>}</div><p className="text-sm leading-6 text-slate-500">Impor berkas kalender untuk menerima pengingat 15 menit sebelum pukul 09.00 WIB. Jika tanggal berubah atau kontak ditutup, perbarui/hapus acara kalender yang sebelumnya diimpor.</p></form>
 </>}</section></div></>}
 </div></main>;
}
