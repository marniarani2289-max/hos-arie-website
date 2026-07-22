import HeroV6 from "./components/home/HeroV6";
import ResearchIdentity from "./components/home/ResearchIdentity";
import FlagshipProgramme from "./components/home/FlagshipProgramme";
import FeaturedResearch from "./components/home/FeaturedResearch";
import SelectedWork from "./components/home/SelectedWork";
import BooksMonographs from "./components/BooksMonographs";
import CollaborationCTA from "./components/home/CollaborationCTA";

export default function Home() {
  return (
    <>
      <HeroV6 />
      <ResearchIdentity />
      <FlagshipProgramme />
      <FeaturedResearch />
      <SelectedWork />
      <BooksMonographs />
      <CollaborationCTA />
    </>
  );
}