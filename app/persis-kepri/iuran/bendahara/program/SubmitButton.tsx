'use client';
import {useFormStatus} from 'react-dom';
export default function SubmitButton({label}:{label:string}){const {pending}=useFormStatus();return <button disabled={pending} className="rounded-lg bg-emerald-800 px-4 py-3 font-bold text-white disabled:opacity-60 sm:col-span-2">{pending?'Menyimpan…':label}</button>;}
