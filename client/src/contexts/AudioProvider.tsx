import { useRef, useState, useEffect, useCallback, ReactNode } from "react";
import { AudioContext, CurrentTrack } from "./AudioContext";
import { useSound } from "../hooks/useSound";

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const { isSoundOn } = useSound();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setCurrentTrack(null);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const play = useCallback((track: CurrentTrack) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = track.audioUrl;
    audio.play().catch(console.error);
    setIsPlaying(true);
    setCurrentTrack(track);
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentTrack(null);
  }, []);

  // The global sound toggle is a true mute: playback (and the track's
  // position) continues silently, so unmuting picks up where the music is.
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.muted = !isSoundOn;
  }, [isSoundOn]);

  return (
    <AudioContext.Provider
      value={{
        play,
        stop,
        isPlaying,
        currentTrack,
        currentTime,
        duration,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
