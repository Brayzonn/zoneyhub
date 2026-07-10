import { logEvent } from "../utils/analytics";
import Kicker from "./ui/Kicker";
import Chip from "./ui/Chip";

const journeyChips = [
  { label: "what I've built → projects", path: "/projects" },
  { label: "ideas & notes → blog", path: "/blog" },
  { label: "toys & experiments → playground", path: "/playground" },
];

const Hero = () => {
  return (
    <section className="max-w-[960px] mx-auto pt-8 pb-8 max-sm:pt-2">
      <Kicker className="mb-3">Software Developer</Kicker>

      <h1 className="font-serif font-medium text-title max-md:text-title-sm mb-[1.2rem] text-ink">
        I&rsquo;m Eyinda Bright. I build software, mostly for other people,
        sometimes just for fun.
      </h1>

      <p className="text-body text-ink-muted">
        On the engineering side, I mostly work within the TypeScript and Go
        ecosystems, with an eye for forward-compatible schema, secure APIs, and
        modular code.
      </p>

      <p className="text-body text-ink-muted mt-6">
        In my spare time, I build the fun ideas that come to my head, and
        software that makes my workflow easier. Lately, that has meant building{" "}
        <a
          href="https://nestra.me"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => logEvent("nestra_click", { location: "intro" })}
          className="text-ink border-b border-ink/20 hover:border-ink transition-colors duration-150"
        >
          Nestra
        </a>
        , a portfolio hub that gives creatives a single online identity,
        and{" "}
        <a
          href="https://notifykit.dev"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => logEvent("notifykit_click", { location: "intro" })}
          className="text-ink border-b border-ink/20 hover:border-ink transition-colors duration-150"
        >
          NotifyKit
        </a>
        , a notification infrastructure service that makes email and webhook
        delivery simple, reliable, and observable.
      </p>

      <p className="text-body text-ink-muted mt-6">
        I&rsquo;m open to full-time, part-time, or contract roles —{" "}
        <a
          href="mailto:hello@zoneyhub.com"
          onClick={() => logEvent("email_click", { location: "intro" })}
          className="text-ink border-b border-ink/20 hover:border-ink transition-colors duration-150"
        >
          reach my email
        </a>{" "}
        to discuss potential opportunities.
      </p>

      <p className="text-body text-ink-muted mt-6">
        Outside work, I{" "}
        <a
          href="https://spotify.link/TmIHSnEFGXb"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => logEvent("spotify_click", { location: "intro" })}
          className="text-ink border-b border-ink/20 hover:border-ink transition-colors duration-150"
        >
          curate playlists
        </a>
        , play video games, and lately I&rsquo;ve been teaching myself music
        production.
      </p>

      <div className="mt-10">
        <Kicker className="mb-[0.65rem]">Follow my journey</Kicker>
        <div className="flex flex-wrap gap-3">
          {journeyChips.map((chip) => (
            <Chip key={chip.path} to={chip.path}>
              {chip.label}
            </Chip>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
