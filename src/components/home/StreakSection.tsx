import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useStudyState, getLocalDateString, getYesterdayDateString } from '../../context/StudyContext';

const MOTIVATION_QUOTES = [
  {
    quote: 'The most beloved deeds to Allah are those done regularly, even if they are small.',
    source: 'Prophet Muhammad ﷺ • Bukhari',
  },
  {
    quote: 'Read the Quran, for it will come as an intercessor for its reciters on the Day of Judgment.',
    source: 'Prophet Muhammad ﷺ • Muslim',
  },
  {
    quote: 'Whoever reads a letter from Allah’s Book receives a reward multiplied tenfold.',
    source: 'Prophet Muhammad ﷺ • Tirmidhi',
  },
  {
    quote: 'The best among you are those who learn the Quran and teach it to others.',
    source: 'Prophet Muhammad ﷺ • Bukhari',
  },
  {
    quote: 'Hearts find true peace and solace in the daily remembrance of Allah.',
    source: 'Surah Ar-Ra`d • 13:28',
  },
  {
    quote: 'A few verses recited with deep reflection are greater than chapters skimmed without heart.',
    source: 'Ibn al-Qayyim',
  },
  {
    quote: 'Be steadfast with the Quran; it illuminates your days and softens the heart.',
    source: 'Spiritual wisdom',
  },
];

const STREAK_MILESTONES = [3, 7, 14, 30, 50, 100, 365];

