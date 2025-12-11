import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface PlaygroundLoadingCardProps {
  isDark: boolean;
}

const PlaygroundLoadingCard = ({ isDark }: PlaygroundLoadingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative w-[200px] h-[200px] rounded-lg overflow-hidden border ${
        isDark ? "bg-white border-gray-200" : "bg-[#121418] border-[#2a2d35]"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence mode="wait">
        {isHovered ? (
          <MiniLoadingScreen key="loading" isDark={isDark} />
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center h-full"
          >
            <div className="text-center space-y-2">
              <p
                className={`text-sm font-medium ${
                  isDark ? "text-gray-900" : "text-gray-100"
                }`}
              >
                Loading Animation
              </p>
              <p
                className={`text-xs ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Hover to preview
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MiniLoadingScreen = ({ isDark }: { isDark: boolean }) => {
  const targetWord = "WELCOME";
  const [displayChars, setDisplayChars] = useState(
    Array(targetWord.length)
      .fill("")
      .map((_, i) => ({ id: `char-${i}`, char: "", position: i }))
  );
  const [isAnimating, setIsAnimating] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

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
          }, 400);
        }, blinkDuration + bounceDuration);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`absolute inset-0 flex items-center justify-center px-2 ${
        isDark ? "bg-[#f5f5f5]" : "bg-[#0f1115]"
      }`}
    >
      <div className="flex gap-0.5 text-sm font-extrabold tracking-tight">
        {displayChars.map((charObj) => (
          <motion.span
            key={charObj.id}
            className={`inline-block w-[12px] relative text-center ${
              !isAnimating
                ? isDark
                  ? "text-black"
                  : "text-white"
                : isDark
                ? "text-gray-600"
                : "text-gray-400"
            }`}
            initial={{ opacity: 0, y: 5 }}
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

            <motion.div
              className={`absolute inset-0 ${
                isDark ? "bg-[#f5f5f5]" : "bg-[#0f1115]"
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

            <motion.div
              className={`absolute inset-0 ${
                isDark ? "bg-[#f5f5f5]" : "bg-[#0f1115]"
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
            isDark ? "bg-black" : "bg-white"
          } mix-blend-screen`}
        />
      </motion.div>
    </motion.div>
  );
};

export default PlaygroundLoadingCard;
