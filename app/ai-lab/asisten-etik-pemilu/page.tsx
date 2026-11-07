import type {Metadata} from 'next';
import {Manrope} from 'next/font/google';
import Prototype from './prototype';
import './prototype.css';
const font=Manrope({subsets:['latin'],display:'swap'});
export const metadata:Metadata={title:'Asisten Etik Pemilu · Prototipe AI',description:'Ruang riset etika pemilu dengan sumber hukum, status validasi, dan penelaahan manusia.',robots:{index:false,follow:false}};
export default function Page(){return <div className={font.className}><Prototype/></div>}
