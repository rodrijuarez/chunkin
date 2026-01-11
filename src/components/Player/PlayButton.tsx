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
      className="group relative border-2 border-white hover:border-red-500 hover:bg-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white disabled:hover:bg-transparent w-full py-6"
      aria-label={isPlaying ? 'Pause' : 'Play'}
    >
      <span className="text-sm tracking-[0.3em] uppercase font-bold group-hover:text-black transition-colors">
        {isLoading ? (
          'CONNECTING...'
        ) : isPlaying ? (
          '■ STOP'
        ) : (
          '▶ PLAY'
        )}
      </span>
    </button>
  );
}
