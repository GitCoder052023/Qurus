import React, { useRef, useState, useMemo } from 'react';
import { View, FlatList, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useStudyState } from '../../context/StudyContext';
import { useAudio } from '../../context/AudioContext';
import { getSurah } from '../../data/surahLoader';
import { SURAHS } from '../../data/surahs';
import { AyahItem } from '../../components/AyahItem';
import { NoteEditorModal } from '../../components/NoteEditorModal';
import { Ayah } from '../../types';
import { TOTAL_SURAHS } from '../../config/quran';
import { styles } from './styles';
import { useReaderScroll } from './hooks/useReaderScroll';
import { ReaderNavBar } from './components/ReaderNavBar';
import { SurahBanner } from './components/SurahBanner';
import { BismillahBanner } from './components/BismillahBanner';
import { SurahNavFooter } from './components/SurahNavFooter';
import { ReaderNotFound } from './components/ReaderNotFound';

export function ReaderScreen() {
  const { surah: surahParam, ayah: ayahParam } = useLocalSearchParams<{
    surah: string;
    ayah?: string;
  }>();
  const surahNumber = parseInt(surahParam || '1', 10);
  const initialAyah = ayahParam ? parseInt(ayahParam, 10) : 1;

  const { theme, isDark } = useTheme();
  const { preferences, saveNote, deleteNote } = useStudyState();
  const {
    currentSurahNumber,
    currentAyahNumber,
    isPlaying,
    playAyah,
    pause,
    resume,
  } = useAudio();
  const router = useRouter();

  const surahData = useMemo(() => getSurah(surahNumber), [surahNumber]);
  const surahMeta = useMemo(() => SURAHS.find((s) => s.number === surahNumber), [surahNumber]);

  const flatListRef = useRef<FlatList>(null);
  const [selectedAyahForNote, setSelectedAyahForNote] = useState<Ayah | null>(null);

  useReaderScroll({
    flatListRef,
    preferences,
    isPlaying,
    currentSurahNumber,
    currentAyahNumber,
    surahNumber,
    surahData,
    initialAyah,
  });

  if (!surahData || !surahMeta) {
    return <ReaderNotFound />;
  }

  const isCurrentSurahActive = currentSurahNumber === surahNumber;
  const isSurahPlaying = isCurrentSurahActive && isPlaying;

  const handleSurahPlayToggle = () => {
    if (isSurahPlaying) {
      pause();
    } else if (isCurrentSurahActive && !isPlaying && currentAyahNumber) {
      resume();
    } else {
      playAyah(surahNumber, initialAyah || 1);
    }
  };

  const handlePrevSurah = () => {
    if (surahNumber > 1) {
      router.replace(`/reader/${surahNumber - 1}`);
    }
  };

  const handleNextSurah = () => {
    if (surahNumber < TOTAL_SURAHS) {
      router.replace(`/reader/${surahNumber + 1}`);
    }
  };

  const renderHeader = () => (
    <View style={styles.surahHeader}>
      <SurahBanner
        surahData={surahData}
        isSurahPlaying={isSurahPlaying}
        onPlayToggle={handleSurahPlayToggle}
      />
      <BismillahBanner surahNumber={surahNumber} />
    </View>
  );

  const renderFooter = () => (
    <SurahNavFooter surahNumber={surahNumber} onPrev={handlePrevSurah} onNext={handleNextSurah} />
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <ReaderNavBar
        englishName={surahData.englishName}
        name={surahData.name}
        number={surahData.number}
        isSurahPlaying={isSurahPlaying}
        onBack={() => router.back()}
        onPlayToggle={handleSurahPlayToggle}
      />

      {/* Virtualized Ayah List */}
      <FlatList
        ref={flatListRef}
        data={surahData.ayahs}
        keyExtractor={(item) => String(item.numberInSurah)}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        renderItem={({ item }) => (
          <AyahItem
            ayah={item}
            surahNumber={surahNumber}
            surahName={surahData.englishName}
            isCurrentAyah={isCurrentSurahActive && currentAyahNumber === item.numberInSurah}
            arabicFontSize={preferences.arabicFontSize}
            urduFontSize={preferences.urduFontSize}
            showTranslation={preferences.showTranslation}
            onOpenNote={(ayah) => setSelectedAyahForNote(ayah)}
          />
        )}
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={7}
        onScrollToIndexFailed={(info) => {
          flatListRef.current?.scrollToOffset({
            offset: info.index * 200,
            animated: true,
          });
        }}
      />

      {/* In-place Note Editor Modal */}
      {selectedAyahForNote && (
        <NoteEditorModal
          visible={Boolean(selectedAyahForNote)}
          surahNumber={surahNumber}
          ayahNumber={selectedAyahForNote.numberInSurah}
          surahName={surahData.englishName}
          arabicText={selectedAyahForNote.arabicText}
          urduText={selectedAyahForNote.urduText}
          onSave={(text) => {
            saveNote(
              surahNumber,
              selectedAyahForNote.numberInSurah,
              text,
              selectedAyahForNote.arabicText,
              selectedAyahForNote.urduText
            );
            setSelectedAyahForNote(null);
          }}
          onDelete={() => {
            deleteNote(surahNumber, selectedAyahForNote.numberInSurah);
            setSelectedAyahForNote(null);
          }}
          onClose={() => setSelectedAyahForNote(null)}
        />
      )}
    </SafeAreaView>
  );
}
