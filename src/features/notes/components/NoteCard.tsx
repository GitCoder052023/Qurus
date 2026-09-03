import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SURAHS } from '../../../data/surahs';
import { formatStudyDate } from '../../../lib/formatDate';
import type { ThemeColors } from '../../../context/ThemeContext';
import { StudyNote } from '../../../types';
import { styles } from '../styles';

interface NoteCardProps {
  item: StudyNote;
  theme: ThemeColors;
  onOpenInReader: (note: StudyNote) => void;
  onEdit: (note: StudyNote) => void;
  onDelete: (note: StudyNote) => void;
}

export function NoteCard({ item, theme, onOpenInReader, onEdit, onDelete }: NoteCardProps) {
  const surah = SURAHS.find((s) => s.number === item.surahNumber);
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      {/* Header with Surah & Ayah Badge */}
      <View style={styles.cardHeader}>
        <TouchableOpacity onPress={() => onOpenInReader(item)} style={styles.surahTag}>
          <Ionicons name="journal" size={16} color={theme.primary} />
          <Text style={[styles.surahName, { color: theme.textPrimary }]}>
            {surah ? surah.englishName : `Surah ${item.surahNumber}`}
          </Text>
          <View style={[styles.ayahBadge, { backgroundColor: theme.primaryMuted }]}>
            <Text style={[styles.ayahBadgeText, { color: theme.primary }]}>
              {item.surahNumber}:{item.ayahNumber}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => onEdit(item)}
            style={styles.iconBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="create-outline" size={18} color={theme.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(item)}
            style={styles.iconBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="trash-outline" size={18} color={theme.textTertiary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Translation Snippet Preview */}
      {item.urduSnippet ? (
        <View style={[styles.verseSnippet, { backgroundColor: theme.surface }]}>
          <Text style={[styles.urduSnippet, { color: theme.urduText }]} numberOfLines={2}>
            "{item.urduSnippet}"
          </Text>
        </View>
      ) : null}

      {/* User Note Text */}
      <Text style={[styles.noteContent, { color: theme.textPrimary }]}>{item.text}</Text>

      {/* Footer */}
      <View style={[styles.cardFooter, { borderTopColor: theme.borderSubtle }]}>
        <Text style={[styles.dateText, { color: theme.textTertiary }]}>
          Updated {formatStudyDate(item.updatedAt)}
        </Text>
        <TouchableOpacity onPress={() => onOpenInReader(item)} style={styles.jumpLink}>
          <Text style={[styles.jumpLinkText, { color: theme.primary }]}>Open Verse</Text>
          <Ionicons name="arrow-forward" size={12} color={theme.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
