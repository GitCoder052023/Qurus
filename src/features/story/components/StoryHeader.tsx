import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../../../context/ThemeContext';
import { styles } from '../styles/story.styles';

interface StoryHeaderProps {
  theme: ThemeColors;
}

export const StoryHeader: React.FC<StoryHeaderProps> = React.memo(function StoryHeader({ theme }) {
  return (
    <View style={styles.storyHeader}>
      <View style={[styles.pillBadge, { backgroundColor: theme.primaryMuted }]}>
        <Ionicons name="leaf-outline" size={13} color={theme.primary} />
        <Text style={[styles.pillBadgeText, { color: theme.primary }]}>A founder’s note</Text>
      </View>

      <Text style={[styles.mainHeadline, { color: theme.textPrimary }]}>
        Why I Built Qurus
      </Text>

      <Text style={[styles.authorByline, { color: theme.textSecondary }]}>
        By <Text style={{ color: theme.primary, fontWeight: '700' }}>Hamdan Khubaib</Text> •
        Developer & Creator
      </Text>
    </View>
  );
});
