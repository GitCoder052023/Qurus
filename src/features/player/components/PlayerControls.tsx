import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/fullPlayer.styles';

interface PlayerControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeekBackward: (seconds: number) => void;
  onSeekForward: (seconds: number) => void;
  theme: any;
}

export function PlayerControls({
  isPlaying,
  onTogglePlay,
  onPrevious,
  onNext,
  onSeekBackward,
  onSeekForward,
  theme,
}: PlayerControlsProps) {
  return (
    <View style={styles.controlsRow}>
      <TouchableOpacity
        onPress={onPrevious}
        style={styles.skipBtn}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Ionicons name="play-skip-back" size={26} color={theme.textPrimary} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onSeekBackward(10)}
        style={styles.seekBtn}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        accessibilityLabel="Seek backward 10 seconds"
      >
        <Ionicons name="play-back" size={22} color={theme.textSecondary} />
        <Text style={[styles.seekBadgeText, { color: theme.textSecondary }]}>10s</Text>
      </TouchableOpacity>

      {/* Center Play/Pause Button */}
      <TouchableOpacity
        onPress={onTogglePlay}
        style={[
          styles.mainPlayBtn,
          {
            backgroundColor: theme.primary,
            shadowColor: theme.primary,
          },
        ]}
        activeOpacity={0.88}
      >
        <Ionicons
          name={isPlaying ? 'pause' : 'play'}
          size={34}
          color={theme.onPrimary}
          style={!isPlaying ? { marginLeft: 3 } : undefined}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onSeekForward(10)}
        style={styles.seekBtn}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        accessibilityLabel="Seek forward 10 seconds"
      >
        <Ionicons name="play-forward" size={22} color={theme.textSecondary} />
        <Text style={[styles.seekBadgeText, { color: theme.textSecondary }]}>10s</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onNext}
        style={styles.skipBtn}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Ionicons name="play-skip-forward" size={26} color={theme.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}
