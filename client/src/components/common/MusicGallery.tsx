import { useState } from "react";
import VinylDisc from "./VinylDisc";

interface Track {
  id: string;
  name: string;
  artist: string;
  albumArt?: string;
  rotation: number;
}

const MusicGallery = () => {
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  const tracks: Track[] = [
    {
      id: "1",
      name: "Midnight Dreams",
      artist: "The Wanderers",
      albumArt:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
      rotation: -3,
    },
    {
      id: "2",
      name: "Ocean Waves",
      artist: "Coastal Sounds",
      albumArt:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
      rotation: 5,
    },
    {
      id: "3",
      name: "City Lights",
      artist: "Urban Echo",
      albumArt:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
      rotation: -7,
    },
    {
      id: "4",
      name: "Mountain High",
      artist: "Alpine Beats",
      albumArt:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      rotation: 4,
    },
    {
      id: "5",
      name: "Desert Sun",
      artist: "Nomad Vibes",
      albumArt:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
      rotation: -2,
    },
    {
      id: "6",
      name: "Forest Rain",
      artist: "Nature Sounds",
      albumArt:
        "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop",
      rotation: 6,
    },
  ];

  const handleTrackClick = (trackId: string) => {
    if (playingTrackId === trackId) {
      setPlayingTrackId(null);
    } else {
      setPlayingTrackId(trackId);
    }
  };

  return (
    <div className="w-full h-full flex flex-col px-8">
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-12 content-center items-center">
        {tracks.map((track) => (
          <VinylDisc
            key={track.id}
            trackName={track.name}
            artistName={track.artist}
            albumArt={track.albumArt}
            isPlaying={playingTrackId === track.id}
            onClick={() => handleTrackClick(track.id)}
            rotation={track.rotation}
          />
        ))}
      </div>
    </div>
  );
};

export default MusicGallery;
