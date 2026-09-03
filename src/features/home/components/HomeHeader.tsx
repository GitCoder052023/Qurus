import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import type { TimeOfDayGreeting } from '@/lib/greeting';
import { styles } from '../styles';

interface HomeHeaderProps {
  greeting: TimeOfDayGreeting;
}

export function HomeHeader({ greeting }: HomeHeaderProps) {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.headerTextGroup}>
        <View style={styles.timePill}>
          <Ionicons name={greeting.icon} size={13} color={theme.primary} />
          <Text style={[styles.timePillText, { color: theme.primary }]}>{greeting.time}</Text>
        </View>
        <Text style={[styles.greetingTitle, { color: theme.textPrimary }]}>{greeting.title}</Text>
        <Text style={[styles.greetingSubtitle, { color: theme.textSecondary }]}>
          {greeting.subtitle}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push('/(tabs)/settings')}
        style={[styles.settingsBtn, { backgroundColor: theme.chipBg }]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="settings-outline" size={20} color={theme.textPrimary} />
      </TouchableOpacity>
    </View>
  );
}
