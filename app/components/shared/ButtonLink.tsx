import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "darkOutline";
  newTab?: boolean;
  className?: string;
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  newTab = false,
  className = "",
}: ButtonLinkProps) {
  const variants = {
    primary:
      "border-amber-500 bg-amber-500 text-slate-950 hover:border-amber-400 hover:bg-amber-400",

    secondary:
      "border-white bg-white text-slate-950 hover:border-amber-400 hover:bg-amber-400",

    darkOutline:
      "border-white/20 bg-white/5 text-white hover:border-amber-400 hover:bg-amber-400 hover:text-slate-950",
  };

  return (
    <Link
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center justify-center rounded-xl border px-6 py-3 text-sm font-semibold transition duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}