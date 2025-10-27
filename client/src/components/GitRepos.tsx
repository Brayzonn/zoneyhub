import { logEvent } from "../utils/analytics";
import { GithubIcon } from "../components/Icons";

const GitRepos = () => {
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
    <>
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
                    onClick={() =>
                      logEvent("repo_click", { repo_name: repo.name })
                    }
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
    </>
  );
};

export default GitRepos;
