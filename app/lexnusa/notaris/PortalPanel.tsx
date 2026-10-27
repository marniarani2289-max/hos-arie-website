'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Download, Plus, X } from 'lucide-react';
import { csvCell, officialPortals, portalPacket, portalProviders, portalServices, portalStatuses, type Data, type PortalProvider, type RecordItem } from '@/lib/lexnusa/notaris/model';
import styles from './notaris.module.css';

type Props = { items: RecordItem[]; busy: boolean; error: string; persist: (value: unknown, item?: RecordItem, archived?: boolean) => Promise<boolean>; openDocuments: () => void };
const checks = [['prepared_checked', 'Data permohonan disiapkan'], ['authority_checked', 'Kewenangan dan akses portal diperiksa'], ['files_checked', 'Kelengkapan berkas diperiksa'], ['reviewed_checked', 'Ditelaah penanggung jawab']];
function download(name: string, content: string, type = 'text/plain;charset=utf-8') {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement('a'); link.href = url; link.download = name; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export default function PortalPanel({ items, busy, error, persist, openDocuments }: Props) {
  const [editing, setEditing] = useState<{ item?: RecordItem } | null>(null);
  const [provider, setProvider] = useState<PortalProvider>('AHU');
  const [parent, setParent] = useState('');
  const [status, setStatus] = useState<string>(portalStatuses[0]);
  const [filter, setFilter] = useState(''); const [query, setQuery] = useState(''); const [archived, setArchived] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (editing) dialog.current?.showModal(); else dialog.current?.close(); }, [editing]);
  function edit(item?: RecordItem) {
    setProvider((item?.data.provider as PortalProvider) || 'AHU'); setParent(item?.parent_id || '');
    setStatus(String(item?.data.portal_status || portalStatuses[0])); setEditing({ item });
  }
  const visible = items.filter(x => x.kind === 'submission' && x.archived === archived && (!filter || x.data.provider === filter) && (x.title + ' ' + Object.values(x.data).join(' ')).toLowerCase().includes(query.toLowerCase()));
  const documents = items.filter(x => x.kind === 'document' && x.parent_id === parent && x.data.file_path && (!x.archived || x.id === editing?.item?.data.evidence_id));
  const matters = items.filter(x => x.kind === 'matter' && (!x.archived || x.id === parent));
  const submitted = status !== 'Draf persiapan' && status !== 'Dibatalkan';
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' });
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget); const data: Data = {};
    for (const [key, value] of form.entries()) if (!['title', 'parent_id'].includes(key)) data[key] = String(value);
    for (const [key] of checks) data[key] = form.has(key);
    if (await persist({ kind: 'submission', title: form.get('title'), parent_id: parent, data }, editing?.item)) setEditing(null);
  }
  function packet(item: RecordItem) {
    const matter = items.find(x => x.id === item.parent_id); if (!matter) return;
    download('lexnusa-pendamping-' + item.id.slice(0, 8) + '.txt', portalPacket(item, matter, items.find(x => x.id === matter.parent_id)));
  }
  function exportCSV() {
    const rows = [['Portal', 'Layanan', 'Permohonan', 'Pekerjaan', 'Status catatan manual', 'Nomor permohonan', 'Tanggal pengajuan', 'Pemeriksaan terakhir', 'Nomor hasil'], ...visible.map(x => [x.data.provider, x.data.portal_service, x.title, items.find(m => m.id === x.parent_id)?.title, x.data.portal_status, x.data.reference, x.data.submitted_on, x.data.checked_on, x.data.result_number])];
    download('lexnusa-permohonan-portal.csv', '\uFEFF' + rows.map(r => r.map(csvCell).join(',')).join('\r\n'), 'text/csv;charset=utf-8');
  }
  return <>
    <section className={styles.portalIntro}><div><p className={styles.eyebrow}>PENDAMPING PORTAL RESMI</p><h2>Siapkan berkas. Catat perkembangannya.</h2><p>Pengajuan dilakukan oleh petugas berwenang di portal instansi. LexNusa menyimpan catatan persiapan, nomor permohonan, dan bukti hasil.</p></div><span className={styles.pill}>API BELUM TERHUBUNG</span></section>
    <div className={styles.portalProviders}>{portalProviders.map(p => <section key={p} className={styles.panel}><div className={styles.recordTop}><h2>{p === 'AHU' ? 'Administrasi Hukum Umum' : 'ATR / BPN'}</h2><span className={styles.badge}>Portal resmi</span></div><p>{p === 'AHU' ? 'Pendamping pencatatan layanan badan hukum, badan usaha, dan layanan AHU lainnya.' : 'Pendamping layanan pertanahan. Gunakan akun dan kewenangan sesuai layanan; akses Mitra PPAT memerlukan validasi instansi.'}</p><a className={styles.secondary} href={officialPortals[p]} target="_blank" rel="noopener noreferrer">Buka {p === 'AHU' ? 'AHU' : 'Mitra ATR/BPN'} <ArrowUpRight size={16}/></a><small className={styles.portalHint}>Tidak mengirim data atau kredensial dari LexNusa.</small></section>)}</div>
    <div className={styles.toolbar}><label className={styles.search}><input aria-label="Cari permohonan" placeholder="Cari permohonan atau nomor referensi…" value={query} onChange={e => setQuery(e.target.value)}/></label><select aria-label="Filter portal" value={filter} onChange={e => setFilter(e.target.value)}><option value="">Semua portal</option>{portalProviders.map(p => <option key={p}>{p}</option>)}</select><label className={styles.toggle}><input type="checkbox" checked={archived} onChange={e => setArchived(e.target.checked)}/>Lihat arsip</label><button className={styles.secondary} onClick={exportCSV}><Download size={16}/>CSV</button><button className={styles.primary} onClick={() => edit()}><Plus size={16}/>Permohonan baru</button></div>
    <p className={styles.muted}>Status di bawah dicatat manual oleh pengelola. Tidak disinkronkan atau diverifikasi otomatis oleh instansi.</p>
    <div className={styles.records}>{visible.map(item => <article key={item.id} className={styles.record}><div className={styles.recordTop}><span className={styles.eyebrow}>{String(item.data.provider)}</span><span className={styles.badge}>{item.archived ? 'Arsip' : String(item.data.portal_status)}</span></div><h2>{item.title}</h2><p>{String(item.data.portal_service)}</p><p className={styles.muted}>{items.find(x => x.id === item.parent_id)?.title}</p><dl className={styles.portalDetails}><div><dt>Nomor permohonan</dt><dd>{String(item.data.reference || 'Belum dicatat')}</dd></div><div><dt>Diperiksa di portal</dt><dd>{String(item.data.checked_on || 'Belum dicatat')}</dd></div><div><dt>Nomor hasil / SK</dt><dd>{String(item.data.result_number || 'Belum dicatat')}</dd></div></dl><div className={styles.recordActions}><button disabled={busy} onClick={() => edit(item)}>Buka / perbarui <ArrowUpRight size={14}/></button><button onClick={() => packet(item)}>Lembar pendamping</button>{item.data.evidence_id && <a href={'/api/lexnusa/notaris/files?id=' + item.data.evidence_id}>Unduh bukti</a>}<button disabled={busy} onClick={() => { if (confirm(item.archived ? 'Pulihkan permohonan ini?' : 'Arsipkan permohonan ini? Catatan dapat dipulihkan.')) void persist(item, item, !item.archived); }}>{item.archived ? 'Pulihkan' : 'Arsipkan'}</button></div></article>)}</div>
    {!visible.length && <section className={`${styles.panel} ${styles.empty}`}><h3>Belum ada permohonan yang sesuai.</h3><p>Buat permohonan dari pekerjaan kantor, lalu catat hasil pemeriksaan portal.</p></section>}
    <section className={styles.workflowNote}><div><h3>Koneksi otomatis memerlukan akses resmi.</h3><p>Sinkronisasi API belum aktif. Aktivasi memerlukan persetujuan akses, dokumentasi endpoint dan autentikasi, serta pengujian dengan instansi. Jangan menyimpan kata sandi portal pada catatan permohonan.</p></div><button onClick={openDocuments}>Buka arsip dokumen →</button></section>
    <dialog ref={dialog} className={styles.dialog} aria-label="Permohonan portal" onCancel={e => { if (busy) e.preventDefault(); else setEditing(null); }}>{editing && <form key={editing.item?.id || 'new'} onSubmit={submit}><div className={styles.modalHead}><div><p className={styles.eyebrow}>CATATAN MANUAL KANTOR</p><h2>{editing.item ? 'Perbarui permohonan' : 'Permohonan baru'}</h2></div><button type="button" disabled={busy} aria-label="Tutup permohonan" onClick={() => setEditing(null)}><X/></button></div><div className={styles.formGrid}>
      <label className={styles.wide}>Judul permohonan<input name="title" required maxLength={160} defaultValue={editing.item?.title || ''} autoFocus/></label>
      <label className={styles.wide}>Pekerjaan terkait<select required name="parent_id" value={parent} onChange={e => setParent(e.target.value)}><option value="">Pilih pekerjaan</option>{matters.map(x => <option key={x.id} value={x.id}>{x.title}{x.archived ? ' (arsip)' : ''}</option>)}</select>{!matters.length && <small>Tambahkan pekerjaan di modul Pekerjaan terlebih dahulu.</small>}</label>
      <label>Portal<select name="provider" value={provider} onChange={e => setProvider(e.target.value as PortalProvider)}>{portalProviders.map(p => <option key={p}>{p}</option>)}</select></label>
      <label>Layanan<select key={provider} name="portal_service" defaultValue={editing.item?.data.provider === provider ? String(editing.item.data.portal_service) : portalServices[provider][0]}>{portalServices[provider].map(s => <option key={s}>{s}</option>)}</select></label>
      <label className={styles.wide}>Status catatan kantor<select name="portal_status" value={status} onChange={e => setStatus(e.target.value)}>{portalStatuses.map(s => <option key={s}>{s}</option>)}</select></label>
      <label>Nomor permohonan<input name="reference" maxLength={500} required={submitted} defaultValue={String(editing.item?.data.reference || '')}/></label>
      <label>Tanggal pengajuan<input type="date" name="submitted_on" max={today} required={submitted} defaultValue={String(editing.item?.data.submitted_on || '')}/></label>
      <label>Pemeriksaan terakhir di portal<input type="date" name="checked_on" max={today} required={submitted} defaultValue={String(editing.item?.data.checked_on || '')}/></label>
      <label>Status yang terlihat di portal<input name="official_status" maxLength={500} defaultValue={String(editing.item?.data.official_status || '')}/></label>
      <label className={styles.wide}>Nomor hasil / SK<input name="result_number" maxLength={500} defaultValue={String(editing.item?.data.result_number || '')}/></label>
      <label className={styles.wide}>Berkas bukti hasil<select key={parent} name="evidence_id" required={status === 'Hasil diterima'} defaultValue={documents.some(x => x.id === editing.item?.data.evidence_id) ? String(editing.item?.data.evidence_id) : ''}><option value="">Belum ditautkan</option>{documents.map(x => <option key={x.id} value={x.id}>{x.title}</option>)}</select><small>Unggah bukti di modul Dokumen dan tautkan ke pekerjaan yang sama. Wajib untuk status “Hasil diterima”.</small></label>
      <fieldset className={styles.checklist}><legend>Persiapan kantor</legend>{checks.map(([key, label]) => <label key={key}><input type="checkbox" name={key} defaultChecked={editing.item?.data[key] === true}/>{label}</label>)}</fieldset>
      <label className={styles.wide}>Catatan<textarea name="notes" rows={3} maxLength={4000} defaultValue={String(editing.item?.data.notes || '')}/></label>
    </div>{error && <p className={styles.error} role="alert">{error}</p>}<div className={styles.modalFoot}><button type="button" className={styles.secondary} disabled={busy} onClick={() => setEditing(null)}>Batal</button><button className={styles.primary} disabled={busy}>{busy ? 'Menyimpan…' : 'Simpan catatan'}</button></div></form>}</dialog>
  </>;
}
