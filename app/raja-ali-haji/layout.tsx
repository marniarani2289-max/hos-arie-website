import type { ReactNode } from "react";
import RajaAliHajiFooter from "./RajaAliHajiFooter";

export default function RajaAliHajiLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {children}
      <RajaAliHajiFooter />
    </>
  );
}
