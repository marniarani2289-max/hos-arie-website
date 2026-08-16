"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronDown, ChevronUp, Clock, FileText, Headphones, RotateCcw, Save } from "lucide-react";
import { saveModuleProgress } from "@/lib/learning-progress";

type AnswerMap = Record<number, string>;
const STORAGE_KEY = "rahi-module-2-v1";

const nav = [
  ["introduction", "Pengantar"], ["reading", "Dua belas pasal"], ["analysis", "Kerangka etika"],
  ["podcast", "Podcast"], ["reflection", "Refleksi"], ["essay", "Esai"], ["quiz", "Kuis"], ["result", "Hasil"],
];

const pasals = [
  { n:"I", title:"Agama sebagai orientasi hidup", text:`Barang siapa tiada memegang agama,
sekali-kali tiada boleh dibilangkan nama.

Barang siapa mengenal yang empat,
maka ia itulah orang yang ma'rifat.

Barang siapa mengenal Allah,
suruh dan tegahnya tiada ia menyalah.

Barang siapa mengenal diri,
maka telah mengenal akan Tuhan yang bahri.

Barang siapa mengenal dunia,
tahulah ia barang yang terpedaya.

Barang siapa mengenal akhirat,
tahulah ia dunia mudarat.`, meaning:"Pasal pertama meletakkan agama sebagai dasar pengenalan diri, tujuan hidup, dan pertanggungjawaban moral." },
  { n:"II", title:"Kewajiban dan hubungan moral", text:`Barang siapa mengenal yang tersebut,
tahulah ia makna takut.

Barang siapa meninggalkan sembahyang,
seperti rumah tiada bertiang.

Barang siapa meninggalkan puasa,
tidaklah mendapat dua termasa.

Barang siapa meninggalkan zakat,
tiadalah hartanya beroleh berkat.

Barang siapa meninggalkan haji,
tiadalah ia menyempurnakan janji.`, meaning:"Keimanan diterjemahkan menjadi kesadaran akan kewajiban, batas, dan akibat dari tindakan manusia." },
  { n:"III", title:"Pengendalian pancaindra", text:`Apabila terpelihara mata,
sedikitlah cita-cita.

Apabila terpelihara kuping,
khabar yang jahat tiadalah damping.

Apabila terpelihara lidah,
niscaya dapat daripadanya faedah.

Bersungguh-sungguh engkau memeliharakan tangan,
daripada segala berat dan ringan.

Apabila perut terlalu penuh,
keluarlah fi'il yang tiada senonoh.

Anggota tengah hendaklah ingat,
di situlah banyak orang yang hilang semangat.

Hendaklah peliharakan kaki,
daripada berjalan yang membawa rugi.`, meaning:"Mata, telinga, lidah, tangan, perut, anggota tubuh, dan kaki perlu diarahkan agar tidak menjadi jalan kerusakan." },
  { n:"IV", title:"Penyakit hati dan pembentukan batin", text:`Hati itu kerajaan di dalam tubuh,
jikalau zalim segala anggota pun rubuh.

Apabila dengki sudah bertanah,
datanglah daripadanya beberapa anak panah.

Mengumpat dan memuji hendaklah pikir,
di situlah banyak orang yang tergelincir.

Pekerjaan marah jangan dibela,
nanti hilang akal di kepala.

Jika sedikit pun berbuat bohong,
boleh diumpamakan mulutnya itu pekong.

Tanda orang yang amat celaka,
aib dirinya tiada ia sangka.

Bakhil jangan diberi singgah,
itulah perampok yang amat gagah.

Barang siapa yang sudah besar,
janganlah kelakuannya membuat kasar.

Barang siapa perkataan kotor,
mulutnya itu umpama ketor.

Di mana tahu salah diri,
jika tidak orang lain yang berperi.`, meaning:"Karakter lahir dari keadaan batin. Dengki, marah, bohong, bakhil, dan takabur merusak diri sekaligus hubungan sosial." },
  { n:"V", title:"Mengenali kualitas seseorang", text:`Jika hendak mengenal orang berbangsa,
lihat kepada budi dan bahasa.

Jika hendak mengenal orang yang berbahagia,
sangat memeliharakan yang sia-sia.

Jika hendak mengenal orang mulia,
lihatlah kepada kelakuan dia.

Jika hendak mengenal orang yang berilmu,
bertanya dan belajar tiadalah jemu.

Jika hendak mengenal orang yang berakal,
di dalam dunia mengambil bekal.

Jika hendak mengenal orang yang baik perangai,
lihat pada ketika bercampur dengan orang ramai.`, meaning:"Nilai seseorang tidak hanya dibaca dari kedudukan, tetapi dari budi, bahasa, pergaulan, dan tindakannya." },
  { n:"VI", title:"Memilih sahabat, guru, dan pasangan", text:`Cahari olehmu akan sahabat,
yang boleh dijadikan obat.

Cahari olehmu akan guru,
yang boleh tahukan tiap seteru.

Cahari olehmu akan isteri,
yang boleh menyerahkan diri.

Cahari olehmu akan kawan,
pilih segala orang yang setiawan.

Cahari olehmu akan abdi,
yang ada baik sedikit budi.`, meaning:"Lingkungan pergaulan ikut membentuk watak. Karena itu, relasi perlu dibangun berdasarkan ilmu, kesetiaan, dan kebajikan." },
  { n:"VII", title:"Disiplin perkataan dan perbuatan", text:`Apabila banyak berkata-kata,
di situlah jalan masuk dusta.

Apabila banyak berlebih-lebihan suka,
itulah tanda hampirkan duka.

Apabila kita kurang siasat,
itulah tanda pekerjaan hendak sesat.

Apabila anak tidak dilatih,
jika besar bapanya letih.

Apabila banyak mencela orang,
itulah tanda dirinya kurang.

Apabila orang yang banyak tidur,
sia-sia sahajalah umur.

Apabila mendengar akan khabar,
menerimanya itu hendaklah sabar.

Apabila mendengar akan aduan,
membicarakannya itu hendaklah cemburuan.

Apabila perkataan yang lemah-lembut,
lekaslah segala orang mengikut.

Apabila perkataan yang amat kasar,
lekaslah orang sekalian gusar.

Apabila pekerjaan yang amat benar,
tidak boleh orang berbuat onar.`, meaning:"Pasal ini mengingatkan bahaya kata berlebihan, celaan, kemarahan, kelalaian, dan tindakan tanpa pertimbangan." },
  { n:"VIII", title:"Introspeksi dan kejujuran moral", text:`Barang siapa khianat akan dirinya,
apalagi kepada lainnya.

Kepada dirinya ia aniaya,
orang itu jangan engkau percaya.

Lidah yang suka membenarkan dirinya,
daripada yang lain dapat kesalahannya.

Daripada memuji diri hendaklah sabar,
biar daripada orang datangnya khabar.

Orang yang suka menampakkan jasa,
setengah daripada syirik mengaku kuasa.

Kejahatan diri sembunyikan,
kebaikan diri diamkan.

Keaiban orang jangan dibuka,
keaiban diri hendaklah sangka.`, meaning:"Manusia harus memeriksa dirinya sebelum menilai orang lain. Integritas dimulai dari kejujuran terhadap diri sendiri." },
  { n:"IX", title:"Menjaga diri dari pengaruh buruk", text:`Tahu pekerjaan tak baik, tetapi dikerjakan,
bukannya manusia yaitulah syaitan.

Kejahatan seorang perempuan tua,
itulah iblis punya penggawa.

Kepada segala hamba-hamba raja,
di situlah syaitan tempatnya manja.

Kebanyakan orang yang muda-muda,
di situlah syaitan tempat berkuda.

Perkumpulan laki-laki dengan perempuan,
di situlah syaitan punya jamuan.

Adapun orang tua yang hemat,
syaitan tak suka membuat sahabat.

Jika orang muda kuat berguru,
dengan syaitan jadi berseteru.`, meaning:"Godaan bekerja melalui kelemahan diri dan lingkungan. Pendidikan karakter membutuhkan kewaspadaan dan kebiasaan baik." },
  { n:"X", title:"Etika keluarga", text:`Dengan bapa jangan durhaka,
supaya Allah tidak murka.

Dengan ibu hendaklah hormat,
supaya badan dapat selamat.

Dengan anak janganlah lalai,
supaya boleh naik ke tengah balai.

Dengan isteri dan gundik janganlah alpa,
supaya kemaluan jangan menerpa.

Dengan kawan hendaklah adil,
supaya tangannya jadi kafil.`, meaning:"Keluarga merupakan sekolah karakter pertama: menghormati orang tua, mendidik anak, serta menjaga pasangan dan persahabatan." },
  { n:"XI", title:"Etika sosial dan kepemimpinan", text:`Hendaklah berjasa,
kepada yang sebangsa.

Hendaklah jadi kepala,
buang perangai yang cela.

Hendaklah memegang amanat,
buanglah khianat.

Hendak marah,
dahulukan hujah.

Hendak dimalui,
jangan memalui.

Hendak ramai,
murahkan perangai.`, meaning:"Karakter yang baik tidak berhenti pada kesalehan pribadi, tetapi berkembang menjadi kerja, amanah, kepemimpinan, dan kemanfaatan sosial." },
  { n:"XII", title:"Keadilan, pemerintahan, dan akhir kehidupan", text:`Raja mufakat dengan menteri,
seperti kebun berpagarkan duri.

Betul hati kepada raja,
tanda jadi sebarang kerja.

Hukum adil atas rakyat,
tanda raja beroleh inayat.

Kasihan orang yang berilmu,
tanda rahmat atas dirimu.

Hormat akan orang yang pandai,
tanda mengenal kasa dan cindai.

Ingatkan dirinya mati,
itulah asal berbuat bakti.

Akhirat itu terlalu nyata,
kepada hati yang tidak buta.`, meaning:"Pasal terakhir menghubungkan mufakat, penghormatan, keadilan hukum, kehidupan akhirat, dan pertanggungjawaban pemegang kekuasaan." },
];

