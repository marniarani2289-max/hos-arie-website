"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const keys = Array.from({ length: 8 }, (_, index) => `rahi-module-${index + 1}-v1`);

export default function DashboardProgressRecovery({ completed }: { completed: number }) {
  const router = useRouter();
  const [syncing, setSyncing] = useState(completed < 8);

  useEffect(() => {
    if (completed >= 8) return;

    async function recover() {
      const modules = keys.flatMap((key, index) => {
        const raw = localStorage.getItem(key);
        if (!raw) return [];
        try {
          return [{ moduleNumber: index + 1, data: JSON.parse(raw) }];
        } catch {
          return [];
        }
      });

      if (!modules.length) {
        setSyncing(false);
        return;
      }

      try {
        const response = await fetch("/api/progress/sync", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ modules }),
          keepalive: true,
        });
        const result = await response.json() as { completedModules?: number };
        if (response.ok && (result.completedModules ?? 0) > completed) {
          router.refresh();
          return;
        }
      } finally {
        setSyncing(false);
      }
    }

    void recover();
  }, [completed, router]);

  if (!syncing) return null;
  return <p className="mt-6 border border-amber-300 bg-amber-50 px-5 py-4 font-semibold text-amber-900">Menyinkronkan progres terakhir dan menyiapkan sertifikat…</p>;
}
