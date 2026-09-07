import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '../../../context/ThemeContext';
import { styles } from '../styles/story.styles';

interface StoryActivityTagsProps {
  theme: ThemeColors;
}

const ACTIVITIES = [
  { icon: 'barbell-outline', text: 'At the gym lifting weights' },
  { icon: 'train-outline', text: 'Commuting on the train' },
  { icon: 'car-outline', text: 'Driving in traffic' },
  { icon: 'walk-outline', text: 'Walking in the evening' },
];

export const StoryActivityTags: React.FC<StoryActivityTagsProps> = React.memo(
  function StoryActivityTags({ theme }) {
    return (
      <View style={styles.activityRow}>
        {ACTIVITIES.map((act, index) => (
          <View
            key={index}
            style={[
              styles.activityPill,
              { backgroundColor: theme.chipBg, borderColor: theme.borderSubtle },
            ]}
          >
            <Ionicons name={act.icon as any} size={16} color={theme.primary} />
            <Text style={[styles.activityPillText, { color: theme.textPrimary }]}>
              {act.text}
            </Text>
          </View>
        ))}
      </View>
    );
  }
);
