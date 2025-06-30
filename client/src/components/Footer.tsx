const Footer = () => {
  const contactLinks = [
    {
      id: 1,
      name: "Email",
      link: "mailto:brayzoney@gmail.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      id: 2,
      name: "GitHub",
      link: "https://github.com/Brayzonn",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      id: 3,
      name: "LinkedIn",
      link: "https://linkedin.com/in/eyinda-bright-b299961a1",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full my-24 mb-8 flex flex-col items-start justify-start">
      <div className="flex flex-col space-y-1 mb-6">
        <div className="relative">
          <h2 className="font-mono text-left font-[500] text-[25px] tracking-tight transform -skew-x-6 text-white">
            Let&apos;s Connect
          </h2>
          <div className="absolute inset-0 blur-2xl opacity-10 bg-white -z-10" />
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-gray-300 sans tracking-wide text-left font-[400] text-[15px] mt-1 max-w-[650px] flex items-center">
            Interested in collaborating or hiring? Let&apos;s talk about how I
            can help.
          </p>

          <div className="flex items-center space-x-2 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-gray-400 font-mono">
              Available for opportunities
            </span>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap gap-4 mt-4">
        {contactLinks.map((link) => (
          <a
            key={link.id}
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-mono text-sm py-3 px-5 bg-primary-card-buttons-bg text-white rounded-md hover:bg-primary-card-buttons-hover-bg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group border border-gray-700 hover:border-gray-500"
          >
            <span className="text-gray-500 mr-1">[</span>
            <span className="mr-2">{link.icon}</span>
            {link.name}
            <span className="text-gray-500 ml-1">]</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </a>
        ))}
      </div>

      <div className="w-full mt-12 relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-600 font-mono text-xs">
          &lt;hr/&gt;
        </div>
        <div className="border-t border-[#333333] ml-16" />
      </div>

      <div className="w-full mt-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <p className="text-sm text-gray-400">
          <span className="text-gray-600">$</span> © {new Date().getFullYear()}{" "}
          Brayzonn. All rights reserved.
        </p>

        <p className="pb-[2rem] text-xs text-gray-600 font-mono mt-2  md:pb-[3rem] md:mt-0">
          v2.0.0 • Built with React
        </p>
      </div>
    </footer>
  );
};

export default Footer;
