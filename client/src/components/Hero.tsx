import {
  GithubIconSmall,
  LinkedInIconSmall,
  MailIconSmall,
  TwitterIconSmall,
} from "../assets/icons";
import { logEvent } from "../utils/analytics";

interface HeroProps {
  isDark: boolean;
}

const Hero = ({ isDark }: HeroProps) => {
  const socials = [
    {
      name: "Twitter",
      link: "https://x.com/brayzoney",
      icon: TwitterIconSmall,
    },
    {
      name: "LinkedIn",
      link: "https://linkedin.com/in/eyinda-bright",
      icon: LinkedInIconSmall,
    },
    {
      name: "GitHub",
      link: "https://github.com/brayzonn",
      icon: GithubIconSmall,
    },
    { name: "Mail", link: "mailto:b.eyindaa@gmail.com", icon: MailIconSmall },
  ];
  const frontendTech = ["React", "TypeScript", "Tailwind CSS", "JavaScript"];
  const backendTech = ["NestJS", "PostgreSQL", "MongoDB", "Express.js"];
  return (
    <div
      className={`relative select-none rounded-lg max-w-[600px] mx-auto shadow-lg p-4 transition-colors duration-300 ${
        isDark
          ? "bg-white border border-gray-200"
          : "bg-[#121418] border border-[#2a2d35]"
      }`}
    >
      {/* Hero */}
      <section className="flex justify-between items-center">
        <div className="">
          <h1
            className={`text-[1.2rem] font-bold ${
              isDark ? "text-gray-900" : "text-white"
            }`}
          >
            Eyinda Bright
          </h1>
          <p
            className={` text-[14px] ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Software Developer
          </p>
        </div>

        <a
          href="mailto:brayzoney@gmail.com"
          onClick={() =>
            logEvent("contact_click", {
              type: "available_for_work",
              location: "hero",
            })
          }
          className={`text-[12px] inline-flex items-center gap-2 px-3 py-2 rounded-full transition ${
            isDark
              ? "border border-gray-200 hover:bg-gray-100"
              : "border border-[#2a2d35] hover:bg-[#1f2228]"
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className={isDark ? "text-gray-900" : "text-white"}>
            Available for work
          </span>
        </a>
      </section>

      {/* Divider */}
      <div className="h-[1px] w-full my-3 " />

      {/* Intro */}
      <section className="text-center">
        <p
          className={`text-[14px] text-left leading-relaxed ${
            isDark ? "text-gray-600" : "text-gray-400"
          }`}
        >
          Hi! I&apos;m{" "}
          <span
            className={`font-semibold ${
              isDark ? "text-gray-900" : "text-white"
            }`}
          >
            Eyinda Bright
          </span>
          , a software developer focused on building reliable backend systems
          and frontend infrastructure. Lately, I&apos;ve been exploring more
          backend technologies, refining API performance, optimizing database
          interactions, and improving deployment pipelines.
        </p>

        <p
          className={`text-[14px] text-left   leading-relaxed mt-4 ${
            isDark ? "text-gray-600" : "text-gray-400"
          }`}
        >
          I&apos;m open to{" "}
          <span
            className={`font-medium ${isDark ? "text-gray-900" : "text-white"}`}
          >
            full-time
          </span>
          ,{" "}
          <span
            className={`font-medium ${isDark ? "text-gray-900" : "text-white"}`}
          >
            part-time
          </span>
          , or{" "}
          <span
            className={`font-medium ${isDark ? "text-gray-900" : "text-white"}`}
          >
            contract
          </span>{" "}
          roles. You can reach my{" "}
          <a
            onClick={() => logEvent("email_click", { location: "intro" })}
            href="mailto:b.eyindaa@gmail.com"
            className={`inline-flex items-center gap-1 group transition ${
              isDark ? "text-gray-900" : "text-white"
            }`}
          >
            <span
              className={` underline ${
                isDark
                  ? "decoration-gray-400 group-hover:decoration-gray-900"
                  : "decoration-gray-500 group-hover:decoration-white"
              } transition-colors`}
            >
              email
            </span>
            <span className="inline-block group-hover:translate-x-0.5 transition-transform">
              ↗
            </span>
          </a>{" "}
          to discuss potential opportunities.
        </p>

        <p
          className={`text-left  text-[14px]  leading-relaxed mt-4 ${
            isDark ? "text-gray-600" : "text-gray-400"
          }`}
        >
          Outside work, I enjoy curating{" "}
          <a
            href="https://spotify.link/TmIHSnEFGXb"
            onClick={() => logEvent("spotify_click", { location: "intro" })}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 group transition ${
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
              playlists
            </span>
            <span className="inline-block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              ↗
            </span>
          </a>
          , gaming, and watching classic films.
        </p>
      </section>

      {/* Social Links */}
      <div className="flex flex-row gap-2 mt-4">
        {socials.map((item) => (
          <a
            key={item.name}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              logEvent("social_click", {
                platform: item.name,
                location: "hero",
              })
            }
            className={`inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-[12px] font-medium transition ${
              isDark
                ? "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"
                : "bg-[#1f2228] text-gray-400 border border-[#2a2d35] hover:bg-[#2a2d35]"
            }`}
          >
            {item.icon}
            <span className="hidden sm:inline">{item.name}</span>
          </a>
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

      {/* Tech Stack */}
      <section className="mt-4">
        <h2
          className={`text-[14px] font-semibold mb-3 ${
            isDark ? "text-gray-900" : "text-white"
          }`}
        >
          Tech Stack
        </h2>

        <div className="flex flex-col gap-2">
          {[
            { title: "Frontend", items: frontendTech },
            { title: "Backend", items: backendTech },
          ].map((cat) => (
            <div key={cat.title} className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[11px] font-medium w-16 shrink-0 ${
                  isDark ? "text-gray-500" : "text-gray-500"
                }`}
              >
                {cat.title}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((tech) => (
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
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hero;
