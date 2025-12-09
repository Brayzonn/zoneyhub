import { useRef, useCallback, useEffect } from "react";

interface UseSoundEffectsProps {
  isSoundOn: boolean;
}

export const useSoundEffects = ({ isSoundOn }: UseSoundEffectsProps) => {
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/sounds/click.wav");
    audio.preload = "auto";
    audio.load();
    clickSoundRef.current = audio;

    return () => {
      clickSoundRef.current = null;
    };
  }, []);

  const playClick = useCallback(() => {
    if (!isSoundOn) return;

    const audio = clickSoundRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch((err) => console.error("Sound play failed:", err));
  }, [isSoundOn]);

  return { playClick };
};
