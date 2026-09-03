import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { ThemeColors } from '../../../context/ThemeContext';
import { styles } from '../styles';

interface NotesEmptyStateProps {
  theme: ThemeColors;
}

export function NotesEmptyState({ theme }: NotesEmptyStateProps) {
  const router = useRouter();
  return (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIconCircle, { backgroundColor: theme.surface }]}>
        <Ionicons name="journal-outline" size={36} color={theme.textTertiary} />
      </View>
      <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
        Your Quran study notes will appear here.
      </Text>
      <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
        While reading any Surah, tap the "Note" icon below an ayah to attach your personal reflections and contemplation.
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
