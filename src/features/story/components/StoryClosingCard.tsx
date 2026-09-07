import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../../../context/ThemeContext';
import { styles } from '../styles/story.styles';

interface StoryClosingCardProps {
  onStartStudying: () => void;
  theme: ThemeColors;
}

export const StoryClosingCard: React.FC<StoryClosingCardProps> = React.memo(
  function StoryClosingCard({ onStartStudying, theme }) {
    return (
      <View style={[styles.closingCard, { backgroundColor: theme.cardElevated, borderColor: theme.borderSubtle }]}>
        <View style={styles.closingTopRow}>
          <View style={[styles.avatarCircle, { backgroundColor: theme.primary }]}>
            <Text style={[styles.avatarInitial, { color: theme.onPrimary }]}>H</Text>
          </View>
          <View>
            <Text style={[styles.closingName, { color: theme.textPrimary }]}>Hamdan Khubaib</Text>
            <Text style={[styles.closingTitle, { color: theme.textSecondary }]}>
              Creator of Qurus
            </Text>
          </View>
        </View>

        <Text style={[styles.closingBody, { color: theme.textPrimary }]}>
          If Qurus helps even one person discover a verse that challenges their thinking, sparks genuine curiosity, and makes space for honest reflection, then every single line of code has fulfilled its purpose.
        </Text>

        <Text style={[styles.closingDua, { color: theme.textSecondary }]}>
          Wishing you clarity of mind, deep perspective, and an open, fulfilling journey of truth-seeking.
        </Text>

        <View style={[styles.signatureDivider, { backgroundColor: theme.borderSubtle }]} />

        <TouchableOpacity
          onPress={onStartStudying}
          activeOpacity={0.88}
          style={[styles.startBtn, { backgroundColor: theme.primary }]}
        >
          <Text style={[styles.startBtnText, { color: theme.onPrimary }]}>Start with Chapter 1</Text>
          <Ionicons name="arrow-forward" size={18} color={theme.onPrimary} />
        </TouchableOpacity>
      </View>
    );
  }
);
