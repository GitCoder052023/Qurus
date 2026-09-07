import { SURAHS } from '../../../data/surahsList';
import {
  CompletedAyahsMap,
  DailyProgress,
  DailyStudyRecord,
  JourneyCheckpoint,
  QuranProgress,
  SurahProgress,
} from '../../../types';
import { TOTAL_QURAN_AYAHS } from '../../../services/storage/studyStorage';

export function calculateSurahProgress(
  surahNumber: number,
  completedAyahs: CompletedAyahsMap
): SurahProgress {
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
}

export function calculateQuranProgress(completedAyahs: CompletedAyahsMap): QuranProgress {
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
}

export function calculateDailyProgress(
  dailyActivity: Record<string, DailyStudyRecord>,
  dailyGoalAyahs: number,
  todayStr: string
): DailyProgress {
  const record = dailyActivity[todayStr];
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
}

export function checkAyahInSequence(
  surahNumber: number,
  ayahNumber: number,
  journeyCheckpoint: JourneyCheckpoint,
  completedAyahs: CompletedAyahsMap
): boolean {
  // 1. Exact active checkpoint
  if (
    surahNumber === journeyCheckpoint.surahNumber &&
    ayahNumber === journeyCheckpoint.ayahNumber
  ) {
    return true;
  }

  // 2. Previously completed ayah
  const list = completedAyahs[surahNumber];
  if (Array.isArray(list) && list.includes(ayahNumber)) {
    return true;
  }

  // 3. Completed surahs or past along the continuous Quran Journey
  if (surahNumber < journeyCheckpoint.surahNumber) {
    return true;
  }
  if (
    surahNumber === journeyCheckpoint.surahNumber &&
    ayahNumber <= journeyCheckpoint.ayahNumber
  ) {
    return true;
  }

  const surahMeta = SURAHS.find((s) => s.number === surahNumber);
  if (surahMeta && list && list.length >= surahMeta.numberOfAyahs) {
    return true;
  }

  return false;
}
