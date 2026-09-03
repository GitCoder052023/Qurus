import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAudio } from '../context/AudioContext';
import { useTheme } from '../context/ThemeContext';

export function MiniPlayer() {
  const {
    currentSurahNumber,
    currentAyahNumber,
    currentSurah,
    playbackPhase,
    isPlaying,
    isBuffering,
    togglePlayPause,
    nextAyah,
    currentTime,
    duration,
    openFullPlayer,
  } = useAudio();
  const { theme } = useTheme();
  const router = useRouter();

  if (!currentSurahNumber || !currentAyahNumber) {
    return null;
  }

  const isUrduPhase = playbackPhase === 'translation';
  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  const handlePress = () => {
    openFullPlayer();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={handlePress}
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          shadowColor: '#000',
        },
      ]}
    >
      {/* Progress line across top */}
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

      <View style={styles.contentRow}>
        {/* Left: Surah & Ayah info */}
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={[styles.surahTitle, { color: theme.textPrimary }]} numberOfLines={1}>
              {currentSurah ? currentSurah.englishName : `Surah ${currentSurahNumber}`}
            </Text>
            <View
              style={[
                styles.badge,
                { backgroundColor: isUrduPhase ? '#D9770620' : theme.primaryMuted },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  { color: isUrduPhase ? theme.accentGold : theme.primary },
                ]}
              >
                Ayah {currentAyahNumber} • {isUrduPhase ? 'Urdu' : 'Arabic'}
              </Text>
            </View>
          </View>
          <Text style={[styles.arabicSubtitle, { color: theme.textSecondary }]} numberOfLines={1}>
            {isUrduPhase ? 'ترجمہ: شمشاد علی خان (جالندہری)' : currentSurah?.name}
          </Text>
        </View>

        {/* Right: Controls */}
        <View style={styles.controlsRow}>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              togglePlayPause();
            }}
            style={[styles.playButton, { backgroundColor: theme.primary }]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={20}
              color="#FFFFFF"
              style={!isPlaying ? { marginLeft: 2 } : undefined}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              nextAyah();
            }}
            style={styles.controlBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="play-skip-forward" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 8,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  progressTrack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  progressBar: {
    height: '100%',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  surahTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  arabicSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  playButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBtn: {
    padding: 4,
  },
});
