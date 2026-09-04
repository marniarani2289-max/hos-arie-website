"use client";

import { usePathname } from "next/navigation";

export default function FooterVisibility({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  if (pathname.startsWith("/lexnusa") || pathname.startsWith("/hukumpreneur")) return null;

  return <>{children}</>;
}
