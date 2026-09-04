"use client";

import { usePathname } from "next/navigation";

export default function FooterVisibility({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  if (
    pathname.startsWith("/lexnusa") ||
    pathname.startsWith("/hukumpreneur") ||
    pathname.startsWith("/raja-ali-haji") ||
    pathname.startsWith("/journal")
  ) return null;

  return <>{children}</>;
}
