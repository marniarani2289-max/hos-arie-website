import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ResearchProgramme from "./components/ResearchProgramme";
import Publications from "./components/Publications";
import AcademicCV from "./components/AcademicCV";
import Projects from "./components/Projects";
import News from "./components/News";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <ResearchProgramme />

      <Publications />

      <AcademicCV />

      <Projects />

      <News />

      <Contact />

      <Footer />
    </>
  );
}