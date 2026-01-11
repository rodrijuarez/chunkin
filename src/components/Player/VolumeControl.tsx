interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
}

export function VolumeControl({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
}: VolumeControlProps) {
  const displayVolume = isMuted ? 0 : volume;

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onToggleMute}
        className="text-white/50 hover:text-white transition-colors text-xs tracking-widest uppercase"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted || volume === 0 ? 'mute' : 'vol'}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={displayVolume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        className="w-20 h-px bg-white/30 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-0"
        aria-label="Volume"
      />
    </div>
  );
}
