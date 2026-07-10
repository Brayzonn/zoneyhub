import { ReactNode } from "react";
import Kicker from "./Kicker";

/** Page opener: kicker, serif title, optional intro copy as children. */
const SectionHeader = ({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
}) => (
  <header className="mb-8">
    <Kicker className="mb-3">{kicker}</Kicker>
    <h1 className="font-serif font-medium text-title max-md:text-title-sm text-ink m-0">
      {title}
    </h1>
    {children && (
      <p className="text-body text-ink-muted mt-3 mb-0">{children}</p>
    )}
  </header>
);

export default SectionHeader;
