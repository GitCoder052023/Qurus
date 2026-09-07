import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StudyNote } from '../../../types';
import { formatDurationMs } from '../../../components/VoiceNotePlayer';
import { AyahNotesGroup, SurahNotesGroup } from '../types';
import { styles } from '../styles/notes.styles';

interface SurahNotesGroupCardProps {
  surahGroup: SurahNotesGroup;
  isSurahCollapsed: boolean;
  onToggleSurahCollapse: (surahNum: number) => void;
  collapsedAyahs: Record<string, boolean>;
  onToggleAyahCollapse: (surahNum: number, ayahNum: number) => void;
  onAddNewNoteToAyah: (ayahGroup: AyahNotesGroup) => void;
  onOpenAyahInReader: (surahNum: number, ayahNum: number) => void;
  onOpenSurahInReader: (surahNum: number) => void;
  onSelectNoteForView: (note: StudyNote) => void;
  formatDate: (timestamp: number) => string;
  theme: any;
}

export function SurahNotesGroupCard({
  surahGroup,
  isSurahCollapsed,
  onToggleSurahCollapse,
  collapsedAyahs,
  onToggleAyahCollapse,
  onAddNewNoteToAyah,
  onOpenAyahInReader,
  onOpenSurahInReader,
  onSelectNoteForView,
  formatDate,
  theme,
}: SurahNotesGroupCardProps) {
  const surah = surahGroup.surahMeta;

  return (
    <View
      style={[
        styles.surahSectionCard,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      {/* Surah Level Header */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onToggleSurahCollapse(surahGroup.surahNumber)}
        style={[styles.surahHeaderRow, { borderBottomColor: theme.borderSubtle }]}
      >
        <View style={styles.surahTitleGroup}>
          <View style={[styles.surahNumberBadge, { backgroundColor: theme.primaryMuted }]}>
            <Text style={[styles.surahNumberBadgeText, { color: theme.primary }]}>
              {surahGroup.surahNumber}
            </Text>
          </View>
          <View style={styles.surahTextCol}>
            <View style={styles.surahNameRow}>
              <Text style={[styles.surahEnglishName, { color: theme.textPrimary }]}>
                {surah ? surah.englishName : `Surah ${surahGroup.surahNumber}`}
              </Text>
              {surah ? (
                <Text style={[styles.surahArabicName, { color: theme.arabicText }]}>
                  {surah.name}
                </Text>
              ) : null}
            </View>
            <Text style={[styles.surahSubtitleText, { color: theme.textSecondary }]}>
              {surah ? `${surah.englishNameTranslation} • ` : ''}
              {surahGroup.totalNotes} {surahGroup.totalNotes === 1 ? 'reflection' : 'reflections'} across{' '}
              {surahGroup.ayahGroups.length} {surahGroup.ayahGroups.length === 1 ? 'verse' : 'verses'}
            </Text>
          </View>
        </View>

        <View style={styles.surahHeaderRight}>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              onOpenSurahInReader(surahGroup.surahNumber);
            }}
            style={[styles.openSurahBtn, { backgroundColor: theme.surfaceHighlight }]}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <Text style={[styles.openSurahBtnText, { color: theme.primary }]}>Surah</Text>
            <Ionicons name="arrow-forward" size={12} color={theme.primary} />
          </TouchableOpacity>

          <Ionicons
            name={isSurahCollapsed ? 'chevron-down' : 'chevron-up'}
            size={18}
            color={theme.textTertiary}
          />
        </View>
      </TouchableOpacity>

      {/* Ayahs in this Surah */}
      {!isSurahCollapsed && (
        <View style={styles.ayahsContainer}>
          {surahGroup.ayahGroups.map((ayahGroup) => {
            const ayahKey = `${ayahGroup.surahNumber}:${ayahGroup.ayahNumber}`;
            const isAyahCollapsed = Boolean(collapsedAyahs[ayahKey]);

            return (
              <View
                key={ayahKey}
                style={[
                  styles.ayahCard,
                  {
                    backgroundColor: theme.surface,
                    borderColor: theme.borderSubtle,
                  },
                ]}
              >
                {/* Ayah Header Bar */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => onToggleAyahCollapse(ayahGroup.surahNumber, ayahGroup.ayahNumber)}
                  style={styles.ayahHeaderRow}
                >
                  <View style={styles.ayahTagGroup}>
                    <View style={[styles.ayahBadge, { backgroundColor: theme.noteMuted }]}>
                      <Text style={[styles.ayahBadgeText, { color: theme.noteAccent }]}>
                        Ayah {ayahGroup.ayahNumber} ({ayahGroup.surahNumber}:{ayahGroup.ayahNumber})
                      </Text>
                    </View>
                    <View style={[styles.notesMiniCount, { backgroundColor: theme.chipBg }]}>
                      <Text style={[styles.notesMiniCountText, { color: theme.textSecondary }]}>
                        {ayahGroup.notes.length} {ayahGroup.notes.length === 1 ? 'note' : 'notes'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.ayahActionsGroup}>
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        onAddNewNoteToAyah(ayahGroup);
                      }}
                      style={[styles.addNoteBtn, { backgroundColor: theme.card, borderColor: theme.borderSubtle }]}
                      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                    >
                      <Ionicons name="add" size={13} color={theme.primary} />
                      <Text style={[styles.addNoteBtnText, { color: theme.primary }]}>Add</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        onOpenAyahInReader(ayahGroup.surahNumber, ayahGroup.ayahNumber);
                      }}
                      style={[styles.jumpVerseBtn, { backgroundColor: theme.card, borderColor: theme.borderSubtle }]}
                      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                    >
                      <Ionicons name="book-outline" size={12} color={theme.textSecondary} />
                      <Text style={[styles.jumpVerseBtnText, { color: theme.textSecondary }]}>Read</Text>
                    </TouchableOpacity>

                    <Ionicons
                      name={isAyahCollapsed ? 'chevron-down' : 'chevron-up'}
                      size={16}
                      color={theme.textTertiary}
                    />
                  </View>
                </TouchableOpacity>

                {/* Snippet Preview */}
                {!isAyahCollapsed && (
                  <>
                    {ayahGroup.arabicSnippet ? (
                      <Text style={[styles.arabicSnippetPreview, { color: theme.arabicText }]} numberOfLines={1}>
                        {ayahGroup.arabicSnippet}
                      </Text>
                    ) : null}

                    {ayahGroup.urduSnippet ? (
                      <Text
                        style={[
                          styles.urduSnippetPreview,
                          {
                            color: theme.urduText,
                            textAlign: /[\u0600-\u06FF]/.test(ayahGroup.urduSnippet) ? 'right' : 'left',
                            writingDirection: /[\u0600-\u06FF]/.test(ayahGroup.urduSnippet) ? 'rtl' : 'ltr',
                          },
                        ]}
                        numberOfLines={1}
                      >
                        "{ayahGroup.urduSnippet}"
                      </Text>
                    ) : null}

                    {/* Compact Note Rows */}
                    <View style={styles.notesListForAyah}>
                      {ayahGroup.notes.map((note) => {
                        const isVoice = Boolean(note.voiceNote);
                        const isText = Boolean(note.text && note.text.trim());
                        const previewSnippet = isText
                          ? note.text.trim()
                          : isVoice
                          ? `Voice note (${formatDurationMs(note.voiceNote?.durationMillis || 0)})`
                          : 'Reflection';

                        return (
                          <TouchableOpacity
                            key={note.id}
                            activeOpacity={0.72}
                            onPress={() => onSelectNoteForView(note)}
                            style={[
                              styles.compactNoteRow,
                              {
                                backgroundColor: theme.card,
                                borderColor: theme.borderSubtle,
                              },
                            ]}
                          >
                            <View style={[styles.compactNoteIconPill, { backgroundColor: theme.noteMuted }]}>
                              <Ionicons
                                name={
                                  isVoice && !isText
                                    ? 'mic'
                                    : !isVoice
                                    ? 'document-text'
                                    : 'chatbubbles'
                                }
                                size={13}
                                color={theme.noteAccent}
                              />
                            </View>

                            <Text
                              style={[styles.compactNoteSnippet, { color: theme.textPrimary }]}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {previewSnippet}
                            </Text>

                            <View style={styles.compactNoteMeta}>
                              <Text style={[styles.compactNoteDateText, { color: theme.textTertiary }]}>
                                {formatDate(note.updatedAt || note.createdAt)}
                              </Text>
                              <Ionicons name="chevron-forward" size={13} color={theme.textTertiary} />
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </>
                )}
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}
