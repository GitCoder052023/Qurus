import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { styles } from '../styles';

export function AppInfoSection() {
  const { theme } = useTheme();

  return (
    <View style={styles.appInfoSection}>
      <Text style={[styles.appInfoTitle, { color: theme.textPrimary }]}>Qurus v1.0.0</Text>
      <Text style={[styles.appInfoDesc, { color: theme.textSecondary }]}>
        Dedicated to quiet personal Quranic reflection & continuous listening.
      </Text>
      <Text style={[styles.appInfoSource, { color: theme.textTertiary }]}>
        Arabic Text: Verified Uthmani Hafs • Translation: Fateh Muhammad Jalandhry • Audio: EveryAyah CDN
      </Text>
    </View>
  );
}
