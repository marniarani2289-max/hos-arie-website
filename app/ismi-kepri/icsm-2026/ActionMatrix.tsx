"use client";
import { useState } from "react";
import actions from "@/lib/ismi-kepri/actions.json";
import s from "../ismi.module.css";
const groups = [...new Set(actions.map(a=>a.group))];

export default function ActionMatrix() {
  const [query,setQuery]=useState("");
  const [group,setGroup]=useState("");
  const [priority,setPriority]=useState("");
  const term=query.trim().toLocaleLowerCase("id-ID");
  const filtered=actions.filter(a=>(!group || a.group===group) && (!priority || a.priority===priority) && (!term || [a.id,a.agenda,a.action,a.lead,a.partners,a.refs].join(" ").toLocaleLowerCase("id-ID").includes(term)));
  return <div>
    <div className={s.filters}>
      <label>Cari usulan<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Topik, kode aksi, atau calon penanggung jawab…" /></label>
      <label>Kelompok<select value={group} onChange={e=>setGroup(e.target.value)}><option value="">Semua kelompok</option>{groups.map(g=><option key={g} value={g}>{g.slice(2)}</option>)}</select></label>
      <label>Prioritas<select value={priority} onChange={e=>setPriority(e.target.value)}><option value="">Semua prioritas</option>{[...new Set(actions.map(a=>a.priority))].sort().map(p=><option key={p} value={p}>{p}</option>)}</select></label>
    </div>
    <div className={s.resultBar}><p role="status">Menampilkan <strong>{filtered.length}</strong> dari {actions.length} usulan aksi</p>{(query||group||priority)&&<button type="button" onClick={()=>{setQuery("");setGroup("");setPriority("");}}>Atur ulang filter</button>}</div>
    <p className={s.matrixHelp}>P1 = fondasi/langkah awal dalam 100 hari; P2 = pengembangan hingga 180 hari; P3 = kajian hingga 365 hari. Hari dihitung sejak T0 (tanggal mulai yang disepakati). Buka setiap aksi untuk melihat rincian.</p>
    {filtered.length===0 ? <div className={s.empty}>Tidak ada usulan yang sesuai. Ubah kata kunci atau atur ulang filter.</div> : <div className={s.matrixList}>{filtered.map(a=><details className={s.actionRow} key={a.id}>
      <summary><span className={s.actionId}>{a.id}</span><span className={s.actionTitle}><small>{a.group.slice(2)}</small><strong>{a.agenda}</strong></span><span className={s.priority}>{a.priority}</span><span className={s.day}>Hari {a.start}–{a.end}</span><span className={s.status}>Usulan</span><span className={s.expand} aria-hidden="true">+</span></summary>
      <div className={s.actionDetail}><p className={s.actionDescription}>{a.action}</p><dl>{[
        ["Keluaran",a.output],["Calon penanggung jawab",a.lead],["Mitra yang diusulkan",a.partners],["Indikator",a.indicator],["Target usulan",a.target],["Kondisi awal",a.baseline],["Ketergantungan",a.deps],["Bukti yang diperlukan",a.evidence],["Komponen biaya",a.cost],["Opsi pendanaan",a.fund],["Risiko & mitigasi",a.risk],["Rujukan butir sumber",a.refs]
      ].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p className={s.matrixHelp}>Penanggung jawab, target, pendanaan, dan jadwal memerlukan kesepakatan pihak terkait. Rujukan butir dapat ditelusuri pada lembar Cakupan di berkas Excel.</p></div>
    </details>)}</div>}
  </div>;
}
