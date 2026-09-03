import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Bookmark,
  Highlight,
  StudyNote,
  StudyHistoryItem,
  LastStudiedState,
  ReadingPreferences,
} from '../types';

const STORAGE_KEYS = {
  LAST_STUDIED: '@qurus_last_studied_v1',
  HISTORY: '@qurus_history_v1',
  BOOKMARKS: '@qurus_bookmarks_v1',
  HIGHLIGHTS: '@qurus_highlights_v1',
  NOTES: '@qurus_notes_v1',
  PREFERENCES: '@qurus_preferences_v1',
  HAS_ONBOARDED: '@qurus_has_onboarded_v1',
};

const DEFAULT_PREFERENCES: ReadingPreferences = {
  arabicFontSize: 28,
  urduFontSize: 16,
  showTranslation: true,
  theme: 'light',
  reciterId: 'alafasy',
  playbackSpeed: 1.0,
  autoScroll: true,
  playbackMode: 'both',
};

interface StudyContextType {
  lastStudied: LastStudiedState | null;
  history: StudyHistoryItem[];
  bookmarks: Bookmark[];
  highlights: Record<string, Highlight>; // key: "surah_ayah"
  notes: Record<string, StudyNote>; // key: "surah_ayah"
  preferences: ReadingPreferences;
  hasOnboarded: boolean;
  isLoaded: boolean;

  // Actions
  completeOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
  updateLastStudied: (surahNumber: number, ayahNumber: number, audioPos?: number) => void;
  addToHistory: (surahNumber: number, ayahNumber: number) => void;
  toggleBookmark: (surahNumber: number, ayahNumber: number, arabicSnippet?: string, urduSnippet?: string) => boolean;
  isBookmarked: (surahNumber: number, ayahNumber: number) => boolean;
  removeBookmark: (surahNumber: number, ayahNumber: number) => void;
  toggleHighlight: (surahNumber: number, ayahNumber: number) => boolean;
  isHighlighted: (surahNumber: number, ayahNumber: number) => boolean;
  saveNote: (surahNumber: number, ayahNumber: number, text: string, arabicSnippet?: string, urduSnippet?: string) => void;
  deleteNote: (surahNumber: number, ayahNumber: number) => void;
  getNote: (surahNumber: number, ayahNumber: number) => StudyNote | undefined;
  updatePreferences: (newPrefs: Partial<ReadingPreferences>) => void;
  clearHistory: () => void;
  exportBackup: () => string;
}

const StudyContext = createContext<StudyContextType | null>(null);

