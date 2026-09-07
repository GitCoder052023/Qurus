import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { NotificationPreferences } from '../../../types';
import { DAILY_GOAL_OPTIONS, REMINDER_TIME_OPTIONS } from '../constants';
import { styles } from '../styles/settings.styles';

interface HabitsSettingsSectionProps {
  dailyGoalAyahs: number;
  setDailyGoal: (goal: number) => void;
  notificationPreferences: NotificationPreferences;
  onToggleDailyReminder: (enabled: boolean) => Promise<void>;
  updateNotificationPreferences: (newPrefs: Partial<NotificationPreferences>) => Promise<void>;
  theme: any;
}

export function HabitsSettingsSection({
  dailyGoalAyahs,
  setDailyGoal,
  notificationPreferences,
  onToggleDailyReminder,
  updateNotificationPreferences,
  theme,
}: HabitsSettingsSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.textTertiary }]}>
        Reminders
      </Text>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        {/* Daily Tadabbur Goal */}
        <View style={styles.settingItem}>
          <View style={styles.settingLabelGroup}>
            <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
              Daily Tadabbur Goal
            </Text>
            <Text style={[styles.settingValue, { color: theme.primary }]}>
              {dailyGoalAyahs} verses/day
            </Text>
          </View>
          <Text style={[styles.settingSubtext, { color: theme.textSecondary, marginBottom: 12 }]}>
            Mindful daily verses to explore and retain with reflection
          </Text>
          <View style={styles.pillGroup}>
            {DAILY_GOAL_OPTIONS.map((goal) => {
              const active = dailyGoalAyahs === goal;
              return (
                <TouchableOpacity
                  key={goal}
                  onPress={() => setDailyGoal(goal)}
                  style={[
                    styles.sizePill,
                    {
                      backgroundColor: active ? theme.primary : theme.surface,
                      borderColor: active ? theme.primary : theme.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.sizePillText,
                      { color: active ? theme.onPrimary : theme.textSecondary },
                      active && { fontWeight: '600' },
                    ]}
                  >
                    {goal}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

        {/* Daily Reminder Toggle */}
        <View style={[styles.settingItem, styles.rowBetween]}>
          <View style={styles.settingTextGroup}>
            <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
              Daily Reflection Reminder
            </Text>
            <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
              Peaceful daily prompt to step back and reflect
            </Text>
          </View>
          <Switch
            value={notificationPreferences.dailyReminderEnabled}
            onValueChange={onToggleDailyReminder}
            trackColor={{ false: theme.surfaceHighlight, true: theme.primary }}
          />
        </View>

        {notificationPreferences.dailyReminderEnabled && (
          <>
            <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

            {/* Reminder Timing Selector */}
            <View style={styles.settingItem}>
              <Text style={[styles.settingLabel, { color: theme.textPrimary, marginBottom: 10 }]}>
                Preferred Reminder Time
              </Text>
              <View style={styles.pillGroup}>
                {REMINDER_TIME_OPTIONS.map((t) => {
                  const active =
                    notificationPreferences.reminderHour === t.hour &&
                    notificationPreferences.reminderMinute === t.minute;
                  return (
                    <TouchableOpacity
                      key={t.label}
                      onPress={() =>
                        updateNotificationPreferences({
                          reminderHour: t.hour,
                          reminderMinute: t.minute,
                        })
                      }
                      style={[
                        styles.sizePill,
                        {
                          paddingHorizontal: 12,
                          backgroundColor: active ? theme.primary : theme.surface,
                          borderColor: active ? theme.primary : theme.border,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.sizePillText,
                          { color: active ? theme.onPrimary : theme.textSecondary },
                          active && { fontWeight: '600' },
                        ]}
                      >
                        {t.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

            {/* Streak Saver Toggle */}
            <View style={[styles.settingItem, styles.rowBetween]}>
              <View style={styles.settingTextGroup}>
                <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
                  Streak-Saver Nudge
                </Text>
                <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
                  Gentle evening reminder if you haven’t yet studied today
                </Text>
              </View>
              <Switch
                value={notificationPreferences.streakSaverEnabled}
                onValueChange={(val) =>
                  updateNotificationPreferences({ streakSaverEnabled: val })
                }
                trackColor={{ false: theme.surfaceHighlight, true: theme.primary }}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
}
