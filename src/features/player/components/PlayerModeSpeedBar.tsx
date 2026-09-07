import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PlaybackMode } from '../../../types';
import { styles } from '../styles/fullPlayer.styles';

interface PlayerModeSpeedBarProps {
  playbackMode: PlaybackMode;
  playbackSpeed: number;
  onCycleMode: () => void;
  onCycleSpeed: () => void;
  onJumpToReader: () => void;
  theme: any;
}

export function getModeLabel(mode: PlaybackMode): string {
  switch (mode) {
    case 'both':
      return 'Arabic + Urdu';
    case 'arabic_only':
      return 'Arabic Only';
    case 'translation_only':
      return 'Urdu Only';
  }
}

export function PlayerModeSpeedBar({
  playbackMode,
  playbackSpeed,
  onCycleMode,
  onCycleSpeed,
  onJumpToReader,
  theme,
}: PlayerModeSpeedBarProps) {
  return (
    <View style={styles.utilitiesRow}>
      <TouchableOpacity
        onPress={onCycleMode}
        style={[styles.utilChip, { backgroundColor: theme.chipBg, borderColor: theme.borderSubtle }]}
      >
        <Ionicons name="repeat" size={13} color={theme.primary} />
        <Text style={[styles.utilChipText, { color: theme.textPrimary }]}>
          {getModeLabel(playbackMode)}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onCycleSpeed}
        style={[styles.utilChip, { backgroundColor: theme.chipBg, borderColor: theme.borderSubtle }]}
      >
        <Ionicons name="speedometer-outline" size={13} color={theme.textSecondary} />
        <Text style={[styles.utilChipText, { color: theme.textPrimary }]}>
          {playbackSpeed}x
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onJumpToReader}
        style={[
          styles.utilChip,
          styles.readerJumpChip,
          { backgroundColor: theme.primaryMuted, borderColor: theme.primary },
        ]}
      >
        <Ionicons name="book-outline" size={13} color={theme.primary} />
        <Text style={[styles.utilChipText, { color: theme.primary, fontWeight: '700' }]}>
          Study in Reader
        </Text>
      </TouchableOpacity>
    </View>
  );
}
