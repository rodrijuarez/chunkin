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
  const percentage = Math.round(displayVolume * 100);

  return (
    <div className="flex items-center gap-4 mt-4">
      <button
        onClick={onToggleMute}
        className="text-[10px] tracking-[0.3em] uppercase text-white/50 hover:text-red-500 transition-colors w-16 text-left"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? 'MUTED' : 'VOL'}
      </button>

      <div className="flex-1 relative">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={displayVolume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="w-full h-6 bg-transparent appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-runnable-track]:h-px [&::-webkit-slider-runnable-track]:bg-white/30"
          aria-label="Volume"
        />
      </div>

      <span className="text-[10px] tracking-widest text-white/50 w-12 text-right font-mono">
        {percentage.toString().padStart(3, '0')}%
      </span>
    </div>
  );
}
