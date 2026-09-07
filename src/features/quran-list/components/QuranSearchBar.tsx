import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../../../context/ThemeContext';
import { styles } from '../styles/quranList.styles';

interface QuranSearchBarProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onClear: () => void;
  theme: ThemeColors;
}

export const QuranSearchBar: React.FC<QuranSearchBarProps> = React.memo(
  function QuranSearchBar({ searchQuery, onSearchChange, onClear, theme }) {
    return (
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Ionicons name="search" size={20} color={theme.textTertiary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: theme.textPrimary }]}
            placeholder="Search Surah, number, or ayah (e.g. 2:255)..."
            placeholderTextColor={theme.textTertiary}
            value={searchQuery}
            onChangeText={onSearchChange}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={onClear}>
              <Ionicons name="close-circle" size={18} color={theme.textTertiary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
);
