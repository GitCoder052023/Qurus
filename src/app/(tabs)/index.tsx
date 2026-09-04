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
import { StreakSection } from '../../components/home/StreakSection';
import { NotesSection } from '../../components/home/NotesSection';
import { SavesSection } from '../../components/home/SavesSection';
import { BookmarksSection } from '../../components/home/BookmarksSection';

export default function HomeScreen() {
  const { theme } = useTheme();
  const { lastStudied, history } = useStudyState();
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
              <Ionicons name={greeting.icon as any} size={14} color={theme.primary} />
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
                backgroundColor: theme.card,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            <Text style={[styles.heroStatusText, { color: theme.textTertiary }]}>Continue</Text>

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
                  size={24}
                  color={theme.onPrimary}
                  style={!isLastStudiedPlaying ? { marginLeft: 2 } : undefined}
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
                  {progressPercent}% of this surah
                </Text>
                <View style={styles.heroResumeTouch}>
                  <Text style={[styles.heroResumeText, { color: theme.primary }]}>Open Reader</Text>
                  <Ionicons name="arrow-forward" size={13} color={theme.primary} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* 1. PERSONALIZED SECTION: Current Streak & Daily Motivation */}
        <StreakSection />

        {/* 2. PERSONALIZED SECTION: User's Reflections & Notes */}
        <NotesSection />

        {/* 3. PERSONALIZED SECTION: Saved Verses (Marked / Important) */}
        <SavesSection />

        {/* 4. PERSONALIZED SECTION: Bookmarks */}
        <BookmarksSection />

        {/* SECTION: Origin Story Card */}
        <View style={styles.section}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push('/story')}
            style={[
              styles.storyBanner,
              {
                backgroundColor: theme.card,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            <View style={styles.storyBannerHeader}>
              <Text style={[styles.storyBadgeText, { color: theme.primary }]}>A note from Hamdan</Text>
              <Text style={[styles.storyAuthorText, { color: theme.textTertiary }]}>
                Founder
              </Text>
            </View>

            <Text style={[styles.storyBannerTitle, { color: theme.textPrimary }]}>
              Why I built Qurus
            </Text>

            <Text style={[styles.storyBannerDesc, { color: theme.textSecondary }]}>
              “I wanted Quran in the palm of my hand like my distractions. Then my brother told me:
              ‘Just start reading with translation... you will find an ayah that sticks like a hook in your mind.’”
            </Text>

            <View style={[styles.storyBannerFooter, { borderTopColor: theme.borderSubtle }]}>
              <Text style={[styles.storyBannerAction, { color: theme.primary }]}>
                Read the story
              </Text>
              <Ionicons name="arrow-forward" size={14} color={theme.primary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* RECENT JOURNEYS (If Any) */}
        {history.length > 0 && (
          <View style={[styles.section, { marginBottom: 30 }]}>
            <Text style={[styles.sectionTitle, { color: theme.textPrimary, marginBottom: 12 }]}>
              Recent passages
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
                      { backgroundColor: theme.card, borderColor: theme.borderSubtle },
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
    paddingBottom: 120,
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
    fontSize: 13,
    fontWeight: '500',
  },
  greetingTitle: {
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: -0.4,
  },
  greetingSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
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
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  heroCard: {
    borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 22,
  },
  heroStatusText: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 12,
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
    fontSize: 24,
    fontWeight: '600',
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
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroProgressSection: {
    gap: 8,
  },
  heroProgressTrack: {
    height: 3,
    borderRadius: 2,
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
    fontSize: 13,
    fontWeight: '500',
  },
  recentList: {
    gap: 8,
  },
  recentItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
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
    fontSize: 14,
    fontWeight: '600',
  },
  recentItemAyah: {
    fontSize: 11,
    marginTop: 1,
  },
  storyBanner: {
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
  },
  storyBannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  storyBadgeText: {
    fontSize: 13,
    fontWeight: '500',
  },
  storyAuthorText: {
    fontSize: 12,
    fontWeight: '600',
  },
  storyBannerTitle: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  storyBannerDesc: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  storyBannerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  storyBannerAction: {
    fontSize: 14,
    fontWeight: '500',
  },
});
