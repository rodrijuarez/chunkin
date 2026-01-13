import type { RadioStatus, NowPlayingData, HistoryTrack } from '../types';

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

function parseTrackTitle(title: string): { artist: string; title: string } {
  const parts = title.split(' - ');
  if (parts.length >= 2) {
    return {
      artist: parts[0].trim(),
      title: parts.slice(1).join(' - ').trim(),
    };
  }
  return {
    artist: 'Unknown Artist',
    title: title,
  };
}

export async function fetchNowPlaying(): Promise<RadioStatus> {
  if (!API_URL) {
    return {
      status: 'offline',
      current_track: null,
      history: [],
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
      const parsed = parseTrackTitle(currentTrack.title);
      nowPlaying = {
        artist: parsed.artist,
        title: parsed.title,
        artwork_url: currentTrack.artwork_url_large || currentTrack.artwork_url,
      };
    }

    // Parse history
    const history: HistoryTrack[] = (data.history || []).map((track) => {
      const parsed = parseTrackTitle(track.title);
      return {
        artist: parsed.artist,
        title: parsed.title,
      };
    });

    return {
      status: data.status === 'online' ? 'online' : 'offline',
      current_track: nowPlaying,
      history,
    };
  } catch {
    return {
      status: 'offline',
      current_track: null,
      history: [],
    };
  }
}
