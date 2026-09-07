import { TranslationLanguage } from '../../types';

export const SETTINGS_LANGUAGES: TranslationLanguage[] = [
  'urdu',
  'english',
  'bengali',
  'turkish',
  'french',
];

export const FONT_SIZES_ARABIC = [22, 26, 30, 34];
export const FONT_SIZES_URDU = [13, 15, 17, 19];
export const PLAYBACK_SPEEDS = [0.75, 1.0, 1.25, 1.5];
export const DAILY_GOAL_OPTIONS = [3, 5, 10, 15];

export const REMINDER_TIME_OPTIONS = [
  { label: 'Morning 7:00 AM', hour: 7, minute: 0 },
  { label: 'Midday 1:30 PM', hour: 13, minute: 30 },
  { label: 'Evening 8:30 PM', hour: 20, minute: 30 },
  { label: 'Night 10:00 PM', hour: 22, minute: 0 },
];
