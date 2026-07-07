import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Research from "./components/Research";
import Publications from "./components/Publications";
import Books from "./components/Books";
import Footer from "./components/Footer";
import Projects from "./components/Projects";
import AcademicCV from "./components/AcademicCV";
import Contact from "./components/Contact";
import Ideas from "./components/Ideas";
import News from "./components/News";
import DigitalArchive from "./components/DigitalArchive";

export default function Home() {
  return (
    <>
      <Navbar />
<Hero />
<About />
<Research />
<Publications />
<Ideas />
<Books />
<AcademicCV />
<Projects />
<News />
<DigitalArchive />
<Contact />
<Footer />

    </>
  );
}