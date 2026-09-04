import type { ReactNode } from "react";
import JournalFooter from "./JournalFooter";

export default function JournalLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {children}
      <JournalFooter />
    </>
  );
}
