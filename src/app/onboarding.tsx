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
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  accentColor: string;
}

const ONBOARDING_SLIDES: Slide[] = [
  {
    id: '1',
    badge: 'WELCOME TO QURUS',
    title: 'Your Personal Quran Study Sanctuary',
    subtitle:
      'A serene, dignified space for deep Quran reading and reflection. Completely private, offline-ready, and free of social feeds, ads, or distractions.',
    icon: 'book-outline',
    accentColor: '#0D7A57',
  },
  {
    id: '2',
    badge: 'SPOTIFY-STYLE LISTENING',
    title: 'Seamless Background Recitation',
    subtitle:
      'Listen to tranquil Quran recitations while on the move. Enjoy continuous background audio, lock-screen controls, and a persistent floating player anywhere in the app.',
    icon: 'musical-notes-outline',
    accentColor: '#10B981',
  },
  {
    id: '3',
    badge: 'STUDY NOTEBOOK',
    title: 'Personal Reflections & Ayah Notes',
    subtitle:
      'Attach your personal thoughts, insights, and study reflections directly to any verse. All your notes are preserved privately in your central Study Notebook.',
    icon: 'create-outline',
    accentColor: '#D97706',
  },
  {
    id: '4',
    badge: 'MARKS & CONTINUITY',
    title: 'Bookmarks & Seamless Continuity',
    subtitle:
      'Highlight important verses for deep study, save bookmarks with full context, and instantly resume right where you left off from your personalized Home sanctuary.',
    icon: 'star-outline',
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
      {/* Top Header with Skip Button */}
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <View style={[styles.brandDot, { backgroundColor: theme.primary }]} />
          <Text style={[styles.brandText, { color: theme.textPrimary }]}>Qurus</Text>
        </View>

        <TouchableOpacity
          onPress={handleSkip}
          style={[styles.skipButton, { backgroundColor: theme.chipBg }]}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={[styles.skipText, { color: theme.textSecondary }]}>Skip</Text>
        </TouchableOpacity>
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
                <Ionicons name={item.icon} size={48} color={item.accentColor} />
              </View>
            </View>

            {/* Badge */}
            <View style={[styles.badge, { backgroundColor: theme.chipBg }]}>
              <Text style={[styles.badgeText, { color: item.accentColor }]}>{item.badge}</Text>
            </View>

            {/* Title & Subtitle */}
            <Text style={[styles.title, { color: theme.textPrimary }]}>{item.title}</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{item.subtitle}</Text>
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
    paddingHorizontal: 36,
  },
  iconGlowOuter: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  iconGlowInner: {
    width: 104,
    height: 104,
    borderRadius: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 32,
    letterSpacing: -0.4,
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 10,
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
