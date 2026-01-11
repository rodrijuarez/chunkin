import { AlbumArt } from './AlbumArt';
import type { NowPlayingData } from '../../types';

interface NowPlayingProps {
  track: NowPlayingData | null;
  isLoading: boolean;
}

export function NowPlaying({ track, isLoading }: NowPlayingProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="w-32 h-32 border border-white/10 animate-pulse" />
        <div className="flex flex-col items-center gap-2">
          <div className="w-24 h-3 bg-white/10 animate-pulse" />
          <div className="w-16 h-2 bg-white/5 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="flex flex-col items-center gap-6">
        <AlbumArt url={undefined} alt="No track" />
        <p className="text-white/30 text-xs tracking-widest uppercase">
          silence
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <AlbumArt url={track.artwork_url} alt={`${track.title} by ${track.artist}`} />
      <div className="text-center">
        <p className="text-sm text-white/90 tracking-wide">{track.title}</p>
        <p className="text-xs text-white/50 tracking-wider mt-1">{track.artist}</p>
      </div>
    </div>
  );
}
