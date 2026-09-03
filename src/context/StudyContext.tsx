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
import { STORAGE_KEYS } from '../config/storageKeys';
import { DEFAULT_PREFERENCES } from '../config/preferences';
import { HISTORY_LIMIT } from '../config/quran';
import { ayahKey } from '../lib/ayahKey';
import { hydrateStudyState } from '../services/storage/studyStorage';
import { writeJson, removeKey } from '../services/storage/asyncJson';

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

  useEffect(() => {
    async function loadData() {
      try {
        const hydrated = await hydrateStudyState();
        if (hydrated.lastStudied) setLastStudied(hydrated.lastStudied);
        if (hydrated.history.length) setHistory(hydrated.history);
        if (hydrated.bookmarks.length) setBookmarks(hydrated.bookmarks);
        if (Object.keys(hydrated.highlights).length) setHighlights(hydrated.highlights);
        if (Object.keys(hydrated.notes).length) setNotes(hydrated.notes);
        setPreferences(hydrated.preferences);
        setHasOnboarded(hydrated.hasOnboarded);
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

  const updateLastStudied = (surahNumber: number, ayahNumber: number, audioPos?: number) => {
    const newState: LastStudiedState = {
      surahNumber,
      ayahNumber,
      audioPositionSeconds: audioPos,
      timestamp: Date.now(),
    };
    setLastStudied(newState);
    writeJson(STORAGE_KEYS.LAST_STUDIED, newState);
    addToHistory(surahNumber, ayahNumber);
  };

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
      ].slice(0, HISTORY_LIMIT);

      writeJson(STORAGE_KEYS.HISTORY, newHistory);
      return newHistory;
    });
  };

  const toggleBookmark = (
    surahNumber: number,
    ayahNumber: number,
    arabicSnippet: string = '',
    urduSnippet: string = ''
  ): boolean => {
    const id = ayahKey(surahNumber, ayahNumber);
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
    writeJson(STORAGE_KEYS.BOOKMARKS, nextBookmarks);
    return !exists;
  };

  const removeBookmark = (surahNumber: number, ayahNumber: number) => {
    const nextBookmarks = bookmarks.filter((b) => !(b.surahNumber === surahNumber && b.ayahNumber === ayahNumber));
    setBookmarks(nextBookmarks);
    writeJson(STORAGE_KEYS.BOOKMARKS, nextBookmarks);
  };

  const isBookmarked = (surahNumber: number, ayahNumber: number): boolean => {
    return bookmarks.some((b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber);
  };

  const toggleHighlight = (surahNumber: number, ayahNumber: number): boolean => {
    const key = ayahKey(surahNumber, ayahNumber);
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
    writeJson(STORAGE_KEYS.HIGHLIGHTS, nextHighlights);
    return added;
  };

  const isHighlighted = (surahNumber: number, ayahNumber: number): boolean => {
    return Boolean(highlights[ayahKey(surahNumber, ayahNumber)]);
  };

  const saveNote = (
    surahNumber: number,
    ayahNumber: number,
    text: string,
    arabicSnippet?: string,
    urduSnippet?: string
  ) => {
    const key = ayahKey(surahNumber, ayahNumber);
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
    writeJson(STORAGE_KEYS.NOTES, nextNotes);
  };

  const deleteNote = (surahNumber: number, ayahNumber: number) => {
    const key = ayahKey(surahNumber, ayahNumber);
    const nextNotes = { ...notes };
    delete nextNotes[key];
    setNotes(nextNotes);
    writeJson(STORAGE_KEYS.NOTES, nextNotes);
  };

  const getNote = (surahNumber: number, ayahNumber: number): StudyNote | undefined => {
    return notes[ayahKey(surahNumber, ayahNumber)];
  };

  const updatePreferences = (newPrefs: Partial<ReadingPreferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...newPrefs };
      writeJson(STORAGE_KEYS.PREFERENCES, updated);
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    removeKey(STORAGE_KEYS.HISTORY);
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
