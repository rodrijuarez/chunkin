interface PlayButtonProps {
  isPlaying: boolean;
  isLoading: boolean;
  disabled?: boolean;
  onClick: () => void;
  theme: 'light' | 'dark';
}

export function PlayButton({ isPlaying, isLoading, disabled, onClick, theme }: PlayButtonProps) {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`group relative border-2 transition-colors w-full py-6 ${
        isDark
          ? 'border-white hover:border-red-500 hover:bg-red-500 disabled:hover:border-white'
          : 'border-black hover:border-red-500 hover:bg-red-500 disabled:hover:border-black'
      } disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent`}
      aria-label={isPlaying ? 'Pause' : 'Play'}
    >
      <span className={`text-sm tracking-[0.3em] uppercase font-bold group-hover:text-white transition-colors ${
        isDark ? 'group-hover:text-black' : 'group-hover:text-white'
      }`}>
        {isLoading ? (
          'CONECTANDO...'
        ) : isPlaying ? (
          '■ DETENER'
        ) : (
          '▶ REPRODUCIR'
        )}
      </span>
    </button>
  );
}
