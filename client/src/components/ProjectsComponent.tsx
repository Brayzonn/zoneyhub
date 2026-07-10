import { logEvent } from "../utils/analytics";
import { projects } from "../data/projects";
import SectionHeader from "./ui/SectionHeader";
import MetaRow from "./ui/MetaRow";

const ProjectsComponent = () => {
  return (
    <section className="max-w-[960px] mx-auto">
      <SectionHeader kicker="Projects" title="Things I've Built">
        Highlighted projects I&rsquo;ve designed, built, and shipped, from
        workflow tools to production SaaS. More on{" "}
        <a
          href="https://github.com/brayzonn"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => logEvent("github_click", { location: "projects" })}
          className="inline-link"
        >
          GitHub
        </a>
        .
      </SectionHeader>

      <div className="flex flex-col">
        {projects.map((proj) => (
          <article
            key={proj.name}
            className="border-b border-line last:border-b-0 py-6 transition-colors duration-150 hover:bg-ink/[0.01]"
          >
            <h2 className="item-title">
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  logEvent("project_click", { project_name: proj.name })
                }
                className="text-inherit border-b border-ink/20 hover:border-ink hover:text-ink-muted transition-colors duration-150"
              >
                {proj.name}
              </a>
            </h2>
            <p className="body-copy">{proj.desc}</p>
            <MetaRow items={proj.stack} className="mt-3" dotted />
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProjectsComponent;
