import { useState, useRef, useEffect, ReactNode, MouseEvent } from "react";
import { motion } from "framer-motion";
import FloatingMenu from "../components/common/FloatingMenu";
import MatTexture from "../components/common/MatTexture";
import VinylDisc from "../components/common/VinylDisc";
import PlaygroundLoadingCard from "../components/common/PlaygroundLoadingCard";
import { useGlobalAudio } from "../hooks/useGlobalAudio";
import { useSound } from "../hooks/useSound";
import { tracks, type Track } from "../data/tracks";

/* Resting spots (% of the card box): vinyls out on the canvas, art on the card edges */
const vinylSpots = [
  { left: "-38%", top: "-8%", rotation: -12 },
  { left: "136%", top: "-2%", rotation: 8 },
  { left: "-40%", top: "74%", rotation: -6 },
  { left: "139%", top: "80%", rotation: 14 },
  { left: "18%", top: "145%", rotation: 6 },
];
const loadingCardSpot = { left: "80%", top: "140%", rotation: -5 };

/* Decorative sticker art + resting spots */
const TapeSticker = () => (
  <div className="inline-block px-[3cqw] py-[1.2cqw] bg-[#e8b04b]/90 text-[#111] font-mono font-bold uppercase tracking-[0.22em] text-[clamp(0.8rem,4.5cqw,1.6rem)] [clip-path:polygon(2%_0,98%_4%,100%_96%,0_100%)]">
    playground
  </div>
);

const SmileySticker = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
    <circle
      cx="36"
      cy="36"
      r="33"
      fill="#f2c94c"
      stroke="#111"
      strokeWidth="3"
    />
    <circle cx="25" cy="30" r="4" fill="#111" />
    <circle cx="47" cy="30" r="4" fill="#111" />
    <path
      d="M22 44 Q36 56 50 44"
      fill="none"
      stroke="#111"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const ArrowSticker = () => (
  <svg width="96" height="60" viewBox="0 0 96 60" aria-hidden="true">
    <path
      d="M6 48 C30 44 52 36 82 14"
      fill="none"
      stroke="#e8734a"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M84 30 L84 10 L64 12"
      fill="none"
      stroke="#e8734a"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StarSticker = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
    <path
      d="M32 3 L39 23 L60 23 L43 36 L50 57 L32 44 L14 57 L21 36 L4 23 L25 23 Z"
      fill="#7bc47f"
      stroke="#111"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
  </svg>
);

const BoltSticker = () => (
  <svg width="56" height="72" viewBox="0 0 56 72" aria-hidden="true">
    <path
      d="M32 4 L10 40 L24 40 L18 68 L46 28 L30 28 Z"
      fill="#e8b04b"
      stroke="#111"
      strokeWidth="3"
      strokeLinejoin="round"
    />
  </svg>
);

