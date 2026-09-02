import type { Metadata } from "next";
import HeroV6 from "./components/home/HeroV6";
import HomeHighlights from "./components/home/HomeHighlights";
import PathwayChooser from "./components/home/PathwayChooser";
import SelectedWork from "./components/home/SelectedWork";

export const metadata: Metadata = { title: "Constitutional Law, Research, and Learning", description: "Explore the research, learning programmes, and collaboration pathways of Dr. Hos Arie Sibarani and the Raja Ali Haji Institute." };

export default function Home() {
  return (
    <>
      <HeroV6 />
      <PathwayChooser compact />
      <HomeHighlights />
      <SelectedWork />
    </>
  );
}
