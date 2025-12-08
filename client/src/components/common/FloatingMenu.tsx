import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InfoCard from "./InfoCard";
import MusicPlayer from "./Musicplayer";
import {
  HomeIcon,
  ProjectsIcon,
  // BlogIcon,
  PlaygroundIcon,
  SoundOnIcon,
  SoundOffIcon,
  SunIcon,
  MoonIcon,
} from "../../assets/icons";

interface MenuItem {
  path: string;
  label: string;
  id: string;
  icon: React.ReactNode;
}

interface CurrentTrack {
  id: string;
  name: string;
  artist: string;
  albumArt?: string;
}

interface FloatingMenuProps {
  onInfoClick: () => void;
  isInfoOpen: boolean;
  isSoundOn: boolean;
  onSoundToggle: () => void;
  currentTrack?: CurrentTrack | null;
  onStopTrack: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

const FloatingMenu = ({
  onInfoClick,
  isInfoOpen,
  isSoundOn,
  onSoundToggle,
  currentTrack,
  onStopTrack,
  isDark,
  onThemeToggle,
}: FloatingMenuProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems: MenuItem[] = [
    {
      path: "/",
      label: "Home",
      id: "home",
      icon: <HomeIcon />,
    },
    {
      path: "/repos",
      label: "Projects",
      id: "projects",
      icon: <ProjectsIcon />,
    },
    // {
    //   path: "/blog",
    //   label: "Blog",
    //   id: "blog",
    //   icon: <BlogIcon />,
    // },
    {
      path: "/playground",
      label: "Playground",
      id: "playground",
      icon: <PlaygroundIcon />,
    },
  ];

  return (
    <div className="relative flex items-center">
      {/* Info Card */}
      <div
        className={`absolute right-full top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${
          isInfoOpen
            ? "opacity-100 translate-x-0 mr-2"
            : "opacity-0 -translate-x-4 mr-0 pointer-events-none"
        }`}
      >
        <div
          className={`px-2 py-1 rounded-[9px] border ${
            isDark
              ? "bg-white border-gray-200"
              : "bg-[#121418] border-[#121418]"
          }`}
        >
          <InfoCard isOpen={isInfoOpen} onClose={() => onInfoClick()} />
        </div>
      </div>

      {/* Main Menu Container */}
      <div className="relative flex items-center">
        {/* Music Player */}
        <AnimatePresence>
          {currentTrack && (
            <motion.div
              className="absolute right-full top-0 flex items-center overflow-hidden"
              initial={{ width: 0, x: 200 }}
              animate={{
                width: 208,
                x: 0,
                transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
              }}
              exit={{
                width: 0,
                x: 200,
                transition: { duration: 0.9, ease: [0.2, 0, 0.4, 1] },
              }}
              style={{ marginRight: "9px" }}
            >
              <div
                className={`h-full rounded-[12px] overflow-hidden border ${
                  isDark
                    ? "bg-white border-gray-200"
                    : "bg-[#121418] border-[#121418]"
                }`}
              >
                <MusicPlayer
                  trackId={currentTrack.id}
                  trackName={currentTrack.name}
                  artistName={currentTrack.artist}
                  albumArt={currentTrack.albumArt}
                  onStop={onStopTrack}
                  isDark={isDark}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Menu */}
        <div
          className={`relative z-10 flex items-center rounded-[12px] border ${
            isDark
              ? "bg-white border-gray-200"
              : "bg-[#121418] border-[#121418]"
          }`}
        >
          {/* Menu Items Container */}
          <div className="h-[48px] px-2 py-1 flex flex-row gap-2">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="relative flex items-center space-x-1"
              >
                <Link
                  to={item.path}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`shrink-0 w-8 h-8 rounded-[8px] flex items-center justify-center transition-all group border ${
                    isActive(item.path)
                      ? isDark
                        ? "bg-gray-100 border-gray-200 text-gray-900"
                        : "bg-[#1f2228] border-[#1f2228] text-white"
                      : isDark
                      ? "text-gray-500 hover:text-gray-900 hover:bg-gray-100 border-transparent hover:border-gray-200"
                      : "text-gray-500 hover:text-white hover:bg-[#1f2228] border-transparent hover:border-[#1f2228]"
                  }`}
                >
                  <div>{item.icon}</div>
                </Link>
                {/* Label tooltip */}
                <div
                  className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-[7px] transition-all duration-300 border ${
                    isDark
                      ? "bg-white border-gray-200"
                      : "bg-[#121418] border-[#121418]"
                  } ${
                    hoveredItem === item.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  <h1
                    className={`text-sm font-medium whitespace-nowrap ${
                      isDark ? "text-gray-900" : "text-[#e1e1e1]"
                    }`}
                  >
                    {item.label}
                  </h1>
                </div>
              </div>
            ))}

            {/* Divider */}
            <div
              className={`shrink-0 w-[1px] my-1.5 ${
                isDark ? "bg-gray-200" : "bg-[#515151]"
              }`}
            />

            {/* Sound Toggle Button */}
            <div className="relative flex items-center">
              <button
                onMouseEnter={() => setHoveredItem("sound")}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={onSoundToggle}
                className={`cursor-pointer shrink-0 w-8 h-8 rounded-[8px] flex items-center justify-center transition-all border ${
                  isDark
                    ? "text-gray-500 hover:text-gray-900 hover:bg-gray-100 border-transparent hover:border-gray-200"
                    : "text-gray-500 hover:text-white hover:bg-[#1f2228] border-transparent hover:border-[#1f2228]"
                }`}
                aria-label={isSoundOn ? "Mute Sound" : "Unmute Sound"}
              >
                {isSoundOn ? <SoundOnIcon /> : <SoundOffIcon />}
              </button>

              {/* Label tooltip */}
              <div
                className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-[7px] transition-all duration-300 border ${
                  isDark
                    ? "bg-white border-gray-200"
                    : "bg-[#121418] border-[#121418]"
                } ${
                  hoveredItem === "sound"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                <h1
                  className={`text-sm font-medium whitespace-nowrap ${
                    isDark ? "text-gray-900" : "text-[#c5c5c5]"
                  }`}
                >
                  {isSoundOn ? "Mute" : "Unmute"}
                </h1>
              </div>
            </div>

            {/* Theme Toggle Button */}
            <div className="relative flex items-center">
              <button
                onMouseEnter={() => setHoveredItem("theme")}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={onThemeToggle}
                className={`cursor-pointer shrink-0 w-8 h-8 rounded-[8px] flex items-center justify-center transition-all border ${
                  isDark
                    ? "text-gray-500 hover:text-gray-900 hover:bg-gray-100 border-transparent hover:border-gray-200"
                    : "text-gray-500 hover:text-white hover:bg-[#1f2228] border-transparent hover:border-[#1f2228]"
                }`}
                aria-label={isDark ? "Light Mode" : "Dark Mode"}
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
              </button>

              {/* Label tooltip */}
              <div
                className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-[7px] transition-all duration-300 border ${
                  isDark
                    ? "bg-white border-gray-200"
                    : "bg-[#121418] border-[#121418]"
                } ${
                  hoveredItem === "theme"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                <h1
                  className={`text-sm font-medium whitespace-nowrap ${
                    isDark ? "text-gray-900" : "text-[#c5c5c5]"
                  }`}
                >
                  {isDark ? "Light" : "Dark"}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingMenu;
