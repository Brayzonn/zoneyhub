import { createContext } from "react";

export interface CurrentTrack {
  id: string;
  name: string;
  artist: string;
  albumArt?: string;
  audioUrl: string;
}

export interface AudioContextType {
  play: (track: CurrentTrack) => void;
  stop: () => void;
  isPlaying: boolean;
  currentTrack: CurrentTrack | null;
  currentTime: number;
  duration: number;
}

export const AudioContext = createContext<AudioContextType | undefined>(
  undefined
);
