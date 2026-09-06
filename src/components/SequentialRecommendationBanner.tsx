import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { useStudyState } from '../context/StudyContext';
import { SURAHS } from '../data/surahs';

interface SequentialRecommendationBannerProps {
  currentSurahNumber: number;
  currentAyahNumber?: number;
  style?: ViewStyle;
}

export function SequentialRecommendationBanner({
  currentSurahNumber,
  currentAyahNumber = 1,
  style,
}: SequentialRecommendationBannerProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const {
    journeyCheckpoint,
    isAyahInSequence,
    setJourneyCheckpoint,
  } = useStudyState();

  const [isDismissed, setIsDismissed] = useState(false);

  // If this ayah is the exact in-sequence verse, no recommendation needed
  const inSequence = isAyahInSequence(currentSurahNumber, currentAyahNumber);
  if (inSequence || isDismissed) {
    return null;
  }

  const checkpointSurah = SURAHS.find((s) => s.number === journeyCheckpoint.surahNumber);
  const currentSurah = SURAHS.find((s) => s.number === currentSurahNumber);

  const handleResumeJourney = () => {
    router.push({
      pathname: '/reader/[surah]',
      params: {
        surah: String(journeyCheckpoint.surahNumber),
        ayah: String(journeyCheckpoint.ayahNumber),
      },
    });
  };

  const handleSetCheckpointHere = () => {
    setJourneyCheckpoint(currentSurahNumber, currentAyahNumber);
    setIsDismissed(true);
  };

  return (
    <View
      style={[
        styles.bannerCard,
        {
          backgroundColor: theme.surface,
          borderColor: theme.borderSubtle,
        },
        style,
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.titleGroup}>
          <View style={[styles.iconCircle, { backgroundColor: theme.chipBg }]}>
            <Ionicons name="compass-outline" size={16} color={theme.primary} />
          </View>
          <View>
            <Text style={[styles.title, { color: theme.textPrimary }]}>
              Free Exploration Mode
            </Text>
            <Text style={[styles.subPill, { color: theme.textTertiary }]}>
              Does not advance Quran Journey progress
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setIsDismissed(true)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="close" size={18} color={theme.textTertiary} />
        </TouchableOpacity>
      </View>

      <Text style={[styles.bodyText, { color: theme.textSecondary }]}>
        You are reading out of sequence. You can explore and take notes freely, but to count progress towards your continuous Quran Journey, follow the verses in order.
      </Text>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleResumeJourney}
          style={[styles.resumeBtn, { backgroundColor: theme.primary }]}
        >
          <Ionicons name="arrow-back" size={14} color={theme.onPrimary} />
          <Text style={[styles.resumeBtnText, { color: theme.onPrimary }]}>
            Resume at Surah {checkpointSurah ? checkpointSurah.englishName : journeyCheckpoint.surahNumber} ({journeyCheckpoint.ayahNumber})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSetCheckpointHere}
          style={styles.setCheckpointTouch}
        >
          <Text style={[styles.setCheckpointText, { color: theme.textTertiary }]}>
            Set here as Journey start
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerCard: {
    marginBottom: 14,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    gap: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  subPill: {
    fontSize: 11,
    marginTop: 1,
  },
  bodyText: {
    fontSize: 13,
    lineHeight: 18,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 4,
  },
  resumeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  resumeBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },
  setCheckpointTouch: {
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  setCheckpointText: {
    fontSize: 11,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
