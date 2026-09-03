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
                bookmarked && { backgroundColor: theme.accentGold + '20' },
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
                  backgroundColor: isUrduPhase ? '#D9770618' : theme.primaryMuted,
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
          </ScrollView>
        </View>

        {/* Bottom Section: Scrubber & Spotify Controls */}
        <View style={[styles.bottomSection, { backgroundColor: theme.background }]}>
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
              onPress={() => seekTo(Math.max(0, currentTime - 5))}
              style={styles.seekBtn}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons name="play-back" size={22} color={theme.textSecondary} />
            </TouchableOpacity>

            {/* Center Breathing Play/Pause Button */}
            <TouchableOpacity
              onPress={togglePlayPause}
              style={[
                styles.mainPlayBtn,
                {
                  backgroundColor: isUrduPhase ? theme.accentGold : theme.primary,
                  shadowColor: isUrduPhase ? theme.accentGold : theme.primary,
                },
              ]}
              activeOpacity={0.88}
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={34}
                color="#FFFFFF"
                style={!isPlaying ? { marginLeft: 3 } : undefined}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => seekTo(Math.min(duration, currentTime + 5))}
              style={styles.seekBtn}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons name="play-forward" size={22} color={theme.textSecondary} />
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
  },
  mainPlayBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
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
});
