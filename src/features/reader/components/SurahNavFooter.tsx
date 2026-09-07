import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../../../context/ThemeContext';
import { styles } from '../styles/reader.styles';

interface SurahNavFooterProps {
  surahNumber: number;
  onPrevSurah: () => void;
  onNextSurah: () => void;
  theme: ThemeColors;
}

export const SurahNavFooter: React.FC<SurahNavFooterProps> = React.memo(
  function SurahNavFooter({
    surahNumber,
    onPrevSurah,
    onNextSurah,
    theme,
  }) {
    return (
      <View style={styles.surahFooter}>
        <View style={styles.surahNavRow}>
          <TouchableOpacity
            onPress={onPrevSurah}
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
            onPress={onNextSurah}
            disabled={surahNumber >= 114}
            style={[
              styles.navSurahBtn,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
                opacity: surahNumber >= 114 ? 0.4 : 1,
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
);