const SquiggleSticker = () => (
  <svg width="96" height="32" viewBox="0 0 96 32" aria-hidden="true">
    <path
      d="M4 16 C10 4 18 4 24 16 S38 28 44 16 S58 4 64 16 S78 28 84 16"
      fill="none"
      stroke="#5aa9e6"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

const NoteSticker = () => (
  <svg width="56" height="64" viewBox="0 0 56 64" aria-hidden="true">
    <polygon
      points="21,13 47,7 47,15 21,21"
      fill="#e8734a"
      stroke="#111"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <line x1="21" y1="50" x2="21" y2="13" stroke="#111" strokeWidth="3" />
    <line x1="47" y1="44" x2="47" y2="7" stroke="#111" strokeWidth="3" />
    <ellipse
      cx="14"
      cy="50"
      rx="8"
      ry="6"
      fill="#e8734a"
      stroke="#111"
      strokeWidth="2.5"
    />
    <ellipse
      cx="40"
      cy="44"
      rx="8"
      ry="6"
      fill="#e8734a"
      stroke="#111"
      strokeWidth="2.5"
    />
  </svg>
);

const artStickers = [
  {
    id: "smiley",
    node: <SmileySticker />,
    left: "76%",
    top: "-4%",
    rotation: 14,
  },
  { id: "arrow", node: <ArrowSticker />, left: "6%", top: "46%", rotation: -6 },
  { id: "star", node: <StarSticker />, left: "56%", top: "101%", rotation: 10 },
  { id: "bolt", node: <BoltSticker />, left: "-16%", top: "24%", rotation: 10 },
  {
    id: "squiggle",
    node: <SquiggleSticker />,
    left: "-8%",
    top: "106%",
    rotation: 6,
  },
  {
    id: "note",
    node: <NoteSticker />,
    left: "116%",
    top: "124%",
    rotation: 12,
  },
];

/* Ghost cards behind the main one — offsets from hey.milo.gg's stack */
const ghostCards = [
  { z: 90, scale: 0.98, y: 10, opacity: 1, blur: 0 },
  { z: 80, scale: 0.96, y: 25, opacity: 0.9, blur: 0 },
  { z: 70, scale: 0.94, y: 45, opacity: 0.8, blur: 1 },
  { z: 60, scale: 0.92, y: 70, opacity: 0.7, blur: 1 },
];

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

/* Static card stack: one real card over blurred ghost offsets */
const PlaygroundCard = ({ children }: { children?: ReactNode }) => (
  <main className="relative z-10 w-full max-w-2xl px-6 sm:px-16 font-mono">
    <div className="relative w-full aspect-[4/3] [perspective:1000px]">
      {ghostCards.map((g) => (
        <div
          key={g.z}
          className="absolute inset-0 rounded-[clamp(1.25rem,6cqw,2rem)] border-2 border-ink/30 bg-bg origin-bottom transition-colors duration-300"
          style={{
            zIndex: g.z,
            transform: `scale(${g.scale}) translateY(${g.y}px)`,
            opacity: g.opacity,
            filter: g.blur ? `blur(${g.blur}px)` : undefined,
          }}
        />
      ))}

      <div className="absolute inset-0 z-[100] rounded-[clamp(1.25rem,6cqw,2rem)] border-2 border-ink bg-bg overflow-hidden [container-type:size] transition-colors duration-300">
        <div className="w-full h-full flex flex-col p-[8cqw] text-ink">
          <div className="flex items-center gap-3 text-[clamp(0.55rem,2.4cqw,0.8rem)] uppercase tracking-[0.14em] text-ink-muted">
            <div className="size-[clamp(1.8rem,7cqw,2.5rem)] rounded-lg border-2 border-ink flex items-center justify-center shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[55%] h-[55%] text-ink"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <span>Micro components &amp; explorations</span>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-[3.5cqw]">
            <div className="flex items-center gap-3">
              <h1 className="m-0 -rotate-2 sticker-cut">
                <TapeSticker />
              </h1>
              <div className="w-2 h-2 rounded-full animate-pulse bg-green-400" />
            </div>
            <p className="m-0 max-w-[38ch] leading-relaxed text-ink-muted text-[clamp(0.7rem,3.2cqw,1rem)]">
              A space where I keep my UI experiments, interaction studies, and
              design system components. Drag the pieces around.
            </p>
          </div>

          <div className="flex flex-wrap gap-[2cqw]">
            {["Components", "Animations", "Interactions"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-ink/40 px-[3cqw] py-[1cqw] text-[clamp(0.5rem,2.2cqw,0.7rem)] uppercase tracking-[0.14em] text-ink-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {children}
    </div>
  </main>
);

/* Movable piece: spring drop-in, momentum-free drag, click-through only
   when the pointer didn't drag */
const Sticker = ({
  spot,
  index,
  constraintsRef,
  children,
}: {
  spot: { left: string; top: string; rotation: number };
  index: number;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) => {
  const dragged = useRef(false);

  const suppressClickAfterDrag = (e: MouseEvent<HTMLDivElement>) => {
    if (dragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      data-sticker
      className="absolute z-[110]"
      style={{
        left: spot.left,
        top: spot.top,
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.15}
        dragConstraints={constraintsRef}
        onDragStart={() => (dragged.current = true)}
        onDragEnd={() => setTimeout(() => (dragged.current = false), 0)}
        onClickCapture={suppressClickAfterDrag}
        initial={{ scale: 2.5, opacity: 0, rotate: spot.rotation }}
        animate={{ scale: 1, opacity: 1, rotate: spot.rotation }}
        whileDrag={{ scale: 1.05, zIndex: 120 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 15,
          delay: 0.15 + index * 0.12,
        }}
        className="cursor-grab active:cursor-grabbing touch-none"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Playground;
