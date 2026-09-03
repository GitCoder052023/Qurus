import React, { useState, useMemo } from 'react';
import { Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAudio } from '../../../context/AudioContext';
import { useTheme } from '../../../context/ThemeContext';
import { useStudyState } from '../../../context/StudyContext';
import { getAyah } from '../../../data/surahLoader';
import { styles } from './styles';
import { nextPlaybackMode, nextPlaybackSpeed, playbackProgressPercent } from './utils';
import { PlayerHeader } from './PlayerHeader';
import { ReciterPicker } from './ReciterPicker';
import { AyahCanvas } from './AyahCanvas';
import { PlayerControls } from './PlayerControls';

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
    seekTo,
    currentTime,
    duration,
    playbackSpeed,
    setSpeed,
    reciter,
    setReciter,
  } = useAudio();

  const { theme } = useTheme();
  const { isBookmarked, toggleBookmark } = useStudyState();
  const router = useRouter();

  const [showReciterPicker, setShowReciterPicker] = useState(false);

  // Fetch current Ayah text (Arabic and Urdu)
  const currentAyah = useMemo(() => {
    if (!currentSurahNumber || !currentAyahNumber) return null;
    return getAyah(currentSurahNumber, currentAyahNumber);
  }, [currentSurahNumber, currentAyahNumber]);

  if (!isFullPlayerVisible || !currentSurahNumber || !currentAyahNumber) {
    return null;
  }

  const bookmarked = isBookmarked(currentSurahNumber, currentAyahNumber);

  const progressPercent = playbackProgressPercent(currentTime, duration);

  const isArabicPhase = playbackPhase === 'arabic';
  const isUrduPhase = playbackPhase === 'translation';

  const handleBookmarkToggle = () => {
    if (currentAyah) {
      toggleBookmark(
        currentSurahNumber,
        currentAyahNumber,
        currentAyah.arabicText,
        currentAyah.urduText
      );
    }
  };

  const handleCyclePlaybackMode = () => {
    setPlaybackMode(nextPlaybackMode(playbackMode));
  };

  const handleCycleSpeed = () => {
    setSpeed(nextPlaybackSpeed(playbackSpeed));
  };

  const handleJumpToReader = () => {
    closeFullPlayer();
    router.push({
      pathname: '/reader/[surah]',
      params: { surah: String(currentSurahNumber), ayah: String(currentAyahNumber) },
    });
  };

  return (
    <Modal
      visible={isFullPlayerVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={closeFullPlayer}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <PlayerHeader
          currentSurah={currentSurah}
          currentAyahNumber={currentAyahNumber}
          bookmarked={bookmarked}
          onClose={closeFullPlayer}
          onBookmarkToggle={handleBookmarkToggle}
          onToggleReciterPicker={() => setShowReciterPicker(!showReciterPicker)}
        />

        {showReciterPicker && (
          <ReciterPicker
            reciter={reciter}
            onSelect={setReciter}
            onClose={() => setShowReciterPicker(false)}
          />
        )}

        <AyahCanvas
          currentAyah={currentAyah}
          reciter={reciter}
          isArabicPhase={isArabicPhase}
          isUrduPhase={isUrduPhase}
        />

        <PlayerControls
          currentTime={currentTime}
          duration={duration}
          progressPercent={progressPercent}
          isPlaying={isPlaying}
          isUrduPhase={isUrduPhase}
          playbackMode={playbackMode}
          playbackSpeed={playbackSpeed}
          onPrevious={previousAyah}
          onNext={nextAyah}
          onSeek={seekTo}
          onTogglePlayPause={togglePlayPause}
          onCyclePlaybackMode={handleCyclePlaybackMode}
          onCycleSpeed={handleCycleSpeed}
          onJumpToReader={handleJumpToReader}
        />
      </SafeAreaView>
    </Modal>
  );
}
