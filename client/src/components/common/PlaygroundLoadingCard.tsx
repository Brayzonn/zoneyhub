import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ScrambleWord from "./ScrambleWord";

const PlaygroundLoadingCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-[200px] h-[200px] rounded-lg overflow-hidden border-2 bg-bg border-ink/30 transition-colors duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence mode="wait">
        {isHovered ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center px-2 bg-bg"
          >
            <ScrambleWord
              word="BRAY"
              ticks={12}
              settleDelayMs={800}
              closeMs={400}
              riseFrom={5}
              className="gap-0.5 text-sm tracking-tight"
              charClassName="w-[12px]"
            />
          </motion.div>
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
              <p className="text-sm font-medium text-ink">Loading Animation</p>
              <p className="text-xs text-ink-muted">Hover to preview</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PlaygroundLoadingCard;
