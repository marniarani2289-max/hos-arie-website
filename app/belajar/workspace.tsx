"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Download,
  GraduationCap,
  LoaderCircle,
  Plus,
  Save,
  Send,
  Trash2,
} from "lucide-react";
import {
  emptyWorkspace,
  roles,
  safeSourceUrl,
  type Generation,
  type Role,
  type Workspace,
} from "@/lib/alter/model";
import styles from "./workspace.module.css";

const presets = [
  "AI untuk pembelajaran",
  "Pemikiran Raja Ali Haji",
  "Penulisan akademik",
  "Penalaran hukum",
];
const links = [
  ["Raja Ali Haji Institute", "/raja-ali-haji"],
  ["Kelas Hukum Mayantara", "/lexnusa/mayantara"],
  ["AI Lab", "/ai-lab"],
  ["Video Hukumpreneur", "/hukumpreneur"],
];
export default function AlterWorkspace({ signedIn }: { signedIn: boolean }) {
  const [work, setWork] = useState<Workspace>(emptyWorkspace);
  const [version, setVersion] = useState<string | null>(null);
  const [history, setHistory] = useState<Generation[]>([]);
  const [active, setActive] = useState<Role>("advisor");
  const [question, setQuestion] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(signedIn);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState<"save" | "ai" | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const lock = useRef(false);
  const role = roles.find((r) => r.key === active)!;
  const done = work.tasks.filter((t) => t.done).length;
  const percent = work.tasks.length
    ? Math.round((done / work.tasks.length) * 100)
    : 0;

  useEffect(() => {
    if (!signedIn) return;
    const controller = new AbortController();
    fetch("/api/alter/workspace", {
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || "Ruang belajar belum dapat dimuat.");
        return data;
      })
      .then((data) => {
        if (controller.signal.aborted) return;
        setWork(data.workspace);
        setVersion(data.version);
        setHistory(data.history);
        setLoaded(true);
        setDirty(false);
      })
      .catch((e) => {
        if (!controller.signal.aborted)
          setError(
            e instanceof Error ? e.message : "Gagal memuat ruang belajar.",
          );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [signedIn]);
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  function edit(next: Workspace) {
    setWork(next);
    setDirty(true);
    setMessage("");
  }
  async function persist() {
    const response = await fetch("/api/alter/workspace", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workspace: work, version }),
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.error || "Belum tersimpan. Coba lagi.");
    setVersion(data.version);
    setDirty(false);
    return data.version as string;
  }
  async function save() {
    if (lock.current) return;
    lock.current = true;
    setBusy("save");
    setError("");
    setMessage("");
    try {
      await persist();
      setMessage("Ruang belajar tersimpan di akun Anda.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Penyimpanan gagal.");
    } finally {
      lock.current = false;
      setBusy(null);
    }
  }
  async function ask() {
    if (lock.current || !question.trim() || !consent) return;
    lock.current = true;
    setBusy("ai");
    setError("");
    setMessage("");
    try {
      const savedVersion = await persist();
      const response = await fetch("/api/alter/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: active,
          question: question.trim(),
          consent,
          version: savedVersion,
        }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "AI belum berhasil merespons.");
      setHistory((h) => [data.generation, ...h].slice(0, 50));
      setQuestion("");
      setMessage("Respons AI tersimpan. Periksa sebelum digunakan.");
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Permintaan gagal. Coba kembali.",
      );
    } finally {
      lock.current = false;
      setBusy(null);
    }
  }
  function exportNotes() {
    const content = [
      `# Ruang belajar ALTER`,
      `Tujuan: ${work.goal}`,
      `Tingkat: ${work.level} | ${work.minutes} menit/hari | ${work.weeks} minggu`,
      "## Tugas",
      ...work.tasks.map(
        (t) => `- [${t.done ? "x" : " "}] ${t.title}\n  Bukti: ${t.evidence}`,
      ),
      "## Sumber",
      ...work.sources.map(
        (s) =>
          `### ${s.title}\n${s.url}\nDiperiksa pengguna: ${s.reviewed ? "Ya" : "Belum"}\n${s.excerpt}`,
      ),
      "## Draf karya",
      work.draft,
      "## Refleksi",
      work.reflection,
      "## Percakapan (maksimal 50 terbaru)",
      ...[...history]
        .reverse()
        .filter((h) => h.status === "completed")
        .map(
          (h) =>
            `### ${h.role} — ${h.created_at}\nPertanyaan: ${h.question}\n\n${h.output}`,
        ),
    ].join("\n\n");
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/markdown;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "catatan-belajar-alter.md";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div className={styles.shell} lang="id">
      <div className={styles.topline}>
        <span>
          <GraduationCap size={22} /> ALTER / RUANG BELAJAR
        </span>
        <Link href="/dashboard">
          Dasbor peserta <ArrowRight size={16} />
        </Link>
      </div>
      <header className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>BELAJAR DENGAN ARAH</p>
          <h1>Universitas pribadi Anda.</h1>
          <p>Satu tujuan. Lima peran AI. Karya yang terus berkembang.</p>
        </div>
        {signedIn && loaded && (
          <div className={styles.actions}>
            <button onClick={exportNotes} className={styles.secondary}>
              <Download size={17} /> Unduh catatan
            </button>
            <button
              disabled={!!busy || !dirty}
              onClick={save}
              className={styles.primary}
            >
              {busy === "save" ? (
                <LoaderCircle size={17} />
              ) : (
                <Save size={17} />
              )}{" "}
              Simpan
            </button>
          </div>
        )}
      </header>
      {!signedIn ? (
        <section className={styles.signin}>
          <BookOpen size={36} />
          <h2>Mulai dari hal yang ingin Anda kuasai.</h2>
          <p>
            Masuk dengan akun peserta untuk menyusun tujuan, berdiskusi dengan
            AI, dan menyimpan kemajuan belajar lintas perangkat.
          </p>
          <Link className={styles.primary} href="/login?next=%2Fbelajar">
            Masuk ke ruang belajar <ArrowRight size={18} />
          </Link>
          <div className={styles.rolePreview}>
            {roles.map((r) => (
              <div key={r.key}>
                <strong>{r.name}</strong>
                <p>{r.label}</p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <>
          <div aria-live="polite" className={styles.status}>
            {loading
              ? "Memuat ruang belajar…"
              : busy === "ai"
                ? "AI sedang menelaah konteks belajar Anda…"
                : message ||
                  (dirty
                    ? "Ada perubahan yang belum disimpan."
                    : loaded
                      ? "Catatan Anda bersifat privat. Simpan sebelum meninggalkan halaman."
                      : "")}
          </div>
          {error && (
            <div role="alert" className={styles.error}>
              {error}
              {!loaded && (
                <button
                  onClick={() => window.location.reload()}
                  disabled={loading}
                >
                  Coba muat kembali
                </button>
              )}
            </div>
          )}
          {loaded && (
            <div className={styles.grid}>
              <aside className={styles.sidebar}>
                <section className={styles.goal}>
                  <p className={styles.eyebrow}>01 / ARAH BELAJAR</p>
                  <h2>Apa target Anda?</h2>
                  <fieldset disabled={!!busy}>
                    <label htmlFor="goal">Tujuan yang ingin dicapai</label>
                    <textarea
                      id="goal"
                      rows={4}
                      maxLength={500}
                      value={work.goal}
                      onChange={(e) => edit({ ...work, goal: e.target.value })}
                      placeholder="Contoh: membuat satu materi ajar interaktif dengan AI."
                    />
                    <div className={styles.chips}>
                      {presets.map((p) => (
                        <button
                          type="button"
                          key={p}
                          onClick={() => edit({ ...work, goal: p })}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                    <label htmlFor="level">Tingkat awal</label>
                    <select
                      id="level"
                      value={work.level}
                      onChange={(e) => edit({ ...work, level: e.target.value })}
                    >
                      {["Pemula", "Menengah", "Lanjutan"].map((l) => (
                        <option key={l}>{l}</option>
                      ))}
                    </select>
                    <div className={styles.two}>
                      <div>
                        <label htmlFor="minutes">Menit / hari</label>
                        <input
                          id="minutes"
                          type="number"
                          min={10}
                          max={180}
                          value={work.minutes}
                          onChange={(e) =>
                            edit({ ...work, minutes: Number(e.target.value) })
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="weeks">Minggu</label>
                        <input
                          id="weeks"
                          type="number"
                          min={1}
                          max={12}
                          value={work.weeks}
                          onChange={(e) =>
                            edit({ ...work, weeks: Number(e.target.value) })
                          }
                        />
                      </div>
                    </div>
                  </fieldset>
                </section>
                <section className={styles.progress}>
                  <div className={styles.row}>
                    <h2>Kemajuan tugas</h2>
                    <strong>{percent}%</strong>
                  </div>
                  <progress
                    value={done}
                    max={work.tasks.length || 1}
                    aria-label="Kemajuan penyelesaian tugas"
                  />
                  <p>
                    {done} dari {work.tasks.length} tugas selesai
                  </p>
                  <small>
                    Penilaian mandiri berdasarkan bukti belajar, bukan nilai
                    atau sertifikat.
                  </small>
                </section>
                <section className={styles.resources}>
                  <h2>Jelajahi materi</h2>
                  {links.map(([title, href]) => (
                    <Link href={href} key={href}>
                      {title}
                      <ArrowRight size={16} />
                    </Link>
                  ))}
                </section>
              </aside>
              <div className={styles.main}>
                <section className={styles.ai}>
                  <div className={styles.sectionTitle}>
                    <div>
                      <p className={styles.eyebrow}>02 / PENDAMPING BELAJAR</p>
                      <h2>Lima cara untuk maju.</h2>
                    </div>
                    <span className={styles.badge}>ALTER</span>
                  </div>
                  <div
                    className={styles.tabs}
                    role="tablist"
                    aria-label="Peran AI"
                  >
                    {roles.map((r, i) => (
                      <button
                        key={r.key}
                        role="tab"
                        id={`tab-${r.key}`}
                        aria-controls={`panel-${r.key}`}
                        aria-selected={active === r.key}
                        disabled={!!busy}
                        className={active === r.key ? styles.selected : ""}
                        onClick={() => {
                          setActive(r.key);
                          setQuestion("");
                        }}
                      >
                        <span>{"ALTER"[i]}</span>
                        {r.name}
                      </button>
                    ))}
                  </div>
                  <div
                    role="tabpanel"
                    id={`panel-${active}`}
                    aria-labelledby={`tab-${active}`}
                    className={styles.panel}
                  >
                    <h3>{role.label}</h3>
                    <p>{role.help}</p>
                    <div
                      className={styles.conversation}
                      aria-label={`Riwayat ${role.name}`}
                    >
                      {history
                        .filter(
                          (h) => h.role === active && h.status === "completed",
                        )
                        .slice(0, 8)
                        .reverse()
                        .map((h) => (
                          <article key={h.id}>
                            <p className={styles.question}>
                              <strong>Anda</strong>
                              {h.question}
                            </p>
                            <div className={styles.answer}>
                              <strong>{role.name}</strong>
                              <p>{h.output}</p>
                            </div>
                          </article>
                        ))}
                      {!history.some(
                        (h) => h.role === active && h.status === "completed",
                      ) && (
                        <div className={styles.empty}>
                          <BookOpen size={24} />
                          <p>{role.starter}</p>
                          <button
                            disabled={!!busy}
                            onClick={() => setQuestion(role.starter)}
                          >
                            Gunakan pertanyaan ini <ArrowRight size={15} />
                          </button>
                        </div>
                      )}
                    </div>
                    <label htmlFor="question">
                      Pertanyaan atau jawaban latihan
                    </label>
                    <textarea
                      disabled={!!busy}
                      id="question"
                      rows={3}
                      maxLength={4000}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder={role.starter}
                    />
                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        checked={consent}
                        disabled={!!busy}
                        onChange={(e) => setConsent(e.target.checked)}
                      />
                      <span>
                        Saya setuju tujuan, kutipan sumber, draf, refleksi,
                        tugas, dan percakapan terkait dikirim ke layanan AI.
                        Saya tidak memasukkan data rahasia.
                      </span>
                    </label>
                    <div className={styles.sendRow}>
                      <small>
                        AI dapat keliru. Tautan sumber tidak dibaca otomatis.
                        <br />
                        Maks. 20 respons per 24 jam; jeda 1 menit
                        antarpermintaan.
                      </small>
                      <button
                        className={styles.primary}
                        disabled={
                          !!busy ||
                          !question.trim() ||
                          !work.goal.trim() ||
                          !consent
                        }
                        onClick={ask}
                      >
                        {busy === "ai" ? (
                          <LoaderCircle size={17} />
                        ) : (
                          <Send size={17} />
                        )}{" "}
                        {busy === "ai" ? "Memproses…" : "Kirim"}
                      </button>
                    </div>
                  </div>
                </section>
                <section className={styles.card}>
                  <div className={styles.sectionTitle}>
                    <div>
                      <p className={styles.eyebrow}>03 / BACA & PERIKSA</p>
                      <h2>Meja sumber</h2>
                    </div>
                    <button
                      className={styles.secondary}
                      disabled={!!busy || work.sources.length >= 12}
                      onClick={() =>
                        edit({
                          ...work,
                          sources: [
                            ...work.sources,
                            {
                              id: crypto.randomUUID(),
                              title: "Sumber baru",
                              url: "",
                              excerpt: "",
                              reviewed: false,
                            },
                          ],
                        })
                      }
                    >
                      <Plus size={17} /> Sumber
                    </button>
                  </div>
                  <p className={styles.muted}>
                    Simpan judul dan kutipan agar Librarian dapat menelaah isi.
                    Maksimal 12 sumber.
                  </p>
                  <fieldset disabled={!!busy}>
                    {work.sources.length === 0 && (
                      <p className={styles.hint}>
                        Belum ada sumber. Mulai dari satu bacaan yang berkaitan
                        dengan tujuan Anda.
                      </p>
                    )}
                    {work.sources.map((s, i) => (
                      <div className={styles.source} key={s.id}>
                        <div className={styles.row}>
                          <label htmlFor={`source-${s.id}`}>
                            Sumber {i + 1}
                          </label>
                          <button
                            aria-label={`Hapus sumber ${i + 1}`}
                            onClick={() =>
                              edit({
                                ...work,
                                sources: work.sources.filter(
                                  (x) => x.id !== s.id,
                                ),
                              })
                            }
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                        <input
                          id={`source-${s.id}`}
                          aria-label={`Judul sumber ${i + 1}`}
                          maxLength={200}
                          value={s.title}
                          onChange={(e) =>
                            edit({
                              ...work,
                              sources: work.sources.map((x) =>
                                x.id === s.id
                                  ? { ...x, title: e.target.value }
                                  : x,
                              ),
                            })
                          }
                        />
                        <input
                          aria-label={`URL sumber ${i + 1}`}
                          type="url"
                          maxLength={2000}
                          value={s.url}
                          placeholder="https://… (opsional)"
                          onChange={(e) =>
                            edit({
                              ...work,
                              sources: work.sources.map((x) =>
                                x.id === s.id
                                  ? {
                                      ...x,
                                      url: e.target.value,
                                      reviewed: false,
                                    }
                                  : x,
                              ),
                            })
                          }
                        />
                        {s.url && safeSourceUrl(s.url) && (
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.sourceLink}
                          >
                            Buka sumber untuk diperiksa ↗
                          </a>
                        )}
                        <textarea
                          aria-label={`Kutipan sumber ${i + 1}`}
                          maxLength={6000}
                          rows={3}
                          value={s.excerpt}
                          placeholder="Tempel kutipan dan nomor halaman atau bagian yang relevan."
                          onChange={(e) =>
                            edit({
                              ...work,
                              sources: work.sources.map((x) =>
                                x.id === s.id
                                  ? {
                                      ...x,
                                      excerpt: e.target.value,
                                      reviewed: false,
                                    }
                                  : x,
                              ),
                            })
                          }
                        />
                        <label className={styles.checkbox}>
                          <input
                            type="checkbox"
                            checked={s.reviewed}
                            onChange={(e) =>
                              edit({
                                ...work,
                                sources: work.sources.map((x) =>
                                  x.id === s.id
                                    ? { ...x, reviewed: e.target.checked }
                                    : x,
                                ),
                              })
                            }
                          />
                          Saya sudah memeriksa sumber ini sendiri.
                        </label>
                      </div>
                    ))}
                  </fieldset>
                </section>
                <section className={styles.card}>
                  <div className={styles.sectionTitle}>
                    <div>
                      <p className={styles.eyebrow}>04 / PRAKTIK & BUKTI</p>
                      <h2>Dari rencana ke karya.</h2>
                    </div>
                    <button
                      className={styles.secondary}
                      disabled={!!busy || work.tasks.length >= 24}
                      onClick={() =>
                        edit({
                          ...work,
                          tasks: [
                            ...work.tasks,
                            {
                              id: crypto.randomUUID(),
                              title: "Tugas belajar baru",
                              evidence: "",
                              done: false,
                            },
                          ],
                        })
                      }
                    >
                      <Plus size={17} /> Tugas
                    </button>
                  </div>
                  <fieldset disabled={!!busy}>
                    {work.tasks.length === 0 && (
                      <p className={styles.hint}>
                        Ambil langkah konkret dari saran Advisor, lalu tambahkan
                        sebagai tugas.
                      </p>
                    )}
                    {work.tasks.map((t, i) => (
                      <div className={styles.task} key={t.id}>
                        <div className={styles.row}>
                          <span className={styles.taskNumber}>
                            {t.done ? (
                              <Check size={18} />
                            ) : (
                              String(i + 1).padStart(2, "0")
                            )}
                          </span>
                          <input
                            aria-label={`Judul tugas ${i + 1}`}
                            maxLength={300}
                            value={t.title}
                            onChange={(e) =>
                              edit({
                                ...work,
                                tasks: work.tasks.map((x) =>
                                  x.id === t.id
                                    ? { ...x, title: e.target.value }
                                    : x,
                                ),
                              })
                            }
                          />
                          <button
                            aria-label={`Hapus tugas ${i + 1}`}
                            onClick={() =>
                              edit({
                                ...work,
                                tasks: work.tasks.filter((x) => x.id !== t.id),
                              })
                            }
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                        <textarea
                          aria-label={`Bukti tugas ${i + 1}`}
                          rows={2}
                          maxLength={2000}
                          value={t.evidence}
                          placeholder="Tulis hasil latihan, ringkasan pemahaman, atau tautan karya (minimal 10 karakter)."
                          onChange={(e) =>
                            edit({
                              ...work,
                              tasks: work.tasks.map((x) =>
                                x.id === t.id
                                  ? {
                                      ...x,
                                      evidence: e.target.value,
                                      done:
                                        e.target.value.trim().length >= 10 &&
                                        x.done,
                                    }
                                  : x,
                              ),
                            })
                          }
                        />
                        <label className={styles.checkbox}>
                          <input
                            type="checkbox"
                            disabled={t.evidence.trim().length < 10}
                            checked={t.done}
                            onChange={(e) =>
                              edit({
                                ...work,
                                tasks: work.tasks.map((x) =>
                                  x.id === t.id
                                    ? { ...x, done: e.target.checked }
                                    : x,
                                ),
                              })
                            }
                          />
                          Tugas selesai dan bukti sudah saya isi.
                        </label>
                      </div>
                    ))}
                    <label htmlFor="draft">
                      Draf karya untuk ditinjau Editor
                    </label>
                    <textarea
                      id="draft"
                      rows={7}
                      maxLength={16000}
                      value={work.draft}
                      onChange={(e) => edit({ ...work, draft: e.target.value })}
                      placeholder="Tulis gagasan, materi ajar, atau draf artikel Anda di sini."
                    />
                    <label htmlFor="reflection">Refleksi belajar</label>
                    <textarea
                      id="reflection"
                      rows={3}
                      maxLength={4000}
                      value={work.reflection}
                      onChange={(e) =>
                        edit({ ...work, reflection: e.target.value })
                      }
                      placeholder="Apa yang berubah dalam pemahaman Anda? Apa langkah berikutnya?"
                    />
                  </fieldset>
                  <div className={styles.bottomSave}>
                    <span>
                      {dirty
                        ? "Perubahan belum tersimpan"
                        : "Catatan tersimpan"}
                    </span>
                    <button
                      className={styles.primary}
                      disabled={!!busy || !dirty}
                      onClick={save}
                    >
                      <Save size={17} /> Simpan ruang belajar
                    </button>
                  </div>
                </section>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
