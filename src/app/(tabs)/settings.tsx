import React from 'react';
import { View, Text, ScrollView, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAudio } from '../../context/AudioContext';
import { useStudyState } from '../../context/StudyContext';
import { useTheme } from '../../context/ThemeContext';
import { TRANSLATION_LANGUAGES } from '../../data/surahs';
import { TypographySection } from '../../features/settings/components/TypographySection';
import { AudioSettingsSection } from '../../features/settings/components/AudioSettingsSection';
import { HabitsSettingsSection } from '../../features/settings/components/HabitsSettingsSection';
import { DataStorageSection } from '../../features/settings/components/DataStorageSection';
import { AboutLegalSection } from '../../features/settings/components/AboutLegalSection';
import { styles } from '../../features/settings/styles/settings.styles';

export default function SettingsScreen() {
  const { theme } = useTheme();
  const {
    preferences,
    updatePreferences,
    clearHistory,
    dailyGoalAyahs,
    setDailyGoal,
    notificationPreferences,
    updateNotificationPreferences,
    requestNotificationPermission,
  } = useStudyState();
  const { setSpeed, setReciter, setPlaybackMode, setTranslationLanguage, reciter } = useAudio();

  const handleClearHistoryPrompt = () => {
    Alert.alert(
      'Clear Study History',
      'Are you sure you want to clear your recently visited study history? Your bookmarks and notes will remain safe.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear History', style: 'destructive', onPress: clearHistory },
      ]
    );
  };

  const handleToggleDailyReminder = async (enabled: boolean) => {
    if (enabled) {
      const granted = await requestNotificationPermission();
      if (!granted) {
        Alert.alert(
          'Notification Permission Required',
          'Please enable notifications in your device settings so Qurus can send you gentle daily reflection reminders.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
        return;
      }
      await updateNotificationPreferences({ dailyReminderEnabled: true });
    } else {
      await updateNotificationPreferences({ dailyReminderEnabled: false });
    }
  };

  const currentLang = preferences.translationLanguage || 'urdu';
  const currentLangConfig = TRANSLATION_LANGUAGES[currentLang] || TRANSLATION_LANGUAGES.urdu;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.screenTitle, { color: theme.textPrimary }]}>Settings</Text>
          <Text style={[styles.screenSubtitle, { color: theme.textSecondary }]}>
            Reading, audio, and study data
          </Text>
        </View>

        {/* 1. Typography */}
        <TypographySection
          preferences={preferences}
          currentLangConfig={currentLangConfig}
          updatePreferences={updatePreferences}
          theme={theme}
        />

        {/* 2. Audio & Recitation */}
        <AudioSettingsSection
          preferences={preferences}
          currentLang={currentLang}
          currentLangConfig={currentLangConfig}
          reciter={reciter}
          updatePreferences={updatePreferences}
          setTranslationLanguage={setTranslationLanguage}
          setReciter={setReciter}
          setSpeed={setSpeed}
          setPlaybackMode={setPlaybackMode}
          theme={theme}
        />

        {/* 3. Habits & Reminders */}
        <HabitsSettingsSection
          dailyGoalAyahs={dailyGoalAyahs}
          setDailyGoal={setDailyGoal}
          notificationPreferences={notificationPreferences}
          onToggleDailyReminder={handleToggleDailyReminder}
          updateNotificationPreferences={updateNotificationPreferences}
          theme={theme}
        />

        {/* 4. Data & Storage */}
        <DataStorageSection
          onClearHistoryPrompt={handleClearHistoryPrompt}
          theme={theme}
        />

        {/* 5. Support, About & Legal */}
        <AboutLegalSection theme={theme} />
      </ScrollView>
    </SafeAreaView>
  );
}
