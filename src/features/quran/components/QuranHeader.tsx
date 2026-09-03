import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { styles } from '../styles';

export function QuranHeader() {
  const { theme } = useTheme();

  return (
    <View style={styles.header}>
      <Text style={[styles.screenTitle, { color: theme.textPrimary }]}>Holy Quran</Text>
      <Text style={[styles.screenSubtitle, { color: theme.textSecondary }]}>
        Browse all 114 Surahs with Urdu Translation
      </Text>
    </View>
  );
}
