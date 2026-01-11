export interface NowPlayingData {
  title: string;
  artist: string;
  artwork_url?: string;
  album?: string;
}

export interface RadioStatus {
  status: 'online' | 'offline';
  current_track: NowPlayingData | null;
  listeners?: number;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  error: string | null;
}
