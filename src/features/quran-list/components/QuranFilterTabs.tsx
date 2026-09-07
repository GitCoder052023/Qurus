import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeColors } from '../../../context/ThemeContext';
import { SurahFilterType } from '../types';
import { styles } from '../styles/quranList.styles';

interface QuranFilterTabsProps {
  activeFilter: SurahFilterType;
  onSelectFilter: (filter: SurahFilterType) => void;
  theme: ThemeColors;
}

const TABS: SurahFilterType[] = ['All', 'Meccan', 'Medinan'];

export const QuranFilterTabs: React.FC<QuranFilterTabsProps> = React.memo(
  function QuranFilterTabs({ activeFilter, onSelectFilter, theme }) {
    return (
      <View style={styles.filterRow}>
        {TABS.map((tab) => {
          const isActive = activeFilter === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => onSelectFilter(tab)}
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
                  { color: isActive ? theme.onPrimary : theme.textSecondary },
                  isActive && { fontWeight: '600' },
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
);
