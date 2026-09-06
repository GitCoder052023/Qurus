import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useStudyState, getLocalDateString, getYesterdayDateString } from '../../context/StudyContext';

const MOTIVATION_QUOTES = [
  {
    quote: 'An unexamined life is not worth living.',
    source: 'Socrates',
  },
  {
    quote: 'The pursuit of truth and beauty is a sphere of activity in which we are permitted to remain children all our lives.',
    source: 'Albert Einstein',
  },
  {
    quote: 'Wonder is the beginning of wisdom.',
    source: 'Socrates',
  },
  {
    quote: 'A few verses explored with deep reflection are greater than chapters skimmed without thought.',
    source: 'Contemplative Wisdom',
  },
  {
    quote: 'Do not believe anything simply because you have heard it; test it against reason and honest inquiry.',
    source: 'Universal Principle',
  },
  {
    quote: 'Small, consistent daily reflections build a lifetime of clarity.',
    source: 'Daily Wisdom',
  },
  {
    quote: 'The important thing is not to stop questioning. Curiosity has its own reason for existing.',
    source: 'Albert Einstein',
  },
];

const STREAK_MILESTONES = [3, 7, 14, 30, 50, 100, 365];

export const StreakSection = React.memo(function StreakSection() {
  const { theme } = useTheme();
  const { streak, lastStudied } = useStudyState();
  const router = useRouter();

  const [nowTime, setNowTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNowTime(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  const todayStr = useMemo(() => getLocalDateString(), []);
  const yesterdayStr = useMemo(() => getYesterdayDateString(), []);

  const isActiveToday = streak.lastActiveDate === todayStr;
  const isPendingToday = streak.lastActiveDate === yesterdayStr && !isActiveToday;
  const effectiveStreak = isActiveToday || isPendingToday ? streak.currentStreak : 0;

  const currentHour = nowTime.getHours();
  const currentMinutes = nowTime.getMinutes();
  const midnight = new Date(nowTime);
  midnight.setHours(24, 0, 0, 0);
  const msLeft = Math.max(0, midnight.getTime() - nowTime.getTime());
  const hoursLeft = Math.floor(msLeft / (1000 * 60 * 60));
  const minutesLeft = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));

  const isStreakAtRisk = !isActiveToday && effectiveStreak > 0;
  const isFinalCall = isStreakAtRisk && currentHour === 23 && currentMinutes >= 45; // 11:45 PM+
  const isCriticalHour = isStreakAtRisk && currentHour === 23 && currentMinutes < 45; // 11:00 PM+
  const isUrgentEvening = isStreakAtRisk && currentHour >= 21; // 9:00 PM+

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

  const statusLabel = isActiveToday
    ? 'Safe Today ✓'
    : isFinalCall
    ? 'Final Call 🔥'
    : isCriticalHour
    ? 'Critical 🚨'
    : isUrgentEvening
    ? 'In Danger ⏳'
    : isStreakAtRisk
    ? 'At Risk ⚠️'
    : 'Begin';

  const punchline = isActiveToday
    ? `${effectiveStreak} days protected from midnight reset. Al-hamdu lillah!`
    : isFinalCall
    ? `🚨 15 MINS LEFT: Don't lose your ${effectiveStreak}-day streak!`
    : isCriticalHour
    ? `⚠️ 1 HOUR LEFT: Your ${effectiveStreak}-day streak resets to 0 at midnight!`
    : isUrgentEvening
    ? `⏳ Resets at midnight: Just 1 verse saves your ${effectiveStreak}-day streak.`
    : isPendingToday
    ? `Just 1 verse protects your ${effectiveStreak}-day dedication.`
    : 'One verse is enough to begin your streak.';

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: isFinalCall
              ? '#FF2A00'
              : isUrgentEvening
              ? '#FF5722'
              : isStreakAtRisk
              ? '#FF8C00'
              : isActiveToday
              ? theme.primary
              : theme.borderSubtle,
            borderWidth: isStreakAtRisk || isActiveToday ? 1.5 : StyleSheet.hairlineWidth,
          },
        ]}
      >
        {/* DUOLINGO-STYLE PRESSURE & FOMO URGENCY BANNER */}
        {isStreakAtRisk && (
          <View
            style={[
              styles.urgencyBanner,
              {
                backgroundColor: isFinalCall
                  ? '#FF2A0018'
                  : isCriticalHour
                  ? '#FF572218'
                  : '#FF8C0018',
                borderColor: isFinalCall
                  ? '#FF2A00'
                  : isCriticalHour
                  ? '#FF5722'
                  : '#FF8C00',
              },
            ]}
          >
            <View style={styles.urgencyHeaderRow}>
              <View style={styles.urgencyBadge}>
                <Ionicons
                  name="flame"
                  size={15}
                  color={isFinalCall ? '#FF2A00' : isCriticalHour ? '#FF5722' : '#FF8C00'}
                />
                <Text
                  style={[
                    styles.urgencyBadgeText,
                    {
                      color: isFinalCall
                        ? '#FF2A00'
                        : isCriticalHour
                        ? '#FF5722'
                        : '#FF8C00',
                    },
                  ]}
                >
                  {isFinalCall
                    ? 'FINAL CALL • 15 MINS LEFT'
                    : isCriticalHour
                    ? `CRITICAL • ${minutesLeft}M TO MIDNIGHT`
                    : isUrgentEvening
                    ? `STREAK IN DANGER • ${hoursLeft}H ${minutesLeft}M LEFT`
                    : `STREAK AT RISK • ${hoursLeft}H ${minutesLeft}M LEFT`}
                </Text>
              </View>
            </View>
            <Text style={[styles.urgencyMessage, { color: theme.textPrimary }]}>
              {isFinalCall
                ? `Don't throw away ${effectiveStreak} days of dedication in the final 15 minutes! Open just 1 verse right now—it takes only 45 seconds to keep your streak alive.`
                : isCriticalHour
                ? `In less than 1 hour, your ${effectiveStreak}-day streak will be wiped to Day 0. Don't lose your consistency—read 1 single ayah to protect it!`
                : isUrgentEvening
                ? `You haven't studied today. Are you really going to let ${effectiveStreak} days of progress reset at midnight? Just 1 verse saves your streak.`
                : `Your ${effectiveStreak}-day streak resets at midnight if you don't read today. Just 1 verse (45s) saves your progress.`}
            </Text>
          </View>
        )}

        {/* STREAK SAFE DOPAMINE BANNER */}
        {isActiveToday && (
          <View
            style={[
              styles.safeBanner,
              {
                backgroundColor: theme.primaryMuted,
                borderColor: theme.primary,
              },
            ]}
          >
            <View style={styles.safeHeaderRow}>
              <Ionicons name="checkmark-circle" size={15} color={theme.primary} />
              <Text style={[styles.safeBadgeText, { color: theme.primary }]}>
                STREAK PROTECTED TODAY • SAFE UNTIL MIDNIGHT
              </Text>
            </View>
            <Text style={[styles.safeMessage, { color: theme.textSecondary }]}>
              {effectiveStreak} days of consistency alive. You took time for the Quran today. Al-hamdu lillah!
            </Text>
          </View>
        )}

        <View style={styles.heroRow}>
          <View
            style={[
              styles.iconCircle,
              {
                backgroundColor: isFinalCall
                  ? '#FF2A0025'
                  : isUrgentEvening
                  ? '#FF572225'
                  : isStreakAtRisk
                  ? '#FF8C0020'
                  : theme.primaryMuted,
              },
            ]}
          >
            <Ionicons
              name={effectiveStreak > 0 ? 'flame' : 'leaf-outline'}
              size={24}
              color={
                isFinalCall
                  ? '#FF2A00'
                  : isUrgentEvening
                  ? '#FF5722'
                  : isStreakAtRisk
                  ? '#FF8C00'
                  : effectiveStreak > 0
                  ? theme.primary
                  : theme.textTertiary
              }
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
              <View
                style={[
                  styles.statusPill,
                  {
                    backgroundColor: isFinalCall
                      ? '#FF2A0020'
                      : isUrgentEvening
                      ? '#FF572220'
                      : isStreakAtRisk
                      ? '#FF8C0020'
                      : theme.chipBg,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    {
                      color: isFinalCall
                        ? '#FF2A00'
                        : isUrgentEvening
                        ? '#FF5722'
                        : isStreakAtRisk
                        ? '#FF8C00'
                        : theme.primary,
                      fontWeight: '700',
                    },
                  ]}
                >
                  {statusLabel}
                </Text>
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
                            borderColor: isStreakAtRisk ? '#FF8C00' : theme.primary,
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
                { width: `${milestoneProgress}%`, backgroundColor: theme.tertiary },
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
          style={[
            styles.cta,
            {
              backgroundColor: isFinalCall
                ? '#FF2A00'
                : isUrgentEvening
                ? '#FF5722'
                : isStreakAtRisk
                ? '#FF8C00'
                : theme.primary,
            },
          ]}
        >
          <Ionicons
            name={isStreakAtRisk ? 'flame' : 'book-outline'}
            size={18}
            color={theme.onPrimary}
          />
          <Text style={[styles.ctaText, { color: theme.onPrimary }]}>
            {isFinalCall
              ? '🔥 Save Streak Now (Just 1 Verse)'
              : isUrgentEvening
              ? `🔥 Save ${effectiveStreak}-Day Streak (45s)`
              : isStreakAtRisk
              ? 'Save Streak with 1 Verse'
              : 'Continue reading'}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    paddingVertical: 14,
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '700',
  },
  urgencyBanner: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
    gap: 6,
  },
  urgencyHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  urgencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  urgencyBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  urgencyMessage: {
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: '500',
  },
  safeBanner: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
    gap: 5,
  },
  safeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  safeBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  safeMessage: {
    fontSize: 12.5,
    lineHeight: 17,
  },
});
