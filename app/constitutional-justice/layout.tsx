import type { ReactNode } from "react";
import ConstitutionalJusticeFooter from "./ConstitutionalJusticeFooter";

export default function ConstitutionalJusticeLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {children}
      <ConstitutionalJusticeFooter />
    </>
  );
}
