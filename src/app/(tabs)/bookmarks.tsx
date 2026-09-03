import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useStudyState } from '../../context/StudyContext';
import { SURAHS } from '../../data/surahs';
import { Bookmark } from '../../types';

export default function BookmarksScreen() {
  const { theme } = useTheme();
  const { bookmarks, removeBookmark } = useStudyState();
  const router = useRouter();

  const handleOpenBookmark = (bm: Bookmark) => {
    router.push(`/reader/${bm.surahNumber}?ayah=${bm.ayahNumber}`);
  };

  const handleRemove = (bm: Bookmark) => {
    Alert.alert(
      'Remove Bookmark',
      `Remove bookmark for Surah ${bm.surahNumber}, Ayah ${bm.ayahNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeBookmark(bm.surahNumber, bm.ayahNumber),
        },
      ]
    );
  };

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const renderBookmarkItem = ({ item }: { item: Bookmark }) => {
    const surah = SURAHS.find((s) => s.number === item.surahNumber);
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => handleOpenBookmark(item)}
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.surahTag}>
            <Ionicons name="bookmark" size={16} color={theme.bookmarkIcon} />
            <Text style={[styles.surahName, { color: theme.textPrimary }]}>
              {surah ? surah.englishName : `Surah ${item.surahNumber}`}
            </Text>
            <View style={[styles.ayahBadge, { backgroundColor: theme.primaryMuted }]}>
              <Text style={[styles.ayahBadgeText, { color: theme.primary }]}>
                {item.surahNumber}:{item.ayahNumber}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              handleRemove(item);
            }}
            style={styles.deleteIconBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="trash-outline" size={18} color={theme.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Arabic Snippet */}
        {item.arabicSnippet ? (
          <Text style={[styles.arabicSnippet, { color: theme.arabicText }]} numberOfLines={2}>
            {item.arabicSnippet}
          </Text>
        ) : null}

        {/* Urdu Snippet */}
        {item.urduSnippet ? (
          <Text style={[styles.urduSnippet, { color: theme.urduText }]} numberOfLines={2}>
            {item.urduSnippet}
          </Text>
        ) : null}

        <View style={[styles.cardFooter, { borderTopColor: theme.borderSubtle }]}>
          <Text style={[styles.dateText, { color: theme.textTertiary }]}>
            Saved on {formatDate(item.createdAt)}
          </Text>
          <View style={styles.resumeAction}>
            <Text style={[styles.resumeText, { color: theme.primary }]}>Continue Reading</Text>
            <Ionicons name="chevron-forward" size={14} color={theme.primary} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.screenTitle, { color: theme.textPrimary }]}>Saved Bookmarks</Text>
        <Text style={[styles.screenSubtitle, { color: theme.textSecondary }]}>
          Quickly return to verses and study passages you saved
        </Text>
      </View>

      {/* Bookmarks List */}
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => `${item.surahNumber}:${item.ayahNumber}`}
        renderItem={renderBookmarkItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={[styles.emptyIconCircle, { backgroundColor: theme.surface }]}>
              <Ionicons name="bookmark-outline" size={36} color={theme.textTertiary} />
            </View>
            <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
              You haven't bookmarked anything yet.
            </Text>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              Tap the bookmark icon on any ayah while reading to preserve your place and return here later.
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/quran')}
              style={[styles.browseBtn, { backgroundColor: theme.primary }]}
            >
              <Text style={styles.browseBtnText}>Browse the Quran</Text>
            </TouchableOpacity>
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
    paddingBottom: 16,
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
  listContent: {
    paddingHorizontal: 18,
    paddingBottom: 120,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  surahTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  surahName: {
    fontSize: 15,
    fontWeight: '700',
  },
  ayahBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ayahBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  deleteIconBtn: {
    padding: 4,
  },
  arabicSnippet: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 8,
    fontFamily: 'serif',
  },
  urduSnippet: {
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 12,
    fontFamily: 'serif',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 10,
  },
  dateText: {
    fontSize: 11,
  },
  resumeAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resumeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  browseBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 14,
  },
  browseBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
