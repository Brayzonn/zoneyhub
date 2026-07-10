import { ReactNode } from "react";

/** Small uppercase label: page kickers and section labels. */
const Kicker = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <p
    className={`text-kicker uppercase tracking-label text-ink-muted m-0 ${className}`}
  >
    {children}
  </p>
);

export default Kicker;
