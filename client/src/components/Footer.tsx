import { logEvent } from "../utils/analytics";

const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer className="text-center text-[var(--color-subtle-text)] pb-10">
        <div className="space-x-6">
          <a
            href="https://github.com/brayzonn"
            onClick={() =>
              logEvent("social_click", {
                platform: "GitHub",
                location: "footer",
              })
            }
            className="hover:text-[var(--color-primary-text-color)]"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/eyinda-bright"
            onClick={() =>
              logEvent("social_click", {
                platform: "LinkedIn",
                location: "footer",
              })
            }
            className="hover:text-[var(--color-primary-text-color)]"
          >
            LinkedIn
          </a>
          <a
            href="mailto:brayzoney@gmail.com"
            onClick={() => logEvent("email_click", { location: "footer" })}
            className="hover:text-[var(--color-primary-text-color)]"
          >
            Mail
          </a>
        </div>
        <p className="mt-4 text-xs text-[var(--color-subtle-text)]">
          © 2025 Zoneyhub
        </p>
      </footer>
    </>
  );
};

export default Footer;
