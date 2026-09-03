import React, { useMemo } from 'react';
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

// Curated peaceful verses for daily contemplation
const CONTEMPLATIVE_VERSES = [
  {
    surahNumber: 13,
    ayahNumber: 28,
    surahName: "Ar-Ra'd",
    arabicText: 'أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ',
    urduText: 'سنو کہ خدا کے ذکر سے ہی دلوں کو تسلی اور سکون حاصل ہوتا ہے',
    themeNote: 'Peace of Heart & Tranquility',
  },
  {
    surahNumber: 94,
    ayahNumber: 5,
    surahName: 'Ash-Sharh',
    arabicText: 'فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا',
    urduText: 'سو بے شک مشکل کے ساتھ آسانی ہے',
    themeNote: 'Hope & Relief in Trial',
  },
  {
    surahNumber: 2,
    ayahNumber: 152,
    surahName: 'Al-Baqarah',
    arabicText: 'فَٱذْكُرُونِىٓ أَذْكُرْكُمْ وَٱشْكُرُوا۟ لِى وَلَا تَكْفُرُونِ',
    urduText: 'سو مجھے یاد کرو، میں تمہیں یاد رکھوں گا، اور میرا شکر ادا کرو اور ناشکری نہ کرو',
    themeNote: 'Gratitude & Divine Presence',
  },
  {
    surahNumber: 93,
    ayahNumber: 7,
    surahName: 'Ad-Duhaa',
    arabicText: 'وَوَجَدَكَ ضَآلًّا فَهَدَىٰ',
    urduText: 'اور اس نے آپ کو راستہ تلاش کرتے پایا تو راہ دکھا دی',
    themeNote: 'Guidance & Divine Grace',
  },
  {
    surahNumber: 39,
    ayahNumber: 53,
    surahName: 'Az-Zumar',
    arabicText: 'لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ ۚ إِنَّ ٱللَّهَ يَغْفِرُ ٱلذُّنُوبَ جَمِيعًا',
    urduText: 'خدا کی رحمت سے ناامید نہ ہو، خدا تو سب گناہوں کو بخش دیتا ہے',
    themeNote: 'Boundless Mercy & Forgiveness',
  },
];

