import React from 'react';
import { View, Text } from 'react-native';
import { ThemeColors } from '../../../context/ThemeContext';
import { styles } from '../styles/quranList.styles';

interface QuranHeaderProps {
  theme: ThemeColors;
}

export const QuranHeader: React.FC<QuranHeaderProps> = React.memo(function QuranHeader({ theme }) {
  return (
    <View style={styles.header}>
      <Text style={[styles.screenTitle, { color: theme.textPrimary }]}>Quran</Text>
      <Text style={[styles.screenSubtitle, { color: theme.textSecondary }]}>
        All 114 surahs, with Urdu translation
      </Text>
    </View>
  );
});
