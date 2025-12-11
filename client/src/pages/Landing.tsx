import FloatingMenu from "../components/common/FloatingMenu";
import MatTexture from "../components/common/MatTexture";
import Hero from "../components/Hero";
import LoadingScreen from "../components/common/LoadingScreen";
import { useGlobalAudio } from "../hooks/useGlobalAudio";
import { useTheme } from "../hooks/useTheme";
import { useState, useEffect } from "react";
import { useSound } from "../hooks/useSound";
import { motion, AnimatePresence } from "framer-motion";

const Landing = () => {
  const { isSoundOn, toggleSound } = useSound();
  const [isInfoCardOpen, setIsInfoCardOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const { stop, currentTrack, setVolume } = useGlobalAudio();
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    setVolume(isSoundOn ? 1 : 0);
  }, [isSoundOn, setVolume]);

  const handleTrackStop = () => {
    stop();
  };

  const handleLoadingComplete = () => {
    setIsPageLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isPageLoading ? (
          <LoadingScreen
            isDark={isDarkMode}
            onComplete={handleLoadingComplete}
          />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative bg-[var(--color-primary-bg-color)] text-[var(--color-primary-text-color)] min-h-screen w-full"
          >
            <MatTexture isDark={isDarkMode} />

            <main className="px-3 py-[5rem] relative min-h-screen w-full flex justify-center items-center z-10">
              <Hero isDark={isDarkMode} />
            </main>

            {/* Navigation Menu*/}
            <div className="fixed z-50 top-2 left-1/2 -translate-x-1/2">
              <FloatingMenu
                onInfoClick={() => setIsInfoCardOpen(!isInfoCardOpen)}
                isInfoOpen={isInfoCardOpen}
                isSoundOn={isSoundOn}
                onSoundToggle={toggleSound}
                currentTrack={currentTrack}
                onStopTrack={handleTrackStop}
                isDark={isDarkMode}
                onThemeToggle={toggleTheme}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Landing;
