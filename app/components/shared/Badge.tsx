type BadgeProps = {
  children: React.ReactNode;
};

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800">
      {children}
    </span>
  );
}