export default function HomeScreen() {
  const { theme } = useTheme();
  const { lastStudied, history, bookmarks, notes } = useStudyState();
  const { playAyah, isPlaying, currentSurahNumber, currentAyahNumber, pause } = useAudio();
  const router = useRouter();

  // Islamic time-of-day greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 7) {
      return {
        time: 'Fajr & Dawn',
        title: 'Assalamu Alaikum',
        subtitle: 'Start your morning in Divine peace and light',
        icon: 'sunny-outline',
      };
    } else if (hour >= 7 && hour < 12) {
      return {
        time: 'Morning Solace',
        title: 'Assalamu Alaikum',
        subtitle: 'May your day be filled with tranquility and barakah',
        icon: 'sunny',
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        time: 'Midday Remembrance',
        title: 'Assalamu Alaikum',
        subtitle: 'Pause your day to reflect on the words of Allah',
        icon: 'time-outline',
      };
    } else if (hour >= 17 && hour < 20) {
      return {
        time: 'Maghrib Serenity',
        title: 'Assalamu Alaikum',
        subtitle: 'A peaceful evening of gratitude and quiet reflection',
        icon: 'partly-sunny-outline',
      };
    } else {
      return {
        time: 'Night Tranquility',
        title: 'Assalamu Alaikum',
        subtitle: 'Rest your heart and mind with peaceful recitation',
        icon: 'moon-outline',
      };
    }
  }, []);

  // Daily contemplative verse
  const dailyVerse = useMemo(() => {
    const now = new Date();
    const dayOfYear = Math.floor(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
    );
    return CONTEMPLATIVE_VERSES[dayOfYear % CONTEMPLATIVE_VERSES.length];
  }, []);

  // Last studied Surah info
  const lastSurah = lastStudied ? SURAHS.find((s) => s.number === lastStudied.surahNumber) : null;
  const isLastStudiedPlaying =
    isPlaying &&
    lastStudied &&
    currentSurahNumber === lastStudied.surahNumber &&
    currentAyahNumber === lastStudied.ayahNumber;

  const progressPercent =
    lastSurah && lastStudied
      ? Math.round((lastStudied.ayahNumber / lastSurah.numberOfAyahs) * 100)
      : 0;

  const handleContinueStudying = () => {
    if (lastStudied) {
      router.push({
        pathname: '/reader/[surah]',
        params: { surah: String(lastStudied.surahNumber), ayah: String(lastStudied.ayahNumber) },
      });
    } else {
      router.push({
        pathname: '/reader/[surah]',
        params: { surah: '1', ayah: '1' },
      });
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

  const handlePlayDailyVerse = () => {
    playAyah(dailyVerse.surahNumber, dailyVerse.ayahNumber);
  };

  const handleOpenDailyVerse = () => {
    router.push({
      pathname: '/reader/[surah]',
      params: { surah: String(dailyVerse.surahNumber), ayah: String(dailyVerse.ayahNumber) },
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Serene Spiritual Header */}
        <View style={styles.header}>
          <View style={styles.headerTextGroup}>
            <View style={styles.timePill}>
              <Ionicons name={greeting.icon as any} size={13} color={theme.primary} />
              <Text style={[styles.timePillText, { color: theme.primary }]}>{greeting.time}</Text>
            </View>
            <Text style={[styles.greetingTitle, { color: theme.textPrimary }]}>
              {greeting.title}
            </Text>
            <Text style={[styles.greetingSubtitle, { color: theme.textSecondary }]}>
              {greeting.subtitle}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push('/(tabs)/settings')}
            style={[styles.settingsBtn, { backgroundColor: theme.chipBg }]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="settings-outline" size={20} color={theme.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* HERO SECTION: Resume Sanctuary Card */}
        <View style={styles.section}>
          <TouchableOpacity
            activeOpacity={0.92}
            onPress={handleContinueStudying}
            style={[
              styles.heroCard,
              {
                backgroundColor: theme.cardElevated,
                borderColor: theme.borderSubtle,
                shadowColor: '#000',
              },
            ]}
          >
            <View style={styles.heroTopTag}>
              <View style={[styles.heroStatusDot, { backgroundColor: theme.primary }]} />
              <Text style={[styles.heroStatusText, { color: theme.primary }]}>
                RESUME STUDY JOURNEY
              </Text>
            </View>

            <View style={styles.heroMainRow}>
              <View style={styles.heroLeftCol}>
                <Text style={[styles.heroEnglishTitle, { color: theme.textPrimary }]}>
                  {lastSurah ? lastSurah.englishName : 'Al-Faatiha'}
                </Text>
                <Text style={[styles.heroArabicTitle, { color: theme.arabicText }]}>
                  {lastSurah ? lastSurah.name : 'سُورَةُ ٱلْفَاتِحَةِ'}
                </Text>
                <Text style={[styles.heroVerseCount, { color: theme.textSecondary }]}>
                  Ayah {lastStudied ? lastStudied.ayahNumber : 1} of {lastSurah ? lastSurah.numberOfAyahs : 7}
                </Text>
              </View>

              {/* Large Breathing Play Button */}
              <TouchableOpacity
                onPress={handlePlayLastStudied}
                style={[styles.heroPlayBtn, { backgroundColor: theme.primary }]}
                activeOpacity={0.85}
              >
                <Ionicons
                  name={isLastStudiedPlaying ? 'pause' : 'play'}
                  size={26}
                  color="#FFFFFF"
                  style={!isLastStudiedPlaying ? { marginLeft: 3 } : undefined}
                />
              </TouchableOpacity>
            </View>

            {/* Smooth Progress Track */}
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
              <View style={styles.heroProgressLabels}>
                <Text style={[styles.heroProgressText, { color: theme.textTertiary }]}>
                  {progressPercent}% completed in Surah
                </Text>
                <View style={styles.heroResumeTouch}>
                  <Text style={[styles.heroResumeText, { color: theme.primary }]}>Open Reader</Text>
                  <Ionicons name="arrow-forward" size={13} color={theme.primary} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* SECTION: Daily Ayah of Peace (Contemplative Verse) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Verse of Peace</Text>
            <View style={[styles.verseThemePill, { backgroundColor: theme.primaryMuted }]}>
              <Text style={[styles.verseThemeText, { color: theme.primary }]}>
                {dailyVerse.themeNote}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.dailyVerseCard,
              {
                backgroundColor: theme.cardElevated,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            {/* Arabic */}
            <Text style={[styles.dailyArabicText, { color: theme.arabicText }]}>
              {dailyVerse.arabicText}
            </Text>

            {/* Urdu Translation */}
            <Text style={[styles.dailyUrduText, { color: theme.urduText }]}>
              {dailyVerse.urduText}
            </Text>

            {/* Footer with Citation & Quick Actions */}
            <View style={[styles.dailyVerseFooter, { borderTopColor: theme.borderSubtle }]}>
              <Text style={[styles.dailyCitation, { color: theme.textSecondary }]}>
                Surah {dailyVerse.surahName} • {dailyVerse.surahNumber}:{dailyVerse.ayahNumber}
              </Text>

              <View style={styles.dailyActions}>
                <TouchableOpacity
                  onPress={handlePlayDailyVerse}
                  style={[styles.dailyActionBtn, { backgroundColor: theme.chipBg }]}
                >
                  <Ionicons name="volume-medium-outline" size={16} color={theme.primary} />
                  <Text style={[styles.dailyActionText, { color: theme.primary }]}>Recite</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleOpenDailyVerse}
                  style={[styles.dailyActionBtn, { backgroundColor: theme.chipBg }]}
                >
                  <Ionicons name="book-outline" size={15} color={theme.textPrimary} />
                  <Text style={[styles.dailyActionText, { color: theme.textPrimary }]}>Study</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* SECTION: Peaceful Quick Sanctuary Paths */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary, marginBottom: 12 }]}>
            Beloved Surahs & Study
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickScrollContent}
          >
            {[
              {
                num: 55,
                english: 'Ar-Rahman',
                arabic: 'الرحمن',
                desc: 'The Beneficent',
                icon: 'leaf-outline',
              },
              {
                num: 67,
                english: 'Al-Mulk',
                arabic: 'الملك',
                desc: 'Sovereignty & Protection',
                icon: 'shield-checkmark-outline',
              },
              {
                num: 36,
                english: 'Ya-Sin',
                arabic: 'يس',
                desc: 'Heart of the Quran',
                icon: 'heart-outline',
              },
              {
                num: 18,
                english: 'Al-Kahf',
                arabic: 'الكهف',
                desc: 'The Cave & Divine Light',
                icon: 'sparkles-outline',
              },
            ].map((s) => (
              <TouchableOpacity
                key={s.num}
                activeOpacity={0.88}
                onPress={() =>
                  router.push({
                    pathname: '/reader/[surah]',
                    params: { surah: String(s.num) },
                  })
                }
                style={[
                  styles.quickSurahCard,
                  {
                    backgroundColor: theme.cardElevated,
                    borderColor: theme.borderSubtle,
                  },
                ]}
              >
                <View style={[styles.quickIconCircle, { backgroundColor: theme.chipBg }]}>
                  <Ionicons name={s.icon as any} size={18} color={theme.primary} />
                </View>
                <Text style={[styles.quickArabicName, { color: theme.arabicText }]}>{s.arabic}</Text>
                <Text style={[styles.quickEnglishName, { color: theme.textPrimary }]}>
                  {s.english}
                </Text>
                <Text style={[styles.quickDesc, { color: theme.textSecondary }]}>{s.desc}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* SECTION: Study Overview Cards (Clean & Minimal) */}
        <View style={styles.section}>
          <View style={styles.overviewGrid}>
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => router.push('/(tabs)/quran')}
              style={[
                styles.overviewCard,
                { backgroundColor: theme.cardElevated, borderColor: theme.borderSubtle },
              ]}
            >
              <View style={[styles.overviewIconCircle, { backgroundColor: theme.primaryMuted }]}>
                <Ionicons name="library-outline" size={20} color={theme.primary} />
              </View>
              <Text style={[styles.overviewCardTitle, { color: theme.textPrimary }]}>
                All 114 Surahs
              </Text>
              <Text style={[styles.overviewCardSub, { color: theme.textSecondary }]}>
                Browse Quran & Search
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => router.push('/(tabs)/notes')}
              style={[
                styles.overviewCard,
                { backgroundColor: theme.cardElevated, borderColor: theme.borderSubtle },
              ]}
            >
              <View style={[styles.overviewIconCircle, { backgroundColor: '#D9770618' }]}>
                <Ionicons name="document-text-outline" size={20} color={theme.accentGold} />
              </View>
              <Text style={[styles.overviewCardTitle, { color: theme.textPrimary }]}>
                Study Notebook
              </Text>
              <Text style={[styles.overviewCardSub, { color: theme.textSecondary }]}>
                {Object.keys(notes).length} personal reflections
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SECTION: Origin Story Card */}
        <View style={styles.section}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push('/story')}
            style={[
              styles.storyBanner,
              {
                backgroundColor: theme.cardElevated,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            <View style={styles.storyBannerHeader}>
              <View style={[styles.storyBadge, { backgroundColor: theme.primaryMuted }]}>
                <Ionicons name="sparkles" size={13} color={theme.primary} />
                <Text style={[styles.storyBadgeText, { color: theme.primary }]}>ORIGIN STORY</Text>
              </View>
              <Text style={[styles.storyAuthorText, { color: theme.textTertiary }]}>
                Hamdan Khubaib
              </Text>
            </View>

            <Text style={[styles.storyBannerTitle, { color: theme.textPrimary }]}>
              Why I Built Qurus
            </Text>

            <Text style={[styles.storyBannerDesc, { color: theme.textSecondary }]}>
              “I wanted Quran in the palm of my hand like my distractions. Then my brother told me:
              ‘Just start reading with translation... you will find an ayah that sticks like a hook in your mind.’”
            </Text>

            <View style={[styles.storyBannerFooter, { borderTopColor: theme.borderSubtle }]}>
              <Text style={[styles.storyBannerAction, { color: theme.primary }]}>
                Read Developer's Story
              </Text>
              <Ionicons name="arrow-forward" size={14} color={theme.primary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* RECENT JOURNEYS (If Any) */}
        {history.length > 0 && (
          <View style={[styles.section, { marginBottom: 30 }]}>
            <Text style={[styles.sectionTitle, { color: theme.textPrimary, marginBottom: 12 }]}>
              Recent Passages
            </Text>

            <View style={styles.recentList}>
              {history.slice(0, 3).map((item, idx) => {
                const sMeta = SURAHS.find((s) => s.number === item.surahNumber);
                return (
                  <TouchableOpacity
                    key={`${item.surahNumber}-${item.ayahNumber}-${idx}`}
                    onPress={() =>
                      router.push({
                        pathname: '/reader/[surah]',
                        params: { surah: String(item.surahNumber), ayah: String(item.ayahNumber) },
                      })
                    }
                    style={[
                      styles.recentItemRow,
                      { backgroundColor: theme.cardElevated, borderColor: theme.borderSubtle },
                    ]}
                  >
                    <View style={styles.recentItemLeft}>
                      <View style={[styles.recentNumberDot, { backgroundColor: theme.chipBg }]}>
                        <Text style={[styles.recentNumberText, { color: theme.primary }]}>
                          {item.surahNumber}
                        </Text>
                      </View>
                      <View>
                        <Text style={[styles.recentItemSurah, { color: theme.textPrimary }]}>
                          {sMeta ? sMeta.englishName : `Surah ${item.surahNumber}`}
                        </Text>
                        <Text style={[styles.recentItemAyah, { color: theme.textSecondary }]}>
                          Ayah {item.ayahNumber} • {sMeta?.name}
                        </Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={theme.textTertiary} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  headerTextGroup: {
    flex: 1,
    marginRight: 16,
  },
  timePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 6,
  },
  timePillText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  greetingSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  verseThemePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verseThemeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  heroCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  heroTopTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  heroStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  heroStatusText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  heroMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  heroLeftCol: {
    flex: 1,
    marginRight: 16,
  },
  heroEnglishTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  heroArabicTitle: {
    fontSize: 18,
    marginTop: 2,
    marginBottom: 6,
    fontFamily: 'serif',
  },
  heroVerseCount: {
    fontSize: 13,
    fontWeight: '500',
  },
  heroPlayBtn: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  heroProgressSection: {
    gap: 8,
  },
  heroProgressTrack: {
    height: 5,
    borderRadius: 2.5,
    overflow: 'hidden',
  },
  heroProgressBar: {
    height: '100%',
    borderRadius: 2.5,
  },
  heroProgressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroProgressText: {
    fontSize: 11,
    fontWeight: '500',
  },
  heroResumeTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heroResumeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  dailyVerseCard: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 20,
  },
  dailyArabicText: {
    fontSize: 20,
    lineHeight: 38,
    textAlign: 'center',
    writingDirection: 'rtl',
    fontFamily: 'serif',
    marginBottom: 12,
  },
  dailyUrduText: {
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'center',
    writingDirection: 'rtl',
    fontFamily: 'serif',
    marginBottom: 16,
  },
  dailyVerseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 12,
  },
  dailyCitation: {
    fontSize: 12,
    fontWeight: '600',
  },
  dailyActions: {
    flexDirection: 'row',
    gap: 8,
  },
  dailyActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  dailyActionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  quickScrollContent: {
    gap: 12,
    paddingRight: 10,
  },
  quickSurahCard: {
    width: 140,
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
  },
  quickIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  quickArabicName: {
    fontSize: 16,
    fontFamily: 'serif',
    marginBottom: 2,
  },
  quickEnglishName: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  quickDesc: {
    fontSize: 11,
    lineHeight: 14,
  },
  overviewGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  overviewCard: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
  },
  overviewIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  overviewCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  overviewCardSub: {
    fontSize: 11,
  },
  recentList: {
    gap: 8,
  },
  recentItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  recentItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recentNumberDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentNumberText: {
    fontSize: 12,
    fontWeight: '700',
  },
  recentItemSurah: {
    fontSize: 13,
    fontWeight: '700',
  },
  recentItemAyah: {
    fontSize: 11,
    marginTop: 1,
  },
  storyBanner: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
  },
  storyBannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  storyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  storyBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.7,
  },
  storyAuthorText: {
    fontSize: 12,
    fontWeight: '600',
  },
  storyBannerTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  storyBannerDesc: {
    fontSize: 13,
    lineHeight: 19,
    fontStyle: 'italic',
    marginBottom: 14,
  },
  storyBannerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  storyBannerAction: {
    fontSize: 13,
    fontWeight: '700',
  },
});
