import {
  TapeSticker,
  SmileySticker,
  BoltSticker,
  NoteSticker,
  SquiggleSticker,
} from "./StickerArt";

/* Card 1 face: the playground intro */
export const IntroFace = () => (
  <div className="w-full h-full flex flex-col p-[8cqw] text-ink">
    <div className="flex items-center gap-3 text-[clamp(0.55rem,2.4cqw,0.8rem)] uppercase tracking-[0.14em] text-ink-muted">
      <div className="size-[clamp(1.8rem,7cqw,2.5rem)] rounded-lg border-2 border-ink flex items-center justify-center shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-[55%] h-[55%] text-ink"
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      </div>
      <span>Micro components &amp; explorations</span>
    </div>

    <div className="flex-1 flex flex-col justify-center gap-[3.5cqw]">
      <div className="flex items-center gap-3">
        <h1 className="m-0 -rotate-2 sticker-cut">
          <TapeSticker />
        </h1>
        <div className="w-2 h-2 rounded-full animate-pulse bg-green-400" />
      </div>
      <p className="m-0 max-w-[38ch] leading-relaxed text-ink-muted text-[clamp(0.7rem,3.2cqw,1rem)]">
        A space where I keep my UI experiments, interaction studies, and design
        system components. Drag the pieces around.
      </p>
    </div>

    <div className="flex flex-wrap gap-[2cqw]">
      {["Components", "Animations", "Interactions"].map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-ink/40 px-[3cqw] py-[1cqw] text-[clamp(0.5rem,2.2cqw,0.7rem)] uppercase tracking-[0.14em] text-ink-muted"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

/* Card 2 face: the sticker palette */
const paletteSwatches = ["#f2c94c", "#e8b04b", "#e8734a", "#7bc47f", "#5aa9e6"];

export const PaletteFace = () => (
  <div className="w-full h-full flex flex-col p-[8cqw] text-ink">
    <div className="text-[clamp(0.55rem,2.4cqw,0.8rem)] uppercase tracking-[0.14em] text-ink-muted">
      Colors &amp; shapes
    </div>
    <div className="flex-1 flex flex-col items-center justify-center gap-[5cqw]">
      <div className="flex gap-[2.5cqw]">
        {paletteSwatches.map((color, i) => (
          <div
            key={color}
            className={`size-[8cqw] border-2 border-ink ${i % 2 ? "rounded-lg rotate-6" : "rounded-full"}`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <svg viewBox="0 0 240 84" className="w-[56cqw]" aria-hidden="true">
        <circle
          cx="42"
          cy="42"
          r="30"
          fill="#e8734a"
          stroke="#111"
          strokeWidth="3"
        />
        <rect
          x="92"
          y="14"
          width="56"
          height="56"
          rx="10"
          fill="#7bc47f"
          stroke="#111"
          strokeWidth="3"
          transform="rotate(8 120 42)"
        />
        <path
          d="M172 70 L200 14 L228 70 Z"
          fill="#f2c94c"
          stroke="#111"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    <p className="m-0 text-[clamp(0.6rem,2.6cqw,0.85rem)] text-ink-muted">
      the palette behind the stickers
    </p>
  </div>
);

/* Card 3 face: a cluster of sticker doodles */
export const DoodleFace = () => (
  <div className="w-full h-full flex flex-col p-[8cqw] text-ink bg-[#5aa9e6]/20">
    <div className="text-[clamp(0.55rem,2.4cqw,0.8rem)] uppercase tracking-[0.14em] text-ink-muted">
      Doodles
    </div>
    <div className="flex-1 flex flex-col items-center justify-center gap-[3cqw]">
      <div className="flex items-center gap-[5cqw]">
        <div className="-rotate-6 sticker-cut">
          <SmileySticker />
        </div>
        <div className="rotate-6 sticker-cut">
          <BoltSticker />
        </div>
        <div className="-rotate-3 sticker-cut">
          <NoteSticker />
        </div>
      </div>
      <div className="rotate-2 sticker-cut">
        <SquiggleSticker />
      </div>
    </div>
    <p className="m-0 text-[clamp(0.6rem,2.6cqw,0.85rem)] text-ink-muted">
      sketches waiting to become components
    </p>
  </div>
);
