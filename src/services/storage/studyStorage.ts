import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ReadingPreferences,
  StreakData,
  NotificationPreferences,
  JourneyCheckpoint,
  StudyNote,
  StudyHistoryItem,
  Bookmark,
  Highlight,
  CompletedAyahsMap,
  DailyStudyRecord,
  LastStudiedState,
} from '../../types';
import { getLocalDateString, getYesterdayDateString } from '../../utils/date';

export const TOTAL_QURAN_AYAHS = 6236;

export const STORAGE_KEYS = {
  LAST_STUDIED: '@qurus_last_studied_v1',
  HISTORY: '@qurus_history_v1',
  BOOKMARKS: '@qurus_bookmarks_v1',
  HIGHLIGHTS: '@qurus_highlights_v1',
  NOTES: '@qurus_notes_v1',
  PREFERENCES: '@qurus_preferences_v1',
  HAS_ONBOARDED: '@qurus_has_onboarded_v1',
  HAS_AGREED_LEGAL: '@qurus_has_agreed_legal_v1',
  STREAK: '@qurus_streak_v1',
  COMPLETED_AYAHS: '@qurus_completed_ayahs_v1',
  DAILY_ACTIVITY: '@qurus_daily_activity_v1',
  DAILY_GOAL: '@qurus_daily_goal_v1',
  NOTIFICATION_PREFS: '@qurus_notification_prefs_v1',
  JOURNEY_CHECKPOINT: '@qurus_journey_checkpoint_v1',
};

export const DEFAULT_PREFERENCES: ReadingPreferences = {
  arabicFontSize: 28,
  urduFontSize: 16,
  showTranslation: true,
  theme: 'light',
  reciterId: 'alafasy',
  playbackSpeed: 1.0,
  autoScroll: true,
  playbackMode: 'both',
  translationLanguage: 'urdu',
};

export const DEFAULT_STREAK: StreakData = {
  currentStreak: 0,
  bestStreak: 0,
  lastActiveDate: null,
  activeDates: [],
};

export const DEFAULT_NOTIFICATION_PREFS: NotificationPreferences = {
  dailyReminderEnabled: true,
  reminderHour: 20, // 8:30 PM
  reminderMinute: 30,
  streakSaverEnabled: true,
};

export const DEFAULT_DAILY_GOAL = 5;

export const DEFAULT_JOURNEY_CHECKPOINT: JourneyCheckpoint = {
  surahNumber: 1,
  ayahNumber: 1,
};

export function normalizeLoadedNotes(parsed: any): Record<string, StudyNote> {
  const normalizedNotes: Record<string, StudyNote> = {};
  if (Array.isArray(parsed)) {
    parsed.forEach((n) => {
      if (n && n.id) normalizedNotes[n.id] = n;
    });
  } else if (typeof parsed === 'object' && parsed !== null) {
    Object.entries(parsed).forEach(([key, note]: [string, any]) => {
      if (note) {
        const noteId = note.id || key;
        normalizedNotes[noteId] = {
          ...note,
          id: noteId,
        };
      }
    });
  }
  return normalizedNotes;
}

export async function saveStorageItem(key: string, value: any): Promise<void> {
  try {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, serialized);
  } catch (e) {
    console.error(`Failed to save ${key} to storage:`, e);
  }
}

export async function removeStorageItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(`Failed to remove ${key} from storage:`, e);
  }
}

export async function multiRemoveStorageItems(keys: string[]): Promise<void> {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    console.error(`Failed to multi-remove keys from storage:`, e);
  }
}

export interface HydratedStudyData {
  lastStudied: LastStudiedState | null;
  history: StudyHistoryItem[];
  bookmarks: Bookmark[];
  highlights: Record<string, Highlight>;
  notes: Record<string, StudyNote>;
  preferences: ReadingPreferences;
  hasOnboarded: boolean;
  hasAgreedLegal: boolean;
  completedAyahs: CompletedAyahsMap;
  dailyActivity: Record<string, DailyStudyRecord>;
  dailyGoalAyahs: number;
  notificationPreferences: NotificationPreferences;
  journeyCheckpoint: JourneyCheckpoint;
  streak: StreakData;
}

