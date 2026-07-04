export interface Track {
  id: string;
  name: string;
  artist: string;
  albumArt?: string;
  audioUrl: string;
  rotation: number;
  x: number;
  y: number;
}

export const tracks: Track[] = [
  {
    id: "1",
    name: "Dancing Queen",
    artist: "ABBA",
    albumArt:
      "https://res.cloudinary.com/dxbkwrhyc/image/upload/v1764946174/R-441165-1479753865-1804_wiegr6.jpg",
    rotation: -3,
    audioUrl:
      "https://res.cloudinary.com/dxbkwrhyc/video/upload/v1764947249/abba_dancingqueen_vj557l.mp3",
    x: 700,
    y: 1050,
  },
  {
    id: "2",
    name: "Islands",
    artist: "Young The Giant",
    albumArt:
      "https://res.cloudinary.com/dxbkwrhyc/image/upload/v1764946174/R-3141155-1740149992-7587_wtqanw.jpg",
    rotation: 5,
    audioUrl:
      "https://res.cloudinary.com/dxbkwrhyc/video/upload/v1764947137/island_ytg_aqpipb.mp3",
    x: 1350,
    y: 1430,
  },
  {
    id: "3",
    name: "Forever ",
    artist: "Shania Twain",
    albumArt:
      "https://res.cloudinary.com/dxbkwrhyc/image/upload/v1764832842/R-428475-1628120629-2814_kahkwh.jpg",
    rotation: 4,
    audioUrl:
      "https://res.cloudinary.com/dxbkwrhyc/video/upload/v1764947257/foreverandalways_shania_sl6dso.mp3",
    x: 700,
    y: 1450,
  },
  {
    id: "4",
    name: "NATURALLY",
    artist: "Amir Obe",
    albumArt:
      "https://res.cloudinary.com/dxbkwrhyc/image/upload/v1764835908/R-10169188-1683272299-4074_wrw9ka.jpg",
    rotation: -2,
    audioUrl:
      "https://res.cloudinary.com/dxbkwrhyc/video/upload/v1764947260/naturally_amirobe_bmqpnl.mp3",
    x: 1500,
    y: 1000,
  },
];
