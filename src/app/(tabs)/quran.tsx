import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { SURAHS } from '../../data/surahs';
import { SurahMetadata } from '../../types';

export default function QuranScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Meccan' | 'Medinan'>('All');

  // Filter & search logic
  const filteredSurahs = useMemo(() => {
    let list = SURAHS;

    if (activeFilter === 'Meccan') {
      list = list.filter((s) => s.revelationType === 'Meccan');
    } else if (activeFilter === 'Medinan') {
      list = list.filter((s) => s.revelationType === 'Medinan');
    }

    const q = searchQuery.trim().toLowerCase();
    if (!q) return list;

    // Check if query is like "2:255"
    if (q.includes(':')) {
      const [sNum] = q.split(':');
      const num = parseInt(sNum, 10);
      if (!isNaN(num)) {
        return list.filter((s) => s.number === num);
      }
    }

    // Number match
    const asNum = parseInt(q, 10);
    if (!isNaN(asNum)) {
      return list.filter((s) => s.number === asNum);
    }

    // Text match
    return list.filter(
      (s) =>
        s.englishName.toLowerCase().includes(q) ||
        s.englishNameTranslation.toLowerCase().includes(q) ||
        s.urduName.toLowerCase().includes(q) ||
        String(s.name).includes(q)
    );
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

  const renderSurahItem = ({ item }: { item: SurahMetadata }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.82}
        onPress={() => handleSelectSurah(item)}
        style={[
          styles.surahCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        {/* Number Badge */}
        <View style={[styles.surahNumberCircle, { backgroundColor: theme.surfaceHighlight }]}>
          <Text style={[styles.surahNumberText, { color: theme.primary }]}>{item.number}</Text>
        </View>

        {/* English details */}
        <View style={styles.surahDetails}>
          <Text style={[styles.surahEnglishTitle, { color: theme.textPrimary }]}>
            {item.englishName}
          </Text>
          <Text style={[styles.surahUrduTitle, { color: theme.textSecondary }]} numberOfLines={1}>
            {item.urduName}
          </Text>
          <View style={styles.metaRow}>
            <View style={[styles.revBadge, { backgroundColor: theme.surface }]}>
              <Text style={[styles.revText, { color: theme.textTertiary }]}>
                {item.revelationType}
              </Text>
            </View>
            <Text style={[styles.metaText, { color: theme.textTertiary }]}>
              {item.numberOfAyahs} Ayahs • Juz {item.juzStart}
            </Text>
          </View>
        </View>

        {/* Arabic Calligraphy Title */}
        <View style={styles.arabicCol}>
          <Text style={[styles.surahArabicTitle, { color: theme.arabicText }]}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={[styles.screenTitle, { color: theme.textPrimary }]}>Holy Quran</Text>
        <Text style={[styles.screenSubtitle, { color: theme.textSecondary }]}>
          Browse all 114 Surahs with Urdu Translation
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Ionicons name="search" size={20} color={theme.textTertiary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: theme.textPrimary }]}
            placeholder="Search Surah, number, or ayah (e.g. 2:255)..."
            placeholderTextColor={theme.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={theme.textTertiary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {(['All', 'Meccan', 'Medinan'] as const).map((tab) => {
          const isActive = activeFilter === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveFilter(tab)}
              style={[
                styles.filterChip,
                {
                  backgroundColor: isActive ? theme.primary : theme.surface,
                  borderColor: isActive ? theme.primary : theme.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterChipText,
                  { color: isActive ? '#FFFFFF' : theme.textSecondary },
                  isActive && { fontWeight: '700' },
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Surahs List */}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  screenSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 48,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 14,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 18,
    paddingBottom: 120,
  },
  surahCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 10,
  },
  surahNumberCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  surahNumberText: {
    fontSize: 14,
    fontWeight: '800',
  },
  surahDetails: {
    flex: 1,
    marginRight: 12,
  },
  surahEnglishTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  surahUrduTitle: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  revBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  revText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  metaText: {
    fontSize: 11,
    fontWeight: '500',
  },
  arabicCol: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  surahArabicTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'right',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
  },
});
