import FloatingMenu from "../components/common/FloatingMenu";
import MatTexture from "../components/common/MatTexture";
import ProjectsComponent from "../components/ProjectsComponent";
import { useGlobalAudio } from "../hooks/useGlobalAudio";
import { useTheme } from "../hooks/useTheme";
import { useState, useEffect } from "react";
import { useSound } from "../hooks/useSound";

const Projects = () => {
  const { isSoundOn, toggleSound } = useSound();
  const [isInfoCardOpen, setIsInfoCardOpen] = useState(false);

  const { stop, currentTrack, setVolume } = useGlobalAudio();
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    setVolume(isSoundOn ? 1 : 0);
  }, [isSoundOn, setVolume]);

  const handleTrackStop = () => {
    stop();
  };

  return (
    <div className="relative bg-[var(--color-primary-bg-color)] text-[var(--color-primary-text-color)] min-h-screen w-full ">
      <MatTexture isDark={isDarkMode} />

      <main className="px-3 py-[8rem] relative min-h-screen w-full flex justify-center items-center z-10">
        <ProjectsComponent isDark={isDarkMode} />
      </main>

      {/* Navigation Menu */}
      <div className="fixed z-20 bottom-0 left-1/2 -translate-x-1/2 pb-2">
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
    </div>
  );
};

export default Projects;
