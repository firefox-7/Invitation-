import { useCallback, useEffect, useRef, useState } from 'react';
import { Music, VolumeX } from 'lucide-react';
import type { WeddingConfig } from '../types/wedding';
import {
  clampVolume,
  computeFadeStepVolume,
  getNextMusicToggleState,
  shouldResumeOnFirstGesture,
  shouldStopMusicForBlur,
  shouldStopMusicForVisibility,
  type MusicPlaybackState,
} from '../utils/weddingHelpers';

interface AmbientMusicPlayerProps {
  config: WeddingConfig['music'];
  isVisible: boolean;
}

export function AmbientMusicPlayer({
  config,
  isVisible,
}: AmbientMusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const playbackStateRef = useRef<MusicPlaybackState>('idle');
  const wasPlayingBeforeHideRef = useRef(false);
  const suspendedByScreenRef = useRef(false);

  const [playbackState, setPlaybackState] =
    useState<MusicPlaybackState>('idle');

  const updatePlaybackState = useCallback((next: MusicPlaybackState) => {
    playbackStateRef.current = next;
    setPlaybackState(next);
  }, []);

  const cancelFade = useCallback(() => {
    if (fadeTimerRef.current !== null) {
      window.clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }, []);

  const rampVolumeIn = useCallback(
    (audio: HTMLAudioElement) => {
      cancelFade();
      const targetVol = clampVolume(config.volume);
      const duration = Math.max(0, config.fadeDurationMs);

      if (duration === 0) {
        audio.volume = targetVol;
        return;
      }

      audio.volume = Math.min(targetVol, 0.005);
      const startTime = Date.now();

      fadeTimerRef.current = window.setInterval(() => {
        if (
          playbackStateRef.current !== 'playing' ||
          suspendedByScreenRef.current ||
          shouldStopMusicForVisibility({
            hidden: document.hidden,
            visibilityState: document.visibilityState,
          })
        ) {
          audio.volume = 0;
          audio.pause();
          cancelFade();
          return;
        }
        const elapsed = Date.now() - startTime;
        audio.volume = computeFadeStepVolume(targetVol, elapsed, duration);
        if (elapsed >= duration) {
          audio.volume = targetVol;
          cancelFade();
        }
      }, 60);
    },
    [cancelFade, config.fadeDurationMs, config.volume]
  );

  const stopAudioImmediately = useCallback(
    (nextState: 'paused-by-user' | 'paused-by-screen' | 'awaiting-gesture') => {
      cancelFade();
      const audio = audioRef.current;
      if (audio) {
        audio.volume = 0;
        audio.pause();
      }
      if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
        try {
          navigator.mediaSession.playbackState = 'none';
        } catch {
          // Ignore browsers that restrict mediaSession updates
        }
      }
      updatePlaybackState(nextState);
    },
    [cancelFade, updatePlaybackState]
  );

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !config.enabled) return;

    if (
      shouldStopMusicForVisibility({
        hidden: document.hidden,
        visibilityState: document.visibilityState,
      })
    ) {
      suspendedByScreenRef.current = true;
      wasPlayingBeforeHideRef.current = true;
      stopAudioImmediately('paused-by-screen');
      return;
    }

    try {
      suspendedByScreenRef.current = false;
      audio.volume = 0;
      updatePlaybackState('playing');
      await audio.play();

      if (
        playbackStateRef.current !== 'playing' ||
        suspendedByScreenRef.current ||
        shouldStopMusicForVisibility({
          hidden: document.hidden,
          visibilityState: document.visibilityState,
        })
      ) {
        audio.volume = 0;
        audio.pause();
        if (playbackStateRef.current === 'playing') {
          updatePlaybackState('paused-by-screen');
        }
        return;
      }

      rampVolumeIn(audio);
    } catch {
      cancelFade();
      updatePlaybackState('awaiting-gesture');
    }
  }, [
    cancelFade,
    config.enabled,
    rampVolumeIn,
    stopAudioImmediately,
    updatePlaybackState,
  ]);

  // Attempt subtle autoplay on mount; fall back cleanly to awaiting first tap
  useEffect(() => {
    if (!config.enabled) return;
    void startPlayback();

    return () => {
      cancelFade();
      const audio = audioRef.current;
      if (audio) {
        audio.volume = 0;
        audio.pause();
      }
    };
  }, [cancelFade, config.enabled, startPlayback]);

  // Unlock playback gently on the guest's first tap or keypress if browser blocked autoplay
  useEffect(() => {
    if (playbackState !== 'awaiting-gesture') return;

    const handleFirstGesture = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-testid="music-toggle-button"]')) {
        return;
      }
      if (shouldResumeOnFirstGesture(playbackStateRef.current)) {
        void startPlayback();
      }
    };

    window.addEventListener('pointerdown', handleFirstGesture, {
      passive: true,
      once: true,
    });
    window.addEventListener('keydown', handleFirstGesture, {
      passive: true,
      once: true,
    });

    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, [playbackState, startPlayback]);

  // Stop audio immediately whenever user locks screen, switches apps/tabs, minimizes, or closes page
  useEffect(() => {
    const suspendForScreenLeave = (allowResumeLater: boolean) => {
      const audio = audioRef.current;
      const wasActive =
        wasPlayingBeforeHideRef.current ||
        playbackStateRef.current === 'playing' ||
        Boolean(audio && !audio.paused);

      suspendedByScreenRef.current = true;
      wasPlayingBeforeHideRef.current = allowResumeLater && wasActive;
      if (playbackStateRef.current !== 'paused-by-user') {
        stopAudioImmediately('paused-by-screen');
      } else if (audio) {
        audio.volume = 0;
        audio.pause();
      }
    };

    const resumeIfPreviouslyPlaying = () => {
      if (
        shouldStopMusicForVisibility({
          hidden: document.hidden,
          visibilityState: document.visibilityState,
        })
      ) {
        return;
      }
      suspendedByScreenRef.current = false;
      if (
        wasPlayingBeforeHideRef.current &&
        playbackStateRef.current !== 'paused-by-user'
      ) {
        wasPlayingBeforeHideRef.current = false;
        void startPlayback();
      }
    };

    const handleVisibilityChange = () => {
      if (
        shouldStopMusicForVisibility({
          hidden: document.hidden,
          visibilityState: document.visibilityState,
        })
      ) {
        suspendForScreenLeave(true);
      } else {
        resumeIfPreviouslyPlaying();
      }
    };

    const handleWindowBlur = () => {
      if (
        shouldStopMusicForBlur({
          hidden: document.hidden,
          visibilityState: document.visibilityState,
          activeElementTagName: document.activeElement?.tagName,
        })
      ) {
        suspendForScreenLeave(true);
      }
    };

    const handleWindowFocus = () => {
      resumeIfPreviouslyPlaying();
    };

    const handlePageHide = () => {
      suspendForScreenLeave(false);
    };

    const handleFreeze = () => {
      suspendForScreenLeave(false);
    };

    const handleBeforeUnload = () => {
      suspendForScreenLeave(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('freeze', handleFreeze);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('pageshow', handleWindowFocus);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('freeze', handleFreeze);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('pageshow', handleWindowFocus);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [startPlayback, stopAudioImmediately]);

  if (!config.enabled) {
    return null;
  }

  const handleToggle = () => {
    const nextState = getNextMusicToggleState(playbackState);
    if (nextState === 'paused-by-user') {
      wasPlayingBeforeHideRef.current = false;
      stopAudioImmediately('paused-by-user');
    } else {
      void startPlayback();
    }
  };

  const isPlaying = playbackState === 'playing';
  const isMutedByUser = playbackState === 'paused-by-user';

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        aria-hidden="true"
      >
        <source src={config.audioUrl} type="audio/mpeg" />
        {config.fallbackAudioUrl && (
          <source src={config.fallbackAudioUrl} type="audio/ogg" />
        )}
      </audio>

      <button
        type="button"
        data-testid="music-toggle-button"
        data-music-state={playbackState}
        onClick={handleToggle}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? config.pauseLabel : config.playLabel}
        title={isPlaying ? config.pauseLabel : config.playLabel}
        className={`fixed bottom-5 right-5 z-40 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center bg-[#FFFFFF]/95 backdrop-blur-md border border-[#B38728]/65 text-[#A82E18] shadow-sm hover:border-[#A82E18] hover:bg-[#FDFBF7] active:scale-95 transition-all duration-500 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A82E18] ${
          isVisible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        {isPlaying ? (
          <span
            aria-hidden="true"
            className="flex items-end justify-center gap-[3px] h-3.5 w-4"
          >
            <span className="w-[2px] h-3.5 bg-[#B38728] rounded-full music-bar-1" />
            <span className="w-[2px] h-3.5 bg-[#A82E18] rounded-full music-bar-2" />
            <span className="w-[2px] h-3.5 bg-[#B38728] rounded-full music-bar-3" />
          </span>
        ) : isMutedByUser ? (
          <VolumeX className="w-4 h-4 text-[#A82E18]/85" aria-hidden="true" />
        ) : (
          <Music className="w-4 h-4 text-[#B38728]" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
