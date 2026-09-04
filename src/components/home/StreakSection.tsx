import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useStudyState, getLocalDateString, getYesterdayDateString } from '../../context/StudyContext';

const MOTIVATION_QUOTES = [
  {
    quote: 'The most beloved deeds to Allah are those done regularly, even if they are small.',
    source: 'Prophet Muhammad ﷺ • Bukhari',
    tip: 'Just 1 Ayah keeps your streak burning!',
  },
  {
    quote: 'Read the Quran, for it will come as an intercessor for its reciters on the Day of Judgment.',
    source: 'Prophet Muhammad ﷺ • Muslim',
    tip: 'Build a lifelong friendship with the Quran.',
  },
  {
    quote: 'Whoever reads a letter from Allah’s Book receives a reward multiplied tenfold.',
    source: 'Prophet Muhammad ﷺ • Tirmidhi',
    tip: 'Every verse recited is barakah multiplied.',
  },
  {
    quote: 'The best among you are those who learn the Quran and teach it to others.',
    source: 'Prophet Muhammad ﷺ • Bukhari',
    tip: 'Knowledge grows when practiced daily.',
  },
  {
    quote: 'Hearts find true peace and solace in the daily remembrance of Allah.',
    source: 'Surah Ar-Ra`d • 13:28',
    tip: 'Take 2 minutes of quiet reflection.',
  },
  {
    quote: 'A few verses recited with deep reflection are greater than chapters skimmed without heart.',
    source: 'Ibn al-Qayyim',
    tip: 'Quality and presence over speed.',
  },
  {
    quote: 'Be steadfast with the Quran; it illuminates your days and softens the heart.',
    source: 'Spiritual Wisdom',
    tip: 'Small daily steps lead to huge spiritual growth.',
  },
];

const STREAK_MILESTONES = [3, 7, 14, 30, 50, 100, 365];

