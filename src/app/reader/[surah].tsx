import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  View,
  FlatList,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useStudyState } from '../../context/StudyContext';
import { useAudio } from '../../context/AudioContext';
import { getSurah } from '../../data/surahLoader';
import { SURAHS, getAyahTranslation } from '../../data/surahs';
import { AyahItem } from '../../components/AyahItem';
import { NoteEditorModal } from '../../components/NoteEditorModal';
import { NoteViewerModal } from '../../components/NoteViewerModal';
import { CelebrationModal } from '../../components/CelebrationModal';
import { SequentialRecommendationBanner } from '../../components/SequentialRecommendationBanner';
import { Ayah, StudyNote } from '../../types';
import { trackSurahOpened } from '../../lib/analytics';
import { styles } from '../../features/reader/styles/reader.styles';
import { ReaderNavBar } from '../../features/reader/components/ReaderNavBar';
import { SurahBannerCard } from '../../features/reader/components/SurahBannerCard';
import { BismillahCard } from '../../features/reader/components/BismillahCard';
import { SurahNavFooter } from '../../features/reader/components/SurahNavFooter';
import { ReaderErrorState } from '../../features/reader/components/ReaderErrorState';

export default function ReaderScreen() {
  const { surah: surahParam, ayah: ayahParam } = useLocalSearchParams<{
    surah: string;
    ayah?: string;
  }>();
  const surahNumber = parseInt(surahParam || '1', 10);
  const initialAyah = ayahParam ? parseInt(ayahParam, 10) : 1;

  const { theme, isDark } = useTheme();
  const { preferences, saveNote, deleteNote, getSurahProgress } = useStudyState();
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
  const surahProgress = useMemo(() => getSurahProgress(surahNumber), [getSurahProgress, surahNumber]);

  const flatListRef = useRef<FlatList>(null);
  const [selectedAyahForNote, setSelectedAyahForNote] = useState<Ayah | null>(null);
  const [selectedNoteForEdit, setSelectedNoteForEdit] = useState<StudyNote | null>(null);
  const [noteEditorVisible, setNoteEditorVisible] = useState(false);
  const [viewingNote, setViewingNote] = useState<StudyNote | null>(null);
  const [noteViewerVisible, setNoteViewerVisible] = useState(false);

  // Track surah opened event
  useEffect(() => {
    if (!isNaN(surahNumber) && surahNumber >= 1 && surahNumber <= 114) {
      trackSurahOpened(surahNumber);
    }
  }, [surahNumber]);

  // Auto-scroll when currently reciting ayah changes
  useEffect(() => {
    if (
      preferences.autoScroll &&
      isPlaying &&
      currentSurahNumber === surahNumber &&
      currentAyahNumber !== null &&
      surahData &&
      currentAyahNumber <= surahData.ayahs.length
    ) {
      const index = currentAyahNumber - 1;
      try {
        flatListRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.25,
        });
      } catch (e) {
        // Fallback if index not measured yet
        flatListRef.current?.scrollToOffset({
          offset: index * 200,
          animated: true,
        });
      }
    }
  }, [currentSurahNumber, currentAyahNumber, isPlaying, surahNumber, preferences.autoScroll, surahData]);

  // Scroll to initialAyah on mount if specified
  useEffect(() => {
    if (initialAyah > 1 && surahData) {
      const timer = setTimeout(() => {
        try {
          flatListRef.current?.scrollToIndex({
            index: initialAyah - 1,
            animated: true,
            viewPosition: 0.2,
          });
        } catch (e) {
          flatListRef.current?.scrollToOffset({
            offset: (initialAyah - 1) * 200,
            animated: true,
          });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [initialAyah, surahData]);

  if (!surahData || !surahMeta) {
    return <ReaderErrorState onBack={() => router.back()} theme={theme} />;
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
    if (surahNumber < 114) {
      router.replace(`/reader/${surahNumber + 1}`);
    }
  };

  const renderHeader = () => (
    <View style={styles.surahHeader}>
      {/* Gentle in-sequence recommendation banner */}
      <SequentialRecommendationBanner
        currentSurahNumber={surahNumber}
        currentAyahNumber={
          isCurrentSurahActive && currentAyahNumber ? currentAyahNumber : initialAyah
        }
      />

      {/* Surah Title Banner */}
      <SurahBannerCard
        surahData={surahData}
        surahProgress={surahProgress}
        isSurahPlaying={isSurahPlaying}
        onPlayToggle={handleSurahPlayToggle}
        theme={theme}
      />

      {/* Bismillah Banner (Omitted for Surah 9 At-Tawbah) */}
      <BismillahCard
        surahNumber={surahNumber}
        translationLanguage={preferences.translationLanguage}
        theme={theme}
      />
    </View>
  );

  const renderFooter = () => (
    <SurahNavFooter
      surahNumber={surahNumber}
      onPrevSurah={handlePrevSurah}
      onNextSurah={handleNextSurah}
      theme={theme}
    />
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Top Navigation Bar */}
      <ReaderNavBar
        englishName={surahData.englishName}
        arabicName={surahData.name}
        surahNumber={surahData.number}
        isSurahPlaying={isSurahPlaying}
        onBack={() => router.back()}
        onPlayToggle={handleSurahPlayToggle}
        theme={theme}
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
            onOpenNote={(ayah, noteToEdit) => {
              setSelectedAyahForNote(ayah);
              setSelectedNoteForEdit(noteToEdit || null);
              setNoteEditorVisible(true);
            }}
            onViewNote={(ayah, note) => {
              setSelectedAyahForNote(ayah);
              setViewingNote(note);
              setNoteViewerVisible(true);
            }}
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

      <NoteEditorModal
        visible={noteEditorVisible}
        surahNumber={surahNumber}
        ayahNumber={selectedAyahForNote?.numberInSurah ?? 1}
        surahName={surahData.englishName}
        arabicText={selectedAyahForNote?.arabicText}
        urduText={selectedAyahForNote ? getAyahTranslation(selectedAyahForNote, preferences.translationLanguage) : undefined}
        initialNote={selectedNoteForEdit?.text || ''}
        initialVoiceNote={selectedNoteForEdit?.voiceNote}
        noteId={selectedNoteForEdit?.id}
        onSave={(text, voiceNote) => {
          if (!selectedAyahForNote) return;
          const transSnippet = getAyahTranslation(selectedAyahForNote, preferences.translationLanguage);
          saveNote(
            surahNumber,
            selectedAyahForNote.numberInSurah,
            text,
            selectedAyahForNote.arabicText,
            transSnippet,
            voiceNote,
            selectedNoteForEdit?.id
          );
          setNoteEditorVisible(false);
        }}
        onDelete={() => {
          if (selectedNoteForEdit) {
            deleteNote(selectedNoteForEdit.id);
          }
          setNoteEditorVisible(false);
        }}
        onClose={() => setNoteEditorVisible(false)}
      />

      <NoteViewerModal
        visible={noteViewerVisible}
        note={viewingNote}
        surahName={surahData.englishName}
        arabicText={selectedAyahForNote?.arabicText}
        urduText={selectedAyahForNote ? getAyahTranslation(selectedAyahForNote, preferences.translationLanguage) : undefined}
        onClose={() => {
          setNoteViewerVisible(false);
          setViewingNote(null);
        }}
        onEdit={(note) => {
          setSelectedNoteForEdit(note);
          setNoteEditorVisible(true);
        }}
        onDelete={(noteId) => {
          deleteNote(noteId);
        }}
      />

      {/* Celebratory Dopamine Milestone Modal */}
      <CelebrationModal />
    </SafeAreaView>
  );
}
