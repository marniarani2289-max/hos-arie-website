import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Pilot | LexNusa Legal AI",
  description: "Submit a focused pilot request to LexNusa Legal AI.",
  robots: { index: false, follow: false },
};

export default function LexNusaPilotPage() {
  return (
    <main className="min-h-screen bg-[#0D1B2A] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[.22em] text-[#C9A24B]">LexNusa Legal AI</p>
        <h1 className="mt-3 font-academic text-4xl font-bold sm:text-5xl">Request a Pilot</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Use this form for a focused initial engagement. Please do not send confidential documents at this stage.</p>

        <form action="/api/lexnusa/pilot" method="post" className="mt-10 rounded-3xl bg-white p-7 text-[#0D1B2A] shadow-xl sm:p-9">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-bold">Name
              <input name="name" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#0E6B6F]" placeholder="Your name" />
            </label>
            <label className="text-sm font-bold">Organization
              <input name="organization" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#0E6B6F]" placeholder="Company / team" />
            </label>
            <label className="text-sm font-bold sm:col-span-2">Work email
              <input name="email" type="email" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#0E6B6F]" placeholder="you@company.com" />
            </label>
            <label className="text-sm font-bold sm:col-span-2">Project type
              <select name="project" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal">
                <option>Legal AI Output Evaluation</option>
                <option>Legal Research Intelligence</option>
                <option>Case Law &amp; Doctrine Mapping</option>
                <option>Legal AI Dataset &amp; Benchmark</option>
                <option>Indonesia &amp; ASEAN Legal Intelligence</option>
              </select>
            </label>
            <label className="text-sm font-bold sm:col-span-2">What do you need?
              <textarea name="message" required rows={5} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#0E6B6F]" placeholder="Briefly describe the problem, jurisdiction, volume, and desired deliverable." />
            </label>
            <div className="hidden" aria-hidden="true">
              <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
          </div>
          <button type="submit" className="mt-6 w-full rounded-xl bg-[#C9A24B] px-5 py-4 font-black text-[#0D1B2A]">Submit Pilot Request</button>
          <p className="mt-3 text-xs leading-5 text-slate-500">Your request is stored before the notification email is attempted.</p>
        </form>
      </div>
    </main>
  );
}