const questions = [
  { q:"Bentuk dasar gurindam dalam Gurindam Dua Belas menekankan…", o:["Cerita panjang tanpa hubungan", "Hubungan syarat, sebab, atau perilaku dengan akibat", "Daftar tahun sejarah", "Dialog antara raja"], a:1 },
  { q:"Pasal yang meletakkan agama sebagai orientasi hidup adalah…", o:["Pasal I", "Pasal V", "Pasal VIII", "Pasal XII"], a:0 },
  { q:"Pokok perhatian Pasal III adalah…", o:["Silsilah kerajaan", "Pengendalian pancaindra dan anggota tubuh", "Perdagangan", "Peperangan"], a:1 },
  { q:"Ungkapan hati sebagai kerajaan di dalam tubuh menunjukkan bahwa…", o:["Kedudukan sosial menentukan moral", "Keadaan batin memengaruhi tindakan seluruh anggota tubuh", "Hukum tidak diperlukan", "Bahasa tidak berhubungan dengan karakter"], a:1 },
  { q:"Menurut Pasal V, orang berbangsa dikenali melalui…", o:["Harta dan jabatan", "Budi dan bahasa", "Usia dan keturunan", "Pakaian dan rumah"], a:1 },
  { q:"Pasal VI terutama mengajarkan…", o:["Pemilihan relasi yang mendukung kebajikan", "Teknik menulis sejarah", "Administrasi kerajaan", "Ilmu pelayaran"], a:0 },
  { q:"Introspeksi dan kejujuran terhadap diri sendiri terutama dibahas pada…", o:["Pasal II", "Pasal IV", "Pasal VIII", "Pasal XI"], a:2 },
  { q:"Etika keluarga dibahas secara khusus pada…", o:["Pasal III", "Pasal VI", "Pasal X", "Pasal XII"], a:2 },
  { q:"Hendaklah berjasa kepada yang sebangsa menunjukkan peralihan dari…", o:["Etika pribadi menuju tanggung jawab sosial", "Bahasa menuju perdagangan", "Sejarah menuju mitologi", "Agama menuju penolakan masyarakat"], a:0 },
  { q:"Puncak perkembangan etika dalam Modul 2 adalah…", o:["Kesalehan pribadi tanpa masyarakat", "Kepatuhan tanpa penilaian", "Integrasi tata diri, tata sosial, dan tata kekuasaan", "Penghapusan seluruh perbedaan"], a:2 },
];

