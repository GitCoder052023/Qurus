import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/streakSection.styles';

interface StreakUrgencyBannerProps {
  isFinalCall: boolean;
  isCriticalHour: boolean;
  isUrgentEvening: boolean;
  effectiveStreak: number;
  hoursLeft: number;
  minutesLeft: number;
  textColor: string;
}

export const StreakUrgencyBanner: React.FC<StreakUrgencyBannerProps> = React.memo(
  function StreakUrgencyBanner({
    isFinalCall,
    isCriticalHour,
    isUrgentEvening,
    effectiveStreak,
    hoursLeft,
    minutesLeft,
    textColor,
  }) {
    const accentColor = isFinalCall ? '#FF2A00' : isCriticalHour ? '#FF5722' : '#FF8C00';
    const bgColor = isFinalCall ? '#FF2A0018' : isCriticalHour ? '#FF572218' : '#FF8C0018';

    const badgeLabel = isFinalCall
      ? 'FINAL CALL • 15 MINS LEFT'
      : isCriticalHour
      ? `CRITICAL • ${minutesLeft}M TO MIDNIGHT`
      : isUrgentEvening
      ? `STREAK IN DANGER • ${hoursLeft}H ${minutesLeft}M LEFT`
      : `STREAK AT RISK • ${hoursLeft}H ${minutesLeft}M LEFT`;

    const message = isFinalCall
      ? `Don't throw away ${effectiveStreak} days of dedication in the final 15 minutes! Open just 1 verse right now—it takes only 45 seconds to keep your streak alive.`
      : isCriticalHour
      ? `In less than 1 hour, your ${effectiveStreak}-day streak will be wiped to Day 0. Don't lose your consistency—read 1 single ayah to protect it!`
      : isUrgentEvening
      ? `You haven't studied today. Are you really going to let ${effectiveStreak} days of progress reset at midnight? Just 1 verse saves your streak.`
      : `Your ${effectiveStreak}-day streak resets at midnight if you don't read today. Just 1 verse (45s) saves your progress.`;

    return (
      <View
        style={[
          styles.urgencyBanner,
          {
            backgroundColor: bgColor,
            borderColor: accentColor,
          },
        ]}
      >
        <View style={styles.urgencyHeaderRow}>
          <View style={styles.urgencyBadge}>
            <Ionicons name="flame" size={15} color={accentColor} />
            <Text style={[styles.urgencyBadgeText, { color: accentColor }]}>
              {badgeLabel}
            </Text>
          </View>
        </View>
        <Text style={[styles.urgencyMessage, { color: textColor }]}>
          {message}
        </Text>
      </View>
    );
  }
);
