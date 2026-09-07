import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../../../context/ThemeContext';
import { SurahData } from '../../../types';
import { styles } from '../styles/reader.styles';

interface SurahProgress {
  completedCount: number;
  totalCount: number;
  percent: number;
  isCompleted: boolean;
  estimatedMinutesRemaining: number;
}

interface SurahBannerCardProps {
  surahData: SurahData;
  surahProgress: SurahProgress;
  isSurahPlaying: boolean;
  onPlayToggle: () => void;
  theme: ThemeColors;
}

export const SurahBannerCard: React.FC<SurahBannerCardProps> = React.memo(
  function SurahBannerCard({
    surahData,
    surahProgress,
    isSurahPlaying,
    onPlayToggle,
    theme,
  }) {
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

        {/* Surah Progress Indicator */}
        <View style={styles.surahProgressWrapper}>
          <View style={[styles.surahProgressTrack, { backgroundColor: theme.surfaceHighlight }]}>
            <View
              style={[
                styles.surahProgressBar,
                {
                  width: `${Math.max(1, surahProgress.percent)}%`,
                  backgroundColor: theme.primary,
                },
              ]}
            />
          </View>
          <View style={styles.surahProgressMetaRow}>
            <Text style={[styles.surahProgressMetaText, { color: theme.textTertiary }]}>
              {surahProgress.completedCount} of {surahProgress.totalCount} Ayahs ({surahProgress.percent}%)
            </Text>
            <Text style={[styles.surahProgressMetaText, { color: theme.primary, fontWeight: '600' }]}>
              {surahProgress.isCompleted
                ? '✓ Surah Complete'
                : `~${surahProgress.estimatedMinutesRemaining}m left`}
            </Text>
          </View>
        </View>

        {/* Play entire Surah button */}
        <TouchableOpacity
          onPress={onPlayToggle}
          style={[styles.playSurahBtn, { backgroundColor: theme.primary }]}
          activeOpacity={0.85}
        >
          <Ionicons
            name={isSurahPlaying ? 'pause-circle' : 'play-circle'}
            size={22}
            color={theme.onPrimary}
          />
          <Text style={[styles.playSurahBtnText, { color: theme.onPrimary }]}>
            {isSurahPlaying ? 'Pause Recitation' : 'Play Full Surah Recitation'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
);
