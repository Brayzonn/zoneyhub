import { useState } from "react";
import FloatingSideMenu from "../components/common/FloatingSideMenu";
import MusicGallery from "../components/common/MusicGallery";

const MusicRoom = () => {
  const [isUtilityMenuExpanded, setIsUtilityMenuExpanded] = useState(false);
  const [isInfoCardOpen, setIsInfoCardOpen] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-surface-bg">
      <div
        id="mat-texture"
        className="absolute overflow-hidden rounded-lg border-4 border-[#94BDE6] bg-[#6d9bca] w-[3200px] h-[2760px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg bg-dots-grid bg-[size:20px_20px]"
      >
        <div
          id="lines"
          className="absolute w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-circuit bg-[size:40px_40px,40px_40px,40px_40px]"
        />

        <div
          id="diagonal-lines"
          className="absolute w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-linear-big-grid bg-[size:80px_80px]"
        />
      </div>

      {/* Utility Menu - Top Center */}
      <div className="relative z-20 flex items-start justify-center pt-3">
        <div
          onMouseEnter={() => setIsUtilityMenuExpanded(true)}
          onMouseLeave={() => setIsUtilityMenuExpanded(false)}
          className={`px-2 py-1 bg-white border-2 border-[#94BDE6] rounded-2xl flex gap-2 shadow-[0_1px_1px_-0.5px_rgba(0,0,0,0.04),0_3px_3px_-1.5px_rgba(0,0,0,0.04),0_12px_12px_-6px_rgba(0,0,0,0.04),0_0_0_1px_rgba(148,189,230,0.1)] transition-all duration-300 ease-in-out ${
            isUtilityMenuExpanded ? "max-h-34" : "h-fit"
          }`}
        >
          {/* Theme Toggle */}
          <button
            className="cursor-pointer shrink-0 aspect-square w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#6d9bca] hover:bg-opacity-100 border border-transparent hover:border-[#94BDE6] transition-all"
            aria-label="Toggle Theme"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              className="h-5 w-5"
            >
              <path
                d="M12 3V2M12 22V21M18.3598 5.64005L19.0698 4.93005M4.93016 19.07L5.64016 18.36M21 12H22M2 12H3M18.3598 18.36L19.0698 19.07M4.93016 4.93005L5.64016 5.64005M15.5355 8.46447C17.4882 10.4171 17.4882 13.5829 15.5355 15.5355C13.5829 17.4882 10.4171 17.4882 8.46447 15.5355C6.51185 13.5829 6.51185 10.4171 8.46447 8.46447C10.4171 6.51185 13.5829 6.51185 15.5355 8.46447Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Audio Toggle */}
          <button
            className="cursor-pointer  shrink-0 aspect-square w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#6d9bca] hover:bg-opacity-100 border border-transparent hover:border-[#94BDE6] transition-all"
            aria-label="Toggle Audio"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              className="h-5 w-5"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="m21.5 10-2.121 2.121m0 0-2.122 2.121m2.122-2.12L17.257 10m2.122 2.121 2.121 2.121M4 8h1.333a2 2 0 0 0 1.2-.4L11.2 4.1a.5.5 0 0 1 .8.4v15a.5.5 0 0 1-.8.4l-4.667-3.5a2 2 0 0 0-1.2-.4H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Menu - Left Side */}
      <div className="absolute z-20 left-0 top-0 flex items-center justify-start h-full pl-3">
        <FloatingSideMenu
          onInfoClick={() => setIsInfoCardOpen(!isInfoCardOpen)}
          isInfoOpen={isInfoCardOpen}
        />
      </div>

      {/* Music Gallery - Center Content */}
      <div className="relative z-10 flex items-start justify-center h-full overflow-auto">
        <MusicGallery />
      </div>
    </div>
  );
};

export default MusicRoom;
