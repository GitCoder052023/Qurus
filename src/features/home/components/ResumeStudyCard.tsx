import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { GestureResponderEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import type { LastStudiedState, SurahMetadata } from '@/types';
import { styles } from '../styles';

interface ResumeStudyCardProps {
  lastStudied: LastStudiedState | null;
  lastSurah: SurahMetadata | null | undefined;
  isLastStudiedPlaying: boolean | null | undefined;
  progressPercent: number;
  onContinueStudying: () => void;
  onPlayLastStudied: (e: GestureResponderEvent) => void;
}

export function ResumeStudyCard({
  lastStudied,
  lastSurah,
  isLastStudiedPlaying,
  progressPercent,
  onContinueStudying,
  onPlayLastStudied,
}: ResumeStudyCardProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.section}>
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={onContinueStudying}
        style={[
          styles.heroCard,
          {
            backgroundColor: theme.cardElevated,
            borderColor: theme.borderSubtle,
            shadowColor: '#000',
          },
        ]}
      >
        <View style={styles.heroTopTag}>
          <View style={[styles.heroStatusDot, { backgroundColor: theme.primary }]} />
          <Text style={[styles.heroStatusText, { color: theme.primary }]}>RESUME STUDY JOURNEY</Text>
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
              Ayah {lastStudied ? lastStudied.ayahNumber : 1} of{' '}
              {lastSurah ? lastSurah.numberOfAyahs : 7}
            </Text>
          </View>

          <TouchableOpacity
            onPress={onPlayLastStudied}
            style={[styles.heroPlayBtn, { backgroundColor: theme.primary }]}
            activeOpacity={0.85}
          >
            <Ionicons
              name={isLastStudiedPlaying ? 'pause' : 'play'}
              size={26}
              color="#FFFFFF"
              style={!isLastStudiedPlaying ? { marginLeft: 3 } : undefined}
            />
          </TouchableOpacity>
        </View>

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
              {progressPercent}% completed in Surah
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
