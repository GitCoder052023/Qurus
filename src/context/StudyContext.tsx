import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import * as Haptics from 'expo-haptics';
import { SURAHS } from '../data/surahs';
import {
  Bookmark,
  Highlight,
  StudyNote,
  VoiceNote,
  StudyHistoryItem,
  LastStudiedState,
  ReadingPreferences,
  StreakData,
  CompletedAyahsMap,
  DailyStudyRecord,
  NotificationPreferences,
  CelebrationPayload,
  SurahProgress,
  QuranProgress,
  DailyProgress,
  JourneyCheckpoint,
} from '../types';
import {
  trackBookmarkCreated,
  trackHighlightCreated,
  trackNoteCreated,
  trackPreferenceChanged,
  trackOnboardingCompleted,
  trackLegalConsentAgreed,
} from '../lib/analytics';
import {
  scheduleDailyReminderAsync,
  scheduleStreakSaverReminderAsync,
  cancelAllRemindersAsync,
  cancelTonightStreakSaversAsync,
  checkNotificationPermissionAsync,
  promptEnableNotificationsAsync,
} from '../services/notificationEngine';
import { getLocalDateString, getYesterdayDateString } from '../utils/date';
import {
  TOTAL_QURAN_AYAHS,
  STORAGE_KEYS,
  DEFAULT_PREFERENCES,
  DEFAULT_STREAK,
  DEFAULT_NOTIFICATION_PREFS,
  DEFAULT_DAILY_GOAL,
  DEFAULT_JOURNEY_CHECKPOINT,
  loadAllStudyData,
  saveStorageItem,
  removeStorageItem,
  multiRemoveStorageItems,
} from '../services/storage/studyStorage';
import {
  calculateSurahProgress,
  calculateQuranProgress,
  calculateDailyProgress,
  checkAyahInSequence,
} from '../features/study/utils/progress';
import { computeStreakActivity } from '../features/study/utils/streak';

// Re-export constants and date helpers for 100% backward compatibility
export {
  TOTAL_QURAN_AYAHS,
  DEFAULT_JOURNEY_CHECKPOINT,
  getLocalDateString,
  getYesterdayDateString,
};

export interface StudyContextType {
  lastStudied: LastStudiedState | null;
  history: StudyHistoryItem[];
  bookmarks: Bookmark[];
  highlights: Record<string, Highlight>;
  notes: Record<string, StudyNote>;
  preferences: ReadingPreferences;
  streak: StreakData;
  completedAyahs: CompletedAyahsMap;
  dailyActivity: Record<string, DailyStudyRecord>;
  dailyGoalAyahs: number;
  notificationPreferences: NotificationPreferences;
  celebrationPayload: CelebrationPayload | null;
  journeyCheckpoint: JourneyCheckpoint;
  hasOnboarded: boolean;
  hasAgreedLegal: boolean;
  isLoaded: boolean;

  // Actions
  completeOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
  agreeToLegal: () => Promise<void>;
  updateLastStudied: (surahNumber: number, ayahNumber: number, audioPos?: number) => void;
  addToHistory: (surahNumber: number, ayahNumber: number) => void;
  recordStreakActivity: () => void;
  markAyahCompleted: (surahNumber: number, ayahNumber: number, durationSeconds?: number) => void;
  isAyahCompleted: (surahNumber: number, ayahNumber: number) => boolean;
  isAyahInSequence: (surahNumber: number, ayahNumber: number) => boolean;
  setJourneyCheckpoint: (surahNumber: number, ayahNumber: number) => void;
  getSurahProgress: (surahNumber: number) => SurahProgress;
  getQuranProgress: () => QuranProgress;
  getDailyProgress: () => DailyProgress;
  setDailyGoal: (goal: number) => void;
  updateNotificationPreferences: (newPrefs: Partial<NotificationPreferences>) => Promise<void>;
  triggerCelebration: (payload: CelebrationPayload) => void;
  dismissCelebration: () => void;
  toggleBookmark: (surahNumber: number, ayahNumber: number, arabicSnippet?: string, urduSnippet?: string) => boolean;
  isBookmarked: (surahNumber: number, ayahNumber: number) => boolean;
  removeBookmark: (surahNumber: number, ayahNumber: number) => void;
  toggleHighlight: (surahNumber: number, ayahNumber: number) => boolean;
  isHighlighted: (surahNumber: number, ayahNumber: number) => boolean;
  saveNote: (
    surahNumber: number,
    ayahNumber: number,
    text: string,
    arabicSnippet?: string,
    urduSnippet?: string,
    voiceNote?: VoiceNote | null,
    noteId?: string
  ) => string;
  deleteNote: (noteIdOrSurah: string | number, ayahNumber?: number) => void;
  getNotesForAyah: (surahNumber: number, ayahNumber: number) => StudyNote[];
  getNote: (surahNumber: number, ayahNumber: number) => StudyNote | undefined;
  updatePreferences: (newPrefs: Partial<ReadingPreferences>) => void;
  clearHistory: () => void;
  hasNotificationPermission: boolean;
  refreshNotificationPermission: () => Promise<boolean>;
  requestNotificationPermission: () => Promise<boolean>;
}

