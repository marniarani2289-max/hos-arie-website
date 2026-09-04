"use client";

import { usePathname } from "next/navigation";

export default function FooterVisibility({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  if (
    pathname.startsWith("/lexnusa") ||
    pathname.startsWith("/hukumpreneur") ||
    pathname.startsWith("/raja-ali-haji") ||
    pathname.startsWith("/journal") ||
    pathname.startsWith("/hw-kepri") ||
    pathname.startsWith("/constitutional-justice")
  ) return null;

  return <>{children}</>;
}
