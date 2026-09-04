import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
  Easing,
  Platform,
  GestureResponderEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { useStudyState } from '../context/StudyContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface StoryChapter {
  id: string;
  chapterNumber: number;
  badge: string;
  heroIcon: keyof typeof Ionicons.glyphMap;
  accentColor: string;
  title: string;
  highlightPhrase: string;
  proseParagraphs: string[];
  quote?: {
    text: string;
    author: string;
  };
  features?: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    desc: string;
  }[];
  activities?: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
  }[];
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
    chapterNumber: 1,
    badge: 'CHAPTER 1 • THE HONEST DILEMMA',
    heroIcon: 'phone-portrait-outline',
    accentColor: '#0E6B5C',
    title: 'A Question in the Palm of My Hand',
    highlightPhrase: 'Why can’t Allah’s words be as effortless as our daily distractions?',
    proseParagraphs: [
      'To be completely honest with you, I was looking for a way to study and truly understand the Quran from its pure source with translation.',
      'As a youngster in this fast-paced world, classical methods felt intimidating. Rigid discipline, heavy volumes of classical commentary, and dense academic texts felt overwhelming. Guilt slowly took over.',
      'Meanwhile, look at our modern lives: apps like Spotify and Instagram are effortlessly resting right in the palm of our hands anytime we have two idle minutes.',
    ],
    quote: {
      text: '“Why can’t the pure, unadulterated words of Allah be just as accessible, immediate, and frictionless in the palm of our hands as the distractions that consume our hours?”',
      author: 'Hamdan Khubaib • Creator of Qurus',
    },
  },
  {
    id: 'turning-point',
    chapterNumber: 2,
    badge: 'CHAPTER 2 • THE TURNING POINT',
    heroIcon: 'chatbubble-ellipses-outline',
    accentColor: '#0A5850',
    title: 'The Advice That Changed Everything',
    highlightPhrase: '“You will find an ayah that sticks with you like a hook in your mind.”',
    proseParagraphs: [
      'I was paralyzed because I genuinely had no idea how to study the Quran. Where do you start? How do you make sense of it without getting lost in complexity?',
      'One day, I opened up to my brother about this confusion. His response was so simple, yet it completely dismantled every mental barrier I had built.',
    ],
    quote: {
      text: '“Don’t overthink anything. Just start reading the Quran with its translation. Whatever framework you view the world through—science, philosophy, history, or common sense—you will find an ayah that sticks with you like a hook in your mind.”',
      author: 'My brother’s advice to me',
    },
  },
  {
    id: 'invitation',
    chapterNumber: 3,
    badge: 'CHAPTER 3 • FOUNDER’S NOTE',
    heroIcon: 'heart-half',
    accentColor: '#125E54',
    title: 'Radical Honesty: An Open Invitation',
    highlightPhrase: '“I’m not here to convert you. I am one of you right now.”',
    proseParagraphs: [
      'No matter who you are reading this—a 15-year-old wrestling with doubts, an atheist, an agnostic, or someone feeling spiritually numb—I genuinely don’t care about labels.',
      'Because to be completely transparent: I am one of you right now. Exactly. I’m not so religious, and I’m definitely not here to lecture or convert you.',
      'I’m just a normal person who was looking for truth without feeling overwhelmed. My advice to you is the exact same my brother gave to me:',
    ],
    quote: {
      text: '“Just give it an honest shot. Don’t worry about labels. Just open an ayah, read the meaning, and let the words speak for themselves.”',
      author: 'Hamdan’s personal promise',
    },
  },
  {
    id: 'sanctuary',
    chapterNumber: 4,
    badge: 'CHAPTER 4 • THE SANCTUARY',
    heroIcon: 'book-outline',
    accentColor: '#0E6B5C',
    title: 'The Soul of Qurus: Ayah-Based Study',
    highlightPhrase: 'Studying that doesn’t feel like a heavy assignment.',
    proseParagraphs: [
      'That insight became the soul of Qurus. Instead of pressuring you to speed through pages without retaining anything, Qurus gives you an Ayah-based sanctuary built for the modern world:',
    ],
    features: [
      {
        icon: 'finger-print-outline',
        title: 'Work With Individual Ayahs',
        desc: 'Every single verse stands on its own dignity. Isolate it, repeat it, reflect on it, and let it take root.',
      },
      {
        icon: 'journal-outline',
        title: 'Private Study Notebook',
        desc: 'Attach personal reflections, questions, and insights directly to verses. Saved privately forever.',
      },
      {
        icon: 'musical-notes-outline',
        title: 'Arabic + Urdu Paired Audio',
        desc: 'Listen to the pure Arabic recitation immediately followed by the Urdu translation verse by verse.',
      },
    ],
  },
  {
    id: 'motion-purpose',
    chapterNumber: 5,
    badge: 'CHAPTER 5 • LIFE IN MOTION',
    heroIcon: 'infinite-outline',
    accentColor: '#0E6B5C',
    title: 'Your Journey Begins Here',
    highlightPhrase: 'Turning idle moments into tranquil reflection.',
    proseParagraphs: [
      'We engineered Qurus with Spotify-grade background audio and lockscreen controls so you can listen while moving through life:',
    ],
    activities: [
      { icon: 'barbell-outline', label: 'At the gym lifting weights' },
      { icon: 'train-outline', label: 'Commuting on the metro' },
      { icon: 'car-outline', label: 'Driving through traffic' },
      { icon: 'walk-outline', label: 'Evening walks under the sky' },
    ],
    founderSignature: {
      name: 'Hamdan Khubaib',
      role: 'Creator & Developer of Qurus',
      note: 'If Qurus can help even one person find an ayah that hooks into their heart, sparks their curiosity, and bridges modern life with the Divine book, every line of code has fulfilled its purpose.',
      dua: 'May Allah bless your study, grant you deep clarity, and make His words a steadfast light in your life.',
    },
  },
];

