import React from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useStudyState } from '../../context/StudyContext';
import { Bookmark } from '../../types';
import { BookmarkCard } from './components/BookmarkCard';
import { BookmarksEmptyState } from './components/BookmarksEmptyState';
import { styles } from './styles';

export function BookmarksScreen() {
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

  const renderBookmarkItem = ({ item }: { item: Bookmark }) => (
    <BookmarkCard item={item} theme={theme} onOpen={handleOpenBookmark} onRemove={handleRemove} />
  );

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
        ListEmptyComponent={<BookmarksEmptyState theme={theme} />}
      />
    </SafeAreaView>
  );
}
