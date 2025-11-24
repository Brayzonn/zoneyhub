import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import InfoCard from "./InfoCard";

interface MenuItem {
  path: string;
  label: string;
  id: string;
  icon: React.ReactNode;
}

interface FloatingSideMenuProps {
  onInfoClick: () => void;
  isInfoOpen: boolean;
}

const FloatingSideMenu = ({
  onInfoClick,
  isInfoOpen,
}: FloatingSideMenuProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems: MenuItem[] = [
    {
      path: "/",
      label: "Home",
      id: "home",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-5 w-5 shrink-0 transition-colors"
        >
          <path
            fill="currentColor"
            d="M13.7 3.455a3 3 0 0 0-3.4 0l-6 4.125A3 3 0 0 0 3 10.052V18a3 3 0 0 0 3 3h2.5a1 1 0 0 0 1-1v-3.5a2.5 2.5 0 0 1 5 0V20a1 1 0 0 0 1 1H18a3 3 0 0 0 3-3v-7.948a3 3 0 0 0-1.3-2.472z"
          />
        </svg>
      ),
    },
    {
      path: "/music-room",
      label: "Music",
      id: "music",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className="h-5 w-5 shrink-0 transition-colors"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 12 4.5 7.781m7.5 4.22v8.5m0-8.5 7.5-4.22m.5.889v6.66a2 2 0 0 1-1.02 1.744l-6 3.375a2 2 0 0 1-1.96 0l-6-3.375A2 2 0 0 1 4 15.33V8.67a2 2 0 0 1 1.02-1.743l6-3.375a2 2 0 0 1 1.96 0l6 3.375A2 2 0 0 1 20 8.67"
          />
        </svg>
      ),
    },
    {
      path: "/repos",
      label: "Craft",
      id: "craft",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 shrink-0 transition-colors"
        >
          <path
            d="M6.70694 14.7929C6.31641 15.1834 5.68325 15.1834 5.29272 14.7929L2.45696 11.9571C2.06643 11.5666 2.06643 10.9334 2.45696 10.5429L9.70694 3.29289C9.89447 3.10536 10.1488 3 10.414 3L14.0857 3C14.3509 3 14.6052 3.10536 14.7928 3.29289L15.7927 4.29286C16.1832 4.68338 16.1832 5.31655 15.7927 5.70707L6.70694 14.7929Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 12.5L16.3358 19.3358C17.1168 20.1168 18.3832 20.1168 19.1642 19.3358L19.3358 19.1642C20.1168 18.3832 20.1168 17.1168 19.3358 16.3358L12.5 9.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative">
      {/* Main Menu Container */}
      <div className="px-2 py-2 bg-white border-2 border-[#94BDE6] rounded-2xl flex flex-col gap-2 shadow-[0_1px_1px_-0.5px_rgba(0,0,0,0.04),0_3px_3px_-1.5px_rgba(0,0,0,0.04),0_12px_12px_-6px_rgba(0,0,0,0.04),0_0_0_1px_rgba(148,189,230,0.1)] transition-all duration-300 ease-in-out">
        {menuItems.map((item) => (
          <div key={item.id} className="relative flex items-center">
            <Link
              to={item.path}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all group ${
                isActive(item.path)
                  ? "bg-[#5a8ab8] border border-[#94BDE6] hover:bg-[#6d9bca] hover:bg-opacity-100"
                  : "text-gray-600 hover:text-white hover:bg-[#6d9bca] hover:bg-opacity-100 border border-transparent hover:border-[#94BDE6]"
              }`}
            >
              <div
                className={`${
                  isActive(item.path) ? "text-white group-hover:text-white" : ""
                }`}
              >
                {item.icon}
              </div>
            </Link>
            <div
              className={`absolute left-full ml-2 px-3 py-2 bg-white border-2 border-[#94BDE6] rounded-xl shadow-[0_1px_1px_-0.5px_rgba(0,0,0,0.04),0_3px_3px_-1.5px_rgba(0,0,0,0.04),0_12px_12px_-6px_rgba(0,0,0,0.04),0_0_0_1px_rgba(148,189,230,0.1)] transition-all duration-300 ${
                hoveredItem === item.id
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-2 pointer-events-none"
              }`}
            >
              <h1
                className={`text-sm font-medium whitespace-nowrap ${
                  isActive(item.path) ? "text-[#5a8ab8]" : "text-gray-700"
                }`}
              >
                {item.label}
              </h1>
            </div>
          </div>
        ))}

        {/* Divider */}
        <div className="shrink-0 bg-[#94BDE6] h-[1px] mx-1.5" />

        {/* Info Button */}
        <div className="relative flex items-center">
          <button
            onMouseEnter={() => setHoveredItem("info")}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={onInfoClick}
            className={`cursor-pointer shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${
              isInfoOpen
                ? "bg-[#5a8ab8] text-white border-[#94BDE6]"
                : "text-gray-600 hover:text-white hover:bg-[#6d9bca] hover:bg-opacity-100 border-transparent hover:border-[#94BDE6]"
            }`}
            aria-label="Music Player"
          >
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
              <circle cx="12" cy="12" r="2" />
              <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
            </svg>
          </button>
          <div
            className={`absolute left-full ml-2 px-3 py-2 bg-white border-2 border-[#94BDE6] rounded-xl shadow-[0_1px_1px_-0.5px_rgba(0,0,0,0.04),0_3px_3px_-1.5px_rgba(0,0,0,0.04),0_12px_12px_-6px_rgba(0,0,0,0.04),0_0_0_1px_rgba(148,189,230,0.1)] transition-all duration-300 ${
              hoveredItem === "info"
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2 pointer-events-none"
            }`}
          >
            <h1 className="text-sm font-medium whitespace-nowrap text-gray-700">
              Player
            </h1>
          </div>
        </div>
      </div>

      {/* Music Player - positioned below menu with same spacing */}
      <div className="absolute top-full mt-2 left-0">
        <InfoCard isOpen={isInfoOpen} onClose={() => onInfoClick()} />
      </div>
    </div>
  );
};

export default FloatingSideMenu;
