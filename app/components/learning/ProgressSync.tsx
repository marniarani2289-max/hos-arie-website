"use client";

import { useEffect } from "react";

const keys = Array.from({ length: 8 }, (_, index) => `rahi-module-${index + 1}-v1`);

export default function ProgressSync() {
  useEffect(() => {
    async function sync() {
      const modules = keys.flatMap((key, index) => {
        const raw = localStorage.getItem(key);
        if (!raw) return [];
        try { return [{ moduleNumber: index + 1, data: JSON.parse(raw) }]; }
        catch { return []; }
      });
      if (!modules.length) return;
      await fetch("/api/progress/sync", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ modules }),
      });
    }
    void sync();
    window.addEventListener("storage", sync);
    const timer = window.setInterval(sync, 30000);
    return () => { window.removeEventListener("storage", sync); window.clearInterval(timer); };
  }, []);
  return null;
}
