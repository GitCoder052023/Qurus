import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { ReadingPreferences } from '../../../types';
import { TranslationLanguageConfig } from '../../../constants/languages';
import { FONT_SIZES_ARABIC, FONT_SIZES_URDU } from '../constants';
import { styles } from '../styles/settings.styles';

interface TypographySectionProps {
  preferences: ReadingPreferences;
  currentLangConfig: TranslationLanguageConfig;
  updatePreferences: (newPrefs: Partial<ReadingPreferences>) => void;
  theme: any;
}

export function TypographySection({
  preferences,
  currentLangConfig,
  updatePreferences,
  theme,
}: TypographySectionProps) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.textTertiary }]}>
        Reading
      </Text>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        {/* Arabic Font Size */}
        <View style={styles.settingItem}>
          <View style={styles.settingLabelGroup}>
            <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
              Arabic Script Size
            </Text>
            <Text style={[styles.settingValue, { color: theme.primary }]}>
              {preferences.arabicFontSize} pt
            </Text>
          </View>
          <View style={styles.pillGroup}>
            {FONT_SIZES_ARABIC.map((sz) => {
              const active = preferences.arabicFontSize === sz;
              return (
                <TouchableOpacity
                  key={sz}
                  onPress={() => updatePreferences({ arabicFontSize: sz })}
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
                    {sz}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

        {/* Translation Font Size */}
        <View style={styles.settingItem}>
          <View style={styles.settingLabelGroup}>
            <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
              Translation Text Size
            </Text>
            <Text style={[styles.settingValue, { color: theme.primary }]}>
              {preferences.urduFontSize} pt
            </Text>
          </View>
          <View style={styles.pillGroup}>
            {FONT_SIZES_URDU.map((sz) => {
              const active = preferences.urduFontSize === sz;
              return (
                <TouchableOpacity
                  key={sz}
                  onPress={() => updatePreferences({ urduFontSize: sz })}
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
                    {sz}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

        {/* Show Translation Toggle */}
        <View style={[styles.settingItem, styles.rowBetween]}>
          <View style={styles.settingTextGroup}>
            <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
              Show Translation
            </Text>
            <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
              {currentLangConfig.author} ({currentLangConfig.name})
            </Text>
          </View>
          <Switch
            value={preferences.showTranslation}
            onValueChange={(val) => updatePreferences({ showTranslation: val })}
            trackColor={{ false: theme.surfaceHighlight, true: theme.primary }}
          />
        </View>
      </View>
    </View>
  );
}
