/** Quiet uppercase metadata row: dates, read times, tags, tech stacks.
    Items double as their React keys, so a row shouldn't repeat a label. */
const MetaRow = ({
  items,
  className = "",
  pilled = false,
  dark = false,
  filled = false,
  dotted = false,
}: {
  items: string[];
  className?: string;
  /** Render each item as a bordered pill instead of plain inline text. */
  pilled?: boolean;
  /** Dark-filled pill instead of the default outlined one. Only applies with `pilled`. */
  dark?: boolean;
  /** Soft-filled pill, no border. Only applies with `pilled`. */
  filled?: boolean;
  /** Join items with a "·" separator instead of gap spacing. Ignored when `pilled`. */
  dotted?: boolean;
}) => (
  <div
    className={`flex flex-wrap gap-x-4 gap-y-2 text-kicker uppercase tracking-meta text-ink-muted ${
      pilled ? "gap-2" : dotted ? "gap-x-2" : ""
    } ${className}`}
  >
    {items.map((item, i) =>
      pilled ? (
        <span
          key={item}
          className={`rounded-full px-2.5 py-0.5 ${
            dark
              ? "bg-ink-muted/15 text-ink border border-ink-muted/25"
              : filled
                ? "bg-ink-muted/10"
                : "border border-line"
          }`}
        >
          {item}
        </span>
      ) : (
        <span key={item} className="inline-flex items-center gap-x-2">
          {dotted && i > 0 && <span aria-hidden="true">·</span>}
          {item}
        </span>
      ),
    )}
  </div>
);

export default MetaRow;
