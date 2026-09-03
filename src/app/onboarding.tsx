import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { useStudyState } from '../context/StudyContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Slide {
  id: string;
  badge: string;
  authorNote: string;
  title: string;
  subtitle: string;
  quote?: string;
  icon: keyof typeof Ionicons.glyphMap;
  accentColor: string;
}

const ONBOARDING_SLIDES: Slide[] = [
  {
    id: '1',
    badge: 'ORIGIN STORY • HAMDAN KHUBAIB',
    authorNote: 'A Note From The Developer',
    title: 'Quran in the Palm of Your Hand',
    subtitle:
      'As a youngster, I wanted to study the Quran from its pure source with translation. But rigid discipline and heavy tafseer felt daunting. I wondered: why can’t Allah’s words be as accessible in our hand as our daily distractions like Spotify or Instagram?',
    icon: 'phone-portrait-outline',
    accentColor: '#0D7A57',
  },
  {
    id: '2',
    badge: 'THE TURNING POINT',
    authorNote: 'My Brother’s Advice',
    title: 'A Hook in Your Mind',
    subtitle:
      'I had no idea how to actually study the Quran. Then my brother told me: “Don’t overthink anything. Just start reading with translation. Whatever framework you view the world through—science, philosophy, history, or common sense—you will find an ayah that sticks with you like a hook in your mind.”',
    quote: '“Just start reading... you will find an ayah that sticks like a hook.”',
    icon: 'sparkles-outline',
    accentColor: '#D97706',
  },
  {
    id: '3',
    badge: 'THE PHILOSOPHY',
    authorNote: 'Ayah-Centric Sanctuary',
    title: 'Reflect One Verse at a Time',
    subtitle:
      'That insight became the soul of Qurus. Here, you work with individual ayahs: listen to Arabic recitations paired with Urdu translations, highlight verses, and write personal reflections directly in your private Study Notebook.',
    icon: 'journal-outline',
    accentColor: '#10B981',
  },
  {
    id: '4',
    badge: 'LIFE IN MOTION',
    authorNote: 'Frictionless Study',
    title: 'Studying That Doesn’t Feel Like Studying',
    subtitle:
      'We made the UX as effortless as Spotify. Enjoy background audio and lock-screen controls while lifting at the gym, commuting in the metro, or driving—turning idle moments into tranquil Quran contemplation.',
    icon: 'musical-notes-outline',
    accentColor: '#0284C7',
  },
  {
    id: '5',
    badge: 'PERSONAL ADVICE • FROM HAMDAN',
    authorNote: 'An Open Invitation',
    title: 'Whoever You Are, Just Give It a Shot',
    subtitle:
      'Whether you’re a 15-year-old with doubts, an atheist, or an agnostic—I genuinely don’t care about labels because I’m one of you right now. Exactly. I’m not so religious and I’m not here to convert you. I’m studying Quran with this framework, and I advise you to just give it a shot.',
    quote: '“I’m not here to convert you. I’m one of you. Just give the words an honest shot.”',
    icon: 'heart-half-outline',
    accentColor: '#B45309',
  },
];

export default function OnboardingScreen() {
  const { theme } = useTheme();
  const { completeOnboarding } = useStudyState();
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleFinish = async () => {
    await completeOnboarding();
    router.replace('/(tabs)');
  };

  const handleNext = () => {
    if (currentIndex < ONBOARDING_SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    handleFinish();
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Header with Origin Story & Skip Button */}
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <View style={[styles.brandDot, { backgroundColor: theme.primary }]} />
          <Text style={[styles.brandText, { color: theme.textPrimary }]}>Qurus</Text>
        </View>

        <View style={styles.topActionsRow}>
          <TouchableOpacity
            onPress={() => router.push('/story')}
            style={[styles.storyButton, { backgroundColor: theme.primaryMuted }]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="book-outline" size={13} color={theme.primary} />
            <Text style={[styles.storyButtonText, { color: theme.primary }]}>Origin Story</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSkip}
            style={[styles.skipButton, { backgroundColor: theme.chipBg }]}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text style={[styles.skipText, { color: theme.textSecondary }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Paged Carousel */}
      <Animated.FlatList
        ref={flatListRef}
        data={ONBOARDING_SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
            {/* Serene Glowing Icon Circle */}
            <View
              style={[
                styles.iconGlowOuter,
                {
                  backgroundColor: theme.cardElevated,
                  borderColor: theme.borderSubtle,
                },
              ]}
            >
              <View
                style={[
                  styles.iconGlowInner,
                  { backgroundColor: item.accentColor + '18' },
                ]}
              >
                <Ionicons name={item.icon} size={44} color={item.accentColor} />
              </View>
            </View>

            {/* Badge & Sub-label */}
            <View style={styles.badgeRow}>
              <View style={[styles.badge, { backgroundColor: theme.chipBg }]}>
                <Text style={[styles.badgeText, { color: item.accentColor }]}>{item.badge}</Text>
              </View>
            </View>

            {/* Title */}
            <Text style={[styles.title, { color: theme.textPrimary }]}>{item.title}</Text>

            {/* Subtitle in Hamdan's Voice */}
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{item.subtitle}</Text>

            {/* Optional Quote / Highlight Box */}
            {item.quote && (
              <View
                style={[
                  styles.quotePill,
                  { backgroundColor: theme.surface, borderColor: theme.borderSubtle },
                ]}
              >
                <Ionicons name="chatbubble-ellipses-outline" size={14} color={item.accentColor} />
                <Text style={[styles.quotePillText, { color: theme.textPrimary }]}>
                  {item.quote}
                </Text>
              </View>
            )}

            {/* Read Full Story Link */}
            <TouchableOpacity
              onPress={() => router.push('/story')}
              activeOpacity={0.7}
              style={styles.storyLink}
            >
              <Text style={[styles.storyLinkText, { color: theme.primary }]}>
                Read Hamdan's full letter
              </Text>
              <Ionicons name="arrow-forward" size={12} color={theme.primary} />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Bottom Navigation & Controls */}
      <View style={styles.bottomBar}>
        {/* Pagination Dots */}
        <View style={styles.dotsRow}>
          {ONBOARDING_SLIDES.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor: isActive ? theme.primary : theme.surfaceHighlight,
                    width: isActive ? 24 : 8,
                  },
                ]}
              />
            );
          })}
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.88}
          style={[styles.actionBtn, { backgroundColor: theme.primary }]}
        >
          <Text style={styles.actionBtnText}>
            {currentIndex === ONBOARDING_SLIDES.length - 1 ? 'Begin Study' : 'Continue'}
          </Text>
          <Ionicons
            name={currentIndex === ONBOARDING_SLIDES.length - 1 ? 'checkmark' : 'arrow-forward'}
            size={18}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  brandText: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  topActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  storyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  storyButtonText: {
    fontSize: 12,
    fontWeight: '700',
  },
  skipButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
  },
  skipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconGlowOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  iconGlowInner: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeRow: {
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 23,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 30,
    letterSpacing: -0.4,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  quotePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    maxWidth: '94%',
  },
  quotePillText: {
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: '500',
    flexShrink: 1,
  },
  storyLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  storyLinkText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  bottomBar: {
    paddingHorizontal: 28,
    paddingBottom: Platform.OS === 'ios' ? 16 : 28,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 22,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
