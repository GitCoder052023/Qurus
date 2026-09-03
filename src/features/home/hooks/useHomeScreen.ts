import { useMemo } from 'react';
import type { GestureResponderEvent } from 'react-native';
import { useRouter } from 'expo-router';
import { useStudyState } from '@/context/StudyContext';
import { useAudio } from '@/context/AudioContext';
import { SURAHS } from '@/data/surahs';
import { CONTEMPLATIVE_VERSES } from '@/data/contemplativeVerses';
import { getTimeOfDayGreeting, dayOfYear } from '@/lib/greeting';

export function useHomeScreen() {
  const { lastStudied, history, notes } = useStudyState();
  const { playAyah, isPlaying, currentSurahNumber, currentAyahNumber, pause } = useAudio();
  const router = useRouter();

  const greeting = useMemo(() => getTimeOfDayGreeting(), []);

  const dailyVerse = useMemo(() => {
    return CONTEMPLATIVE_VERSES[dayOfYear() % CONTEMPLATIVE_VERSES.length];
  }, []);

  const lastSurah = lastStudied ? SURAHS.find((s) => s.number === lastStudied.surahNumber) : null;
  const isLastStudiedPlaying =
    isPlaying &&
    lastStudied &&
    currentSurahNumber === lastStudied.surahNumber &&
    currentAyahNumber === lastStudied.ayahNumber;

  const progressPercent =
    lastSurah && lastStudied
      ? Math.round((lastStudied.ayahNumber / lastSurah.numberOfAyahs) * 100)
      : 0;

  const handleContinueStudying = () => {
    if (lastStudied) {
      router.push({
        pathname: '/reader/[surah]',
        params: { surah: String(lastStudied.surahNumber), ayah: String(lastStudied.ayahNumber) },
      });
    } else {
      router.push({
        pathname: '/reader/[surah]',
        params: { surah: '1', ayah: '1' },
      });
    }
  };

  const handlePlayLastStudied = (e: GestureResponderEvent) => {
    e.stopPropagation();
    if (isLastStudiedPlaying) {
      pause();
    } else if (lastStudied) {
      playAyah(lastStudied.surahNumber, lastStudied.ayahNumber);
    } else {
      playAyah(1, 1);
    }
  };

  const handlePlayDailyVerse = () => {
    playAyah(dailyVerse.surahNumber, dailyVerse.ayahNumber);
  };

  const handleOpenDailyVerse = () => {
    router.push({
      pathname: '/reader/[surah]',
      params: { surah: String(dailyVerse.surahNumber), ayah: String(dailyVerse.ayahNumber) },
    });
  };

  return {
    greeting,
    dailyVerse,
    lastStudied,
    lastSurah,
    isLastStudiedPlaying,
    progressPercent,
    history,
    notes,
    handleContinueStudying,
    handlePlayLastStudied,
    handlePlayDailyVerse,
    handleOpenDailyVerse,
  };
}
