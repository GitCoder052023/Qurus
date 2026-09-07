import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../../../context/ThemeContext';
import { CATEGORIES } from '../data/feedbackCategories';
import { styles } from '../styles/feedback.styles';

interface FeedbackCategoryGridProps {
  category: string;
  onSelectCategory: (id: string) => void;
  theme: ThemeColors;
}

export const FeedbackCategoryGrid: React.FC<FeedbackCategoryGridProps> = React.memo(
  function FeedbackCategoryGrid({ category, onSelectCategory, theme }) {
    return (
      <View style={styles.categoryGrid}>
        {CATEGORIES.map((cat) => {
          const isSelected = category === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.8}
              onPress={() => onSelectCategory(cat.id)}
              style={[
                styles.categoryCard,
                {
                  backgroundColor: isSelected ? theme.primaryMuted : theme.card,
                  borderColor: isSelected ? theme.primary : theme.borderSubtle,
                },
              ]}
            >
              <View style={styles.categoryRow}>
                <Ionicons
                  name={cat.icon}
                  size={18}
                  color={isSelected ? theme.primary : theme.textSecondary}
                />
                <Text
                  style={[
                    styles.categoryLabel,
                    { color: isSelected ? theme.primary : theme.textPrimary },
                    isSelected && { fontWeight: '700' },
                  ]}
                >
                  {cat.label}
                </Text>
              </View>
              <Text style={[styles.categoryDesc, { color: theme.textTertiary }]}>
                {cat.description}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
);
