/* eslint-disable react/jsx-no-comment-textnodes */
import medhubimage from "../assets/images/medhubimage.webp";
import linklyimage from "../assets/images/linklyimage.webp";
import vpsInitImage from "../assets/images/VPSINIT.webp";
import GithubWebhookDeployerImage from "../assets/images/deploymentflowchart.webp";
import autoDeployerWebhookImage from "../assets/images/autodeployerwebhook.webp";
import Realestate from "../assets/images/Realestate.webp";
import { GithubIcon } from "./Icons";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "REAL ESTATE PLATFORM",
      description:
        "A tailored real estate web application featuring interactive Google Maps integration for property visualization",
      image: Realestate,
      link: "https://realestate-platform-alpha.vercel.app/",
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
        <div className="relative">
          <h2 className=" text-left font-[500] text-[25px] transform -skew-x-6 text-white">
            Featured Projects
          </h2>
          <div className="absolute inset-0 blur-2xl opacity-10 bg-white -z-10" />
        </div>

        <p className="sans text-gray-300 tracking-wide text-left font-[400] text-[15px] mt-1 max-w-[650px] flex items-center">
          Here are some of the projects I&apos;ve worked on
        </p>
      </div>

      <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="w-full rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl bg-primary-card-bg flex flex-col border border-gray-800 hover:border-gray-600 relative group"
          >
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="w-full h-[250px] flex items-center justify-center p-3">
              <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-md">
                <img
                  src={project.image}
                  alt={project.title}
                  className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>

            <div className="p-5 flex flex-col h-full justify-between">
              <div>
                <h3 className="uppercase font-mono text-lg font-medium mb-2 text-white flex items-center">
                  <span className="text-gray-500 mr-2">$</span>
                  {project.title}
                </h3>
                <p className="text-sm mb-4 text-gray-300">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tech.map((tech) => (
                    <span
                      key={`${project.id}-${tech}`}
                      className="uppercase px-2 py-1 bg-primary-card-buttons-bg rounded-md text-xs font-mono text-gray-300 border border-gray-700"
                    >
                      <span className="text-gray-500">[</span>
                      {tech}
                      <span className="text-gray-500">]</span>
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
                    className="inline-block font-mono text-sm py-2 px-4 bg-primary-card-buttons-bg text-white rounded-md hover:bg-primary-card-buttons-hover-bg transition-all duration-300 relative overflow-hidden group/btn"
                  >
                    <span className="relative z-10">Visit Site →</span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300" />
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 font-mono text-sm py-2 px-4 bg-primary-card-buttons-bg text-white rounded-md hover:bg-primary-card-buttons-hover-bg transition-all duration-300 relative overflow-hidden group/btn"
                  >
                    <span className="relative z-10 flex items-center space-x-1">
                      {GithubIcon}
                      <p>Github</p>
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300" />
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
