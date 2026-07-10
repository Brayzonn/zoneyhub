/** Quiet uppercase metadata row: dates, read times, tags, tech stacks.
    Items double as their React keys, so a row shouldn't repeat a label. */
const MetaRow = ({
  items,
  className = "",
  pilled = false,
  dark = false,
}: {
  items: string[];
  className?: string;
  /** Render each item as a bordered pill instead of plain inline text. */
  pilled?: boolean;
  /** Dark-filled pill instead of the default outlined one. Only applies with `pilled`. */
  dark?: boolean;
}) => (
  <div
    className={`flex flex-wrap gap-x-4 gap-y-2 text-kicker uppercase tracking-meta text-ink-muted ${
      pilled ? "gap-2" : ""
    } ${className}`}
  >
    {items.map((item) =>
      pilled ? (
        <span
          key={item}
          className={`rounded-full px-2.5 py-0.5 ${
            dark
              ? "bg-ink-muted/15 text-ink border border-ink-muted/25"
              : "border border-line"
          }`}
        >
          {item}
        </span>
      ) : (
        <span key={item}>{item}</span>
      ),
    )}
  </div>
);

export default MetaRow;
