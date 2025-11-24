import { useState } from "react";

interface InfoCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoCard = ({ isOpen, onClose }: InfoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className={`h-[60px] bg-white border-2 border-[#94BDE6] rounded-2xl shadow-[0_1px_1px_-0.5px_rgba(0,0,0,0.04),0_3px_3px_-1.5px_rgba(0,0,0,0.04),0_12px_12px_-6px_rgba(0,0,0,0.04),0_0_0_1px_rgba(148,189,230,0.1)] transition-all duration-500 ease-in-out ${
        isOpen ? "opacity-100 w-[280px]" : "opacity-0 w-14 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between h-full px-3 gap-3">
        {/* Track Info */}
        <div
          className={`flex-1 min-w-0 transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <h3 className="text-xs font-semibold text-gray-800 truncate">
            Track Title
          </h3>
          <p className="text-[10px] text-gray-500 truncate">Artist Name</p>
        </div>

        {/* Controls */}
        <div
          className={`flex items-center gap-1.5 transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Previous */}
          <button
            className="cursor-pointer w-7 h-7 rounded-lg flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#6d9bca] hover:bg-opacity-100 border border-transparent hover:border-[#94BDE6] transition-all"
            aria-label="Previous"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="19 20 9 12 19 4 19 20" />
              <line x1="5" y1="19" x2="5" y2="5" />
            </svg>
          </button>

          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="cursor-pointer w-8 h-8 rounded-lg flex items-center justify-center bg-[#5a8ab8] hover:bg-[#6d9bca] text-white border border-[#94BDE6] transition-all"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>

          {/* Next */}
          <button
            className="cursor-pointer w-7 h-7 rounded-lg flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#6d9bca] hover:bg-opacity-100 border border-transparent hover:border-[#94BDE6] transition-all"
            aria-label="Next"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 4 15 12 5 20 5 4" />
              <line x1="19" y1="5" x2="19" y2="19" />
            </svg>
          </button>

          {/* Shuffle */}
          <button
            className="cursor-pointer w-7 h-7 rounded-lg flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#6d9bca] hover:bg-opacity-100 border border-transparent hover:border-[#94BDE6] transition-all"
            aria-label="Shuffle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 3 21 3 21 8" />
              <line x1="4" y1="20" x2="21" y2="3" />
              <polyline points="21 16 21 21 16 21" />
              <line x1="15" y1="15" x2="21" y2="21" />
              <line x1="4" y1="4" x2="9" y2="9" />
            </svg>
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`cursor-pointer w-6 h-6 rounded-lg flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#6d9bca] hover:bg-opacity-100 border border-transparent hover:border-[#94BDE6] transition-all ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InfoCard;
