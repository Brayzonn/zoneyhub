import { WebsiteIcon } from "../components/Icons";
import { logEvent } from "../utils/analytics";

const StackAndProjects = () => {
  const frontendTech = ["React", "TypeScript", "Tailwind CSS", "JavaScript"];
  const backendTech = [
    "NestJS",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "TypeORM",
    "Express.jS",
  ];

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
                    onClick={() =>
                      logEvent("project_click", { project_name: proj.name })
                    }
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
    </>
  );
};

export default StackAndProjects;
