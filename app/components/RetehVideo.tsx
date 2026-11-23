type RetehVideoProps = {
  context: "institute" | "programme" | "archive";
};

const introductions = {
  institute: {
    label: "Video kajian · Raja Ali Haji",
    description:
      "Mengenal pemikiran dan sikap Raja Ali Haji melalui kajian Peristiwa Reteh 1858. Bahan belajar terbuka untuk menelusuri hubungan sejarah, hukum, dan tanggung jawab kekuasaan dalam dunia Melayu.",
  },
  programme: {
    label: "Bahan pengayaan · Modul 7 dan 8",
    description:
      "Gunakan kajian Peristiwa Reteh 1858 sebagai pendamping pembahasan keadilan, batas moral kekuasaan, dan relevansi pemikiran Raja Ali Haji. Setelah menonton, refleksikan hubungan antara sikap seorang intelektual dan tanggung jawab kekuasaan.",
  },
  archive: {
    label: "Koleksi video · Kajian sejarah dan hukum",
    description:
      "Rekaman pembelajaran tentang Raja Ali Haji dan Peristiwa Reteh 1858. Koleksi ini melengkapi bahan kajian warisan intelektual Melayu dan dapat ditonton langsung atau dibuka melalui YouTube.",
  },
};

export default function RetehVideo({ context }: RetehVideoProps) {
  const { label, description } = introductions[context];
  const dark = context === "archive";

  return (
    <section
      id="kajian-reteh-1858"
      lang="id"
      aria-labelledby="reteh-video-title"
      className={`scroll-mt-24 ${dark ? "mt-12 rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-8" : "border-b border-stone-200 bg-white px-5 py-16 sm:px-8 lg:px-12"}`}
    >
      <div className="mx-auto max-w-7xl">
        <p className={`text-xs font-bold uppercase tracking-[0.2em] ${dark ? "text-amber-400" : "text-amber-700"}`}>{label}</p>
        <h2 id="reteh-video-title" className={`mt-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl ${dark ? "text-white" : "text-slate-950"}`}>
          Raja Ali Haji dan Peristiwa Reteh 1858
        </h2>
        <p className={`mt-4 max-w-3xl text-lg leading-8 ${dark ? "text-gray-300" : "text-slate-600"}`}>{description}</p>
        <p className={`mt-4 text-sm font-semibold ${dark ? "text-gray-300" : "text-slate-700"}`}>Dr. Hos Arie Sibarani · Bahasa Indonesia</p>
        <div className="mt-8 aspect-video w-full overflow-hidden rounded-2xl bg-slate-950">
          <iframe
            className="h-full w-full border-0"
            src="https://www.youtube-nocookie.com/embed/7tIzZIuZU_c"
            title="Kajian Raja Ali Haji dan Peristiwa Reteh 1858 — Dr. Hos Arie Sibarani"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <a href="https://youtu.be/7tIzZIuZU_c" target="_blank" rel="noopener noreferrer" className={`mt-4 inline-flex min-h-11 items-center font-semibold underline underline-offset-4 ${dark ? "text-amber-300 hover:text-white" : "text-amber-800 hover:text-slate-950"}`}>
          Tonton di YouTube <span aria-hidden="true" className="ml-2">↗</span><span className="sr-only"> (tab baru)</span>
        </a>
        <div className={`mt-8 rounded-2xl border p-5 sm:p-7 ${dark ? "border-white/15 bg-slate-900" : "border-stone-200 bg-stone-50"}`}>
          <h3 className={`text-xl font-bold ${dark ? "text-white" : "text-slate-950"}`}>Materi PDF · Peristiwa Reteh 1858</h3>
          <p className={`mt-3 leading-7 ${dark ? "text-gray-300" : "text-slate-600"}`}>Baca 12 halaman materi pendamping tentang hukum, fitnah, dan perlindungan korban perang dalam kajian pemikiran Raja Ali Haji.</p>
          <div className="mt-5 flex flex-wrap gap-4">
            <a href="/materials/kajian-hukum-peristiwa-reteh-1858.pdf" download="Kajian_Hukum_Peristiwa_Reteh_1858.pdf" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white hover:bg-amber-700">Unduh materi PDF</a>
            <a href="/materials/kajian-hukum-peristiwa-reteh-1858.pdf" target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-12 items-center font-semibold underline underline-offset-4 ${dark ? "text-amber-300 hover:text-white" : "text-amber-800 hover:text-slate-950"}`}>Buka PDF di tab baru <span aria-hidden="true" className="ml-2">↗</span></a>
          </div>
          <details className="mt-6">
            <summary className={`cursor-pointer py-3 text-lg font-bold ${dark ? "text-white" : "text-slate-950"}`}>Baca materi PDF di halaman ini</summary>
            <p className={`mt-2 text-sm leading-6 ${dark ? "text-gray-300" : "text-slate-600"}`}>Jika pratinjau tidak tersedia di perangkat Anda, gunakan tombol buka atau unduh PDF di atas.</p>
            <iframe src="/materials/kajian-hukum-peristiwa-reteh-1858.pdf" title="Materi PDF Kajian Hukum Peristiwa Reteh 1858 — Dr. Hos Arie Sibarani" loading="lazy" className="mt-4 h-[70vh] min-h-80 w-full rounded-lg border border-stone-300 bg-white" />
          </details>
        </div>
      </div>
    </section>
  );
}
