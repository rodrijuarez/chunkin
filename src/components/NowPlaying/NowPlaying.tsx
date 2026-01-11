import { AlbumArt } from './AlbumArt';
import type { NowPlayingData } from '../../types';

interface NowPlayingProps {
  track: NowPlayingData | null;
  isLoading: boolean;
  theme: 'light' | 'dark';
}

export function NowPlaying({ track, isLoading, theme }: NowPlayingProps) {
  const isDark = theme === 'dark';

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className={`aspect-square w-full max-w-[200px] border animate-pulse ${
          isDark ? 'border-white/20 bg-white/5' : 'border-black/20 bg-black/5'
        }`} />
        <div className="space-y-2">
          <div className={`h-4 w-32 animate-pulse ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
          <div className={`h-3 w-24 animate-pulse ${isDark ? 'bg-white/5' : 'bg-black/5'}`} />
        </div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="space-y-4">
        <AlbumArt url={undefined} alt="No track" theme={theme} />
        <div>
          <p className="text-lg font-bold tracking-tight">—</p>
          <p className={`text-[10px] tracking-[0.3em] uppercase mt-1 ${
            isDark ? 'text-white/30' : 'text-black/30'
          }`}>
            ESPERANDO SEÑAL
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AlbumArt url={track.artwork_url} alt={`${track.title} by ${track.artist}`} theme={theme} />
      <div>
        <p className="text-lg font-bold tracking-tight leading-tight">
          {track.title}
        </p>
        <p className={`text-[10px] tracking-[0.3em] uppercase mt-2 ${
          isDark ? 'text-white/50' : 'text-black/50'
        }`}>
          {track.artist}
        </p>
      </div>
    </div>
  );
}
