import type { PlaybackMode } from '../types';
import { PLAYBACK_MODE_CYCLE, PLAYER_CYCLE_SPEEDS } from '../config/settings';

export function getPlaybackModeLabel(mode: PlaybackMode): string {
  switch (mode) {
    case 'both':
      return 'Arabic + Urdu';
    case 'arabic_only':
      return 'Arabic Only';
    case 'translation_only':
      return 'Urdu Only';
  }
}

export function nextPlaybackMode(current: PlaybackMode): PlaybackMode {
  const nextIndex = (PLAYBACK_MODE_CYCLE.indexOf(current) + 1) % PLAYBACK_MODE_CYCLE.length;
  return PLAYBACK_MODE_CYCLE[nextIndex];
}

export function nextPlaybackSpeed(current: number): number {
  const currentIndex = PLAYER_CYCLE_SPEEDS.indexOf(current as (typeof PLAYER_CYCLE_SPEEDS)[number]);
  const nextIndex = (currentIndex + 1) % PLAYER_CYCLE_SPEEDS.length;
  return PLAYER_CYCLE_SPEEDS[nextIndex];
}
