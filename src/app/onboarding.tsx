import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { useStudyState } from '../context/StudyContext';
import { TranslationLanguage } from '../types';
import { TRANSLATION_LANGUAGES } from '../data/surahs';

interface StoryChapter {
  id: string;
  kicker: string;
  heroIcon: keyof typeof Ionicons.glyphMap;
  accent: string;
  wash: string;
  title: string;
  highlightPhrase: string;
  proseParagraphs: string[];
  quote?: { text: string; author: string };
  features?: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    desc: string;
  }[];
  activities?: { icon: keyof typeof Ionicons.glyphMap; label: string }[];
  founderSignature?: {
    name: string;
    role: string;
    note: string;
    closingWish: string;
  };
}

const CHAPTERS: StoryChapter[] = [
  {
    id: 'dilemma',
    kicker: 'The dilemma',
    heroIcon: 'phone-portrait-outline',
    accent: '#0E6B5C',
    wash: '#D8EFE9',
    title: 'A question in the palm of my hand',
    highlightPhrase: 'Why can’t honest reflection be as effortless as our daily distractions?',
    proseParagraphs: [
      'To be completely honest with you, I was looking for a way to explore and understand the Quran directly through translation—without dogma or preconditions.',
      'As a youngster in this fast-paced world, classical methods felt intimidating. Rigid academic commentary and heavy traditional formats felt overwhelming.',
      'Meanwhile, look at our daily lives: apps like Spotify and Instagram are effortlessly resting right in the palm of our hands anytime we have two idle minutes.',
    ],
    quote: {
      text: '“Why can’t exploring a text with an open mind be just as frictionless, accessible, and immediate in our hands as the distractions that consume our hours?”',
      author: 'Hamdan Khubaib',
    },
  },
  {
    id: 'turning-point',
    kicker: 'The turning point',
    heroIcon: 'chatbubble-ellipses-outline',
    accent: '#C4455A',
    wash: '#F8E4E8',
    title: 'The advice that changed everything',
    highlightPhrase: 'You will find a verse that sticks with you like a hook in your mind.',
    proseParagraphs: [
      'I was stuck because I genuinely had no idea where to start. How do you explore the text without feeling judged or getting lost in complexity?',
      'One day, I opened up to my brother about this confusion. His response was simple, yet it dismantled every mental barrier I had built.',
    ],
    quote: {
      text: '“Don’t overthink it. Just start reading the verses with their translations. Whatever lens you view reality through—science, philosophy, history, or common sense—you will find something that sticks with you like a hook in your mind.”',
      author: 'My brother’s advice',
    },
  },
  {
    id: 'invitation',
    kicker: 'An invitation',
    heroIcon: 'heart-outline',
    accent: '#5548A0',
    wash: '#EAE6F8',
    title: 'Radical honesty',
    highlightPhrase: 'I’m figuring this out too.',
    proseParagraphs: [
      'If you’re reading this while questioning everything... whether you’re 17 and confused, an atheist, an agnostic, or just disconnected from organized religion. It doesn’t matter. I’m not going to pretend I have all the answers.',
      'Honestly, I’m figuring this out too. I’m not here to preach or lecture anyone. I’m just a normal person with questions, doubts, and a genuine desire to seek what’s actually true.',
      'And the best advice I can share is the same thing my brother told me:',
    ],
    quote: {
      text: '“Just give it an honest shot. You don’t have to decide what you believe right now. Open a verse, read what it actually says, and see what it sparks in you.”',
      author: 'Hamdan’s advice',
    },
  },
  {
    id: 'sanctuary',
    kicker: 'The space',
    heroIcon: 'book-outline',
    accent: '#C46B1A',
    wash: '#F8E8D4',
    title: 'Verse-by-verse exploration',
    highlightPhrase: 'Reading that doesn’t feel like a heavy assignment.',
    proseParagraphs: [
      'That insight became the soul of Qurus. Instead of pressuring you to rush through pages without absorbing anything, Qurus gives you a focused, modern thinking space:',
    ],
    features: [
      {
        icon: 'finger-print-outline',
        title: 'Work with individual verses',
        desc: 'Every verse stands on its own. Isolate it, repeat it, reflect on it, and let it take root.',
      },
      {
        icon: 'journal-outline',
        title: 'Private study notebook',
        desc: 'Attach written or spoken thoughts, questions, and insights directly to verses. Stored privately on your device.',
      },
      {
        icon: 'musical-notes-outline',
        title: 'Arabic + Translation audio',
        desc: 'Arabic recitation paired with Urdu or English translation, verse by verse.',
      },
    ],
  },
  {
    id: 'motion-purpose',
    kicker: 'Begin',
    heroIcon: 'leaf-outline',
    accent: '#0E6B5C',
    wash: '#D8EFE9',
    title: 'Your journey starts here',
    highlightPhrase: 'Turning idle moments into quiet reflection.',
    proseParagraphs: [
      'Qurus is built so you can listen and reflect while moving through your day—at the gym, commuting, or on a quiet walk.',
    ],
    activities: [
      { icon: 'barbell-outline', label: 'At the gym' },
      { icon: 'train-outline', label: 'On the commute' },
      { icon: 'car-outline', label: 'In transit' },
      { icon: 'walk-outline', label: 'Evening walks' },
    ],
    founderSignature: {
      name: 'Hamdan Khubaib',
      role: 'Creator of Qurus',
      note: 'If Qurus helps even one person discover a verse that challenges their thinking, sparks genuine curiosity, and makes space for honest contemplation, every line of code has fulfilled its purpose.',
      closingWish: 'Wishing you clarity of mind, deep perspective, and an open journey of truth-seeking.',
    },
  },
];

