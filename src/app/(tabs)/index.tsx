import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useStudyState } from '../../context/StudyContext';
import { useAudio } from '../../context/AudioContext';
import { SURAHS } from '../../data/surahs';

export default function HomeScreen() {
  const { theme } = useTheme();
  const { lastStudied, history, bookmarks, notes, highlights } = useStudyState();
  const { playAyah, isPlaying, currentSurahNumber, currentAyahNumber, pause } = useAudio();
  const router = useRouter();

  // Find metadata for last studied Surah
  const lastSurah = lastStudied ? SURAHS.find((s) => s.number === lastStudied.surahNumber) : null;
  const isLastStudiedPlaying =
    isPlaying &&
    lastStudied &&
    currentSurahNumber === lastStudied.surahNumber &&
    currentAyahNumber === lastStudied.ayahNumber;

  const handleContinueStudying = () => {
    if (lastStudied) {
      router.push(`/reader/${lastStudied.surahNumber}?ayah=${lastStudied.ayahNumber}`);
    } else {
      // Default to Surah 1 Al-Fatihah
      router.push('/reader/1?ayah=1');
    }
  };

  const handlePlayLastStudied = (e: any) => {
    e.stopPropagation();
    if (isLastStudiedPlaying) {
      pause();
    } else if (lastStudied) {
      playAyah(lastStudied.surahNumber, lastStudied.ayahNumber);
    } else {
      playAyah(1, 1);
    }
  };

  const handleJumpToHistory = (surahNum: number, ayahNum: number) => {
    router.push(`/reader/${surahNum}?ayah=${ayahNum}`);
  };

  const bookmarkCount = bookmarks.length;
  const noteCount = Object.keys(notes).length;
  const highlightCount = Object.keys(highlights).length;

  const progressPercent =
    lastSurah && lastStudied ? Math.round((lastStudied.ayahNumber / lastSurah.numberOfAyahs) * 100) : 0;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* App Bar / Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.brandTitle, { color: theme.primary }]}>Qurus</Text>
            <Text style={[styles.brandSubtitle, { color: theme.textSecondary }]}>
              Personal Quran Study & Listening
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/settings')}
            style={[styles.settingsBtn, { backgroundColor: theme.surface }]}
          >
            <Ionicons name="settings-outline" size={20} color={theme.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* HERO SECTION: Continue Studying */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeading, { color: theme.textSecondary }]}>
            CONTINUE STUDYING
          </Text>

          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleContinueStudying}
            style={[
              styles.heroCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
                shadowColor: '#000',
              },
            ]}
          >
            <View style={styles.heroTopRow}>
              <View style={styles.heroSurahInfo}>
                <Text style={[styles.heroArabicName, { color: theme.arabicText }]}>
                  {lastSurah ? lastSurah.name : 'سُورَةُ ٱلْفَاتِحَةِ'}
                </Text>
                <Text style={[styles.heroEnglishName, { color: theme.textPrimary }]}>
                  {lastSurah ? lastSurah.englishName : 'Al-Faatiha'}
                </Text>
                <Text style={[styles.heroAyahNumber, { color: theme.primary }]}>
                  Ayah {lastStudied ? lastStudied.ayahNumber : 1}
                  {lastSurah ? ` of ${lastSurah.numberOfAyahs}` : ' of 7'}
                </Text>
              </View>

              {/* Instant Recitation Play Button */}
              <TouchableOpacity
                onPress={handlePlayLastStudied}
                style={[styles.heroPlayBtn, { backgroundColor: theme.primary }]}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={isLastStudiedPlaying ? 'pause' : 'play'}
                  size={24}
                  color="#FFFFFF"
                  style={!isLastStudiedPlaying ? { marginLeft: 2 } : undefined}
                />
              </TouchableOpacity>
            </View>

            {/* Progress indicator */}
            <View style={styles.heroProgressSection}>
              <View style={[styles.heroProgressTrack, { backgroundColor: theme.surfaceHighlight }]}>
                <View
                  style={[
                    styles.heroProgressBar,
                    {
                      width: `${progressPercent}%`,
                      backgroundColor: theme.primary,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.heroProgressText, { color: theme.textTertiary }]}>
                {progressPercent}% completed in Surah
              </Text>
            </View>

            {/* Tap Action Footer */}
            <View style={[styles.heroFooter, { borderTopColor: theme.borderSubtle }]}>
              <Text style={[styles.heroFooterText, { color: theme.primary }]}>
                Resume Reading & Notes
              </Text>
              <Ionicons name="arrow-forward" size={16} color={theme.primary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* RECENTLY STUDIED */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeading, { color: theme.textSecondary }]}>
            RECENTLY STUDIED
          </Text>

          {history.length === 0 ? (
            <View style={[styles.emptyCard, { backgroundColor: theme.card, borderColor: theme.borderSubtle }]}>
              <Ionicons name="time-outline" size={24} color={theme.textTertiary} />
              <Text style={[styles.emptyCardText, { color: theme.textSecondary }]}>
                Start reading or listening to begin building your study history.
              </Text>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {history.slice(0, 8).map((item) => {
                const s = SURAHS.find((meta) => meta.number === item.surahNumber);
                if (!s) return null;
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleJumpToHistory(item.surahNumber, item.ayahNumber)}
                    style={[
                      styles.historyCard,
                      {
                        backgroundColor: theme.card,
                        borderColor: theme.border,
                      },
                    ]}
                  >
                    <Text style={[styles.historyArabic, { color: theme.arabicText }]}>{s.name}</Text>
                    <Text style={[styles.historySurah, { color: theme.textPrimary }]}>{s.englishName}</Text>
                    <View style={[styles.historyAyahTag, { backgroundColor: theme.primaryMuted }]}>
                      <Text style={[styles.historyAyahText, { color: theme.primary }]}>
                        Ayah {item.ayahNumber}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>

        {/* QUICK ACCESS */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeading, { color: theme.textSecondary }]}>
            STUDY TOOLS & SHORTCUTS
          </Text>

          <View style={styles.shortcutsGrid}>
            {/* Bookmarks */}
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/bookmarks')}
              style={[styles.shortcutCard, { backgroundColor: theme.card, borderColor: theme.border }]}
            >
              <View style={[styles.shortcutIconWrap, { backgroundColor: '#F59E0B18' }]}>
                <Ionicons name="bookmark" size={22} color={theme.bookmarkIcon} />
              </View>
              <View style={styles.shortcutContent}>
                <Text style={[styles.shortcutTitle, { color: theme.textPrimary }]}>Bookmarks</Text>
                <Text style={[styles.shortcutSubtitle, { color: theme.textSecondary }]}>
                  {bookmarkCount} saved {bookmarkCount === 1 ? 'verse' : 'verses'}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={theme.textTertiary} />
            </TouchableOpacity>

            {/* Notes */}
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/notes')}
              style={[styles.shortcutCard, { backgroundColor: theme.card, borderColor: theme.border }]}
            >
              <View style={[styles.shortcutIconWrap, { backgroundColor: theme.primaryMuted }]}>
                <Ionicons name="journal" size={22} color={theme.primary} />
              </View>
              <View style={styles.shortcutContent}>
                <Text style={[styles.shortcutTitle, { color: theme.textPrimary }]}>Notebook</Text>
                <Text style={[styles.shortcutSubtitle, { color: theme.textSecondary }]}>
                  {noteCount} reflection {noteCount === 1 ? 'entry' : 'entries'}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={theme.textTertiary} />
            </TouchableOpacity>

            {/* Quran Index */}
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/quran')}
              style={[styles.shortcutCard, { backgroundColor: theme.card, borderColor: theme.border }]}
            >
              <View style={[styles.shortcutIconWrap, { backgroundColor: theme.surfaceHighlight }]}>
                <Ionicons name="book" size={22} color={theme.textPrimary} />
              </View>
              <View style={styles.shortcutContent}>
                <Text style={[styles.shortcutTitle, { color: theme.textPrimary }]}>Complete Quran</Text>
                <Text style={[styles.shortcutSubtitle, { color: theme.textSecondary }]}>
                  114 Surahs • 6,236 Ayahs
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={theme.textTertiary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Study Principle Reminder */}
        <View style={[styles.reflectionPrompt, { backgroundColor: theme.surface, borderColor: theme.borderSubtle }]}>
          <Text style={[styles.reflectionTitle, { color: theme.textPrimary }]}>
            Study with Contemplation
          </Text>
          <Text style={[styles.reflectionText, { color: theme.textSecondary }]}>
            “Do they not then reflect upon the Quran, or are there locks upon their hearts?” (47:24)
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
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: 28,
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 2,
  },
  heroCard: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 20,
    elevation: 3,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroSurahInfo: {
    flex: 1,
  },
  heroArabicName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  heroEnglishName: {
    fontSize: 18,
    fontWeight: '700',
  },
  heroAyahNumber: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  heroPlayBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  heroProgressSection: {
    marginBottom: 16,
  },
  heroProgressTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  heroProgressBar: {
    height: '100%',
    borderRadius: 3,
  },
  heroProgressText: {
    fontSize: 11,
    fontWeight: '500',
  },
  heroFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 12,
  },
  heroFooterText: {
    fontSize: 14,
    fontWeight: '700',
  },
  horizontalScroll: {
    marginLeft: -18,
    paddingLeft: 18,
  },
  historyCard: {
    width: 140,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginRight: 12,
  },
  historyArabic: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'right',
    marginBottom: 4,
  },
  historySurah: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  historyAyahTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  historyAyahText: {
    fontSize: 11,
    fontWeight: '700',
  },
  emptyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  emptyCardText: {
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  shortcutsGrid: {
    gap: 12,
  },
  shortcutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
  },
  shortcutIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  shortcutContent: {
    flex: 1,
  },
  shortcutTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  shortcutSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  reflectionPrompt: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    marginTop: 10,
    alignItems: 'center',
  },
  reflectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  reflectionText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});
