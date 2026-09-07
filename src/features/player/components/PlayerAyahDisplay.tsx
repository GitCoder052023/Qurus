import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VoiceNotePlayer } from '../../../components/VoiceNotePlayer';
import { Ayah, StudyNote } from '../../../types';
import { TranslationLanguageConfig } from '../../../constants/languages';
import { styles } from '../styles/fullPlayer.styles';

interface PlayerAyahDisplayProps {
  inSequence: boolean;
  onResumeSequence: () => void;
  checkpointSurahName?: string;
  checkpointAyahNumber: number;
  currentAyah: Ayah | null;
  currentNote?: StudyNote;
  translationText: string;
  langConfig: TranslationLanguageConfig;
  isArabicPhase: boolean;
  isUrduPhase: boolean;
  theme: any;
  onOpenNoteModal: () => void;
}

export function PlayerAyahDisplay({
  inSequence,
  onResumeSequence,
  checkpointSurahName,
  checkpointAyahNumber,
  currentAyah,
  currentNote,
  translationText,
  langConfig,
  isArabicPhase,
  isUrduPhase,
  theme,
  onOpenNoteModal,
}: PlayerAyahDisplayProps) {
  return (
    <View style={styles.centerStage}>
      <ScrollView
        style={styles.ayahScrollView}
        contentContainerStyle={styles.ayahScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Free Exploration Notice */}
        {!inSequence && (
          <View
            style={[
              styles.explorationBanner,
              { backgroundColor: theme.surface, borderColor: theme.borderSubtle },
            ]}
          >
            <View style={styles.explorationBannerTop}>
              <View style={[styles.explorationIconCircle, { backgroundColor: theme.chipBg }]}>
                <Ionicons name="compass-outline" size={15} color={theme.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.explorationBannerTitle, { color: theme.textPrimary }]}>
                  Free Exploration Mode
                </Text>
                <Text style={[styles.explorationBannerSub, { color: theme.textTertiary }]}>
                  Does not count towards your structured Quran Journey.
                </Text>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onResumeSequence}
              style={[styles.resumeSequenceBtn, { backgroundColor: theme.primary }]}
            >
              <Ionicons name="arrow-back" size={13} color={theme.onPrimary} />
              <Text style={[styles.resumeSequenceBtnText, { color: theme.onPrimary }]}>
                Resume Sequence at {checkpointSurahName || 'Surah'} ({checkpointAyahNumber})
              </Text>
            </TouchableOpacity>
          </View>
        )}

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
            size={13}
            color={isUrduPhase ? theme.accentGold : theme.primary}
          />
          <Text
            style={[
              styles.phaseBadgeText,
              { color: isUrduPhase ? theme.accentGold : theme.primary },
            ]}
          >
            {isArabicPhase
              ? 'Now Reciting: Original Arabic'
              : `Now Reciting: ${langConfig.name} Translation`}
          </Text>
        </View>

        {/* Dynamic Typography Arabic Card */}
        <View
          style={[
            styles.arabicCanvasCard,
            {
              backgroundColor: isArabicPhase ? theme.card : theme.card,
              borderColor: isArabicPhase ? theme.primary : theme.borderSubtle,
              borderWidth: isArabicPhase ? 2 : StyleSheet.hairlineWidth,
            },
          ]}
        >
          <Text
            style={[
              styles.arabicVerseText,
              {
                color: isArabicPhase ? theme.textPrimary : theme.textSecondary,
                opacity: isArabicPhase ? 1 : 0.85,
              },
            ]}
          >
            {currentAyah?.arabicText}
          </Text>
        </View>

        {/* Translation Card */}
        <View
          style={[
            styles.urduCanvasCard,
            {
              backgroundColor: isUrduPhase ? theme.card : theme.card,
              borderColor: isUrduPhase ? theme.accentGold : theme.borderSubtle,
              borderWidth: isUrduPhase ? 2 : StyleSheet.hairlineWidth,
            },
          ]}
        >
          <Text
            style={[
              styles.urduVerseText,
              {
                color: isUrduPhase ? theme.textPrimary : theme.textSecondary,
                textAlign: langConfig.isRTL ? 'right' : 'left',
              },
            ]}
          >
            {translationText}
          </Text>
          <Text
            style={[
              styles.urduAuthorFootnote,
              {
                color: theme.textTertiary,
                textAlign: langConfig.isRTL ? 'right' : 'left',
              },
            ]}
          >
            {`— Translation: ${langConfig.author} (${langConfig.voiceName})`}
          </Text>
        </View>

        {/* Reflection Note Preview Card */}
        {currentNote && (
          <View
            style={[
              styles.reflectionCard,
              { backgroundColor: theme.noteBg, borderColor: theme.borderSubtle },
            ]}
          >
            <TouchableOpacity activeOpacity={0.85} onPress={onOpenNoteModal}>
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
  );
}
