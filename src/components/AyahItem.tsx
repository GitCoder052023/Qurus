import React from 'react';
import { View, Share } from 'react-native';
import { Ayah, StudyNote } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useStudyState } from '../context/StudyContext';
import { useAudio } from '../context/AudioContext';
import { getAyahTranslation, TRANSLATION_LANGUAGES } from '../data/surahs';
import { AyahHeaderBadge } from '../features/ayah/components/AyahHeaderBadge';
import { AyahTextDisplay } from '../features/ayah/components/AyahTextDisplay';
import { AyahNotesAccordion } from '../features/ayah/components/AyahNotesAccordion';
import { AyahActionsToolbar } from '../features/ayah/components/AyahActionsToolbar';
import { styles } from '../features/ayah/styles/ayahItem.styles';

interface AyahItemProps {
  ayah: Ayah;
  surahNumber: number;
  surahName: string;
  isCurrentAyah: boolean;
  arabicFontSize: number;
  urduFontSize: number;
  showTranslation: boolean;
  onOpenNote: (ayah: Ayah, noteToEdit?: StudyNote) => void;
  onViewNote?: (ayah: Ayah, note: StudyNote) => void;
}

export const AyahItem = React.memo(function AyahItem({
  ayah,
  surahNumber,
  surahName,
  isCurrentAyah,
  arabicFontSize,
  urduFontSize,
  showTranslation,
  onOpenNote,
  onViewNote,
}: AyahItemProps) {
  const { theme } = useTheme();
  const {
    isBookmarked,
    toggleBookmark,
    isHighlighted,
    toggleHighlight,
    getNotesForAyah,
    isAyahCompleted,
  } = useStudyState();
  const {
    isPlaying,
    playbackPhase,
    playAyah,
    pause,
    resume,
    translationLanguage,
  } = useAudio();

  const langConfig = TRANSLATION_LANGUAGES[translationLanguage] || TRANSLATION_LANGUAGES.urdu;
  const translationText = getAyahTranslation(ayah, translationLanguage);

  const bookmarked = isBookmarked(surahNumber, ayah.numberInSurah);
  const highlighted = isHighlighted(surahNumber, ayah.numberInSurah);
  const ayahNotes = getNotesForAyah(surahNumber, ayah.numberInSurah);

  const isThisAyahActive = isCurrentAyah;
  const isThisAyahPlaying = isThisAyahActive && isPlaying;
  const isRecitingArabic = isThisAyahActive && playbackPhase === 'arabic';
  const isRecitingTranslation = isThisAyahActive && playbackPhase === 'translation';

  const handlePlayToggle = () => {
    if (isThisAyahPlaying) {
      pause();
    } else if (isThisAyahActive && !isPlaying) {
      resume();
    } else {
      playAyah(surahNumber, ayah.numberInSurah);
    }
  };

  const handleBookmarkToggle = () => {
    toggleBookmark(surahNumber, ayah.numberInSurah, ayah.arabicText, translationText);
  };

  const handleHighlightToggle = () => {
    toggleHighlight(surahNumber, ayah.numberInSurah);
  };

  const handleShare = async () => {
    try {
      const message = `${ayah.arabicText}\n\n${translationText}\n\n— [Surah ${surahName} ${surahNumber}:${ayah.numberInSurah}] (${langConfig.name}: ${langConfig.author})`;
      await Share.share({ message });
    } catch (e) {
      console.warn('Share error:', e);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isThisAyahActive
            ? theme.activeAyahBg
            : highlighted
            ? theme.highlightBg
            : theme.card,
          borderColor: isThisAyahActive
            ? theme.activeAyahBorder
            : highlighted
            ? theme.accentGold
            : theme.borderSubtle,
        },
        isThisAyahActive && styles.activeContainer,
      ]}
    >
      <AyahHeaderBadge
        ayahNumber={ayah.numberInSurah}
        isThisAyahActive={isThisAyahActive}
        isRecitingTranslation={isRecitingTranslation}
        langConfig={langConfig}
        isCompleted={isAyahCompleted(surahNumber, ayah.numberInSurah)}
        highlighted={highlighted}
        bookmarked={bookmarked}
        theme={theme}
      />

      <AyahTextDisplay
        arabicText={ayah.arabicText}
        translationText={translationText}
        arabicFontSize={arabicFontSize}
        urduFontSize={urduFontSize}
        showTranslation={showTranslation}
        isRecitingArabic={isRecitingArabic}
        isRecitingTranslation={isRecitingTranslation}
        langConfig={langConfig}
        theme={theme}
      />

      <AyahNotesAccordion
        ayah={ayah}
        ayahNotes={ayahNotes}
        onOpenNote={onOpenNote}
        onViewNote={onViewNote}
        theme={theme}
      />

      <AyahActionsToolbar
        ayah={ayah}
        isThisAyahPlaying={isThisAyahPlaying}
        bookmarked={bookmarked}
        highlighted={highlighted}
        notesCount={ayahNotes.length}
        onPlayToggle={handlePlayToggle}
        onBookmarkToggle={handleBookmarkToggle}
        onHighlightToggle={handleHighlightToggle}
        onOpenNote={onOpenNote}
        onShare={handleShare}
        theme={theme}
      />
    </View>
  );
});
