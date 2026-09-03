import type { ThemeMode } from './theme';
import type { PlaybackMode } from './audio';

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

export interface StudyNote {
  id: string; // e.g. "surah_ayah"
  surahNumber: number;
  ayahNumber: number;
  text: string;
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

export interface ReadingPreferences {
  arabicFontSize: number;
  urduFontSize: number;
  showTranslation: boolean;
  theme: ThemeMode;
  reciterId: string;
  playbackSpeed: number;
  autoScroll: boolean;
  playbackMode: PlaybackMode;
}
