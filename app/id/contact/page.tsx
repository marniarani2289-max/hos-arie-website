import type { Metadata } from "next";
import { Camera, GraduationCap, Mail, MapPin, Users, Video } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi Dr. Hos Arie Sibarani untuk kolaborasi akademik, penelitian, konferensi, dan undangan berbicara.",
  alternates: {
    canonical: "/id/contact",
    languages: {
      id: "/id/contact",
      en: "/contact",
      "x-default": "/contact",
    },
  },
};

const linkClass = "rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-amber-400";

export default function IndonesianContactPage() {
  return (
    <main className="min-h-[70vh] bg-slate-950 px-6 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[.3em] text-amber-400">Kontak</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold md:text-6xl">Kolaborasi akademik dan undangan berbicara.</h1>
        <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-300">Untuk penelitian bersama, kuliah umum, konferensi, pengembangan institusi, atau permintaan media, silakan menghubungi melalui kanal berikut.</p>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <a href="mailto:riesib8@gmail.com" className={linkClass}>
            <Mail className="text-amber-400" />
            <p className="mt-5 font-bold">Email</p>
            <p className="mt-2 break-all text-sm text-slate-400">riesib8@gmail.com</p>
          </a>
          <a href="https://scholar.google.com/citations?user=teno_PYAAAAJ&hl=id" target="_blank" rel="noopener noreferrer" className={linkClass}>
            <GraduationCap className="text-amber-400" />
            <p className="mt-5 font-bold">Google Scholar</p>
            <p className="mt-2 text-sm text-slate-400">Profil publikasi akademik</p>
          </a>
          <a href="https://www.youtube.com/@hukumpreneur" target="_blank" rel="noopener noreferrer" className={linkClass}>
            <Video className="text-amber-400" />
            <p className="mt-5 font-bold">YouTube</p>
            <p className="mt-2 text-sm text-slate-400">Hukum Preneur</p>
          </a>
          <a href="https://www.instagram.com/hossibarani/" target="_blank" rel="noopener noreferrer" className={linkClass}>
            <Camera className="text-amber-400" />
            <p className="mt-5 font-bold">Instagram</p>
            <p className="mt-2 text-sm text-slate-400">@hossibarani</p>
          </a>
          <a href="https://www.facebook.com/hossibarani/" target="_blank" rel="noopener noreferrer" className={linkClass}>
            <Users className="text-amber-400" />
            <p className="mt-5 font-bold">Facebook</p>
            <p className="mt-2 text-sm text-slate-400">Hos Sibarani</p>
          </a>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <MapPin className="text-amber-400" />
            <p className="mt-5 font-bold">Lokasi</p>
            <p className="mt-2 text-sm text-slate-400">Kepulauan Riau, Indonesia</p>
          </div>
        </div>
      </div>
    </main>
  );
}
