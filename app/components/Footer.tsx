export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-8 py-16">

        <div className="grid gap-12 md:grid-cols-4">

          {/* Profile */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Dr. Hos Arie Sibarani
            </h2>

            <p className="mt-4 leading-7">
              Legal Scholar, Constitutional Theorist, and Malay Studies
              Researcher dedicated to advancing constitutional thought,
              ethical governance, and Malay intellectual heritage.
            </p>
          </div>

          {/* Research */}
          <div>
            <h3 className="text-xl font-semibold text-white">
              Research
            </h3>

            <ul className="mt-4 space-y-3">
              <li>Constitutional Theory</li>
              <li>Private Law</li>
              <li>Malay Studies</li>
              <li>Environmental Law</li>
            </ul>
          </div>

          {/* Academic Profiles */}
          <div>
            <h3 className="text-xl font-semibold text-white">
              Academic Profiles
            </h3>

            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="hover:text-amber-500">
                  Google Scholar
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-amber-500">
                  Scopus
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-amber-500">
                  ORCID
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-amber-500">
                  ResearchGate
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white">
              Contact
            </h3>

            <ul className="mt-4 space-y-3">
              <li>Email</li>
              <li>LinkedIn</li>
              <li>Instagram</li>
              <li>X (Twitter)</li>
            </ul>
          </div>

        </div>

        <div className="mt-16 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Dr. Hos Arie Sibarani. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}