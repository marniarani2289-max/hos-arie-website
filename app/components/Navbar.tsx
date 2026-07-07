export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <div>
          <h1 className="text-lg font-bold text-gray-900 md:text-2xl">
            Dr. Hos Arie Sibarani
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-amber-700 md:text-xs">
            Legal Scholar
          </p>
        </div>

        <ul className="hidden items-center gap-8 text-sm font-semibold text-gray-700 lg:flex">
          <li><a href="#" className="transition hover:text-amber-700">Home</a></li>
          <li><a href="#about" className="transition hover:text-amber-700">About</a></li>
          <li><a href="#research" className="transition hover:text-amber-700">Research</a></li>
          <li><a href="#publications" className="transition hover:text-amber-700">Publications</a></li>
          <li><a href="#ideas" className="transition hover:text-amber-700">Ideas</a></li>
          <li>
            <a
              href="#contact"
              className="rounded-full bg-gray-900 px-5 py-3 text-white transition hover:bg-amber-700"
            >
              Contact
            </a>
          </li>
        </ul>

        <a
          href="#contact"
          className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white lg:hidden"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}