import { WebsiteIcon } from "../components/Icons";
import { logEvent } from "../utils/analytics";

interface StackAndProjectsProps {
  isDark: boolean;
}

const StackAndProjects = ({ isDark }: StackAndProjectsProps) => {
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
    <>
      {/* Projects */}
      <section
        className={`max-w-5xl mx-auto mb-28 rounded-lg shadow-lg p-6 sm:p-8 transition-colors duration-300 ${
          isDark
            ? "bg-white border border-gray-200"
            : "bg-[#121418] border border-[#2a2d35]"
        }`}
      >
        <div className="mb-8">
          <h2
            className={`inline-block text-2xl font-semibold tracking-tight pb-1 ${
              isDark
                ? "text-gray-900 border-b-3 border-gray-200"
                : "text-white border-b-3 border-[#2a2d35]"
            }`}
          >
            Featured Projects
          </h2>
          <span className={`block mt-1 text-sm text-gray-500`}>
            Here are some of my projects
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.name}
              className={`group block transition p-4 rounded-xl ${
                isDark ? "hover:bg-gray-50" : "hover:bg-[#1f2228]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3
                  className={`text-lg font-medium flex items-center gap-2 ${
                    isDark ? "text-gray-900" : "text-white"
                  }`}
                >
                  <a
                    href={proj.link}
                    onClick={() =>
                      logEvent("project_click", { project_name: proj.name })
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`pb-1 transition-all ${
                      isDark
                        ? "border-b border-gray-200 group-hover:text-blue-600"
                        : "border-b border-[#2a2d35] group-hover:text-blue-400"
                    }`}
                  >
                    {proj.name}
                  </a>
                  <span
                    className={`text-xs transition ${
                      isDark
                        ? "text-gray-500 group-hover:text-blue-600"
                        : "text-gray-500 group-hover:text-blue-400"
                    }`}
                  >
                    ↗
                  </span>
                </h3>

                <span
                  className={`transition ${
                    isDark
                      ? "text-gray-500 group-hover:text-blue-600"
                      : "text-gray-500 group-hover:text-blue-400"
                  }`}
                >
                  {WebsiteIcon}
                </span>
              </div>

              <p
                className={`text-sm mb-4 ${
                  isDark ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {proj.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {proj.stack.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 text-xs rounded-full ${
                      isDark
                        ? "bg-gray-100 border border-gray-200 text-gray-600"
                        : "bg-[#1f2228] border border-[#2a2d35] text-gray-400"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default StackAndProjects;
