import { useState } from "react";
import VinylDisc from "./VinylDisc";

interface Track {
  id: string;
  name: string;
  artist: string;
  albumArt?: string;
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
    },
    {
      id: "2",
      name: "Ocean Waves",
      artist: "Coastal Sounds",
      albumArt:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
    },
    {
      id: "3",
      name: "City Lights",
      artist: "Urban Echo",
      albumArt:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
    },
    {
      id: "4",
      name: "Mountain High",
      artist: "Alpine Beats",
      albumArt:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
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
    <div className="w-full max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {tracks.map((track) => (
          <VinylDisc
            key={track.id}
            trackName={track.name}
            artistName={track.artist}
            albumArt={track.albumArt}
            isPlaying={playingTrackId === track.id}
            onClick={() => handleTrackClick(track.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MusicGallery;
