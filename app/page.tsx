import Hero from "./components/Hero";
import About from "./components/About";
import ResearchProgramme from "./components/ResearchProgramme";
import Publications from "./components/Publications";
import Books from "./components/Books";
import Opinions from "./components/Opinions";
import DigitalArchive from "./components/DigitalArchive";
import AcademicCV from "./components/AcademicCV";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ResearchProgramme />
      <Publications />
      <Books />
      <Opinions />
      <DigitalArchive />
      <AcademicCV />
      <Contact />
    </>
  );
}