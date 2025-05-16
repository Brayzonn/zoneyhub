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
  ];

  return (
    <footer className="w-full mt-16 mb-8 flex flex-col items-start justify-start">
      <div className="flex flex-col space-y-1 mb-6">
        <h2 className="font-mono text-left font-[500] text-[25px] tracking-tight">
          Let&apos;s Connect
        </h2>
        <p className="text-gray-300 sans tracking-wide text-left font-[400] text-[15px] mt-1 max-w-[650px]">
          Interested in collaborating or hiring? I&apos;m always open to
          exploring new projects, creative partnerships, or contributing to
          meaningful work. Looking for a developer for your next project?
          Let&apos;s talk about how I can help.
        </p>
      </div>

      <div className="w-full flex flex-wrap gap-4 mt-4">
        {contactLinks.map((link) => (
          <a
            key={link.id}
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-mono text-sm py-3 px-5 bg-gradient-to-r from-[#2A2A2A] to-[#333333] text-white rounded-md hover:from-[#333333] hover:to-[#3A3A3A] transition-all duration-300 hover:-translate-y-1"
          >
            <span className="mr-2">{link.icon}</span>
            {link.name}
          </a>
        ))}
      </div>

      <div className="w-full mt-12 pt-6 border-t border-[#333333] flex flex-col md:flex-row justify-between items-start md:items-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Brayzoney. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
