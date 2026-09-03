import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { useStudyState } from '../../../context/StudyContext';
import { ARABIC_FONT_SIZES, URDU_FONT_SIZES } from '../../../config/settings';
import { styles } from '../styles';

export function TypographySection() {
  const { theme } = useTheme();
  const { preferences, updatePreferences } = useStudyState();

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>READING TYPOGRAPHY</Text>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        {/* Arabic Font Size */}
        <View style={styles.settingItem}>
          <View style={styles.settingLabelGroup}>
            <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>Arabic Script Size</Text>
            <Text style={[styles.settingValue, { color: theme.primary }]}>
              {preferences.arabicFontSize} pt
            </Text>
          </View>
          <View style={styles.pillGroup}>
            {ARABIC_FONT_SIZES.map((sz) => {
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
                      { color: active ? '#FFFFFF' : theme.textSecondary },
                      active && { fontWeight: '700' },
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

        {/* Urdu Font Size */}
        <View style={styles.settingItem}>
          <View style={styles.settingLabelGroup}>
            <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
              Urdu Translation Size
            </Text>
            <Text style={[styles.settingValue, { color: theme.primary }]}>
              {preferences.urduFontSize} pt
            </Text>
          </View>
          <View style={styles.pillGroup}>
            {URDU_FONT_SIZES.map((sz) => {
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
                      { color: active ? '#FFFFFF' : theme.textSecondary },
                      active && { fontWeight: '700' },
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
              Show Urdu Translation
            </Text>
            <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
              Fateh Muhammad Jalandhry
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
