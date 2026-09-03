import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { styles } from '../styles';

interface SurahSearchBarProps {
  searchQuery: string;
  onChangeSearch: (query: string) => void;
}

export function SurahSearchBar({ searchQuery, onChangeSearch }: SurahSearchBarProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.searchContainer}>
      <View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Ionicons name="search" size={20} color={theme.textTertiary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: theme.textPrimary }]}
          placeholder="Search Surah, number, or ayah (e.g. 2:255)..."
          placeholderTextColor={theme.textTertiary}
          value={searchQuery}
          onChangeText={onChangeSearch}
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => onChangeSearch('')}>
            <Ionicons name="close-circle" size={18} color={theme.textTertiary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
