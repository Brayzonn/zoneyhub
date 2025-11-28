import { motion } from "framer-motion";

interface MusicPlayerProps {
  trackId: string;
  trackName: string;
  artistName: string;
  albumArt?: string;
  onStop: () => void;
}

const MusicPlayer = ({
  trackName,
  artistName,
  albumArt,
  onStop,
}: MusicPlayerProps) => {
  return (
    <div className="flex h-[48px] w-[200px] items-center justify-center gap-3  px-3">
      {/* Album Art */}
      <motion.div
        className="w-7 h-7 rounded-md overflow-hidden flex-shrink-0 shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.2 }}
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
              width="16"
              height="16"
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
      </motion.div>

      {/* Track Info */}
      <motion.div
        className="flex-1 min-w-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.2 }}
      >
        <h3 className="text-[13px] font-medium text-[#e1e1e1] truncate max-w-[120px]">
          {trackName}
        </h3>
        <p className="text-[11px] text-[#c5c5c5] truncate max-w-[120px]">
          {artistName}
        </p>
      </motion.div>

      {/* Stop Button*/}
      <motion.button
        onClick={onStop}
        className="cursor-pointer w-5 h-5 rounded-full bg-white flex items-center justify-center flex-shrink-0 hover:bg-gray-200 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.2 }}
        aria-label="Stop"
      >
        <div className="w-2 h-2 bg-[#121418] rounded-[1px]" />
      </motion.button>
    </div>
  );
};

export default MusicPlayer;
