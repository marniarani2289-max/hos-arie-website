import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
}: Props) {
  const style =
    variant === "primary"
      ? "bg-slate-950 text-white hover:bg-amber-700"
      : "border border-slate-300 bg-white text-slate-900 hover:border-amber-700 hover:text-amber-700";

  return (
    <Link
      href={href}
      className={`inline-flex rounded-xl px-6 py-3 text-sm font-semibold transition ${style}`}
    >
      {children}
    </Link>
  );
}