export const StreakSection = React.memo(function StreakSection() {
  const { theme, isDark } = useTheme();
  const { streak, lastStudied } = useStudyState();
  const router = useRouter();

  const todayStr = useMemo(() => getLocalDateString(), []);
  const yesterdayStr = useMemo(() => getYesterdayDateString(), []);

  const isActiveToday = streak.lastActiveDate === todayStr;
  const isPendingToday = streak.lastActiveDate === yesterdayStr && !isActiveToday;
  const effectiveStreak = isActiveToday || isPendingToday ? streak.currentStreak : 0;

  // Next Milestone
  const nextMilestone = useMemo(() => {
    return STREAK_MILESTONES.find((m) => m > effectiveStreak) || (effectiveStreak + 7);
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

  // Curate today's spiritual motivation quote
  const dailyMotivation = useMemo(() => {
    const day = new Date().getDay();
    return MOTIVATION_QUOTES[day % MOTIVATION_QUOTES.length];
  }, []);

  // Compute 7 days of current week (Mon -> Sun)
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
      const isPast = d < now && !isToday;
      const isCompleted = streak.activeDates.includes(dStr);

      days.push({
        label: labels[i],
        dateStr: dStr,
        isToday,
        isPast,
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

  const flameOrange = '#FF9600';
  const flameShadow = '#D97706';
  const duoGreen = '#10B981';
  const duoGreenShadow = '#059669';

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.cardElevated,
            borderColor: theme.borderSubtle,
          },
        ]}
      >
        {/* ROW 1: DUOLINGO HERO STREAK HEADER */}
        <View style={styles.heroRow}>
          {/* Flame Icon with Radiant Aura */}
          <View
            style={[
              styles.flameCircle,
              {
                backgroundColor: effectiveStreak > 0
                  ? isDark ? '#3D2200' : '#FFF4E5'
                  : theme.chipBg,
                borderColor: effectiveStreak > 0 ? '#FFD08A' : theme.borderSubtle,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="fire"
              size={34}
              color={effectiveStreak > 0 ? flameOrange : theme.textTertiary}
            />
          </View>

          {/* Streak Counter & Status */}
          <View style={styles.heroTextCol}>
            <View style={styles.titleRow}>
              <Text
                style={[
                  styles.streakNumber,
                  { color: effectiveStreak > 0 ? flameOrange : theme.textPrimary },
                ]}
              >
                {effectiveStreak}
              </Text>
              <Text style={[styles.streakUnit, { color: theme.textPrimary }]}>
                {effectiveStreak === 1 ? 'DAY STREAK' : 'DAYS STREAK'}
              </Text>

              {/* Duolingo-style Status Badge */}
              <View
                style={[
                  styles.duoStatusPill,
                  {
                    backgroundColor: isActiveToday
                      ? '#10B98118'
                      : isPendingToday
                      ? '#FF960018'
                      : theme.chipBg,
                  },
                ]}
              >
                <View
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor: isActiveToday
                        ? duoGreen
                        : isPendingToday
                        ? flameOrange
                        : theme.textTertiary,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.duoStatusText,
                    {
                      color: isActiveToday
                        ? duoGreen
                        : isPendingToday
                        ? flameOrange
                        : theme.textSecondary,
                    },
                  ]}
                >
                  {isActiveToday ? 'SAFE TODAY' : isPendingToday ? 'AT RISK' : 'START TODAY'}
                </Text>
              </View>
            </View>

            {/* Motivational Punchline */}
            <Text style={[styles.punchline, { color: theme.textSecondary }]}>
              {isActiveToday
                ? 'Streak preserved! You’re building lifelong barakah.'
                : isPendingToday
                ? `Don't break the chain! Read 1 Ayah to keep your ${effectiveStreak}-day streak.`
                : 'Read just 1 Ayah today to light your streak fire!'}
            </Text>
          </View>
        </View>

        {/* ROW 2: DUOLINGO 7-DAY HABIT TRACK */}
        <View style={styles.weekTrackContainer}>
          <View style={styles.daysRow}>
            {weekDays.map((d, index) => {
              const isFire = d.isCompleted;
              const isTodayPending = d.isToday && !d.isCompleted;

              return (
                <View key={d.dateStr || index} style={styles.dayCol}>
                  <Text
                    style={[
                      styles.dayLetter,
                      {
                        color: d.isToday ? flameOrange : theme.textTertiary,
                        fontWeight: d.isToday ? '800' : '600',
                      },
                    ]}
                  >
                    {d.label}
                  </Text>
                  <View
                    style={[
                      styles.dayPill,
                      isFire
                        ? {
                            backgroundColor: flameOrange,
                            borderColor: flameShadow,
                            borderBottomWidth: 3,
                          }
                        : isTodayPending
                        ? {
                            backgroundColor: theme.cardElevated,
                            borderColor: flameOrange,
                            borderWidth: 2,
                            borderStyle: 'dashed',
                          }
                        : {
                            backgroundColor: theme.chipBg,
                            borderColor: theme.borderSubtle,
                            borderWidth: 1,
                          },
                    ]}
                  >
                    {isFire ? (
                      <MaterialCommunityIcons name="fire" size={18} color="#FFFFFF" />
                    ) : isTodayPending ? (
                      <View style={[styles.emberDot, { backgroundColor: flameOrange }]} />
                    ) : (
                      <View style={[styles.futureDot, { backgroundColor: theme.textTertiary }]} />
                    )}
                  </View>
                  {d.isToday && (
                    <Text style={[styles.todaySublabel, { color: flameOrange }]}>TODAY</Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* ROW 3: DUOLINGO MOTIVATION & MILESTONE BOX */}
        <View style={[styles.motivationBox, { backgroundColor: theme.surface }]}>
          {/* Milestone Progress Bar */}
          <View style={styles.milestoneRow}>
            <View style={styles.milestoneLeft}>
              <Ionicons name="trophy" size={13} color={theme.accentGold} />
              <Text style={[styles.milestoneGoalText, { color: theme.textPrimary }]}>
                Next Milestone: {nextMilestone} Days
              </Text>
            </View>
            <Text style={[styles.milestoneDaysLeft, { color: theme.textTertiary }]}>
              {daysLeft === 1 ? '1 day to go!' : `${daysLeft} days to go`}
            </Text>
          </View>

          <View style={[styles.progressTrack, { backgroundColor: theme.surfaceHighlight }]}>
            <View
              style={[
                styles.progressFill,
                { width: `${milestoneProgress}%`, backgroundColor: flameOrange },
              ]}
            />
          </View>

          {/* Spiritual Hadith Quote */}
          <View style={styles.quoteRow}>
            <Text style={[styles.quoteText, { color: theme.textPrimary }]}>
              “{dailyMotivation.quote}”
            </Text>
            <Text style={[styles.quoteAuthor, { color: theme.textTertiary }]}>
              — {dailyMotivation.source}
            </Text>
          </View>
        </View>

        {/* ROW 4: TACTILE DUOLINGO 3D ACTION BUTTON */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleStudyPress}
          style={[
            styles.duoButton,
            {
              backgroundColor: isActiveToday ? duoGreen : flameOrange,
              borderBottomColor: isActiveToday ? duoGreenShadow : flameShadow,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={isActiveToday ? 'check-decagram' : 'fire'}
            size={20}
            color="#FFFFFF"
          />
          <Text style={styles.duoButtonText}>
            {isActiveToday ? 'CONTINUE TODAY’S STUDY' : 'EXTEND STREAK (READ 1 AYAH)'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  card: {
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  flameCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTextCol: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
    marginBottom: 3,
  },
  streakNumber: {
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 30,
    letterSpacing: -0.5,
  },
  streakUnit: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  duoStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginLeft: 'auto',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  duoStatusText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  punchline: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  weekTrackContainer: {
    marginBottom: 14,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dayCol: {
    alignItems: 'center',
    gap: 4,
  },
  dayLetter: {
    fontSize: 11,
    textTransform: 'uppercase',
  },
  dayPill: {
    width: 34,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emberDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  futureDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    opacity: 0.35,
  },
  todaySublabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  motivationBox: {
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
  },
  milestoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  milestoneLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  milestoneGoalText: {
    fontSize: 11,
    fontWeight: '700',
  },
  milestoneDaysLeft: {
    fontSize: 10,
    fontWeight: '600',
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  quoteRow: {
    gap: 2,
  },
  quoteText: {
    fontSize: 11.5,
    lineHeight: 16,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  quoteAuthor: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'right',
  },
  duoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    paddingVertical: 13,
    borderBottomWidth: 4,
  },
  duoButtonText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
