import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  isDark?: boolean;
  onComplete?: () => void;
}

interface CharDisplay {
  id: string;
  char: string;
  position: number;
}

const LoadingScreen = ({ isDark = false, onComplete }: LoadingScreenProps) => {
  const targetWord = "ZONEYHUB";
  const [displayChars, setDisplayChars] = useState<CharDisplay[]>(
    Array(targetWord.length)
      .fill("")
      .map((_, i) => ({ id: `char-${i}`, char: "", position: i }))
  );
  const [isAnimating, setIsAnimating] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const randomChars = "国家間に友好関係の人間は人間が暴政と";

  useEffect(() => {
    let iterations = 0;
    const maxIterations = 12;

    const interval = setInterval(() => {
      if (iterations < maxIterations) {
        setDisplayChars(
          Array(targetWord.length)
            .fill("")
            .map((_, i) => ({
              id: `char-${i}`,
              char: randomChars[Math.floor(Math.random() * randomChars.length)],
              position: i,
            }))
        );
        iterations++;
      } else {
        setDisplayChars(
          targetWord.split("").map((char, i) => ({
            id: `char-${i}`,
            char,
            position: i,
          }))
        );
        setIsAnimating(false);
        clearInterval(interval);

        const blinkDuration = 200;
        const bounceDuration = 600;

        setTimeout(() => {
          setIsClosing(true);

          setTimeout(() => {
            setIsClosing(false);

            setTimeout(() => {
              setIsFadingOut(true);
              if (onComplete) {
                setTimeout(onComplete, 800);
              }
            }, 500);
          }, 400);
        }, blinkDuration + bounceDuration);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [targetWord, onComplete]);

  return (
    <motion.div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${
        isDark ? "bg-[#0f1115]" : "bg-[#f5f5f5]"
      }`}
      initial={{ opacity: 1 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: 1 }}
    >
      <div className="relative">
        <div className="flex gap-2   text-4xl font-extrabold tracking-wide overflow-hidden">
          {displayChars.map((charObj) => (
            <motion.span
              key={charObj.id}
              className={` inline-block w-[40px] no-underline relative ${
                !isAnimating
                  ? isDark
                    ? "text-black"
                    : "text-black"
                  : isDark
                  ? "text-gray-600"
                  : "text-gray-400"
              }`}
              initial={{ opacity: 0, y: 20 }}
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
                  : { duration: 0.2, delay: charObj.position * 0.05 },
                y: { duration: 0.2, delay: charObj.position * 0.05 },
              }}
            >
              {charObj.char || ""}

              {/* TV turn-off effect - top half */}
              <motion.div
                className={`absolute inset-0 ${
                  isDark ? "bg-[#0f1115]" : "bg-[#f5f5f5]"
                } origin-top`}
                initial={{ scaleY: 0 }}
                animate={{
                  scaleY: isClosing ? 0.5 : 0,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
              />

              {/* TV turn-off effect - bottom half */}
              <motion.div
                className={`absolute inset-0 ${
                  isDark ? "bg-[#0f1115]" : "bg-[#f5f5f5]"
                } origin-bottom`}
                initial={{ scaleY: 0 }}
                animate={{
                  scaleY: isClosing ? 0.5 : 0,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
              />
            </motion.span>
          ))}
        </div>

        {/* Glitch effect overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: isAnimating ? [0, 0.1, 0] : 0,
          }}
          transition={{
            duration: 0.15,
            repeat: isAnimating ? Infinity : 0,
            repeatDelay: 0.8,
          }}
        >
          <div
            className={`w-full h-full ${
              isDark ? "bg-white" : "bg-black"
            } mix-blend-screen`}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
