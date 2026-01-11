import type { RadioStatus, NowPlayingData } from '../types';

const API_URL = import.meta.env.VITE_API_URL || '';

interface RadioCoResponse {
  status: string;
  source?: {
    type: string;
    collaborator: null | unknown;
    relay: null | unknown;
  };
  collaborators?: unknown[];
  relays?: unknown[];
  current_track?: {
    title: string;
    start_time: string;
    artwork_url: string;
    artwork_url_large: string;
  };
  history?: Array<{
    title: string;
  }>;
  logo_url?: string;
  streaming_hostname?: string;
  outputs?: unknown[];
}

export async function fetchNowPlaying(): Promise<RadioStatus> {
  if (!API_URL) {
    return {
      status: 'offline',
      current_track: null,
    };
  }

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch station status');
    }

    const data: RadioCoResponse = await response.json();

    // Parse the title to extract artist and song
    const currentTrack = data.current_track;
    let nowPlaying: NowPlayingData | null = null;

    if (currentTrack?.title) {
      // Radio.co format is usually "Artist - Title"
      const parts = currentTrack.title.split(' - ');
      if (parts.length >= 2) {
        nowPlaying = {
          artist: parts[0].trim(),
          title: parts.slice(1).join(' - ').trim(),
          artwork_url: currentTrack.artwork_url_large || currentTrack.artwork_url,
        };
      } else {
        nowPlaying = {
          artist: 'Unknown Artist',
          title: currentTrack.title,
          artwork_url: currentTrack.artwork_url_large || currentTrack.artwork_url,
        };
      }
    }

    return {
      status: data.status === 'online' ? 'online' : 'offline',
      current_track: nowPlaying,
    };
  } catch {
    return {
      status: 'offline',
      current_track: null,
    };
  }
}
