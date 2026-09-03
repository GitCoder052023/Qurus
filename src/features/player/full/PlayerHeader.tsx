import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import type { SurahMetadata } from '../../../types';
import { styles } from './styles';

interface PlayerHeaderProps {
  currentSurah: SurahMetadata | null | undefined;
  currentAyahNumber: number;
  bookmarked: boolean;
  onClose: () => void;
  onBookmarkToggle: () => void;
  onToggleReciterPicker: () => void;
}

export function PlayerHeader({
  currentSurah,
  currentAyahNumber,
  bookmarked,
  onClose,
  onBookmarkToggle,
  onToggleReciterPicker,
}: PlayerHeaderProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={onClose}
        style={[styles.headerBtn, { backgroundColor: theme.chipBg }]}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Ionicons name="chevron-down" size={24} color={theme.textPrimary} />
      </TouchableOpacity>

      <View style={styles.headerCenter}>
        <Text style={[styles.headerSurahEnglish, { color: theme.textPrimary }]} numberOfLines={1}>
          {currentSurah?.englishName}
        </Text>
        <Text style={[styles.headerSurahArabic, { color: theme.textSecondary }]} numberOfLines={1}>
          {currentSurah?.name} • Ayah {currentAyahNumber} of {currentSurah?.numberOfAyahs}
        </Text>
      </View>

      <View style={styles.headerRightGroup}>
        <TouchableOpacity
          onPress={onBookmarkToggle}
          style={[
            styles.headerBtn,
            { backgroundColor: theme.chipBg },
            bookmarked && { backgroundColor: theme.accentGold + '20' },
          ]}
        >
          <Ionicons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={20}
            color={bookmarked ? theme.bookmarkIcon : theme.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onToggleReciterPicker}
          style={[styles.headerBtn, { backgroundColor: theme.chipBg }]}
        >
          <Ionicons name="mic-outline" size={19} color={theme.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
