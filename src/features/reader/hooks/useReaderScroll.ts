import { useEffect, type RefObject } from 'react';
import type { FlatList } from 'react-native';
import type { SurahData } from '../../../types';

interface UseReaderScrollParams {
  flatListRef: RefObject<FlatList | null>;
  preferences: { autoScroll: boolean };
  isPlaying: boolean;
  currentSurahNumber: number | null;
  currentAyahNumber: number | null;
  surahNumber: number;
  surahData: SurahData | null;
  initialAyah: number;
}

export function useReaderScroll({
  flatListRef,
  preferences,
  isPlaying,
  currentSurahNumber,
  currentAyahNumber,
  surahNumber,
  surahData,
  initialAyah,
}: UseReaderScrollParams) {
  // Auto-scroll when currently reciting ayah changes
  useEffect(() => {
    if (
      preferences.autoScroll &&
      isPlaying &&
      currentSurahNumber === surahNumber &&
      currentAyahNumber !== null &&
      surahData &&
      currentAyahNumber <= surahData.ayahs.length
    ) {
      const index = currentAyahNumber - 1;
      try {
        flatListRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.25,
        });
      } catch (e) {
        // Fallback if index not measured yet
        flatListRef.current?.scrollToOffset({
          offset: index * 200,
          animated: true,
        });
      }
    }
  }, [currentSurahNumber, currentAyahNumber, isPlaying, surahNumber, preferences.autoScroll, surahData]);

  // Scroll to initialAyah on mount if specified
  useEffect(() => {
    if (initialAyah > 1 && surahData) {
      const timer = setTimeout(() => {
        try {
          flatListRef.current?.scrollToIndex({
            index: initialAyah - 1,
            animated: true,
            viewPosition: 0.2,
          });
        } catch (e) {
          flatListRef.current?.scrollToOffset({
            offset: (initialAyah - 1) * 200,
            animated: true,
          });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [initialAyah, surahData]);
}
