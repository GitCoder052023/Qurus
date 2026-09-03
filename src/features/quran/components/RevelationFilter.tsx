import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import type { RevelationFilter } from '@/lib/filterSurahs';
import { styles } from '../styles';

const FILTER_TABS = ['All', 'Meccan', 'Medinan'] as const;

interface RevelationFilterRowProps {
  activeFilter: RevelationFilter;
  onChangeFilter: (filter: RevelationFilter) => void;
}

export function RevelationFilter({ activeFilter, onChangeFilter }: RevelationFilterRowProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.filterRow}>
      {FILTER_TABS.map((tab) => {
        const isActive = activeFilter === tab;
        return (
          <TouchableOpacity
            key={tab}
            onPress={() => onChangeFilter(tab)}
            style={[
              styles.filterChip,
              {
                backgroundColor: isActive ? theme.primary : theme.surface,
                borderColor: isActive ? theme.primary : theme.border,
              },
            ]}
          >
            <Text
              style={[
                styles.filterChipText,
                { color: isActive ? '#FFFFFF' : theme.textSecondary },
                isActive && { fontWeight: '700' },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
