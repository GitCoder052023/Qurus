import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TranslationLanguageConfig } from '../../../constants/languages';
import { styles } from '../styles/ayahItem.styles';

interface AyahHeaderBadgeProps {
  ayahNumber: number;
  isThisAyahActive: boolean;
  isRecitingTranslation: boolean;
  langConfig: TranslationLanguageConfig;
  isCompleted: boolean;
  highlighted: boolean;
  bookmarked: boolean;
  theme: any;
}

export function AyahHeaderBadge({
  ayahNumber,
  isThisAyahActive,
  isRecitingTranslation,
  langConfig,
  isCompleted,
  highlighted,
  bookmarked,
  theme,
}: AyahHeaderBadgeProps) {
  return (
    <View style={styles.headerRow}>
      <View style={styles.badgeGroup}>
        <View
          style={[
            styles.numberBadge,
            {
              backgroundColor: isThisAyahActive
                ? theme.primary
                : theme.surfaceHighlight,
            },
          ]}
        >
          <Text
            style={[
              styles.numberText,
              { color: isThisAyahActive ? theme.onPrimary : theme.textPrimary },
            ]}
          >
            {ayahNumber}
          </Text>
        </View>

        {isThisAyahActive && (
          <View
            style={[
              styles.recitingBadge,
              {
                backgroundColor: theme.primaryMuted,
              },
            ]}
          >
            <Ionicons
              name="volume-medium"
              size={14}
              color={isRecitingTranslation ? theme.accentGold : theme.primary}
            />
            <Text
              style={[
                styles.recitingText,
                { color: isRecitingTranslation ? theme.accentGold : theme.primary },
              ]}
            >
              {isRecitingTranslation ? `Reciting ${langConfig.name} Translation` : 'Reciting Arabic'}
            </Text>
          </View>
        )}
      </View>

      {/* Status badges */}
      <View style={styles.tagGroup}>
        {isCompleted && (
          <View style={[styles.statusTag, { backgroundColor: theme.primaryMuted }]}>
            <Ionicons name="checkmark-circle" size={12} color={theme.primary} />
            <Text style={[styles.statusTagText, { color: theme.primary, fontWeight: '600' }]}>
              Reflected
            </Text>
          </View>
        )}
        {highlighted && (
          <View style={[styles.statusTag, { backgroundColor: theme.surface }]}>
            <Ionicons name="star" size={12} color={theme.tertiary} />
            <Text style={[styles.statusTagText, { color: theme.textSecondary }]}>Important</Text>
          </View>
        )}
        {bookmarked && (
          <Ionicons name="bookmark" size={16} color={theme.bookmarkIcon} />
        )}
      </View>
    </View>
  );
}
