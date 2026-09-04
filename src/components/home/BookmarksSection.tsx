import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useStudyState } from '../../context/StudyContext';
import { SURAHS } from '../../data/surahs';
import { Bookmark } from '../../types';

export const BookmarksSection = React.memo(function BookmarksSection() {
  const { theme } = useTheme();
  const { bookmarks } = useStudyState();
  const router = useRouter();

  const bookmarkList = useMemo(() => {
    return [...bookmarks]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);
  }, [bookmarks]);

  const totalBookmarks = bookmarks.length;

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const handleOpenBookmark = (bm: Bookmark) => {
    router.push({
      pathname: '/reader/[surah]',
      params: { surah: String(bm.surahNumber), ayah: String(bm.ayahNumber) },
    });
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.titleRow}>
          <View style={[styles.iconPill, { backgroundColor: theme.primaryMuted }]}>
            <Ionicons name="bookmark" size={14} color={theme.primary} />
          </View>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Bookmarks</Text>
          {totalBookmarks > 0 && (
            <View style={[styles.countBadge, { backgroundColor: theme.chipBg }]}>
              <Text style={[styles.countBadgeText, { color: theme.textSecondary }]}>
                {totalBookmarks}
              </Text>
            </View>
          )}
        </View>

        {totalBookmarks > 0 && (
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/bookmarks')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.viewAllBtn}
          >
            <Text style={[styles.viewAllText, { color: theme.primary }]}>View all</Text>
            <Ionicons name="chevron-forward" size={13} color={theme.primary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Content: Horizontal Carousel */}
      {bookmarkList.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContent}
        >
          {bookmarkList.map((item) => {
            const surah = SURAHS.find((s) => s.number === item.surahNumber);

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.88}
                onPress={() => handleOpenBookmark(item)}
                style={[
                  styles.bookmarkCard,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.borderSubtle,
                  },
                ]}
              >
                {/* Header row */}
                <View style={styles.cardHeaderRow}>
                  <View style={styles.surahInfo}>
                    <Ionicons name="bookmark" size={14} color={theme.bookmarkIcon} />
                    <Text style={[styles.surahName, { color: theme.textPrimary }]} numberOfLines={1}>
                      {surah ? surah.englishName : `Surah ${item.surahNumber}`}
                    </Text>
                    <View style={[styles.ayahBadge, { backgroundColor: theme.primaryMuted }]}>
                      <Text style={[styles.ayahBadgeText, { color: theme.primary }]}>
                        {item.surahNumber}:{item.ayahNumber}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.dateText, { color: theme.textTertiary }]}>
                    {formatDate(item.createdAt)}
                  </Text>
                </View>

                {/* Arabic Snippet */}
                {item.arabicSnippet ? (
                  <Text
                    style={[styles.arabicSnippetText, { color: theme.arabicText }]}
                    numberOfLines={1}
                  >
                    {item.arabicSnippet}
                  </Text>
                ) : null}

                {/* Urdu Snippet */}
                {item.urduSnippet ? (
                  <Text
                    style={[styles.urduSnippetText, { color: theme.urduText }]}
                    numberOfLines={2}
                  >
                    {item.urduSnippet}
                  </Text>
                ) : null}

                {/* Card Footer */}
                <View style={[styles.cardFooter, { borderTopColor: theme.borderSubtle }]}>
                  <View style={styles.resumeAction}>
                    <Text style={[styles.resumeActionText, { color: theme.primary }]}>
                      Continue
                    </Text>
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
              backgroundColor: theme.card,
              borderColor: theme.borderSubtle,
            },
          ]}
        >
          <View style={[styles.emptyIconWrap, { backgroundColor: theme.primaryMuted }]}>
            <Ionicons name="bookmark-outline" size={18} color={theme.bookmarkIcon} />
          </View>
          <View style={styles.emptyTextCol}>
            <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
              No bookmarks saved yet
            </Text>
            <Text style={[styles.emptyDesc, { color: theme.textTertiary }]}>
              Tap the bookmark icon to mark your place in the Quran
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
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
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
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '600',
  },
  horizontalScrollContent: {
    gap: 12,
    paddingRight: 6,
  },
  bookmarkCard: {
    width: 260,
    borderRadius: 18,
    padding: 14,
    borderWidth: StyleSheet.hairlineWidth,
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
    fontWeight: '600',
  },
  ayahBadge: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 5,
  },
  ayahBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 10,
  },
  arabicSnippetText: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'right',
    marginBottom: 6,
  },
  urduSnippetText: {
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
  resumeAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  resumeActionText: {
    fontSize: 11,
    fontWeight: '500',
  },
  emptyCompactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
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
