import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import type { Ayah, Reciter } from '../../../types';
import { styles } from './styles';

interface AyahCanvasProps {
  currentAyah: Ayah | null;
  reciter: Reciter;
  isArabicPhase: boolean;
  isUrduPhase: boolean;
}

export function AyahCanvas({
  currentAyah,
  reciter,
  isArabicPhase,
  isUrduPhase,
}: AyahCanvasProps) {
  const { theme } = useTheme();

  return (
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
  );
}
