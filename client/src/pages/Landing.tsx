import FloatingMenu from "../components/common/FloatingMenu";
import MatTexture from "../components/common/MatTexture";
import Hero from "../components/Hero";
import LoadingScreen from "../components/common/LoadingScreen";
import { useGlobalAudio } from "../hooks/useGlobalAudio";
import { useState } from "react";
import { useSound } from "../hooks/useSound";
import { motion, AnimatePresence } from "framer-motion";

const Landing = () => {
  const { isSoundOn, toggleSound } = useSound();
  const [isPageLoading, setIsPageLoading] = useState(() => {
    return !sessionStorage.getItem("hasSeenLoading");
  });

  const { stop, currentTrack } = useGlobalAudio();

  const handleTrackStop = () => {
    stop();
  };

  const handleLoadingComplete = () => {
    sessionStorage.setItem("hasSeenLoading", "true");
    setIsPageLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isPageLoading ? (
          <LoadingScreen
            onComplete={handleLoadingComplete}
          />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative bg-[var(--color-primary-bg-color)] text-[var(--color-primary-text-color)] min-h-svh w-full"
          >
            <MatTexture />

            <main className="px-3 py-[5rem] relative min-h-screen w-full flex justify-center items-center z-10">
              <Hero />
            </main>

            <div className="fixed z-50 top-2 left-1/2 -translate-x-1/2">
              <FloatingMenu
                isSoundOn={isSoundOn}
                onSoundToggle={toggleSound}
                currentTrack={currentTrack}
                onStopTrack={handleTrackStop}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Landing;
