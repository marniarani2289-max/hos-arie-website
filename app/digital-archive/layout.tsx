import type { ReactNode } from "react";
import DigitalArchiveFooter from "./DigitalArchiveFooter";

export default function DigitalArchiveLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {children}
      <DigitalArchiveFooter />
    </>
  );
}
