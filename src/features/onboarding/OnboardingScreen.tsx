import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useStudyState } from '../../context/StudyContext';
import { ONBOARDING_SLIDES } from '../../data/onboardingSlides';
import { styles } from './styles';
import { OnboardingSlide } from './components/OnboardingSlide';
import { OnboardingDots } from './components/OnboardingDots';

export function OnboardingScreen() {
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
        renderItem={({ item }) => <OnboardingSlide item={item} />}
      />

      {/* Bottom Navigation & Controls */}
      <View style={styles.bottomBar}>
        <OnboardingDots currentIndex={currentIndex} />

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
