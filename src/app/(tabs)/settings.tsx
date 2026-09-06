import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAudio } from '../../context/AudioContext';
import { useStudyState } from '../../context/StudyContext';
import { useTheme } from '../../context/ThemeContext';
import { RECITERS, TRANSLATION_LANGUAGES } from '../../data/surahs';
import { TranslationLanguage } from '../../types';

const SETTINGS_LANGUAGES: TranslationLanguage[] = [
  'urdu',
  'english',
  'bengali',
  'turkish',
  'french',
];

export default function SettingsScreen() {
  const router = useRouter();
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

  const fontSizesArabic = [22, 26, 30, 34];
  const fontSizesUrdu = [13, 15, 17, 19];
  const speeds = [0.75, 1.0, 1.25, 1.5];
  const dailyGoalOptions = [3, 5, 10, 15];
  const reminderTimeOptions = [
    { label: 'Morning 7:00 AM', hour: 7, minute: 0 },
    { label: 'Midday 1:30 PM', hour: 13, minute: 30 },
    { label: 'Evening 8:30 PM', hour: 20, minute: 30 },
    { label: 'Night 10:00 PM', hour: 22, minute: 0 },
  ];

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

        {/* SECTION: Typography */}
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
                {fontSizesArabic.map((sz) => {
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
                {fontSizesUrdu.map((sz) => {
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
                {speeds.map((s) => {
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

        {/* SECTION: Reminders */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textTertiary }]}>
            Reminders
          </Text>
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            {/* Daily Tadabbur Goal */}
            <View style={styles.settingItem}>
              <View style={styles.settingLabelGroup}>
                <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
                  Daily Tadabbur Goal
                </Text>
                <Text style={[styles.settingValue, { color: theme.primary }]}>
                  {dailyGoalAyahs} verses/day
                </Text>
              </View>
              <Text style={[styles.settingSubtext, { color: theme.textSecondary, marginBottom: 12 }]}>
                Mindful daily verses to explore and retain with reflection
              </Text>
              <View style={styles.pillGroup}>
                {dailyGoalOptions.map((goal) => {
                  const active = dailyGoalAyahs === goal;
                  return (
                    <TouchableOpacity
                      key={goal}
                      onPress={() => setDailyGoal(goal)}
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
                        {goal}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

            {/* Daily Reminder Toggle */}
            <View style={[styles.settingItem, styles.rowBetween]}>
              <View style={styles.settingTextGroup}>
                <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
                  Daily Reflection Reminder
                </Text>
                <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
                  Peaceful daily prompt to step back and reflect
                </Text>
              </View>
              <Switch
                value={notificationPreferences.dailyReminderEnabled}
                onValueChange={handleToggleDailyReminder}
                trackColor={{ false: theme.surfaceHighlight, true: theme.primary }}
              />
            </View>

            {notificationPreferences.dailyReminderEnabled && (
              <>
                <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

                {/* Reminder Timing Selector */}
                <View style={styles.settingItem}>
                  <Text style={[styles.settingLabel, { color: theme.textPrimary, marginBottom: 10 }]}>
                    Preferred Reminder Time
                  </Text>
                  <View style={styles.pillGroup}>
                    {reminderTimeOptions.map((t) => {
                      const active =
                        notificationPreferences.reminderHour === t.hour &&
                        notificationPreferences.reminderMinute === t.minute;
                      return (
                        <TouchableOpacity
                          key={t.label}
                          onPress={() =>
                            updateNotificationPreferences({
                              reminderHour: t.hour,
                              reminderMinute: t.minute,
                            })
                          }
                          style={[
                            styles.sizePill,
                            {
                              paddingHorizontal: 12,
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
                            {t.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

                {/* Streak Saver Toggle */}
                <View style={[styles.settingItem, styles.rowBetween]}>
                  <View style={styles.settingTextGroup}>
                    <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
                      Streak-Saver Nudge
                    </Text>
                    <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
                      Gentle evening reminder if you haven’t yet studied today
                    </Text>
                  </View>
                  <Switch
                    value={notificationPreferences.streakSaverEnabled}
                    onValueChange={(val) =>
                      updateNotificationPreferences({ streakSaverEnabled: val })
                    }
                    trackColor={{ false: theme.surfaceHighlight, true: theme.primary }}
                  />
                </View>
              </>
            )}
          </View>
        </View>

        {/* SECTION: Support */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textTertiary }]}>
            Support
          </Text>
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push('/feedback' as any)}
              style={[styles.settingItem, styles.rowBetween]}
            >
              <View style={styles.settingTextGroup}>
                <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
                  Contact Us & Feedback
                </Text>
                <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
                  Report a bug, suggest features, or send general feedback
                </Text>
              </View>
              <Ionicons name="chatbubble-ellipses-outline" size={18} color={theme.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* SECTION: Personal Study Data */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textTertiary }]}>
            Study data
          </Text>
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <TouchableOpacity
              onPress={() => router.push('/onboarding')}
              style={[styles.settingItem, styles.rowBetween]}
            >
              <View style={styles.settingTextGroup}>
                <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
                  Replay App Tour
                </Text>
                <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
                  View the welcome guide and feature walkthrough again
                </Text>
              </View>
              <Ionicons name="leaf-outline" size={19} color={theme.primary} />
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

            <TouchableOpacity
              onPress={handleClearHistoryPrompt}
              style={[styles.settingItem, styles.rowBetween]}
            >
              <View style={styles.settingTextGroup}>
                <Text style={[styles.settingLabel, { color: theme.destructive }]}>
                  Clear recently studied history
                </Text>
                <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
                  Reset recent reading history without deleting bookmarks or notes
                </Text>
              </View>
              <Ionicons name="trash-outline" size={18} color={theme.destructive} />
            </TouchableOpacity>
          </View>
        </View>

        {/* SECTION: About Qurus */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textTertiary }]}>
            About Qurus
          </Text>
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => router.push('/story')}
            style={[
              styles.storyCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            <View style={styles.storyCardTopRow}>
              <View style={[styles.storyCardIconBox, { backgroundColor: theme.primaryMuted }]}>
                <Ionicons name="leaf-outline" size={18} color={theme.primary} />
              </View>
              <View style={[styles.storyCardTag, { backgroundColor: theme.chipBg }]}>
                <Text style={[styles.storyCardTagText, { color: theme.primary }]}>
                  Hamdan Khubaib
                </Text>
              </View>
            </View>

            <Text style={[styles.storyCardTitle, { color: theme.textPrimary }]}>
              The story behind Qurus
            </Text>
            <Text style={[styles.storyCardSubtitle, { color: theme.textSecondary }]}>
              Why I built a verse-by-verse exploration space in the palm of your hand—from feeling overwhelmed by traditional expectations to seeking truth with an open mind.
            </Text>

            <View style={[styles.storyCardFooter, { borderTopColor: theme.borderSubtle }]}>
              <Text style={[styles.storyCardActionText, { color: theme.primary }]}>
                Read founder’s note
              </Text>
              <Ionicons name="arrow-forward" size={14} color={theme.primary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* SECTION: Legal */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textTertiary }]}>
            Legal
          </Text>
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push('/terms' as any)}
              style={[styles.settingItem, styles.rowBetween]}
            >
              <View style={styles.settingTextGroup}>
                <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
                  Terms of Use
                </Text>
                <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
                  Acceptable use, open-source MIT license & disclaimers
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.textTertiary} />
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push('/privacy' as any)}
              style={[styles.settingItem, styles.rowBetween]}
            >
              <View style={styles.settingTextGroup}>
                <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
                  Privacy Policy
                </Text>
                <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
                  On-device private data, no tracking & EveryAyah CDN audio
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.textTertiary} />
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push('/legal-consent' as any)}
              style={[styles.settingItem, styles.rowBetween]}
            >
              <View style={styles.settingTextGroup}>
                <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
                  Terms & Consent Review
                </Text>
                <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
                  Review your first-launch legal agreement
                </Text>
              </View>
              <Ionicons name="shield-checkmark-outline" size={18} color={theme.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info & Integrity Acknowledgments */}
        <View style={styles.appInfoSection}>
          <Text style={[styles.appInfoTitle, { color: theme.textPrimary }]}>Qurus v2.3.0</Text>
          <Text style={[styles.appInfoDesc, { color: theme.textSecondary }]}>
            Dedicated to open, honest reflection & continuous listening.
          </Text>
          <Text style={[styles.appInfoSource, { color: theme.textTertiary }]}>
            Arabic Text: Verified Uthmani Hafs • Translation: Fateh Muhammad Jalandhry • Audio: EveryAyah CDN
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: -0.4,
  },
  screenSubtitle: {
    fontSize: 15,
    marginTop: 4,
    lineHeight: 21,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
  },
  settingItem: {
    paddingVertical: 8,
  },
  settingLabelGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  settingValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  settingTextGroup: {
    flex: 1,
    marginRight: 12,
  },
  settingSubtext: {
    fontSize: 12,
    marginTop: 2,
  },
  pillGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  sizePill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  sizePillText: {
    fontSize: 13,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  reciterList: {
    gap: 6,
  },
  reciterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  reciterTextCol: {
    flex: 1,
  },
  reciterNameText: {
    fontSize: 13,
  },
  reciterArabicText: {
    fontSize: 11,
    marginTop: 1,
  },
  modeSettingsColumn: {
    gap: 8,
    marginBottom: 6,
  },
  modeOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  modeOptionTextGroup: {
    flex: 1,
    marginRight: 10,
  },
  modeOptionLabel: {
    fontSize: 13,
    marginBottom: 2,
  },
  modeOptionDesc: {
    fontSize: 11,
    lineHeight: 15,
  },
  storyCard: {
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 18,
  },
  storyCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  storyCardIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyCardTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  storyCardTagText: {
    fontSize: 11,
    fontWeight: '500',
  },
  storyCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  storyCardSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14,
  },
  storyCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  storyCardActionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  appInfoSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  appInfoTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  appInfoDesc: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 6,
  },
  appInfoSource: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
  },
});
