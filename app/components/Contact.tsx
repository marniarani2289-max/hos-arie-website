import { Camera, Users } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 bg-gray-950 px-5 py-24 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">
          Contact
        </p>

        <h2 className="mt-4 text-4xl font-extrabold">
          Academic Collaboration & Speaking Invitation
        </h2>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
          For academic collaboration, public lectures, research projects,
          conferences, or media inquiries, please get in touch.
        </p>

        <div className="mt-10 space-y-3 text-gray-300">
          <p>
            Email:{" "}
            <a className="font-semibold text-amber-400 hover:text-amber-300" href="mailto:riesib8@gmail.com">
              riesib8@gmail.com
            </a>
          </p>
          <p>Location: Indonesia</p>
          <p>Research Areas: Law, Constitutional Theory, Malay Civilization</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="https://www.instagram.com/hossibarani/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-gray-700 px-4 py-3 font-semibold text-gray-200 transition hover:border-pink-400 hover:text-pink-300" aria-label="Official Instagram of Dr. Hos Arie Sibarani">
            <Camera size={19} /> Instagram
          </a>
          <a href="https://www.facebook.com/hossibarani/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-gray-700 px-4 py-3 font-semibold text-gray-200 transition hover:border-blue-400 hover:text-blue-300" aria-label="Official Facebook of Dr. Hos Arie Sibarani">
            <Users size={19} /> Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
