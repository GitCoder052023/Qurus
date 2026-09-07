import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NotesStats } from '../types';
import { styles } from '../styles/notes.styles';

interface NotesStatsBannerProps {
  stats: NotesStats;
  theme: any;
}

export function NotesStatsBanner({ stats, theme }: NotesStatsBannerProps) {
  if (stats.totalNotes === 0) return null;

  return (
    <View style={[styles.statsBar, { backgroundColor: theme.surfaceHighlight, borderColor: theme.borderSubtle }]}>
      <View style={styles.statPill}>
        <Ionicons name="journal-outline" size={14} color={theme.primary} />
        <Text style={[styles.statPillText, { color: theme.textPrimary }]}>
          <Text style={{ fontWeight: '700' }}>{stats.totalNotes}</Text>{' '}
          {stats.totalNotes === 1 ? 'Reflection' : 'Reflections'}
        </Text>
      </View>
      <Text style={[styles.statDot, { color: theme.textTertiary }]}>•</Text>
      <View style={styles.statPill}>
        <Ionicons name="book-outline" size={14} color={theme.accentGold} />
        <Text style={[styles.statPillText, { color: theme.textPrimary }]}>
          <Text style={{ fontWeight: '700' }}>{stats.totalAyahs}</Text>{' '}
          {stats.totalAyahs === 1 ? 'Verse' : 'Verses'}
        </Text>
      </View>
      <Text style={[styles.statDot, { color: theme.textTertiary }]}>•</Text>
      <View style={styles.statPill}>
        <Ionicons name="layers-outline" size={14} color={theme.tertiary} />
        <Text style={[styles.statPillText, { color: theme.textPrimary }]}>
          <Text style={{ fontWeight: '700' }}>{stats.totalSurahs}</Text>{' '}
          {stats.totalSurahs === 1 ? 'Surah' : 'Surahs'}
        </Text>
      </View>
    </View>
  );
}
