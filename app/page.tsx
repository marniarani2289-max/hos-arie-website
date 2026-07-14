import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ResearchProgramme from "./components/ResearchProgramme";
import Publications from "./components/Publications";
import Opinions from "./components/Opinions";
import About from "./components/About";
import AcademicCV from "./components/AcademicCV";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <ResearchProgramme />
        <Publications />
        <Opinions />
        <About />
        <AcademicCV />
        <Contact />
      </main>

      <Footer />
    </>
  );
}