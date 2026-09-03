import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { SURAHS } from '@/data/surahs';
import type { StudyHistoryItem } from '@/types';
import { styles } from '../styles';

interface RecentPassagesProps {
  history: StudyHistoryItem[];
}

export function RecentPassages({ history }: RecentPassagesProps) {
  const { theme } = useTheme();
  const router = useRouter();

  if (history.length === 0) {
    return null;
  }

  return (
    <View style={[styles.section, { marginBottom: 30 }]}>
      <Text style={[styles.sectionTitle, { color: theme.textPrimary, marginBottom: 12 }]}>
        Recent Passages
      </Text>

      <View style={styles.recentList}>
        {history.slice(0, 3).map((item, idx) => {
          const sMeta = SURAHS.find((s) => s.number === item.surahNumber);
          return (
            <TouchableOpacity
              key={`${item.surahNumber}-${item.ayahNumber}-${idx}`}
              onPress={() =>
                router.push({
                  pathname: '/reader/[surah]',
                  params: { surah: String(item.surahNumber), ayah: String(item.ayahNumber) },
                })
              }
              style={[
                styles.recentItemRow,
                { backgroundColor: theme.cardElevated, borderColor: theme.borderSubtle },
              ]}
            >
              <View style={styles.recentItemLeft}>
                <View style={[styles.recentNumberDot, { backgroundColor: theme.chipBg }]}>
                  <Text style={[styles.recentNumberText, { color: theme.primary }]}>
                    {item.surahNumber}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.recentItemSurah, { color: theme.textPrimary }]}>
                    {sMeta ? sMeta.englishName : `Surah ${item.surahNumber}`}
                  </Text>
                  <Text style={[styles.recentItemAyah, { color: theme.textSecondary }]}>
                    Ayah {item.ayahNumber} • {sMeta?.name}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color={theme.textTertiary} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
