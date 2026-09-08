import Link from "next/link";

const purposes = [
  { id: "profile", title: "Mengenal Saya", en: "Meet the scholar", text: "Kenali perjalanan akademik, kepakaran, dan rekam jejak Dr. Hos Arie Sibarani.", links: [["Profil akademik", "/id/about"]] },
  { id: "learn", title: "Belajar", en: "Learn", text: "Pilih program pembelajaran, ikuti workshop, atau belajar melalui video hukum.", links: [["Raja Ali Haji Institute", "/raja-ali-haji"], ["Workshop LexNusa", "/lexnusa/cohort"], ["Video Hukumpreneur", "https://www.youtube.com/hukumpreneur"]] },
  { id: "research", title: "Membaca Penelitian", en: "Read research", text: "Jelajahi penelitian, publikasi akademik, dan Journal of Malay Constitutional Studies.", links: [["Penelitian", "/id/research"], ["Publikasi", "/id/publications"], ["Jurnal JMCS", "/journal"]] },
  { id: "apps", title: "Menggunakan Aplikasi", en: "Use applications", text: "Temukan alat untuk akreditasi sekolah, ruang kerja hukum, dan eksperimen AI.", links: [["SIMAKS · Akreditasi sekolah", "/simak"], ["LexNusa · Ruang kerja hukum", "/lexnusa"], ["AI Lab · Eksperimen", "/ai-lab"]] },
  { id: "collaborate", title: "Berkolaborasi", en: "Collaborate", text: "Diskusikan penelitian bersama, undangan mengajar, workshop, atau kemitraan institusi.", links: [["Hubungi untuk kolaborasi", "/id/contact"]] },
] as const;

const englishPurposes = [
  { id: "profile", title: "About Me", en: "Academic profile", text: "Discover the academic journey, expertise, and work of Dr. Hos Arie Sibarani.", links: [["View my profile", "/about"]] },
  { id: "learn", title: "Learn", en: "Courses & workshops", text: "Choose a learning programme, join a workshop, or explore legal education videos.", links: [["Raja Ali Haji Institute", "/raja-ali-haji"], ["LexNusa Workshops", "/lexnusa/cohort"], ["Hukumpreneur Videos", "https://www.youtube.com/hukumpreneur"]] },
  { id: "research", title: "Read Research", en: "Scholarship & publications", text: "Explore research, academic publications, and the Journal of Malay Constitutional Studies.", links: [["Research", "/research"], ["Publications", "/publications"], ["JMCS Journal", "/journal"]] },
  { id: "apps", title: "Use Applications", en: "Tools & experiments", text: "Find tools for school accreditation, legal work, and AI experimentation.", links: [["SIMAKS · School Accreditation", "/simak"], ["LexNusa · Legal Workspace", "/lexnusa"], ["AI Lab · Experiments", "/ai-lab"]] },
  { id: "collaborate", title: "Collaborate", en: "Partnerships", text: "Discuss joint research, teaching invitations, workshops, or institutional partnerships.", links: [["Get in touch", "/contact"]] },
] as const;

type Locale = "en" | "id";

export function PurposeNavigation({ locale = "en" }: { locale?: Locale }) {
  const items = locale === "id" ? purposes : englishPurposes;
  return (
    <nav aria-label={locale === "id" ? "Pilih tujuan kunjungan" : "Choose your purpose"} className="border-b border-slate-200 bg-stone-50">
      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-amber-800">{locale === "id" ? "Saya ingin…" : "I would like to…"}</p>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Link key={item.id} href={`#purpose-${item.id}`} className="rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-amber-600 hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700">
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default function PathwayChooser({ compact = false, locale = "en" }: { compact?: boolean; locale?: Locale }) {
  const items = locale === "id" ? purposes : englishPurposes;
  return (
    <section aria-labelledby="purpose-heading" className={compact ? "bg-stone-50 py-12 sm:py-16" : "bg-stone-50 py-16 sm:py-20"}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">{locale === "id" ? "Mulai dari tujuan Anda" : "Start with your purpose"}</p>
          <h2 id="purpose-heading" className="font-academic mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">{locale === "id" ? "Apa yang ingin Anda lakukan?" : "What would you like to do?"}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">{locale === "id" ? "Kenali profil saya, pilih tempat belajar, temukan penelitian, gunakan aplikasi, atau mulai kolaborasi." : "Get to know me, find a place to learn, explore research, use applications, or start a collaboration."}</p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <article id={`purpose-${item.id}`} key={item.id} className="scroll-mt-32 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm target:border-amber-600 target:ring-2 target:ring-amber-200">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">{item.en}</p>
                <span aria-hidden="true" className="text-sm font-semibold text-slate-400">0{index + 1}</span>
              </div>
              <h3 className="font-academic mt-4 text-2xl font-bold text-slate-950">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              <ul className="mt-5 space-y-1">
                {item.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="flex min-h-11 items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm font-semibold text-amber-900 transition hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700">
                      {label}<span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
