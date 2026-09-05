import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAudio } from '../context/AudioContext';
import { useTheme } from '../context/ThemeContext';
import { useStudyState } from '../context/StudyContext';
import { NoteEditorModal } from './NoteEditorModal';
import { VoiceNotePlayer } from './VoiceNotePlayer';
import { getAyah } from '../data/surahLoader';
import { RECITERS } from '../data/surahs';
import { PlaybackMode } from '../types';

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
    seekBackward,
    seekForward,
    currentTime,
    duration,
    playbackSpeed,
    setSpeed,
    reciter,
    setReciter,
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent =
    duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

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

  const getModeLabel = (mode: PlaybackMode) => {
    switch (mode) {
      case 'both':
        return 'Arabic + Urdu';
      case 'arabic_only':
        return 'Arabic Only';
      case 'translation_only':
        return 'Urdu Only';
    }
  };

  return (
    <Modal
      visible={isFullPlayerVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={closeFullPlayer}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Minimal Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={closeFullPlayer}
            style={[styles.headerBtn, { backgroundColor: theme.chipBg }]}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons name="chevron-down" size={24} color={theme.textPrimary} />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={[styles.headerSurahEnglish, { color: theme.textPrimary }]} numberOfLines={1}>
              {currentSurah?.englishName}
            </Text>
            <Text style={[styles.headerSurahArabic, { color: theme.textSecondary }]} numberOfLines={1}>
              {currentSurah?.name} • Ayah {currentAyahNumber} of {currentSurah?.numberOfAyahs}
            </Text>
          </View>

          <View style={styles.headerRightGroup}>
            <TouchableOpacity
              onPress={handleBookmarkToggle}
              style={[
                styles.headerBtn,
                { backgroundColor: theme.chipBg },
                bookmarked && { backgroundColor: theme.secondaryMuted },
              ]}
            >
              <Ionicons
                name={bookmarked ? 'bookmark' : 'bookmark-outline'}
                size={20}
                color={bookmarked ? theme.bookmarkIcon : theme.textSecondary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowReciterPicker(!showReciterPicker)}
              style={[styles.headerBtn, { backgroundColor: theme.chipBg }]}
            >
              <Ionicons name="mic-outline" size={19} color={theme.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Reciter Selector Dropdown */}
        {showReciterPicker && (
          <View style={[styles.reciterCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.reciterCardHeader}>
              <Text style={[styles.reciterCardTitle, { color: theme.textSecondary }]}>Select Arabic Reciter</Text>
              <TouchableOpacity onPress={() => setShowReciterPicker(false)}>
                <Ionicons name="close-circle" size={20} color={theme.textTertiary} />
              </TouchableOpacity>
            </View>
            {RECITERS.map((r) => {
              const isSelected = r.id === reciter.id;
              return (
                <TouchableOpacity
                  key={r.id}
                  onPress={() => {
                    setReciter(r);
                    setShowReciterPicker(false);
                  }}
                  style={[
                    styles.reciterOption,
                    isSelected && { backgroundColor: theme.primaryMuted },
                  ]}
                >
                  <View style={styles.reciterOptionInfo}>
                    <Text
                      style={[
                        styles.reciterOptionName,
                        { color: isSelected ? theme.primary : theme.textPrimary },
                        isSelected && { fontWeight: '700' },
                      ]}
                    >
                      {r.name}
                    </Text>
                    <Text style={[styles.reciterOptionArabic, { color: theme.textTertiary }]}>
                      {r.arabicName}
                    </Text>
                  </View>
                  {isSelected && <Ionicons name="checkmark-circle" size={18} color={theme.primary} />}
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Center Stage: The Synced Ayah Canvas (Spotify Lyrics / Canvas style) */}
        <View style={styles.centerStage}>
          <ScrollView
            style={styles.ayahScrollView}
            contentContainerStyle={styles.ayahScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Real-time Recitation Phase Badge */}
            <View
              style={[
                styles.phaseBadge,
                {
                  backgroundColor: isUrduPhase ? theme.primaryMuted : theme.primaryMuted,
                  borderColor: isUrduPhase ? theme.accentGold : theme.primary,
                },
              ]}
            >
              <Ionicons
                name="volume-medium"
                size={14}
                color={isUrduPhase ? theme.accentGold : theme.primary}
              />
              <Text
                style={[
                  styles.phaseBadgeText,
                  { color: isUrduPhase ? theme.accentGold : theme.primary },
                ]}
              >
                {isUrduPhase
                  ? 'Reciting Urdu Translation • Shamshad Ali Khan'
                  : `Reciting Arabic Verse • ${reciter.name.split(' ')[0]}`}
              </Text>
            </View>

            {/* Quranic Arabic Text */}
            <View
              style={[
                styles.arabicCanvasCard,
                isArabicPhase && [
                  styles.activePhaseCard,
                  {
                    backgroundColor: theme.arabicHighlight,
                    borderColor: theme.primary,
                  },
                ],
                !isArabicPhase && {
                  backgroundColor: theme.card,
                  borderColor: theme.borderSubtle,
                  opacity: 0.85,
                },
              ]}
            >
              <Text
                style={[
                  styles.arabicVerseText,
                  { color: isArabicPhase ? theme.arabicText : theme.textSecondary },
                  isArabicPhase && styles.activeVerseGlow,
                ]}
                selectable
              >
                {currentAyah?.arabicText || '...'}
              </Text>
            </View>

            {/* Urdu Translation Text */}
            <View
              style={[
                styles.urduCanvasCard,
                isUrduPhase && [
                  styles.activePhaseCard,
                  {
                    backgroundColor: theme.urduHighlight,
                    borderColor: theme.accentGold,
                  },
                ],
                !isUrduPhase && {
                  backgroundColor: theme.card,
                  borderColor: theme.borderSubtle,
                  opacity: 0.85,
                },
              ]}
            >
              <Text
                style={[
                  styles.urduVerseText,
                  { color: isUrduPhase ? theme.textPrimary : theme.textSecondary },
                  isUrduPhase && { fontWeight: '600' },
                ]}
                selectable
              >
                {currentAyah?.urduText || '...'}
              </Text>
              <Text style={[styles.urduAuthorFootnote, { color: theme.textTertiary }]}>
                — ترجمہ: فتح محمد جالندھری
              </Text>
            </View>

            {/* Reflection Note Preview Card (if user has added a reflection) */}
            {currentNote && (
              <View
                style={[
                  styles.reflectionCard,
                  { backgroundColor: theme.noteBg, borderColor: theme.borderSubtle },
                ]}
              >
                <TouchableOpacity activeOpacity={0.85} onPress={() => setShowNoteModal(true)}>
                  <View style={styles.reflectionHeader}>
                    <View style={styles.reflectionHeaderLeft}>
                      <Ionicons
                        name={currentNote.voiceNote ? 'mic' : 'document-text'}
                        size={13}
                        color={theme.noteAccent}
                      />
                      <Text style={[styles.reflectionTitle, { color: theme.noteAccent }]}>Your Reflection</Text>
                    </View>
                    <Ionicons name="pencil" size={12} color={theme.textTertiary} />
                  </View>
                  {currentNote.text ? (
                    <Text style={[styles.reflectionText, { color: theme.textPrimary }]} numberOfLines={2}>
                      {currentNote.text}
                    </Text>
                  ) : null}
                </TouchableOpacity>
                {currentNote.voiceNote ? (
                  <View style={{ marginTop: 8 }}>
                    <VoiceNotePlayer voiceNote={currentNote.voiceNote} compact />
                  </View>
                ) : null}
              </View>
            )}
          </ScrollView>
        </View>

        {/* Bottom Section: Scrubber & Spotify Controls */}
        <View style={[styles.bottomSection, { backgroundColor: theme.background }]}>
          {/* Ayah Study Actions Bar (Bookmark, Mark, Add Note) */}
          <View style={styles.studyActionsBar}>
            {/* Bookmark */}
            <TouchableOpacity
              onPress={handleBookmarkToggle}
              style={[
                styles.studyActionBtn,
                {
                  backgroundColor: bookmarked ? theme.secondaryMuted : theme.chipBg,
                  borderColor: bookmarked ? theme.secondary : theme.borderSubtle,
                },
              ]}
              hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
              accessibilityLabel={bookmarked ? 'Saved to bookmarks' : 'Bookmark Ayah'}
            >
              <Ionicons
                name={bookmarked ? 'bookmark' : 'bookmark-outline'}
                size={16}
                color={bookmarked ? theme.bookmarkIcon : theme.textSecondary}
              />
              <Text
                style={[
                  styles.studyActionText,
                  { color: bookmarked ? theme.bookmarkIcon : theme.textSecondary },
                  bookmarked && { fontWeight: '700' },
                ]}
              >
                {bookmarked ? 'Saved' : 'Bookmark'}
              </Text>
            </TouchableOpacity>

            {/* Mark (Highlight) */}
            <TouchableOpacity
              onPress={handleHighlightToggle}
              style={[
                styles.studyActionBtn,
                {
                  backgroundColor: highlighted ? theme.tertiaryMuted : theme.chipBg,
                  borderColor: highlighted ? theme.tertiary : theme.borderSubtle,
                },
              ]}
              hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
              accessibilityLabel={highlighted ? 'Marked' : 'Mark Ayah'}
            >
              <Ionicons
                name={highlighted ? 'star' : 'star-outline'}
                size={16}
                color={highlighted ? theme.accentGold : theme.textSecondary}
              />
              <Text
                style={[
                  styles.studyActionText,
                  { color: highlighted ? theme.accentGold : theme.textSecondary },
                  highlighted && { fontWeight: '700' },
                ]}
              >
                {highlighted ? 'Marked' : 'Mark'}
              </Text>
            </TouchableOpacity>

            {/* Add / View Note */}
            <TouchableOpacity
              onPress={() => setShowNoteModal(true)}
              style={[
                styles.studyActionBtn,
                {
                  backgroundColor: currentNote ? theme.noteMuted : theme.chipBg,
                  borderColor: currentNote ? theme.noteAccent : theme.borderSubtle,
                },
              ]}
              hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
              accessibilityLabel={currentNote ? 'View / Edit Note' : 'Add Note'}
            >
              <Ionicons
                name={currentNote ? 'document-text' : 'create-outline'}
                size={16}
                color={currentNote ? theme.noteAccent : theme.textSecondary}
              />
              <Text
                style={[
                  styles.studyActionText,
                  { color: currentNote ? theme.noteAccent : theme.textSecondary },
                  currentNote && { fontWeight: '700' },
                ]}
              >
                {currentNote ? 'Note' : 'Add Note'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Scrubber Progress Bar */}
          <View style={styles.scrubberSection}>
            <View style={[styles.trackBg, { backgroundColor: theme.surfaceHighlight }]}>
              <View
                style={[
                  styles.trackFill,
                  {
                    width: `${progressPercent}%`,
                    backgroundColor: isUrduPhase ? theme.accentGold : theme.primary,
                  },
                ]}
              />
            </View>
            <View style={styles.timeRow}>
              <Text style={[styles.timeText, { color: theme.textTertiary }]}>
                {formatTime(currentTime)}
              </Text>
              <Text style={[styles.timeText, { color: theme.textTertiary }]}>
                {duration > 0 ? formatTime(duration) : '--:--'}
              </Text>
            </View>
          </View>

          {/* Symmetrical Spotify-Style Audio Controls */}
          <View style={styles.controlsRow}>
            <TouchableOpacity
              onPress={previousAyah}
              style={styles.skipBtn}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons name="play-skip-back" size={26} color={theme.textPrimary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => seekBackward(10)}
              style={styles.seekBtn}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessibilityLabel="Seek backward 10 seconds"
            >
              <Ionicons name="play-back" size={22} color={theme.textSecondary} />
              <Text style={[styles.seekBadgeText, { color: theme.textSecondary }]}>10s</Text>
            </TouchableOpacity>

            {/* Center Breathing Play/Pause Button */}
            <TouchableOpacity
              onPress={togglePlayPause}
              style={[
                styles.mainPlayBtn,
                {
                  backgroundColor: theme.primary,
                  shadowColor: theme.primary,
                },
              ]}
              activeOpacity={0.88}
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={34}
                color={theme.onPrimary}
                style={!isPlaying ? { marginLeft: 3 } : undefined}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => seekForward(10)}
              style={styles.seekBtn}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessibilityLabel="Seek forward 10 seconds"
            >
              <Ionicons name="play-forward" size={22} color={theme.textSecondary} />
              <Text style={[styles.seekBadgeText, { color: theme.textSecondary }]}>10s</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={nextAyah}
              style={styles.skipBtn}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons name="play-skip-forward" size={26} color={theme.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Bottom Utility Chips (Minimal & Clean) */}
          <View style={styles.utilitiesRow}>
            <TouchableOpacity
              onPress={handleCyclePlaybackMode}
              style={[styles.utilChip, { backgroundColor: theme.chipBg, borderColor: theme.borderSubtle }]}
            >
              <Ionicons name="repeat" size={13} color={theme.primary} />
              <Text style={[styles.utilChipText, { color: theme.textPrimary }]}>
                {getModeLabel(playbackMode)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCycleSpeed}
              style={[styles.utilChip, { backgroundColor: theme.chipBg, borderColor: theme.borderSubtle }]}
            >
              <Ionicons name="speedometer-outline" size={13} color={theme.textSecondary} />
              <Text style={[styles.utilChipText, { color: theme.textPrimary }]}>
                {playbackSpeed}x
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleJumpToReader}
              style={[
                styles.utilChip,
                styles.readerJumpChip,
                { backgroundColor: theme.primaryMuted, borderColor: theme.primary },
              ]}
            >
              <Ionicons name="book-outline" size={13} color={theme.primary} />
              <Text style={[styles.utilChipText, { color: theme.primary, fontWeight: '700' }]}>
                Study in Reader
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Study Note Editor Modal */}
        {currentAyah && currentSurahNumber && currentAyahNumber && (
          <NoteEditorModal
            visible={showNoteModal}
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
              setShowNoteModal(false);
            }}
            onDelete={() => {
              deleteNote(currentSurahNumber, currentAyahNumber);
              setShowNoteModal(false);
            }}
            onClose={() => setShowNoteModal(false)}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  headerSurahEnglish: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  headerSurahArabic: {
    fontSize: 12,
    marginTop: 2,
  },
  headerRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reciterCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    zIndex: 10,
  },
  reciterCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  reciterCardTitle: {
    fontSize: 12,
    fontWeight: '600',
  },
  reciterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  reciterOptionInfo: {
    flex: 1,
  },
  reciterOptionName: {
    fontSize: 13,
  },
  reciterOptionArabic: {
    fontSize: 11,
    marginTop: 1,
  },
  centerStage: {
    flex: 1,
    paddingHorizontal: 20,
  },
  ayahScrollView: {
    flex: 1,
  },
  ayahScrollContent: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  phaseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
  },
  phaseBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  arabicCanvasCard: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 14,
  },
  activePhaseCard: {
    borderWidth: 1.5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  arabicVerseText: {
    fontSize: 24,
    lineHeight: 46,
    textAlign: 'center',
    writingDirection: 'rtl',
    fontFamily: 'serif',
  },
  activeVerseGlow: {
    fontWeight: '700',
  },
  urduCanvasCard: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  urduVerseText: {
    fontSize: 16,
    lineHeight: 28,
    textAlign: 'center',
    writingDirection: 'rtl',
    fontFamily: 'serif',
  },
  urduAuthorFootnote: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 8,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 12 : 20,
  },
  scrubberSection: {
    width: '100%',
    marginBottom: 18,
  },
  trackBg: {
    height: 5,
    borderRadius: 2.5,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    borderRadius: 2.5,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  skipBtn: {
    padding: 8,
  },
  seekBtn: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seekBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    marginTop: 1,
  },
  mainPlayBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    shadowOpacity: 0,
  },
  utilitiesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  utilChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
  },
  readerJumpChip: {
    borderWidth: 1,
  },
  utilChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  studyActionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 16,
  },
  studyActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  studyActionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  reflectionCard: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 4,
    marginBottom: 10,
  },
  reflectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reflectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  reflectionTitle: {
    fontSize: 11,
    fontWeight: '700',
  },
  reflectionText: {
    fontSize: 12,
    lineHeight: 18,
  },
});
