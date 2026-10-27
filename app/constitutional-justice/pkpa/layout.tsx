import Link from 'next/link';
import { Scale } from 'lucide-react';
import styles from './pkpa.module.css';
export default function Layout({children}:{children:React.ReactNode}){return <div className={styles.site} lang="id"><nav className={styles.nav} aria-label="Pendidikan profesi advokat"><Link className={styles.brand} href="/constitutional-justice"><Scale size={30}/><span>Constitutional Justice<small>PENDIDIKAN PROFESI ADVOKAT</small></span></Link><div className={styles.navLinks}><Link href="/constitutional-justice/pkpa">Program PKPA</Link><Link href="/constitutional-justice/pkpa/materi">Ruang belajar</Link><Link href="/constitutional-justice/pkpa/latihan-upa">Latihan UPA ↗</Link></div></nav>{children}</div>}
