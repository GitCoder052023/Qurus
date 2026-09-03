import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { styles } from './styles';
import { useHomeScreen } from './hooks/useHomeScreen';
import { HomeHeader } from './components/HomeHeader';
import { ResumeStudyCard } from './components/ResumeStudyCard';
import { VerseOfPeaceCard } from './components/VerseOfPeaceCard';
import { BelovedSurahsRow } from './components/BelovedSurahsRow';
import { StudyOverviewCards } from './components/StudyOverviewCards';
import { RecentPassages } from './components/RecentPassages';

export function HomeScreen() {
  const { theme } = useTheme();
  const {
    greeting,
    dailyVerse,
    lastStudied,
    lastSurah,
    isLastStudiedPlaying,
    progressPercent,
    history,
    notes,
    handleContinueStudying,
    handlePlayLastStudied,
    handlePlayDailyVerse,
    handleOpenDailyVerse,
  } = useHomeScreen();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader greeting={greeting} />

        <ResumeStudyCard
          lastStudied={lastStudied}
          lastSurah={lastSurah}
          isLastStudiedPlaying={isLastStudiedPlaying}
          progressPercent={progressPercent}
          onContinueStudying={handleContinueStudying}
          onPlayLastStudied={handlePlayLastStudied}
        />

        <VerseOfPeaceCard
          dailyVerse={dailyVerse}
          onPlayDailyVerse={handlePlayDailyVerse}
          onOpenDailyVerse={handleOpenDailyVerse}
        />

        <BelovedSurahsRow />

        <StudyOverviewCards notesCount={Object.keys(notes).length} />

        <RecentPassages history={history} />
      </ScrollView>
    </SafeAreaView>
  );
}
