import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { useStudyState } from '../context/StudyContext';
import { TranslationLanguage } from '../types';
import { CHAPTERS } from '../features/onboarding/data/storyChapters';
import { REMINDER_OPTIONS, EASE } from '../features/onboarding/data/onboardingOptions';
import { StoryChapterSlide } from '../features/onboarding/components/StoryChapterSlide';
import { GoalOptionStep } from '../features/onboarding/components/GoalOptionStep';
import { LanguageOptionStep } from '../features/onboarding/components/LanguageOptionStep';
import { styles } from '../features/onboarding/styles/onboarding.styles';

export default function OnboardingScreen() {
  const { theme } = useTheme();
  const {
    completeOnboarding,
    hasAgreedLegal,
    dailyGoalAyahs,
    setDailyGoal,
    updateNotificationPreferences,
    preferences,
    updatePreferences,
  } = useStudyState();
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const [showIntentionStep, setShowIntentionStep] = useState(false);
  const [showLanguageStep, setShowLanguageStep] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(dailyGoalAyahs || 5);
  const [selectedReminderIndex, setSelectedReminderIndex] = useState(2); // 8:30 PM by default
  const [selectedLanguage, setSelectedLanguage] = useState<TranslationLanguage>(
    preferences.translationLanguage || 'urdu'
  );

  const chapter = CHAPTERS[index];
  const isLast = index === CHAPTERS.length - 1;

  const progress = useSharedValue(1 / 7);
  const trackWidth = useSharedValue(1);
  const breathe = useSharedValue(0);
  const orbDrift = useSharedValue(0);

  useEffect(() => {
    if (showLanguageStep) {
      progress.value = withTiming(1, { duration: 450, easing: EASE });
    } else if (showIntentionStep) {
      progress.value = withTiming(6 / 7, { duration: 450, easing: EASE });
    } else {
      progress.value = withTiming((index + 1) / 7, {
        duration: 520,
        easing: EASE,
      });
    }
  }, [index, progress, showIntentionStep, showLanguageStep]);

  useEffect(() => {
    breathe.value = withRepeat(
      withTiming(1, { duration: 4200, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
    orbDrift.value = withRepeat(
      withTiming(1, { duration: 9000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, [breathe, orbDrift]);

  const progressStyle = useAnimatedStyle(() => ({
    width: progress.value * trackWidth.value,
  }));

  const breatheStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(breathe.value, [0, 1], [1, 1.08]) }],
    opacity: interpolate(breathe.value, [0, 1], [0.55, 0.9]),
  }));

  const orbAStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(orbDrift.value, [0, 1], [-18, 22]) },
      { translateY: interpolate(orbDrift.value, [0, 1], [8, -16]) },
      { scale: interpolate(orbDrift.value, [0, 1], [1, 1.12]) },
    ],
  }));

  const orbBStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(orbDrift.value, [0, 1], [16, -12]) },
      { translateY: interpolate(orbDrift.value, [0, 1], [-10, 14]) },
      { scale: interpolate(orbDrift.value, [0, 1], [1.05, 0.92]) },
    ],
  }));

  const goTo = useCallback((next: number) => {
    if (next < 0 || next >= CHAPTERS.length) return;
    setIndex(next);
  }, []);

  const handleCompleteAndProceed = useCallback(async () => {
    setDailyGoal(selectedGoal);
    const chosenTime = REMINDER_OPTIONS[selectedReminderIndex];
    await updateNotificationPreferences({
      dailyReminderEnabled: true,
      streakSaverEnabled: true,
      reminderHour: chosenTime.hour,
      reminderMinute: chosenTime.minute,
    });
    updatePreferences({ translationLanguage: selectedLanguage });
    await completeOnboarding();
    if (!hasAgreedLegal) {
      router.replace('/legal-consent' as any);
    } else {
      router.replace('/(tabs)');
    }
  }, [
    completeOnboarding,
    hasAgreedLegal,
    router,
    selectedGoal,
    selectedReminderIndex,
    selectedLanguage,
    setDailyGoal,
    updateNotificationPreferences,
    updatePreferences,
  ]);

  const handleNext = () => {
    if (showLanguageStep) {
      handleCompleteAndProceed();
    } else if (showIntentionStep) {
      setShowIntentionStep(false);
      setShowLanguageStep(true);
    } else if (isLast) {
      setShowIntentionStep(true);
    } else {
      goTo(index + 1);
    }
  };

  const handleSkip = () => {
    if (!showIntentionStep && !showLanguageStep) {
      setShowIntentionStep(true);
    } else if (showIntentionStep) {
      setShowIntentionStep(false);
      setShowLanguageStep(true);
    } else {
      handleCompleteAndProceed();
    }
  };

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const handleTouchStart = (e: GestureResponderEvent) => {
    touchStartRef.current = {
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY,
      time: Date.now(),
    };
  };

  const handleTouchEnd = (e: GestureResponderEvent) => {
    if (!touchStartRef.current) return;
    const deltaX = e.nativeEvent.pageX - touchStartRef.current.x;
    const deltaY = e.nativeEvent.pageY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;
    touchStartRef.current = null;
    if (Math.abs(deltaX) > 48 && Math.abs(deltaY) < 42 && deltaTime < 520) {
      if (deltaX < 0) handleNext();
      else goTo(index - 1);
    }
  };

  const stepLabel = String(index + 1).padStart(2, '0');

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <Animated.View
        pointerEvents="none"
        style={[styles.orb, styles.orbA, { backgroundColor: chapter.wash }, orbAStyle]}
      />
      <Animated.View
        pointerEvents="none"
        style={[styles.orb, styles.orbB, { backgroundColor: chapter.accent + '22' }, orbBStyle]}
      />

      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={styles.topBar}>
          <Text style={[styles.wordmark, { color: theme.textPrimary }]}>Qurus</Text>
          <TouchableOpacity onPress={handleSkip} hitSlop={12} accessibilityLabel="Skip">
            <Text style={[styles.skip, { color: theme.textTertiary }]}>
              {showLanguageStep ? 'Done' : 'Skip'}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={[styles.track, { backgroundColor: theme.surfaceHighlight }]}
          onLayout={(e) => {
            trackWidth.value = e.nativeEvent.layout.width;
          }}
        >
          <Animated.View
            style={[
              styles.trackFill,
              {
                backgroundColor: showLanguageStep
                  ? theme.primary
                  : showIntentionStep
                  ? theme.accentAmber
                  : chapter.accent,
              },
              progressStyle,
            ]}
          />
        </View>

        <View
          style={styles.canvas}
          onTouchStart={!showIntentionStep && !showLanguageStep ? handleTouchStart : undefined}
          onTouchEnd={!showIntentionStep && !showLanguageStep ? handleTouchEnd : undefined}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scroll}
            bounces={false}
          >
            {showLanguageStep ? (
              <LanguageOptionStep
                selectedLanguage={selectedLanguage}
                onSelectLanguage={setSelectedLanguage}
                theme={theme}
              />
            ) : showIntentionStep ? (
              <GoalOptionStep
                selectedGoal={selectedGoal}
                onSelectGoal={setSelectedGoal}
                selectedReminderIndex={selectedReminderIndex}
                onSelectReminder={setSelectedReminderIndex}
                theme={theme}
              />
            ) : (
              <StoryChapterSlide
                chapter={chapter}
                stepLabel={stepLabel}
                theme={theme}
                breatheStyle={breatheStyle}
              />
            )}
          </ScrollView>
        </View>

        <SafeAreaView edges={['bottom']} style={styles.dock}>
          <View style={styles.dockRow}>
            <TouchableOpacity
              onPress={() => {
                if (showLanguageStep) {
                  setShowLanguageStep(false);
                  setShowIntentionStep(true);
                } else if (showIntentionStep) {
                  setShowIntentionStep(false);
                } else {
                  goTo(index - 1);
                }
              }}
              disabled={!showIntentionStep && !showLanguageStep && index === 0}
              style={[
                styles.backBtn,
                {
                  backgroundColor: theme.chipBg,
                  opacity: !showIntentionStep && !showLanguageStep && index === 0 ? 0 : 1,
                },
              ]}
              accessibilityLabel="Previous"
            >
              <Ionicons name="chevron-back" size={20} color={theme.textPrimary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNext}
              activeOpacity={0.88}
              style={[
                styles.nextBtn,
                {
                  backgroundColor: showLanguageStep
                    ? theme.primary
                    : showIntentionStep
                    ? theme.accentAmber
                    : chapter.accent,
                },
              ]}
              accessibilityLabel={
                showLanguageStep
                  ? 'Continue to Consent'
                  : showIntentionStep
                  ? 'Choose Translation'
                  : isLast
                  ? 'Set Your Rhythm'
                  : 'Continue'
              }
            >
              <Text style={styles.nextLabel}>
                {showLanguageStep
                  ? 'Continue to Consent'
                  : showIntentionStep
                  ? 'Choose Translation'
                  : isLast
                  ? 'Set Your Rhythm'
                  : 'Continue'}
              </Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
}
