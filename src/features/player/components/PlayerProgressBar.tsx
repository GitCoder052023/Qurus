import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/fullPlayer.styles';

interface PlayerProgressBarProps {
  currentTime: number;
  duration: number;
  isUrduPhase: boolean;
  theme: any;
}

export function formatPlayerTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function PlayerProgressBar({
  currentTime,
  duration,
  isUrduPhase,
  theme,
}: PlayerProgressBarProps) {
  const progressPercent =
    duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  return (
    <View style={styles.scrubberSection}>
      <View style={[styles.trackBg, { backgroundColor: theme.surfaceHighlight }]}>
        <View
          style={[
            styles.trackFill,
            {
              width: `${progressPercent}%`,
              backgroundColor: isUrduPhase ? theme.accentGold : theme.primary,
            },
          ]}
        />
      </View>
      <View style={styles.timeRow}>
        <Text style={[styles.timeText, { color: theme.textTertiary }]}>
          {formatPlayerTime(currentTime)}
        </Text>
        <Text style={[styles.timeText, { color: theme.textTertiary }]}>
          {duration > 0 ? formatPlayerTime(duration) : '--:--'}
        </Text>
      </View>
    </View>
  );
}
