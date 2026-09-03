import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { TOTAL_SURAHS } from '../../../config/quran';
import { styles } from '../styles';

interface SurahNavFooterProps {
  surahNumber: number;
  onPrev: () => void;
  onNext: () => void;
}

export function SurahNavFooter({ surahNumber, onPrev, onNext }: SurahNavFooterProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.surahFooter}>
      <View style={styles.surahNavRow}>
        <TouchableOpacity
          onPress={onPrev}
          disabled={surahNumber <= 1}
          style={[
            styles.navSurahBtn,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
              opacity: surahNumber <= 1 ? 0.4 : 1,
            },
          ]}
        >
          <Ionicons name="arrow-back" size={16} color={theme.textPrimary} />
          <Text style={[styles.navSurahText, { color: theme.textPrimary }]}>Previous Surah</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNext}
          disabled={surahNumber >= TOTAL_SURAHS}
          style={[
            styles.navSurahBtn,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
              opacity: surahNumber >= TOTAL_SURAHS ? 0.4 : 1,
            },
          ]}
        >
          <Text style={[styles.navSurahText, { color: theme.textPrimary }]}>Next Surah</Text>
          <Ionicons name="arrow-forward" size={16} color={theme.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
