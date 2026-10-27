import Quiz from './Quiz';
import {topics} from '@/lib/cji/upa';
export const metadata={title:'Latihan Soal UPA & Simulasi Mandiri | Constitutional Justice',description:'24 soal latihan profesi advokat dengan mode belajar, simulasi berbatas waktu, pembahasan, dan rujukan sumber hukum.',alternates:{canonical:'/constitutional-justice/pkpa/latihan-upa'}};
export default async function Page({searchParams}:{searchParams:Promise<{topik?:string}>}){const {topik}=await searchParams;return <Quiz initialTopic={topics.some(t=>t.id===topik)?topik!:''}/>}
