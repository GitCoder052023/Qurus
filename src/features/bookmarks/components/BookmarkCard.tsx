import React from 'react';
import { View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SURAHS } from '../../../data/surahs';
import { formatStudyDate } from '../../../lib/formatDate';
import type { ThemeColors } from '../../../context/ThemeContext';
import { Bookmark } from '../../../types';
import { styles } from '../styles';

interface BookmarkCardProps {
  item: Bookmark;
  theme: ThemeColors;
  onOpen: (bm: Bookmark) => void;
  onRemove: (bm: Bookmark) => void;
}

export function BookmarkCard({ item, theme, onOpen, onRemove }: BookmarkCardProps) {
  const surah = SURAHS.find((s) => s.number === item.surahNumber);
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onOpen(item)}
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.surahTag}>
          <Ionicons name="bookmark" size={16} color={theme.bookmarkIcon} />
          <Text style={[styles.surahName, { color: theme.textPrimary }]}>
            {surah ? surah.englishName : `Surah ${item.surahNumber}`}
          </Text>
          <View style={[styles.ayahBadge, { backgroundColor: theme.primaryMuted }]}>
            <Text style={[styles.ayahBadgeText, { color: theme.primary }]}>
              {item.surahNumber}:{item.ayahNumber}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={(e: GestureResponderEvent) => {
            e.stopPropagation();
            onRemove(item);
          }}
          style={styles.deleteIconBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="trash-outline" size={18} color={theme.textTertiary} />
        </TouchableOpacity>
      </View>

      {/* Arabic Snippet */}
      {item.arabicSnippet ? (
        <Text style={[styles.arabicSnippet, { color: theme.arabicText }]} numberOfLines={2}>
          {item.arabicSnippet}
        </Text>
      ) : null}

      {/* Urdu Snippet */}
      {item.urduSnippet ? (
        <Text style={[styles.urduSnippet, { color: theme.urduText }]} numberOfLines={2}>
          {item.urduSnippet}
        </Text>
      ) : null}

      <View style={[styles.cardFooter, { borderTopColor: theme.borderSubtle }]}>
        <Text style={[styles.dateText, { color: theme.textTertiary }]}>
          Saved on {formatStudyDate(item.createdAt)}
        </Text>
        <View style={styles.resumeAction}>
          <Text style={[styles.resumeText, { color: theme.primary }]}>Continue Reading</Text>
          <Ionicons name="chevron-forward" size={14} color={theme.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