const EASE = Easing.bezier(0.22, 1, 0.36, 1);

const REMINDER_OPTIONS = [
  {
    label: 'Morning',
    timeStr: '7:00 AM',
    hour: 7,
    minute: 0,
    icon: 'sunny-outline' as const,
    subtitle: 'Start with perspective',
  },
  {
    label: 'Midday',
    timeStr: '1:30 PM',
    hour: 13,
    minute: 30,
    icon: 'time-outline' as const,
    subtitle: 'Afternoon quiet pause',
  },
  {
    label: 'Evening',
    timeStr: '8:30 PM',
    hour: 20,
    minute: 30,
    icon: 'partly-sunny-outline' as const,
    subtitle: 'Unwind & reflect (Recommended)',
  },
  {
    label: 'Night',
    timeStr: '10:00 PM',
    hour: 22,
    minute: 0,
    icon: 'moon-outline' as const,
    subtitle: 'Stillness before rest',
  },
];

const GOAL_OPTIONS = [
  { count: 3, label: 'Gentle Pace', desc: '3 verses/day • ~2 mins' },
  { count: 5, label: 'Recommended', desc: '5 verses/day • ~5 mins' },
  { count: 10, label: 'Focused Study', desc: '10 verses/day • ~10 mins' },
  { count: 15, label: 'Deep Immersion', desc: '15 verses/day • ~15 mins' },
];

