interface StreamStatusProps {
  status: 'online' | 'offline';
  isPlaying: boolean;
}

export function StreamStatus({ status, isPlaying }: StreamStatusProps) {
  const getStatusText = () => {
    if (status === 'offline') return 'offline';
    if (isPlaying) return 'live';
    return 'ready';
  };

  const isLive = status === 'online' && isPlaying;

  return (
    <div className="flex items-center gap-2 text-xs tracking-widest uppercase">
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === 'offline'
            ? 'bg-white/30'
            : isLive
              ? 'bg-white animate-pulse'
              : 'bg-white/50'
        }`}
      />
      <span className={status === 'offline' ? 'text-white/30' : 'text-white/70'}>
        {getStatusText()}
      </span>
    </div>
  );
}
