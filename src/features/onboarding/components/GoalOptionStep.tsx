import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import { GOAL_OPTIONS, REMINDER_OPTIONS, EASE } from '../data/onboardingOptions';
import { styles } from '../styles/onboarding.styles';

interface GoalOptionStepProps {
  selectedGoal: number;
  onSelectGoal: (count: number) => void;
  selectedReminderIndex: number;
  onSelectReminder: (index: number) => void;
  theme: any;
}

export function GoalOptionStep({
  selectedGoal,
  onSelectGoal,
  selectedReminderIndex,
  onSelectReminder,
  theme,
}: GoalOptionStepProps) {
  return (
    <Animated.View
      key="intentions"
      entering={FadeInDown.duration(420).easing(EASE)}
      exiting={FadeOut.duration(160)}
    >
      <View style={styles.stepRow}>
        <View style={[styles.iconDisc, { backgroundColor: theme.amberMuted }]}>
          <Ionicons name="sparkles" size={20} color={theme.accentAmber} />
        </View>
        <Text style={[styles.stepNum, { color: theme.accentAmber }]}>06</Text>
        <Text style={[styles.kicker, { color: theme.accentAmber, fontWeight: '700' }]}>
          YOUR CONTEMPLATIVE RHYTHM
        </Text>
      </View>

      <Text style={[styles.title, { color: theme.textPrimary }]}>
        Set your daily study intention
      </Text>

      <Text style={[styles.intentionSubtitle, { color: theme.textSecondary }]}>
        Consistency is the core of Tadabbur. Choose an effortless pace you can sustain every single day.
      </Text>

      {/* 1. Daily Tadabbur Goal */}
      <View style={styles.intentionBlock}>
        <View style={styles.intentionBlockHeader}>
          <Text style={[styles.intentionBlockTitle, { color: theme.textPrimary }]}>
            Daily Tadabbur Goal
          </Text>
          <View style={[styles.pillBadgeCompact, { backgroundColor: theme.amberMuted }]}>
            <Text style={[styles.pillBadgeCompactText, { color: theme.accentAmber }]}>
              {selectedGoal} verses / day
            </Text>
          </View>
        </View>

        <View style={styles.goalGrid}>
          {GOAL_OPTIONS.map((g) => {
            const isSelected = selectedGoal === g.count;
            return (
              <TouchableOpacity
                key={g.count}
                activeOpacity={0.85}
                onPress={() => onSelectGoal(g.count)}
                style={[
                  styles.goalCard,
                  {
                    backgroundColor: isSelected ? theme.card : theme.surface,
                    borderColor: isSelected ? theme.accentAmber : theme.borderSubtle,
                    borderWidth: isSelected ? 2 : StyleSheet.hairlineWidth,
                  },
                ]}
              >
                <View style={styles.goalCardTop}>
                  <Text
                    style={[
                      styles.goalCardCount,
                      { color: isSelected ? theme.accentAmber : theme.textPrimary },
                    ]}
                  >
                    {g.count}
                  </Text>
                  <View
                    style={[
                      styles.goalRadioCircle,
                      {
                        borderColor: isSelected ? theme.accentAmber : theme.border,
                        backgroundColor: isSelected ? theme.accentAmber : 'transparent',
                      },
                    ]}
                  >
                    {isSelected && (
                      <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                    )}
                  </View>
                </View>
                <Text style={[styles.goalCardLabel, { color: theme.textPrimary }]}>
                  {g.label}
                </Text>
                <Text style={[styles.goalCardDesc, { color: theme.textSecondary }]}>
                  {g.desc}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* 2. Preferred Reminder Time */}
      <View style={styles.intentionBlock}>
        <View style={styles.intentionBlockHeader}>
          <Text style={[styles.intentionBlockTitle, { color: theme.textPrimary }]}>
            Preferred Reminder Time
          </Text>
          <View style={[styles.pillBadgeCompact, { backgroundColor: theme.primaryMuted }]}>
            <Text style={[styles.pillBadgeCompactText, { color: theme.primary }]}>
              {REMINDER_OPTIONS[selectedReminderIndex].timeStr}
            </Text>
          </View>
        </View>

        <View style={styles.reminderList}>
          {REMINDER_OPTIONS.map((rem, idx) => {
            const isSelected = selectedReminderIndex === idx;
            return (
              <TouchableOpacity
                key={rem.label}
                activeOpacity={0.85}
                onPress={() => onSelectReminder(idx)}
                style={[
                  styles.reminderCard,
                  {
                    backgroundColor: isSelected ? theme.card : theme.surface,
                    borderColor: isSelected ? theme.primary : theme.borderSubtle,
                    borderWidth: isSelected ? 2 : StyleSheet.hairlineWidth,
                  },
                ]}
              >
                <View
                  style={[
                    styles.reminderIconBox,
                    {
                      backgroundColor: isSelected ? theme.primaryMuted : theme.chipBg,
                    },
                  ]}
                >
                  <Ionicons
                    name={rem.icon}
                    size={18}
                    color={isSelected ? theme.primary : theme.textSecondary}
                  />
                </View>

                <View style={styles.reminderTextCol}>
                  <View style={styles.reminderTopRow}>
                    <Text style={[styles.reminderLabel, { color: theme.textPrimary }]}>
                      {rem.label}
                    </Text>
                    <Text
                      style={[
                        styles.reminderTimeStr,
                        { color: isSelected ? theme.primary : theme.textTertiary },
                      ]}
                    >
                      {rem.timeStr}
                    </Text>
                  </View>
                  <Text style={[styles.reminderDesc, { color: theme.textSecondary }]}>
                    {rem.subtitle}
                  </Text>
                </View>

                <View
                  style={[
                    styles.reminderRadio,
                    {
                      borderColor: isSelected ? theme.primary : theme.border,
                      backgroundColor: isSelected ? theme.primary : 'transparent',
                    },
                  ]}
                >
                  {isSelected && (
                    <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Info Note */}
      <View
        style={[
          styles.privacyTipBox,
          { backgroundColor: theme.surfaceHighlight, borderColor: theme.borderSubtle },
        ]}
      >
        <Ionicons name="information-circle-outline" size={17} color={theme.primary} />
        <Text style={[styles.privacyTipText, { color: theme.textSecondary }]}>
          Daily reminders and streak-saver nudges will be ready for you. You can adjust this anytime in Settings.
        </Text>
      </View>
    </Animated.View>
  );
}
