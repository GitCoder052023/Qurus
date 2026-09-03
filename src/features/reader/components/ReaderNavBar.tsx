import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { styles } from '../styles';

interface ReaderNavBarProps {
  englishName: string;
  name: string;
  number: number;
  isSurahPlaying: boolean;
  onBack: () => void;
  onPlayToggle: () => void;
}

export function ReaderNavBar({
  englishName,
  name,
  number,
  isSurahPlaying,
  onBack,
  onPlayToggle,
}: ReaderNavBarProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.navBar, { borderBottomColor: theme.borderSubtle }]}>
      <TouchableOpacity onPress={onBack} style={styles.navBarIconBtn}>
        <Ionicons name="chevron-back" size={24} color={theme.textPrimary} />
      </TouchableOpacity>

      <View style={styles.navBarCenter}>
        <Text style={[styles.navBarTitle, { color: theme.textPrimary }]}>{englishName}</Text>
        <Text style={[styles.navBarSubtitle, { color: theme.textSecondary }]}>
          {name} • Surah {number}
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
}
