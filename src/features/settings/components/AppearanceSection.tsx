import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { useStudyState } from '../../../context/StudyContext';
import { THEME_OPTIONS } from '../../../config/settings';
import { ThemeMode } from '../../../types';
import { styles } from '../styles';

export function AppearanceSection() {
  const { theme, themeMode, setThemeMode } = useTheme();
  const { updatePreferences } = useStudyState();

  const handleThemeSelect = (mode: ThemeMode) => {
    setThemeMode(mode);
    updatePreferences({ theme: mode });
  };

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>APPEARANCE</Text>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={styles.themeRow}>
          {THEME_OPTIONS.map((t) => {
            const isSelected = themeMode === t.key;
            return (
              <TouchableOpacity
                key={t.key}
                onPress={() => handleThemeSelect(t.key)}
                style={[
                  styles.themeBtn,
                  {
                    backgroundColor: t.bg,
                    borderColor: isSelected ? theme.primary : theme.border,
                    borderWidth: isSelected ? 2 : 1,
                  },
                ]}
              >
                <Ionicons
                  name={t.icon}
                  size={20}
                  color={isSelected ? theme.primary : theme.textPrimary}
                />
                <Text
                  style={[
                    styles.themeBtnText,
                    { color: isSelected ? theme.primary : theme.textPrimary },
                    isSelected && { fontWeight: '700' },
                  ]}
                >
                  {t.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}
