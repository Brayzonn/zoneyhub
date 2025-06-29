import medhubimage from "../assets/images/medhubimage.webp";
import linklyimage from "../assets/images/linklyimage.webp";
import vpsInitImage from "../assets/images/VPSINIT.webp";
import GithubWebhookDeployerImage from "../assets/images/deploymentflowchart.webp";
import autoDeployerWebhookImage from "../assets/images/autodeployerwebhook.webp";
import Realestate from "../assets/images/Realestate.webp";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "REAL ESTATE PLATFORM",
      description:
        "A tailored real estate web application featuring interactive Google Maps integration for property visualization",
      image: Realestate,
      link: "https://github.com/brayzonn/Auto-deploy-webhook",
      tech: ["TYPESCRIPT", "REACT", "VITE", "TAILWIND"],
    },
    {
      id: 2,
      title: "MEDHUB",
      description:
        "A simple desktop web application designed to streamline the management of healthcare facilities.",
      image: medhubimage,
      link: "https://med-hub-hazel.vercel.app",
      github: "https://github.com/brayzonn/medhub",
      tech: ["React", "Node/Express.js", "MongoDB", "Typescript", "Tailwind"],
    },
    {
      id: 3,
      title: "VPS-INITIALIZATION-SCRIPT",
      description:
        "Automated VPS initialization script that sets up a fresh server with essential tools, security configurations, and development environment in minutes.",
      image: vpsInitImage,
      github: "https://github.com/Brayzonn/vps-init.git",
      tech: ["Bash", "Linux", "Node.js", "Nginx", "PM2"],
    },
    {
      id: 4,
      title: "LINKLY",
      description:
        "A URL shortener web application that provides a secure and seamless experience for shortening long URLs.",
      image: linklyimage,
      link: "https://linklyy.vercel.app/",
      github: "https://github.com/Brayzonn/URL-Shortener-App.git",
      tech: ["React", "Tailwind", "Javascript", "MongoDB"],
    },
    {
      id: 5,
      title: "Github-Webhook-Deployer",
      description:
        "A comprehensive bash deployment script that automates the deployment of modern frontend applications and Node.js Express server applications.",
      image: GithubWebhookDeployerImage,
      github: "https://github.com/Brayzonn/github-webhook-deployer",
      tech: ["Bash", "Linux", "Node.js", "Nginx", "PM2"],
    },
    {
      id: 6,
      title: "Auto-deploy-webhook",
      description:
        "A secure Node.js server that automates deployments from GitHub using webhooks",
      image: autoDeployerWebhookImage,
      github: "https://github.com/brayzonn/Auto-deploy-webhook",
      tech: ["Node/Express.js", "MongoDB", "Javascript"],
    },
  ];

  return (
    <div className="py-[2rem] w-full min-h-[400px] flex flex-col items-start justify-start space-y-[0.30rem]">
      <div className="flex flex-col space-y-1">
        <h2 className="font-mono text-left font-[500] text-[25px]">
          Featured Projects
        </h2>
        <p className="sans text-gray-300 tracking-wide text-left font-[400] text-[15px] mt-1 max-w-[650px]">
          As a Full-stack developer, I&apos;ve built projects combining
          intuitive interfaces with robust backend systems, developing practical
          skills in web development and data management. I&apos;m constantly
          expanding my capabilities and working on exciting new applications.
          Here are some of the projects I&apos;ve worked on:
        </p>
      </div>

      <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="w-full rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-gradient-to-br from-[#1A1A1A] to-[#252525] flex flex-col"
          >
            <div className="w-full h-[250px] flex items-center justify-center p-3">
              <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-md">
                <img
                  src={project.image}
                  alt={project.title}
                  className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            <div className="p-5 flex flex-col h-full justify-between">
              <div>
                <h3 className="uppercase font-mono text-lg font-medium mb-2 text-white">
                  {project.title}
                </h3>
                <p className="text-sm mb-4 text-gray-300">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tech.map((tech) => (
                    <span
                      key={`${project.id}-${tech}`}
                      className="uppercase px-2 py-1 bg-[#2A2A2A] rounded-md text-xs font-mono text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-mono text-sm py-2 px-4 bg-gradient-to-r from-[#2A2A2A] to-[#333333] text-white rounded-md hover:from-[#333333] hover:to-[#3A3A3A] transition-colors duration-300"
                  >
                    Visit Site →
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-mono text-sm py-2 px-4 bg-gradient-to-r from-[#2A2A2A] to-[#333333] text-white rounded-md hover:from-[#333333] hover:to-[#3A3A3A] transition-colors duration-300"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
