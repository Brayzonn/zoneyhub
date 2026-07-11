import { useState, useRef, useEffect, MouseEvent } from "react";
import FloatingMenu from "../components/common/FloatingMenu";
import MatTexture from "../components/common/MatTexture";
import VinylDisc from "../components/common/VinylDisc";
import PlaygroundLoadingCard from "../components/common/PlaygroundLoadingCard";
import PlaygroundCard from "../components/playground/PlaygroundCard";
import Sticker from "../components/playground/Sticker";
import { artStickers } from "../components/playground/artStickers";
import { useGlobalAudio } from "../hooks/useGlobalAudio";
import { useSound } from "../hooks/useSound";
import { tracks, type Track } from "../data/tracks";

/* Resting spots (% of the card box): vinyls out on the canvas */
const vinylSpots = [
  { left: "-38%", top: "-8%", rotation: -12 },
  { left: "136%", top: "-2%", rotation: 8 },
  { left: "-40%", top: "74%", rotation: -6 },
  { left: "139%", top: "80%", rotation: 14 },
  { left: "18%", top: "145%", rotation: 6 },
];
const loadingCardSpot = { left: "80%", top: "140%", rotation: -5 };

const CANVAS_SIZE = 2400;

const Playground = () => {
  const { isSoundOn, toggleSound } = useSound();
  const { play, stop, currentTrack } = useGlobalAudio();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = useState({ left: 0, top: 0 });

  const handleTrackClick = (track: Track) => {
    if (currentTrack?.id === track.id) {
      stop();
    } else {
      play(track);
    }
  };

  // Center the scroll position on mount
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollLeft = (CANVAS_SIZE - container.clientWidth) / 2;
    container.scrollTop = (CANVAS_SIZE - container.clientHeight) / 2;
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

    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("touchmove", preventPinchZoom);
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
    // Sticker drags shouldn't also pan the canvas
    if ((e.target as HTMLElement).closest("[data-sticker]")) return;

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
    <div className="relative w-full h-dvh overflow-hidden bg-bg transition-colors duration-300">
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
        <div
          ref={canvasRef}
          className="relative border-[5px] border-ink/25 transition-colors duration-300"
          style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
        >
          <MatTexture />

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(42rem,calc(100vw-1rem))]">
            <PlaygroundCard>
              {tracks.map((track, i) => {
                const spot = vinylSpots[i % vinylSpots.length];
                return (
                  <Sticker
                    key={track.id}
                    spot={spot}
                    index={i}
                    constraintsRef={canvasRef}
                    duckWhileCycling
                  >
                    <VinylDisc
                      trackName={track.name}
                      artistName={track.artist}
                      albumArt={track.albumArt}
                      isPlaying={currentTrack?.id === track.id}
                      onClick={() => handleTrackClick(track)}
                      rotation={track.rotation}
                    />
                  </Sticker>
                );
              })}

              <Sticker
                spot={loadingCardSpot}
                index={tracks.length}
                constraintsRef={canvasRef}
              >
                <PlaygroundLoadingCard />
              </Sticker>

              {artStickers.map((art, i) => (
                <Sticker
                  key={art.id}
                  spot={art}
                  index={tracks.length + 1 + i}
                  constraintsRef={canvasRef}
                >
                  <div className="sticker-cut">{art.node}</div>
                </Sticker>
              ))}
            </PlaygroundCard>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="fixed z-[130] top-2 left-1/2 -translate-x-1/2">
        <FloatingMenu
          isSoundOn={isSoundOn}
          onSoundToggle={toggleSound}
          currentTrack={currentTrack}
          onStopTrack={stop}
        />
      </div>
    </div>
  );
};

export default Playground;
