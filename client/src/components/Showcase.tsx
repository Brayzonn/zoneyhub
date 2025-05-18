const Showcase = () => {
  return (
    <div className="py-[2rem] w-full min-h-[500px] flex flex-col items-start justify-center space-y-[0.30rem]">
      <h1 className="font-mono tracking-tight text-left font-[600] text-[39px]">
        Eyinda Bright
      </h1>
      <h3 className="font-mono text-gray-500 text-left font-[500] text-[20px]">
        Web Developer
      </h3>

      <div className="w-full flex flex-col items-start justify-center space-y-3">
        <p className="text-gray-300 sans tracking-wide text-left font-[400] text-[15px] mt-3 max-w-[650px]">
          A Full-stack web developer who loves turning complex problems into
          elegant solutions. I believe great software comes from understanding
          both the technical challenges and the human needs behind them. When
          I&apos;m not building, you&apos;ll find me mastering tactics in EA
          Sports FC.
        </p>

        <div className="mt-[1rem] flex justify-start items-center space-x-[2rem]">
          <a
            target="blank"
            rel="noopener noreferrer"
            href="https://github.com/Brayzonn"
            aria-label="GitHub"
          >
            <svg
              className="w-6 h-6 text-gray-500 hover:text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>

          <a
            target="blank"
            rel="noopener noreferrer"
            href="https://linkedin.com/in/eyinda-bright-b299961a1"
            aria-label="LinkedIn"
          >
            <svg
              className="w-6 h-6 text-gray-500 hover:text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>

          <a
            target="blank"
            rel="noopener noreferrer"
            href="https://twitter.com/brayzoney"
            aria-label="Twitter"
          >
            <svg
              className="w-6 h-6 text-gray-500 hover:text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
