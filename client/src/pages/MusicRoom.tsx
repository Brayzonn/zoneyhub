import { useState, useRef, MouseEvent, useEffect } from "react";
import FloatingSideMenu from "../components/common/FloatingMenu";
import MusicGallery from "../components/common/MusicGallery";
import { useAudioPlayer } from "../hooks/useAudioPlayer";

interface CurrentTrack {
  id: string;
  name: string;
  artist: string;
  albumArt?: string;
  audioUrl?: string;
}

const MusicRoom = () => {
  const [isInfoCardOpen, setIsInfoCardOpen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ left: 0, top: 0 });

  const { play, stop, setVolume } = useAudioPlayer({
    onTrackEnd: () => setCurrentTrack(null),
  });

  useEffect(() => {
    setVolume(isSoundOn ? 1 : 0);
  }, [isSoundOn, setVolume]);

  // Center the scroll position on mount
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const canvasWidth = 2400;
    const canvasHeight = 2760;

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

    const preventNavigation = (e: TouchEvent) => {
      if (e.touches.length === 1) e.preventDefault();
    };

    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("touchmove", preventNavigation, {
      passive: false,
    });
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("touchmove", preventNavigation);
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

  const handleSoundToggle = () => {
    setIsSoundOn((prev) => !prev);
  };

  const handleTrackPlay = (track: CurrentTrack) => {
    if (track.audioUrl) {
      play(track.audioUrl);
    }
    setCurrentTrack(track);
  };

  const handleTrackStop = () => {
    stop();
    setCurrentTrack(null);
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
        <div className="relative w-[2400px] h-[2760px]">
          <MatTexture />

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
      <div className="fixed z-20 bottom-0 left-1/2 -translate-x-1/2 pb-4">
        <FloatingSideMenu
          onInfoClick={() => setIsInfoCardOpen(!isInfoCardOpen)}
          isInfoOpen={isInfoCardOpen}
          isSoundOn={isSoundOn}
          onSoundToggle={handleSoundToggle}
          currentTrack={currentTrack}
          onStopTrack={handleTrackStop}
        />
      </div>
    </div>
  );
};

const MatTexture = () => (
  <div
    id="mat-texture"
    className="absolute overflow-hidden rounded-lg border-4 border-[#94BDE6] bg-[#2A6DB0] w-full h-full shadow-lg"
    style={{
      backgroundImage: `
        linear-gradient(to right, rgb(255 255 255 / 0.12) 1px, transparent 1px),
        linear-gradient(to bottom, rgb(255 255 255 / 0.12) 1px, transparent 1px),
        linear-gradient(to right, rgb(255 255 255 / 0.18) 1px, transparent 1px),
        linear-gradient(to bottom, rgb(255 255 255 / 0.18) 1px, transparent 1px),
        linear-gradient(
          45deg,
          transparent 0,
          transparent calc(50% - 0.5px),
          rgb(255 255 255 / 0.18) calc(50% - 0.5px),
          rgb(255 255 255 / 0.18) calc(50% + 0.5px),
          transparent calc(50% + 0.5px),
          transparent 100%
        ),
        linear-gradient(
          -45deg,
          transparent 0,
          transparent calc(50% - 0.5px),
          rgb(255 255 255 / 0.18) calc(50% - 0.5px),
          rgb(255 255 255 / 0.18) calc(50% + 0.5px),
          transparent calc(50% + 0.5px),
          transparent 100%
        )
      `,
      backgroundSize:
        "16px 16px, 16px 16px, 80px 80px, 80px 80px, 80px 80px, 80px 80px",
      backgroundPosition: "0 0, 0 0, 0 0, 0 0, 0 0, 0 0",
    }}
  >
    <div
      id="window"
      className="z-10 opacity-60 absolute w-full h-full bg-cover bg-[url(/about-me/Layer-window.png)]"
    />
  </div>
);

export default MusicRoom;
