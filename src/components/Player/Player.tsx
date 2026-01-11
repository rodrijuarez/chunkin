import { PlayButton } from './PlayButton';
import { VolumeControl } from './VolumeControl';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

interface PlayerProps {
  stationStatus: 'online' | 'offline';
}

export function Player({ stationStatus }: PlayerProps) {
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
      />

      <VolumeControl
        volume={volume}
        isMuted={isMuted}
        onVolumeChange={setVolume}
        onToggleMute={toggleMute}
      />

      {error && (
        <p className="text-red-500 text-[10px] tracking-widest uppercase mt-4">
          ERROR: {error}
        </p>
      )}
    </div>
  );
}
