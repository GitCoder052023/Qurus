import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import type { OnboardingSlide as OnboardingSlideData } from '../../../data/onboardingSlides';
import { SCREEN_WIDTH, styles } from '../styles';

interface OnboardingSlideProps {
  item: OnboardingSlideData;
}

export function OnboardingSlide({ item }: OnboardingSlideProps) {
  const { theme } = useTheme();

  return (
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
  );
}
