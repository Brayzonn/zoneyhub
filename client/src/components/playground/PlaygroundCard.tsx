import { useState, useRef, useEffect, ReactNode, MouseEvent } from "react";
import { motion } from "framer-motion";
import { IntroFace, PaletteFace, DoodleFace } from "./CardFaces";

/* Stack slots front-to-back */
const cardSlots = [
  { y: 0, scale: 1, opacity: 1, z: 100 },
  { y: 16, scale: 0.97, opacity: 1, z: 90 },
  { y: 34, scale: 0.94, opacity: 0.9, z: 80 },
];

/* Card stack: deal-in on mount; the front card tucks under on click */
const PlaygroundCard = ({ children }: { children?: ReactNode }) => {
  const [stack, setStack] = useState(["intro", "two", "three"]);
  const [tuckingId, setTuckingId] = useState<string | null>(null);
  const [hasFlipped, setHasFlipped] = useState(false);
  const [outId, setOutId] = useState<string | null>(null);
  const outTimer = useRef<number | undefined>(undefined);
  const pressPos = useRef({ x: 0, y: 0 });

  useEffect(() => () => window.clearTimeout(outTimer.current), []);

  const faces = [
    { id: "intro", node: <IntroFace /> },
    { id: "two", node: <PaletteFace /> },
    { id: "three", node: <DoodleFace /> },
  ];

  // Canvas pans on mousedown too — only cycle when the pointer didn't drag
  const handlePress = (e: MouseEvent<HTMLDivElement>) => {
    pressPos.current = { x: e.clientX, y: e.clientY };
  };
  const handleCycle = (e: MouseEvent<HTMLDivElement>) => {
    const moved = Math.hypot(
      e.clientX - pressPos.current.x,
      e.clientY - pressPos.current.y,
    );
    if (moved >= 5) return;
    setHasFlipped(true);
    setTuckingId(stack[0]);
    setOutId(stack[0]);
    window.clearTimeout(outTimer.current);
    outTimer.current = window.setTimeout(() => setOutId(null), 500);
    setStack(([front, ...rest]) => [...rest, front]);
  };

  return (
    <main className="relative z-10 w-full max-w-2xl px-6 sm:px-16 font-mono">
      <div className="group relative w-full aspect-[4/3] [perspective:1000px]">
        {faces.map(({ id, node }) => {
          const position = stack.indexOf(id);
          const slot = cardSlots[position];
          const isFront = position === 0;
          const isTucking = tuckingId === id;

          return (
            <motion.div
              key={id}
              onMouseDown={isFront ? handlePress : undefined}
              onClick={isFront ? handleCycle : undefined}
              onAnimationComplete={
                isTucking ? () => setTuckingId(null) : undefined
              }
              style={{ zIndex: outId === id ? 115 : slot.z }}
              initial={{ x: 0, y: 0, scale: 1, opacity: 0 }}
              animate={
                isTucking
                  ? {
                      x: ["0%", "110%", "0%"],
                      y: [0, -16, slot.y],
                      scale: [1, 1.07, slot.scale],
                      rotateY: [0, -8, 0],
                      rotate: [0, 3, 0],
                      opacity: [1, 1, 1],
                      boxShadow: [
                        "0px 0px 0px rgba(0,0,0,0)",
                        "-14px 22px 44px rgba(0,0,0,0.3)",
                        "0px 0px 0px rgba(0,0,0,0)",
                      ],
                    }
                  : {
                      x: "0%",
                      y: slot.y,
                      rotate: 0,
                      rotateY: 0,
                      scale: slot.scale,
                      opacity: slot.opacity,
                    }
              }
              transition={
                isTucking
                  ? {
                      duration: 1.1,
                      ease: "easeInOut",
                      times: [0, 0.4, 1],
                    }
                  : {
                      type: "spring",
                      stiffness: 220,
                      damping: 24,
                      delay: 0.45 + position * 0.05,
                    }
              }
              className={`absolute inset-0 rounded-[clamp(1.25rem,6cqw,2rem)] border-2 border-ink bg-bg overflow-hidden [container-type:size] origin-bottom transition-colors duration-300${
                isFront ? " cursor-pointer" : ""
              }`}
            >
              {node}
              {/* Face-down cover */}
              <motion.div
                className="absolute inset-0 bg-bg pointer-events-none transition-colors duration-300"
                initial={false}
                animate={{ x: isFront ? "110%" : "0%" }}
                transition={
                  isFront
                    ? { duration: 0.45, ease: "easeInOut" }
                    : { duration: 0.35, ease: "easeInOut", delay: 1.1 }
                }
              />
            </motion.div>
          );
        })}

        {/* Tap-to-flip hint */}
        <motion.div
          className="absolute right-[2%] -bottom-[13%] z-[106] flex items-start gap-1 pointer-events-none select-none"
          initial={{ opacity: 0 }}
          animate={
            hasFlipped ? { opacity: 0, y: 6 } : { opacity: 1, y: [0, -5, 0] }
          }
          transition={
            hasFlipped
              ? { duration: 0.35 }
              : {
                  opacity: { delay: 1.2, duration: 0.4 },
                  y: {
                    delay: 1.2,
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
        >
          <svg
            width="34"
            height="32"
            viewBox="0 0 34 32"
            aria-hidden="true"
            className="mt-[-14px]"
          >
            <path
              d="M30 28 C22 26 11 18 7 7"
              fill="none"
              stroke="#e8734a"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M2 14 L7 5 L16 7"
              fill="none"
              stroke="#e8734a"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="inline-block rotate-[-4deg] px-3 py-1 bg-[#f2c94c]/90 text-[#111] font-mono font-bold uppercase tracking-[0.18em] text-[0.65rem] [clip-path:polygon(2%_6%,98%_0,100%_94%,0_100%)]">
            tap to flip
          </span>
        </motion.div>

        {children}
      </div>
    </main>
  );
};

export default PlaygroundCard;
