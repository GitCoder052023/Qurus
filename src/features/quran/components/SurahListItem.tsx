import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import type { SurahMetadata } from '@/types';
import { styles } from '../styles';

interface SurahListItemProps {
  item: SurahMetadata;
  onPress: (surah: SurahMetadata) => void;
}

export function SurahListItem({ item, onPress }: SurahListItemProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={() => onPress(item)}
      style={[
        styles.surahCard,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={[styles.surahNumberCircle, { backgroundColor: theme.surfaceHighlight }]}>
        <Text style={[styles.surahNumberText, { color: theme.primary }]}>{item.number}</Text>
      </View>

      <View style={styles.surahDetails}>
        <Text style={[styles.surahEnglishTitle, { color: theme.textPrimary }]}>{item.englishName}</Text>
        <Text style={[styles.surahUrduTitle, { color: theme.textSecondary }]} numberOfLines={1}>
          {item.urduName}
        </Text>
        <View style={styles.metaRow}>
          <View style={[styles.revBadge, { backgroundColor: theme.surface }]}>
            <Text style={[styles.revText, { color: theme.textTertiary }]}>{item.revelationType}</Text>
          </View>
          <Text style={[styles.metaText, { color: theme.textTertiary }]}>
            {item.numberOfAyahs} Ayahs • Juz {item.juzStart}
          </Text>
        </View>
      </View>

      <View style={styles.arabicCol}>
        <Text style={[styles.surahArabicTitle, { color: theme.arabicText }]}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}
