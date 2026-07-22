import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "light" | "dark" | "outline";
};

export default function Badge({
  children,
  variant = "light",
}: BadgeProps) {
  const variants = {
    light: "border-amber-200 bg-amber-50 text-amber-800",
    dark: "border-slate-700 bg-slate-900 text-slate-200",
    outline: "border-slate-300 bg-transparent text-slate-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium leading-none ${variants[variant]}`}
    >
      {children}
    </span>
  );
}