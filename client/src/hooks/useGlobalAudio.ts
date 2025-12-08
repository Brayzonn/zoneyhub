import { useContext } from "react";
import { AudioContext } from "../contexts/AudioContext";

export const useGlobalAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useGlobalAudio must be used within AudioProvider");
  }
  return context;
};
