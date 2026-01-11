import { AlbumArt } from './AlbumArt';
import type { NowPlayingData } from '../../types';

interface NowPlayingProps {
  track: NowPlayingData | null;
  isLoading: boolean;
}

export function NowPlaying({ track, isLoading }: NowPlayingProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="aspect-square w-full max-w-[200px] border border-white/20 bg-white/5 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-32 bg-white/10 animate-pulse" />
          <div className="h-3 w-24 bg-white/5 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="space-y-4">
        <AlbumArt url={undefined} alt="No track" />
        <div>
          <p className="text-lg font-bold tracking-tight">—</p>
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mt-1">
            WAITING FOR SIGNAL
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AlbumArt url={track.artwork_url} alt={`${track.title} by ${track.artist}`} />
      <div>
        <p className="text-lg font-bold tracking-tight leading-tight">
          {track.title}
        </p>
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 mt-2">
          {track.artist}
        </p>
      </div>
    </div>
  );
}
