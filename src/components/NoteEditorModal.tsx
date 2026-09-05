import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { VoiceNote } from '../types';
import { VoiceNoteComposer } from './VoiceNoteComposer';

interface NoteEditorModalProps {
  visible: boolean;
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  arabicText?: string;
  urduText?: string;
  initialNote?: string;
  initialVoiceNote?: VoiceNote;
  onSave: (text: string, voiceNote: VoiceNote | null) => void;
  onDelete?: () => void;
  onClose: () => void;
}

export function NoteEditorModal({
  visible,
  surahNumber,
  ayahNumber,
  surahName,
  arabicText,
  urduText,
  initialNote = '',
  initialVoiceNote,
  onSave,
  onDelete,
  onClose,
}: NoteEditorModalProps) {
  const { theme } = useTheme();
  const [noteText, setNoteText] = useState(initialNote);
  const [voiceNote, setVoiceNote] = useState<VoiceNote | null>(initialVoiceNote ?? null);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);

  useEffect(() => {
    if (!visible) return;
    setNoteText(initialNote);
    setVoiceNote(initialVoiceNote ?? null);
    setIsRecordingVoice(false);
  }, [initialNote, initialVoiceNote, visible]);

  const hasExistingNote = Boolean(initialNote.trim() || initialVoiceNote);
  const canSave = Boolean(noteText.trim() || voiceNote);

  const handleSave = () => {
    onSave(noteText, voiceNote);
    onClose();
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={[styles.header, { borderBottomColor: theme.border }]}>
            <TouchableOpacity onPress={onClose} style={styles.headerBtn}>
              <Text style={[styles.headerBtnText, { color: theme.textSecondary }]}>Cancel</Text>
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>Study Note</Text>
              <Text style={[styles.headerSubtitle, { color: theme.primary }]}>
                {surahName} {surahNumber}:{ayahNumber}
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleSave}
              disabled={isRecordingVoice || (!canSave && !hasExistingNote)}
              style={[
                styles.saveBtn,
                {
                  backgroundColor: theme.primary,
                  opacity: isRecordingVoice || (!canSave && !hasExistingNote) ? 0.5 : 1,
                },
              ]}
            >
              <Text style={[styles.saveBtnText, { color: theme.onPrimary }]}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[styles.verseSnippet, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              {arabicText ? (
                <Text style={[styles.arabicPreview, { color: theme.arabicText }]} numberOfLines={3}>
                  {arabicText}
                </Text>
              ) : null}
              {urduText ? (
                <Text style={[styles.urduPreview, { color: theme.urduText }]} numberOfLines={2}>
                  {urduText}
                </Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
                Written reflection
              </Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                    color: theme.textPrimary,
                  },
                ]}
                placeholder="What did this ayah bring up for you? Write it here, or record a voice note below."
                placeholderTextColor={theme.textTertiary}
                multiline
                textAlignVertical="top"
                value={noteText}
                onChangeText={setNoteText}
              />
            </View>

            <VoiceNoteComposer
              value={voiceNote}
              onChange={setVoiceNote}
              onRecordingChange={setIsRecordingVoice}
            />

            {hasExistingNote ? (
              <TouchableOpacity
                onPress={handleDelete}
                style={[styles.deleteBtn, { borderColor: theme.destructive + '40' }]}
              >
                <Ionicons name="trash-outline" size={18} color={theme.destructive} />
                <Text style={[styles.deleteBtnText, { color: theme.destructive }]}>Delete this note</Text>
              </TouchableOpacity>
            ) : null}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
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
    minHeight: 44,
    justifyContent: 'center',
  },
  headerBtnText: {
    fontSize: 15,
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
  saveBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 14,
    minHeight: 32,
    justifyContent: 'center',
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  verseSnippet: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 16,
  },
  arabicPreview: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 8,
  },
  urduPreview: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    minHeight: 140,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    fontSize: 15,
    lineHeight: 24,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  deleteBtnText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
