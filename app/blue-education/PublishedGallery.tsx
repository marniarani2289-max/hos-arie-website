import { pilotService } from "@/lib/blue-education/pilot-server";
import type { GalleryItem } from "@/lib/blue-education/gallery";
import PracticeGallery from "./PracticeGallery";
export default async function PublishedGallery(){
 try{
  const {data,error}=await pilotService().from("blue_education_gallery").select("id,title,institution,district,theme,kind,activity_date,context,action,results,lessons,source_url,image_url,image_alt,image_credit").eq("status","published").eq("publication_confirmed",true).order("activity_date",{ascending:false}).order("created_at",{ascending:false});
  if(error)return <PracticeGallery items={[]} unavailable/>;
  return <PracticeGallery items={(data||[]) as GalleryItem[]}/>;
 }catch{return <PracticeGallery items={[]} unavailable/>;}
}
