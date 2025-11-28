import { useState } from "react";
import { motion } from "framer-motion";

interface VinylDiscProps {
  albumArt?: string;
  trackName: string;
  artistName: string;
  isPlaying: boolean;
  onClick: () => void;
  rotation?: number;
}

const VinylDisc = ({
  albumArt,
  trackName,
  artistName,
  isPlaying,
  onClick,
  rotation = 0,
}: VinylDiscProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Vinyl Container */}
      <div className="relative w-32 h-32">
        {/* Vinyl Disc */}
        <motion.div
          className="absolute left-1 top-1 w-30 h-30 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-[0_8px_16px_rgba(0,0,0,0.3),0_0_0_3px_rgba(0,0,0,0.8),0_0_0_4px_rgba(50,50,50,0.6)]"
          animate={{
            rotateZ: isPlaying ? 360 : 0,
          }}
          transition={{
            rotateZ: isPlaying
              ? {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }
              : {
                  duration: 0.5,
                  ease: "easeOut",
                },
          }}
        >
          <div className="absolute inset-2 rounded-full border border-gray-700/30" />
          <div className="absolute inset-3 rounded-full border border-gray-700/25" />
          <div className="absolute inset-4 rounded-full border border-gray-700/20" />
          <div className="absolute inset-5 rounded-full border border-gray-700/15" />
          <div className="absolute inset-6 rounded-full border border-gray-700/10" />
          <div className="absolute inset-7 rounded-full border border-gray-700/8" />
          <div className="absolute inset-8 rounded-full border border-gray-700/6" />
          <div className="absolute inset-9 rounded-full border border-gray-700/5" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_2px_4px_rgba(0,0,0,0.3)] border-2 border-gray-800">
              {albumArt ? (
                <>
                  <img
                    src={albumArt}
                    alt={trackName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full h-full bg-gradient-to-br from-red-900 to-red-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Album Cover - Clickable */}
        <motion.button
          onClick={onClick}
          className="absolute inset-0 shadow-[0_10px_20px_rgba(0,0,0,0.3)] overflow-hidden rounded-sm cursor-pointer"
          animate={{
            x: isPlaying ? 60 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
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
                width="40"
                height="40"
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
        </motion.button>
      </div>

      {/* Track Info  */}
      <motion.div
        className="mt-3 text-center"
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 4,
          rotateZ: isHovered ? -rotation : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="bg-white rounded-sm shadow-lg px-1 py-2 w-32 flex flex-col items-center justify-center"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <h3 className="text-[13px] font-semibold text-gray-900 text-center">
            {trackName}
          </h3>
          <p className="text-[11px] text-gray-600 text-center">{artistName}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default VinylDisc;
