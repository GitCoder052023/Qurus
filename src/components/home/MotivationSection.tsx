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
      {/* 1. DAILY TADABBUR GOAL CARD (Duolingo-style Dopamine Meter) */}
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
            <View style={[styles.iconBadge, { backgroundColor: theme.primaryMuted }]}>
              <Ionicons
                name={dailyProgress.isGoalMet ? 'checkmark-circle' : 'sparkles'}
                size={18}
                color={theme.primary}
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

          <View style={[styles.pillBadge, { backgroundColor: theme.chipBg }]}>
            <Text style={[styles.pillBadgeText, { color: theme.primary }]}>
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
                backgroundColor: dailyProgress.isGoalMet ? theme.primary : theme.tertiary,
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
            <Text style={[styles.adjustGoalText, { color: theme.primary }]}>Adjust Goal</Text>
            <Ionicons name="chevron-forward" size={12} color={theme.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. OVERALL QURAN & ACTIVE SURAH PROGRESSION */}
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
            <Text style={[styles.quranTitle, { color: theme.textPrimary }]}>
              Quran Journey
            </Text>
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
            <Text style={[styles.quranSubtext, { color: theme.textTertiary }]}>
              {quranProgress.completedSurahsCount} of 114 Surahs complete
            </Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

        {/* Active Surah Progress */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={handleContinueSurah}
          style={styles.surahProgressRow}
        >
          <View style={styles.surahLeftCol}>
            <View style={styles.surahNameRow}>
              <Text style={[styles.surahNameText, { color: theme.textPrimary }]}>
                {activeSurahMeta ? activeSurahMeta.englishName : 'Al-Faatiha'}
              </Text>
              <Text style={[styles.surahArabicSnippet, { color: theme.arabicText }]}>
                {activeSurahMeta ? activeSurahMeta.name : ''}
              </Text>
            </View>
            <Text style={[styles.surahRemainingText, { color: theme.textSecondary }]}>
              {surahProgress.completedCount} of {surahProgress.totalCount} ayahs •{' '}
              {formatRemainingTime(surahProgress.estimatedMinutesRemaining)}
            </Text>
          </View>

          <View style={styles.surahActionRight}>
            <View style={[styles.surahPercentPill, { backgroundColor: theme.surfaceHighlight }]}>
              <Text style={[styles.surahPercentText, { color: theme.textPrimary }]}>
                {surahProgress.percent}%
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={theme.textTertiary} />
          </View>
        </TouchableOpacity>
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
    gap: 8,
  },
  quranTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quranTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  quranPercentage: {
    fontSize: 14,
    fontWeight: '700',
  },
  smallTrack: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  smallFill: {
    height: '100%',
    borderRadius: 2,
  },
  quranSubRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quranSubtext: {
    fontSize: 11,
    fontWeight: '500',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 14,
  },
  surahProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  surahLeftCol: {
    flex: 1,
    marginRight: 10,
  },
  surahNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  surahNameText: {
    fontSize: 15,
    fontWeight: '600',
  },
  surahArabicSnippet: {
    fontSize: 14,
    fontFamily: 'serif',
  },
  surahRemainingText: {
    fontSize: 12,
  },
  surahActionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  surahPercentPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  surahPercentText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
