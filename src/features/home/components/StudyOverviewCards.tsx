import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { styles } from '../styles';

interface StudyOverviewCardsProps {
  notesCount: number;
}

export function StudyOverviewCards({ notesCount }: StudyOverviewCardsProps) {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View style={styles.section}>
      <View style={styles.overviewGrid}>
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => router.push('/(tabs)/quran')}
          style={[
            styles.overviewCard,
            { backgroundColor: theme.cardElevated, borderColor: theme.borderSubtle },
          ]}
        >
          <View style={[styles.overviewIconCircle, { backgroundColor: theme.primaryMuted }]}>
            <Ionicons name="library-outline" size={20} color={theme.primary} />
          </View>
          <Text style={[styles.overviewCardTitle, { color: theme.textPrimary }]}>All 114 Surahs</Text>
          <Text style={[styles.overviewCardSub, { color: theme.textSecondary }]}>
            Browse Quran & Search
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => router.push('/(tabs)/notes')}
          style={[
            styles.overviewCard,
            { backgroundColor: theme.cardElevated, borderColor: theme.borderSubtle },
          ]}
        >
          <View style={[styles.overviewIconCircle, { backgroundColor: '#D9770618' }]}>
            <Ionicons name="document-text-outline" size={20} color={theme.accentGold} />
          </View>
          <Text style={[styles.overviewCardTitle, { color: theme.textPrimary }]}>Study Notebook</Text>
          <Text style={[styles.overviewCardSub, { color: theme.textSecondary }]}>
            {notesCount} personal reflections
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
