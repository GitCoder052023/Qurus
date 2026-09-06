import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
} from '../services/notificationEngine';

export const TOTAL_QURAN_AYAHS = 6236;

const STORAGE_KEYS = {
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

const DEFAULT_STREAK: StreakData = {
  currentStreak: 0,
  bestStreak: 0,
  lastActiveDate: null,
  activeDates: [],
};

const DEFAULT_NOTIFICATION_PREFS: NotificationPreferences = {
  dailyReminderEnabled: false,
  reminderHour: 20, // 8:30 PM
  reminderMinute: 30,
  streakSaverEnabled: true,
};

const DEFAULT_DAILY_GOAL = 5;

export const DEFAULT_JOURNEY_CHECKPOINT: JourneyCheckpoint = {
  surahNumber: 1,
  ayahNumber: 1,
};

export function getLocalDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return getLocalDateString(d);
}

interface StudyContextType {
  lastStudied: LastStudiedState | null;
  history: StudyHistoryItem[];
  bookmarks: Bookmark[];
  highlights: Record<string, Highlight>; // key: "surah_ayah"
  notes: Record<string, StudyNote>; // key: unique note id
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

  // Hydrate from AsyncStorage
  useEffect(() => {
    async function loadData() {
      try {
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

        if (savedLast) setLastStudied(JSON.parse(savedLast));
        if (savedHistory) setHistory(JSON.parse(savedHistory));
        if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
        if (savedHighlights) setHighlights(JSON.parse(savedHighlights));
        if (savedNotes) {
          try {
            const parsed = JSON.parse(savedNotes);
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
            setNotes(normalizedNotes);
          } catch (e) {
            console.error('Failed to parse notes from storage:', e);
          }
        }
        if (savedPrefs) {
          setPreferences({
            ...DEFAULT_PREFERENCES,
            ...JSON.parse(savedPrefs),
            theme: 'light',
          });
        }
        setHasOnboarded(savedOnboard === 'true');
        setHasAgreedLegal(savedLegal === 'true');

        if (savedCompletedAyahs) {
          try {
            setCompletedAyahs(JSON.parse(savedCompletedAyahs));
          } catch (e) {
            console.error('Failed to parse completed ayahs:', e);
          }
        }

        if (savedDailyActivity) {
          try {
            setDailyActivity(JSON.parse(savedDailyActivity));
          } catch (e) {
            console.error('Failed to parse daily activity:', e);
          }
        }

        if (savedDailyGoal) {
          const numGoal = parseInt(savedDailyGoal, 10);
          if (!isNaN(numGoal) && numGoal > 0) {
            setDailyGoalAyahs(numGoal);
          }
        }

        if (savedNotifPrefs) {
          try {
            setNotificationPreferences({
              ...DEFAULT_NOTIFICATION_PREFS,
              ...JSON.parse(savedNotifPrefs),
            });
          } catch (e) {
            console.error('Failed to parse notification preferences:', e);
          }
        }

        if (savedCheckpoint) {
          try {
            setJourneyCheckpointState(JSON.parse(savedCheckpoint));
          } catch (e) {
            console.error('Failed to parse journey checkpoint:', e);
          }
        } else if (savedLast) {
          try {
            const parsedLast = JSON.parse(savedLast);
            if (parsedLast && parsedLast.surahNumber) {
              setJourneyCheckpointState({
                surahNumber: parsedLast.surahNumber,
                ayahNumber: parsedLast.ayahNumber || 1,
              });
            }
          } catch {}
        }

        // Streak initialization & hydration
        const today = getLocalDateString();
        const yesterday = getYesterdayDateString();

        let initialStreak = DEFAULT_STREAK;
        if (savedStreak) {
          try {
            const parsed: StreakData = JSON.parse(savedStreak);
            let current = parsed.currentStreak || 0;
            // If last active was before yesterday, the streak is broken until activity today
            if (parsed.lastActiveDate !== today && parsed.lastActiveDate !== yesterday) {
              current = 0;
            }
            initialStreak = {
              ...parsed,
              currentStreak: current,
              activeDates: Array.isArray(parsed.activeDates) ? parsed.activeDates : [],
            };
          } catch (e) {
            console.error('Failed to parse streak:', e);
          }
        } else {
          // Reconstruct initial streak from historical records if available
          const dates = new Set<string>();
          if (savedHistory) {
            try {
              const hList: StudyHistoryItem[] = JSON.parse(savedHistory);
              hList.forEach((item) => dates.add(getLocalDateString(new Date(item.timestamp))));
            } catch {}
          }
          if (savedNotes) {
            try {
              const nObj = JSON.parse(savedNotes);
              Object.values(nObj).forEach((n: any) =>
                dates.add(getLocalDateString(new Date(n.updatedAt || n.createdAt)))
              );
            } catch {}
          }
          const dateList = Array.from(dates).sort();
          if (dateList.length > 0) {
            const lastDate = dateList[dateList.length - 1];
            let streakCount = 0;
            if (lastDate === today || lastDate === yesterday) {
              streakCount = 1;
            }
            initialStreak = {
              currentStreak: streakCount,
              bestStreak: Math.max(streakCount, 1),
              lastActiveDate: lastDate,
              activeDates: dateList,
            };
          }
        }
        setStreak(initialStreak);
        // If streak is at risk today, re-arm the evening pressure countdown alerts
        if (initialStreak.lastActiveDate !== today && initialStreak.currentStreak >= 1) {
          scheduleStreakSaverReminderAsync(initialStreak.currentStreak).catch(() => {});
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
    await AsyncStorage.setItem(STORAGE_KEYS.HAS_ONBOARDED, 'true').catch(console.error);
  };

  const agreeToLegal = async () => {
    setHasAgreedLegal(true);
    trackLegalConsentAgreed();
    await AsyncStorage.setItem(STORAGE_KEYS.HAS_AGREED_LEGAL, 'true').catch(console.error);
  };

  const resetOnboarding = async () => {
    setHasOnboarded(false);
    setHasAgreedLegal(false);
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.HAS_ONBOARDED,
      STORAGE_KEYS.HAS_AGREED_LEGAL,
    ]).catch(console.error);
  };

  const recordStreakActivity = () => {
    setStreak((prev) => {
      const today = getLocalDateString();
      const yesterday = getYesterdayDateString();

      if (prev.lastActiveDate === today) {
        if (!prev.activeDates.includes(today)) {
          const updated: StreakData = {
            ...prev,
            activeDates: [...prev.activeDates, today],
          };
          AsyncStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(updated)).catch(console.error);
          return updated;
        }
        return prev;
      }

      let newCurrentStreak = 1;
      if (prev.lastActiveDate === yesterday) {
        newCurrentStreak = prev.currentStreak + 1;
      }

      const newBestStreak = Math.max(prev.bestStreak, newCurrentStreak);
      const newActiveDates = prev.activeDates.includes(today)
        ? prev.activeDates
        : [...prev.activeDates, today];

      const newStreak: StreakData = {
        currentStreak: newCurrentStreak,
        bestStreak: newBestStreak,
        lastActiveDate: today,
        activeDates: newActiveDates,
      };

      const wasStreakAtRisk = prev.lastActiveDate !== today && prev.currentStreak >= 1;
      const isMilestone = [3, 7, 14, 30, 50, 100, 365].includes(newCurrentStreak) && newCurrentStreak !== prev.currentStreak;

      // Disarm tonight's evening pressure countdown alerts since user studied today
      cancelTonightStreakSaversAsync().catch(() => {});

      if (isMilestone) {
        setTimeout(() => {
          triggerCelebration({
            type: 'streak_milestone',
            title: `${newCurrentStreak}-Day Rhythm Alive! 🔥`,
            subtitle: `Your continuous presence with the Quran has reached ${newCurrentStreak} days.`,
            badgeLabel: `${newCurrentStreak} Days`,
            streakCount: newCurrentStreak,
            previousStreakCount: prev.currentStreak,
            details: 'Consistency is the most beloved quality in study. You are building lifelong clarity.',
            quote: '“The most beloved of deeds to Allah are those that are most consistent, even if they are small.”',
          });
        }, 450);
      } else if (wasStreakAtRisk && newCurrentStreak >= 2) {
        // High-dopamine streak preserved celebration!
        setTimeout(() => {
          triggerCelebration({
            type: 'streak_saved',
            title: 'Streak Preserved! 🔥',
            subtitle: `Your ${newCurrentStreak}-day streak is safe from midnight reset.`,
            badgeLabel: `${newCurrentStreak} Days Saved`,
            streakCount: newCurrentStreak,
            previousStreakCount: prev.currentStreak,
            details: 'Just 1 verse was enough to keep your habit unbroken. That single reflection protected days of dedication.',
            quote: '“A small, continuous stream cuts through solid rock. Consistency is your true power.”',
          });
        }, 450);
      }

      AsyncStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(newStreak)).catch(console.error);
      return newStreak;
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
    return (
      surahNumber === journeyCheckpoint.surahNumber &&
      ayahNumber === journeyCheckpoint.ayahNumber
    );
  };

  const setJourneyCheckpoint = (surahNumber: number, ayahNumber: number) => {
    const newCp: JourneyCheckpoint = { surahNumber, ayahNumber };
    setJourneyCheckpointState(newCp);
    AsyncStorage.setItem(STORAGE_KEYS.JOURNEY_CHECKPOINT, JSON.stringify(newCp)).catch(console.error);
  };

  const markAyahCompleted = (surahNumber: number, ayahNumber: number, durationSeconds: number = 20) => {
    const today = getLocalDateString();
    const surahMeta = SURAHS.find((s) => s.number === surahNumber);

    // Any reflection on the Quran keeps the user's daily presence / streak active
    recordStreakActivity();

    // Verify sequential integrity
    const isInSeq = isAyahInSequence(surahNumber, ayahNumber);
    if (!isInSeq) {
      // Out-of-sequence exploration: do not advance structured journey or daily goal progress
      return;
    }

    // Advance the Journey Checkpoint sequentially
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
    AsyncStorage.setItem(STORAGE_KEYS.JOURNEY_CHECKPOINT, JSON.stringify(nextCheckpoint)).catch(console.error);

    let justCompletedSurah = false;
    setCompletedAyahs((prev) => {
      const existingForSurah = prev[surahNumber] || [];
      if (existingForSurah.includes(ayahNumber)) {
        return prev;
      }
      const updatedForSurah = [...existingForSurah, ayahNumber].sort((a, b) => a - b);
      const updatedMap = { ...prev, [surahNumber]: updatedForSurah };
      AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_AYAHS, JSON.stringify(updatedMap)).catch(console.error);

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
      AsyncStorage.setItem(STORAGE_KEYS.DAILY_ACTIVITY, JSON.stringify(updatedActivity)).catch(console.error);

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
    const surahMeta = SURAHS.find((s) => s.number === surahNumber);
    const totalCount = surahMeta?.numberOfAyahs || 1;
    const completedList = completedAyahs[surahNumber] || [];
    const completedCount = Math.min(completedList.length, totalCount);
    const percent = Math.min(100, Math.round((completedCount / totalCount) * 100));
    const isCompleted = completedCount >= totalCount;
    const remainingAyahs = Math.max(0, totalCount - completedCount);
    const estimatedMinutesRemaining = Math.max(1, Math.round((remainingAyahs * 22) / 60));

    return {
      surahNumber,
      completedCount,
      totalCount,
      percent,
      isCompleted,
      estimatedMinutesRemaining: isCompleted ? 0 : estimatedMinutesRemaining,
    };
  };

  const getQuranProgress = (): QuranProgress => {
    let totalCompletedAyahs = 0;
    let completedSurahsCount = 0;

    for (const s of SURAHS) {
      const list = completedAyahs[s.number] || [];
      const count = Math.min(list.length, s.numberOfAyahs);
      totalCompletedAyahs += count;
      if (count >= s.numberOfAyahs) {
        completedSurahsCount += 1;
      }
    }

    const percent = Number(((totalCompletedAyahs / TOTAL_QURAN_AYAHS) * 100).toFixed(1));

    return {
      completedAyahs: totalCompletedAyahs,
      totalAyahs: TOTAL_QURAN_AYAHS,
      percent,
      completedSurahsCount,
      totalSurahs: 114,
    };
  };

  const getDailyProgress = (): DailyProgress => {
    const today = getLocalDateString();
    const record = dailyActivity[today];
    const ayahsToday = record ? record.ayahsCompleted.length : 0;
    const secondsToday = record ? record.secondsSpent : 0;
    const minutesToday = Math.round(secondsToday / 60);
    const percent = Math.min(100, Math.round((ayahsToday / dailyGoalAyahs) * 100));
    const isGoalMet = ayahsToday >= dailyGoalAyahs;

    return {
      ayahsToday,
      goalAyahs: dailyGoalAyahs,
      percent,
      isGoalMet,
      secondsToday,
      minutesToday,
    };
  };

  const setDailyGoal = (goal: number) => {
    const valid = Math.max(1, Math.min(50, goal));
    setDailyGoalAyahs(valid);
    AsyncStorage.setItem(STORAGE_KEYS.DAILY_GOAL, String(valid)).catch(console.error);
  };

  const updateNotificationPreferences = async (newPrefs: Partial<NotificationPreferences>) => {
    const updated = { ...notificationPreferences, ...newPrefs };
    setNotificationPreferences(updated);
    await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATION_PREFS, JSON.stringify(updated)).catch(console.error);

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
    recordStreakActivity();
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
    recordStreakActivity();
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
    if (!exists) {
      trackBookmarkCreated();
      recordStreakActivity();
    }
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
    if (added) {
      trackHighlightCreated();
      recordStreakActivity();
    }
    return added;
  };

  const isHighlighted = (surahNumber: number, ayahNumber: number): boolean => {
    return Boolean(highlights[`${surahNumber}:${ayahNumber}`]);
  };

  // Notes
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
    AsyncStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(nextNotes)).catch(console.error);

    // Record reflection in daily activity for tadabbur tracking
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
      AsyncStorage.setItem(STORAGE_KEYS.DAILY_ACTIVITY, JSON.stringify(nextAct)).catch(console.error);
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
    AsyncStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(nextNotes)).catch(console.error);
  };

  // Preferences
  const updatePreferences = (newPrefs: Partial<ReadingPreferences>) => {
    Object.entries(newPrefs).forEach(([k, v]) => {
      if (v !== undefined) {
        trackPreferenceChanged(k, v);
      }
    });
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
