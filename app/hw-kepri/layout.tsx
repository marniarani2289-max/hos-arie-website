import type { ReactNode } from "react";
import HwKepriFooter from "./HwKepriFooter";

export default function HwKepriLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {children}
      <HwKepriFooter />
    </>
  );
}
