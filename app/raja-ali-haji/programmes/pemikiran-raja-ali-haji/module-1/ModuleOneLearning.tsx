"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, BookOpen, CheckCircle2, ChevronDown, ChevronUp, Clock, FileText, Headphones, PenLine, RotateCcw, Save } from "lucide-react";

type AnswerMap = Record<number, string>;
const STORAGE_KEY = "rahi-module-1-v1";

const sections = [
  { id: "introduction", label: "Pengantar" },
  { id: "reading", label: "Bacaan utama" },
  { id: "podcast", label: "Podcast" },
  { id: "reflection", label: "Refleksi" },
  { id: "essay", label: "Esai" },
  { id: "quiz", label: "Kuis" },
  { id: "result", label: "Hasil" },
];

const questions = [
  { q: "Raja Ali Haji paling tepat dipahami sebagai…", options: ["Penyair istana semata", "Ahli bahasa semata", "Intelektual multidimensional dunia Melayu", "Pejabat kolonial"], correct: 2 },
  { q: "Pusat utama kehidupan intelektual Raja Ali Haji adalah…", options: ["Pulau Jawa", "Pulau Penyengat dan lingkungan Riau–Lingga", "Kesultanan Mataram", "Pulau Bali"], correct: 1 },
  { q: "Karya yang terutama membahas sejarah Melayu dan Bugis adalah…", options: ["Tuhfat al-Nafis", "Gurindam Dua Belas", "Bustan al-Katibin", "Tsamarat al-Muhimmah"], correct: 0 },
  { q: "Bustan al-Katibin terutama berkaitan dengan…", options: ["Ilmu pelayaran", "Tata bahasa dan penulisan", "Strategi peperangan", "Pengobatan tradisional"], correct: 1 },
  { q: "Tsamarat al-Muhimmah berhubungan dengan…", options: ["Etika dan tanggung jawab pemerintahan", "Perdagangan laut", "Arsitektur Melayu", "Pengobatan kerajaan"], correct: 0 },
  { q: "Dalam modul ini, dunia Melayu dipahami sebagai…", options: ["Satu negara modern", "Satu kelompok keluarga kerajaan", "Ruang peradaban yang dihubungkan bahasa, agama, sejarah, dan mobilitas", "Wilayah yang tertutup dari dunia luar"], correct: 2 },
  { q: "Mengapa perbedaan tahun kelahiran Raja Ali Haji perlu disampaikan?", options: ["Sejarah tidak membutuhkan bukti", "Seluruh sumber selalu salah", "Sumber sejarah dapat memberikan keterangan berbeda", "Tanggal tidak boleh diteliti"], correct: 2 },
  { q: "Tiga tahap mempelajari warisan Raja Ali Haji adalah…", options: ["Menghafal, menyalin, menguji", "Preservasi, interpretasi, aktualisasi", "Membaca, menerjemahkan, melupakan", "Menyimpan, menjual, mengganti"], correct: 1 },
  { q: "Pulau Penyengat disebut ekosistem pengetahuan karena…", options: ["Hanya tempat tinggal raja", "Mempertemukan pemerintahan, agama, bahasa, sastra, dan penulisan", "Tidak berhubungan dengan wilayah lain", "Hanya digunakan untuk pertahanan"], correct: 1 },
  { q: "Relevansi utama mempelajari Raja Ali Haji saat ini adalah…", options: ["Mengembalikan sistem kerajaan secara utuh", "Menghafal seluruh silsilah", "Menggunakan warisan pemikirannya untuk memahami persoalan kontemporer", "Menolak seluruh pemikiran dari luar"], correct: 2 },
];

