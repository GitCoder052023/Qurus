import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../../../context/ThemeContext';
import { styles } from '../styles/quranList.styles';

interface QuranEmptyStateProps {
  searchQuery: string;
  theme: ThemeColors;
}

export const QuranEmptyState: React.FC<QuranEmptyStateProps> = React.memo(
  function QuranEmptyState({ searchQuery, theme }) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="search-outline" size={36} color={theme.textTertiary} />
        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
          No Surahs found matching "{searchQuery}"
        </Text>
      </View>
    );
  }
);
