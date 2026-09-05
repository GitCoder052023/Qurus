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
    dua: string;
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
    highlightPhrase: 'Why can’t Allah’s words be as effortless as our daily distractions?',
    proseParagraphs: [
      'To be completely honest with you, I was looking for a way to study and truly understand the Quran from its pure source with translation.',
      'As a youngster in this fast-paced world, classical methods felt intimidating. Rigid discipline, heavy volumes of classical commentary, and dense academic texts felt overwhelming. Guilt slowly took over.',
      'Meanwhile, look at our modern lives: apps like Spotify and Instagram are effortlessly resting right in the palm of our hands anytime we have two idle minutes.',
    ],
    quote: {
      text: '“Why can’t the pure, unadulterated words of Allah be just as accessible, immediate, and frictionless in the palm of our hands as the distractions that consume our hours?”',
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
    highlightPhrase: 'You will find an ayah that sticks with you like a hook in your mind.',
    proseParagraphs: [
      'I was paralyzed because I genuinely had no idea how to study the Quran. Where do you start? How do you make sense of it without getting lost in complexity?',
      'One day, I opened up to my brother about this confusion. His response was so simple, yet it completely dismantled every mental barrier I had built.',
    ],
    quote: {
      text: '“Don’t overthink anything. Just start reading the Quran with its translation. Whatever framework you view the world through—science, philosophy, history, or common sense—you will find an ayah that sticks with you like a hook in your mind.”',
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
      'If you’re reading this while questioning everything... whether you’re 17 and confused, an atheist, an agnostic, or just disconnected from religion. It doesn’t matter. And I’m not going to pretend I have all the answers.', 
      'Honestly, I’m figuring this out too. I’m not some super religious person who suddenly found all the answers. I’m just a normal person with questions, doubts, and a genuine desire to figure out what’s actually true.', 
      'And the advice I can give you is the same thing my brother told me:'],
    quote: {
      text: '“Just give it an honest shot. You don’t have to decide what you believe right now. Open an ayah, read the meaning, and just see what it does to you.”',
      author: 'Hamdan’s advice',
    },
  },
  {
    id: 'sanctuary',
    kicker: 'The sanctuary',
    heroIcon: 'book-outline',
    accent: '#C46B1A',
    wash: '#F8E8D4',
    title: 'Ayah-based study',
    highlightPhrase: 'Studying that doesn’t feel like a heavy assignment.',
    proseParagraphs: [
      'That insight became the soul of Qurus. Instead of pressuring you to speed through pages without retaining anything, Qurus gives you an Ayah-based sanctuary built for the modern world:',
    ],
    features: [
      {
        icon: 'finger-print-outline',
        title: 'Work with individual ayahs',
        desc: 'Every verse stands on its own. Isolate it, repeat it, reflect on it, and let it take root.',
      },
      {
        icon: 'journal-outline',
        title: 'Private notebook',
        desc: 'Attach written or spoken reflections to verses. Saved privately on your device.',
      },
      {
        icon: 'musical-notes-outline',
        title: 'Arabic + Urdu audio',
        desc: 'Arabic recitation followed by Urdu translation, verse by verse.',
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
      'Qurus is built so you can listen while moving through life—gym, commute, traffic, an evening walk.',
    ],
    activities: [
      { icon: 'barbell-outline', label: 'At the gym' },
      { icon: 'train-outline', label: 'On the metro' },
      { icon: 'car-outline', label: 'In traffic' },
      { icon: 'walk-outline', label: 'Evening walks' },
    ],
    founderSignature: {
      name: 'Hamdan Khubaib',
      role: 'Creator of Qurus',
      note: 'If Qurus can help even one person find an ayah that hooks into their heart, sparks their curiosity, and bridges modern life with the Divine book, every line of code has fulfilled its purpose.',
      dua: 'May Allah bless your study, grant you deep clarity, and make His words a steadfast light in your life.',
    },
  },
];

const EASE = Easing.bezier(0.22, 1, 0.36, 1);

export default function OnboardingScreen() {
  const { theme } = useTheme();
  const { completeOnboarding } = useStudyState();
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const chapter = CHAPTERS[index];
  const isLast = index === CHAPTERS.length - 1;

  const progress = useSharedValue(1 / CHAPTERS.length);
  const trackWidth = useSharedValue(1);
  const breathe = useSharedValue(0);
  const orbDrift = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming((index + 1) / CHAPTERS.length, {
      duration: 520,
      easing: EASE,
    });
  }, [index, progress]);

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

  const finish = useCallback(async () => {
    await completeOnboarding();
    router.replace('/(tabs)');
  }, [completeOnboarding, router]);

  const handleNext = () => {
    if (isLast) {
      finish();
    } else {
      goTo(index + 1);
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
          <TouchableOpacity onPress={finish} hitSlop={12} accessibilityLabel="Skip intro">
            <Text style={[styles.skip, { color: theme.textTertiary }]}>Skip</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[styles.track, { backgroundColor: theme.surfaceHighlight }]}
          onLayout={(e) => {
            trackWidth.value = e.nativeEvent.layout.width;
          }}
        >
          <Animated.View
            style={[styles.trackFill, { backgroundColor: chapter.accent }, progressStyle]}
          />
        </View>

        <View
          style={styles.canvas}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scroll}
            bounces={false}
          >
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
                    {chapter.founderSignature.dua}
                  </Text>
                </Animated.View>
              ) : null}
            </Animated.View>
          </ScrollView>
        </View>

        <SafeAreaView edges={['bottom']} style={styles.dock}>
          <View style={styles.dockRow}>
            <TouchableOpacity
              onPress={() => goTo(index - 1)}
              disabled={index === 0}
              style={[
                styles.backBtn,
                {
                  backgroundColor: theme.chipBg,
                  opacity: index === 0 ? 0 : 1,
                },
              ]}
              accessibilityLabel="Previous"
            >
              <Ionicons name="chevron-back" size={20} color={theme.textPrimary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNext}
              activeOpacity={0.88}
              style={[styles.nextBtn, { backgroundColor: chapter.accent }]}
              accessibilityLabel={isLast ? 'Begin study' : 'Continue'}
            >
              <Text style={styles.nextLabel}>{isLast ? 'Begin study' : 'Continue'}</Text>
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
});
