import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ChipProps {
  /** Internal route — renders a router Link. Omit to render a button. */
  to?: string;
  onClick?: () => void;
  /** Inverted (ink-filled) state, e.g. the selected filter. */
  active?: boolean;
  /** Grey resting text that inks up on hover, e.g. unselected filters. */
  muted?: boolean;
  children: ReactNode;
}

/** Pill chip: navigation links and filter buttons. */
const Chip = ({ to, onClick, active = false, muted = false, children }: ChipProps) => {
  const className = [
    "inline-flex items-center rounded-full border px-[0.9rem] py-[0.4rem] text-chip backdrop-blur-[6px] transition-all duration-150 hover:-translate-y-px hover:shadow-lift",
    active
      ? "bg-ink text-bg border-ink"
      : `border-line bg-surface/60 hover:bg-surface hover:border-ink/10 ${
          muted ? "text-ink-muted hover:text-ink" : "text-ink"
        }`,
  ].join(" ");

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={`cursor-pointer ${className}`}>
      {children}
    </button>
  );
};

export default Chip;
