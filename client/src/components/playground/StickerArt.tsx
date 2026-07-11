/* Decorative sticker art + resting spots */
export const TapeSticker = () => (
  <div className="inline-block px-[3cqw] py-[1.2cqw] bg-[#e8b04b]/90 text-[#111] font-mono font-bold uppercase tracking-[0.22em] text-[clamp(0.8rem,4.5cqw,1.6rem)] [clip-path:polygon(2%_0,98%_4%,100%_96%,0_100%)]">
    playground
  </div>
);

export const SmileySticker = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
    <circle
      cx="36"
      cy="36"
      r="33"
      fill="#f2c94c"
      stroke="#111"
      strokeWidth="3"
    />
    <circle cx="25" cy="30" r="4" fill="#111" />
    <circle cx="47" cy="30" r="4" fill="#111" />
    <path
      d="M22 44 Q36 56 50 44"
      fill="none"
      stroke="#111"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export const ArrowSticker = () => (
  <svg width="96" height="60" viewBox="0 0 96 60" aria-hidden="true">
    <path
      d="M6 48 C30 44 52 36 82 14"
      fill="none"
      stroke="#e8734a"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M84 30 L84 10 L64 12"
      fill="none"
      stroke="#e8734a"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const StarSticker = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
    <path
      d="M32 3 L39 23 L60 23 L43 36 L50 57 L32 44 L14 57 L21 36 L4 23 L25 23 Z"
      fill="#7bc47f"
      stroke="#111"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const BoltSticker = () => (
  <svg width="56" height="72" viewBox="0 0 56 72" aria-hidden="true">
    <path
      d="M32 4 L10 40 L24 40 L18 68 L46 28 L30 28 Z"
      fill="#e8b04b"
      stroke="#111"
      strokeWidth="3"
      strokeLinejoin="round"
    />
  </svg>
);

export const SquiggleSticker = () => (
  <svg width="96" height="32" viewBox="0 0 96 32" aria-hidden="true">
    <path
      d="M4 16 C10 4 18 4 24 16 S38 28 44 16 S58 4 64 16 S78 28 84 16"
      fill="none"
      stroke="#5aa9e6"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

export const NoteSticker = () => (
  <svg width="56" height="64" viewBox="0 0 56 64" aria-hidden="true">
    <polygon
      points="21,13 47,7 47,15 21,21"
      fill="#e8734a"
      stroke="#111"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <line x1="21" y1="50" x2="21" y2="13" stroke="#111" strokeWidth="3" />
    <line x1="47" y1="44" x2="47" y2="7" stroke="#111" strokeWidth="3" />
    <ellipse
      cx="14"
      cy="50"
      rx="8"
      ry="6"
      fill="#e8734a"
      stroke="#111"
      strokeWidth="2.5"
    />
    <ellipse
      cx="40"
      cy="44"
      rx="8"
      ry="6"
      fill="#e8734a"
      stroke="#111"
      strokeWidth="2.5"
    />
  </svg>
);
