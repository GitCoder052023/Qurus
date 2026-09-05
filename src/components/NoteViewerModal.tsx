import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { StudyNote } from '../types';
import { VoiceNotePlayer } from './VoiceNotePlayer';

interface NoteViewerModalProps {
  visible: boolean;
  note: StudyNote | null;
  surahName: string;
  arabicText?: string;
  urduText?: string;
  onClose: () => void;
  onEdit: (note: StudyNote) => void;
  onDelete: (noteId: string) => void;
  onOpenInReader?: (surahNumber: number, ayahNumber: number) => void;
}

export function NoteViewerModal({
  visible,
  note,
  surahName,
  arabicText,
  urduText,
  onClose,
  onEdit,
  onDelete,
  onOpenInReader,
}: NoteViewerModalProps) {
  const { theme } = useTheme();

  if (!note) return null;

  const isVoice = Boolean(note.voiceNote);
  const isText = Boolean(note.text && note.text.trim());

  const arabicSnippet = arabicText || note.arabicSnippet;
  const urduSnippet = urduText || note.urduSnippet;

  const formatTimestamp = (timestamp: number) => {
    const d = new Date(timestamp);
    const datePart = d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const timePart = d.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    });
    return `${datePart} at ${timePart}`;
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Reflection',
      `Are you sure you want to delete this reflection on ${surahName} ${note.surahNumber}:${note.ayahNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            onDelete(note.id);
            onClose();
          },
        },
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: theme.borderSubtle }]}>
          <TouchableOpacity onPress={onClose} style={styles.headerBtn}>
            <Text style={[styles.headerBtnText, { color: theme.textSecondary }]}>Done</Text>
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>Reflection</Text>
            <Text style={[styles.headerSubtitle, { color: theme.primary }]}>
              {surahName} {note.surahNumber}:{note.ayahNumber}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              onClose();
              onEdit(note);
            }}
            style={styles.headerBtn}
          >
            <Ionicons name="create-outline" size={20} color={theme.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Verse Context Box */}
          {(arabicSnippet || urduSnippet) && (
            <View
              style={[
                styles.verseCard,
                { backgroundColor: theme.surface, borderColor: theme.borderSubtle },
              ]}
            >
              <View style={styles.verseHeaderRow}>
                <View style={[styles.verseTag, { backgroundColor: theme.noteMuted }]}>
                  <Text style={[styles.verseTagText, { color: theme.noteAccent }]}>
                    Ayah {note.ayahNumber} ({note.surahNumber}:{note.ayahNumber})
                  </Text>
                </View>
                {onOpenInReader && (
                  <TouchableOpacity
                    onPress={() => {
                      onClose();
                      onOpenInReader(note.surahNumber, note.ayahNumber);
                    }}
                    style={styles.readerLinkBtn}
                  >
                    <Text style={[styles.readerLinkText, { color: theme.primary }]}>
                      Open in Reader
                    </Text>
                    <Ionicons name="arrow-forward" size={12} color={theme.primary} />
                  </TouchableOpacity>
                )}
              </View>

              {arabicSnippet ? (
                <Text style={[styles.arabicText, { color: theme.arabicText }]} selectable>
                  {arabicSnippet}
                </Text>
              ) : null}

              {urduSnippet ? (
                <Text style={[styles.urduText, { color: theme.urduText }]} selectable>
                  "{urduSnippet}"
                </Text>
              ) : null}
            </View>
          )}

          {/* Reflection Content Card */}
          <View
            style={[
              styles.reflectionCard,
              { backgroundColor: theme.card, borderColor: theme.borderSubtle },
            ]}
          >
            {/* Meta Row */}
            <View style={[styles.reflectionMetaRow, { borderBottomColor: theme.borderSubtle }]}>
              <View style={[styles.typePill, { backgroundColor: theme.noteMuted }]}>
                <Ionicons
                  name={
                    isVoice && !isText
                      ? 'mic'
                      : !isVoice
                      ? 'document-text'
                      : 'chatbubbles'
                  }
                  size={14}
                  color={theme.noteAccent}
                />
                <Text style={[styles.typePillText, { color: theme.noteAccent }]}>
                  {isVoice && !isText
                    ? 'Voice Note'
                    : !isVoice
                    ? 'Written Note'
                    : 'Voice & Written'}
                </Text>
              </View>

              <Text style={[styles.timestampText, { color: theme.textTertiary }]}>
                {formatTimestamp(note.updatedAt || note.createdAt)}
              </Text>
            </View>

            {/* Voice Player (Full Player) */}
            {isVoice && note.voiceNote ? (
              <View style={styles.voiceSection}>
                <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>
                  Audio Recording
                </Text>
                <VoiceNotePlayer voiceNote={note.voiceNote} compact={false} />
              </View>
            ) : null}

            {/* Written Reflection */}
            {isText ? (
              <View style={styles.textSection}>
                {isVoice ? (
                  <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>
                    Written Notes
                  </Text>
                ) : null}
                <Text style={[styles.noteBodyText, { color: theme.textPrimary }]} selectable>
                  {note.text}
                </Text>
              </View>
            ) : null}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsFooter}>
            <TouchableOpacity
              onPress={() => {
                onClose();
                onEdit(note);
              }}
              style={[
                styles.actionBtn,
                styles.editBtn,
                { backgroundColor: theme.primaryMuted, borderColor: theme.primary },
              ]}
            >
              <Ionicons name="create-outline" size={17} color={theme.primary} />
              <Text style={[styles.actionBtnText, { color: theme.primary }]}>
                Edit Reflection
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDelete}
              style={[
                styles.actionBtn,
                styles.deleteBtn,
                { borderColor: theme.destructive + '50' },
              ]}
            >
              <Ionicons name="trash-outline" size={17} color={theme.destructive} />
              <Text style={[styles.actionBtnText, { color: theme.destructive }]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerBtn: {
    padding: 6,
    minHeight: 40,
    justifyContent: 'center',
  },
  headerBtnText: {
    fontSize: 15,
    fontWeight: '600',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  verseCard: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    marginBottom: 16,
  },
  verseHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  verseTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  verseTagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  readerLinkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readerLinkText: {
    fontSize: 12,
    fontWeight: '600',
  },
  arabicText: {
    fontSize: 20,
    lineHeight: 34,
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily: 'serif',
    marginBottom: 10,
  },
  urduText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily: 'serif',
  },
  reflectionCard: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    marginBottom: 20,
  },
  reflectionMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 14,
  },
  typePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  typePillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  timestampText: {
    fontSize: 11,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  voiceSection: {
    marginBottom: 16,
  },
  textSection: {
    marginTop: 4,
  },
  noteBodyText: {
    fontSize: 15,
    lineHeight: 24,
  },
  actionsFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  editBtn: {},
  deleteBtn: {
    backgroundColor: 'transparent',
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
