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
    <section className="max-w-5xl mx-auto mb-24">
      {/* Header */}
      <div className="mb-10">
        <h2
          className={`text-[21px] font-semibold tracking-tight ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Projects
        </h2>
      </div>

      {/* List */}
      <div className="space-y-8">
        {projects.map((proj) => (
          <div
            key={proj.name}
            className={`border-b pb-6 transition ${
              isDark
                ? "border-gray-800 hover:border-gray-700"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {/* Title */}
            <a
              href={proj.link}
              onClick={() =>
                logEvent("project_click", { project_name: proj.name })
              }
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 text-[15px] font-medium hover:opacity-90 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {proj.name}
              <span className="text-xs">↗</span>
            </a>

            {/* Description */}
            <p
              className={`mt-2 max-w-[520px] text-[13.5px] leading-relaxed ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {proj.desc}
            </p>

            {/* Stack */}
            <div className="flex flex-wrap gap-2 mt-4">
              {proj.stack.map((tech) => (
                <span
                  key={tech}
                  className={`px-2 py-[3px] text-[11px] rounded-md transition ${
                    isDark
                      ? "bg-[#1a1c20] border border-[#2a2d33] text-gray-300"
                      : "bg-gray-100 border border-gray-300 text-gray-700"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* See More link */}
      <div className="mt-16">
        <a
          href="https://github.com/brayzonn"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => logEvent("github_click", { location: "projects" })}
          className={`inline-flex items-center gap-1 text-[13.5px] transition group ${
            isDark
              ? "text-gray-500 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Want to see more? Check my GitHub
          <span className="inline-block group-hover:translate-x-1 transition-transform">
            →
          </span>
        </a>
      </div>
    </section>
  );
};

export default ProjectsComponent;
