import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { ONBOARDING_SLIDES } from '../../../data/onboardingSlides';
import { styles } from '../styles';

interface OnboardingDotsProps {
  currentIndex: number;
}

export function OnboardingDots({ currentIndex }: OnboardingDotsProps) {
  const { theme } = useTheme();

  return (
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
  );
}
