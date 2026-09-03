import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import type { ContemplativeVerse } from '@/data/contemplativeVerses';
import { styles } from '../styles';

interface VerseOfPeaceCardProps {
  dailyVerse: ContemplativeVerse;
  onPlayDailyVerse: () => void;
  onOpenDailyVerse: () => void;
}

export function VerseOfPeaceCard({
  dailyVerse,
  onPlayDailyVerse,
  onOpenDailyVerse,
}: VerseOfPeaceCardProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Verse of Peace</Text>
        <View style={[styles.verseThemePill, { backgroundColor: theme.primaryMuted }]}>
          <Text style={[styles.verseThemeText, { color: theme.primary }]}>{dailyVerse.themeNote}</Text>
        </View>
      </View>

      <View
        style={[
          styles.dailyVerseCard,
          {
            backgroundColor: theme.cardElevated,
            borderColor: theme.borderSubtle,
          },
        ]}
      >
        <Text style={[styles.dailyArabicText, { color: theme.arabicText }]}>
          {dailyVerse.arabicText}
        </Text>

        <Text style={[styles.dailyUrduText, { color: theme.urduText }]}>{dailyVerse.urduText}</Text>

        <View style={[styles.dailyVerseFooter, { borderTopColor: theme.borderSubtle }]}>
          <Text style={[styles.dailyCitation, { color: theme.textSecondary }]}>
            Surah {dailyVerse.surahName} • {dailyVerse.surahNumber}:{dailyVerse.ayahNumber}
          </Text>

          <View style={styles.dailyActions}>
            <TouchableOpacity
              onPress={onPlayDailyVerse}
              style={[styles.dailyActionBtn, { backgroundColor: theme.chipBg }]}
            >
              <Ionicons name="volume-medium-outline" size={16} color={theme.primary} />
              <Text style={[styles.dailyActionText, { color: theme.primary }]}>Recite</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onOpenDailyVerse}
              style={[styles.dailyActionBtn, { backgroundColor: theme.chipBg }]}
            >
              <Ionicons name="book-outline" size={15} color={theme.textPrimary} />
              <Text style={[styles.dailyActionText, { color: theme.textPrimary }]}>Study</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
