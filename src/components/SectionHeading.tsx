export function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <div className="mb-10 flex items-baseline gap-3 font-mono">
      <span className="text-gradient text-sm font-semibold">{`// ${index}`}</span>
      <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
        {title}
      </h2>
      <span className="h-px flex-1 bg-gradient-to-r from-border-hover via-border to-transparent" />
    </div>
  );
}
