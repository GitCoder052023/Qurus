import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { styles } from '../styles/notes.styles';

interface NotesEmptyStateProps {
  isSearching: boolean;
  searchQuery: string;
  onClearSearch: () => void;
  theme: any;
}

export function NotesEmptyState({
  isSearching,
  searchQuery,
  onClearSearch,
  theme,
}: NotesEmptyStateProps) {
  const router = useRouter();

  if (isSearching) {
    return (
      <View style={styles.emptyContainer}>
        <View style={[styles.emptyIconCircle, { backgroundColor: theme.surface }]}>
          <Ionicons name="search-outline" size={32} color={theme.textTertiary} />
        </View>
        <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
          No reflections found
        </Text>
        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
          No study notes match "{searchQuery}". Try searching by Surah name, Ayah number, or reflection content.
        </Text>
        <TouchableOpacity
          onPress={onClearSearch}
          style={[styles.browseBtn, { backgroundColor: theme.primary }]}
        >
          <Text style={[styles.browseBtnText, { color: theme.onPrimary }]}>Clear Search</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIconCircle, { backgroundColor: theme.surface }]}>
        <Ionicons name="journal-outline" size={36} color={theme.textTertiary} />
      </View>
      <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
        Your Study Notebook is empty
      </Text>
      <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
        While reading any chapter, tap Note below a verse to write down your thoughts, questions, or record a voice note.
      </Text>
      <TouchableOpacity
        onPress={() => router.push('/(tabs)/quran')}
        style={[styles.browseBtn, { backgroundColor: theme.primary }]}
      >
        <Text style={[styles.browseBtnText, { color: theme.onPrimary }]}>Explore Chapters</Text>
      </TouchableOpacity>
    </View>
  );
}
