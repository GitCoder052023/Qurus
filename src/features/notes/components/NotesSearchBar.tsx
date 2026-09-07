import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/notes.styles';

interface NotesSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  theme: any;
}

export function NotesSearchBar({
  searchQuery,
  onSearchChange,
  theme,
}: NotesSearchBarProps) {
  return (
    <View style={styles.searchContainer}>
      <View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Ionicons name="search" size={18} color={theme.textTertiary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: theme.textPrimary }]}
          placeholder="Search reflections, surah, or verse (e.g. 2:255)..."
          placeholderTextColor={theme.textTertiary}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => onSearchChange('')}>
            <Ionicons name="close-circle" size={16} color={theme.textTertiary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
