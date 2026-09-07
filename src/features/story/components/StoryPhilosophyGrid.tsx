import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../../../context/ThemeContext';
import { styles } from '../styles/story.styles';

interface StoryPhilosophyGridProps {
  theme: ThemeColors;
}

export const StoryPhilosophyGrid: React.FC<StoryPhilosophyGridProps> = React.memo(
  function StoryPhilosophyGrid({ theme }) {
    return (
      <View style={styles.featureGrid}>
        <View
          style={[
            styles.featureCard,
            { backgroundColor: theme.cardElevated, borderColor: theme.borderSubtle },
          ]}
        >
          <View style={[styles.featureIconBox, { backgroundColor: theme.primaryMuted }]}>
            <Ionicons name="finger-print-outline" size={22} color={theme.primary} />
          </View>
          <Text style={[styles.featureTitle, { color: theme.textPrimary }]}>
            Work With Individual Verses
          </Text>
          <Text style={[styles.featureDesc, { color: theme.textSecondary }]}>
            Every single verse stands on its own. You can isolate a verse, examine it,
            repeat it, and let it prompt your own thinking.
          </Text>
        </View>

        <View
          style={[
            styles.featureCard,
            { backgroundColor: theme.cardElevated, borderColor: theme.borderSubtle },
          ]}
        >
          <View style={[styles.featureIconBox, { backgroundColor: theme.primaryMuted }]}>
            <Ionicons name="create-outline" size={22} color={theme.accentGold} />
          </View>
          <Text style={[styles.featureTitle, { color: theme.textPrimary }]}>
            A Personal Study Notebook
          </Text>
          <Text style={[styles.featureDesc, { color: theme.textSecondary }]}>
            Attach your personal reflections, questions, and doubts directly to verses. Your
            thoughts are saved privately on your device.
          </Text>
        </View>

        <View
          style={[
            styles.featureCard,
            { backgroundColor: theme.cardElevated, borderColor: theme.borderSubtle },
          ]}
        >
          <View style={[styles.featureIconBox, { backgroundColor: theme.primaryMuted }]}>
            <Ionicons name="repeat-outline" size={22} color={theme.primary} />
          </View>
          <Text style={[styles.featureTitle, { color: theme.textPrimary }]}>
            Arabic + Translation Audio
          </Text>
          <Text style={[styles.featureDesc, { color: theme.textSecondary }]}>
            Listen to the original Arabic recitation paired with Urdu translation verse by
            verse, making the meaning immediately accessible.
          </Text>
        </View>
      </View>
    );
  }
);
