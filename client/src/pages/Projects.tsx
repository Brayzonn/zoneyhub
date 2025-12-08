import { useEffect, useState } from "react";
import FloatingMenu from "../components/common/FloatingMenu";
import { useTheme } from "../hooks/useTheme";
import ProjectsComponent from "../components/ProjectsComponent";
import { useGlobalAudio } from "../hooks/useGlobalAudio";
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
    <div className="relative bg-[var(--color-primary-bg-color)] text-[var(--color-primary-text-color)] min-h-screen w-full overflow-hidden">
      {/* Navigation Menu */}
      <div className="fixed z-20 bottom-0 left-1/2 -translate-x-1/2 pb-4">
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

      <main className="px-3 py-[2rem] relative min-h-screen w-full flex flex-col  z-10">
        <ProjectsComponent isDark={isDarkMode} />
      </main>
    </div>
  );
};

export default Projects;
