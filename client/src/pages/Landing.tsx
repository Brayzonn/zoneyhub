import FloatingMenu from "../components/common/FloatingMenu";
import MatTexture from "../components/common/MatTexture";
import Hero from "../components/Hero";
import { useTheme } from "../hooks/useTheme";
import { useState } from "react";

const Landing = () => {
  const [isSoundOn, setIsSoundOn] = useState(true);

  const handleSoundToggle = () => {
    setIsSoundOn((prev) => !prev);
  };

  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="relative bg-[var(--color-primary-bg-color)] text-[var(--color-primary-text-color)] min-h-screen w-full overflow-hidden">
      <MatTexture isDark={isDarkMode} />

      {/* Navigation Menu */}
      <div className="fixed z-20 bottom-0 left-1/2 -translate-x-1/2 pb-4">
        <FloatingMenu
          isSoundOn={isSoundOn}
          onSoundToggle={handleSoundToggle}
          isDark={isDarkMode}
          onThemeToggle={toggleTheme}
        />
      </div>

      <main className="px-3 py-[5rem] relative min-h-screen w-full flex justify-center items-center z-10">
        <Hero isDark={isDarkMode} />
      </main>
    </div>
  );
};

export default Landing;
