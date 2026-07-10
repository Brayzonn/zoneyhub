import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { socials } from "../data/profile";
import { logEvent } from "../utils/analytics";

const navItems = [
  { label: "Projects", path: "/projects" },
  { label: "Blog", path: "/blog" },
  { label: "Playground", path: "/playground" },
];

/**
 * Shared shell for every page: quiet paper background, sticky blurred
 * header with the script site title, and the icon footer.
 */
const SiteLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();

  return (
    <motion.div
      key="main-content"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      className="min-h-svh w-full flex flex-col bg-bg text-ink font-body antialiased"
    >
      <header className="sticky top-0 z-10 backdrop-blur-[10px] bg-[color-mix(in_srgb,var(--color-bg)_90%,transparent_10%)] border-b border-black/[0.03] px-6 max-md:px-4">
        <div className="max-w-[960px] mx-auto pt-5 pb-4 flex items-center justify-between gap-6 max-sm:flex-col max-sm:items-center max-sm:gap-4">
          <Link to="/" className="inline-flex items-center">
            <span className="font-script text-[2rem] leading-[1.1]">
              Eyinda Bright
            </span>
          </Link>
          <nav
            aria-label="Primary"
            className="flex gap-5 max-md:gap-3 text-nav max-md:text-[0.7rem] uppercase tracking-nav max-sm:flex-wrap max-sm:justify-center"
          >
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative pb-[0.2rem] after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:origin-left after:transition-[transform,background-color] after:duration-300 after:ease-in-out ${
                    isActive
                      ? "text-ink after:bg-ink after:scale-x-100"
                      : "text-ink-muted after:bg-transparent after:scale-x-0 hover:after:bg-black/40 hover:after:scale-x-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1 px-6 max-md:px-4 pt-16 pb-12 max-md:pt-8 max-sm:pt-6">
        {children}
      </main>

      <footer className="shrink-0 px-6 max-md:px-4 py-6 text-ink-muted flex justify-center">
        <div className="w-full max-w-[960px] flex items-center justify-center gap-5">
          {socials.map((item) => (
            <a
              key={item.name}
              href={item.link}
              target={item.link.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={item.name}
              onClick={() =>
                logEvent("social_click", {
                  platform: item.name,
                  location: "footer",
                })
              }
              className="inline-flex items-center justify-center text-inherit hover:text-ink transition-colors duration-150 [&_svg]:block [&_svg]:w-5 [&_svg]:h-5"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </footer>
    </motion.div>
  );
};

export default SiteLayout;
