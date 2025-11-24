import { useState } from "react";

interface VinylDiscProps {
  albumArt?: string;
  trackName: string;
  artistName: string;
  isPlaying: boolean;
  onClick: () => void;
}

const VinylDisc = ({
  albumArt,
  trackName,
  artistName,
  isPlaying,
  onClick,
}: VinylDiscProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="relative cursor-pointer group"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Vinyl Container */}
      <div className="relative w-32 h-32">
        {/* Vinyl Disc */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-lg transition-all duration-500 ${
            isPlaying
              ? "animate-spin-slow"
              : isHovered
              ? "scale-105 rotate-12"
              : ""
          }`}
          style={{
            animationDuration: isPlaying ? "3s" : "0s",
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
          }}
        >
          {/* Vinyl grooves effect */}
          <div className="absolute inset-2 rounded-full border-4 border-gray-700 opacity-30" />
          <div className="absolute inset-4 rounded-full border-4 border-gray-700 opacity-20" />
          <div className="absolute inset-6 rounded-full border-4 border-gray-700 opacity-10" />

          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-900 to-red-700 border-2 border-red-800 flex items-center justify-center shadow-inner">
              <div className="w-2 h-2 rounded-full bg-gray-900" />
            </div>
          </div>

          {/* Album art (partial reveal) */}
          {albumArt && (
            <div
              className={`absolute inset-0 rounded-full overflow-hidden transition-all duration-500 ${
                isHovered || isPlaying
                  ? "opacity-80 scale-95"
                  : "opacity-0 scale-90"
              }`}
            >
              <img
                src={albumArt}
                alt={trackName}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Album Cover (slides out on hover) */}
        <div
          className={`absolute inset-0 rounded-lg bg-white shadow-xl border-2 border-[#94BDE6] overflow-hidden transition-all duration-500 ${
            isHovered || isPlaying
              ? "translate-x-8 -translate-y-2 rotate-6"
              : "translate-x-0 translate-y-0"
          }`}
        >
          {albumArt ? (
            <img
              src={albumArt}
              alt={trackName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#6d9bca] to-[#5a8ab8] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
            </div>
          )}
        </div>

        {/* Playing indicator */}
        {isPlaying && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#5a8ab8] rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="white"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        )}
      </div>

      {/* Track Info */}
      <div
        className={`mt-3 text-center transition-all duration-300 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-70 translate-y-1"
        }`}
      >
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {trackName}
        </h3>
        <p className="text-xs text-gray-500 truncate">{artistName}</p>
      </div>
    </button>
  );
};

export default VinylDisc;
