import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAudio } from '../context/AudioContext';
import { useTheme } from '../context/ThemeContext';
import { RECITERS } from '../data/surahs';
import { Reciter } from '../types';

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
    isBuffering,
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
  const router = useRouter();
  const [showReciterPicker, setShowReciterPicker] = useState(false);

  if (!isFullPlayerVisible || !currentSurahNumber || !currentAyahNumber) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  const handleSeekPress = (e: any) => {
    if (duration <= 0) return;
    const { locationX } = e.nativeEvent;
    // Assume full scrubber width is ~300 on typical phones, calculate relative
    // We can also let user step forward/backward 5 seconds
  };

  const handleJumpToReader = () => {
    closeFullPlayer();
    router.push(`/reader/${currentSurahNumber}?ayah=${currentAyahNumber}`);
  };

  const speeds = [0.75, 1.0, 1.25, 1.5];

  return (
    <Modal
      visible={isFullPlayerVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={closeFullPlayer}
    >
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={closeFullPlayer} style={styles.iconBtn}>
            <Ionicons name="chevron-down" size={28} color={theme.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.textSecondary }]}>Now Reciting</Text>
          <TouchableOpacity
            onPress={() => setShowReciterPicker(!showReciterPicker)}
            style={[styles.reciterBadge, { backgroundColor: theme.surface }]}
          >
            <Ionicons name="person-circle-outline" size={18} color={theme.primary} />
            <Text style={[styles.reciterBadgeText, { color: theme.primary }]} numberOfLines={1}>
              {reciter.name.split(' ')[0]}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Reciter Picker Dropdown */}
          {showReciterPicker && (
            <View style={[styles.reciterDropdown, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Text style={[styles.dropdownTitle, { color: theme.textSecondary }]}>Choose Reciter</Text>
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
                      styles.reciterItem,
                      isSelected && { backgroundColor: theme.primaryMuted },
                    ]}
                  >
                    <View>
                      <Text
                        style={[
                          styles.reciterItemName,
                          { color: isSelected ? theme.primary : theme.textPrimary },
                          isSelected && { fontWeight: '700' },
                        ]}
                      >
                        {r.name}
                      </Text>
                      <Text style={[styles.reciterItemArabic, { color: theme.textTertiary }]}>
                        {r.arabicName}
                      </Text>
                    </View>
                    {isSelected && <Ionicons name="checkmark-circle" size={20} color={theme.primary} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {/* Surah Artwork / Visual Frame */}
          <View style={[styles.artCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={[styles.artCircle, { backgroundColor: theme.surfaceHighlight }]}>
              <Text style={[styles.artNumber, { color: theme.primary }]}>{currentSurahNumber}</Text>
            </View>
            <Text style={[styles.artArabicTitle, { color: theme.arabicText }]}>
              {currentSurah?.name}
            </Text>
            <Text style={[styles.artEnglishTitle, { color: theme.textPrimary }]}>
              {currentSurah?.englishName}
            </Text>
            <Text style={[styles.artTranslation, { color: theme.textSecondary }]}>
              {currentSurah?.urduName}
            </Text>
            <View style={styles.ayahPillRow}>
              <View style={[styles.ayahPill, { backgroundColor: theme.primaryMuted }]}>
                <Text style={[styles.ayahPillText, { color: theme.primary }]}>
                  Ayah {currentAyahNumber} of {currentSurah?.numberOfAyahs}
                </Text>
              </View>

              <View
                style={[
                  styles.phasePill,
                  {
                    backgroundColor:
                      playbackPhase === 'translation' ? '#D9770620' : theme.surfaceHighlight,
                    borderColor:
                      playbackPhase === 'translation' ? theme.accentGold : theme.border,
                  },
                ]}
              >
                <Ionicons
                  name="volume-medium"
                  size={13}
                  color={playbackPhase === 'translation' ? theme.accentGold : theme.primary}
                />
                <Text
                  style={[
                    styles.phasePillText,
                    {
                      color:
                        playbackPhase === 'translation' ? theme.accentGold : theme.primary,
                    },
                  ]}
                >
                  {playbackPhase === 'translation'
                    ? 'Urdu: Shamshad Ali Khan'
                    : `Arabic: ${reciter.name.split(' ')[0]}`}
                </Text>
              </View>
            </View>
          </View>

          {/* Scrubber / Progress Bar */}
          <View style={styles.scrubberSection}>
            <View style={[styles.trackBg, { backgroundColor: theme.surfaceHighlight }]}>
              <View
                style={[
                  styles.trackFill,
                  { width: `${progressPercent}%`, backgroundColor: theme.primary },
                ]}
              />
            </View>
            <View style={styles.timeRow}>
              <Text style={[styles.timeText, { color: theme.textTertiary }]}>{formatTime(currentTime)}</Text>
              <Text style={[styles.timeText, { color: theme.textTertiary }]}>
                {duration > 0 ? formatTime(duration) : '--:--'}
              </Text>
            </View>
          </View>

          {/* Primary Audio Controls */}
          <View style={styles.controlsSection}>
            <TouchableOpacity onPress={previousAyah} style={styles.controlBtn}>
              <Ionicons name="play-skip-back" size={26} color={theme.textPrimary} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => seekTo(Math.max(0, currentTime - 5))} style={styles.controlBtn}>
              <Ionicons name="play-back" size={22} color={theme.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={togglePlayPause}
              style={[styles.mainPlayBtn, { backgroundColor: theme.primary }]}
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
              style={styles.controlBtn}
            >
              <Ionicons name="play-forward" size={22} color={theme.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity onPress={nextAyah} style={styles.controlBtn}>
              <Ionicons name="play-skip-forward" size={26} color={theme.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Speed Selector */}
          <View style={styles.speedRow}>
            <Text style={[styles.speedLabel, { color: theme.textTertiary }]}>Speed:</Text>
            {speeds.map((s) => {
              const isSelected = playbackSpeed === s;
              return (
                <TouchableOpacity
                  key={s}
                  onPress={() => setSpeed(s)}
                  style={[
                    styles.speedChip,
                    {
                      backgroundColor: isSelected ? theme.primary : theme.surface,
                      borderColor: isSelected ? theme.primary : theme.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.speedText,
                      { color: isSelected ? '#FFFFFF' : theme.textSecondary },
                      isSelected && { fontWeight: '700' },
                    ]}
                  >
                    {s}x
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Playback Mode Switcher (Arabic + Urdu / Arabic Only / Urdu Only) */}
          <View style={styles.modeSection}>
            <Text style={[styles.modeLabel, { color: theme.textTertiary }]}>Recitation Mode:</Text>
            <View style={styles.modeRow}>
              {[
                { key: 'both', label: 'Arabic + Urdu', icon: 'repeat' },
                { key: 'arabic_only', label: 'Arabic Only', icon: 'language' },
                { key: 'translation_only', label: 'Urdu Only', icon: 'chatbox-ellipses-outline' },
              ].map((m) => {
                const isSelected = playbackMode === m.key;
                return (
                  <TouchableOpacity
                    key={m.key}
                    onPress={() => setPlaybackMode(m.key as any)}
                    style={[
                      styles.modeChip,
                      {
                        backgroundColor: isSelected ? theme.primary : theme.surface,
                        borderColor: isSelected ? theme.primary : theme.border,
                      },
                    ]}
                  >
                    <Ionicons
                      name={m.icon as any}
                      size={14}
                      color={isSelected ? '#FFFFFF' : theme.textSecondary}
                    />
                    <Text
                      style={[
                        styles.modeText,
                        { color: isSelected ? '#FFFFFF' : theme.textSecondary },
                        isSelected && { fontWeight: '700' },
                      ]}
                    >
                      {m.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Jump to Reader Button */}
          <TouchableOpacity
            onPress={handleJumpToReader}
            style={[styles.jumpButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
          >
            <Ionicons name="book-outline" size={20} color={theme.primary} />
            <Text style={[styles.jumpButtonText, { color: theme.textPrimary }]}>
              Open in Quran Study Reader
            </Text>
            <Ionicons name="arrow-forward" size={18} color={theme.textTertiary} />
          </TouchableOpacity>
        </ScrollView>
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
    paddingVertical: 14,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  iconBtn: {
    padding: 6,
  },
  reciterBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  reciterBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  reciterDropdown: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    marginBottom: 20,
    elevation: 4,
  },
  dropdownTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  reciterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  reciterItemName: {
    fontSize: 14,
  },
  reciterItemArabic: {
    fontSize: 12,
    marginTop: 2,
  },
  artCard: {
    width: '100%',
    borderRadius: 24,
    borderWidth: 1,
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 28,
  },
  artCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  artNumber: {
    fontSize: 22,
    fontWeight: '800',
  },
  artArabicTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  artEnglishTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  artTranslation: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 14,
  },
  ayahPillRow: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  ayahPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ayahPillText: {
    fontSize: 13,
    fontWeight: '700',
  },
  phasePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
  },
  phasePillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  modeSection: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  modeLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  modeRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    justifyContent: 'center',
  },
  modeChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  modeText: {
    fontSize: 11,
  },
  scrubberSection: {
    width: '100%',
    marginBottom: 24,
  },
  trackBg: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    borderRadius: 3,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  controlsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 28,
  },
  controlBtn: {
    padding: 10,
  },
  mainPlayBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  speedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 28,
  },
  speedLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginRight: 4,
  },
  speedChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
  },
  speedText: {
    fontSize: 13,
  },
  jumpButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  jumpButtonText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    marginLeft: 10,
  },
});
