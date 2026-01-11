import { PlayButton } from './PlayButton';
import { VolumeControl } from './VolumeControl';
import { StreamStatus } from './StreamStatus';
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
    <div className="flex flex-col items-center gap-6">
      <StreamStatus status={stationStatus} isPlaying={isPlaying} />

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
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}
    </div>
  );
}