export default function ModuleTwoLearning() {
  const [active,setActive]=useState("introduction"); const [reflection,setReflection]=useState(""); const [essay,setEssay]=useState("");
  const [answers,setAnswers]=useState<AnswerMap>({}); const [score,setScore]=useState<number|null>(null);
  const [readingDone,setReadingDone]=useState(false); const [analysisDone,setAnalysisDone]=useState(false); const [podcastDone,setPodcastDone]=useState(false);
  const [hydrated,setHydrated]=useState(false); const [saved,setSaved]=useState(false);
  useEffect(()=>{try{const raw=localStorage.getItem(STORAGE_KEY);if(raw){const d=JSON.parse(raw);setReflection(d.reflection??"");setEssay(d.essay??"");setAnswers(d.answers??{});setScore(d.score??null);setReadingDone(Boolean(d.readingDone));setAnalysisDone(Boolean(d.analysisDone));setPodcastDone(Boolean(d.podcastDone));}}finally{setHydrated(true)}},[]);
  useEffect(()=>{if(!hydrated)return;const id=window.setTimeout(()=>{void saveModuleProgress(STORAGE_KEY,2,{reflection,essay,answers,score,readingDone,analysisDone,podcastDone}).then(()=>{setSaved(true);window.setTimeout(()=>setSaved(false),1200)})},500);return()=>window.clearTimeout(id)},[reflection,essay,answers,score,readingDone,analysisDone,podcastDone,hydrated]);
  const reflectionWords=useMemo(()=>countWords(reflection),[reflection]); const essayWords=useMemo(()=>countWords(essay),[essay]);
  const reflectionDone=reflectionWords>=100; const essayDone=essayWords>=500; const quizDone=score!==null&&score>=70;
  const done=[readingDone,analysisDone,podcastDone,reflectionDone,essayDone,quizDone]; const progress=Math.round(done.filter(Boolean).length/6*100); const complete=done.every(Boolean);
  function submit(){if(Object.keys(answers).length<questions.length){alert("Jawab seluruh pertanyaan terlebih dahulu.");return}setScore(questions.filter((q,i)=>Number(answers[i])===q.a).length*10);setActive("result");window.scrollTo({top:0,behavior:"smooth"})}

  return <main className="min-h-screen bg-[#f7f4ee] text-slate-950">
    <header className="border-b border-white/10 bg-[#070916] px-5 py-5 text-white sm:px-8"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5"><Link href="/raja-ali-haji/programmes/pemikiran-raja-ali-haji" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-amber-400"><ArrowLeft size={17}/> Kembali ke program</Link><div className="min-w-56"><div className="flex justify-between text-xs"><span>Progres Modul 2</span><span>{progress}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full bg-amber-400 transition-all" style={{width:`${progress}%`}}/></div></div></div></header>
    <section className="bg-[#070916] px-5 pb-14 pt-10 text-white sm:px-8 md:pb-20"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.25em] text-amber-400">Modul 2 dari 8</p><h1 className="mt-4 max-w-5xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">Gurindam Dua Belas: Etika dan Pembentukan Karakter</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Membaca dua belas pasal sebagai perjalanan dari pengenalan diri menuju tanggung jawab sosial dan etika kekuasaan.</p><div className="mt-7 flex flex-wrap gap-5 text-sm text-slate-400"><span className="inline-flex items-center gap-2"><Clock size={17}/> 120–150 menit</span><span className="inline-flex items-center gap-2"><BookOpen size={17}/> Tingkat dasar</span><span className="inline-flex items-center gap-2"><FileText size={17}/> Refleksi, esai, dan kuis</span></div></div></section>
    <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[250px_1fr] lg:py-14"><aside className="h-fit border border-stone-300 bg-white p-3 lg:sticky lg:top-24">{nav.map(([id,label],i)=><button key={id} onClick={()=>setActive(id)} className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold ${active===id?"bg-slate-950 text-white":"hover:bg-stone-100"}`}><span className="text-xs text-amber-600">{String(i+1).padStart(2,"0")}</span>{label}</button>)}<div className="mt-3 border-t border-stone-200 px-4 py-3 text-xs text-slate-500">{saved?"Tersimpan otomatis ✓":"Progres tersimpan di perangkat ini"}</div></aside>
      <div className="min-w-0">
        {active==="introduction"&&<Panel eyebrow="Mulai di sini" title="Pengantar Modul 2"><p><em>Gurindam Dua Belas</em> bukan sekadar kumpulan nasihat yang berdiri sendiri. Dua belas pasalnya dapat dibaca sebagai arsitektur pendidikan karakter: agama memberi orientasi, pengendalian diri membentuk kebiasaan, hubungan sosial menguji budi, dan keadilan membawa etika ke ranah pemerintahan.</p><h3>Tujuan pembelajaran</h3><ol><li>Menjelaskan bentuk dan cara kerja gurindam.</li><li>Memetakan tema etika dalam dua belas pasal.</li><li>Menganalisis hubungan antara hati, bahasa, tindakan, dan karakter.</li><li>Menjelaskan perkembangan etika pribadi menjadi tanggung jawab sosial dan politik.</li></ol><blockquote>Apakah karakter hanya merupakan sifat pribadi, ataukah ia juga menentukan mutu masyarakat dan pemerintahan?</blockquote><Next onClick={()=>setActive("reading")}>Pelajari dua belas pasal</Next></Panel>}
        {active==="reading"&&<Panel eyebrow="Bacaan utama • 25–35 menit" title="Dua belas pasal, satu perjalanan etika"><p>Ejaan teks dapat berbeda antar-edisi. Modul ini mempertahankan kutipan yang umum dikenal, lalu memberi penjelasan kontemporer tanpa menggantikan teks aslinya.</p><PasalReader/><label className="mt-9 flex cursor-pointer items-center gap-3 border border-amber-300 bg-amber-50 p-5 font-semibold"><input type="checkbox" checked={readingDone} onChange={e=>setReadingDone(e.target.checked)} className="h-5 w-5 accent-amber-700"/> Saya telah mempelajari kedua belas pasal.</label><Next onClick={()=>setActive("analysis")}>Lanjut ke kerangka etika</Next></Panel>}
        {active==="analysis"&&<Panel eyebrow="Analisis konseptual" title="Dari tata diri menuju tata kekuasaan"><div className="grid gap-4 md:grid-cols-3"><Concept n="01" title="Tata diri" text="Agama, hati, pancaindra, perkataan, dan pengendalian tindakan."/><Concept n="02" title="Tata sosial" text="Budi bahasa, persahabatan, keluarga, introspeksi, dan kemanfaatan."/><Concept n="03" title="Tata kekuasaan" text="Amanah, mufakat, keadilan hukum, dan tanggung jawab pemimpin."/></div><h3>Karakter sebagai hubungan</h3><p>Karakter tidak digambarkan sebagai label tetap. Ia dibentuk melalui hubungan berulang antara batin, pilihan, kebiasaan, dan akibat. Gurindam membuat hubungan tersebut mudah diingat melalui pasangan baris yang menautkan perilaku dengan konsekuensinya.</p><h3>Bahasa sebagai tindakan moral</h3><p>Bahasa bukan sekadar alat menyampaikan pikiran. Menjaga lidah, menghindari dusta, menggunakan budi bahasa, dan menahan celaan adalah tindakan moral karena perkataan dapat membentuk atau merusak hubungan.</p><h3>Etika yang meluas</h3><p>Dua belas pasal bergerak dari manusia dan Tuhannya, menuju pengendalian diri, pergaulan, keluarga, masyarakat, lalu pemerintahan. Kesalehan pribadi memperoleh arti sosial ketika menghasilkan amanah, jasa, mufakat, dan keadilan.</p><label className="mt-8 flex cursor-pointer items-center gap-3 border border-amber-300 bg-amber-50 p-5 font-semibold"><input type="checkbox" checked={analysisDone} onChange={e=>setAnalysisDone(e.target.checked)} className="h-5 w-5 accent-amber-700"/> Saya memahami kerangka tata diri, tata sosial, dan tata kekuasaan.</label><Next onClick={()=>setActive("podcast")}>Lanjut ke podcast</Next></Panel>}
        {active==="podcast"&&<Panel eyebrow="Podcast • 25 menit" title="Gurindam Dua Belas dan Arsitektur Karakter"><div className="rounded-2xl bg-slate-950 p-7 text-white"><div className="flex items-center gap-4"><div className="rounded-full bg-amber-400 p-4 text-slate-950"><Headphones size={28}/></div><div><p className="font-bold">Algoritma Moral dalam Gurindam Dua Belas</p><p className="mt-1 text-sm text-slate-400">Audio Overview • Bahasa Indonesia • 25:38</p></div></div><audio className="mt-7 w-full" controls preload="metadata" onEnded={()=>setPodcastDone(true)}><source src="/audio/algoritma-moral-gurindam-dua-belas.m4a" type="audio/mp4"/>Peramban Anda tidak mendukung pemutar audio.</audio></div><details className="mt-7 border border-stone-300 bg-white p-5"><summary className="cursor-pointer font-bold">Baca ringkasan podcast</summary><div className="mt-4 space-y-4 leading-8 text-slate-600"><p>Podcast ini membaca <em>Gurindam Dua Belas</em> sebagai algoritma moral: setiap nasihat menghubungkan pilihan, kebiasaan, dan akibat. Pasal I dan II memberi orientasi agama dan kewajiban; Pasal III dan IV mengatur pancaindra serta hati sebagai pusat tindakan.</p><p>Pasal V sampai X memperluas pembentukan karakter ke dalam budi bahasa, pemilihan sahabat dan guru, disiplin perkataan, introspeksi, lingkungan, serta keluarga. Karakter tidak berhenti sebagai sifat pribadi, melainkan diuji dalam hubungan dengan orang lain.</p><p>Pasal XI dan XII membawa etika ke ruang sosial dan pemerintahan melalui amanah, jasa, mufakat, penghormatan terhadap ilmu, dan hukum yang adil. Keseluruhan pasal membentuk perjalanan dari tata diri, menuju tata sosial, lalu tata kekuasaan.</p></div></details><label className="mt-7 flex cursor-pointer items-center gap-3 border border-amber-300 bg-amber-50 p-5 font-semibold"><input type="checkbox" checked={podcastDone} onChange={e=>setPodcastDone(e.target.checked)} className="h-5 w-5 accent-amber-700"/> Saya telah mendengarkan podcast ini sampai selesai.</label><Next onClick={()=>setActive("reflection")} disabled={!podcastDone}>Lanjut ke refleksi</Next></Panel>}
        {active==="reflection"&&<Panel eyebrow="Aktivitas wajib • 100–150 kata" title="Refleksi karakter"><p>Pilih satu bait yang paling dekat dengan pengalaman Anda. Jelaskan kebiasaan apa yang dikritik atau dianjurkan oleh bait tersebut, serta perubahan konkret yang dapat dilakukan.</p><textarea value={reflection} onChange={e=>setReflection(e.target.value)} rows={10} placeholder="Tuliskan refleksi Anda…" className="mt-6 w-full border border-stone-300 bg-white p-5 leading-7 outline-none focus:border-amber-700"/><Words count={reflectionWords} min={100} max={150}/><Next disabled={!reflectionDone} onClick={()=>setActive("essay")}>Simpan dan lanjut ke esai</Next></Panel>}
        {active==="essay"&&<Panel eyebrow="Penilaian • 500–700 kata" title="Tugas esai Modul 2"><blockquote>Jelaskan bagaimana Gurindam Dua Belas mengembangkan etika dari pengendalian diri menuju tanggung jawab sosial dan pemerintahan.</blockquote><h3>Ketentuan</h3><ul><li>Gunakan sedikitnya tiga pasal sebagai dasar analisis.</li><li>Kutip sedikitnya dua bait secara relevan.</li><li>Hubungkan tata diri, tata sosial, dan tata kekuasaan.</li><li>Berikan satu contoh persoalan kontemporer.</li></ul><textarea value={essay} onChange={e=>setEssay(e.target.value)} rows={22} placeholder="Mulai menulis esai…" className="mt-6 w-full border border-stone-300 bg-white p-5 leading-7 outline-none focus:border-amber-700"/><Words count={essayWords} min={500} max={700}/><Next disabled={!essayDone} onClick={()=>setActive("quiz")}>Simpan dan mulai kuis</Next></Panel>}
        {active==="quiz"&&<Panel eyebrow="10 pertanyaan • Nilai minimum 70" title="Kuis Modul 2"><div className="space-y-8">{questions.map((q,i)=><fieldset key={q.q} className="border border-stone-300 bg-white p-6"><legend className="px-2 font-bold">{i+1}. {q.q}</legend><div className="mt-4 grid gap-3">{q.o.map((o,j)=><label key={o} className={`flex cursor-pointer gap-3 border p-4 ${Number(answers[i])===j?"border-amber-600 bg-amber-50":"border-stone-200 hover:bg-stone-50"}`}><input type="radio" name={`q2-${i}`} checked={Number(answers[i])===j} value={j} onChange={e=>setAnswers({...answers,[i]:e.target.value})} className="mt-1 accent-amber-700"/><span>{o}</span></label>)}</div></fieldset>)}</div><button onClick={submit} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-4 font-bold text-white hover:bg-amber-700"><CheckCircle2 size={18}/> Kirim jawaban</button></Panel>}
        {active==="result"&&<Panel eyebrow="Ringkasan kemajuan" title="Hasil Modul 2"><div className={`border p-7 ${complete?"border-emerald-300 bg-emerald-50":"border-amber-300 bg-amber-50"}`}><p className="text-5xl font-black">{score??0}</p><p className="mt-2 font-bold">Nilai kuis</p><p className="mt-3 text-slate-600">{quizDone?"Kuis lulus.":"Nilai belum mencapai 70. Pelajari kembali materi lalu ulangi kuis."}</p></div><div className="mt-7 space-y-3"><Req done={readingDone} text="Dua belas pasal selesai"/><Req done={analysisDone} text="Kerangka etika selesai"/><Req done={podcastDone} text="Podcast/ringkasan selesai"/><Req done={reflectionDone} text={`Refleksi minimal 100 kata (${reflectionWords} kata)`}/><Req done={essayDone} text={`Esai minimal 500 kata (${essayWords} kata)`}/><Req done={quizDone} text="Nilai kuis minimal 70"/></div>{complete?<div className="mt-8 rounded-2xl bg-emerald-700 p-7 text-white"><CheckCircle2 size={34}/><h3 className="mt-4 text-2xl font-black">Modul 2 selesai</h3><p className="mt-2 text-emerald-100">Anda telah menyelesaikan pembelajaran etika dan pembentukan karakter dalam Gurindam Dua Belas.</p><Link href="/raja-ali-haji/programmes/pemikiran-raja-ali-haji/module-3" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-emerald-800 transition hover:bg-emerald-50">Lanjut ke Modul 3 <ArrowRight size={18}/></Link></div>:<button onClick={()=>{setAnswers({});setScore(null);setActive("quiz")}} className="mt-8 inline-flex items-center gap-2 rounded-xl border border-slate-950 px-6 py-4 font-bold hover:bg-white"><RotateCcw size={18}/> Ulangi kuis</button>}</Panel>}
      </div></div>
  </main>
}

function Panel({eyebrow,title,children}:{eyebrow:string;title:string;children:React.ReactNode}){return <section className="border border-stone-300 bg-[#fffdf9] p-6 shadow-sm sm:p-9 md:p-12"><p className="text-xs font-bold uppercase tracking-[.22em] text-amber-700">{eyebrow}</p><h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">{title}</h2><div className="mt-8 space-y-5 leading-8 [&_h3]:pt-4 [&_h3]:text-xl [&_h3]:font-black [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-amber-600 [&_blockquote]:bg-amber-50 [&_blockquote]:p-5 [&_blockquote]:text-lg [&_blockquote]:italic">{children}</div></section>}
function Next({children,onClick,disabled=false}:{children:React.ReactNode;onClick:()=>void;disabled?:boolean}){return <button onClick={onClick} disabled={disabled} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-4 font-bold text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-slate-300"><Save size={18}/>{children}</button>}
function Words({count,min,max}:{count:number;min:number;max:number}){return <p className={`text-sm font-semibold ${count>=min?"text-emerald-700":"text-slate-500"}`}>{count} kata • ketentuan {min}–{max} kata {count>=min?"✓":""}</p>}
function Req({done,text}:{done:boolean;text:string}){return <div className="flex items-center gap-3 border border-stone-200 bg-white p-4"><CheckCircle2 className={done?"text-emerald-600":"text-stone-300"} size={21}/><span className={done?"font-semibold":"text-slate-500"}>{text}</span></div>}
function Concept({n,title,text}:{n:string;title:string;text:string}){return <article className="border border-stone-300 bg-white p-5"><p className="text-xs font-bold text-amber-700">{n}</p><h3 className="pt-2">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></article>}
function countWords(v:string){return v.trim()?v.trim().split(/\s+/).length:0}
function PasalReader(){const [open,setOpen]=useState<number|null>(0);return <div className="divide-y divide-stone-300 border-y border-stone-300">{pasals.map((p,i)=><article key={p.n}><button onClick={()=>setOpen(open===i?null:i)} className="flex w-full items-center justify-between gap-5 py-5 text-left"><span><small className="mr-3 font-bold text-amber-700">PASAL {p.n}</small><strong>{p.title}</strong></span>{open===i?<ChevronUp size={20}/>:<ChevronDown size={20}/>}</button>{open===i&&<div className="pb-7"><div className="whitespace-pre-line border-l-4 border-amber-600 bg-amber-50 p-6 font-serif text-lg italic leading-8">{p.text}</div><div className="mt-5 rounded-lg border border-stone-200 bg-white p-5"><p className="text-xs font-bold uppercase tracking-[.18em] text-amber-700">Pemaknaan</p><p className="mt-2 text-slate-700">{p.meaning}</p></div></div>}</article>)}</div>}
