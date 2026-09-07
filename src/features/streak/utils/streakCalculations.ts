import { STREAK_MILESTONES } from '../constants';
import { WeekDayItem } from '../types';
import { getLocalDateString } from '../../../utils/date';

export function calculateStreakMilestones(effectiveStreak: number) {
  const nextMilestone = STREAK_MILESTONES.find((m) => m > effectiveStreak) || effectiveStreak + 7;
  const passed = STREAK_MILESTONES.filter((m) => m <= effectiveStreak);
  const prevMilestone = passed.length > 0 ? passed[passed.length - 1] : 0;
  const range = nextMilestone - prevMilestone;
  const progress = range <= 0 ? 100 : (effectiveStreak - prevMilestone) / range;
  const milestoneProgress = range <= 0 ? 100 : Math.min(100, Math.max(0, Math.round(progress * 100)));
  const daysLeft = nextMilestone - effectiveStreak;

  return { nextMilestone, prevMilestone, milestoneProgress, daysLeft };
}

export function computeWeekDays(activeDates: string[], todayStr: string): WeekDayItem[] {
  const now = new Date();
  const currentDay = now.getDay();
  const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = new Date(now);
  monday.setDate(now.getDate() + distanceToMonday);

  const labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const days: WeekDayItem[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dStr = getLocalDateString(d);
    const isToday = dStr === todayStr;
    const isCompleted = activeDates.includes(dStr);

    days.push({
      label: labels[i],
      dateStr: dStr,
      isToday,
      isCompleted,
    });
  }

  return days;
}

export function getStreakRiskInfo(nowTime: Date, isActiveToday: boolean, effectiveStreak: number) {
  const currentHour = nowTime.getHours();
  const currentMinutes = nowTime.getMinutes();
  const midnight = new Date(nowTime);
  midnight.setHours(24, 0, 0, 0);
  const msLeft = Math.max(0, midnight.getTime() - nowTime.getTime());
  const hoursLeft = Math.floor(msLeft / (1000 * 60 * 60));
  const minutesLeft = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));

  const isStreakAtRisk = !isActiveToday && effectiveStreak > 0;
  const isFinalCall = isStreakAtRisk && currentHour === 23 && currentMinutes >= 45; // 11:45 PM+
  const isCriticalHour = isStreakAtRisk && currentHour === 23 && currentMinutes < 45; // 11:00 PM+
  const isUrgentEvening = isStreakAtRisk && currentHour >= 21; // 9:00 PM+

  return {
    hoursLeft,
    minutesLeft,
    isStreakAtRisk,
    isFinalCall,
    isCriticalHour,
    isUrgentEvening,
  };
}
