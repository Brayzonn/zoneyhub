import { useState, useEffect, ReactNode } from "react";
import FloatingMenu from "./common/FloatingMenu";
import MatTexture from "./common/MatTexture";
import { useGlobalAudio } from "../hooks/useGlobalAudio";
import { useSound } from "../hooks/useSound";

interface PageLayoutProps {
  children: ReactNode;
  /** Vertical alignment of the page content within <main>. */
  align?: "center" | "start";
}

/**
 * Shared page shell: matte-textured background, centered content area, and the
 * fixed floating navigation menu wired to the sound/audio contexts. Keeps the
 * sound-on → volume behaviour in one place so pages only provide their content.
 */
const PageLayout = ({ children, align = "center" }: PageLayoutProps) => {
  const { isSoundOn, toggleSound } = useSound();
  const { stop, currentTrack, setVolume } = useGlobalAudio();
  const [isInfoCardOpen, setIsInfoCardOpen] = useState(false);

  useEffect(() => {
    setVolume(isSoundOn ? 1 : 0);
  }, [isSoundOn, setVolume]);

  return (
    <div className="relative bg-[var(--color-primary-bg-color)] text-[var(--color-primary-text-color)] min-h-screen w-full">
      <MatTexture />

      <main
        className={`px-3 py-[5rem] relative min-h-screen w-full flex justify-center z-10 ${
          align === "start" ? "items-start" : "items-center"
        }`}
      >
        {children}
      </main>

      <div className="fixed z-20 top-2 left-1/2 -translate-x-1/2">
        <FloatingMenu
          onInfoClick={() => setIsInfoCardOpen(!isInfoCardOpen)}
          isInfoOpen={isInfoCardOpen}
          isSoundOn={isSoundOn}
          onSoundToggle={toggleSound}
          currentTrack={currentTrack}
          onStopTrack={stop}
        />
      </div>
    </div>
  );
};

export default PageLayout;
