import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { useStudyState } from '../../../context/StudyContext';
import { useAudio } from '../../../context/AudioContext';
import { PLAYBACK_MODE_OPTIONS, PLAYBACK_SPEEDS } from '../../../config/settings';
import { RECITERS } from '../../../config/reciters';
import { styles } from '../styles';

export function AudioSection() {
  const { theme } = useTheme();
  const { preferences, updatePreferences } = useStudyState();
  const { setSpeed, setReciter, setPlaybackMode, reciter } = useAudio();

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>AUDIO & RECITATION</Text>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        {/* Recitation Loop Mode */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: theme.textPrimary, marginBottom: 4 }]}>
            Recitation Sequence
          </Text>
          <Text style={[styles.settingSubtext, { color: theme.textSecondary, marginBottom: 10 }]}>
            Choose how verses and translations are recited
          </Text>
          <View style={styles.modeSettingsColumn}>
            {PLAYBACK_MODE_OPTIONS.map((m) => {
              const isSelected = (preferences.playbackMode || 'both') === m.key;
              return (
                <TouchableOpacity
                  key={m.key}
                  onPress={() => {
                    updatePreferences({ playbackMode: m.key });
                    setPlaybackMode(m.key);
                  }}
                  style={[
                    styles.modeOptionRow,
                    {
                      backgroundColor: isSelected ? theme.primaryMuted : theme.surface,
                      borderColor: isSelected ? theme.primary : theme.border,
                    },
                  ]}
                >
                  <View style={styles.modeOptionTextGroup}>
                    <Text
                      style={[
                        styles.modeOptionLabel,
                        { color: isSelected ? theme.primary : theme.textPrimary },
                        isSelected && { fontWeight: '700' },
                      ]}
                    >
                      {m.label}
                    </Text>
                    <Text style={[styles.modeOptionDesc, { color: theme.textSecondary }]}>{m.desc}</Text>
                  </View>
                  <Ionicons
                    name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                    size={20}
                    color={isSelected ? theme.primary : theme.textTertiary}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

        {/* Reciter Picker */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: theme.textPrimary, marginBottom: 8 }]}>
            Arabic Reciter
          </Text>
          <View style={styles.reciterList}>
            {RECITERS.map((r) => {
              const isSelected = r.id === reciter.id;
              return (
                <TouchableOpacity
                  key={r.id}
                  onPress={() => setReciter(r)}
                  style={[styles.reciterRow, isSelected && { backgroundColor: theme.primaryMuted }]}
                >
                  <View style={styles.reciterTextCol}>
                    <Text
                      style={[
                        styles.reciterNameText,
                        { color: isSelected ? theme.primary : theme.textPrimary },
                        isSelected && { fontWeight: '700' },
                      ]}
                    >
                      {r.name}
                    </Text>
                    <Text style={[styles.reciterArabicText, { color: theme.textTertiary }]}>
                      {r.arabicName}
                    </Text>
                  </View>
                  {isSelected && <Ionicons name="checkmark-circle" size={18} color={theme.primary} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

        {/* Default Playback Speed */}
        <View style={styles.settingItem}>
          <View style={styles.settingLabelGroup}>
            <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>Recitation Speed</Text>
            <Text style={[styles.settingValue, { color: theme.primary }]}>
              {preferences.playbackSpeed}x
            </Text>
          </View>
          <View style={styles.pillGroup}>
            {PLAYBACK_SPEEDS.map((s) => {
              const active = preferences.playbackSpeed === s;
              return (
                <TouchableOpacity
                  key={s}
                  onPress={() => setSpeed(s)}
                  style={[
                    styles.sizePill,
                    {
                      backgroundColor: active ? theme.primary : theme.surface,
                      borderColor: active ? theme.primary : theme.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.sizePillText,
                      { color: active ? '#FFFFFF' : theme.textSecondary },
                      active && { fontWeight: '700' },
                    ]}
                  >
                    {s}x
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

        {/* Auto-scroll */}
        <View style={[styles.settingItem, styles.rowBetween]}>
          <View style={styles.settingTextGroup}>
            <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
              Auto-Scroll During Recitation
            </Text>
            <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
              Keep active reciting ayah centered in view
            </Text>
          </View>
          <Switch
            value={preferences.autoScroll}
            onValueChange={(val) => updatePreferences({ autoScroll: val })}
            trackColor={{ false: theme.surfaceHighlight, true: theme.primary }}
          />
        </View>
      </View>
    </View>
  );
}
