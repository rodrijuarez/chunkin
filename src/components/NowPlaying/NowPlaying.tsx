import { AlbumArt } from './AlbumArt';
import type { NowPlayingData, HistoryTrack } from '../../types';

interface NowPlayingProps {
  track: NowPlayingData | null;
  history: HistoryTrack[];
  isLoading: boolean;
  theme: 'light' | 'dark';
}

export function NowPlaying({ track, history, isLoading, theme }: NowPlayingProps) {
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
    <div className="flex gap-6">
      {/* Current track */}
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

      {/* History - desktop only */}
      {history.length > 0 && (
        <div className={`hidden lg:block border-l pl-6 ${isDark ? 'border-white/20' : 'border-black/20'}`}>
          <p className={`text-[10px] tracking-[0.3em] uppercase mb-4 ${
            isDark ? 'text-white/30' : 'text-black/30'
          }`}>
            ANTERIOR
          </p>
          <ul className="space-y-3">
            {history.slice(0, 5).map((item, index) => (
              <li key={index} className="text-sm">
                <p className={`font-medium truncate max-w-[180px] ${
                  isDark ? 'text-white/70' : 'text-black/70'
                }`}>
                  {item.title}
                </p>
                <p className={`text-[10px] tracking-wide uppercase truncate max-w-[180px] ${
                  isDark ? 'text-white/40' : 'text-black/40'
                }`}>
                  {item.artist}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