export function StudyProvider({ children }: { children: ReactNode }) {
  const [lastStudied, setLastStudied] = useState<LastStudiedState | null>(null);
  const [history, setHistory] = useState<StudyHistoryItem[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [highlights, setHighlights] = useState<Record<string, Highlight>>({});
  const [notes, setNotes] = useState<Record<string, StudyNote>>({});
  const [preferences, setPreferences] = useState<ReadingPreferences>(DEFAULT_PREFERENCES);
  const [hasOnboarded, setHasOnboarded] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hydrate from AsyncStorage
  useEffect(() => {
    async function loadData() {
      try {
        const [savedLast, savedHistory, savedBookmarks, savedHighlights, savedNotes, savedPrefs, savedOnboard] =
          await Promise.all([
            AsyncStorage.getItem(STORAGE_KEYS.LAST_STUDIED),
            AsyncStorage.getItem(STORAGE_KEYS.HISTORY),
            AsyncStorage.getItem(STORAGE_KEYS.BOOKMARKS),
            AsyncStorage.getItem(STORAGE_KEYS.HIGHLIGHTS),
            AsyncStorage.getItem(STORAGE_KEYS.NOTES),
            AsyncStorage.getItem(STORAGE_KEYS.PREFERENCES),
            AsyncStorage.getItem(STORAGE_KEYS.HAS_ONBOARDED),
          ]);

        if (savedLast) setLastStudied(JSON.parse(savedLast));
        if (savedHistory) setHistory(JSON.parse(savedHistory));
        if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
        if (savedHighlights) setHighlights(JSON.parse(savedHighlights));
        if (savedNotes) setNotes(JSON.parse(savedNotes));
        if (savedPrefs) setPreferences({ ...DEFAULT_PREFERENCES, ...JSON.parse(savedPrefs) });
        setHasOnboarded(savedOnboard === 'true');
      } catch (err) {
        console.error('Failed to load study state from storage:', err);
      } finally {
        setIsLoaded(true);
      }
    }
    loadData();
  }, []);

  const completeOnboarding = async () => {
    setHasOnboarded(true);
    await AsyncStorage.setItem(STORAGE_KEYS.HAS_ONBOARDED, 'true').catch(console.error);
  };

  const resetOnboarding = async () => {
    setHasOnboarded(false);
    await AsyncStorage.removeItem(STORAGE_KEYS.HAS_ONBOARDED).catch(console.error);
  };

  // Update Last Studied
  const updateLastStudied = (surahNumber: number, ayahNumber: number, audioPos?: number) => {
    const newState: LastStudiedState = {
      surahNumber,
      ayahNumber,
      audioPositionSeconds: audioPos,
      timestamp: Date.now(),
    };
    setLastStudied(newState);
    AsyncStorage.setItem(STORAGE_KEYS.LAST_STUDIED, JSON.stringify(newState)).catch(console.error);

    // Also record in history
    addToHistory(surahNumber, ayahNumber);
  };

  // Add to History
  const addToHistory = (surahNumber: number, ayahNumber: number) => {
    setHistory((prev) => {
      const filtered = prev.filter((h) => !(h.surahNumber === surahNumber && h.ayahNumber === ayahNumber));
      const newHistory = [
        {
          id: `${surahNumber}:${ayahNumber}_${Date.now()}`,
          surahNumber,
          ayahNumber,
          timestamp: Date.now(),
        },
        ...filtered,
      ].slice(0, 50); // limit to 50 items

      AsyncStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(newHistory)).catch(console.error);
      return newHistory;
    });
  };

  // Toggle Bookmark
  const toggleBookmark = (
    surahNumber: number,
    ayahNumber: number,
    arabicSnippet: string = '',
    urduSnippet: string = ''
  ): boolean => {
    const id = `${surahNumber}:${ayahNumber}`;
    const exists = bookmarks.some((b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber);

    let nextBookmarks: Bookmark[];
    if (exists) {
      nextBookmarks = bookmarks.filter((b) => !(b.surahNumber === surahNumber && b.ayahNumber === ayahNumber));
    } else {
      const newBm: Bookmark = {
        id,
        surahNumber,
        ayahNumber,
        createdAt: Date.now(),
        arabicSnippet,
        urduSnippet,
      };
      nextBookmarks = [newBm, ...bookmarks];
    }

    setBookmarks(nextBookmarks);
    AsyncStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(nextBookmarks)).catch(console.error);
    return !exists;
  };

  const removeBookmark = (surahNumber: number, ayahNumber: number) => {
    const nextBookmarks = bookmarks.filter((b) => !(b.surahNumber === surahNumber && b.ayahNumber === ayahNumber));
    setBookmarks(nextBookmarks);
    AsyncStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(nextBookmarks)).catch(console.error);
  };

  const isBookmarked = (surahNumber: number, ayahNumber: number): boolean => {
    return bookmarks.some((b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber);
  };

  // Toggle Highlight
  const toggleHighlight = (surahNumber: number, ayahNumber: number): boolean => {
    const key = `${surahNumber}:${ayahNumber}`;
    const nextHighlights = { ...highlights };
    let added = false;

    if (nextHighlights[key]) {
      delete nextHighlights[key];
    } else {
      nextHighlights[key] = {
        id: key,
        surahNumber,
        ayahNumber,
        createdAt: Date.now(),
      };
      added = true;
    }

    setHighlights(nextHighlights);
    AsyncStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(nextHighlights)).catch(console.error);
    return added;
  };

  const isHighlighted = (surahNumber: number, ayahNumber: number): boolean => {
    return Boolean(highlights[`${surahNumber}:${ayahNumber}`]);
  };

  // Notes
  const saveNote = (
    surahNumber: number,
    ayahNumber: number,
    text: string,
    arabicSnippet?: string,
    urduSnippet?: string
  ) => {
    const key = `${surahNumber}:${ayahNumber}`;
    const trimmed = text.trim();

    if (!trimmed) {
      deleteNote(surahNumber, ayahNumber);
      return;
    }

    const existing = notes[key];
    const newNote: StudyNote = {
      id: key,
      surahNumber,
      ayahNumber,
      text: trimmed,
      arabicSnippet: arabicSnippet || existing?.arabicSnippet || '',
      urduSnippet: urduSnippet || existing?.urduSnippet || '',
      createdAt: existing?.createdAt || Date.now(),
      updatedAt: Date.now(),
    };

    const nextNotes = { ...notes, [key]: newNote };
    setNotes(nextNotes);
    AsyncStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(nextNotes)).catch(console.error);
  };

  const deleteNote = (surahNumber: number, ayahNumber: number) => {
    const key = `${surahNumber}:${ayahNumber}`;
    const nextNotes = { ...notes };
    delete nextNotes[key];
    setNotes(nextNotes);
    AsyncStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(nextNotes)).catch(console.error);
  };

  const getNote = (surahNumber: number, ayahNumber: number): StudyNote | undefined => {
    return notes[`${surahNumber}:${ayahNumber}`];
  };

  // Preferences
  const updatePreferences = (newPrefs: Partial<ReadingPreferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...newPrefs };
      AsyncStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated)).catch(console.error);
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    AsyncStorage.removeItem(STORAGE_KEYS.HISTORY).catch(console.error);
  };

  const exportBackup = (): string => {
    const backup = {
      version: 1,
      exportedAt: new Date().toISOString(),
      lastStudied,
      bookmarks,
      highlights,
      notes,
      preferences,
    };
    return JSON.stringify(backup, null, 2);
  };

  return (
    <StudyContext.Provider
      value={{
        lastStudied,
        history,
        bookmarks,
        highlights,
        notes,
        preferences,
        hasOnboarded,
        isLoaded,
        completeOnboarding,
        resetOnboarding,
        updateLastStudied,
        addToHistory,
        toggleBookmark,
        isBookmarked,
        removeBookmark,
        toggleHighlight,
        isHighlighted,
        saveNote,
        deleteNote,
        getNote,
        updatePreferences,
        clearHistory,
        exportBackup,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
}

export function useStudyState() {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudyState must be used within a StudyProvider');
  }
  return context;
}
