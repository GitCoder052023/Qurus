import React, { useState, useMemo } from 'react';
import { View, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAudio } from '../context/AudioContext';
import { useTheme } from '../context/ThemeContext';
import { useStudyState } from '../context/StudyContext';
import { NoteEditorModal } from './NoteEditorModal';
import { getAyah } from '../data/surahLoader';
import { SURAHS, TRANSLATION_LANGUAGES, getAyahTranslation } from '../data/surahs';
import { PlaybackMode } from '../types';
import { PlayerHeader } from '../features/player/components/PlayerHeader';
import { PlayerReciterSelector } from '../features/player/components/PlayerReciterSelector';
import { PlayerAyahDisplay } from '../features/player/components/PlayerAyahDisplay';
import { PlayerStudyActionsBar } from '../features/player/components/PlayerStudyActionsBar';
import { PlayerProgressBar } from '../features/player/components/PlayerProgressBar';
import { PlayerControls } from '../features/player/components/PlayerControls';
import { PlayerModeSpeedBar } from '../features/player/components/PlayerModeSpeedBar';
import { styles } from '../features/player/styles/fullPlayer.styles';

export function FullPlayerModal() {
  const {
    isFullPlayerVisible,
    closeFullPlayer,
    currentSurahNumber,
    currentAyahNumber,
    currentSurah,
    playbackPhase,
    playbackMode,
    setPlaybackMode,
    isPlaying,
    togglePlayPause,
    nextAyah,
    previousAyah,
    seekBackward,
    seekForward,
    currentTime,
    duration,
    playbackSpeed,
    setSpeed,
    reciter,
    setReciter,
    playAyah,
    translationLanguage,
  } = useAudio();

  const { theme } = useTheme();
  const {
    isBookmarked,
    toggleBookmark,
    isHighlighted,
    toggleHighlight,
    saveNote,
    deleteNote,
    getNote,
    journeyCheckpoint,
    isAyahInSequence,
  } = useStudyState();
  const router = useRouter();

  const [showReciterPicker, setShowReciterPicker] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);

  // Fetch current Ayah text (Arabic and Urdu)
  const currentAyah = useMemo(() => {
    if (!currentSurahNumber || !currentAyahNumber) return null;
    return getAyah(currentSurahNumber, currentAyahNumber);
  }, [currentSurahNumber, currentAyahNumber]);

  if (!isFullPlayerVisible || !currentSurahNumber || !currentAyahNumber) {
    return null;
  }

  const bookmarked = isBookmarked(currentSurahNumber, currentAyahNumber);
  const highlighted = isHighlighted(currentSurahNumber, currentAyahNumber);
  const currentNote = getNote(currentSurahNumber, currentAyahNumber);
  const inSequence = isAyahInSequence(currentSurahNumber, currentAyahNumber);
  const checkpointSurah = useMemo(
    () => SURAHS.find((s) => s.number === journeyCheckpoint.surahNumber),
    [journeyCheckpoint.surahNumber]
  );

  const handleResumeSequence = () => {
    playAyah(journeyCheckpoint.surahNumber, journeyCheckpoint.ayahNumber);
  };

  const isArabicPhase = playbackPhase === 'arabic';
  const isUrduPhase = playbackPhase === 'translation';
  const langConfig = TRANSLATION_LANGUAGES[translationLanguage] || TRANSLATION_LANGUAGES.urdu;
  const translationText = currentAyah ? getAyahTranslation(currentAyah, translationLanguage) : '...';

  const handleBookmarkToggle = () => {
    if (currentAyah) {
      toggleBookmark(
        currentSurahNumber,
        currentAyahNumber,
        currentAyah.arabicText,
        translationText
      );
    }
  };

  const handleHighlightToggle = () => {
    toggleHighlight(currentSurahNumber, currentAyahNumber);
  };

  const handleCyclePlaybackMode = () => {
    const modes: PlaybackMode[] = ['both', 'arabic_only', 'translation_only'];
    const nextIndex = (modes.indexOf(playbackMode) + 1) % modes.length;
    setPlaybackMode(modes[nextIndex]);
  };

  const handleCycleSpeed = () => {
    const speeds = [1.0, 1.25, 1.5, 0.75];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setSpeed(speeds[nextIndex]);
  };

  const handleJumpToReader = () => {
    closeFullPlayer();
    router.push({
      pathname: '/reader/[surah]',
      params: { surah: String(currentSurahNumber), ayah: String(currentAyahNumber) },
    });
  };

  return (
    <>
      <Modal
        visible={isFullPlayerVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeFullPlayer}
      >
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
          <PlayerHeader
            onClose={closeFullPlayer}
            surahEnglishName={currentSurah?.englishName}
            surahArabicName={currentSurah?.name}
            currentAyahNumber={currentAyahNumber}
            totalAyahs={currentSurah?.numberOfAyahs}
            bookmarked={bookmarked}
            onToggleBookmark={handleBookmarkToggle}
            onToggleReciterPicker={() => setShowReciterPicker(!showReciterPicker)}
            theme={theme}
          />

          <PlayerReciterSelector
            visible={showReciterPicker}
            onClose={() => setShowReciterPicker(false)}
            selectedReciter={reciter}
            onSelectReciter={setReciter}
            theme={theme}
          />

          <PlayerAyahDisplay
            inSequence={inSequence}
            onResumeSequence={handleResumeSequence}
            checkpointSurahName={checkpointSurah?.englishName}
            checkpointAyahNumber={journeyCheckpoint.ayahNumber}
            currentAyah={currentAyah}
            currentNote={currentNote}
            translationText={translationText}
            langConfig={langConfig}
            isArabicPhase={isArabicPhase}
            isUrduPhase={isUrduPhase}
            theme={theme}
            onOpenNoteModal={() => setShowNoteModal(true)}
          />

          <View style={[styles.bottomSection, { backgroundColor: theme.background }]}>
            <PlayerStudyActionsBar
              bookmarked={bookmarked}
              highlighted={highlighted}
              currentNote={currentNote}
              onToggleBookmark={handleBookmarkToggle}
              onToggleHighlight={handleHighlightToggle}
              onOpenNoteModal={() => setShowNoteModal(true)}
              theme={theme}
            />

            <PlayerProgressBar
              currentTime={currentTime}
              duration={duration}
              isUrduPhase={isUrduPhase}
              theme={theme}
            />

            <PlayerControls
              isPlaying={isPlaying}
              onTogglePlay={togglePlayPause}
              onPrevious={previousAyah}
              onNext={nextAyah}
              onSeekBackward={seekBackward}
              onSeekForward={seekForward}
              theme={theme}
            />

            <PlayerModeSpeedBar
              playbackMode={playbackMode}
              playbackSpeed={playbackSpeed}
              onCycleMode={handleCyclePlaybackMode}
              onCycleSpeed={handleCycleSpeed}
              onJumpToReader={handleJumpToReader}
              theme={theme}
            />
          </View>
        </SafeAreaView>
      </Modal>

      <NoteEditorModal
        visible={showNoteModal}
        surahNumber={currentSurahNumber ?? 1}
        ayahNumber={currentAyahNumber ?? 1}
        surahName={currentSurah?.englishName || `Surah ${currentSurahNumber ?? ''}`}
        arabicText={currentAyah?.arabicText}
        urduText={translationText}
        initialNote={currentNote?.text || ''}
        initialVoiceNote={currentNote?.voiceNote}
        noteId={currentNote?.id}
        onSave={(text, voiceNote) => {
          if (!currentSurahNumber || !currentAyahNumber || !currentAyah) return;
          saveNote(
            currentSurahNumber,
            currentAyahNumber,
            text,
            currentAyah.arabicText,
            translationText,
            voiceNote,
            currentNote?.id
          );
          setShowNoteModal(false);
        }}
        onDelete={() => {
          if (currentNote) {
            deleteNote(currentNote.id);
          }
          setShowNoteModal(false);
        }}
        onClose={() => setShowNoteModal(false)}
      />
    </>
  );
}
