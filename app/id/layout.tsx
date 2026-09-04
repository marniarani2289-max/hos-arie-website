import type { ReactNode } from "react";

export default function IndonesianLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div lang="id" data-content-language="id">
      {children}
    </div>
  );
}