export async function loadAllStudyData(): Promise<HydratedStudyData> {
  const [
    savedLast,
    savedHistory,
    savedBookmarks,
    savedHighlights,
    savedNotes,
    savedPrefs,
    savedOnboard,
    savedLegal,
    savedStreak,
    savedCompletedAyahs,
    savedDailyActivity,
    savedDailyGoal,
    savedNotifPrefs,
    savedCheckpoint,
  ] = await Promise.all([
    AsyncStorage.getItem(STORAGE_KEYS.LAST_STUDIED),
    AsyncStorage.getItem(STORAGE_KEYS.HISTORY),
    AsyncStorage.getItem(STORAGE_KEYS.BOOKMARKS),
    AsyncStorage.getItem(STORAGE_KEYS.HIGHLIGHTS),
    AsyncStorage.getItem(STORAGE_KEYS.NOTES),
    AsyncStorage.getItem(STORAGE_KEYS.PREFERENCES),
    AsyncStorage.getItem(STORAGE_KEYS.HAS_ONBOARDED),
    AsyncStorage.getItem(STORAGE_KEYS.HAS_AGREED_LEGAL),
    AsyncStorage.getItem(STORAGE_KEYS.STREAK),
    AsyncStorage.getItem(STORAGE_KEYS.COMPLETED_AYAHS),
    AsyncStorage.getItem(STORAGE_KEYS.DAILY_ACTIVITY),
    AsyncStorage.getItem(STORAGE_KEYS.DAILY_GOAL),
    AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATION_PREFS),
    AsyncStorage.getItem(STORAGE_KEYS.JOURNEY_CHECKPOINT),
  ]);

  let lastStudied: LastStudiedState | null = null;
  if (savedLast) {
    try { lastStudied = JSON.parse(savedLast); } catch {}
  }

  let history: StudyHistoryItem[] = [];
  if (savedHistory) {
    try { history = JSON.parse(savedHistory); } catch {}
  }

  let bookmarks: Bookmark[] = [];
  if (savedBookmarks) {
    try { bookmarks = JSON.parse(savedBookmarks); } catch {}
  }

  let highlights: Record<string, Highlight> = {};
  if (savedHighlights) {
    try { highlights = JSON.parse(savedHighlights); } catch {}
  }

  let notes: Record<string, StudyNote> = {};
  if (savedNotes) {
    try {
      notes = normalizeLoadedNotes(JSON.parse(savedNotes));
    } catch (e) {
      console.error('Failed to parse notes from storage:', e);
    }
  }

  let preferences: ReadingPreferences = DEFAULT_PREFERENCES;
  if (savedPrefs) {
    try {
      preferences = {
        ...DEFAULT_PREFERENCES,
        ...JSON.parse(savedPrefs),
        theme: 'light',
      };
    } catch {}
  }

  const hasOnboarded = savedOnboard === 'true';
  const hasAgreedLegal = savedLegal === 'true';

  let completedAyahs: CompletedAyahsMap = {};
  if (savedCompletedAyahs) {
    try { completedAyahs = JSON.parse(savedCompletedAyahs); } catch {}
  }

  let dailyActivity: Record<string, DailyStudyRecord> = {};
  if (savedDailyActivity) {
    try { dailyActivity = JSON.parse(savedDailyActivity); } catch {}
  }

  let dailyGoalAyahs = DEFAULT_DAILY_GOAL;
  if (savedDailyGoal) {
    const numGoal = parseInt(savedDailyGoal, 10);
    if (!isNaN(numGoal) && numGoal > 0) {
      dailyGoalAyahs = numGoal;
    }
  }

  let notificationPreferences = DEFAULT_NOTIFICATION_PREFS;
  if (savedNotifPrefs) {
    try {
      notificationPreferences = {
        ...DEFAULT_NOTIFICATION_PREFS,
        ...JSON.parse(savedNotifPrefs),
      };
    } catch {}
  }

  let journeyCheckpoint = DEFAULT_JOURNEY_CHECKPOINT;
  if (savedCheckpoint) {
    try {
      journeyCheckpoint = JSON.parse(savedCheckpoint);
    } catch {}
  } else if (lastStudied && lastStudied.surahNumber) {
    journeyCheckpoint = {
      surahNumber: lastStudied.surahNumber,
      ayahNumber: lastStudied.ayahNumber || 1,
    };
  }

  // Streak calculation
  const today = getLocalDateString();
  const yesterday = getYesterdayDateString();
  let streak = DEFAULT_STREAK;

  if (savedStreak) {
    try {
      const parsed: StreakData = JSON.parse(savedStreak);
      let current = parsed.currentStreak || 0;
      if (parsed.lastActiveDate !== today && parsed.lastActiveDate !== yesterday) {
        current = 0;
      }
      streak = {
        ...parsed,
        currentStreak: current,
        activeDates: Array.isArray(parsed.activeDates) ? parsed.activeDates : [],
      };
    } catch (e) {
      console.error('Failed to parse streak:', e);
    }
  } else {
    // Reconstruct streak from history or notes
    const dates = new Set<string>();
    history.forEach((item) => dates.add(getLocalDateString(new Date(item.timestamp))));
    Object.values(notes).forEach((n) => dates.add(getLocalDateString(new Date(n.updatedAt || n.createdAt))));
    const dateList = Array.from(dates).sort();
    if (dateList.length > 0) {
      const lastDate = dateList[dateList.length - 1];
      let streakCount = 0;
      if (lastDate === today || lastDate === yesterday) {
        streakCount = 1;
      }
      streak = {
        currentStreak: streakCount,
        bestStreak: Math.max(streakCount, 1),
        lastActiveDate: lastDate,
        activeDates: dateList,
      };
    }
  }

  return {
    lastStudied,
    history,
    bookmarks,
    highlights,
    notes,
    preferences,
    hasOnboarded,
    hasAgreedLegal,
    completedAyahs,
    dailyActivity,
    dailyGoalAyahs,
    notificationPreferences,
    journeyCheckpoint,
    streak,
  };
}