const StudyContext = createContext<StudyContextType | null>(null);

export function StudyProvider({ children }: { children: ReactNode }) {
  const [lastStudied, setLastStudied] = useState<LastStudiedState | null>(null);
  const [history, setHistory] = useState<StudyHistoryItem[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [highlights, setHighlights] = useState<Record<string, Highlight>>({});
  const [notes, setNotes] = useState<Record<string, StudyNote>>({});
  const [preferences, setPreferences] = useState<ReadingPreferences>(DEFAULT_PREFERENCES);
  const [streak, setStreak] = useState<StreakData>(DEFAULT_STREAK);
  const [completedAyahs, setCompletedAyahs] = useState<CompletedAyahsMap>({});
  const [dailyActivity, setDailyActivity] = useState<Record<string, DailyStudyRecord>>({});
  const [dailyGoalAyahs, setDailyGoalAyahs] = useState<number>(DEFAULT_DAILY_GOAL);
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>(DEFAULT_NOTIFICATION_PREFS);
  const [celebrationPayload, setCelebrationPayload] = useState<CelebrationPayload | null>(null);
  const [journeyCheckpoint, setJourneyCheckpointState] = useState<JourneyCheckpoint>(DEFAULT_JOURNEY_CHECKPOINT);
  const [hasOnboarded, setHasOnboarded] = useState<boolean>(true);
  const [hasAgreedLegal, setHasAgreedLegal] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasNotificationPermission, setHasNotificationPermission] = useState<boolean>(true);

  // Hydrate from Storage
  useEffect(() => {
    async function loadData() {
      try {
        const data = await loadAllStudyData();
        if (data.lastStudied) setLastStudied(data.lastStudied);
        setHistory(data.history);
        setBookmarks(data.bookmarks);
        setHighlights(data.highlights);
        setNotes(data.notes);
        setPreferences(data.preferences);
        setHasOnboarded(data.hasOnboarded);
        setHasAgreedLegal(data.hasAgreedLegal);
        setCompletedAyahs(data.completedAyahs);
        setDailyActivity(data.dailyActivity);
        setDailyGoalAyahs(data.dailyGoalAyahs);
        setNotificationPreferences(data.notificationPreferences);
        setJourneyCheckpointState(data.journeyCheckpoint);
        setStreak(data.streak);

        const today = getLocalDateString();
        if (data.streak.lastActiveDate !== today && data.streak.currentStreak >= 1) {
          scheduleStreakSaverReminderAsync(data.streak.currentStreak).catch(() => {});
        }
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
    trackOnboardingCompleted();
    await saveStorageItem(STORAGE_KEYS.HAS_ONBOARDED, 'true');
  };

  const agreeToLegal = async () => {
    setHasAgreedLegal(true);
    trackLegalConsentAgreed();
    await saveStorageItem(STORAGE_KEYS.HAS_AGREED_LEGAL, 'true');
  };

  const resetOnboarding = async () => {
    setHasOnboarded(false);
    setHasAgreedLegal(false);
    await multiRemoveStorageItems([STORAGE_KEYS.HAS_ONBOARDED, STORAGE_KEYS.HAS_AGREED_LEGAL]);
  };

  const recordStreakActivity = () => {
    setStreak((prev) => {
      const today = getLocalDateString();
      const yesterday = getYesterdayDateString();
      const res = computeStreakActivity(prev, today, yesterday);

      if (!res.changed) {
        return prev;
      }

      cancelTonightStreakSaversAsync().catch(() => {});

      if (res.isMilestone) {
        setTimeout(() => {
          triggerCelebration({
            type: 'streak_milestone',
            title: `${res.updatedStreak.currentStreak}-Day Rhythm Alive! 🔥`,
            subtitle: `Your continuous presence with the Quran has reached ${res.updatedStreak.currentStreak} days.`,
            badgeLabel: `${res.updatedStreak.currentStreak} Days`,
            streakCount: res.updatedStreak.currentStreak,
            previousStreakCount: prev.currentStreak,
            details: 'Consistency is the most beloved quality in study. You are building lifelong clarity.',
            quote: '“The most beloved of deeds to Allah are those that are most consistent, even if they are small.”',
          });
        }, 450);
      } else if (res.wasStreakAtRisk && res.updatedStreak.currentStreak >= 2) {
        setTimeout(() => {
          triggerCelebration({
            type: 'streak_saved',
            title: 'Streak Preserved! 🔥',
            subtitle: `Your ${res.updatedStreak.currentStreak}-day streak is safe from midnight reset.`,
            badgeLabel: `${res.updatedStreak.currentStreak} Days Saved`,
            streakCount: res.updatedStreak.currentStreak,
            previousStreakCount: prev.currentStreak,
            details: 'Just 1 verse was enough to keep your habit unbroken. That single reflection protected days of dedication.',
            quote: '“A small, continuous stream cuts through solid rock. Consistency is your true power.”',
          });
        }, 450);
      }

      saveStorageItem(STORAGE_KEYS.STREAK, res.updatedStreak);
      return res.updatedStreak;
    });
  };

  const triggerCelebration = (payload: CelebrationPayload) => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {}
    setCelebrationPayload(payload);
  };

  const dismissCelebration = () => {
    setCelebrationPayload(null);
  };

  const isAyahInSequence = (surahNumber: number, ayahNumber: number): boolean => {
    return checkAyahInSequence(surahNumber, ayahNumber, journeyCheckpoint, completedAyahs);
  };

  const setJourneyCheckpoint = (surahNumber: number, ayahNumber: number) => {
    const newCp: JourneyCheckpoint = { surahNumber, ayahNumber };
    setJourneyCheckpointState(newCp);
    saveStorageItem(STORAGE_KEYS.JOURNEY_CHECKPOINT, newCp);
  };

  const markAyahCompleted = (surahNumber: number, ayahNumber: number, durationSeconds: number = 20) => {
    const today = getLocalDateString();
    const surahMeta = SURAHS.find((s) => s.number === surahNumber);

    recordStreakActivity();

    const isInSeq = isAyahInSequence(surahNumber, ayahNumber);
    if (!isInSeq) return;

    const isAtCheckpoint = (
      surahNumber === journeyCheckpoint.surahNumber &&
      ayahNumber === journeyCheckpoint.ayahNumber
    );

    if (isAtCheckpoint) {
      const nextAyah = ayahNumber + 1;
      let nextCheckpoint: JourneyCheckpoint;
      if (surahMeta && nextAyah <= surahMeta.numberOfAyahs) {
        nextCheckpoint = { surahNumber, ayahNumber: nextAyah };
      } else if (surahNumber < 114) {
        nextCheckpoint = { surahNumber: surahNumber + 1, ayahNumber: 1 };
      } else {
        nextCheckpoint = { surahNumber: 1, ayahNumber: 1 };
      }
      setJourneyCheckpointState(nextCheckpoint);
      saveStorageItem(STORAGE_KEYS.JOURNEY_CHECKPOINT, nextCheckpoint);
    }

    let justCompletedSurah = false;
    setCompletedAyahs((prev) => {
      const existingForSurah = prev[surahNumber] || [];
      if (existingForSurah.includes(ayahNumber)) {
        return prev;
      }
      const updatedForSurah = [...existingForSurah, ayahNumber].sort((a, b) => a - b);
      const updatedMap = { ...prev, [surahNumber]: updatedForSurah };
      saveStorageItem(STORAGE_KEYS.COMPLETED_AYAHS, updatedMap);

      if (surahMeta && updatedForSurah.length >= surahMeta.numberOfAyahs) {
        justCompletedSurah = true;
      }

      return updatedMap;
    });

    let justMetGoal = false;
    setDailyActivity((prev) => {
      const todayRecord = prev[today] || {
        date: today,
        ayahsCompleted: [],
        secondsSpent: 0,
        reflectionsCount: 0,
      };

      const alreadyInToday = todayRecord.ayahsCompleted.some(
        (item) => item.surahNumber === surahNumber && item.ayahNumber === ayahNumber
      );

      const updatedAyahs = alreadyInToday
        ? todayRecord.ayahsCompleted
        : [...todayRecord.ayahsCompleted, { surahNumber, ayahNumber }];

      const updatedRecord: DailyStudyRecord = {
        ...todayRecord,
        ayahsCompleted: updatedAyahs,
        secondsSpent: todayRecord.secondsSpent + durationSeconds,
      };

      const updatedActivity = { ...prev, [today]: updatedRecord };
      saveStorageItem(STORAGE_KEYS.DAILY_ACTIVITY, updatedActivity);

      if (!alreadyInToday && updatedAyahs.length === dailyGoalAyahs) {
        justMetGoal = true;
      }

      return updatedActivity;
    });

    if (justCompletedSurah && surahMeta) {
      setTimeout(() => {
        triggerCelebration({
          type: 'surah_completed',
          title: `Surah ${surahMeta.englishName} Complete! 🌿`,
          subtitle: `You have reflected upon all ${surahMeta.numberOfAyahs} verses of ${surahMeta.name}.`,
          badgeLabel: 'Surah Complete',
          surahNumber,
          surahName: surahMeta.englishName,
          details: 'May its wisdom stay anchored in your thoughts and character.',
          quote: '“Stop at its wonders, move hearts with it, and let not the concern of any of you be simply to reach the end of the Surah.” — Ibn Mas’ud',
        });
      }, 400);
    } else if (justMetGoal) {
      setTimeout(() => {
        triggerCelebration({
          type: 'daily_goal',
          title: 'Daily Tadabbur Goal Met! ⭐',
          subtitle: `You completed your reflection on ${dailyGoalAyahs} verses today.`,
          badgeLabel: `${dailyGoalAyahs} Verses`,
          ayahsCount: dailyGoalAyahs,
          details: 'A calm, dedicated pause in your day. Keep the meaning close.',
          quote: '“A few verses explored with deep reflection are greater than chapters skimmed without thought.”',
        });
      }, 400);
    }
  };

  const isAyahCompleted = (surahNumber: number, ayahNumber: number): boolean => {
    const list = completedAyahs[surahNumber];
    return Array.isArray(list) && list.includes(ayahNumber);
  };

  const getSurahProgress = (surahNumber: number): SurahProgress => {
    return calculateSurahProgress(surahNumber, completedAyahs);
  };

  const getQuranProgress = (): QuranProgress => {
    return calculateQuranProgress(completedAyahs);
  };

  const getDailyProgress = (): DailyProgress => {
    const today = getLocalDateString();
    return calculateDailyProgress(dailyActivity, dailyGoalAyahs, today);
  };

  const setDailyGoal = (goal: number) => {
    const valid = Math.max(1, Math.min(50, goal));
    setDailyGoalAyahs(valid);
    saveStorageItem(STORAGE_KEYS.DAILY_GOAL, String(valid));
  };

  const updateNotificationPreferences = async (newPrefs: Partial<NotificationPreferences>) => {
    const updated = { ...notificationPreferences, ...newPrefs };
    setNotificationPreferences(updated);
    await saveStorageItem(STORAGE_KEYS.NOTIFICATION_PREFS, updated);

    if (updated.dailyReminderEnabled) {
      const lastSurah = lastStudied ? SURAHS.find((s) => s.number === lastStudied.surahNumber) : null;
      await scheduleDailyReminderAsync(
        updated.reminderHour,
        updated.reminderMinute,
        streak.currentStreak,
        lastSurah?.englishName
      );
      if (updated.streakSaverEnabled && streak.currentStreak > 0) {
        await scheduleStreakSaverReminderAsync(streak.currentStreak);
      }
    } else {
      await cancelAllRemindersAsync();
    }
  };

  const refreshNotificationPermission = async (): Promise<boolean> => {
    const granted = await checkNotificationPermissionAsync();
    setHasNotificationPermission(granted);
    return granted;
  };

  const requestNotificationPermission = async (): Promise<boolean> => {
    const granted = await promptEnableNotificationsAsync();
    setHasNotificationPermission(granted);
    if (granted && notificationPreferences.dailyReminderEnabled) {
      const lastSurah = lastStudied ? SURAHS.find((s) => s.number === lastStudied.surahNumber) : null;
      await scheduleDailyReminderAsync(
        notificationPreferences.reminderHour,
        notificationPreferences.reminderMinute,
        streak.currentStreak,
        lastSurah?.englishName
      );
      if (notificationPreferences.streakSaverEnabled && streak.currentStreak > 0) {
        await scheduleStreakSaverReminderAsync(streak.currentStreak);
      }
    }
    return granted;
  };

  useEffect(() => {
    refreshNotificationPermission();
    const sub = AppState.addEventListener('change', (state: AppStateStatus) => {
      if (state === 'active') {
        refreshNotificationPermission();
      }
    });
    return () => {
      sub.remove();
    };
  }, []);

  const updateLastStudied = (surahNumber: number, ayahNumber: number, audioPos?: number) => {
    const newState: LastStudiedState = {
      surahNumber,
      ayahNumber,
      audioPositionSeconds: audioPos,
      timestamp: Date.now(),
    };
    setLastStudied(newState);
    saveStorageItem(STORAGE_KEYS.LAST_STUDIED, newState);
    addToHistory(surahNumber, ayahNumber);
    recordStreakActivity();
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
      ].slice(0, 50);

      saveStorageItem(STORAGE_KEYS.HISTORY, newHistory);
      return newHistory;
    });
    recordStreakActivity();
  };

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
    saveStorageItem(STORAGE_KEYS.BOOKMARKS, nextBookmarks);
    if (!exists) {
      trackBookmarkCreated();
      recordStreakActivity();
    }
    return !exists;
  };

  const removeBookmark = (surahNumber: number, ayahNumber: number) => {
    const nextBookmarks = bookmarks.filter((b) => !(b.surahNumber === surahNumber && b.ayahNumber === ayahNumber));
    setBookmarks(nextBookmarks);
    saveStorageItem(STORAGE_KEYS.BOOKMARKS, nextBookmarks);
  };

  const isBookmarked = (surahNumber: number, ayahNumber: number): boolean => {
    return bookmarks.some((b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber);
  };

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
    saveStorageItem(STORAGE_KEYS.HIGHLIGHTS, nextHighlights);
    if (added) {
      trackHighlightCreated();
      recordStreakActivity();
    }
    return added;
  };

  const isHighlighted = (surahNumber: number, ayahNumber: number): boolean => {
    return Boolean(highlights[`${surahNumber}:${ayahNumber}`]);
  };

  const getNotesForAyah = (surahNumber: number, ayahNumber: number): StudyNote[] => {
    return Object.values(notes)
      .filter((n) => n.surahNumber === surahNumber && n.ayahNumber === ayahNumber)
      .sort((a, b) => b.createdAt - a.createdAt);
  };

  const getNote = (surahNumber: number, ayahNumber: number): StudyNote | undefined => {
    const list = getNotesForAyah(surahNumber, ayahNumber);
    return list[0];
  };

  const saveNote = (
    surahNumber: number,
    ayahNumber: number,
    text: string,
    arabicSnippet?: string,
    urduSnippet?: string,
    voiceNote?: VoiceNote | null,
    noteId?: string
  ): string => {
    const trimmed = text.trim();
    const existing = noteId ? notes[noteId] : undefined;
    const nextVoice = voiceNote === undefined ? existing?.voiceNote : voiceNote ?? undefined;

    if (!trimmed && !nextVoice) {
      if (noteId) {
        deleteNote(noteId);
      }
      return '';
    }

    const id = noteId || `note_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const newNote: StudyNote = {
      id,
      surahNumber,
      ayahNumber,
      text: trimmed,
      voiceNote: nextVoice,
      arabicSnippet: arabicSnippet || existing?.arabicSnippet || '',
      urduSnippet: urduSnippet || existing?.urduSnippet || '',
      createdAt: existing?.createdAt || Date.now(),
      updatedAt: Date.now(),
    };

    const nextNotes = { ...notes, [id]: newNote };
    setNotes(nextNotes);
    saveStorageItem(STORAGE_KEYS.NOTES, nextNotes);

    const today = getLocalDateString();
    setDailyActivity((prevAct) => {
      const todayRec = prevAct[today] || {
        date: today,
        ayahsCompleted: [],
        secondsSpent: 0,
        reflectionsCount: 0,
      };
      const updatedRec: DailyStudyRecord = {
        ...todayRec,
        reflectionsCount: todayRec.reflectionsCount + 1,
      };
      const nextAct = { ...prevAct, [today]: updatedRec };
      saveStorageItem(STORAGE_KEYS.DAILY_ACTIVITY, nextAct);
      return nextAct;
    });

    trackNoteCreated(Boolean(nextVoice));
    recordStreakActivity();
    return id;
  };

  const deleteNote = (noteIdOrSurah: string | number, ayahNumber?: number) => {
    const nextNotes = { ...notes };
    if (typeof noteIdOrSurah === 'string') {
      delete nextNotes[noteIdOrSurah];
    } else if (typeof noteIdOrSurah === 'number' && typeof ayahNumber === 'number') {
      Object.keys(nextNotes).forEach((id) => {
        const n = nextNotes[id];
        if (n.surahNumber === noteIdOrSurah && n.ayahNumber === ayahNumber) {
          delete nextNotes[id];
        }
      });
    }
    setNotes(nextNotes);
    saveStorageItem(STORAGE_KEYS.NOTES, nextNotes);
  };

  const updatePreferences = (newPrefs: Partial<ReadingPreferences>) => {
    Object.entries(newPrefs).forEach(([k, v]) => {
      if (v !== undefined) {
        trackPreferenceChanged(k, v);
      }
    });
    setPreferences((prev) => {
      const updated = { ...prev, ...newPrefs };
      saveStorageItem(STORAGE_KEYS.PREFERENCES, updated);
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    removeStorageItem(STORAGE_KEYS.HISTORY);
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
        streak,
        completedAyahs,
        dailyActivity,
        dailyGoalAyahs,
        notificationPreferences,
        celebrationPayload,
        journeyCheckpoint,
        hasOnboarded,
        hasAgreedLegal,
        isLoaded,
        completeOnboarding,
        resetOnboarding,
        agreeToLegal,
        updateLastStudied,
        addToHistory,
        recordStreakActivity,
        markAyahCompleted,
        isAyahCompleted,
        isAyahInSequence,
        setJourneyCheckpoint,
        getSurahProgress,
        getQuranProgress,
        getDailyProgress,
        setDailyGoal,
        updateNotificationPreferences,
        triggerCelebration,
        dismissCelebration,
        toggleBookmark,
        isBookmarked,
        removeBookmark,
        toggleHighlight,
        isHighlighted,
        saveNote,
        deleteNote,
        getNotesForAyah,
        getNote,
        updatePreferences,
        clearHistory,
        hasNotificationPermission,
        refreshNotificationPermission,
        requestNotificationPermission,
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
