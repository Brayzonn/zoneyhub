import { useRef, useCallback } from "react";

interface UseSoundEffectsProps {
  isSoundOn: boolean;
}

export const useSoundEffects = ({ isSoundOn }: UseSoundEffectsProps) => {
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  const initAudio = useCallback(() => {
    if (!clickSoundRef.current) {
      clickSoundRef.current = new Audio("/sounds/click.wav");
      clickSoundRef.current.volume = 0.3;
    }
  }, []);

  const playClick = useCallback(() => {
    if (!isSoundOn) return;

    initAudio();

    const audio = clickSoundRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch((err) => console.error("Sound play failed:", err));
  }, [isSoundOn, initAudio]);

  return { playClick };
};
