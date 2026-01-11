import { useState, useRef, useCallback, useEffect } from 'react';
import type { AudioPlayerState } from '../types';

const STREAM_URL = import.meta.env.VITE_STREAM_URL || '';

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    volume: 0.7,
    isMuted: false,
    isLoading: false,
    error: null,
  });

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audioRef.current = audio;

    const handleWaiting = () => {
      setState(prev => ({ ...prev, isLoading: true }));
    };

    const handlePlaying = () => {
      setState(prev => ({ ...prev, isLoading: false, isPlaying: true, error: null }));
    };

    const handleError = () => {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isPlaying: false,
        error: 'Failed to connect to stream',
      }));
    };

    const handleEnded = () => {
      setState(prev => ({ ...prev, isPlaying: false }));
    };

    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !STREAM_URL) {
      setState(prev => ({ ...prev, error: 'Stream URL not configured' }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    // Set source and play
    if (!audio.src || audio.src !== STREAM_URL) {
      audio.src = STREAM_URL;
    }

    audio.volume = state.isMuted ? 0 : state.volume;
    audio.play().catch(() => {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to play stream',
      }));
    });
  }, [state.volume, state.isMuted]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = ''; // Clear source to stop buffering
      setState(prev => ({ ...prev, isPlaying: false, isLoading: false }));
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    setState(prev => ({ ...prev, volume: clampedVolume, isMuted: false }));
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  }, []);

  const toggleMute = useCallback(() => {
    setState(prev => {
      const newMuted = !prev.isMuted;
      if (audioRef.current) {
        audioRef.current.volume = newMuted ? 0 : prev.volume;
      }
      return { ...prev, isMuted: newMuted };
    });
  }, []);

  return {
    ...state,
    play,
    pause,
    togglePlay,
    setVolume,
    toggleMute,
  };
}
