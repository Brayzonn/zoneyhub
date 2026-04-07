import { logEvent } from "../utils/analytics";

interface ProjectsComponentProps {
  isDark: boolean;
}

const ProjectsComponent = ({ isDark }: ProjectsComponentProps) => {
  const projects = [
    {
      name: "NotifyKit",
      desc: "Simple, affordable notification infrastructure for indie developers, small teams, and startups. Handles email delivery and webhooks behind a clean API.",
      link: "https://notifykit.dev",
      stack: ["NestJS", "PostgreSQL", "React", "Typescript"],
    },
    {
      name: "Mines",
      desc: "A provably fair browser-based mines game with real-time multiplayer leaderboards.",
      link: "https://mines.zoneyhub.com",
      stack: ["NestJS", "PostgreSQL", "React", "Redis", "Typescript"],
    },
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
  ];

  return (
    <div
      className={`relative select-none rounded-lg w-full max-w-[600px] mx-auto shadow-lg p-5 transition-colors duration-300 ${
        isDark
          ? "bg-white border border-gray-200"
          : "bg-[#121418] border border-[#2a2d35]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className={`text-[15px] font-semibold tracking-wide ${
            isDark ? "text-gray-900" : "text-white"
          }`}
        >
          Projects
        </h2>
        <a
          href="https://github.com/brayzonn"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => logEvent("github_click", { location: "projects" })}
          className={`inline-flex items-center gap-1 text-[12px] group transition ${
            isDark
              ? "text-gray-500 hover:text-gray-900"
              : "text-gray-500 hover:text-white"
          }`}
        >
          <span>GitHub</span>
          <span className="inline-block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
            ↗
          </span>
        </a>
      </div>

      {/* Divider */}
      <div
        className={`h-[1px] w-full mb-4 ${
          isDark
            ? "border-t border-dashed border-gray-200"
            : "border-t border-dashed border-[#2a2d35]"
        }`}
      />

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((proj, index) => (
          <div key={proj.name}>
            <div className="flex gap-4">
              <span
                className={`text-[11px] font-mono mt-0.5 shrink-0 w-5 text-right ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
            {/* Name */}
            <a
              href={proj.link}
              onClick={() =>
                logEvent("project_click", { project_name: proj.name })
              }
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 text-[14px] font-semibold group transition ${
                isDark ? "text-gray-900" : "text-white"
              }`}
            >
              {proj.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`shrink-0 transition-colors duration-200 ${
                  isDark
                    ? "text-gray-300 group-hover:text-gray-700"
                    : "text-gray-600 group-hover:text-gray-300"
                }`}
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>

            {/* Description */}
            <p
              className={`mt-1.5 text-[13px] leading-relaxed tracking-[0.015em] ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {proj.desc}
            </p>

            {/* Stack */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {proj.stack.map((tech) => (
                <span
                  key={tech}
                  className={`text-[11px] px-2 py-0.5 rounded-sm ${
                    isDark
                      ? "text-gray-600 bg-gray-100"
                      : "text-gray-400 bg-[#1f2228]"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>

              </div>
            </div>

            {index < projects.length - 1 && (
              <div
                className={`h-[1px] w-full mt-4 ${
                  isDark
                    ? "border-t border-dashed border-gray-200"
                    : "border-t border-dashed border-[#2a2d35]"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsComponent;