export default function ModuleOneLearning() {
  const [active, setActive] = useState("introduction");
  const [reflection, setReflection] = useState("");
  const [essay, setEssay] = useState("");
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [readingDone, setReadingDone] = useState(false);
  const [podcastDone, setPodcastDone] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setReflection(data.reflection ?? ""); setEssay(data.essay ?? ""); setAnswers(data.answers ?? {});
        setQuizScore(data.quizScore ?? null); setReadingDone(Boolean(data.readingDone)); setPodcastDone(Boolean(data.podcastDone));
      }
    } finally { setHydrated(true); }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const id = window.setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ reflection, essay, answers, quizScore, readingDone, podcastDone }));
      setSaved(true); window.setTimeout(() => setSaved(false), 1200);
    }, 500);
    return () => window.clearTimeout(id);
  }, [reflection, essay, answers, quizScore, readingDone, podcastDone, hydrated]);

  const reflectionWords = useMemo(() => countWords(reflection), [reflection]);
  const essayWords = useMemo(() => countWords(essay), [essay]);
  const reflectionDone = reflectionWords >= 100;
  const essayDone = essayWords >= 400;
  const quizDone = quizScore !== null && quizScore >= 70;
  const doneCount = [readingDone, podcastDone, reflectionDone, essayDone, quizDone].filter(Boolean).length;
  const progress = doneCount * 20;
  const moduleComplete = doneCount === 5;

  function submitQuiz() {
    if (Object.keys(answers).length < questions.length) { alert("Jawab seluruh pertanyaan terlebih dahulu."); return; }
    const correct = questions.filter((question, index) => Number(answers[index]) === question.correct).length;
    setQuizScore(correct * 10); setActive("result"); window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetQuiz() { setAnswers({}); setQuizScore(null); setActive("quiz"); }

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-slate-950">
      <header className="border-b border-white/10 bg-[#070916] px-5 py-5 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
          <Link href="/raja-ali-haji/programmes/pemikiran-raja-ali-haji" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-amber-400"><ArrowLeft size={17}/> Kembali ke program</Link>
          <div className="min-w-56"><div className="flex justify-between text-xs"><span>Progres Modul 1</span><span>{progress}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full bg-amber-400 transition-all" style={{ width: `${progress}%` }}/></div></div>
        </div>
      </header>

      <section className="bg-[#070916] px-5 pb-14 pt-10 text-white sm:px-8 md:pb-20">
        <div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.25em] text-amber-400">Modul 1 dari 8</p><h1 className="mt-4 max-w-5xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">Mengenal Raja Ali Haji dan Dunia Melayu</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">Fondasi untuk memahami Raja Ali Haji sebagai ulama, pujangga, ahli bahasa, sejarawan, pendidik, dan pemikir pemerintahan.</p><div className="mt-7 flex flex-wrap gap-5 text-sm text-slate-400"><span className="inline-flex items-center gap-2"><Clock size={17}/> 90–120 menit</span><span className="inline-flex items-center gap-2"><BookOpen size={17}/> Tingkat dasar</span><span className="inline-flex items-center gap-2"><FileText size={17}/> Kuis dan esai</span></div></div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[250px_1fr] lg:py-14">
        <aside className="h-fit border border-stone-300 bg-white p-3 lg:sticky lg:top-24">
          {sections.map((section, index) => <button key={section.id} onClick={() => setActive(section.id)} className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold transition ${active === section.id ? "bg-slate-950 text-white" : "hover:bg-stone-100"}`}><span className="text-xs text-amber-600">{String(index + 1).padStart(2,"0")}</span>{section.label}</button>)}
          <div className="mt-3 border-t border-stone-200 px-4 py-3 text-xs text-slate-500">{saved ? "Tersimpan otomatis ✓" : "Progres tersimpan di perangkat ini"}</div>
        </aside>

        <div className="min-w-0">
          {active === "introduction" && <Panel title="Pengantar modul" eyebrow="Mulai di sini"><p>Modul ini memperkenalkan lingkungan sejarah dan intelektual yang membentuk pemikiran Raja Ali Haji: Pulau Penyengat, Kesultanan Riau–Lingga, tradisi keilmuan Islam, bahasa Melayu, jaringan Bugis–Melayu, serta perjumpaan dengan kolonialisme.</p><h3>Tujuan pembelajaran</h3><ol><li>Menjelaskan siapa Raja Ali Haji.</li><li>Menggambarkan kedudukan Pulau Penyengat dalam dunia Melayu.</li><li>Mengidentifikasi bidang utama karya-karyanya.</li><li>Menjelaskan relevansi pemikirannya bagi masa kini.</li></ol><blockquote>Apakah Raja Ali Haji hanya penting karena Gurindam Dua Belas, ataukah ia menawarkan sistem pemikiran tentang manusia, bahasa, pemerintahan, dan peradaban?</blockquote><NextButton onClick={() => setActive("reading")}>Mulai membaca</NextButton></Panel>}

          {active === "reading" && <Panel title="Mengenal Raja Ali Haji dan Dunia Melayu" eyebrow="Bacaan utama • 15–20 menit"><Reading/><label className="mt-10 flex cursor-pointer items-center gap-3 border border-amber-300 bg-amber-50 p-5 font-semibold"><input type="checkbox" checked={readingDone} onChange={(e)=>setReadingDone(e.target.checked)} className="h-5 w-5 accent-amber-700"/> Saya telah membaca dan memahami bacaan utama.</label><NextButton onClick={() => setActive("podcast")}>Lanjut ke podcast</NextButton></Panel>}

          {active === "podcast" && <Panel title="Raja Ali Haji: Lebih dari Pengarang Gurindam Dua Belas" eyebrow="Podcast • 22 menit"><div className="rounded-2xl bg-slate-950 p-7 text-white"><div className="flex items-center gap-4"><div className="rounded-full bg-amber-400 p-4 text-slate-950"><Headphones size={28}/></div><div><p className="font-bold">Politik Tata Bahasa Raja Ali Haji</p><p className="mt-1 text-sm text-slate-400">Audio Overview • Bahasa Indonesia • 22:03</p></div></div><audio className="mt-7 w-full" controls preload="metadata" onEnded={() => setPodcastDone(true)}><source src="/audio/podcast-modul-1-raja-ali-haji.mp3" type="audio/mpeg"/>Browser Anda tidak mendukung pemutar audio.</audio></div><details className="mt-7 border border-stone-300 bg-white p-5"><summary className="cursor-pointer font-bold">Baca ringkasan podcast</summary><p className="mt-4 leading-8 text-slate-600">Podcast memperkenalkan Raja Ali Haji sebagai intelektual multidimensional, menjelaskan hubungan antara tata bahasa, etika, dan tata pemerintahan, memaparkan Pulau Penyengat sebagai ekosistem pengetahuan, serta menghubungkan karya-karyanya dengan kehidupan kontemporer.</p></details><label className="mt-7 flex cursor-pointer items-center gap-3 border border-amber-300 bg-amber-50 p-5 font-semibold"><input type="checkbox" checked={podcastDone} onChange={(e)=>setPodcastDone(e.target.checked)} className="h-5 w-5 accent-amber-700"/> Saya telah mendengarkan podcast ini.</label><NextButton onClick={() => setActive("reflection")}>Lanjut ke refleksi</NextButton></Panel>}

          {active === "reflection" && <Panel title="Refleksi pembelajaran" eyebrow="Aktivitas wajib • 100–150 kata"><p>Sebelum mengikuti modul ini, bagaimana Anda mengenal Raja Ali Haji? Pengetahuan baru apa yang paling mengubah pandangan Anda?</p><textarea value={reflection} onChange={(e)=>setReflection(e.target.value)} rows={10} placeholder="Tuliskan refleksi Anda…" className="mt-6 w-full border border-stone-300 bg-white p-5 leading-7 outline-none focus:border-amber-700"/><WordStatus count={reflectionWords} min={100} max={150}/><NextButton disabled={!reflectionDone} onClick={() => setActive("essay")}>Simpan dan lanjut ke esai</NextButton></Panel>}

          {active === "essay" && <Panel title="Tugas esai Modul 1" eyebrow="Penilaian • 400–600 kata"><blockquote>Mengapa Raja Ali Haji sebaiknya dipahami sebagai seorang pemikir peradaban, bukan hanya sebagai pujangga?</blockquote><h3>Ketentuan</h3><ul><li>Gunakan sedikitnya dua contoh karya Raja Ali Haji.</li><li>Jelaskan hubungannya dengan dunia Melayu.</li><li>Gunakan bahasa dan argumentasi Anda sendiri.</li><li>Esai tersimpan otomatis pada perangkat ini.</li></ul><textarea value={essay} onChange={(e)=>setEssay(e.target.value)} rows={20} placeholder="Mulai menulis esai…" className="mt-6 w-full border border-stone-300 bg-white p-5 leading-7 outline-none focus:border-amber-700"/><WordStatus count={essayWords} min={400} max={600}/><div className="mt-5 grid gap-3 sm:grid-cols-2"><Rubric label="Pemahaman" value="30%"/><Rubric label="Argumentasi" value="25%"/><Rubric label="Contoh karya" value="20%"/><Rubric label="Dunia Melayu" value="15%"/><Rubric label="Struktur & bahasa" value="10%"/></div><NextButton disabled={!essayDone} onClick={() => setActive("quiz")}>Simpan dan mulai kuis</NextButton></Panel>}

          {active === "quiz" && <Panel title="Kuis Modul 1" eyebrow="10 pertanyaan • Nilai minimum 70"><div className="space-y-8">{questions.map((question,index)=><fieldset key={question.q} className="border border-stone-300 bg-white p-6"><legend className="px-2 font-bold">{index+1}. {question.q}</legend><div className="mt-4 grid gap-3">{question.options.map((option,optionIndex)=><label key={option} className={`flex cursor-pointer gap-3 border p-4 ${Number(answers[index])===optionIndex?"border-amber-600 bg-amber-50":"border-stone-200 hover:bg-stone-50"}`}><input type="radio" name={`q-${index}`} value={optionIndex} checked={Number(answers[index])===optionIndex} onChange={(e)=>setAnswers({...answers,[index]:e.target.value})} className="mt-1 accent-amber-700"/><span>{option}</span></label>)}</div></fieldset>)}</div><button onClick={submitQuiz} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-4 font-bold text-white hover:bg-amber-700"><CheckCircle2 size={18}/> Kirim jawaban</button></Panel>}

          {active === "result" && <Panel title="Hasil Modul 1" eyebrow="Ringkasan kemajuan"><div className={`border p-7 ${moduleComplete?"border-emerald-300 bg-emerald-50":"border-amber-300 bg-amber-50"}`}><p className="text-5xl font-black">{quizScore ?? 0}</p><p className="mt-2 font-bold">Nilai kuis</p><p className="mt-3 text-slate-600">{quizDone?"Kuis lulus.":"Nilai belum mencapai 70. Silakan pelajari kembali materi dan ulangi kuis."}</p></div><div className="mt-7 space-y-3"><Requirement done={readingDone} text="Bacaan utama selesai"/><Requirement done={podcastDone} text="Podcast/ringkasan selesai"/><Requirement done={reflectionDone} text={`Refleksi minimal 100 kata (${reflectionWords} kata)`}/><Requirement done={essayDone} text={`Esai minimal 400 kata (${essayWords} kata)`}/><Requirement done={quizDone} text="Nilai kuis minimal 70"/></div>{moduleComplete?<div className="mt-8 rounded-2xl bg-emerald-700 p-7 text-white"><CheckCircle2 size={34}/><h3 className="mt-4 text-2xl font-black">Modul 1 selesai</h3><p className="mt-2 text-emerald-100">Progres Anda telah tersimpan. Modul 2 akan dibuka setelah materinya tersedia.</p></div>:<button onClick={resetQuiz} className="mt-8 inline-flex items-center gap-2 rounded-xl border border-slate-950 px-6 py-4 font-bold hover:bg-white"><RotateCcw size={18}/> Ulangi kuis</button>}</Panel>}
        </div>
      </div>
    </main>
  );
}

function Panel({ title, eyebrow, children }: { title:string; eyebrow:string; children:React.ReactNode }) { return <section className="border border-stone-300 bg-[#fffdf9] p-6 shadow-sm sm:p-9 md:p-12"><p className="text-xs font-bold uppercase tracking-[.22em] text-amber-700">{eyebrow}</p><h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">{title}</h2><div className="prose prose-slate mt-8 max-w-none leading-8 [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-black [&_li]:mb-2 [&_blockquote]:my-7 [&_blockquote]:border-l-4 [&_blockquote]:border-amber-600 [&_blockquote]:bg-amber-50 [&_blockquote]:p-5 [&_blockquote]:text-lg [&_blockquote]:italic">{children}</div></section> }
function NextButton({children,onClick,disabled=false}:{children:React.ReactNode;onClick:()=>void;disabled?:boolean}) { return <button disabled={disabled} onClick={onClick} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-4 font-bold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-slate-300"><Save size={18}/>{children}</button> }
function WordStatus({count,min,max}:{count:number;min:number;max:number}) { const good=count>=min&&count<=max; return <p className={`mt-2 text-sm font-semibold ${good?"text-emerald-700":"text-slate-500"}`}>{count} kata • ketentuan {min}–{max} kata {count>=min?"✓":""}</p> }
function Rubric({label,value}:{label:string;value:string}) { return <div className="flex justify-between border border-stone-200 bg-stone-50 px-4 py-3 text-sm"><span>{label}</span><strong>{value}</strong></div> }
function Requirement({done,text}:{done:boolean;text:string}) { return <div className="flex items-center gap-3 border border-stone-200 bg-white p-4"><CheckCircle2 className={done?"text-emerald-600":"text-stone-300"} size={21}/><span className={done?"font-semibold":"text-slate-500"}>{text}</span></div> }
function countWords(value:string) { return value.trim()?value.trim().split(/\s+/).length:0 }

function Reading() { const [open,setOpen]=useState<number|null>(0); const parts=[
  ["Lebih dari seorang pujangga","Raja Ali Haji dikenal luas melalui Gurindam Dua Belas. Namun, mengenalnya hanya sebagai pengarang gurindam akan mempersempit kedudukan intelektualnya. Ia merupakan ulama, ahli bahasa, sejarawan, pujangga, pendidik, penasihat pemerintahan, dan pemikir tata kekuasaan. Karya-karyanya membahas hubungan manusia dengan Tuhan, pembentukan budi pekerti, penggunaan bahasa, sejarah masyarakat, kewajiban penguasa, dan tanggung jawab pejabat."],
  ["Riwayat dan lingkungan keluarga","Raja Ali Haji bin Raja Ahmad diperkirakan lahir pada awal abad ke-19. Beberapa sumber menyebut Pulau Penyengat sebagai tempat kelahirannya, sedangkan sumber lain menyebut Selangor. Perbedaan tanggal dan tempat perlu disampaikan secara terbuka karena sumber sejarah dapat memberikan keterangan berbeda. Kehidupan intelektualnya sangat erat dengan Pulau Penyengat dan lingkungan Kerajaan Riau–Lingga. Ia berasal dari keluarga elite Bugis–Melayu dan merupakan cucu Raja Haji Fisabilillah."],
  ["Pulau Penyengat sebagai pusat peradaban","Pulau Penyengat bukan sekadar latar geografis. Pulau ini menjadi pusat pemerintahan, agama, bahasa, kebudayaan, dan kegiatan penulisan di lingkungan Riau–Lingga. Istana, masjid, ulama, pejabat, penyalin naskah, guru, dan pujangga berinteraksi di sana. Karena itu, Penyengat dapat dipahami sebagai suatu ekosistem pengetahuan tempat agama, bahasa, sastra, sejarah, dan pemerintahan saling berhubungan."],
  ["Dunia Melayu sebagai ruang perjumpaan","Dunia Melayu bukan hanya batas wilayah politik modern. Ia merupakan ruang peradaban yang dihubungkan oleh bahasa Melayu, Islam, perdagangan, hubungan kekerabatan, pemerintahan, sastra, dan mobilitas manusia. Raja Ali Haji hidup dalam dunia yang bergerak: orang, kitab, surat, berita, bahasa, dan gagasan berpindah dari satu tempat ke tempat lain. Perjalanan ke Batavia dan Makkah ikut memperluas cakrawala intelektualnya."],
  ["Agama, bahasa, dan pemerintahan","Dalam pemikiran Raja Ali Haji, agama, bahasa, dan pemerintahan berhubungan erat. Agama memberikan dasar moral bagi manusia dan kekuasaan. Bahasa memungkinkan pengetahuan, hukum, dan tata kehidupan disampaikan dengan benar. Pemerintahan diperlukan untuk menjaga keteraturan dan kemaslahatan. Tata bahasa, tata diri, dan tata pemerintahan merupakan bagian dari pembentukan peradaban yang tertib."],
  ["Karya-karya utama","Gurindam Dua Belas berbicara tentang agama, etika, dan pembentukan diri. Bustan al-Katibin dan Kitab Pengetahuan Bahasa menaruh perhatian pada bahasa. Tuhfat al-Nafis serta Silsilah Melayu dan Bugis merekam sejarah dan hubungan politik. Muqaddimah fi Intizam Waza'if al-Malik membahas tugas pemegang kekuasaan, sedangkan Tsamarat al-Muhimmah menelaah tanggung jawab raja dan pejabat."],
  ["Mengapa masih relevan?","Pertanyaan Raja Ali Haji tetap hidup: apa yang membuat kekuasaan sah, apa tanggung jawab moral pemimpin, mengapa pejabat harus menjaga amanah, bagaimana bahasa membentuk pemikiran, dan bagaimana masyarakat menjaga identitas ketika menghadapi perubahan. Mempelajarinya bukan berarti mengulang masa lalu, melainkan menemukan sumber daya intelektual untuk memahami masa kini."],
  ["Dari warisan menuju pemikiran","Warisan Raja Ali Haji dipelajari melalui tiga tahap. Preservasi menjaga naskah dan warisan sejarah. Interpretasi memahami bahasa, konteks, dan gagasannya. Aktualisasi menilai relevansinya bagi kehidupan kontemporer. Tanpa preservasi sumber dapat hilang; tanpa interpretasi teks menjadi benda lama; tanpa aktualisasi pemikiran tidak hadir dalam kehidupan masyarakat."],
]; return <div className="divide-y divide-stone-300 border-y border-stone-300">{parts.map(([title,text],i)=><article key={title}><button onClick={()=>setOpen(open===i?null:i)} className="flex w-full items-center justify-between gap-5 py-5 text-left font-black"><span>{i+1}. {title}</span>{open===i?<ChevronUp size={20}/>:<ChevronDown size={20}/>}</button>{open===i&&<p className="pb-6 text-slate-700">{text}</p>}</article>)}</div> }
