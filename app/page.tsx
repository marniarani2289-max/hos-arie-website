import type { Metadata } from "next";
import HeroV6 from "./components/home/HeroV6";
import HomeHighlights from "./components/home/HomeHighlights";
import PathwayChooser from "./components/home/PathwayChooser";
import SelectedWork from "./components/home/SelectedWork";

export const metadata: Metadata = {
  title: "Constitutional Law Scholar & Raja Ali Haji Research",
  description: "Explore Dr. Hos Arie Sibarani's constitutional-law research, Malay Ethical Constitutionalism, Raja Ali Haji Institute learning programmes, publications, and collaboration pathways.",
  alternates: { canonical: "/", languages: { id: "/id", en: "/" } },
};

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