export default function OnboardingScreen() {
  const { theme } = useTheme();
  const { completeOnboarding } = useStudyState();
  const router = useRouter();

  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const currentChapter = CHAPTERS[currentChapterIndex];

  // Animation values for butter-smooth storytelling transitions
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Ambient breathing pulse for hero icon
  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoop.start();
    return () => pulseLoop.stop();
  }, [pulseAnim]);

  // Butter-smooth transition to a specific chapter index
  const goToChapter = useCallback(
    (targetIndex: number) => {
      if (targetIndex < 0 || targetIndex >= CHAPTERS.length) return;

      // Animate out
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: targetIndex > currentChapterIndex ? -20 : 20,
          duration: 150,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.96,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Change state
        setCurrentChapterIndex(targetIndex);
        slideAnim.setValue(targetIndex > currentChapterIndex ? 20 : -20);

        // Animate in
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 260,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 260,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.0,
            duration: 260,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start();
      });
    },
    [currentChapterIndex, fadeAnim, slideAnim, scaleAnim]
  );

  const handleNext = () => {
    if (currentChapterIndex < CHAPTERS.length - 1) {
      goToChapter(currentChapterIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentChapterIndex > 0) {
      goToChapter(currentChapterIndex - 1);
    }
  };

  const handleComplete = async () => {
    await completeOnboarding();
    router.replace('/(tabs)');
  };

  const handleStartDirectStudy = async () => {
    await completeOnboarding();
    router.replace('/(tabs)');
  };

  // Screen horizontal touch/swipe navigation
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

    // Horizontal swipe detection
    if (Math.abs(deltaX) > 45 && Math.abs(deltaY) < 40 && deltaTime < 500) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const isFinalChapter = currentChapterIndex === CHAPTERS.length - 1;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Top Bar: Segmented Story Progress Bars (Instagram/Spotify Story style) */}
      <View style={styles.topSection}>
        <View style={styles.segmentedProgressRow}>
          {CHAPTERS.map((ch, idx) => {
            const isCompleted = idx < currentChapterIndex;
            const isCurrent = idx === currentChapterIndex;
            return (
              <TouchableOpacity
                key={ch.id}
                onPress={() => goToChapter(idx)}
                style={styles.segmentTouchable}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 2, right: 2 }}
              >
                <View
                  style={[
                    styles.segmentBar,
                    {
                      backgroundColor: isCompleted
                        ? currentChapter.accentColor
                        : isCurrent
                        ? currentChapter.accentColor
                        : theme.surfaceHighlight,
                      opacity: isCompleted ? 0.75 : isCurrent ? 1 : 0.45,
                    },
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Brand & Skip Header */}
        <View style={styles.headerNavRow}>
          <View style={styles.brandGroup}>
            <View
              style={[
                styles.brandDot,
                { backgroundColor: currentChapter.accentColor, shadowColor: currentChapter.accentColor },
              ]}
            />
            <Text style={[styles.brandTitle, { color: theme.textPrimary }]}>Qurus</Text>
            <View
              style={[
                styles.chapterPill,
                { backgroundColor: currentChapter.accentColor + '18' },
              ]}
            >
              <Text style={[styles.chapterPillText, { color: currentChapter.accentColor }]}>
                {currentChapterIndex + 1}/{CHAPTERS.length}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleComplete}
            style={[styles.skipButton, { backgroundColor: theme.chipBg }]}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityLabel="Skip intro story"
          >
            <Text style={[styles.skipButtonText, { color: theme.textSecondary }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Story Content Container with Gestures */}
      <View
        style={styles.storyCanvas}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <ScrollView
          style={styles.scrollCanvas}
          contentContainerStyle={styles.scrollCanvasContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <Animated.View
            style={[
              styles.animatedSlide,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
              },
            ]}
          >
            {/* Hero Icon with Breathing Ambient Glow */}
            <View style={styles.heroIconWrapper}>
              <Animated.View
                style={[
                  styles.heroGlowRing,
                  {
                    backgroundColor: currentChapter.accentColor + '12',
                    borderColor: currentChapter.accentColor + '30',
                    transform: [{ scale: pulseAnim }],
                  },
                ]}
              />
              <View
                style={[
                  styles.heroIconInner,
                  {
                    backgroundColor: currentChapter.accentColor + '20',
                    borderColor: currentChapter.accentColor + '50',
                  },
                ]}
              >
                <Ionicons
                  name={currentChapter.heroIcon}
                  size={36}
                  color={currentChapter.accentColor}
                />
              </View>
            </View>

            {/* Chapter Badge */}
            <View
              style={[
                styles.badgeChip,
                {
                  backgroundColor: currentChapter.accentColor + '16',
                  borderColor: currentChapter.accentColor + '35',
                },
              ]}
            >
              <Text style={[styles.badgeChipText, { color: currentChapter.accentColor }]}>
                {currentChapter.badge}
              </Text>
            </View>

            {/* Headline */}
            <Text style={[styles.chapterTitle, { color: theme.textPrimary }]}>
              {currentChapter.title}
            </Text>

            {/* Highlight Phrase */}
            <Text
              style={[
                styles.highlightPhrase,
                {
                  color: currentChapter.accentColor,
                  borderLeftColor: currentChapter.accentColor,
                },
              ]}
            >
              {currentChapter.highlightPhrase}
            </Text>

            {/* Narrative Prose */}
            <View style={styles.proseGroup}>
              {currentChapter.proseParagraphs.map((para, pIdx) => (
                <Text
                  key={pIdx}
                  style={[styles.proseText, { color: theme.textSecondary }]}
                >
                  {para}
                </Text>
              ))}
            </View>

            {/* Quote Card (if present) */}
            {currentChapter.quote && (
              <View
                style={[
                  styles.quoteCard,
                  {
                    backgroundColor: theme.cardElevated,
                    borderLeftColor: currentChapter.accentColor,
                    borderColor: theme.borderSubtle,
                  },
                ]}
              >
                <View style={styles.quoteIconHeader}>
                  <Ionicons
                    name="chatbubble-ellipses-outline"
                    size={20}
                    color={currentChapter.accentColor}
                  />
                  <Text
                    style={[styles.quoteAuthorText, { color: currentChapter.accentColor }]}
                  >
                    {currentChapter.quote.author}
                  </Text>
                </View>
                <Text style={[styles.quoteBodyText, { color: theme.textPrimary }]}>
                  {currentChapter.quote.text}
                </Text>
              </View>
            )}

            {/* Feature Cards (Chapter 4: The Architecture) */}
            {currentChapter.features && (
              <View style={styles.featuresStack}>
                {currentChapter.features.map((feat, fIdx) => (
                  <View
                    key={fIdx}
                    style={[
                      styles.featurePill,
                      {
                        backgroundColor: theme.cardElevated,
                        borderColor: theme.borderSubtle,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.featureIconContainer,
                        { backgroundColor: currentChapter.accentColor + '18' },
                      ]}
                    >
                      <Ionicons
                        name={feat.icon}
                        size={20}
                        color={currentChapter.accentColor}
                      />
                    </View>
                    <View style={styles.featureTextContainer}>
                      <Text style={[styles.featureTitle, { color: theme.textPrimary }]}>
                        {feat.title}
                      </Text>
                      <Text
                        style={[styles.featureDesc, { color: theme.textSecondary }]}
                      >
                        {feat.desc}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Activity Chips (Chapter 5: Life in Motion) */}
            {currentChapter.activities && (
              <View style={styles.activitiesContainer}>
                <Text style={[styles.activitiesHeader, { color: theme.textTertiary }]}>
                  DESIGNED FOR YOUR DAILY RHYTHM
                </Text>
                <View style={styles.activitiesGrid}>
                  {currentChapter.activities.map((act, aIdx) => (
                    <View
                      key={aIdx}
                      style={[
                        styles.activityPill,
                        {
                          backgroundColor: theme.cardElevated,
                          borderColor: theme.borderSubtle,
                        },
                      ]}
                    >
                      <Ionicons
                        name={act.icon}
                        size={17}
                        color={currentChapter.accentColor}
                      />
                      <Text
                        style={[styles.activityPillText, { color: theme.textPrimary }]}
                      >
                        {act.label}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Founder's Signature & Dedication Card (Chapter 5) */}
            {currentChapter.founderSignature && (
              <View
                style={[
                  styles.founderCard,
                  {
                    backgroundColor: theme.cardElevated,
                    borderColor: currentChapter.accentColor + '40',
                  },
                ]}
              >
                <View style={styles.founderTopRow}>
                  <View
                    style={[
                      styles.founderAvatarCircle,
                      { backgroundColor: currentChapter.accentColor },
                    ]}
                  >
                    <Text style={[styles.founderAvatarLetter, { color: theme.onPrimary }]}>H</Text>
                  </View>
                  <View>
                    <Text style={[styles.founderName, { color: theme.textPrimary }]}>
                      {currentChapter.founderSignature.name}
                    </Text>
                    <Text
                      style={[styles.founderRole, { color: theme.textTertiary }]}
                    >
                      {currentChapter.founderSignature.role}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.founderNoteText, { color: theme.textPrimary }]}>
                  {currentChapter.founderSignature.note}
                </Text>

                <View
                  style={[
                    styles.founderDivider,
                    { backgroundColor: theme.borderSubtle },
                  ]}
                />

                <Text style={[styles.founderDuaText, { color: currentChapter.accentColor }]}>
                  {currentChapter.founderSignature.dua}
                </Text>
              </View>
            )}
          </Animated.View>
        </ScrollView>
      </View>

      {/* Bottom Floating Navigation Dock */}
      <View
        style={[
          styles.bottomDock,
          {
            backgroundColor: theme.background,
            borderTopColor: theme.borderSubtle,
          },
        ]}
      >
        {/* Back Step Button */}
        {currentChapterIndex > 0 ? (
          <TouchableOpacity
            onPress={handlePrev}
            style={[styles.prevButton, { backgroundColor: theme.chipBg }]}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityLabel="Previous chapter"
          >
            <Ionicons name="chevron-back" size={20} color={theme.textPrimary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.prevPlaceholder} />
        )}

        {/* Dots Counter */}
        <View style={styles.dotsGroup}>
          {CHAPTERS.map((_, dotIdx) => {
            const isActive = dotIdx === currentChapterIndex;
            return (
              <TouchableOpacity
                key={dotIdx}
                onPress={() => goToChapter(dotIdx)}
                hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
              >
                <View
                  style={[
                    styles.dotIndicator,
                    {
                      width: isActive ? 20 : 6,
                      backgroundColor: isActive
                        ? currentChapter.accentColor
                        : theme.surfaceHighlight,
                    },
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Primary Action Button */}
        {isFinalChapter ? (
          <TouchableOpacity
            onPress={handleStartDirectStudy}
            activeOpacity={0.88}
            style={[
              styles.primaryActionBtn,
              {
                backgroundColor: currentChapter.accentColor,
                shadowColor: currentChapter.accentColor,
              },
            ]}
            accessibilityLabel="Begin Quran study"
          >
            <Text style={[styles.primaryActionText, { color: theme.onPrimary }]}>Begin study</Text>
            <Ionicons name="arrow-forward" size={18} color={theme.onPrimary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.88}
            style={[
              styles.primaryActionBtn,
              {
                backgroundColor: currentChapter.accentColor,
                shadowColor: currentChapter.accentColor,
              },
            ]}
            accessibilityLabel="Next chapter"
          >
            <Text style={[styles.primaryActionText, { color: theme.onPrimary }]}>Continue</Text>
            <Ionicons name="arrow-forward" size={17} color={theme.onPrimary} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topSection: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 4,
  },
  segmentedProgressRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  segmentTouchable: {
    flex: 1,
    paddingVertical: 4,
  },
  segmentBar: {
    height: 3.5,
    borderRadius: 2,
  },
  headerNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    elevation: 0,
    shadowOpacity: 0,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.4,
  },
  chapterPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 4,
  },
  chapterPillText: {
    fontSize: 11,
    fontWeight: '600',
  },
  skipButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
  },
  skipButtonText: {
    fontSize: 12.5,
    fontWeight: '600',
  },
  storyCanvas: {
    flex: 1,
  },
  scrollCanvas: {
    flex: 1,
  },
  scrollCanvasContent: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 30,
  },
  animatedSlide: {
    width: '100%',
  },
  heroIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
    position: 'relative',
    height: 96,
  },
  heroGlowRing: {
    position: 'absolute',
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 1,
  },
  heroIconInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  badgeChip: {
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4.5,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  badgeChipText: {
    fontSize: 10.5,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  chapterTitle: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: -0.5,
    lineHeight: 31,
    textAlign: 'center',
    marginBottom: 10,
  },
  highlightPhrase: {
    fontSize: 14.5,
    lineHeight: 22,
    fontWeight: '600',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  proseGroup: {
    gap: 10,
    marginBottom: 16,
  },
  proseText: {
    fontSize: 14.5,
    lineHeight: 23,
    letterSpacing: -0.1,
  },
  quoteCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderLeftWidth: 4,
    padding: 16,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  quoteIconHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  quoteAuthorText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  quoteBodyText: {
    fontSize: 14.5,
    lineHeight: 23,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  featuresStack: {
    gap: 10,
    marginVertical: 8,
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    borderRadius: 15,
    borderWidth: 1,
    gap: 12,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 12.5,
    lineHeight: 18,
  },
  activitiesContainer: {
    marginTop: 10,
    marginBottom: 16,
  },
  activitiesHeader: {
    fontSize: 10.5,
    fontWeight: '600',
    letterSpacing: 0.8,
    marginBottom: 10,
    textAlign: 'center',
  },
  activitiesGrid: {
    gap: 8,
  },
  activityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 13,
    borderWidth: 1,
  },
  activityPillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  founderCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    marginVertical: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  founderTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  founderAvatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  founderAvatarLetter: {
    fontSize: 19,
    fontWeight: '600',
  },
  founderName: {
    fontSize: 15,
    fontWeight: '600',
  },
  founderRole: {
    fontSize: 11.5,
    marginTop: 1,
  },
  founderNoteText: {
    fontSize: 13.5,
    lineHeight: 21,
    marginBottom: 12,
  },
  founderDivider: {
    height: 1,
    marginBottom: 12,
  },
  founderDuaText: {
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  bottomDock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  prevButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prevPlaceholder: {
    width: 42,
  },
  dotsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dotIndicator: {
    height: 6,
    borderRadius: 3,
  },
  primaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 16,
    elevation: 0,
    shadowOpacity: 0,
  },
  primaryActionText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
