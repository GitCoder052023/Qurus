import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useStudyState } from '../../context/StudyContext';
import { useAudio } from '../../context/AudioContext';
import { RECITERS } from '../../data/surahs';
import { ThemeMode } from '../../types';

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, themeMode, setThemeMode } = useTheme();
  const { preferences, updatePreferences, clearHistory, exportBackup } = useStudyState();
  const { setSpeed, setReciter, setPlaybackMode, reciter } = useAudio();

  const handleThemeSelect = (mode: ThemeMode) => {
    setThemeMode(mode);
    updatePreferences({ theme: mode });
  };

  const handleExportBackup = async () => {
    try {
      const dataStr = exportBackup();
      await Share.share({
        title: 'Qurus Study Backup',
        message: dataStr,
      });
    } catch (e) {
      console.warn('Backup error:', e);
    }
  };

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

  const fontSizesArabic = [22, 26, 30, 34];
  const fontSizesUrdu = [13, 15, 17, 19];
  const speeds = [0.75, 1.0, 1.25, 1.5];

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

        {/* SECTION: Appearance & Theme */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>APPEARANCE</Text>
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.themeRow}>
              {[
                { key: 'light', label: 'Ivory', icon: 'sunny-outline', bg: '#FAF8F5' },
                { key: 'dark', label: 'Dark', icon: 'moon-outline', bg: '#0D1117' },
                { key: 'sepia', label: 'Sepia', icon: 'book-outline', bg: '#F4ECE1' },
                { key: 'system', label: 'Auto', icon: 'phone-portrait-outline', bg: '#88888820' },
              ].map((t) => {
                const isSelected = themeMode === t.key;
                return (
                  <TouchableOpacity
                    key={t.key}
                    onPress={() => handleThemeSelect(t.key as ThemeMode)}
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
                      name={t.icon as any}
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

        {/* SECTION: Typography */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            READING TYPOGRAPHY
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

        {/* SECTION: Audio & Recitation */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            AUDIO & RECITATION
          </Text>
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
                {[
                  {
                    key: 'both',
                    label: 'Arabic + Urdu Translation',
                    desc: 'Arabic recitation followed by Urdu translation of each verse',
                  },
                  {
                    key: 'arabic_only',
                    label: 'Arabic Recitation Only',
                    desc: 'Traditional Arabic recitation without translation audio',
                  },
                  {
                    key: 'translation_only',
                    label: 'Urdu Translation Only',
                    desc: 'Verse-by-verse Urdu translation audio by Shamshad Ali Khan',
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

        {/* SECTION: Personal Study Data */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            STUDY DATA & BACKUP
          </Text>
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <TouchableOpacity
              onPress={handleExportBackup}
              style={[styles.settingItem, styles.rowBetween]}
            >
              <View style={styles.settingTextGroup}>
                <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
                  Backup Study Notebook
                </Text>
                <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
                  Export notes and bookmarks as a private JSON file
                </Text>
              </View>
              <Ionicons name="share-outline" size={20} color={theme.primary} />
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

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
              <Ionicons name="sparkles-outline" size={19} color={theme.primary} />
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

            <TouchableOpacity
              onPress={handleClearHistoryPrompt}
              style={[styles.settingItem, styles.rowBetween]}
            >
              <View style={styles.settingTextGroup}>
                <Text style={[styles.settingLabel, { color: '#EF4444' }]}>
                  Clear Recently Studied History
                </Text>
                <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
                  Reset recent reading history without deleting bookmarks or notes
                </Text>
              </View>
              <Ionicons name="trash-outline" size={18} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info & Integrity Acknowledgments */}
        <View style={styles.appInfoSection}>
          <Text style={[styles.appInfoTitle, { color: theme.textPrimary }]}>Qurus v1.0.0</Text>
          <Text style={[styles.appInfoDesc, { color: theme.textSecondary }]}>
            Dedicated to quiet personal Quranic reflection & continuous listening.
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
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  screenSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
  },
  themeRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  themeBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 14,
    gap: 6,
  },
  themeBtnText: {
    fontSize: 12,
    fontWeight: '600',
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
