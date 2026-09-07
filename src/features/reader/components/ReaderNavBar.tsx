import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../../../context/ThemeContext';
import { styles } from '../styles/reader.styles';

interface ReaderNavBarProps {
  englishName: string;
  arabicName: string;
  surahNumber: number;
  isSurahPlaying: boolean;
  onBack: () => void;
  onPlayToggle: () => void;
  theme: ThemeColors;
}

export const ReaderNavBar: React.FC<ReaderNavBarProps> = React.memo(function ReaderNavBar({
  englishName,
  arabicName,
  surahNumber,
  isSurahPlaying,
  onBack,
  onPlayToggle,
  theme,
}) {
  return (
    <View style={[styles.navBar, { borderBottomColor: theme.borderSubtle }]}>
      <TouchableOpacity onPress={onBack} style={styles.navBarIconBtn}>
        <Ionicons name="chevron-back" size={24} color={theme.textPrimary} />
      </TouchableOpacity>

      <View style={styles.navBarCenter}>
        <Text style={[styles.navBarTitle, { color: theme.textPrimary }]}>
          {englishName}
        </Text>
        <Text style={[styles.navBarSubtitle, { color: theme.textSecondary }]}>
          {arabicName} • Surah {surahNumber}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onPlayToggle}
        style={[styles.navBarPlayBtn, { backgroundColor: theme.primaryMuted }]}
      >
        <Ionicons
          name={isSurahPlaying ? 'pause' : 'play'}
          size={18}
          color={theme.primary}
          style={!isSurahPlaying ? { marginLeft: 2 } : undefined}
        />
      </TouchableOpacity>
    </View>
  );
});
