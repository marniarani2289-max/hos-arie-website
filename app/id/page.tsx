import HomeContact from "../components/home/HomeContact";
import HeroV6 from "../components/home/HeroV6";
import BiafInvitation from "../components/home/BiafInvitation";
import type { Metadata } from "next";

import ProgrammeCards from "../components/programmes/ProgrammeCards";
import HomeHighlights from "../components/home/HomeHighlights";
import SelectedWork from "../components/home/SelectedWork";

export const metadata: Metadata = {
  title: "Akademisi Hukum Tata Negara & Pemikiran Raja Ali Haji",
  description: "Situs resmi Dr. Hos Arie Sibarani tentang hukum tata negara, pemikiran konstitusional Melayu, Raja Ali Haji, publikasi, dan kolaborasi akademik.",
  alternates: { canonical: "/id", languages: { id: "/id", en: "/" } },
};


export default function IndonesianHomePage() {
  return <div lang="id" className="bg-white text-slate-900">
    <HeroV6 locale="id" />
    <HomeHighlights locale="id" />
    <SelectedWork locale="id" />
    <ProgrammeCards locale="id" />
    <BiafInvitation locale="id" />
    <HomeContact locale="id" />
  </div>;
}
