import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const SCRAMBLE_CHARS = "国家間に友好関係の人間は人間が暴政と";
const TICK_MS = 50;

interface ScrambleWordProps {
  word: string;
  /** Scramble frames shown before the word settles. */
  ticks: number;
  /** Pause between the word settling and the shutter close. */
  settleDelayMs: number;
  /** How long the shutters stay closed before reopening. */
  closeMs: number;
  /** Distance each char rises from on entry. */
  riseFrom: number;
  /** Char row: gap, text size, tracking. */
  className?: string;
  /** Per-char box width. */
  charClassName?: string;
  /** Called once the shutters have reopened. */
  onSettled?: () => void;
}

/* Letter scramble that settles into a word, blinks, then shutter-wipes */
const ScrambleWord = ({
  word,
  ticks,
  settleDelayMs,
  closeMs,
  riseFrom,
  className = "",
  charClassName = "",
  onSettled,
}: ScrambleWordProps) => {
  const [chars, setChars] = useState(() =>
    Array.from({ length: word.length }, (_, i) => ({
      id: `char-${i}`,
      char: "",
    })),
  );
  const [isAnimating, setIsAnimating] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    let elapsed = 0;

    const interval = setInterval(() => {
      if (elapsed < ticks) {
        setChars((prev) =>
          prev.map(({ id }) => ({
            id,
            char: SCRAMBLE_CHARS[
              Math.floor(Math.random() * SCRAMBLE_CHARS.length)
            ],
          })),
        );
        elapsed++;
      } else {
        setChars(word.split("").map((char, i) => ({ id: `char-${i}`, char })));
        setIsAnimating(false);
        clearInterval(interval);

        timersRef.current.push(
          window.setTimeout(() => {
            setIsClosing(true);
            timersRef.current.push(
              window.setTimeout(() => {
                setIsClosing(false);
                onSettled?.();
              }, closeMs),
            );
          }, settleDelayMs),
        );
      }
    }, TICK_MS);

    const timers = timersRef.current;
    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={`flex font-extrabold overflow-hidden ${className}`}>
        {chars.map(({ id, char }, i) => (
          <motion.span
            key={id}
            className={`inline-block relative text-center ${
              !isAnimating ? "text-ink" : "text-ink-muted"
            } ${charClassName}`}
            initial={{ opacity: 0, y: riseFrom }}
            animate={{
              opacity: !isAnimating ? [1, 0, 1, 0, 1] : 1,
              y: 0,
            }}
            transition={{
              opacity: !isAnimating
                ? {
                    duration: 0.2,
                    times: [0, 0.25, 0.5, 0.75, 1],
                    ease: "linear",
                    delay: 0,
                  }
                : { duration: 0.2, delay: i * 0.05 },
              y: { duration: 0.2, delay: i * 0.05 },
            }}
          >
            {char || ""}

            <motion.div
              className="absolute inset-0 bg-bg origin-top"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: isClosing ? 0.5 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute inset-0 bg-bg origin-bottom"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: isClosing ? 0.5 : 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </motion.span>
        ))}
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: isAnimating ? [0, 0.1, 0] : 0 }}
        transition={{
          duration: 0.15,
          repeat: isAnimating ? Infinity : 0,
          repeatDelay: 0.8,
        }}
      >
        <div className="w-full h-full bg-white mix-blend-screen" />
      </motion.div>
    </>
  );
};

export default ScrambleWord;
