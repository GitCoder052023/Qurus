import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useStudyState } from '../../context/StudyContext';
import { SURAHS } from '../../data/surahs';
import { getAyah } from '../../data/surahLoader';
import { Highlight } from '../../types';

export const SavesSection = React.memo(function SavesSection() {
  const { theme } = useTheme();
  const { highlights } = useStudyState();
  const router = useRouter();

  const savedList = useMemo(() => {
    return Object.values(highlights)
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);
  }, [highlights]);

  const totalSaves = Object.keys(highlights).length;

  const handleOpenAyah = (item: Highlight) => {
    router.push({
      pathname: '/reader/[surah]',
      params: { surah: String(item.surahNumber), ayah: String(item.ayahNumber) },
    });
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.titleRow}>
          <View style={[styles.iconPill, { backgroundColor: '#F59E0B18' }]}>
            <Ionicons name="star" size={14} color={theme.accentGold} />
          </View>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Saved Verses</Text>
          {totalSaves > 0 && (
            <View style={[styles.countBadge, { backgroundColor: theme.chipBg }]}>
              <Text style={[styles.countBadgeText, { color: theme.textSecondary }]}>
                {totalSaves}
              </Text>
            </View>
          )}
        </View>

        <Text style={[styles.subtitleHint, { color: theme.textTertiary }]}>
          Important Passages
        </Text>
      </View>

      {/* Content: Horizontal Carousel */}
      {savedList.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          {savedList.map((item) => {
            const surah = SURAHS.find((s) => s.number === item.surahNumber);
            const ayahData = getAyah(item.surahNumber, item.ayahNumber);

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.88}
                onPress={() => handleOpenAyah(item)}
                style={[
                  styles.saveCard,
                  {
                    backgroundColor: theme.cardElevated,
                    borderColor: theme.borderSubtle,
                  },
                ]}
              >
                {/* Header row */}
                <View style={styles.cardHeaderRow}>
                  <View style={styles.surahInfo}>
                    <Ionicons name="star" size={13} color={theme.accentGold} />
                    <Text style={[styles.surahName, { color: theme.textPrimary }]} numberOfLines={1}>
                      {surah ? surah.englishName : `Surah ${item.surahNumber}`}
                    </Text>
                    <View style={[styles.ayahBadge, { backgroundColor: '#F59E0B18' }]}>
                      <Text style={[styles.ayahBadgeText, { color: theme.accentGold }]}>
                        {item.surahNumber}:{item.ayahNumber}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.arabicSurahName, { color: theme.arabicText }]}>
                    {surah?.name}
                  </Text>
                </View>

                {/* Arabic Snippet */}
                {ayahData?.arabicText ? (
                  <Text
                    style={[styles.arabicVerseText, { color: theme.arabicText }]}
                    numberOfLines={1}
                  >
                    {ayahData.arabicText}
                  </Text>
                ) : null}

                {/* Urdu Translation */}
                {ayahData?.urduText ? (
                  <Text
                    style={[styles.urduVerseText, { color: theme.urduText }]}
                    numberOfLines={2}
                  >
                    {ayahData.urduText}
                  </Text>
                ) : null}

                {/* Card Footer */}
                <View style={[styles.cardFooter, { borderTopColor: theme.borderSubtle }]}>
                  <View style={styles.openLink}>
                    <Text style={[styles.openLinkText, { color: theme.primary }]}>Study Ayah</Text>
                    <Ionicons name="arrow-forward" size={11} color={theme.primary} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push('/(tabs)/quran')}
          style={[
            styles.emptyCompactCard,
            {
              backgroundColor: theme.cardElevated,
              borderColor: theme.borderSubtle,
            },
          ]}
        >
          <View style={[styles.emptyIconWrap, { backgroundColor: '#F59E0B15' }]}>
            <Ionicons name="star-outline" size={18} color={theme.accentGold} />
          </View>
          <View style={styles.emptyTextCol}>
            <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
              No saved verses yet
            </Text>
            <Text style={[styles.emptyDesc, { color: theme.textTertiary }]}>
              Tap the star icon on any Ayah while reading to mark it
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={theme.textTertiary} />
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconPill: {
    width: 26,
    height: 26,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  countBadge: {
    paddingHorizontal: 7,
    paddingVertical: 1,
    borderRadius: 10,
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  subtitleHint: {
    fontSize: 11,
    fontWeight: '500',
  },
  horizontalScrollContent: {
    gap: 12,
    paddingRight: 6,
  },
  saveCard: {
    width: 260,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  surahInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flex: 1,
    marginRight: 6,
  },
  surahName: {
    fontSize: 13,
    fontWeight: '700',
  },
  ayahBadge: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 5,
  },
  ayahBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  arabicSurahName: {
    fontSize: 13,
    fontWeight: '600',
  },
  arabicVerseText: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'right',
    marginBottom: 6,
  },
  urduVerseText: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 8,
  },
  cardFooter: {
    borderTopWidth: 1,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  openLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  openLinkText: {
    fontSize: 11,
    fontWeight: '700',
  },
  emptyCompactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    gap: 10,
  },
  emptyIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTextCol: {
    flex: 1,
  },
  emptyTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  emptyDesc: {
    fontSize: 11,
    marginTop: 1,
  },
});
