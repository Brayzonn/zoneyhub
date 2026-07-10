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
    <h1 className="page-title">{title}</h1>
    {children && (
      <p className="body-copy mt-3">{children}</p>
    )}
  </header>
);

export default SectionHeader;
