import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Ayah, StudyNote } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useStudyState } from '../context/StudyContext';
import { useAudio } from '../context/AudioContext';
import { VoiceNotePlayer, formatDurationMs } from './VoiceNotePlayer';

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
  const [isNotesCollapsed, setIsNotesCollapsed] = useState(true);
  const {
    isBookmarked,
    toggleBookmark,
    isHighlighted,
    toggleHighlight,
    getNotesForAyah,
    deleteNote,
  } = useStudyState();
  const { isPlaying, currentSurahNumber, currentAyahNumber, playbackPhase, playAyah, pause, resume } = useAudio();

  const bookmarked = isBookmarked(surahNumber, ayah.numberInSurah);
  const highlighted = isHighlighted(surahNumber, ayah.numberInSurah);
  const ayahNotes = getNotesForAyah(surahNumber, ayah.numberInSurah);

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
                { color: isThisAyahActive ? theme.onPrimary : theme.textPrimary },
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
                  backgroundColor: theme.primaryMuted,
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
              <Ionicons name="star" size={12} color={theme.tertiary} />
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
              backgroundColor: theme.primaryMuted,
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

      {/* Sleek, Compact & Collapsible Personal Reflection Notes */}
      {ayahNotes.length > 0 && (
        <View style={[styles.notesContainer, { backgroundColor: theme.noteBg, borderColor: theme.border }]}>
          {/* Header Bar: Tappable to toggle collapse/expand */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsNotesCollapsed(!isNotesCollapsed)}
            style={styles.notesSectionHeader}
          >
            <View style={styles.notesHeaderLeft}>
              <Ionicons name="journal" size={13} color={theme.noteAccent} />
              <Text style={[styles.notesSectionTitle, { color: theme.noteAccent }]}>
                Reflections
              </Text>
              <View style={[styles.notesCountBadge, { backgroundColor: theme.noteMuted }]}>
                <Text style={[styles.notesCountText, { color: theme.noteAccent }]}>
                  {ayahNotes.length}
                </Text>
              </View>
              {isNotesCollapsed && (
                <Text
                  style={[styles.collapsedSnippet, { color: theme.textSecondary }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  • {ayahNotes[0].text
                      ? ayahNotes[0].text.trim()
                      : ayahNotes[0].voiceNote
                      ? `Voice note (${formatDurationMs(ayahNotes[0].voiceNote.durationMillis || 0)})`
                      : 'Reflection'}
                </Text>
              )}
            </View>

            <View style={styles.notesHeaderRight}>
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  onOpenNote(ayah);
                }}
                style={[styles.addReflectionBtn, { backgroundColor: theme.surface, borderColor: theme.borderSubtle }]}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              >
                <Ionicons name="add" size={12} color={theme.noteAccent} />
                <Text style={[styles.addReflectionBtnText, { color: theme.noteAccent }]}>Add</Text>
              </TouchableOpacity>
              <Ionicons
                name={isNotesCollapsed ? 'chevron-down' : 'chevron-up'}
                size={16}
                color={theme.textTertiary}
              />
            </View>
          </TouchableOpacity>

          {/* Expanded Compact Notes List */}
          {!isNotesCollapsed && (
            <View style={styles.compactNotesList}>
              {ayahNotes.map((n) => {
                const isVoice = Boolean(n.voiceNote);
                const isText = Boolean(n.text && n.text.trim());
                const dateStr = new Date(n.updatedAt || n.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                });
                const previewSnippet = isText
                  ? n.text.trim()
                  : isVoice
                  ? `Voice note (${formatDurationMs(n.voiceNote?.durationMillis || 0)})`
                  : 'Reflection';

                return (
                  <TouchableOpacity
                    key={n.id}
                    activeOpacity={0.7}
                    onPress={() => (onViewNote ? onViewNote(ayah, n) : onOpenNote(ayah, n))}
                    style={[
                      styles.compactNoteRow,
                      { backgroundColor: theme.card, borderColor: theme.borderSubtle },
                    ]}
                  >
                    <View style={[styles.compactNoteIconWrap, { backgroundColor: theme.noteMuted }]}>
                      <Ionicons
                        name={isVoice && !isText ? 'mic' : !isVoice ? 'document-text' : 'chatbubbles'}
                        size={12}
                        color={theme.noteAccent}
                      />
                    </View>

                    <Text
                      style={[styles.compactNoteText, { color: theme.textPrimary }]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {previewSnippet}
                    </Text>

                    <View style={styles.compactNoteRight}>
                      <Text style={[styles.compactNoteDate, { color: theme.textTertiary }]}>
                        {dateStr}
                      </Text>
                      <Ionicons name="chevron-forward" size={13} color={theme.textTertiary} />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
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
            color={highlighted ? theme.tertiary : theme.textSecondary}
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
            name={ayahNotes.length > 0 ? 'document-text' : 'create-outline'}
            size={18}
            color={ayahNotes.length > 0 ? theme.noteAccent : theme.textSecondary}
          />
          <Text
            style={[
              styles.actionLabel,
              { color: ayahNotes.length > 0 ? theme.noteAccent : theme.textSecondary },
            ]}
          >
            {ayahNotes.length > 0 ? `Notes (${ayahNotes.length})` : 'Add Note'}
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
    borderWidth: StyleSheet.hairlineWidth,
    paddingTop: 16,
    paddingHorizontal: 18,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0,
    shadowRadius: 3,
    elevation: 0,
  },
  activeContainer: {
    borderLeftWidth: 3,
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
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
    fontWeight: '600',
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
  arabicTextWrapper: {
    marginBottom: 8,
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
  notesContainer: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginBottom: 10,
  },
  notesSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 28,
  },
  notesHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    marginRight: 8,
  },
  notesSectionTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  notesCountBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
  },
  notesCountText: {
    fontSize: 10,
    fontWeight: '700',
  },
  collapsedSnippet: {
    fontSize: 11,
    flex: 1,
    fontStyle: 'italic',
  },
  notesHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addReflectionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  addReflectionBtnText: {
    fontSize: 11,
    fontWeight: '600',
  },
  compactNotesList: {
    marginTop: 8,
    gap: 6,
  },
  compactNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 8,
  },
  compactNoteIconWrap: {
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactNoteText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
  },
  compactNoteRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  compactNoteDate: {
    fontSize: 10,
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
