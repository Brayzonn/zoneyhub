import { createContext } from "react";

interface SoundContextType {
  isSoundOn: boolean;
  toggleSound: () => void;
}

export const SoundContext = createContext<SoundContextType | undefined>(
  undefined
);
