import { useState, useEffect, useCallback } from 'react';
import type { RadioStatus } from '../types';
import { fetchNowPlaying } from '../services/radioApi';

const POLL_INTERVAL = 10000; // 10 seconds

export function useNowPlaying() {
  const [status, setStatus] = useState<RadioStatus>({
    status: 'offline',
    current_track: null,
    history: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await fetchNowPlaying();
      setStatus(data);
    } catch {
      setStatus({
        status: 'offline',
        current_track: null,
        history: [],
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    refresh();

    // Set up polling
    const interval = setInterval(refresh, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [refresh]);

  return {
    ...status,
    isLoading,
    refresh,
  };
}
