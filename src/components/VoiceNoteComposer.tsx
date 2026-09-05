import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  useAudioRecorder,
  useAudioRecorderState,
  RecordingPresets,
  setAudioModeAsync,
  requestRecordingPermissionsAsync,
} from 'expo-audio';
import { useTheme } from '../context/ThemeContext';
import { useAudio } from '../context/AudioContext';
import { VoiceNote } from '../types';
import { VoiceNotePlayer, formatDurationMs } from './VoiceNotePlayer';

const MAX_RECORDING_SECONDS = 180;

const RECORDING_OPTIONS = {
  ...RecordingPresets.HIGH_QUALITY,
  directory: 'document' as const,
};

interface VoiceNoteComposerProps {
  value: VoiceNote | null;
  onChange: (voiceNote: VoiceNote | null) => void;
  onRecordingChange?: (isRecording: boolean) => void;
}

async function restorePlaybackAudioMode() {
  try {
    await setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      allowsRecording: false,
      interruptionMode: 'doNotMix',
    });
  } catch (err) {
    console.warn('Could not restore playback audio mode:', err);
  }
}

export function VoiceNoteComposer({ value, onChange, onRecordingChange }: VoiceNoteComposerProps) {
  const { theme } = useTheme();
  const { isPlaying: recitationPlaying, pause: pauseRecitation } = useAudio();
  const recorder = useAudioRecorder(RECORDING_OPTIONS);
  const recorderState = useAudioRecorderState(recorder, 200);
  const [isStarting, setIsStarting] = useState(false);

  const isRecording = recorderState.isRecording;
  const changedAudioModeRef = useRef(false);

  useEffect(() => {
    onRecordingChange?.(isRecording);
  }, [isRecording, onRecordingChange]);

  useEffect(() => {
    return () => {
      if (!changedAudioModeRef.current) return;
      changedAudioModeRef.current = false;
      restorePlaybackAudioMode();
    };
  }, []);

  const startRecording = async () => {
    try {
      setIsStarting(true);
      const permission = await requestRecordingPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Microphone access needed',
          Platform.OS === 'ios'
            ? 'Allow microphone access in Settings to attach a voice note to this verse.'
            : 'Allow microphone access to attach a voice note to this verse.'
        );
        return;
      }

      if (recitationPlaying) {
        pauseRecitation();
      }

      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
        interruptionMode: 'doNotMix',
      });
      changedAudioModeRef.current = true;

      await recorder.prepareToRecordAsync();
      recorder.record({ forDuration: MAX_RECORDING_SECONDS });
    } catch (err) {
      console.warn('Could not start voice note recording:', err);
      Alert.alert('Could not record', 'Something went wrong starting the microphone. Please try again.');
      changedAudioModeRef.current = false;
      await restorePlaybackAudioMode();
    } finally {
      setIsStarting(false);
    }
  };

  const stopRecording = async () => {
    try {
      await recorder.stop();
      const uri = recorder.uri;
      const durationMillis = recorder.getStatus().durationMillis || recorderState.durationMillis || 0;
      changedAudioModeRef.current = false;
      await restorePlaybackAudioMode();

      if (!uri || durationMillis < 400) {
        Alert.alert('Recording too short', 'Hold a little longer so your voice note can be saved.');
        return;
      }

      onChange({ uri, durationMillis });
    } catch (err) {
      console.warn('Could not stop voice note recording:', err);
      Alert.alert('Could not save recording', 'Please try recording again.');
      changedAudioModeRef.current = false;
      await restorePlaybackAudioMode();
    }
  };

  if (value && !isRecording) {
    return (
      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>Voice note</Text>
        <VoiceNotePlayer voiceNote={value} onRemove={() => onChange(null)} />
        <TouchableOpacity
          onPress={startRecording}
          style={[styles.secondaryBtn, { borderColor: theme.border }]}
          disabled={isStarting}
          accessibilityRole="button"
          accessibilityLabel="Replace voice note"
        >
          <Ionicons name="mic-outline" size={16} color={theme.textSecondary} />
          <Text style={[styles.secondaryBtnText, { color: theme.textSecondary }]}>Replace recording</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>Voice note</Text>
      <Text style={[styles.hint, { color: theme.textTertiary }]}>
        Speak a reflection and attach it to this verse. You can still write a note too.
      </Text>

      {isRecording ? (
        <View style={[styles.recordingCard, { backgroundColor: theme.noteMuted, borderColor: theme.noteAccent }]}>
          <View style={styles.recordingMeta}>
            <View style={[styles.liveDot, { backgroundColor: theme.destructive }]} />
            <Text style={[styles.recordingLabel, { color: theme.noteAccent }]}>Recording</Text>
            <Text style={[styles.recordingTime, { color: theme.textPrimary }]}>
              {formatDurationMs(recorderState.durationMillis || 0)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={stopRecording}
            style={[styles.primaryBtn, { backgroundColor: theme.destructive }]}
            accessibilityRole="button"
            accessibilityLabel="Stop recording"
            accessibilityState={{ busy: true }}
          >
            <Ionicons name="stop" size={18} color="#FFFFFF" />
            <Text style={styles.primaryBtnText}>Stop</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={startRecording}
          disabled={isStarting}
          style={[styles.primaryBtn, { backgroundColor: theme.noteAccent }]}
          accessibilityRole="button"
          accessibilityLabel="Record a voice note"
        >
          <Ionicons name="mic" size={18} color="#FFFFFF" />
          <Text style={styles.primaryBtnText}>{isStarting ? 'Starting…' : 'Record voice note'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    gap: 10,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  hint: {
    fontSize: 13,
    lineHeight: 18,
  },
  primaryBtn: {
    minHeight: 48,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryBtn: {
    minHeight: 44,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  secondaryBtnText: {
    fontSize: 13,
    fontWeight: '500',
  },
  recordingCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    gap: 12,
  },
  recordingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  recordingLabel: {
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  recordingTime: {
    fontSize: 16,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
});
