/** Quiet uppercase metadata row: dates, read times, tags, tech stacks.
    Items double as their React keys, so a row shouldn't repeat a label. */
const MetaRow = ({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) => (
  <div
    className={`flex flex-wrap gap-x-4 gap-y-2 text-kicker uppercase tracking-meta text-ink-muted ${className}`}
  >
    {items.map((item) => (
      <span key={item}>{item}</span>
    ))}
  </div>
);

export default MetaRow;