const ONBOARDING_LANGUAGES: {
  id: TranslationLanguage;
  badge: string;
  desc: string;
}[] = [
  {
    id: 'urdu',
    badge: 'Authentic Urdu',
    desc: 'Classical, revered Urdu translation recited verse-by-verse with eloquent pronunciation and warm clarity.',
  },
  {
    id: 'english',
    badge: 'Sahih International',
    desc: 'Crisp, contemporary English translation audio synchronized per ayah for seamless reflection.',
  },
  {
    id: 'bengali',
    badge: 'Muhiuddin Khan',
    desc: 'Widely celebrated Bengali translation recited verse-by-verse with melodious cadence.',
  },
  {
    id: 'turkish',
    badge: 'Diyanet İşleri',
    desc: 'Esteemed Turkish translation recited verse-by-verse with crisp resonance.',
  },
  {
    id: 'french',
    badge: 'Hamidullah',
    desc: 'Renowned academic French translation recited verse-by-verse with poetic elegance.',
  },
];

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
              <Animated.View
                key="languages"
                entering={FadeInDown.duration(420).easing(EASE)}
                exiting={FadeOut.duration(160)}
              >
                <View style={styles.stepRow}>
                  <View style={[styles.iconDisc, { backgroundColor: theme.primaryMuted }]}>
                    <Ionicons name="language-outline" size={20} color={theme.primary} />
                  </View>
                  <Text style={[styles.stepNum, { color: theme.primary }]}>07</Text>
                  <Text style={[styles.kicker, { color: theme.primary, fontWeight: '700' }]}>
                    TRANSLATION AUDIO
                  </Text>
                </View>

                <Text style={[styles.title, { color: theme.textPrimary }]}>
                  Choose your translation language
                </Text>

                <Text style={[styles.intentionSubtitle, { color: theme.textSecondary }]}>
                  Qurus recites translations right alongside Arabic verses. Select your preferred translation voice—you can switch anytime in Settings.
                </Text>

                {/* 1. Language Option Cards */}
                <View style={styles.languageCardsWrap}>
                  {ONBOARDING_LANGUAGES.map((item) => {
                    const config = TRANSLATION_LANGUAGES[item.id];
                    const isSelected = selectedLanguage === item.id;
                    return (
                      <TouchableOpacity
                        key={item.id}
                        activeOpacity={0.85}
                        onPress={() => setSelectedLanguage(item.id)}
                        style={[
                          styles.languageCard,
                          {
                            backgroundColor: isSelected ? theme.card : theme.surface,
                            borderColor: isSelected ? theme.primary : theme.borderSubtle,
                            borderWidth: isSelected ? 2 : StyleSheet.hairlineWidth,
                          },
                        ]}
                      >
                        <View style={styles.languageCardTop}>
                          <View style={styles.languageBadgeRow}>
                            <View style={[styles.langPill, { backgroundColor: theme.primaryMuted }]}>
                              <Text style={[styles.langPillText, { color: theme.primary }]}>
                                {config.flag} {item.badge}
                              </Text>
                            </View>
                            {config.bitrate ? (
                              <View style={[styles.subBadge, { backgroundColor: theme.chipBg }]}>
                                <Text style={[styles.subBadgeText, { color: theme.textTertiary }]}>
                                  {config.bitrate}
                                </Text>
                              </View>
                            ) : null}
                          </View>
                          <View
                            style={[
                              styles.goalRadioCircle,
                              {
                                borderColor: isSelected ? theme.primary : theme.border,
                                backgroundColor: isSelected ? theme.primary : 'transparent',
                              },
                            ]}
                          >
                            {isSelected && (
                              <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                            )}
                          </View>
                        </View>

                        <Text style={[styles.languageName, { color: theme.textPrimary }]}>
                          {config.name} {config.nativeName !== config.name ? `• ${config.nativeName}` : ''}
                        </Text>
                        <Text style={[styles.languageReciter, { color: theme.primary }]}>
                          {config.voiceName} ({config.author})
                        </Text>
                        <Text style={[styles.languageDesc, { color: theme.textSecondary }]}>
                          {item.desc}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Info Note */}
                <View
                  style={[
                    styles.privacyTipBox,
                    { backgroundColor: theme.surfaceHighlight, borderColor: theme.borderSubtle, marginTop: 12 },
                  ]}
                >
                  <Ionicons name="information-circle-outline" size={17} color={theme.primary} />
                  <Text style={[styles.privacyTipText, { color: theme.textSecondary }]}>
                    Listen to Arabic recitation alone, translation alone, or both intertwined. You can switch translation voices anytime in Settings.
                  </Text>
                </View>
              </Animated.View>
            ) : showIntentionStep ? (
              <Animated.View
                key="intentions"
                entering={FadeInDown.duration(420).easing(EASE)}
                exiting={FadeOut.duration(160)}
              >
                <View style={styles.stepRow}>
                  <View style={[styles.iconDisc, { backgroundColor: theme.amberMuted }]}>
                    <Ionicons name="sparkles" size={20} color={theme.accentAmber} />
                  </View>
                  <Text style={[styles.stepNum, { color: theme.accentAmber }]}>06</Text>
                  <Text style={[styles.kicker, { color: theme.accentAmber, fontWeight: '700' }]}>
                    YOUR CONTEMPLATIVE RHYTHM
                  </Text>
                </View>

                <Text style={[styles.title, { color: theme.textPrimary }]}>
                  Set your daily study intention
                </Text>

                <Text style={[styles.intentionSubtitle, { color: theme.textSecondary }]}>
                  Consistency is the core of Tadabbur. Choose an effortless pace you can sustain every single day.
                </Text>

                {/* 1. Daily Tadabbur Goal */}
                <View style={styles.intentionBlock}>
                  <View style={styles.intentionBlockHeader}>
                    <Text style={[styles.intentionBlockTitle, { color: theme.textPrimary }]}>
                      Daily Tadabbur Goal
                    </Text>
                    <View style={[styles.pillBadgeCompact, { backgroundColor: theme.amberMuted }]}>
                      <Text style={[styles.pillBadgeCompactText, { color: theme.accentAmber }]}>
                        {selectedGoal} verses / day
                      </Text>
                    </View>
                  </View>

                  <View style={styles.goalGrid}>
                    {GOAL_OPTIONS.map((g) => {
                      const isSelected = selectedGoal === g.count;
                      return (
                        <TouchableOpacity
                          key={g.count}
                          activeOpacity={0.85}
                          onPress={() => setSelectedGoal(g.count)}
                          style={[
                            styles.goalCard,
                            {
                              backgroundColor: isSelected ? theme.card : theme.surface,
                              borderColor: isSelected ? theme.accentAmber : theme.borderSubtle,
                              borderWidth: isSelected ? 2 : StyleSheet.hairlineWidth,
                            },
                          ]}
                        >
                          <View style={styles.goalCardTop}>
                            <Text
                              style={[
                                styles.goalCardCount,
                                { color: isSelected ? theme.accentAmber : theme.textPrimary },
                              ]}
                            >
                              {g.count}
                            </Text>
                            <View
                              style={[
                                styles.goalRadioCircle,
                                {
                                  borderColor: isSelected ? theme.accentAmber : theme.border,
                                  backgroundColor: isSelected ? theme.accentAmber : 'transparent',
                                },
                              ]}
                            >
                              {isSelected && (
                                <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                              )}
                            </View>
                          </View>
                          <Text style={[styles.goalCardLabel, { color: theme.textPrimary }]}>
                            {g.label}
                          </Text>
                          <Text style={[styles.goalCardDesc, { color: theme.textSecondary }]}>
                            {g.desc}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* 2. Preferred Reminder Time */}
                <View style={styles.intentionBlock}>
                  <View style={styles.intentionBlockHeader}>
                    <Text style={[styles.intentionBlockTitle, { color: theme.textPrimary }]}>
                      Preferred Reminder Time
                    </Text>
                    <View style={[styles.pillBadgeCompact, { backgroundColor: theme.primaryMuted }]}>
                      <Text style={[styles.pillBadgeCompactText, { color: theme.primary }]}>
                        {REMINDER_OPTIONS[selectedReminderIndex].timeStr}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.reminderList}>
                    {REMINDER_OPTIONS.map((rem, idx) => {
                      const isSelected = selectedReminderIndex === idx;
                      return (
                        <TouchableOpacity
                          key={rem.label}
                          activeOpacity={0.85}
                          onPress={() => setSelectedReminderIndex(idx)}
                          style={[
                            styles.reminderCard,
                            {
                              backgroundColor: isSelected ? theme.card : theme.surface,
                              borderColor: isSelected ? theme.primary : theme.borderSubtle,
                              borderWidth: isSelected ? 2 : StyleSheet.hairlineWidth,
                            },
                          ]}
                        >
                          <View
                            style={[
                              styles.reminderIconBox,
                              {
                                backgroundColor: isSelected ? theme.primaryMuted : theme.chipBg,
                              },
                            ]}
                          >
                            <Ionicons
                              name={rem.icon}
                              size={18}
                              color={isSelected ? theme.primary : theme.textSecondary}
                            />
                          </View>

                          <View style={styles.reminderTextCol}>
                            <View style={styles.reminderTopRow}>
                              <Text style={[styles.reminderLabel, { color: theme.textPrimary }]}>
                                {rem.label}
                              </Text>
                              <Text
                                style={[
                                  styles.reminderTimeStr,
                                  { color: isSelected ? theme.primary : theme.textTertiary },
                                ]}
                              >
                                {rem.timeStr}
                              </Text>
                            </View>
                            <Text style={[styles.reminderDesc, { color: theme.textSecondary }]}>
                              {rem.subtitle}
                            </Text>
                          </View>

                          <View
                            style={[
                              styles.reminderRadio,
                              {
                                borderColor: isSelected ? theme.primary : theme.border,
                                backgroundColor: isSelected ? theme.primary : 'transparent',
                              },
                            ]}
                          >
                            {isSelected && (
                              <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                            )}
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* Info Note */}
                <View
                  style={[
                    styles.privacyTipBox,
                    { backgroundColor: theme.surfaceHighlight, borderColor: theme.borderSubtle },
                  ]}
                >
                  <Ionicons name="information-circle-outline" size={17} color={theme.primary} />
                  <Text style={[styles.privacyTipText, { color: theme.textSecondary }]}>
                    Daily reminders and streak-saver nudges will be ready for you. You can adjust this anytime in Settings.
                  </Text>
                </View>
              </Animated.View>
            ) : (
              <Animated.View
                key={chapter.id}
                entering={FadeInDown.duration(520).easing(EASE)}
                exiting={FadeOut.duration(160)}
              >
                <View style={styles.stepRow}>
                  <Animated.View
                    style={[
                      styles.iconDisc,
                      { backgroundColor: chapter.wash },
                      breatheStyle,
                    ]}
                  >
                    <Ionicons name={chapter.heroIcon} size={22} color={chapter.accent} />
                  </Animated.View>
                  <Text style={[styles.stepNum, { color: chapter.accent }]}>{stepLabel}</Text>
                  <Text style={[styles.kicker, { color: theme.textTertiary }]}>{chapter.kicker}</Text>
                </View>

                <Text style={[styles.title, { color: theme.textPrimary }]}>{chapter.title}</Text>

                <Text style={[styles.highlight, { color: chapter.accent }]}>
                  {chapter.highlightPhrase}
                </Text>

                <View style={styles.prose}>
                  {chapter.proseParagraphs.map((para) => (
                    <Text key={para.slice(0, 24)} style={[styles.body, { color: theme.textSecondary }]}>
                      {para}
                    </Text>
                  ))}
                </View>

                {chapter.quote ? (
                  <Animated.View
                    entering={FadeIn.delay(120).duration(480)}
                    style={[
                      styles.quote,
                      { backgroundColor: theme.card, borderColor: chapter.wash },
                    ]}
                  >
                    <Text style={[styles.quoteText, { color: theme.textPrimary }]}>
                      {chapter.quote.text}
                    </Text>
                    <Text style={[styles.quoteAuthor, { color: chapter.accent }]}>
                      {chapter.quote.author}
                    </Text>
                  </Animated.View>
                ) : null}

                {chapter.features ? (
                  <View style={styles.stack}>
                    {chapter.features.map((feat, i) => (
                      <Animated.View
                        key={feat.title}
                        entering={FadeInUp.delay(80 * i).duration(420).easing(EASE)}
                        style={[
                          styles.feature,
                          { backgroundColor: theme.card, borderColor: theme.borderSubtle },
                        ]}
                      >
                        <View style={[styles.featureIcon, { backgroundColor: chapter.wash }]}>
                          <Ionicons name={feat.icon} size={18} color={chapter.accent} />
                        </View>
                        <View style={styles.featureCopy}>
                          <Text style={[styles.featureTitle, { color: theme.textPrimary }]}>
                            {feat.title}
                          </Text>
                          <Text style={[styles.featureDesc, { color: theme.textSecondary }]}>
                            {feat.desc}
                          </Text>
                        </View>
                      </Animated.View>
                    ))}
                  </View>
                ) : null}

                {chapter.activities ? (
                  <View style={styles.activityWrap}>
                    {chapter.activities.map((act, i) => (
                      <Animated.View
                        key={act.label}
                        entering={FadeInUp.delay(60 * i).duration(380).easing(EASE)}
                        style={[styles.activity, { backgroundColor: chapter.wash }]}
                      >
                        <Ionicons name={act.icon} size={16} color={chapter.accent} />
                        <Text style={[styles.activityLabel, { color: theme.textPrimary }]}>
                          {act.label}
                        </Text>
                      </Animated.View>
                    ))}
                  </View>
                ) : null}

                {chapter.founderSignature ? (
                  <Animated.View
                    entering={FadeInUp.delay(160).duration(480).easing(EASE)}
                    style={[
                      styles.founder,
                      { backgroundColor: theme.card, borderColor: theme.borderSubtle },
                    ]}
                  >
                    <View style={styles.founderRow}>
                      <View style={[styles.avatar, { backgroundColor: chapter.accent }]}>
                        <Text style={styles.avatarLetter}>H</Text>
                      </View>
                      <View>
                        <Text style={[styles.founderName, { color: theme.textPrimary }]}>
                          {chapter.founderSignature.name}
                        </Text>
                        <Text style={[styles.founderRole, { color: theme.textTertiary }]}>
                          {chapter.founderSignature.role}
                        </Text>
                      </View>
                    </View>
                    <Text style={[styles.founderNote, { color: theme.textSecondary }]}>
                      {chapter.founderSignature.note}
                    </Text>
                    <Text style={[styles.founderDua, { color: chapter.accent }]}>
                      {chapter.founderSignature.closingWish}
                    </Text>
                  </Animated.View>
                ) : null}
              </Animated.View>
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
  safe: {
    flex: 1,
  },
  orb: {
    position: 'absolute',
    borderRadius: 999,
  },
  orbA: {
    width: 280,
    height: 280,
    top: -80,
    right: -90,
  },
  orbB: {
    width: 220,
    height: 220,
    bottom: 120,
    left: -100,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 6,
    paddingBottom: 14,
  },
  wordmark: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -0.6,
  },
  skip: {
    fontSize: 15,
    fontWeight: '500',
  },
  track: {
    height: 3,
    marginHorizontal: 24,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  trackFill: {
    height: '100%',
    borderRadius: 2,
  },
  canvas: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  iconDisc: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: {
    fontSize: 28,
    fontWeight: '300',
    letterSpacing: -1,
  },
  kicker: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    letterSpacing: -0.9,
    lineHeight: 38,
    marginBottom: 14,
  },
  highlight: {
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '500',
    marginBottom: 20,
  },
  prose: {
    gap: 14,
    marginBottom: 20,
  },
  body: {
    fontSize: 16,
    lineHeight: 26,
  },
  quote: {
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
    marginBottom: 8,
  },
  quoteText: {
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 12,
  },
  quoteAuthor: {
    fontSize: 13,
    fontWeight: '500',
  },
  stack: {
    gap: 10,
    marginTop: 8,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    padding: 16,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureCopy: {
    flex: 1,
    paddingTop: 2,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 13,
    lineHeight: 19,
  },
  activityWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  activity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 22,
  },
  activityLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  founder: {
    marginTop: 16,
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
  },
  founderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  founderName: {
    fontSize: 16,
    fontWeight: '600',
  },
  founderRole: {
    fontSize: 13,
    marginTop: 2,
  },
  founderNote: {
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 14,
  },
  founderDua: {
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  dock: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  dockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtn: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  nextLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  intentionSubtitle: {
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 24,
  },
  intentionBlock: {
    marginBottom: 24,
  },
  intentionBlockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  intentionBlockTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  pillBadgeCompact: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pillBadgeCompactText: {
    fontSize: 12,
    fontWeight: '700',
  },
  goalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  goalCard: {
    width: '48%',
    borderRadius: 18,
    padding: 14,
    flexGrow: 1,
  },
  goalCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  goalCardCount: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  goalRadioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalCardLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  goalCardDesc: {
    fontSize: 11.5,
    lineHeight: 15,
  },
  reminderList: {
    gap: 10,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 18,
  },
  reminderIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderTextCol: {
    flex: 1,
  },
  reminderTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  reminderLabel: {
    fontSize: 14.5,
    fontWeight: '600',
  },
  reminderTimeStr: {
    fontSize: 13,
    fontWeight: '700',
  },
  reminderDesc: {
    fontSize: 12,
    lineHeight: 16,
  },
  reminderRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacyTipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 4,
    marginBottom: 16,
  },
  privacyTipText: {
    flex: 1,
    fontSize: 12.5,
    lineHeight: 18,
  },
  languageCardsWrap: {
    gap: 14,
    marginBottom: 14,
  },
  languageCard: {
    borderRadius: 20,
    padding: 16,
  },
  languageCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  languageBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  langPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  langPillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  subBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  subBadgeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  languageName: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  languageReciter: {
    fontSize: 13.5,
    fontWeight: '600',
    marginBottom: 8,
  },
  languageDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
});
