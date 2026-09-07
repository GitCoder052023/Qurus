import { StreakData } from '../../../types';

export interface StreakUpdateResult {
  updatedStreak: StreakData;
  changed: boolean;
  wasStreakAtRisk: boolean;
  isMilestone: boolean;
}

export const MILESTONE_DAYS = [3, 7, 14, 30, 50, 100, 365];

export function computeStreakActivity(
  prev: StreakData,
  today: string,
  yesterday: string
): StreakUpdateResult {
  if (prev.lastActiveDate === today) {
    if (!prev.activeDates.includes(today)) {
      const updated: StreakData = {
        ...prev,
        activeDates: [...prev.activeDates, today],
      };
      return {
        updatedStreak: updated,
        changed: true,
        wasStreakAtRisk: false,
        isMilestone: false,
      };
    }
    return {
      updatedStreak: prev,
      changed: false,
      wasStreakAtRisk: false,
      isMilestone: false,
    };
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
  const isMilestone =
    MILESTONE_DAYS.includes(newCurrentStreak) && newCurrentStreak !== prev.currentStreak;

  return {
    updatedStreak: newStreak,
    changed: true,
    wasStreakAtRisk,
    isMilestone,
  };
}
