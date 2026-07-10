import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MusicPlayer from "./MusicPlayer";
import { useSoundEffects } from "../../hooks/useSoundEffects";
import { useTheme } from "../../hooks/useTheme";
import {
  HomeIcon,
  ProjectsIcon,
  PlaygroundIcon,
  BlogIcon,
  SoundOnIcon,
  SoundOffIcon,
  NowPlayingIcon,
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
  isSoundOn?: boolean;
  onSoundToggle?: () => void;
  currentTrack?: CurrentTrack | null;
  onStopTrack?: () => void;
  labelPosition?: "top" | "bottom";
}

const FloatingMenu = ({
  isSoundOn,
  onSoundToggle,
  currentTrack,
  onStopTrack,
  labelPosition = "bottom",
}: FloatingMenuProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Track mobile viewport for the player slide direction
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { playClick } = useSoundEffects({ isSoundOn: isSoundOn ?? true });

  // Reopen the player pill whenever a new track starts
  useEffect(() => {
    if (currentTrack) setIsPlayerOpen(true);
  }, [currentTrack]);

  const isActive = (path: string) => location.pathname === path;

  const getLabelClasses = () => {
    const baseClasses =
      "absolute left-1/2 -translate-x-1/2 px-2 py-1 rounded-[7px] transition-all duration-300 border bg-ink border-ink";

    const positionClasses =
      labelPosition === "top" ? "bottom-full mb-2" : "top-full mt-2";

    return `${baseClasses} ${positionClasses}`;
  };

  const getLabelVisibilityClasses = (isHovered: boolean) => {
    if (labelPosition === "top") {
      return isHovered
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-2 pointer-events-none";
    } else {
      return isHovered
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-2 pointer-events-none";
    }
  };

  const menuItems: MenuItem[] = [
    {
      path: "/",
      label: "Home",
      id: "home",
      icon: <HomeIcon />,
    },
    {
      path: "/projects",
      label: "Projects",
      id: "projects",
      icon: <ProjectsIcon />,
    },
    {
      path: "/playground",
      label: "Playground",
      id: "playground",
      icon: <PlaygroundIcon />,
    },
    {
      path: "/blog",
      label: "Blog",
      id: "blog",
      icon: <BlogIcon />,
    },
  ];

  return (
    <div className="relative flex items-center">
      <AnimatePresence>
        {currentTrack && isPlayerOpen && (
          <motion.div
            className={
              isMobile
                ? "absolute top-full left-1/2 flex items-center"
                : "absolute right-full top-0 flex items-center overflow-hidden"
            }
            initial={isMobile ? { x: "-50%", y: -52 } : { width: 0, x: 200 }}
            animate={
              isMobile
                ? {
                    x: "-50%",
                    y: 9,
                    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
                  }
                : {
                    width: 240,
                    x: 13,
                    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
                  }
            }
            exit={
              isMobile
                ? {
                    x: "-50%",
                    y: -52,
                    transition: { duration: 0.9, ease: [0.2, 0, 0.4, 1] },
                  }
                : {
                    width: 0,
                    x: 200,
                    transition: { duration: 0.9, ease: [0.2, 0, 0.4, 1] },
                  }
            }
            style={isMobile ? undefined : { marginRight: "9px" }}
          >
            <div className="h-full rounded-[12px] overflow-hidden border-2 transition-colors duration-300 bg-bg border-ink/20">
              <MusicPlayer
                trackName={currentTrack.name}
                artistName={currentTrack.artist}
                albumArt={currentTrack.albumArt}
                onStop={onStopTrack ?? (() => {})}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex items-center rounded-[12px] border-2 transition-colors duration-300 bg-bg border-ink/20">
        <div className="h-[48px] px-2 py-1 flex flex-row gap-4">
          {menuItems.map((item) => (
            <div key={item.id} className="relative flex items-center space-x-1">
              <Link
                to={item.path}
                onClick={playClick}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`shrink-0 w-8 h-8 rounded-[8px] flex items-center justify-center transition-all group border ${
                  isActive(item.path)
                    ? "bg-ink/10 border-ink/10 text-ink"
                    : "text-ink-muted hover:text-ink hover:bg-ink/10 border-transparent hover:border-ink/10"
                }`}
              >
                <div>{item.icon}</div>
              </Link>
              <div
                className={`${getLabelClasses()} ${getLabelVisibilityClasses(
                  hoveredItem === item.id,
                )}`}
              >
                <span className="text-sm font-medium whitespace-nowrap text-bg">
                  {item.label}
                </span>
              </div>
            </div>
          ))}

          <div className="shrink-0 w-[1px] my-1.5 bg-ink/25" />

          <div className="relative flex items-center">
            <button
              onMouseEnter={() => setHoveredItem("now-playing")}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => {
                if (!currentTrack) return;
                playClick();
                setIsPlayerOpen((prev) => !prev);
              }}
              disabled={!currentTrack}
              className={`shrink-0 w-8 h-8 rounded-[8px] flex items-center justify-center transition-all border ${
                !currentTrack
                  ? "text-ink/25 border-transparent cursor-default"
                  : isPlayerOpen
                    ? "cursor-pointer bg-ink/10 border-ink/10 text-ink"
                    : "cursor-pointer text-ink-muted hover:text-ink hover:bg-ink/10 border-transparent hover:border-ink/10"
              }`}
              aria-label={
                currentTrack && isPlayerOpen ? "Hide player" : "Show player"
              }
            >
              <NowPlayingIcon />
            </button>

            <div
              className={`${getLabelClasses()} ${getLabelVisibilityClasses(
                hoveredItem === "now-playing",
              )}`}
            >
              <span className="text-sm font-medium whitespace-nowrap text-bg">
                {!currentTrack
                  ? "Now Playing"
                  : isPlayerOpen
                    ? "Hide Player"
                    : "Show Player"}
              </span>
            </div>
          </div>

          <div className="relative flex items-center">
            <button
              onMouseEnter={() => setHoveredItem("sound")}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => {
                onSoundToggle?.();
                if (!isSoundOn) {
                  setTimeout(() => playClick(), 50);
                }
              }}
              className="cursor-pointer shrink-0 w-8 h-8 rounded-[8px] flex items-center justify-center transition-all border text-ink-muted hover:text-ink hover:bg-ink/10 border-transparent hover:border-ink/10"
              aria-label={isSoundOn ? "Mute Sound" : "Unmute Sound"}
            >
              {isSoundOn ? <SoundOnIcon /> : <SoundOffIcon />}
            </button>

            <div
              className={`${getLabelClasses()} ${getLabelVisibilityClasses(
                hoveredItem === "sound",
              )}`}
            >
              <span className="text-sm font-medium whitespace-nowrap text-bg">
                {isSoundOn ? "Mute" : "Unmute"}
              </span>
            </div>
          </div>

          <div className="relative flex items-center">
            <button
              onMouseEnter={() => setHoveredItem("theme")}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => {
                playClick();
                toggleTheme();
              }}
              className="cursor-pointer shrink-0 w-8 h-8 rounded-[8px] flex items-center justify-center transition-all border text-ink-muted hover:text-ink hover:bg-ink/10 border-transparent hover:border-ink/10"
              aria-label={
                theme === "light"
                  ? "Switch to dark theme"
                  : "Switch to light theme"
              }
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>

            <div
              className={`${getLabelClasses()} ${getLabelVisibilityClasses(
                hoveredItem === "theme",
              )}`}
            >
              <span className="text-sm font-medium whitespace-nowrap text-bg">
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingMenu;
