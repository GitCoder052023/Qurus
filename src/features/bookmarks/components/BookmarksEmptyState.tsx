import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { ThemeColors } from '../../../context/ThemeContext';
import { styles } from '../styles';

interface BookmarksEmptyStateProps {
  theme: ThemeColors;
}

export function BookmarksEmptyState({ theme }: BookmarksEmptyStateProps) {
  const router = useRouter();
  return (
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
  );
}
