import React from 'react';
import { View, Text, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Ayah, StudyNote } from '../../../types';
import { useTheme } from '../../../context/ThemeContext';
import { useStudyState } from '../../../context/StudyContext';
import { useAudio } from '../../../context/AudioContext';
import { buildAyahShareMessage } from '../../../lib/ayahShare';
import { styles } from './styles';
import { AyahToolbar } from './AyahToolbar';
import { AyahNotePreview } from './AyahNotePreview';

interface AyahItemProps {
  ayah: Ayah;
  surahNumber: number;
  surahName: string;
  isCurrentAyah: boolean;
  arabicFontSize: number;
  urduFontSize: number;
  showTranslation: boolean;
  onOpenNote: (ayah: Ayah) => void;
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
}: AyahItemProps) {
  const { theme } = useTheme();
  const {
    isBookmarked,
    toggleBookmark,
    isHighlighted,
    toggleHighlight,
    getNote,
  } = useStudyState();
  const { isPlaying, currentSurahNumber, currentAyahNumber, playbackPhase, playAyah, pause, resume } = useAudio();

  const bookmarked = isBookmarked(surahNumber, ayah.numberInSurah);
  const highlighted = isHighlighted(surahNumber, ayah.numberInSurah);
  const note: StudyNote | undefined = getNote(surahNumber, ayah.numberInSurah);

  const isThisAyahActive = isCurrentAyah;
  const isThisAyahPlaying = isThisAyahActive && isPlaying;
  const isRecitingArabic = isThisAyahActive && playbackPhase === 'arabic';
  const isRecitingUrdu = isThisAyahActive && playbackPhase === 'translation';

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
    toggleBookmark(surahNumber, ayah.numberInSurah, ayah.arabicText, ayah.urduText);
  };

  const handleHighlightToggle = () => {
    toggleHighlight(surahNumber, ayah.numberInSurah);
  };

  const handleShare = async () => {
    try {
      const message = buildAyahShareMessage(
        ayah.arabicText,
        ayah.urduText,
        surahName,
        surahNumber,
        ayah.numberInSurah
      );
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
      {/* Top Header: Ayah Number Badge & Status Indicators */}
      <View style={styles.headerRow}>
        <View style={styles.badgeGroup}>
          <View
            style={[
              styles.numberBadge,
              {
                backgroundColor: isThisAyahActive
                  ? theme.primary
                  : theme.surfaceHighlight,
              },
            ]}
          >
            <Text
              style={[
                styles.numberText,
                { color: isThisAyahActive ? '#FFFFFF' : theme.textPrimary },
              ]}
            >
              {ayah.numberInSurah}
            </Text>
          </View>

          {isThisAyahActive && (
            <View
              style={[
                styles.recitingBadge,
                {
                  backgroundColor: isRecitingUrdu ? '#D9770620' : theme.primaryMuted,
                },
              ]}
            >
              <Ionicons
                name="volume-medium"
                size={14}
                color={isRecitingUrdu ? theme.accentGold : theme.primary}
              />
              <Text
                style={[
                  styles.recitingText,
                  { color: isRecitingUrdu ? theme.accentGold : theme.primary },
                ]}
              >
                {isRecitingUrdu ? 'Reciting Urdu Translation' : 'Reciting Arabic'}
              </Text>
            </View>
          )}
        </View>

        {/* Status badges */}
        <View style={styles.tagGroup}>
          {highlighted && (
            <View style={[styles.statusTag, { backgroundColor: theme.surface }]}>
              <Ionicons name="star" size={12} color={theme.accentGold} />
              <Text style={[styles.statusTagText, { color: theme.textSecondary }]}>Important</Text>
            </View>
          )}
          {bookmarked && (
            <Ionicons name="bookmark" size={16} color={theme.bookmarkIcon} />
          )}
        </View>
      </View>

      {/* Quranic Arabic Text */}
      <View
        style={[
          styles.arabicTextWrapper,
          isRecitingArabic && {
            backgroundColor: theme.primaryMuted,
            borderRadius: 12,
            paddingHorizontal: 10,
            paddingVertical: 6,
          },
        ]}
      >
        <Text
          style={[
            styles.arabicText,
            {
              color: theme.arabicText,
              fontSize: arabicFontSize,
              lineHeight: Math.round(arabicFontSize * 1.8),
            },
          ]}
          selectable
        >
          {ayah.arabicText}
        </Text>
      </View>

      {/* Urdu Translation */}
      {showTranslation && (
        <View
          style={[
            styles.translationContainer,
            { borderTopColor: theme.borderSubtle },
            isRecitingUrdu && {
              backgroundColor: '#D9770615',
              borderRadius: 12,
              padding: 10,
              marginTop: 4,
            },
          ]}
        >
          <Text
            style={[
              styles.urduText,
              {
                color: theme.urduText,
                fontSize: urduFontSize,
                lineHeight: Math.round(urduFontSize * 1.8),
              },
              isRecitingUrdu && { fontWeight: '600' },
            ]}
            selectable
          >
            {ayah.urduText}
          </Text>
        </View>
      )}

      {note && <AyahNotePreview ayah={ayah} note={note} onOpenNote={onOpenNote} />}

      <AyahToolbar
        isThisAyahPlaying={isThisAyahPlaying}
        bookmarked={bookmarked}
        highlighted={highlighted}
        note={note}
        onPlayToggle={handlePlayToggle}
        onBookmarkToggle={handleBookmarkToggle}
        onHighlightToggle={handleHighlightToggle}
        onOpenNote={() => onOpenNote(ayah)}
        onShare={handleShare}
      />
    </View>
  );
});
