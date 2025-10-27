import { logEvent } from "../utils/analytics";

const Hero = () => {
  return (
    <>
      {/* Hero */}
      <section className="flex flex-col items-center text-center py-10">
        <h1 className="text-4xl sm:text-6xl font-bold text-[var(--color-primary-text-color)]">
          Eyinda Bright
        </h1>
        <p className="mt-2 text-lg text-[var(--color-muted-text)]">
          Software Developer
        </p>
        <a
          href="mailto:brayzoney@gmail.com"
          onClick={() =>
            logEvent("contact_click", {
              type: "available_for_work",
              location: "hero",
            })
          }
          className="mt-4 inline-flex items-center gap-2 px-5 py-2 border border-[var(--color-border)] rounded-full hover:bg-[var(--color-card-hover-bg)] transition"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Available for work
        </a>
      </section>

      {/* Intro */}
      <section className="max-w-3xl mx-auto text-center mb-20">
        <p className="text-[14px] sm:text-[18px] text-[var(--color-muted-text)] leading-relaxed">
          Hi! I&apos;m{" "}
          <span className="text-[var(--color-primary-text-color)] font-semibold">
            Eyinda Bright
          </span>
          , a software developer focused on building reliable backend systems,
          frontend infrastructure, and distributed applications. Lately,
          I&apos;ve been exploring more backend technologies, refining API
          performance, optimizing database interactions, and improving
          deployment pipelines.
        </p>

        <p className="text-[14px] sm:text-[18px] text-[var(--color-muted-text)] leading-relaxed mt-2">
          I&apos;m open to{" "}
          <span className="text-[var(--color-primary-text-color)] font-medium">
            full-time
          </span>
          ,{" "}
          <span className="text-[var(--color-primary-text-color)] font-medium">
            part-time
          </span>
          , or{" "}
          <span className="text-[var(--color-primary-text-color)] font-medium">
            contract
          </span>{" "}
          roles. You can reach me at{" "}
          <a
            onClick={() => logEvent("email_click", { location: "intro" })}
            href="mailto:brayzoney@gmail.com"
            className="inline-flex items-center gap-1 group transition text-[var(--color-primary-text-color)]"
          >
            <span className="underline decoration-[var(--color-muted-text)] group-hover:decoration-[var(--color-primary-text-color)] transition-colors">
              brayzoney@gmail.com
            </span>
            <span className="inline-block group-hover:translate-x-0.5 transition-transform">
              ↗
            </span>
          </a>{" "}
          to discuss potential opportunities.
        </p>

        <p className="text-[14px] sm:text-[18px] text-[var(--color-muted-text)] leading-relaxed mt-2">
          Outside work, I enjoy curating{" "}
          <a
            href="https://spotify.link/TmIHSnEFGXb"
            onClick={() => logEvent("spotify_click", { location: "intro" })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 group transition text-[var(--color-primary-text-color)]"
          >
            <span className="underline decoration-[var(--color-muted-text)] group-hover:decoration-[var(--color-primary-text-color)] transition-colors">
              playlists
            </span>
            <span className="inline-block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              ↗
            </span>
          </a>
          , gaming, and watching classic films.
        </p>
      </section>
    </>
  );
};

export default Hero;
