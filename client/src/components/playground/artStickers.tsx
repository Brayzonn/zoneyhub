import {
  SmileySticker,
  ArrowSticker,
  StarSticker,
  BoltSticker,
  SquiggleSticker,
  NoteSticker,
} from "./StickerArt";

/* Sticker art resting spots (% of the card box) */
export const artStickers = [
  {
    id: "smiley",
    node: <SmileySticker />,
    left: "76%",
    top: "-4%",
    rotation: 14,
  },
  { id: "arrow", node: <ArrowSticker />, left: "6%", top: "46%", rotation: -6 },
  { id: "star", node: <StarSticker />, left: "56%", top: "101%", rotation: 10 },
  { id: "bolt", node: <BoltSticker />, left: "-16%", top: "24%", rotation: 10 },
  {
    id: "squiggle",
    node: <SquiggleSticker />,
    left: "-8%",
    top: "106%",
    rotation: 6,
  },
  {
    id: "note",
    node: <NoteSticker />,
    left: "116%",
    top: "124%",
    rotation: 12,
  },
];
