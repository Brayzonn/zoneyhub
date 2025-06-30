import { TwitterIcon, GithubIcon, LinkedInIcon } from "./Icons";

const Showcase = () => {
  return (
    <div className="py-8 w-full min-h-[500px] flex flex-col items-start justify-center space-y-2 relative">
      <div className="relative">
        <h1 className=" tracking-tight text-left font-semibold text-5xl md:text-6xl transform -skew-x-6 text-white select-none">
          Eyinda Bright
        </h1>
        <div className="absolute inset-0 blur-3xl opacity-10 bg-white -z-10" />
      </div>

      <h3 className=" text-gray-400 text-left font-medium text-xl md:text-2xl flex items-center">
        <span className="text-gray-300">&lt;</span>
        Web Developer
        <span className="text-gray-300">/&gt;</span>
        <span className="inline-block w-0.5 h-5 bg-gray-300 ml-1 animate-pulse" />
      </h3>

      <div className="w-full flex flex-col items-start justify-center space-y-6 mt-4">
        <div className="relative">
          <p className="text-gray-300 leading-relaxed font-sans tracking-wide text-left text-base mt-3 max-w-[650px] pl-4 border-l-2 border-gray-600">
            Building web applications that address both technical requirements
            and user needs. I believe great software is built through a clear
            understanding of both the engineering challenges and the human goals
            behind them.
          </p>
        </div>

        <div className="mt-6 flex justify-start items-center space-x-8">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Brayzonn"
            aria-label="GitHub"
            className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 relative group"
          >
            {GithubIcon}
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://linkedin.com/in/eyinda-bright-b299961a1"
            aria-label="LinkedIn"
            className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 relative group"
          >
            {LinkedInIcon}
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/brayzoney"
            aria-label="Twitter"
            className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 relative group"
          >
            {TwitterIcon}
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
