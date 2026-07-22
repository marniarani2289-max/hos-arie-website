type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-4xl ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
        {eyebrow}
      </p>

      <h2 className="font-academic mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-lg leading-8 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}