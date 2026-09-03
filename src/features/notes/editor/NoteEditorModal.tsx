import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { styles } from './styles';

interface NoteEditorModalProps {
  visible: boolean;
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  arabicText?: string;
  urduText?: string;
  initialNote?: string;
  onSave: (text: string) => void;
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
  onSave,
  onDelete,
  onClose,
}: NoteEditorModalProps) {
  const { theme } = useTheme();
  const [noteText, setNoteText] = useState(initialNote);

  useEffect(() => {
    setNoteText(initialNote);
  }, [initialNote, visible]);

  if (!visible) return null;

  const handleSave = () => {
    onSave(noteText);
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
          {/* Header */}
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

            <TouchableOpacity onPress={handleSave} style={[styles.saveBtn, { backgroundColor: theme.primary }]}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
            {/* Verse Snippet Card */}
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

            {/* Note Input */}
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
                Personal Reflection / Study Notes:
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
                placeholder="What did you reflect upon in this ayah? Write your thoughts, questions, or lessons..."
                placeholderTextColor={theme.textTertiary}
                multiline
                textAlignVertical="top"
                autoFocus
                value={noteText}
                onChangeText={setNoteText}
              />
            </View>

            {/* Delete button if note already exists */}
            {initialNote ? (
              <TouchableOpacity
                onPress={handleDelete}
                style={[styles.deleteBtn, { borderColor: '#EF444430' }]}
              >
                <Ionicons name="trash-outline" size={18} color="#EF4444" />
                <Text style={styles.deleteBtnText}>Delete This Note</Text>
              </TouchableOpacity>
            ) : null}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}
