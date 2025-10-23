import { useState, useEffect } from "react";
import {
  TwitterIcon,
  GithubIcon,
  LinkedInIcon,
  WebsiteIcon,
} from "../components/Icons";
import logoWhite from "../assets/images/logowhite.svg";
import logoBlack from "../assets/images/logoblack.svg";

const Landing = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const frontendTech = ["React", "TypeScript", "Tailwind CSS", "JavaScript"];
  const backendTech = ["NestJS", "Node.js", "PostgreSQL", "MongoDB", "TypeORM"];

  const projects = [
    {
      name: "Weeklies",
      desc: "A personalized Spotify analytics app that tracks your weekly listening habits, top artists, and favorite genres with visual insights.",
      link: "https://weeklies.zoneyhub.com",
      stack: ["React", "NestJS", "Typescript", "PostgreSQL"],
    },
    {
      name: "B-Estates",
      desc: "A real estate web app featuring interactive Google Maps integration for property visualization.",
      link: "https://realestate-platform-alpha.vercel.app/",
      stack: ["React", "Tailwind CSS", "MongoDB", "Express"],
    },
    {
      name: "Linkly",
      desc: "A secure, seamless URL shortener for simplifying long links.",
      link: "https://linklyy.vercel.app/",
      stack: ["React", "Node.js", "MongoDB", "Javascript"],
    },
    {
      name: "Medhub",
      desc: "A lightweight web app that simplifies managing doctors, patients, and admissions in healthcare facilities.",
      link: "https://med-hub-hazel.vercel.app/",
      stack: ["React", "Typescript", "MongoDB", "ExpressJS"],
    },
  ];

  const repos = [
    {
      name: "Ubuntu Server Bootstrap",
      desc: "Automated VPS setup with essentials and security preconfigured.",
      link: "https://github.com/Brayzonn/vps-init",
    },
    {
      name: "GitHub Webhook Deployer",
      desc: "Automated deployment tool for Node.js and frontend apps powered by GitHub webhooks.",
      link: "https://github.com/Brayzonn/github-webhook-deployer",
    },
  ];

  return (
    <div className="bg-[var(--color-primary-bg-color)] text-[var(--color-primary-text-color)] min-h-screen w-full overflow-hidden">
      {/* Navbar */}
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
          className={`sm:size-6 size-5 ${!isDarkMode ? "scale-[2.35]" : ""}`}
        />

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
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
            className="text-[var(--color-muted-text)] hover:text-[var(--color-primary-text-color)] transition"
            aria-label="GitHub"
          >
            {GithubIcon}
          </a>
          <a
            href="https://x.com/brayzoney"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-muted-text)] hover:text-[var(--color-primary-text-color)] transition hidden sm:flex"
            aria-label="Twitter"
          >
            {TwitterIcon}
          </a>
          <a
            href="https://linkedin.com/in/eyinda-bright"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-muted-text)] hover:text-[var(--color-primary-text-color)] transition hidden sm:flex"
            aria-label="LinkedIn"
          >
            {LinkedInIcon}
          </a>
        </div>
      </nav>

      <main className="pt-[120px] px-[1rem] sm:px-[3rem]">
        {/* Hero */}
        <section className="flex flex-col items-center text-center py-10">
          <h1 className="text-4xl sm:text-6xl font-bold text-[var(--color-primary-text-color)]">
            Eyinda Bright
          </h1>
          <p className="mt-2 text-lg text-[var(--color-muted-text)]">
            Software Developer
          </p>
          <a
            href="mailto:brayzoney@gmail.com"
            className="mt-4 inline-flex items-center gap-2 px-5 py-2 border border-[var(--color-border)] rounded-full hover:bg-[var(--color-card-hover-bg)] transition"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Available for work
          </a>
        </section>

        {/* Intro */}
        <section className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-[14px] sm:text-[18px] text-[var(--color-muted-text)] leading-relaxed">
            Hi! I&apos;m{" "}
            <span className="text-[var(--color-primary-text-color)] font-semibold">
              Eyinda Bright
            </span>
            , a software developer focused on building reliable backend systems,
            frontend infrastructure, and distributed applications. Lately,
            I&apos;ve been exploring more backend technologies, refining API
            performance, optimizing database interactions, and improving
            deployment pipelines.
          </p>

          <p className="text-[14px] sm:text-[18px] text-[var(--color-muted-text)] leading-relaxed mt-2">
            I&apos;m open to{" "}
            <span className="text-[var(--color-primary-text-color)] font-medium">
              full-time
            </span>
            ,{" "}
            <span className="text-[var(--color-primary-text-color)] font-medium">
              part-time
            </span>
            , or{" "}
            <span className="text-[var(--color-primary-text-color)] font-medium">
              contract
            </span>{" "}
            roles. You can reach me at{" "}
            <a
              href="mailto:brayzoney@gmail.com"
              className="inline-flex items-center gap-1 group transition text-[var(--color-primary-text-color)]"
            >
              <span className="underline decoration-[var(--color-muted-text)] group-hover:decoration-[var(--color-primary-text-color)] transition-colors">
                brayzoney@gmail.com
              </span>
              <span className="inline-block group-hover:translate-x-0.5 transition-transform">
                ↗
              </span>
            </a>{" "}
            to discuss potential opportunities.
          </p>

          <p className="text-[14px] sm:text-[18px] text-[var(--color-muted-text)] leading-relaxed mt-2">
            Outside work, I enjoy curating{" "}
            <a
              href="https://spotify.link/TmIHSnEFGXb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 group transition text-[var(--color-primary-text-color)]"
            >
              <span className="underline decoration-[var(--color-muted-text)] group-hover:decoration-[var(--color-primary-text-color)] transition-colors">
                playlists
              </span>
              <span className="inline-block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </a>
            , gaming, and watching classic films.
          </p>
        </section>

        {/* Tech Stack */}
        <section className="max-w-5xl mx-auto mb-20">
          <div className="mb-8">
            <h2 className="inline-block text-2xl font-semibold text-[var(--color-primary-text-color)] tracking-tight border-b-3 border-[var(--color-border)] pb-1">
              Tech Stack
            </h2>
            <span className="block text-sm text-[var(--color-subtle-text)] mt-1">
              Tools & frameworks I use
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Frontend", items: frontendTech },
              { title: "Backend", items: backendTech },
              {
                title: "Tools & Workflow",
                items: ["Docker", "Vercel", "Git", "Postman", "Bash"],
              },
            ].map((cat) => (
              <div
                key={cat.title}
                className="group bg-[var(--color-card-hover-bg)] border border-[var(--color-border)] rounded-2xl p-4 hover:border-[var(--color-border-hover)] transition-all"
              >
                <h3 className="text-[var(--color-primary-text-color)] font-medium text-lg mb-4">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((tech) => (
                    <span
                      key={tech}
                      className="text-[13px] px-3 py-1.5 rounded-lg bg-[var(--color-tag-bg)] text-[var(--color-muted-text)] group-hover:bg-[var(--color-tag-hover-bg)] transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="max-w-5xl mx-auto mb-28">
          <div className="mb-8 ">
            <h2 className="inline-block text-2xl font-semibold text-[var(--color-primary-text-color)] tracking-tight border-b-3 border-[var(--color-border)] pb-1">
              Featured Projects
            </h2>
            <span className="block mt-1 text-sm text-[var(--color-subtle-text)]">
              Here are some of my projects
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((proj) => (
              <div key={proj.name} className="group block transition">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-[var(--color-primary-text-color)] flex items-center gap-2">
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-b border-[var(--color-border)] pb-1 transition-all group-hover:text-[var(--color-accent)]"
                    >
                      {proj.name}
                    </a>
                    <span className="text-xs text-[var(--color-muted-text)] group-hover:text-[var(--color-accent)] transition">
                      ↗
                    </span>
                  </h3>
                  <span className="text-[var(--color-muted-text)] group-hover:text-[var(--color-accent)] transition">
                    {WebsiteIcon}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-muted-text)] mb-4">
                  {proj.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {proj.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-[var(--color-tag-bg)] border border-[var(--color-border)] rounded-full text-[var(--color-muted-text)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Highlighted Repos */}
        <section className="max-w-5xl mx-auto mb-28">
          <div className="mb-8 ">
            <h2 className="inline-block text-2xl font-semibold text-[var(--color-primary-text-color)] tracking-tight border-b-3 border-[var(--color-border)] pb-1">
              Highlighted Repos
            </h2>
            <span className="block mt-1 text-sm text-[var(--color-subtle-text)]">
              Explore some of my open-source repositories and personal code
              experiments
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {repos.map((repo) => (
              <div key={repo.name} className="group block transition">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-[var(--color-primary-text-color)] flex items-center gap-2">
                    <a
                      href={repo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-b border-[var(--color-border)] pb-1 transition-all group-hover:text-[var(--color-accent)]"
                    >
                      {repo.name}
                    </a>
                    <span className="text-xs text-[var(--color-muted-text)] group-hover:text-[var(--color-accent)] transition">
                      ↗
                    </span>
                  </h3>
                  <span className="text-[var(--color-muted-text)] group-hover:text-[var(--color-accent)] transition">
                    {GithubIcon}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-muted-text)]">
                  {repo.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-[var(--color-subtle-text)] pb-10">
          <div className="space-x-6">
            <a
              href="https://github.com/brayzonn"
              className="hover:text-[var(--color-primary-text-color)]"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/eyinda-bright"
              className="hover:text-[var(--color-primary-text-color)]"
            >
              LinkedIn
            </a>
            <a
              href="mailto:brayzoney@gmail.com"
              className="hover:text-[var(--color-primary-text-color)]"
            >
              Mail
            </a>
          </div>
          <p className="mt-4 text-xs text-[var(--color-subtle-text)]">
            © 2025 Zoneyhub
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Landing;
