import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotivationQuote } from '../data/motivationQuotes';
import { styles } from '../styles/streakSection.styles';

interface StreakMilestoneBarProps {
  nextMilestone: number;
  daysLeft: number;
  milestoneProgress: number;
  dailyMotivation: MotivationQuote;
  theme: {
    paperWarm: string;
    borderSubtle: string;
    textPrimary: string;
    accentAmber: string;
    surfaceHighlight: string;
    textSecondary: string;
  };
}

export const StreakMilestoneBar: React.FC<StreakMilestoneBarProps> = React.memo(
  function StreakMilestoneBar({
    nextMilestone,
    daysLeft,
    milestoneProgress,
    dailyMotivation,
    theme,
  }) {
    return (
      <View
        style={[
          styles.motivationBox,
          {
            backgroundColor: theme.paperWarm,
            borderColor: theme.borderSubtle,
            borderWidth: StyleSheet.hairlineWidth,
          },
        ]}
      >
        <View style={styles.milestoneRow}>
          <Text style={[styles.milestoneGoalText, { color: theme.textPrimary }]}>
            Next milestone: {nextMilestone} days
          </Text>
          <Text style={[styles.milestoneDaysLeft, { color: theme.accentAmber, fontWeight: '600' }]}>
            {daysLeft === 1 ? '1 day left' : `${daysLeft} days left`}
          </Text>
        </View>

        <View style={[styles.progressTrack, { backgroundColor: theme.surfaceHighlight }]}>
          <View
            style={[
              styles.progressFill,
              { width: `${milestoneProgress}%`, backgroundColor: theme.accentAmber },
            ]}
          />
        </View>

        <Text style={[styles.quoteText, { color: theme.textPrimary }]}>
          “{dailyMotivation.quote}”
        </Text>
        <Text style={[styles.quoteAuthor, { color: theme.textSecondary }]}>
          — {dailyMotivation.source}
        </Text>
      </View>
    );
  }
);
