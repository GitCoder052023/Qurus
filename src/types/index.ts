export type RevelationType = 'Meccan' | 'Medinan';

export interface SurahMetadata {
  number: number;
  name: string; // Arabic name
  englishName: string;
  englishNameTranslation: string;
  urduName: string;
  numberOfAyahs: number;
  revelationType: RevelationType;
  juzStart: number;
}

export interface Ayah {
  numberInSurah: number;
  globalNumber: number;
  arabicText: string;
  urduText: string;
  englishText?: string;
  translations?: Partial<Record<TranslationLanguage, string>>;
  juz: number;
  page?: number;
  ruku?: number;
  hizbQuarter?: number;
  sajda?: boolean;
}

export interface SurahData extends SurahMetadata {
  ayahs: Ayah[];
}

export interface Bookmark {
  id: string; // e.g. "surah_ayah"
  surahNumber: number;
  ayahNumber: number;
  createdAt: number;
  arabicSnippet: string;
  urduSnippet: string;
}

export interface Highlight {
  id: string; // e.g. "surah_ayah"
  surahNumber: number;
  ayahNumber: number;
  createdAt: number;
}

export interface VoiceNote {
  uri: string;
  durationMillis: number;
}

export interface StudyNote {
  id: string; // Unique note identifier
  surahNumber: number;
  ayahNumber: number;
  text: string;
  voiceNote?: VoiceNote;
  arabicSnippet?: string;
  urduSnippet?: string;
  createdAt: number;
  updatedAt: number;
}

export interface StudyHistoryItem {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  timestamp: number;
}

export interface LastStudiedState {
  surahNumber: number;
  ayahNumber: number;
  audioPositionSeconds?: number;
  timestamp: number;
}

export type ThemeMode = 'light' | 'dark' | 'sepia' | 'system';

export type PlaybackMode = 'both' | 'arabic_only' | 'translation_only';
export type PlaybackPhase = 'arabic' | 'translation';

export type TranslationLanguage =
  | 'urdu'
  | 'english'
  | 'bengali'
  | 'turkish'
  | 'french';

export interface ReadingPreferences {
  arabicFontSize: number;
  urduFontSize: number;
  showTranslation: boolean;
  theme: ThemeMode;
  reciterId: string;
  playbackSpeed: number;
  autoScroll: boolean;
  playbackMode: PlaybackMode;
  translationLanguage: TranslationLanguage;
}

export interface Reciter {
  id: string;
  name: string;
  arabicName: string;
  subfolder: string; // e.g. "Alafasy_128kbps"
}

export interface StreakData {
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string | null; // YYYY-MM-DD
  activeDates: string[]; // List of YYYY-MM-DD dates
}

export type CompletedAyahsMap = Record<number, number[]>;

export interface DailyStudyRecord {
  date: string; // YYYY-MM-DD
  ayahsCompleted: { surahNumber: number; ayahNumber: number }[];
  secondsSpent: number;
  reflectionsCount: number;
}

export interface NotificationPreferences {
  dailyReminderEnabled: boolean;
  reminderHour: number; // 0 - 23
  reminderMinute: number; // 0 - 59
  streakSaverEnabled: boolean;
}

export type CelebrationType = 'surah_completed' | 'daily_goal' | 'streak_milestone' | 'streak_saved';

export interface CelebrationPayload {
  type: CelebrationType;
  title: string;
  subtitle: string;
  badgeLabel?: string;
  details?: string;
  quote?: string;
  surahNumber?: number;
  surahName?: string;
  streakCount?: number;
  previousStreakCount?: number;
  ayahsCount?: number;
}

export interface SurahProgress {
  surahNumber: number;
  completedCount: number;
  totalCount: number;
  percent: number;
  isCompleted: boolean;
  estimatedMinutesRemaining: number;
}

export interface QuranProgress {
  completedAyahs: number;
  totalAyahs: number; // 6236
  percent: number;
  completedSurahsCount: number;
  totalSurahs: number; // 114
}

export interface DailyProgress {
  ayahsToday: number;
  goalAyahs: number;
  percent: number;
  isGoalMet: boolean;
  secondsToday: number;
  minutesToday: number;
}

export interface JourneyCheckpoint {
  surahNumber: number;
  ayahNumber: number;
}

