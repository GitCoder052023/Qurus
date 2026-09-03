import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { SEEK_STEP_SECONDS } from '../../../config/audio';
import type { PlaybackMode } from '../../../types';
import { styles } from './styles';
import { formatPlaybackTime, getPlaybackModeLabel } from './utils';

interface PlayerControlsProps {
  currentTime: number;
  duration: number;
  progressPercent: number;
  isPlaying: boolean;
  isUrduPhase: boolean;
  playbackMode: PlaybackMode;
  playbackSpeed: number;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (seconds: number) => void;
  onTogglePlayPause: () => void;
  onCyclePlaybackMode: () => void;
  onCycleSpeed: () => void;
  onJumpToReader: () => void;
}

export function PlayerControls({
  currentTime,
  duration,
  progressPercent,
  isPlaying,
  isUrduPhase,
  playbackMode,
  playbackSpeed,
  onPrevious,
  onNext,
  onSeek,
  onTogglePlayPause,
  onCyclePlaybackMode,
  onCycleSpeed,
  onJumpToReader,
}: PlayerControlsProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.bottomSection, { backgroundColor: theme.background }]}>
      {/* Scrubber Progress Bar */}
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
            {formatPlaybackTime(currentTime)}
          </Text>
          <Text style={[styles.timeText, { color: theme.textTertiary }]}>
            {duration > 0 ? formatPlaybackTime(duration) : '--:--'}
          </Text>
        </View>
      </View>

      {/* Symmetrical Spotify-Style Audio Controls */}
      <View style={styles.controlsRow}>
        <TouchableOpacity
          onPress={onPrevious}
          style={styles.skipBtn}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="play-skip-back" size={26} color={theme.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSeek(Math.max(0, currentTime - SEEK_STEP_SECONDS))}
          style={styles.seekBtn}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="play-back" size={22} color={theme.textSecondary} />
        </TouchableOpacity>

        {/* Center Breathing Play/Pause Button */}
        <TouchableOpacity
          onPress={onTogglePlayPause}
          style={[
            styles.mainPlayBtn,
            {
              backgroundColor: isUrduPhase ? theme.accentGold : theme.primary,
              shadowColor: isUrduPhase ? theme.accentGold : theme.primary,
            },
          ]}
          activeOpacity={0.88}
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={34}
            color="#FFFFFF"
            style={!isPlaying ? { marginLeft: 3 } : undefined}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSeek(Math.min(duration, currentTime + SEEK_STEP_SECONDS))}
          style={styles.seekBtn}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="play-forward" size={22} color={theme.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNext}
          style={styles.skipBtn}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="play-skip-forward" size={26} color={theme.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Bottom Utility Chips (Minimal & Clean) */}
      <View style={styles.utilitiesRow}>
        <TouchableOpacity
          onPress={onCyclePlaybackMode}
          style={[styles.utilChip, { backgroundColor: theme.chipBg, borderColor: theme.borderSubtle }]}
        >
          <Ionicons name="repeat" size={13} color={theme.primary} />
          <Text style={[styles.utilChipText, { color: theme.textPrimary }]}>
            {getPlaybackModeLabel(playbackMode)}
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
    </View>
  );
}
