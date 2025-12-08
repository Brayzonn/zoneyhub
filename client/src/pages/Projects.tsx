import { useState } from "react";
import FloatingMenu from "../components/common/FloatingMenu";
import { useTheme } from "../hooks/useTheme";
import ProjectsComponent from "../components/ProjectsComponent";

const Projects = () => {
  const [isSoundOn, setIsSoundOn] = useState(true);

  const handleSoundToggle = () => {
    setIsSoundOn((prev) => !prev);
  };

  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="relative bg-[var(--color-primary-bg-color)] text-[var(--color-primary-text-color)] min-h-screen w-full overflow-hidden">
      {/* Navigation Menu */}
      <div className="fixed z-20 bottom-0 left-1/2 -translate-x-1/2 pb-4">
        <FloatingMenu
          isSoundOn={isSoundOn}
          onSoundToggle={handleSoundToggle}
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
