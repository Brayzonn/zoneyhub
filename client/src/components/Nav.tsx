import { TwitterIcon, GithubIcon, LinkedInIcon } from "../components/Icons";
import logoWhite from "../assets/images/logowhite.svg";
import logoBlack from "../assets/images/logoblack.svg";
import { logEvent } from "../utils/analytics";

interface NavProps {
  isScrolled: boolean;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const Nav = ({ isScrolled, isDarkMode, onThemeToggle }: NavProps) => {
  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[1rem] sm:px-[3rem] py-6 border-b transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--color-primary-bg-color)]/60 backdrop-blur-sm border-[var(--color-border)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <img
          src={isDarkMode ? logoWhite : logoBlack}
          alt="logo"
          width="24"
          height="24"
          loading="eager"
          className={`sm:size-6 size-5 ${!isDarkMode ? "scale-[2.35]" : ""}`}
        />

        <button
          onClick={() => onThemeToggle()}
          className="absolute cursor-pointer left-1/2 -translate-x-1/2 p-2 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-border-hover)] bg-[var(--color-card-bg)] hover:bg-[var(--color-card-hover-bg)] transition-all"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <svg
              className="w-5 h-5 text-[var(--color-muted-text)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-[var(--color-muted-text)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/brayzonn"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              logEvent("social_click", { platform: "GitHub", location: "nav" })
            }
            className="text-[var(--color-muted-text)] hover:text-[var(--color-primary-text-color)] transition"
            aria-label="GitHub"
          >
            {GithubIcon}
          </a>
          <a
            href="https://x.com/brayzoney"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              logEvent("social_click", { platform: "Twitter", location: "nav" })
            }
            className="text-[var(--color-muted-text)] hover:text-[var(--color-primary-text-color)] transition hidden sm:flex"
            aria-label="Twitter"
          >
            {TwitterIcon}
          </a>
          <a
            href="https://linkedin.com/in/eyinda-bright"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              logEvent("social_click", {
                platform: "LinkedIn",
                location: "nav",
              })
            }
            className="text-[var(--color-muted-text)] hover:text-[var(--color-primary-text-color)] transition hidden sm:flex"
            aria-label="LinkedIn"
          >
            {LinkedInIcon}
          </a>
        </div>
      </nav>
    </>
  );
};

export default Nav;
