import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/fullPlayer.styles';

interface PlayerHeaderProps {
  onClose: () => void;
  surahEnglishName?: string;
  surahArabicName?: string;
  currentAyahNumber: number;
  totalAyahs?: number;
  bookmarked: boolean;
  onToggleBookmark: () => void;
  onToggleReciterPicker: () => void;
  theme: any;
}

export function PlayerHeader({
  onClose,
  surahEnglishName,
  surahArabicName,
  currentAyahNumber,
  totalAyahs,
  bookmarked,
  onToggleBookmark,
  onToggleReciterPicker,
  theme,
}: PlayerHeaderProps) {
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
          {surahEnglishName}
        </Text>
        <Text style={[styles.headerSurahArabic, { color: theme.textSecondary }]} numberOfLines={1}>
          {surahArabicName} • Ayah {currentAyahNumber} of {totalAyahs}
        </Text>
      </View>

      <View style={styles.headerRightGroup}>
        <TouchableOpacity
          onPress={onToggleBookmark}
          style={[
            styles.headerBtn,
            { backgroundColor: theme.chipBg },
            bookmarked && { backgroundColor: theme.secondaryMuted },
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
