import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InfoCard from "./InfoCard";
import MusicPlayer from "./Musicplayer";
import {
  HomeIcon,
  MusicIcon,
  ProjectsIcon,
  BlogIcon,
  PlaygroundIcon,
  SoundOnIcon,
  SoundOffIcon,
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

interface FloatingSideMenuProps {
  onInfoClick: () => void;
  isInfoOpen: boolean;
  isSoundOn: boolean;
  onSoundToggle: () => void;
  currentTrack?: CurrentTrack | null;
  onStopTrack: () => void;
}

const FloatingSideMenu = ({
  onInfoClick,
  isInfoOpen,
  isSoundOn,
  onSoundToggle,
  currentTrack,
  onStopTrack,
}: FloatingSideMenuProps) => {
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
      path: "/music-room",
      label: "Music",
      id: "music",
      icon: <MusicIcon />,
    },
    {
      path: "/repos",
      label: "Projects",
      id: "projects",
      icon: <ProjectsIcon />,
    },
    {
      path: "/blog",
      label: "Blog",
      id: "blog",
      icon: <BlogIcon />,
    },
    {
      path: "/playground",
      label: "Playground",
      id: "playground",
      icon: <PlaygroundIcon />,
    },
  ];

  return (
    <div className="relative flex items-center ">
      {/* Info Card */}
      <div
        className={`absolute right-full top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${
          isInfoOpen
            ? "opacity-100 translate-x-0 mr-2"
            : "opacity-0 -translate-x-4 mr-0 pointer-events-none"
        }`}
      >
        <div className="px-2 py-1 bg-[#121418] border-2 border-[#121418] rounded-[9px]">
          <InfoCard isOpen={isInfoOpen} onClose={() => onInfoClick()} />
        </div>
      </div>

      {/* Main Menu Container */}
      <div className="relative flex items-center">
        {/* Music Player  */}
        <AnimatePresence>
          {currentTrack && (
            <motion.div
              className="absolute right-full top-0 flex items-center"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
              style={{ marginRight: "4px" }}
            >
              <div className="h-full bg-[#121418] border-2 border-[#121418] rounded-[9px] overflow-hidden">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.25, duration: 0.2 }}
                >
                  <MusicPlayer
                    trackId={currentTrack.id}
                    trackName={currentTrack.name}
                    artistName={currentTrack.artist}
                    albumArt={currentTrack.albumArt}
                    onStop={onStopTrack}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Menu */}
        <div className="relative z-10 flex items-center bg-[#121418] border-2 border-[#121418] rounded-[9px]">
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
                  className={`shrink-0 w-8 h-8 rounded-[8px] flex items-center justify-center transition-all group ${
                    isActive(item.path)
                      ? "bg-[#1f2228] border border-[#1f2228] hover:bg-[#1f2228] hover:bg-opacity-100"
                      : "text-gray-600 hover:text-white hover:bg-[#1f2228] hover:bg-opacity-100 border border-transparent hover:border-[#1f2228]"
                  }`}
                >
                  <div
                    className={`${
                      isActive(item.path)
                        ? "text-white group-hover:text-white"
                        : ""
                    }`}
                  >
                    {item.icon}
                  </div>
                </Link>
                {/* Label tooltip  */}
                <div
                  className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#121418] border-2 border-[#121418] rounded-[7px] transition-all duration-300 ${
                    hoveredItem === item.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  <h1
                    className={`text-sm font-medium whitespace-nowrap ${
                      isActive(item.path) ? "text-[#e1e1e1]" : "text-[#c5c5c5]"
                    }`}
                  >
                    {item.label}
                  </h1>
                </div>
              </div>
            ))}

            {/* Divider  */}
            <div className="shrink-0 bg-[#515151] w-[0.30px] my-1.5" />

            {/* Sound Toggle Button */}
            <div className="relative flex items-center">
              <button
                onMouseEnter={() => setHoveredItem("sound")}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={onSoundToggle}
                className="cursor-pointer shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all border text-gray-600 hover:text-white hover:bg-[#1f2228] hover:bg-opacity-100 border-transparent hover:border-[#1f2228]"
                aria-label={isSoundOn ? "Mute Sound" : "Unmute Sound"}
              >
                {isSoundOn ? <SoundOnIcon /> : <SoundOffIcon />}
              </button>

              {/* Label tooltip */}
              <div
                className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#121418] border-2 border-[#121418] rounded-[7px] transition-all duration-300 ${
                  hoveredItem === "sound"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                <h1 className="text-sm font-medium whitespace-nowrap text-[#c5c5c5]">
                  {isSoundOn ? "Mute" : "Unmute"}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingSideMenu;
