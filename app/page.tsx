import HeroV2 from "./components/home/HeroV2";
import ResearchAreas from "./components/home/ResearchAreas";
import FeaturedResearch from "./components/home/FeaturedResearch";
import SelectedWork from "./components/home/SelectedWork";
import BooksMonographs from "./components/BooksMonographs";
import CollaborationCTA from "./components/home/CollaborationCTA";

export default function Home() {
  return (
    <main>
      <HeroV2 />
      <ResearchAreas />
      <FeaturedResearch />
      <SelectedWork />
      <BooksMonographs />
      <CollaborationCTA />
    </main>
  );
}