import VinylDisc from "./VinylDisc";
import { tracks, type Track } from "../../data/tracks";

interface MusicGalleryProps {
  onTrackPlay: (track: {
    id: string;
    name: string;
    artist: string;
    albumArt?: string;
    audioUrl: string;
  }) => void;
  onTrackStop: () => void;
  playingTrackId: string | null;
}

const MusicGallery = ({
  onTrackPlay,
  onTrackStop,
  playingTrackId,
}: MusicGalleryProps) => {
  const handleTrackClick = (track: Track) => {
    if (playingTrackId === track.id) {
      onTrackStop();
    } else {
      onTrackPlay({
        id: track.id,
        name: track.name,
        artist: track.artist,
        albumArt: track.albumArt,
        audioUrl: track.audioUrl,
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
            onClick={() => handleTrackClick(track)}
            rotation={track.rotation}
          />
        </div>
      ))}
    </div>
  );
};

export default MusicGallery;
