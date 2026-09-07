import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useStudyState } from '../../context/StudyContext';
import { useAudio } from '../../context/AudioContext';
import { SURAHS } from '../../data/surahs';
import { MotivationSection } from '../../components/home/MotivationSection';
import { StreakSection } from '../../components/home/StreakSection';
import { NotesSection } from '../../components/home/NotesSection';
import { SavesSection } from '../../components/home/SavesSection';
import { BookmarksSection } from '../../components/home/BookmarksSection';
import { CelebrationModal } from '../../components/CelebrationModal';
import { getGreeting } from '../../features/home/utils/greeting';
import { styles } from '../../features/home/styles/home.styles';
import { HomeHeader } from '../../features/home/components/HomeHeader';
import { DisabledNotificationsBanner } from '../../features/home/components/DisabledNotificationsBanner';
import { ResumeStudyCard } from '../../features/home/components/ResumeStudyCard';
import { OriginStoryBanner } from '../../features/home/components/OriginStoryBanner';
import { RecentJourneysList } from '../../features/home/components/RecentJourneysList';

export default function HomeScreen() {
  const { theme } = useTheme();
  const {
    lastStudied,
    history,
    hasNotificationPermission,
    requestNotificationPermission,
  } = useStudyState();
  const { playAyah, isPlaying, currentSurahNumber, currentAyahNumber, pause } = useAudio();
  const router = useRouter();

  // Contemplative time-of-day greeting with contextual secondary colors
  const greeting = useMemo(() => getGreeting(theme), [theme]);

  // Last studied Surah info
  const lastSurah = lastStudied ? SURAHS.find((s) => s.number === lastStudied.surahNumber) : null;
  const isLastStudiedPlaying = Boolean(
    isPlaying &&
    lastStudied &&
    currentSurahNumber === lastStudied.surahNumber &&
    currentAyahNumber === lastStudied.ayahNumber
  );

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
        <HomeHeader greeting={greeting} theme={theme} />

        {!hasNotificationPermission && (
          <DisabledNotificationsBanner
            onRequestPermission={requestNotificationPermission}
            theme={theme}
          />
        )}

        <ResumeStudyCard
          lastSurah={lastSurah}
          lastStudied={lastStudied}
          isLastStudiedPlaying={isLastStudiedPlaying}
          progressPercent={progressPercent}
          onPressCard={handleContinueStudying}
          onPressPlay={handlePlayLastStudied}
          theme={theme}
        />

        {/* 0. DUOLINGO-STYLE MOTIVATION & DYNAMIC TADABBUR PROGRESS ENGINE */}
        <MotivationSection />

        {/* 1. PERSONALIZED SECTION: Current Streak & Daily Motivation */}
        <StreakSection />

        {/* 2. PERSONALIZED SECTION: User's Reflections & Notes */}
        <NotesSection />

        {/* 3. PERSONALIZED SECTION: Saved Verses (Marked / Important) */}
        <SavesSection />

        {/* 4. PERSONALIZED SECTION: Bookmarks */}
        <BookmarksSection />

        {/* SECTION: Origin Story Card */}
        <OriginStoryBanner theme={theme} />

        {/* RECENT JOURNEYS (If Any) */}
        <RecentJourneysList history={history} theme={theme} />
      </ScrollView>

      {/* Celebratory Milestone Dopamine Modal */}
      <CelebrationModal />
    </SafeAreaView>
  );
}
