import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Ayah } from '../../../types';
import { styles } from '../styles/ayahItem.styles';

interface AyahActionsToolbarProps {
  ayah: Ayah;
  isThisAyahPlaying: boolean;
  bookmarked: boolean;
  highlighted: boolean;
  notesCount: number;
  onPlayToggle: () => void;
  onBookmarkToggle: () => void;
  onHighlightToggle: () => void;
  onOpenNote: (ayah: Ayah) => void;
  onShare: () => void;
  theme: any;
}

export function AyahActionsToolbar({
  ayah,
  isThisAyahPlaying,
  bookmarked,
  highlighted,
  notesCount,
  onPlayToggle,
  onBookmarkToggle,
  onHighlightToggle,
  onOpenNote,
  onShare,
  theme,
}: AyahActionsToolbarProps) {
  return (
    <View style={[styles.toolbar, { borderTopColor: theme.borderSubtle }]}>
      {/* Play / Pause */}
      <TouchableOpacity
        onPress={onPlayToggle}
        style={[
          styles.actionButton,
          isThisAyahPlaying && { backgroundColor: theme.primaryMuted },
        ]}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons
          name={isThisAyahPlaying ? 'pause' : 'play'}
          size={18}
          color={isThisAyahPlaying ? theme.primary : theme.textSecondary}
        />
        <Text
          style={[
            styles.actionLabel,
            { color: isThisAyahPlaying ? theme.primary : theme.textSecondary },
          ]}
        >
          {isThisAyahPlaying ? 'Pause' : 'Play'}
        </Text>
      </TouchableOpacity>

      {/* Bookmark */}
      <TouchableOpacity
        onPress={onBookmarkToggle}
        style={styles.actionButton}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons
          name={bookmarked ? 'bookmark' : 'bookmark-outline'}
          size={18}
          color={bookmarked ? theme.bookmarkIcon : theme.textSecondary}
        />
        <Text
          style={[
            styles.actionLabel,
            { color: bookmarked ? theme.bookmarkIcon : theme.textSecondary },
          ]}
        >
          {bookmarked ? 'Saved' : 'Bookmark'}
        </Text>
      </TouchableOpacity>

      {/* Highlight / Mark */}
      <TouchableOpacity
        onPress={onHighlightToggle}
        style={styles.actionButton}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons
          name={highlighted ? 'star' : 'star-outline'}
          size={18}
          color={highlighted ? theme.tertiary : theme.textSecondary}
        />
        <Text
          style={[
            styles.actionLabel,
            { color: highlighted ? theme.accentGold : theme.textSecondary },
          ]}
        >
          {highlighted ? 'Marked' : 'Mark'}
        </Text>
      </TouchableOpacity>

      {/* Note */}
      <TouchableOpacity
        onPress={() => onOpenNote(ayah)}
        style={styles.actionButton}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons
          name={notesCount > 0 ? 'document-text' : 'create-outline'}
          size={18}
          color={notesCount > 0 ? theme.noteAccent : theme.textSecondary}
        />
        <Text
          style={[
            styles.actionLabel,
            { color: notesCount > 0 ? theme.noteAccent : theme.textSecondary },
          ]}
        >
          {notesCount > 0 ? `Notes (${notesCount})` : 'Add Note'}
        </Text>
      </TouchableOpacity>

      {/* Copy / Share */}
      <TouchableOpacity
        onPress={onShare}
        style={styles.actionButton}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="share-social-outline" size={17} color={theme.textTertiary} />
      </TouchableOpacity>
    </View>
  );
}
