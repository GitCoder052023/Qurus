import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudio } from '../../../context/AudioContext';
import { useTheme } from '../../../context/ThemeContext';
import { styles } from './styles';

export function MiniPlayer() {
  const {
    currentSurahNumber,
    currentAyahNumber,
    currentSurah,
    playbackPhase,
    isPlaying,
    togglePlayPause,
    nextAyah,
    currentTime,
    duration,
    openFullPlayer,
  } = useAudio();
  const { theme } = useTheme();

  if (!currentSurahNumber || !currentAyahNumber) {
    return null;
  }

  const isUrduPhase = playbackPhase === 'translation';
  const progressPercent =
    duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  const handlePress = () => {
    openFullPlayer();
  };

  return (
    <View style={styles.outerWrapper}>
      <TouchableOpacity
        activeOpacity={0.92}
        onPress={handlePress}
        style={[
          styles.container,
          {
            backgroundColor: theme.cardElevated,
            borderColor: theme.borderSubtle,
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
                  {
                    backgroundColor: isUrduPhase ? '#D9770618' : theme.primaryMuted,
                  },
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
              style={[
                styles.playButton,
                { backgroundColor: isUrduPhase ? theme.accentGold : theme.primary },
              ]}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={19}
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
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="play-skip-forward" size={19} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
