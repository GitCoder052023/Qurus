import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StudyNote } from '../../../types';
import { styles } from '../styles/fullPlayer.styles';

interface PlayerStudyActionsBarProps {
  bookmarked: boolean;
  highlighted: boolean;
  currentNote?: StudyNote;
  onToggleBookmark: () => void;
  onToggleHighlight: () => void;
  onOpenNoteModal: () => void;
  theme: any;
}

export function PlayerStudyActionsBar({
  bookmarked,
  highlighted,
  currentNote,
  onToggleBookmark,
  onToggleHighlight,
  onOpenNoteModal,
  theme,
}: PlayerStudyActionsBarProps) {
  return (
    <View style={styles.studyActionsBar}>
      {/* Bookmark */}
      <TouchableOpacity
        onPress={onToggleBookmark}
        style={[
          styles.studyActionBtn,
          {
            backgroundColor: bookmarked ? theme.secondaryMuted : theme.chipBg,
            borderColor: bookmarked ? theme.secondary : theme.borderSubtle,
          },
        ]}
        hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
        accessibilityLabel={bookmarked ? 'Saved to bookmarks' : 'Bookmark Ayah'}
      >
        <Ionicons
          name={bookmarked ? 'bookmark' : 'bookmark-outline'}
          size={16}
          color={bookmarked ? theme.bookmarkIcon : theme.textSecondary}
        />
        <Text
          style={[
            styles.studyActionText,
            { color: bookmarked ? theme.bookmarkIcon : theme.textSecondary },
            bookmarked && { fontWeight: '700' },
          ]}
        >
          {bookmarked ? 'Saved' : 'Bookmark'}
        </Text>
      </TouchableOpacity>

      {/* Mark (Highlight) */}
      <TouchableOpacity
        onPress={onToggleHighlight}
        style={[
          styles.studyActionBtn,
          {
            backgroundColor: highlighted ? theme.tertiaryMuted : theme.chipBg,
            borderColor: highlighted ? theme.tertiary : theme.borderSubtle,
          },
        ]}
        hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
        accessibilityLabel={highlighted ? 'Marked' : 'Mark Ayah'}
      >
        <Ionicons
          name={highlighted ? 'star' : 'star-outline'}
          size={16}
          color={highlighted ? theme.accentGold : theme.textSecondary}
        />
        <Text
          style={[
            styles.studyActionText,
            { color: highlighted ? theme.accentGold : theme.textSecondary },
            highlighted && { fontWeight: '700' },
          ]}
        >
          {highlighted ? 'Marked' : 'Mark'}
        </Text>
      </TouchableOpacity>

      {/* Add / View Note */}
      <TouchableOpacity
        onPress={onOpenNoteModal}
        style={[
          styles.studyActionBtn,
          {
            backgroundColor: currentNote ? theme.noteMuted : theme.chipBg,
            borderColor: currentNote ? theme.noteAccent : theme.borderSubtle,
          },
        ]}
        hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
        accessibilityLabel={currentNote ? 'View / Edit Note' : 'Add Note'}
      >
        <Ionicons
          name={currentNote ? 'document-text' : 'create-outline'}
          size={16}
          color={currentNote ? theme.noteAccent : theme.textSecondary}
        />
        <Text
          style={[
            styles.studyActionText,
            { color: currentNote ? theme.noteAccent : theme.textSecondary },
            currentNote && { fontWeight: '700' },
          ]}
        >
          {currentNote ? 'Note' : 'Add Note'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
