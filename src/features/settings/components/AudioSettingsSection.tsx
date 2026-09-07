import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ReadingPreferences, Reciter, TranslationLanguage, PlaybackMode } from '../../../types';
import { RECITERS, TRANSLATION_LANGUAGES, TranslationLanguageConfig } from '../../../data/surahs';
import { SETTINGS_LANGUAGES, PLAYBACK_SPEEDS } from '../constants';
import { styles } from '../styles/settings.styles';

interface AudioSettingsSectionProps {
  preferences: ReadingPreferences;
  currentLang: TranslationLanguage;
  currentLangConfig: TranslationLanguageConfig;
  reciter: Reciter;
  updatePreferences: (newPrefs: Partial<ReadingPreferences>) => void;
  setTranslationLanguage: (lang: TranslationLanguage) => void;
  setReciter: (r: Reciter) => void;
  setSpeed: (speed: number) => void;
  setPlaybackMode: (mode: PlaybackMode) => void;
  theme: any;
}

export function AudioSettingsSection({
  preferences,
  currentLang,
  currentLangConfig,
  reciter,
  updatePreferences,
  setTranslationLanguage,
  setReciter,
  setSpeed,
  setPlaybackMode,
  theme,
}: AudioSettingsSectionProps) {
  return (
    <>
      {/* SECTION: Translation & Audio */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textTertiary }]}>
          Translation & Audio
        </Text>
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          {/* Translation Language Selector */}
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.textPrimary, marginBottom: 4 }]}>
              Translation Audio Language
            </Text>
            <Text style={[styles.settingSubtext, { color: theme.textSecondary, marginBottom: 10 }]}>
              Choose language voice for verse-by-verse translation recitation
            </Text>
            <View style={styles.modeSettingsColumn}>
              {SETTINGS_LANGUAGES.map((langKey) => {
                const l = TRANSLATION_LANGUAGES[langKey];
                const isSelected = currentLang === langKey;
                return (
                  <TouchableOpacity
                    key={langKey}
                    onPress={() => {
                      updatePreferences({ translationLanguage: langKey });
                      setTranslationLanguage(langKey);
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
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Text style={{ fontSize: 16 }}>{l.flag}</Text>
                        <Text
                          style={[
                            styles.modeOptionLabel,
                            { color: isSelected ? theme.primary : theme.textPrimary },
                            isSelected && { fontWeight: '700' },
                          ]}
                        >
                          {l.name} {l.nativeName !== l.name ? `(${l.nativeName})` : ''}
                        </Text>
                      </View>
                      <Text style={[styles.modeOptionDesc, { color: theme.textSecondary }]}>
                        {l.voiceName} • {l.author}
                      </Text>
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

          {/* Recitation Loop Mode */}
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.textPrimary, marginBottom: 4 }]}>
              Recitation Sequence
            </Text>
            <Text style={[styles.settingSubtext, { color: theme.textSecondary, marginBottom: 10 }]}>
              Choose how verses and translations are recited
            </Text>
            <View style={styles.modeSettingsColumn}>
              {[
                {
                  key: 'both',
                  label: `Arabic + ${currentLangConfig.name} Translation`,
                  desc: `Arabic recitation followed by ${currentLangConfig.name} translation of each verse`,
                },
                {
                  key: 'arabic_only',
                  label: 'Arabic Recitation Only',
                  desc: 'Traditional Arabic recitation without translation audio',
                },
                {
                  key: 'translation_only',
                  label: `${currentLangConfig.name} Translation Only`,
                  desc: `Verse-by-verse ${currentLangConfig.name} translation audio by ${currentLangConfig.voiceName}`,
                },
              ].map((m) => {
                const isSelected = (preferences.playbackMode || 'both') === m.key;
                return (
                  <TouchableOpacity
                    key={m.key}
                    onPress={() => {
                      updatePreferences({ playbackMode: m.key as any });
                      setPlaybackMode(m.key as any);
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
                      <Text style={[styles.modeOptionDesc, { color: theme.textSecondary }]}>
                        {m.desc}
                      </Text>
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
        </View>
      </View>

      {/* SECTION: Recitation */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textTertiary }]}>
          Recitation
        </Text>
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
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
                    style={[
                      styles.reciterRow,
                      isSelected && { backgroundColor: theme.primaryMuted },
                    ]}
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
                    {isSelected && (
                      <Ionicons name="checkmark-circle" size={18} color={theme.primary} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

          {/* Default Playback Speed */}
          <View style={styles.settingItem}>
            <View style={styles.settingLabelGroup}>
              <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
                Recitation Speed
              </Text>
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
                        { color: active ? theme.onPrimary : theme.textSecondary },
                        active && { fontWeight: '600' },
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
    </>
  );
}
