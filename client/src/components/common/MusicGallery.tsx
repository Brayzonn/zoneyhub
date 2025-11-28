import VinylDisc from "./VinylDisc";

interface Track {
  id: string;
  name: string;
  artist: string;
  albumArt?: string;
  rotation: number;
  x: number;
  y: number;
}

interface MusicGalleryProps {
  onTrackPlay: (track: {
    id: string;
    name: string;
    artist: string;
    albumArt?: string;
  }) => void;
  onTrackStop: () => void;
  playingTrackId: string | null;
}

const MusicGallery = ({
  onTrackPlay,
  onTrackStop,
  playingTrackId,
}: MusicGalleryProps) => {
  const tracks: Track[] = [
    {
      id: "1",
      name: "Midnight Dreams",
      artist: "The Wanderers",
      albumArt:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
      rotation: -3,
      x: 200,
      y: 300,
    },
    {
      id: "2",
      name: "Ocean Waves",
      artist: "Coastal Sounds",
      albumArt:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
      rotation: 5,
      x: 600,
      y: 450,
    },
    {
      id: "3",
      name: "City Lights",
      artist: "Urban Echo",
      albumArt:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
      rotation: -7,
      x: 1100,
      y: 280,
    },
    {
      id: "4",
      name: "Mountain High",
      artist: "Alpine Beats",
      albumArt:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      rotation: 4,
      x: 350,
      y: 800,
    },
    {
      id: "5",
      name: "Desert Sun",
      artist: "Nomad Vibes",
      albumArt:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
      rotation: -2,
      x: 850,
      y: 700,
    },
    {
      id: "6",
      name: "Forest Rain",
      artist: "Nature Sounds",
      albumArt:
        "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop",
      rotation: 6,
      x: 1400,
      y: 550,
    },
  ];

  const handleTrackClick = (trackId: string) => {
    const track = tracks.find((t) => t.id === trackId);
    if (!track) return;

    if (playingTrackId === trackId) {
      onTrackStop();
    } else {
      onTrackPlay({
        id: track.id,
        name: track.name,
        artist: track.artist,
        albumArt: track.albumArt,
      });
    }
  };

  return (
    <div className="relative w-full h-full">
      {tracks.map((track) => (
        <div
          key={track.id}
          className="absolute"
          style={{
            left: track.x,
            top: track.y,
          }}
        >
          <VinylDisc
            trackName={track.name}
            artistName={track.artist}
            albumArt={track.albumArt}
            isPlaying={playingTrackId === track.id}
            onClick={() => handleTrackClick(track.id)}
            rotation={track.rotation}
          />
        </div>
      ))}
    </div>
  );
};

export default MusicGallery;
