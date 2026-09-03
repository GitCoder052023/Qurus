import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import type { Ayah, StudyNote } from '../../../types';
import { styles } from './styles';

interface AyahNotePreviewProps {
  ayah: Ayah;
  note: StudyNote;
  onOpenNote: (ayah: Ayah) => void;
}

export function AyahNotePreview({ ayah, note, onOpenNote }: AyahNotePreviewProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onOpenNote(ayah)}
      style={[styles.noteCard, { backgroundColor: theme.noteBg, borderColor: theme.border }]}
    >
      <View style={styles.noteHeader}>
        <View style={styles.noteHeaderLeft}>
          <Ionicons name="document-text" size={14} color={theme.primary} />
          <Text style={[styles.noteTitle, { color: theme.primary }]}>My Reflection</Text>
        </View>
        <Ionicons name="pencil" size={13} color={theme.textTertiary} />
      </View>
      <Text style={[styles.noteText, { color: theme.textPrimary }]} numberOfLines={3}>
        {note.text}
      </Text>
    </TouchableOpacity>
  );
}
