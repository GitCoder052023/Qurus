import React, { useRef, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePathname } from 'expo-router';
import { useAudio } from '../context/AudioContext';
import { useTheme } from '../context/ThemeContext';
import { useStudyState } from '../context/StudyContext';
import { getAyah } from '../data/surahLoader';
import { NoteEditorModal } from './NoteEditorModal';

export function MiniPlayer() {
  const {
    currentSurahNumber,
    currentAyahNumber,
    currentSurah,
    playbackPhase,
    isPlaying,
    togglePlayPause,
    nextAyah,
    previousAyah,
    currentTime,
    duration,
    openFullPlayer,
    reciter,
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
  } = useStudyState();
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const [isNoteEditorVisible, setIsNoteEditorVisible] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const currentAyah = useMemo(() => {
    if (!currentSurahNumber || !currentAyahNumber) return null;
    return getAyah(currentSurahNumber, currentAyahNumber);
  }, [currentSurahNumber, currentAyahNumber]);

  if (pathname?.includes('/onboarding') || !currentSurahNumber || !currentAyahNumber) {
    return null;
  }

  const isUrduPhase = playbackPhase === 'translation';
  const progressPercent =
    duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;
  const bookmarked = isBookmarked(currentSurahNumber, currentAyahNumber);
  const highlighted = isHighlighted(currentSurahNumber, currentAyahNumber);
  const currentNote = getNote(currentSurahNumber, currentAyahNumber);

  // Determine floating positioning: float above tab bar on tabs, or above safe area on reader
  const isReader = pathname?.includes('/reader');
  const isStory = pathname?.includes('/story');
  const isTabs = !isReader && !isStory;
  const bottomOffset = isTabs ? 68 : Math.max(insets.bottom, 12) + 8;

  const handleBookmarkPress = (e: GestureResponderEvent) => {
    e.stopPropagation();
    if (currentAyah) {
      toggleBookmark(
        currentSurahNumber,
        currentAyahNumber,
        currentAyah.arabicText,
        currentAyah.urduText
      );
    }
  };

  const handleHighlightPress = (e: GestureResponderEvent) => {
    e.stopPropagation();
    toggleHighlight(currentSurahNumber, currentAyahNumber);
  };

  const handleNotePress = (e: GestureResponderEvent) => {
    e.stopPropagation();
    setIsNoteEditorVisible(true);
  };

  // Horizontal Swipe Gestures (Like Spotify mini-player)
  const handleTouchStart = (e: GestureResponderEvent) => {
    touchStartRef.current = {
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY,
      time: Date.now(),
    };
  };

  const handleTouchEnd = (e: GestureResponderEvent) => {
    if (!touchStartRef.current) return;
    const deltaX = e.nativeEvent.pageX - touchStartRef.current.x;
    const deltaY = e.nativeEvent.pageY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;
    touchStartRef.current = null;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaY) < 35 && deltaTime < 500) {
      if (deltaX < 0) {
        nextAyah();
      } else {
        previousAyah();
      }
    } else if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && deltaTime < 300) {
      openFullPlayer();
    }
  };

  const artistSubtitle = isUrduPhase
    ? 'Urdu • Shamshad Ali Khan'
    : `Arabic • ${reciter?.name?.split(' ')[0] || 'Reciter'}`;

  return (
    <View
      style={[
        styles.floatingWrapper,
        {
          bottom: bottomOffset,
        },
      ]}
      pointerEvents="box-none"
    >
      <View
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={[
          styles.container,
          {
            backgroundColor: theme.card,
            borderColor: theme.borderSubtle,
          },
        ]}
      >
        <View style={styles.contentRow}>
          {/* Left: Spotify-style Album Art / Surah Thumbnail */}
          <View
            style={[
              styles.artworkThumbnail,
              {
                backgroundColor: theme.primaryLight,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            <Text
              style={[
                styles.artworkSurahNum,
                { color: isUrduPhase ? theme.accentGold : theme.primary },
              ]}
            >
              {currentSurahNumber}
            </Text>
            <View
              style={[
                styles.artworkGlowDot,
                {
                  backgroundColor: isPlaying
                    ? isUrduPhase
                      ? theme.accentGold
                      : theme.primary
                    : 'transparent',
                },
              ]}
            />
          </View>

          {/* Center: Track & Recitation Info */}
          <View style={styles.textContainer}>
            <View style={styles.titleRow}>
              <Text style={[styles.surahTitle, { color: theme.textPrimary }]} numberOfLines={1}>
                {currentSurah ? currentSurah.englishName : `Surah ${currentSurahNumber}`}
              </Text>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: isUrduPhase ? theme.primaryMuted : theme.primaryMuted,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    { color: isUrduPhase ? theme.accentGold : theme.primary },
                  ]}
                >
                  Ayah {currentAyahNumber}
                </Text>
              </View>
            </View>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]} numberOfLines={1}>
              {artistSubtitle}
            </Text>
          </View>

          {/* Right: Handy Spotify-Grade Audio Controls */}
          <View style={styles.controlsRow}>
            {/* Previous Ayah */}
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                previousAyah();
              }}
              style={styles.iconBtn}
              hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
              accessibilityLabel="Previous Ayah"
            >
              <Ionicons name="play-skip-back" size={19} color={theme.textSecondary} />
            </TouchableOpacity>

            {/* Play / Pause Circular Button */}
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                togglePlayPause();
              }}
              style={[
                styles.playButton,
                {
                  backgroundColor: isUrduPhase ? theme.accentGold : theme.primary,
                  shadowColor: isUrduPhase ? theme.accentGold : theme.primary,
                },
              ]}
              hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
              activeOpacity={0.88}
              accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={18}
                color={theme.onPrimary}
                style={!isPlaying ? { marginLeft: 2 } : undefined}
              />
            </TouchableOpacity>

            {/* Next Ayah */}
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                nextAyah();
              }}
              style={styles.iconBtn}
              hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
              accessibilityLabel="Next Ayah"
            >
              <Ionicons name="play-skip-forward" size={19} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Floating Lockscreen Study Action Strip (Bookmark, Mark, Add Note) */}
        <View style={[styles.studyStrip, { borderTopColor: theme.borderSubtle }]}>
          {/* Quick Bookmark Toggle */}
          <TouchableOpacity
            onPress={handleBookmarkPress}
            style={[
              styles.studyStripItem,
              bookmarked && { backgroundColor: theme.secondaryMuted },
            ]}
            hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
            accessibilityLabel={bookmarked ? 'Saved to bookmarks' : 'Bookmark Ayah'}
          >
            <Ionicons
              name={bookmarked ? 'bookmark' : 'bookmark-outline'}
              size={13}
              color={bookmarked ? theme.bookmarkIcon : theme.textSecondary}
            />
            <Text
              style={[
                styles.studyStripLabel,
                { color: bookmarked ? theme.bookmarkIcon : theme.textSecondary },
                bookmarked && { fontWeight: '700' },
              ]}
            >
              {bookmarked ? 'Saved' : 'Bookmark'}
            </Text>
          </TouchableOpacity>

          <View style={[styles.studyStripDivider, { backgroundColor: theme.borderSubtle }]} />

          {/* Quick Highlight / Mark Toggle */}
          <TouchableOpacity
            onPress={handleHighlightPress}
            style={[
              styles.studyStripItem,
              highlighted && { backgroundColor: theme.tertiaryMuted },
            ]}
            hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
            accessibilityLabel={highlighted ? 'Marked' : 'Mark Ayah'}
          >
            <Ionicons
              name={highlighted ? 'star' : 'star-outline'}
              size={13}
              color={highlighted ? theme.accentGold : theme.textSecondary}
            />
            <Text
              style={[
                styles.studyStripLabel,
                { color: highlighted ? theme.accentGold : theme.textSecondary },
                highlighted && { fontWeight: '700' },
              ]}
            >
              {highlighted ? 'Marked' : 'Mark'}
            </Text>
          </TouchableOpacity>

          <View style={[styles.studyStripDivider, { backgroundColor: theme.borderSubtle }]} />

          {/* Add / View Note */}
          <TouchableOpacity
            onPress={handleNotePress}
            style={[
              styles.studyStripItem,
              currentNote && { backgroundColor: theme.noteMuted },
            ]}
            hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
            accessibilityLabel={currentNote ? 'View / Edit Note' : 'Add Note'}
          >
            <Ionicons
              name={
                currentNote?.voiceNote && !currentNote.text
                  ? 'mic'
                  : currentNote
                    ? 'document-text'
                    : 'create-outline'
              }
              size={13}
              color={currentNote ? theme.noteAccent : theme.textSecondary}
            />
            <Text
              style={[
                styles.studyStripLabel,
                { color: currentNote ? theme.noteAccent : theme.textSecondary },
                currentNote && { fontWeight: '700' },
              ]}
            >
              {currentNote ? 'Note' : 'Add Note'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Progress Bar (Spotify Floating Pill style) */}
        <View style={[styles.progressTrack, { backgroundColor: theme.surfaceHighlight }]}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${progressPercent}%`,
                backgroundColor: isUrduPhase ? theme.accentGold : theme.primary,
              },
            ]}
          />
        </View>
      </View>

      {/* Reflection Note Editor Modal */}
      {currentAyah && currentSurahNumber && currentAyahNumber && (
        <NoteEditorModal
          visible={isNoteEditorVisible}
          surahNumber={currentSurahNumber}
          ayahNumber={currentAyahNumber}
          surahName={currentSurah?.englishName || `Surah ${currentSurahNumber}`}
          arabicText={currentAyah.arabicText}
          urduText={currentAyah.urduText}
          initialNote={currentNote?.text || ''}
          initialVoiceNote={currentNote?.voiceNote}
          onSave={(text, voiceNote) => {
            saveNote(
              currentSurahNumber,
              currentAyahNumber,
              text,
              currentAyah.arabicText,
              currentAyah.urduText,
              voiceNote
            );
            setIsNoteEditorVisible(false);
          }}
          onDelete={() => {
            deleteNote(currentSurahNumber, currentAyahNumber);
            setIsNoteEditorVisible(false);
          }}
          onClose={() => setIsNoteEditorVisible(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  floatingWrapper: {
    position: 'absolute',
    left: 10,
    right: 10,
    zIndex: 9999,
  },
  container: {
    position: 'relative',
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    paddingVertical: 8,
    paddingHorizontal: 10,
    elevation: 4,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 4,
  },
  artworkThumbnail: {
    width: 42,
    height: 42,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    position: 'relative',
  },
  artworkSurahNum: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.5,
  },
  artworkGlowDot: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  textContainer: {
    flex: 1,
    marginRight: 6,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  surahTitle: {
    fontSize: 13,
    fontWeight: '700',
    flexShrink: 1,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 9.5,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 11.5,
    marginTop: 2,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconBtn: {
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    shadowOpacity: 0,
    marginHorizontal: 2,
  },
  progressTrack: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2.5,
  },
  progressBar: {
    height: '100%',
  },
  studyStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 6,
    paddingTop: 5,
    paddingBottom: 4,
  },
  studyStripItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 4,
    borderRadius: 7,
    marginHorizontal: 2,
  },
  studyStripDivider: {
    width: StyleSheet.hairlineWidth,
    height: 12,
    opacity: 0.6,
  },
  studyStripLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
});
