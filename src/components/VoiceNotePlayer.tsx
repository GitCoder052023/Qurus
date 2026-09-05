import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import { VoiceNote } from '../types';

export function formatDurationMs(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

interface VoiceNotePlayerProps {
  voiceNote: VoiceNote;
  compact?: boolean;
  onRemove?: () => void;
}

export function VoiceNotePlayer({ voiceNote, compact = false, onRemove }: VoiceNotePlayerProps) {
  const { theme } = useTheme();
  const { isPlaying: recitationPlaying, pause: pauseRecitation } = useAudio();
  const player = useAudioPlayer({ uri: voiceNote.uri });
  const status = useAudioPlayerStatus(player);

  const isPlaying = Boolean(status.playing);
  const elapsedMs = (status.currentTime || 0) * 1000;
  const totalMs = voiceNote.durationMillis || (status.duration || 0) * 1000;
  const progress = totalMs > 0 ? Math.min(1, elapsedMs / totalMs) : 0;

  useEffect(() => {
    if (isPlaying && recitationPlaying) {
      pauseRecitation();
    }
  }, [isPlaying, recitationPlaying, pauseRecitation]);

  const togglePlayback = () => {
    if (isPlaying) {
      player.pause();
      return;
    }
    if (recitationPlaying) {
      pauseRecitation();
    }
    if (status.didJustFinish || (status.currentTime || 0) >= (status.duration || 0) - 0.05) {
      player.seekTo(0);
    }
    player.play();
  };

  return (
    <View
      style={[
        styles.row,
        compact ? styles.rowCompact : styles.rowFull,
        { backgroundColor: theme.noteMuted, borderColor: theme.borderSubtle },
      ]}
      accessibilityLabel={`Voice note, ${formatDurationMs(totalMs)}`}
    >
      <TouchableOpacity
        onPress={togglePlayback}
        style={[
          styles.playBtn,
          compact ? styles.playBtnCompact : styles.playBtnFull,
          { backgroundColor: theme.noteAccent },
        ]}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityRole="button"
        accessibilityLabel={isPlaying ? 'Pause voice note' : 'Play voice note'}
      >
        <Ionicons name={isPlaying ? 'pause' : 'play'} size={compact ? 14 : 16} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.meta}>
        {!compact && (
          <Text style={[styles.label, { color: theme.noteAccent }]}>Voice note</Text>
        )}
        <View style={[styles.track, { backgroundColor: theme.border }]}>
          <View
            style={[
              styles.trackFill,
              { width: `${Math.round(progress * 100)}%`, backgroundColor: theme.noteAccent },
            ]}
          />
        </View>
        <Text style={[styles.time, { color: theme.textSecondary }]}>
          {isPlaying || elapsedMs > 400
            ? `${formatDurationMs(elapsedMs)} / ${formatDurationMs(totalMs)}`
            : formatDurationMs(totalMs)}
        </Text>
      </View>

      {onRemove ? (
        <TouchableOpacity
          onPress={() => {
            if (isPlaying) player.pause();
            onRemove();
          }}
          style={styles.removeBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Remove voice note"
        >
          <Ionicons name="close-circle" size={20} color={theme.textTertiary} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 10,
  },
  rowFull: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 56,
  },
  rowCompact: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    minHeight: 44,
  },
  playBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  playBtnFull: {
    width: 36,
    height: 36,
  },
  playBtnCompact: {
    width: 32,
    height: 32,
  },
  meta: {
    flex: 1,
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
  track: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    borderRadius: 2,
  },
  time: {
    fontSize: 11,
    fontVariant: ['tabular-nums'],
  },
  removeBtn: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
