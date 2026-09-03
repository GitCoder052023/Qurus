import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import type { SurahMetadata } from '@/types';
import { styles } from './styles';
import { useSurahCatalog } from './hooks/useSurahCatalog';
import { QuranHeader } from './components/QuranHeader';
import { SurahSearchBar } from './components/SurahSearchBar';
import { RevelationFilter } from './components/RevelationFilter';
import { SurahListItem } from './components/SurahListItem';

export function QuranScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filteredSurahs,
    ayahFromSearchQuery,
  } = useSurahCatalog();

  const handleSelectSurah = (surah: SurahMetadata) => {
    const ayah = ayahFromSearchQuery(searchQuery, surah.numberOfAyahs);
    if (ayah != null) {
      router.push(`/reader/${surah.number}?ayah=${ayah}`);
      return;
    }
    router.push(`/reader/${surah.number}`);
  };

  const renderSurahItem = ({ item }: { item: SurahMetadata }) => {
    return <SurahListItem item={item} onPress={handleSelectSurah} />;
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <QuranHeader />

      <SurahSearchBar searchQuery={searchQuery} onChangeSearch={setSearchQuery} />

      <RevelationFilter activeFilter={activeFilter} onChangeFilter={setActiveFilter} />

      <FlatList
        data={filteredSurahs}
        keyExtractor={(item) => String(item.number)}
        renderItem={renderSurahItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={15}
        maxToRenderPerBatch={20}
        windowSize={10}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={36} color={theme.textTertiary} />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              No Surahs found matching "{searchQuery}"
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
