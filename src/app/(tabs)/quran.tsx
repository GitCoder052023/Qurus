import React, { useState, useMemo, useEffect } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useStudyState } from '../../context/StudyContext';
import { SURAHS } from '../../data/surahs';
import { SurahMetadata } from '../../types';
import { trackSearchPerformed } from '../../lib/analytics';
import { SurahFilterType } from '../../features/quran-list/types';
import { filterSurahs } from '../../features/quran-list/utils/filterSurahs';
import { styles } from '../../features/quran-list/styles/quranList.styles';
import { QuranHeader } from '../../features/quran-list/components/QuranHeader';
import { QuranSearchBar } from '../../features/quran-list/components/QuranSearchBar';
import { QuranFilterTabs } from '../../features/quran-list/components/QuranFilterTabs';
import { SurahListItemCard } from '../../features/quran-list/components/SurahListItemCard';
import { QuranEmptyState } from '../../features/quran-list/components/QuranEmptyState';

export default function QuranScreen() {
  const { theme } = useTheme();
  const { getSurahProgress } = useStudyState();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<SurahFilterType>('All');

  // Filter & search logic
  const filteredSurahs = useMemo(
    () => filterSurahs(SURAHS, activeFilter, searchQuery),
    [searchQuery, activeFilter]
  );

  // Debounced non-sensitive search tracking (only filter type, never query text)
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const timer = setTimeout(() => {
        trackSearchPerformed(activeFilter);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, activeFilter]);

  const handleSelectSurah = (surah: SurahMetadata) => {
    // Check if user entered an ayah in search, e.g. "2:255"
    const q = searchQuery.trim();
    if (q.includes(':')) {
      const [, aNum] = q.split(':');
      const ayah = parseInt(aNum, 10);
      if (!isNaN(ayah) && ayah >= 1 && ayah <= surah.numberOfAyahs) {
        router.push(`/reader/${surah.number}?ayah=${ayah}`);
        return;
      }
    }
    router.push(`/reader/${surah.number}`);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Top Header */}
      <QuranHeader theme={theme} />

      {/* Search Bar */}
      <QuranSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClear={() => setSearchQuery('')}
        theme={theme}
      />

      {/* Filter Tabs */}
      <QuranFilterTabs
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        theme={theme}
      />

      {/* Surahs List */}
      <FlatList
        data={filteredSurahs}
        keyExtractor={(item) => String(item.number)}
        renderItem={({ item }) => (
          <SurahListItemCard
            item={item}
            progress={getSurahProgress(item.number)}
            onPress={() => handleSelectSurah(item)}
            theme={theme}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={15}
        maxToRenderPerBatch={20}
        windowSize={10}
        ListEmptyComponent={
          <QuranEmptyState searchQuery={searchQuery} theme={theme} />
        }
      />
    </SafeAreaView>
  );
}
