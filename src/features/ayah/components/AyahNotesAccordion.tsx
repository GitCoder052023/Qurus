import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Ayah, StudyNote } from '../../../types';
import { formatDurationMs } from '../../../components/VoiceNotePlayer';
import { styles } from '../styles/ayahItem.styles';

interface AyahNotesAccordionProps {
  ayah: Ayah;
  ayahNotes: StudyNote[];
  onOpenNote: (ayah: Ayah, noteToEdit?: StudyNote) => void;
  onViewNote?: (ayah: Ayah, note: StudyNote) => void;
  theme: any;
}

export function AyahNotesAccordion({
  ayah,
  ayahNotes,
  onOpenNote,
  onViewNote,
  theme,
}: AyahNotesAccordionProps) {
  const [isNotesCollapsed, setIsNotesCollapsed] = useState(true);

  if (ayahNotes.length === 0) return null;

  return (
    <View style={[styles.notesContainer, { backgroundColor: theme.noteBg, borderColor: theme.border }]}>
      {/* Header Bar */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setIsNotesCollapsed(!isNotesCollapsed)}
        style={styles.notesSectionHeader}
      >
        <View style={styles.notesHeaderLeft}>
          <Ionicons name="journal" size={13} color={theme.noteAccent} />
          <Text style={[styles.notesSectionTitle, { color: theme.noteAccent }]}>
            Reflections
          </Text>
          <View style={[styles.notesCountBadge, { backgroundColor: theme.noteMuted }]}>
            <Text style={[styles.notesCountText, { color: theme.noteAccent }]}>
              {ayahNotes.length}
            </Text>
          </View>
          {isNotesCollapsed && (
            <Text
              style={[styles.collapsedSnippet, { color: theme.textSecondary }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              • {ayahNotes[0].text
                ? ayahNotes[0].text.trim()
                : ayahNotes[0].voiceNote
                ? `Voice note (${formatDurationMs(ayahNotes[0].voiceNote.durationMillis || 0)})`
                : 'Reflection'}
            </Text>
          )}
        </View>

        <View style={styles.notesHeaderRight}>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              onOpenNote(ayah);
            }}
            style={[styles.addReflectionBtn, { backgroundColor: theme.surface, borderColor: theme.borderSubtle }]}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <Ionicons name="add" size={12} color={theme.noteAccent} />
            <Text style={[styles.addReflectionBtnText, { color: theme.noteAccent }]}>Add</Text>
          </TouchableOpacity>
          <Ionicons
            name={isNotesCollapsed ? 'chevron-down' : 'chevron-up'}
            size={16}
            color={theme.textTertiary}
          />
        </View>
      </TouchableOpacity>

      {/* Expanded Compact Notes List */}
      {!isNotesCollapsed && (
        <View style={styles.compactNotesList}>
          {ayahNotes.map((n) => {
            const isVoice = Boolean(n.voiceNote);
            const isText = Boolean(n.text && n.text.trim());
            const dateStr = new Date(n.updatedAt || n.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
            });
            const previewSnippet = isText
              ? n.text.trim()
              : isVoice
              ? `Voice note (${formatDurationMs(n.voiceNote?.durationMillis || 0)})`
              : 'Reflection';

            return (
              <TouchableOpacity
                key={n.id}
                activeOpacity={0.7}
                onPress={() => (onViewNote ? onViewNote(ayah, n) : onOpenNote(ayah, n))}
                style={[
                  styles.compactNoteRow,
                  { backgroundColor: theme.card, borderColor: theme.borderSubtle },
                ]}
              >
                <View style={[styles.compactNoteIconWrap, { backgroundColor: theme.noteMuted }]}>
                  <Ionicons
                    name={isVoice && !isText ? 'mic' : !isVoice ? 'document-text' : 'chatbubbles'}
                    size={12}
                    color={theme.noteAccent}
                  />
                </View>

                <Text
                  style={[styles.compactNoteText, { color: theme.textPrimary }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {previewSnippet}
                </Text>

                <View style={styles.compactNoteRight}>
                  <Text style={[styles.compactNoteDate, { color: theme.textTertiary }]}>
                    {dateStr}
                  </Text>
                  <Ionicons name="chevron-forward" size={13} color={theme.textTertiary} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}