export const StreakSection = React.memo(function StreakSection() {
  const { theme } = useTheme();
  const { streak, lastStudied } = useStudyState();
  const router = useRouter();

  const todayStr = useMemo(() => getLocalDateString(), []);
  const yesterdayStr = useMemo(() => getYesterdayDateString(), []);

  const isActiveToday = streak.lastActiveDate === todayStr;
  const isPendingToday = streak.lastActiveDate === yesterdayStr && !isActiveToday;
  const effectiveStreak = isActiveToday || isPendingToday ? streak.currentStreak : 0;

  const nextMilestone = useMemo(() => {
    return STREAK_MILESTONES.find((m) => m > effectiveStreak) || effectiveStreak + 7;
  }, [effectiveStreak]);

  const prevMilestone = useMemo(() => {
    const passed = STREAK_MILESTONES.filter((m) => m <= effectiveStreak);
    return passed.length > 0 ? passed[passed.length - 1] : 0;
  }, [effectiveStreak]);

  const milestoneProgress = useMemo(() => {
    const range = nextMilestone - prevMilestone;
    if (range <= 0) return 100;
    const progress = (effectiveStreak - prevMilestone) / range;
    return Math.min(100, Math.max(0, Math.round(progress * 100)));
  }, [effectiveStreak, nextMilestone, prevMilestone]);

  const daysLeft = nextMilestone - effectiveStreak;

  const dailyMotivation = useMemo(() => {
    const day = new Date().getDay();
    return MOTIVATION_QUOTES[day % MOTIVATION_QUOTES.length];
  }, []);

  const weekDays = useMemo(() => {
    const now = new Date();
    const currentDay = now.getDay();
    const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(now);
    monday.setDate(now.getDate() + distanceToMonday);

    const labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const days = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dStr = getLocalDateString(d);
      const isToday = dStr === todayStr;
      const isCompleted = streak.activeDates.includes(dStr);

      days.push({
        label: labels[i],
        dateStr: dStr,
        isToday,
        isCompleted,
      });
    }

    return days;
  }, [streak.activeDates, todayStr]);

  const handleStudyPress = () => {
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

  const statusLabel = isActiveToday ? 'Kept today' : isPendingToday ? 'Waiting' : 'Begin';
  const punchline = isActiveToday
    ? 'A quiet day of presence. Come back tomorrow.'
    : isPendingToday
    ? `One ayah keeps your ${effectiveStreak}-day rhythm.`
    : 'One ayah is enough to begin.';

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.borderSubtle,
          },
        ]}
      >
        <View style={styles.heroRow}>
          <View
            style={[
              styles.iconCircle,
              {
                backgroundColor: theme.primaryMuted,
              },
            ]}
          >
            <Ionicons
              name="leaf-outline"
              size={22}
              color={effectiveStreak > 0 ? theme.primary : theme.textTertiary}
            />
          </View>

          <View style={styles.heroTextCol}>
            <View style={styles.titleRow}>
              <Text style={[styles.streakNumber, { color: theme.textPrimary }]}>
                {effectiveStreak}
              </Text>
              <Text style={[styles.streakUnit, { color: theme.textSecondary }]}>
                {effectiveStreak === 1 ? 'day' : 'days'}
              </Text>
              <View style={[styles.statusPill, { backgroundColor: theme.chipBg }]}>
                <Text style={[styles.statusText, { color: theme.textSecondary }]}>{statusLabel}</Text>
              </View>
            </View>
            <Text style={[styles.punchline, { color: theme.textSecondary }]}>{punchline}</Text>
          </View>
        </View>

        <View style={styles.weekTrackContainer}>
          <View style={styles.daysRow}>
            {weekDays.map((d, index) => {
              const filled = d.isCompleted;
              const todayOpen = d.isToday && !d.isCompleted;

              return (
                <View key={d.dateStr || index} style={styles.dayCol}>
                  <Text
                    style={[
                      styles.dayLetter,
                      {
                        color: d.isToday ? theme.primary : theme.textTertiary,
                        fontWeight: d.isToday ? '600' : '500',
                      },
                    ]}
                  >
                    {d.label}
                  </Text>
                  <View
                    style={[
                      styles.dayDot,
                      filled
                        ? { backgroundColor: theme.primary }
                        : todayOpen
                        ? {
                            backgroundColor: theme.card,
                            borderColor: theme.primary,
                            borderWidth: 1.5,
                          }
                        : { backgroundColor: theme.chipBg },
                    ]}
                  >
                    {filled ? (
                      <Ionicons name="checkmark" size={12} color={theme.onPrimary} />
                    ) : null}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={[styles.motivationBox, { backgroundColor: theme.surface }]}>
          <View style={styles.milestoneRow}>
            <Text style={[styles.milestoneGoalText, { color: theme.textPrimary }]}>
              Next: {nextMilestone} days
            </Text>
            <Text style={[styles.milestoneDaysLeft, { color: theme.textTertiary }]}>
              {daysLeft === 1 ? '1 day left' : `${daysLeft} days left`}
            </Text>
          </View>

          <View style={[styles.progressTrack, { backgroundColor: theme.surfaceHighlight }]}>
            <View
              style={[
                styles.progressFill,
                { width: `${milestoneProgress}%`, backgroundColor: theme.primary },
              ]}
            />
          </View>

          <Text style={[styles.quoteText, { color: theme.textPrimary }]}>
            “{dailyMotivation.quote}”
          </Text>
          <Text style={[styles.quoteAuthor, { color: theme.textTertiary }]}>
            {dailyMotivation.source}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleStudyPress}
          style={[styles.cta, { backgroundColor: theme.primary }]}
        >
          <Text style={[styles.ctaText, { color: theme.onPrimary }]}>
            {isActiveToday ? 'Continue reading' : 'Read one ayah'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  card: {
    borderRadius: 24,
    padding: 20,
    borderWidth: StyleSheet.hairlineWidth,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 18,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTextCol: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  streakNumber: {
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: -0.6,
  },
  streakUnit: {
    fontSize: 15,
    fontWeight: '500',
  },
  statusPill: {
    marginLeft: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '500',
  },
  punchline: {
    fontSize: 13,
    lineHeight: 18,
  },
  weekTrackContainer: {
    marginBottom: 16,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dayCol: {
    alignItems: 'center',
    gap: 8,
  },
  dayLetter: {
    fontSize: 11,
  },
  dayDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  motivationBox: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  milestoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  milestoneGoalText: {
    fontSize: 12,
    fontWeight: '500',
  },
  milestoneDaysLeft: {
    fontSize: 12,
  },
  progressTrack: {
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  quoteText: {
    fontSize: 13,
    lineHeight: 20,
  },
  quoteAuthor: {
    fontSize: 11,
    marginTop: 6,
  },
  cta: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingVertical: 14,
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
