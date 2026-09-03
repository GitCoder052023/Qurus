import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Ayah, StudyNote } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useStudyState } from '../context/StudyContext';
import { useAudio } from '../context/AudioContext';

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
  const { isPlaying, currentSurahNumber, currentAyahNumber, playAyah, pause, resume } = useAudio();

  const bookmarked = isBookmarked(surahNumber, ayah.numberInSurah);
  const highlighted = isHighlighted(surahNumber, ayah.numberInSurah);
  const note: StudyNote | undefined = getNote(surahNumber, ayah.numberInSurah);

  const isThisAyahActive = isCurrentAyah;
  const isThisAyahPlaying = isThisAyahActive && isPlaying;

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
      const message = `${ayah.arabicText}\n\n${ayah.urduText}\n\n— [Surah ${surahName} ${surahNumber}:${ayah.numberInSurah}] (Urdu: Fateh Muhammad Jalandhari)`;
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
            <View style={[styles.recitingBadge, { backgroundColor: theme.primaryMuted }]}>
              <Ionicons name="volume-medium" size={14} color={theme.primary} />
              <Text style={[styles.recitingText, { color: theme.primary }]}>Reciting</Text>
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

      {/* Urdu Translation */}
      {showTranslation && (
        <View style={[styles.translationContainer, { borderTopColor: theme.borderSubtle }]}>
          <Text
            style={[
              styles.urduText,
              {
                color: theme.urduText,
                fontSize: urduFontSize,
                lineHeight: Math.round(urduFontSize * 1.8),
              },
            ]}
            selectable
          >
            {ayah.urduText}
          </Text>
        </View>
      )}

      {/* Personal Reflection Note Card Preview (if exists) */}
      {note && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onOpenNote(ayah)}
          style={[styles.noteCard, { backgroundColor: theme.noteBg, borderColor: theme.border }]}
        >
          <View style={styles.noteHeader}>
            <View style={styles.noteHeaderLeft}>
              <Ionicons name="document-text" size={14} color={theme.primary} />
              <Text style={[styles.noteTitle, { color: theme.primary }]}>My Reflection</Text>
            </View>
            <Ionicons name="pencil" size={13} color={theme.textTertiary} />
          </View>
          <Text style={[styles.noteText, { color: theme.textPrimary }]} numberOfLines={3}>
            {note.text}
          </Text>
        </TouchableOpacity>
      )}

      {/* Ayah Actions Toolbar */}
      <View style={[styles.toolbar, { borderTopColor: theme.borderSubtle }]}>
        {/* Play / Pause */}
        <TouchableOpacity
          onPress={handlePlayToggle}
          style={[
            styles.actionButton,
            isThisAyahPlaying && { backgroundColor: theme.primaryMuted },
          ]}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={isThisAyahPlaying ? 'pause' : 'play'}
            size={18}
            color={isThisAyahPlaying ? theme.primary : theme.textSecondary}
          />
          <Text
            style={[
              styles.actionLabel,
              { color: isThisAyahPlaying ? theme.primary : theme.textSecondary },
            ]}
          >
            {isThisAyahPlaying ? 'Pause' : 'Play'}
          </Text>
        </TouchableOpacity>

        {/* Bookmark */}
        <TouchableOpacity
          onPress={handleBookmarkToggle}
          style={styles.actionButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={18}
            color={bookmarked ? theme.bookmarkIcon : theme.textSecondary}
          />
          <Text
            style={[
              styles.actionLabel,
              { color: bookmarked ? theme.bookmarkIcon : theme.textSecondary },
            ]}
          >
            {bookmarked ? 'Saved' : 'Bookmark'}
          </Text>
        </TouchableOpacity>

        {/* Highlight / Mark */}
        <TouchableOpacity
          onPress={handleHighlightToggle}
          style={styles.actionButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={highlighted ? 'star' : 'star-outline'}
            size={18}
            color={highlighted ? theme.accentGold : theme.textSecondary}
          />
          <Text
            style={[
              styles.actionLabel,
              { color: highlighted ? theme.accentGold : theme.textSecondary },
            ]}
          >
            {highlighted ? 'Marked' : 'Mark'}
          </Text>
        </TouchableOpacity>

        {/* Note */}
        <TouchableOpacity
          onPress={() => onOpenNote(ayah)}
          style={styles.actionButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={note ? 'document-text' : 'create-outline'}
            size={18}
            color={note ? theme.primary : theme.textSecondary}
          />
          <Text
            style={[
              styles.actionLabel,
              { color: note ? theme.primary : theme.textSecondary },
            ]}
          >
            {note ? 'Note' : 'Add Note'}
          </Text>
        </TouchableOpacity>

        {/* Copy / Share */}
        <TouchableOpacity
          onPress={handleShare}
          style={styles.actionButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="share-social-outline" size={17} color={theme.textTertiary} />
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    paddingTop: 16,
    paddingHorizontal: 18,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  activeContainer: {
    borderLeftWidth: 4,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  badgeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  numberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 13,
    fontWeight: '800',
  },
  recitingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recitingText: {
    fontSize: 11,
    fontWeight: '700',
  },
  tagGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusTagText: {
    fontSize: 10,
    fontWeight: '600',
  },
  arabicText: {
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily: 'serif',
    marginBottom: 14,
  },
  translationContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 12,
    marginBottom: 12,
  },
  urduText: {
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily: 'serif',
  },
  noteCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  noteHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  noteTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  noteText: {
    fontSize: 13,
    lineHeight: 19,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
