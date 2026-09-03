import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import type { SurahData } from '../../../types';
import { styles } from '../styles';

interface SurahBannerProps {
  surahData: SurahData;
  isSurahPlaying: boolean;
  onPlayToggle: () => void;
}

export function SurahBanner({ surahData, isSurahPlaying, onPlayToggle }: SurahBannerProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.bannerCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.bannerTopRow}>
        <View style={[styles.surahPill, { backgroundColor: theme.surfaceHighlight }]}>
          <Text style={[styles.surahPillText, { color: theme.primary }]}>
            Surah {surahData.number}
          </Text>
        </View>
        <View style={[styles.surahPill, { backgroundColor: theme.surface }]}>
          <Text style={[styles.surahPillText, { color: theme.textSecondary }]}>
            {surahData.revelationType} • {surahData.numberOfAyahs} Ayahs
          </Text>
        </View>
      </View>

      <Text style={[styles.arabicSurahTitle, { color: theme.arabicText }]}>{surahData.name}</Text>
      <Text style={[styles.englishSurahTitle, { color: theme.textPrimary }]}>
        {surahData.englishName}
      </Text>
      <Text style={[styles.urduSurahTitle, { color: theme.textSecondary }]}>
        {surahData.urduName}
      </Text>

      {/* Play entire Surah button */}
      <TouchableOpacity
        onPress={onPlayToggle}
        style={[styles.playSurahBtn, { backgroundColor: theme.primary }]}
        activeOpacity={0.85}
      >
        <Ionicons
          name={isSurahPlaying ? 'pause-circle' : 'play-circle'}
          size={22}
          color="#FFFFFF"
        />
        <Text style={styles.playSurahBtnText}>
          {isSurahPlaying ? 'Pause Recitation' : 'Play Full Surah Recitation'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
