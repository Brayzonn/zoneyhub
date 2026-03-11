import FloatingMenu from "../components/common/FloatingMenu";
import MatTexture from "../components/common/MatTexture";
import BlogComponent from "../components/BlogComponent";
import { useGlobalAudio } from "../hooks/useGlobalAudio";
import { useTheme } from "../hooks/useTheme";
import { useState, useEffect } from "react";
import { useSound } from "../hooks/useSound";

const Blog = () => {
  const { isSoundOn, toggleSound } = useSound();
  const [isInfoCardOpen, setIsInfoCardOpen] = useState(false);

  const { stop, currentTrack, setVolume } = useGlobalAudio();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    setVolume(isSoundOn ? 1 : 0);
  }, [isSoundOn, setVolume]);

  const handleTrackStop = () => {
    stop();
  };

  return (
    <div className="relative bg-[var(--color-primary-bg-color)] text-[var(--color-primary-text-color)] min-h-screen w-full">
      <MatTexture isDark={isDarkMode} />

      <main className="px-3 py-[5rem] relative min-h-screen w-full flex justify-center items-center z-10">
        <BlogComponent isDark={isDarkMode} />
      </main>

      {/* Navigation Menu */}
      <div className="fixed z-20 top-2 left-1/2 -translate-x-1/2">
        <FloatingMenu
          onInfoClick={() => setIsInfoCardOpen(!isInfoCardOpen)}
          isInfoOpen={isInfoCardOpen}
          isSoundOn={isSoundOn}
          onSoundToggle={toggleSound}
          currentTrack={currentTrack}
          onStopTrack={handleTrackStop}
        />
      </div>
    </div>
  );
};

export default Blog;
