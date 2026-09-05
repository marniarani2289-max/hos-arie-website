"use client";

import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function PwaBootstrap() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // The website remains fully usable if service-worker registration fails.
      });
    }

    setDismissed(sessionStorage.getItem("pwa-install-dismissed") === "true");

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    const handleInstalled = () => setInstallPrompt(null);

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const install = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  const dismiss = () => {
    sessionStorage.setItem("pwa-install-dismissed", "true");
    setDismissed(true);
  };

  if (!installPrompt || dismissed) return null;

  return (
    <aside
      aria-label="Pasang aplikasi Hossibarani"
      className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[70] mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-amber-400/30 bg-slate-950 p-3 text-white shadow-2xl shadow-slate-950/30"
    >
      <div className="min-w-0 flex-1 pl-1">
        <p className="text-sm font-bold">Pasang Hossibarani</p>
        <p className="mt-0.5 text-xs leading-5 text-slate-300">
          Akses ekosistem langsung dari layar utama Android.
        </p>
      </div>
      <button
        type="button"
        onClick={install}
        className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-amber-500 px-4 text-sm font-bold text-slate-950 transition hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
      >
        <Download size={17} aria-hidden="true" />
        Pasang
      </button>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Tutup tawaran pemasangan"
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-300 transition hover:bg-white/10 hover:text-white"
      >
        <X size={18} aria-hidden="true" />
      </button>
    </aside>
  );
}
