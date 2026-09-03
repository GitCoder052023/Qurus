import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../config/storageKeys';
import { DEFAULT_PREFERENCES } from '../../config/preferences';
import type {
  Bookmark,
  Highlight,
  LastStudiedState,
  ReadingPreferences,
  StudyHistoryItem,
  StudyNote,
} from '../../types';
import { readJson } from './asyncJson';

export interface HydratedStudyState {
  lastStudied: LastStudiedState | null;
  history: StudyHistoryItem[];
  bookmarks: Bookmark[];
  highlights: Record<string, Highlight>;
  notes: Record<string, StudyNote>;
  preferences: ReadingPreferences;
  hasOnboarded: boolean;
}

export async function hydrateStudyState(): Promise<HydratedStudyState> {
  const [savedLast, savedHistory, savedBookmarks, savedHighlights, savedNotes, savedPrefs, savedOnboard] =
    await Promise.all([
      readJson<LastStudiedState>(STORAGE_KEYS.LAST_STUDIED),
      readJson<StudyHistoryItem[]>(STORAGE_KEYS.HISTORY),
      readJson<Bookmark[]>(STORAGE_KEYS.BOOKMARKS),
      readJson<Record<string, Highlight>>(STORAGE_KEYS.HIGHLIGHTS),
      readJson<Record<string, StudyNote>>(STORAGE_KEYS.NOTES),
      readJson<Partial<ReadingPreferences>>(STORAGE_KEYS.PREFERENCES),
      AsyncStorage.getItem(STORAGE_KEYS.HAS_ONBOARDED),
    ]);

  return {
    lastStudied: savedLast,
    history: savedHistory ?? [],
    bookmarks: savedBookmarks ?? [],
    highlights: savedHighlights ?? {},
    notes: savedNotes ?? {},
    preferences: savedPrefs ? { ...DEFAULT_PREFERENCES, ...savedPrefs } : DEFAULT_PREFERENCES,
    hasOnboarded: savedOnboard === 'true',
  };
}
