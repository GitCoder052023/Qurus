import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemeColors } from '../../../context/ThemeContext';
import { GreetingInfo } from '../utils/greeting';
import { styles } from '../styles/home.styles';

interface HomeHeaderProps {
  greeting: GreetingInfo;
  theme: ThemeColors;
}

export const HomeHeader: React.FC<HomeHeaderProps> = React.memo(function HomeHeader({
  greeting,
  theme,
}) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.headerTextGroup}>
        <View style={[styles.timePill, { backgroundColor: greeting.wash }]}>
          <Ionicons name={greeting.icon} size={14} color={greeting.accent} />
          <Text style={[styles.timePillText, { color: greeting.accent }]}>{greeting.time}</Text>
        </View>
        <Text style={[styles.greetingTitle, { color: theme.textPrimary }]}>
          {greeting.title}
        </Text>
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
});
