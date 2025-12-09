import { useState, useRef, MouseEvent, useEffect } from "react";
import FloatingMenu from "../components/common/FloatingMenu";
import MusicGallery from "../components/common/MusicGallery";
import { useGlobalAudio } from "../hooks/useGlobalAudio";
import { useTheme } from "../hooks/useTheme";
import MatTexture from "../components/common/MatTexture";
import { useSound } from "../hooks/useSound";

const Playground = () => {
  const [isInfoCardOpen, setIsInfoCardOpen] = useState(false);
  const { isSoundOn, toggleSound } = useSound();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ left: 0, top: 0 });

  const { play, stop, setVolume, currentTrack } = useGlobalAudio();
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    setVolume(isSoundOn ? 1 : 0);
  }, [isSoundOn, setVolume]);

  const handleTrackPlay = (track: {
    id: string;
    name: string;
    artist: string;
    albumArt?: string;
    audioUrl: string;
  }) => {
    play(track);
  };

  const handleTrackStop = () => {
    stop();
  };

  // Center the scroll position on mount
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const canvasWidth = 2400;
    const canvasHeight = 2400;

    const centerX = (canvasWidth - container.clientWidth) / 2;
    const centerY = (canvasHeight - container.clientHeight) / 2;

    container.scrollLeft = centerX;
    container.scrollTop = centerY;
  }, []);

  // Prevent browser zoom and navigation gestures
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) e.preventDefault();
    };

    const handleKeydown = (e: KeyboardEvent) => {
      const isZoomKey = ["=", "-", "0", "+"].includes(e.key);
      if ((e.ctrlKey || e.metaKey) && isZoomKey) e.preventDefault();
    };

    const preventPinchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };

    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("touchmove", preventPinchZoom, {
      passive: false,
    });
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("touchmove", preventPinchZoom);
      document.body.style.overscrollBehavior = "auto";
    };
  }, []);

  const updateCursor = (cursor: "grab" | "grabbing") => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = cursor;
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setIsDragging(true);
    setDragStart({
      x: e.pageX - container.offsetLeft,
      y: e.pageY - container.offsetTop,
    });
    setScrollStart({
      left: container.scrollLeft,
      top: container.scrollTop,
    });
    updateCursor("grabbing");
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();

    const container = scrollContainerRef.current;
    const x = e.pageX - container.offsetLeft;
    const y = e.pageY - container.offsetTop;
    const DRAG_MULTIPLIER = 1.5;

    container.scrollLeft =
      scrollStart.left - (x - dragStart.x) * DRAG_MULTIPLIER;
    container.scrollTop = scrollStart.top - (y - dragStart.y) * DRAG_MULTIPLIER;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    updateCursor("grab");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-surface-bg">
      <div
        ref={scrollContainerRef}
        className="absolute inset-0 overflow-auto cursor-grab scrollbar-hide"
        onMouseDown={handleMouseDown}
        onMouseUp={handleDragEnd}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleDragEnd}
        role="presentation"
        style={{
          overscrollBehaviorX: "none",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="relative w-[2400px] h-[2400px]">
          <MatTexture isDark={isDarkMode} />

          {/* Canvas Border */}
          <div className="pointer-events-none absolute inset-0 z-30">
            {/* Top border */}
            <div className="absolute top-0 left-0 right-0 h-[5px] bg-sky-200" />

            {/* Bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-sky-200" />

            {/* Left border */}
            <div className="absolute top-0 left-0 bottom-0 w-[5px] bg-sky-200" />

            {/* Right border */}
            <div className="absolute top-0 right-0 bottom-0 w-[5px] bg-sky-200" />
          </div>

          {/* Playground Header  */}
          <PlaygroundHeader isDark={isDarkMode} />

          <div className="relative z-10 flex h-full">
            <MusicGallery
              playingTrackId={currentTrack?.id ?? null}
              onTrackPlay={handleTrackPlay}
              onTrackStop={handleTrackStop}
            />
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="fixed z-20 top-2 left-1/2 -translate-x-1/2 ">
        <FloatingMenu
          onInfoClick={() => setIsInfoCardOpen(!isInfoCardOpen)}
          isInfoOpen={isInfoCardOpen}
          isSoundOn={isSoundOn}
          onSoundToggle={toggleSound}
          currentTrack={currentTrack}
          onStopTrack={handleTrackStop}
          isDark={isDarkMode}
          onThemeToggle={toggleTheme}
        />
      </div>
    </div>
  );
};

const PlaygroundHeader = ({ isDark }: { isDark: boolean }) => (
  <div
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
    style={{ position: "absolute" }}
  >
    <div
      className={`select-none flex flex-col gap-3 sm:gap-4 rounded-lg w-[calc(100vw-32px)] max-w-[400px] sm:max-w-[480px] shadow-lg p-5 sm:p-6 transition-colors duration-300 ${
        isDark
          ? "bg-white border border-gray-200"
          : "bg-[#121418] border border-[#2a2d35]"
      }`}
    >
      {/* Header Row */}
      <div className="flex gap-3 items-center">
        {/* Icon/Logo */}
        <div
          className={`size-10 sm:size-12 rounded-lg flex items-center justify-center ${
            isDark ? "bg-gray-100" : "bg-[#1f2228]"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isDark ? "text-gray-700" : "text-gray-300"}
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </div>

        {/* Title & Subtitle */}
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-2">
            <h1
              className={`text-base   ${
                isDark ? "text-gray-900" : "text-white"
              }`}
            >
              Playground
            </h1>
            <div
              className={`w-2 h-2 rounded-full animate-pulse ${
                isDark ? "bg-green-500" : "bg-green-400"
              }`}
            />
          </div>
          <p
            className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            Micro components & explorations
          </p>
        </div>
      </div>

      {/* Divider */}
      <div
        className={`h-[1px] w-full ${
          isDark
            ? "border-t border-dashed border-gray-200"
            : "border-t border-dashed border-[#2a2d35]"
        }`}
      />

      {/* Description */}
      <p
        className={`text-sm leading-relaxed ${
          isDark ? "text-gray-600" : "text-gray-400"
        }`}
      >
        A space where I keep my <em>UI experiments</em>, interaction studies,
        and design system components. Drag to explore the canvas.
      </p>

      {/* Tags/Badges */}
      <div className="flex flex-wrap gap-2">
        {["Components", "Animations", "Interactions"].map((tag) => (
          <span
            key={tag}
            className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${
              isDark
                ? "bg-gray-100 text-gray-600 border border-gray-200"
                : "bg-[#1f2228] text-gray-400 border border-[#2a2d35]"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default Playground;
