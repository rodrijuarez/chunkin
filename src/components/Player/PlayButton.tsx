interface PlayButtonProps {
  isPlaying: boolean;
  isLoading: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function PlayButton({ isPlaying, isLoading, disabled, onClick }: PlayButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-20 h-20 border border-white/30 hover:border-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center group"
      aria-label={isPlaying ? 'Pause' : 'Play'}
    >
      {isLoading ? (
        <div className="w-4 h-4 border border-white/50 border-t-transparent animate-spin" />
      ) : isPlaying ? (
        <div className="flex gap-2">
          <div className="w-1 h-6 bg-white group-hover:bg-white/80" />
          <div className="w-1 h-6 bg-white group-hover:bg-white/80" />
        </div>
      ) : (
        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-white ml-1 group-hover:border-l-white/80" />
      )}
    </button>
  );
}
