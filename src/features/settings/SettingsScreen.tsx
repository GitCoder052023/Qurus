import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { AppearanceSection } from './components/AppearanceSection';
import { TypographySection } from './components/TypographySection';
import { AudioSection } from './components/AudioSection';
import { StudyDataSection } from './components/StudyDataSection';
import { AppInfoSection } from './components/AppInfoSection';
import { styles } from './styles';

export function SettingsScreen() {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.screenTitle, { color: theme.textPrimary }]}>Settings</Text>
          <Text style={[styles.screenSubtitle, { color: theme.textSecondary }]}>
            Customize your reading, audio, and study experience
          </Text>
        </View>

        <AppearanceSection />
        <TypographySection />
        <AudioSection />
        <StudyDataSection />
        <AppInfoSection />
      </ScrollView>
    </SafeAreaView>
  );
}
