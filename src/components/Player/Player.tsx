import { PlayButton } from './PlayButton';
import { VolumeControl } from './VolumeControl';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

interface PlayerProps {
  stationStatus: 'online' | 'offline';
  theme: 'light' | 'dark';
}

export function Player({ stationStatus, theme }: PlayerProps) {
  const {
    isPlaying,
    isLoading,
    volume,
    isMuted,
    error,
    togglePlay,
    setVolume,
    toggleMute,
  } = useAudioPlayer();

  return (
    <div>
      <PlayButton
        isPlaying={isPlaying}
        isLoading={isLoading}
        disabled={stationStatus === 'offline'}
        onClick={togglePlay}
        theme={theme}
      />

      <VolumeControl
        volume={volume}
        isMuted={isMuted}
        onVolumeChange={setVolume}
        onToggleMute={toggleMute}
        theme={theme}
      />

      {error && (
        <p className="text-red-500 text-[10px] tracking-widest uppercase mt-4">
          ERROR: {error === 'Failed to connect to stream' ? 'No se pudo conectar' : error}
        </p>
      )}
    </div>
  );
}
