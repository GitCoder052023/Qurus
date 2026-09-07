import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WeekDayItem } from '../types';
import { styles } from '../styles/streakSection.styles';

interface StreakCalendarWeekProps {
  weekDays: WeekDayItem[];
  theme: {
    accentSaffron: string;
    textTertiary: string;
    primary: string;
    saffronMuted: string;
    chipBg: string;
    onPrimary: string;
  };
}

export const StreakCalendarWeek: React.FC<StreakCalendarWeekProps> = React.memo(
  function StreakCalendarWeek({ weekDays, theme }) {
    return (
      <View style={styles.weekTrackContainer}>
        <View style={styles.daysRow}>
          {weekDays.map((d, index) => {
            const filled = d.isCompleted;
            const todayOpen = d.isToday && !d.isCompleted;

            return (
              <View key={d.dateStr || index} style={styles.dayCol}>
                <Text
                  style={[
                    styles.dayLetter,
                    {
                      color: d.isToday ? theme.accentSaffron : theme.textTertiary,
                      fontWeight: d.isToday ? '700' : '500',
                    },
                  ]}
                >
                  {d.label}
                </Text>
                <View
                  style={[
                    styles.dayDot,
                    filled
                      ? { backgroundColor: theme.primary }
                      : todayOpen
                      ? {
                          backgroundColor: theme.saffronMuted,
                          borderColor: theme.accentSaffron,
                          borderWidth: 1.5,
                        }
                      : { backgroundColor: theme.chipBg },
                  ]}
                >
                  {filled ? (
                    <Ionicons name="checkmark" size={12} color={theme.onPrimary} />
                  ) : null}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
);
