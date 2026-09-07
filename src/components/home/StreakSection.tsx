import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useStudyState, getLocalDateString, getYesterdayDateString } from '../../context/StudyContext';
import { MOTIVATION_QUOTES } from '../../features/streak/data/motivationQuotes';
import { STREAK_MILESTONES } from '../../features/streak/constants';
import {
  calculateStreakMilestones,
  computeWeekDays,
  getStreakRiskInfo,
} from '../../features/streak/utils/streakCalculations';
import { styles } from '../../features/streak/styles/streakSection.styles';
import { StreakUrgencyBanner } from '../../features/streak/components/StreakUrgencyBanner';
import { StreakCalendarWeek } from '../../features/streak/components/StreakCalendarWeek';
import { StreakMilestoneBar } from '../../features/streak/components/StreakMilestoneBar';

export { MOTIVATION_QUOTES, STREAK_MILESTONES };

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

  const {
    hoursLeft,
    minutesLeft,
    isStreakAtRisk,
    isFinalCall,
    isCriticalHour,
    isUrgentEvening,
  } = useMemo(
    () => getStreakRiskInfo(nowTime, isActiveToday, effectiveStreak),
    [nowTime, isActiveToday, effectiveStreak]
  );

  const { nextMilestone, milestoneProgress, daysLeft } = useMemo(
    () => calculateStreakMilestones(effectiveStreak),
    [effectiveStreak]
  );

  const dailyMotivation = useMemo(() => {
    const day = new Date().getDay();
    return MOTIVATION_QUOTES[day % MOTIVATION_QUOTES.length];
  }, []);

  const weekDays = useMemo(
    () => computeWeekDays(streak.activeDates, todayStr),
    [streak.activeDates, todayStr]
  );

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
              : theme.borderSubtle,
            borderWidth: isStreakAtRisk ? 1.5 : StyleSheet.hairlineWidth,
          },
        ]}
      >
        {isStreakAtRisk && (
          <StreakUrgencyBanner
            isFinalCall={isFinalCall}
            isCriticalHour={isCriticalHour}
            isUrgentEvening={isUrgentEvening}
            effectiveStreak={effectiveStreak}
            hoursLeft={hoursLeft}
            minutesLeft={minutesLeft}
            textColor={theme.textPrimary}
          />
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
                  : theme.saffronMuted,
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
                  : theme.accentSaffron
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
                      : theme.primaryLight,
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
            <Text style={[styles.punchline, { color: theme.textSecondary }]}>
              {isActiveToday
                ? 'Consistency alive • Protected from midnight reset'
                : punchline}
            </Text>
          </View>
        </View>

        <StreakCalendarWeek weekDays={weekDays} theme={theme} />

        <StreakMilestoneBar
          nextMilestone={nextMilestone}
          daysLeft={daysLeft}
          milestoneProgress={milestoneProgress}
          dailyMotivation={dailyMotivation}
          theme={theme}
        />

        {isStreakAtRisk && (
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
                  : '#FF8C00',
              },
            ]}
          >
            <Ionicons name="flame" size={18} color={theme.onPrimary} />
            <Text style={[styles.ctaText, { color: theme.onPrimary }]}>
              {isFinalCall
                ? '🔥 Save Streak Now (Just 1 Verse)'
                : isUrgentEvening
                ? `🔥 Save ${effectiveStreak}-Day Streak (45s)`
                : 'Save Streak with 1 Verse'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});
