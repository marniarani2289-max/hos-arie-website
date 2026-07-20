import HeroV2 from "./components/home/HeroV2";
import AcademicProfile from "./components/home/AcademicProfile";
import ResearchAreas from "./components/home/ResearchAreas";
import FeaturedResearch from "./components/home/FeaturedResearch";
import SelectedWork from "./components/home/SelectedWork";
import CollaborationCTA from "./components/home/CollaborationCTA";

export default function Home() {
  return (
    <main className="bg-white">
      <HeroV2 />
      <AcademicProfile />
      <ResearchAreas />
      <FeaturedResearch />
      <SelectedWork />
      <CollaborationCTA />
    </main>
  );
}