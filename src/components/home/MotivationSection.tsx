import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useStudyState } from '../../context/StudyContext';
import { SURAHS } from '../../data/surahs';

export const MotivationSection = React.memo(function MotivationSection() {
  const { theme } = useTheme();
  const router = useRouter();
  const {
    lastStudied,
    getSurahProgress,
    getQuranProgress,
    getDailyProgress,
  } = useStudyState();

  const quranProgress = useMemo(() => getQuranProgress(), [getQuranProgress]);
  const dailyProgress = useMemo(() => getDailyProgress(), [getDailyProgress]);

  const activeSurahNumber = lastStudied?.surahNumber || 1;
  const activeSurahMeta = useMemo(
    () => SURAHS.find((s) => s.number === activeSurahNumber),
    [activeSurahNumber]
  );
  const surahProgress = useMemo(
    () => getSurahProgress(activeSurahNumber),
    [getSurahProgress, activeSurahNumber]
  );

  const formatRemainingTime = (minutes: number) => {
    if (minutes <= 0) return 'Complete';
    if (minutes < 60) return `~${minutes}m remaining`;
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `~${hrs}h ${mins}m left` : `~${hrs}h left`;
  };

  const handleContinueSurah = () => {
    if (lastStudied) {
      router.push({
        pathname: '/reader/[surah]',
        params: { surah: String(lastStudied.surahNumber), ayah: String(lastStudied.ayahNumber) },
      });
    } else {
      router.push({
        pathname: '/reader/[surah]',
        params: { surah: '1', ayah: '1' },
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* 1. DAILY TADABBUR GOAL CARD (Warm Golden Amber Mindfulness Theme) */}
      <View
        style={[
          styles.mainCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.borderSubtle,
          },
        ]}
      >
        <View style={styles.cardHeaderRow}>
          <View style={styles.titleGroup}>
            <View style={[styles.iconBadge, { backgroundColor: theme.amberMuted }]}>
              <Ionicons
                name={dailyProgress.isGoalMet ? 'checkmark-circle' : 'sparkles'}
                size={18}
                color={theme.accentAmber}
              />
            </View>
            <View>
              <Text style={[styles.sectionHeading, { color: theme.textPrimary }]}>
                Daily Tadabbur Goal
              </Text>
              <Text style={[styles.sectionSubheading, { color: theme.textSecondary }]}>
                {dailyProgress.isGoalMet
                  ? 'Daily reflection completed with presence'
                  : `${Math.max(0, dailyProgress.goalAyahs - dailyProgress.ayahsToday)} verses left to reach today’s mindful pause`}
              </Text>
            </View>
          </View>

          <View style={[styles.pillBadge, { backgroundColor: theme.amberMuted }]}>
            <Text style={[styles.pillBadgeText, { color: theme.accentAmber }]}>
              {dailyProgress.ayahsToday} / {dailyProgress.goalAyahs}
            </Text>
          </View>
        </View>

        {/* Progress Track */}
        <View style={[styles.progressTrack, { backgroundColor: theme.surfaceHighlight }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${dailyProgress.percent}%`,
                backgroundColor: dailyProgress.isGoalMet ? theme.primary : theme.accentAmber,
              },
            ]}
          />
        </View>

        <View style={styles.statsFooterRow}>
          <View style={styles.footerStatItem}>
            <Ionicons name="time-outline" size={13} color={theme.textTertiary} />
            <Text style={[styles.footerStatText, { color: theme.textSecondary }]}>
              {dailyProgress.minutesToday > 0
                ? `${dailyProgress.minutesToday}m dedicated today`
                : 'Paced for contemplation'}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push('/(tabs)/settings')}
            style={styles.adjustGoalTouch}
          >
            <Text style={[styles.adjustGoalText, { color: theme.accentAmber }]}>Adjust Goal</Text>
            <Ionicons name="chevron-forward" size={12} color={theme.accentAmber} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. OVERALL QURAN JOURNEY MILESTONE */}
      <View
        style={[
          styles.secondaryCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.borderSubtle,
          },
        ]}
      >
        {/* Overall Quran Bar */}
        <View style={styles.quranRow}>
          <View style={styles.quranTextRow}>
            <View style={styles.quranTitleGroup}>
              <Ionicons name="compass-outline" size={16} color={theme.primary} />
              <Text style={[styles.quranTitle, { color: theme.textPrimary }]}>
                Quran Journey
              </Text>
            </View>
            <Text style={[styles.quranPercentage, { color: theme.primary }]}>
              {quranProgress.percent}%
            </Text>
          </View>

          <View style={[styles.smallTrack, { backgroundColor: theme.surfaceHighlight }]}>
            <View
              style={[
                styles.smallFill,
                {
                  width: `${Math.max(1, quranProgress.percent)}%`,
                  backgroundColor: theme.primary,
                },
              ]}
            />
          </View>

          <View style={styles.quranSubRow}>
            <Text style={[styles.quranSubtext, { color: theme.textTertiary }]}>
              {quranProgress.completedAyahs} of {quranProgress.totalAyahs} Ayahs
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/quran')}
              style={styles.exploreAllTouch}
            >
              <Text style={[styles.exploreAllText, { color: theme.primary }]}>
                {quranProgress.completedSurahsCount} of 114 Surahs
              </Text>
              <Ionicons name="chevron-forward" size={11} color={theme.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    gap: 12,
  },
  mainCard: {
    borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    marginRight: 10,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  sectionSubheading: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  pillBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pillBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 14,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  statsFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  footerStatText: {
    fontSize: 12,
    fontWeight: '500',
  },
  adjustGoalTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  adjustGoalText: {
    fontSize: 12,
    fontWeight: '600',
  },
  secondaryCard: {
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 18,
  },
  quranRow: {
    gap: 10,
  },
  quranTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quranTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  quranTitle: {
    fontSize: 14.5,
    fontWeight: '600',
  },
  quranPercentage: {
    fontSize: 14.5,
    fontWeight: '700',
  },
  smallTrack: {
    height: 5,
    borderRadius: 2.5,
    overflow: 'hidden',
  },
  smallFill: {
    height: '100%',
    borderRadius: 2.5,
  },
  quranSubRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quranSubtext: {
    fontSize: 11.5,
    fontWeight: '500',
  },
  exploreAllTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  exploreAllText: {
    fontSize: 11.5,
    fontWeight: '600',
  },
});
