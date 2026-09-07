import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../../../context/ThemeContext';
import { SurahMetadata } from '../../../types';
import { styles } from '../styles/quranList.styles';

interface SurahProgress {
  completedCount: number;
  totalCount: number;
  percent: number;
  isCompleted: boolean;
}

interface SurahListItemCardProps {
  item: SurahMetadata;
  progress: SurahProgress;
  onPress: () => void;
  theme: ThemeColors;
}

export const SurahListItemCard: React.FC<SurahListItemCardProps> = React.memo(
  function SurahListItemCard({ item, progress, onPress, theme }) {
    return (
      <TouchableOpacity
        activeOpacity={0.82}
        onPress={onPress}
        style={[
          styles.surahCard,
          {
            backgroundColor: theme.card,
            borderColor: progress.isCompleted ? theme.primaryMuted : theme.border,
          },
        ]}
      >
        <View style={styles.surahMainContent}>
          {/* Number Badge */}
          <View
            style={[
              styles.surahNumberCircle,
              {
                backgroundColor: progress.isCompleted
                  ? theme.primary
                  : theme.surfaceHighlight,
              },
            ]}
          >
            {progress.isCompleted ? (
              <Ionicons name="checkmark" size={16} color={theme.onPrimary} />
            ) : (
              <Text style={[styles.surahNumberText, { color: theme.primary }]}>
                {item.number}
              </Text>
            )}
          </View>

          {/* English details */}
          <View style={styles.surahDetails}>
            <View style={styles.titleWithBadgeRow}>
              <Text style={[styles.surahEnglishTitle, { color: theme.textPrimary }]}>
                {item.englishName}
              </Text>
              {progress.isCompleted && (
                <View style={[styles.completedPill, { backgroundColor: theme.primaryMuted }]}>
                  <Text style={[styles.completedPillText, { color: theme.primary }]}>
                    Complete
                  </Text>
                </View>
              )}
            </View>

            <Text style={[styles.surahUrduTitle, { color: theme.textSecondary }]} numberOfLines={1}>
              {item.urduName}
            </Text>

            <View style={styles.metaRow}>
              <View style={[styles.revBadge, { backgroundColor: theme.surface }]}>
                <Text style={[styles.revText, { color: theme.textTertiary }]}>
                  {item.revelationType}
                </Text>
              </View>
              <Text style={[styles.metaText, { color: theme.textTertiary }]}>
                {item.numberOfAyahs} Ayahs • Juz {item.juzStart}
              </Text>
            </View>
          </View>

          {/* Arabic Calligraphy Title */}
          <View style={styles.arabicCol}>
            <Text style={[styles.surahArabicTitle, { color: theme.arabicText }]}>{item.name}</Text>
          </View>
        </View>

        {/* Progress Track (if started and not yet 100%) */}
        {progress.completedCount > 0 && !progress.isCompleted && (
          <View style={styles.cardProgressFooter}>
            <View style={[styles.cardProgressTrack, { backgroundColor: theme.surfaceHighlight }]}>
              <View
                style={[
                  styles.cardProgressBar,
                  {
                    width: `${progress.percent}%`,
                    backgroundColor: theme.primary,
                  },
                ]}
              />
            </View>
            <Text style={[styles.cardProgressLabel, { color: theme.textTertiary }]}>
              {progress.completedCount}/{progress.totalCount} ayahs ({progress.percent}%)
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
);
