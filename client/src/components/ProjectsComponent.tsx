import { logEvent } from "../utils/analytics";

interface ProjectsComponentProps {
  isDark: boolean;
}

const ProjectsComponent = ({ isDark }: ProjectsComponentProps) => {
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

  return (
    <div
      className={`relative select-none rounded-lg max-w-[600px] mx-auto shadow-lg p-4 transition-colors duration-300 ${
        isDark
          ? "bg-white border border-gray-200"
          : "bg-[#121418] border border-[#2a2d35]"
      }`}
    >
      {/* Header */}
      <div className="mb-4">
        <h2
          className={`text-[16px] font-bold tracking-wide ${
            isDark ? "text-gray-900" : "text-white"
          }`}
        >
          Projects
        </h2>
      </div>

      {/* Divider */}
      <div className="h-[1px] w-full mb-4" />

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((proj, index) => (
          <div key={proj.name}>
            <div>
              {/* Project Name */}
              <a
                href={proj.link}
                onClick={() =>
                  logEvent("project_click", { project_name: proj.name })
                }
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 text-[14px] font-semibold group transition ${
                  isDark ? "text-gray-900" : "text-white"
                }`}
              >
                {proj.name}
                <span className="inline-block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-xs">
                  ↗
                </span>
              </a>

              {/* Description */}
              <p
                className={`mt-2 text-[14px] leading-relaxed tracking-[0.020em] ${
                  isDark ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {proj.desc}
              </p>

              {/* Stack */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {proj.stack.map((tech) => (
                  <span
                    key={tech}
                    className={`text-[11px] px-2 py-0.5 rounded-full ${
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

            {/* Divider  */}
            {index < projects.length - 1 && (
              <div
                className={`h-[1px] w-full mt-6 ${
                  isDark
                    ? "border-t border-dashed border-gray-200"
                    : "border-t border-dashed border-[#2a2d35]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div
        className={`h-[1px] w-full my-4 ${
          isDark
            ? "border-t border-dashed border-gray-200"
            : "border-t border-dashed border-[#2a2d35]"
        }`}
      />

      {/* See More */}
      <div>
        <a
          href="https://github.com/brayzonn"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => logEvent("github_click", { location: "projects" })}
          className={`inline-flex items-center gap-1 text-[12px] group transition ${
            isDark ? "text-gray-900" : "text-white"
          }`}
        >
          <span
            className={`underline ${
              isDark
                ? "decoration-gray-400 group-hover:decoration-gray-900"
                : "decoration-gray-500 group-hover:decoration-white"
            } transition-colors`}
          >
            Want to see more? Check my GitHub
          </span>
          <span className="inline-block group-hover:translate-x-0.5 transition-transform">
            →
          </span>
        </a>
      </div>
    </div>
  );
};

export default ProjectsComponent;
