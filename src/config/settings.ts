import type { PlaybackMode, ThemeMode } from '../types';

export const ARABIC_FONT_SIZES = [22, 26, 30, 34] as const;
export const URDU_FONT_SIZES = [13, 15, 17, 19] as const;
export const PLAYBACK_SPEEDS = [0.75, 1.0, 1.25, 1.5] as const;
export const PLAYER_CYCLE_SPEEDS = [1.0, 1.25, 1.5, 0.75] as const;
export const PLAYBACK_MODE_CYCLE: PlaybackMode[] = ['both', 'arabic_only', 'translation_only'];

export const THEME_OPTIONS: Array<{
  key: ThemeMode;
  label: string;
  icon: 'sunny-outline' | 'moon-outline' | 'book-outline' | 'phone-portrait-outline';
  bg: string;
}> = [
  { key: 'light', label: 'Ivory', icon: 'sunny-outline', bg: '#FAF8F5' },
  { key: 'dark', label: 'Dark', icon: 'moon-outline', bg: '#0D1117' },
  { key: 'sepia', label: 'Sepia', icon: 'book-outline', bg: '#F4ECE1' },
  { key: 'system', label: 'Auto', icon: 'phone-portrait-outline', bg: '#88888820' },
];

export const PLAYBACK_MODE_OPTIONS: Array<{
  key: PlaybackMode;
  label: string;
  desc: string;
}> = [
  {
    key: 'both',
    label: 'Arabic + Urdu Translation',
    desc: 'Arabic recitation followed by Urdu translation of each verse',
  },
  {
    key: 'arabic_only',
    label: 'Arabic Recitation Only',
    desc: 'Traditional Arabic recitation without translation audio',
  },
  {
    key: 'translation_only',
    label: 'Urdu Translation Only',
    desc: 'Verse-by-verse Urdu translation audio by Shamshad Ali Khan',
  },
];
