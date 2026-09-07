import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../../../context/ThemeContext';
import { SurahMetadata } from '../../../types';
import { styles } from '../styles/home.styles';

interface ResumeStudyCardProps {
  lastSurah: SurahMetadata | null | undefined;
  lastStudied: { surahNumber: number; ayahNumber: number } | null | undefined;
  isLastStudiedPlaying: boolean;
  progressPercent: number;
  onPressCard: () => void;
  onPressPlay: (e: any) => void;
  theme: ThemeColors;
}

export const ResumeStudyCard: React.FC<ResumeStudyCardProps> = React.memo(
  function ResumeStudyCard({
    lastSurah,
    lastStudied,
    isLastStudiedPlaying,
    progressPercent,
    onPressCard,
    onPressPlay,
    theme,
  }) {
    return (
      <View style={styles.section}>
        <TouchableOpacity
          activeOpacity={0.92}
          onPress={onPressCard}
          style={[
            styles.heroCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.borderSubtle,
            },
          ]}
        >
          <View style={styles.heroEyebrowRow}>
            <View style={[styles.heroEyebrowPill, { backgroundColor: theme.chipBg }]}>
              <Ionicons name="book-outline" size={12} color={theme.primary} />
              <Text style={[styles.heroStatusText, { color: theme.primary }]}>CONTINUE READING</Text>
            </View>
          </View>

          <View style={styles.heroMainRow}>
            <View style={styles.heroLeftCol}>
              <Text style={[styles.heroEnglishTitle, { color: theme.textPrimary }]}>
                {lastSurah ? lastSurah.englishName : 'Al-Faatiha'}
              </Text>
              <Text style={[styles.heroArabicTitle, { color: theme.arabicText }]}>
                {lastSurah ? lastSurah.name : 'سُورَةُ ٱلْفَاتِحَةِ'}
              </Text>
              <Text style={[styles.heroVerseCount, { color: theme.textSecondary }]}>
                Ayah {lastStudied ? lastStudied.ayahNumber : 1} of {lastSurah ? lastSurah.numberOfAyahs : 7}
              </Text>
            </View>

            {/* Large Breathing Play Button */}
            <TouchableOpacity
              onPress={onPressPlay}
              style={[styles.heroPlayBtn, { backgroundColor: theme.primary }]}
              activeOpacity={0.85}
            >
              <Ionicons
                name={isLastStudiedPlaying ? 'pause' : 'play'}
                size={24}
                color={theme.onPrimary}
                style={!isLastStudiedPlaying ? { marginLeft: 2 } : undefined}
              />
            </TouchableOpacity>
          </View>

          {/* Smooth Progress Track */}
          <View style={styles.heroProgressSection}>
            <View style={[styles.heroProgressTrack, { backgroundColor: theme.surfaceHighlight }]}>
              <View
                style={[
                  styles.heroProgressBar,
                  {
                    width: `${progressPercent}%`,
                    backgroundColor: theme.primary,
                  },
                ]}
              />
            </View>
            <View style={styles.heroProgressLabels}>
              <Text style={[styles.heroProgressText, { color: theme.textTertiary }]}>
                {progressPercent}% of this surah
              </Text>
              <View style={styles.heroResumeTouch}>
                <Text style={[styles.heroResumeText, { color: theme.primary }]}>Open Reader</Text>
                <Ionicons name="arrow-forward" size={13} color={theme.primary} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
);
