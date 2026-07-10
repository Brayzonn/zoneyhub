import { motion } from "framer-motion";
import { useState } from "react";
import ScrambleWord from "./ScrambleWord";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleSettled = () => {
    setTimeout(() => {
      setIsFadingOut(true);
      if (onComplete) {
        setTimeout(onComplete, 400);
      }
    }, 200);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-bg"
      initial={{ opacity: 1 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative px-4">
        <ScrambleWord
          word="ZONEYHUB"
          ticks={6}
          settleDelayMs={300}
          closeMs={200}
          riseFrom={20}
          className="gap-1 ssm:gap-1.5 st:gap-2 text-2xl ssm:text-3xl st:text-4xl tracking-wide overflow-hidden"
          charClassName="w-[20px] ssm:w-[28px] st:w-[40px]"
          onSettled={handleSettled}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
