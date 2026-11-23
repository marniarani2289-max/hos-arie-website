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
      </div>
    </section>
  );
}
