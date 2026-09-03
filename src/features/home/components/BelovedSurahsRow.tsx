import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { BELOVED_SURAHS } from '@/data/belovedSurahs';
import { styles } from '../styles';

export function BelovedSurahsRow() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.textPrimary, marginBottom: 12 }]}>
        Beloved Surahs & Study
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.quickScrollContent}
      >
        {BELOVED_SURAHS.map((s) => (
          <TouchableOpacity
            key={s.num}
            activeOpacity={0.88}
            onPress={() =>
              router.push({
                pathname: '/reader/[surah]',
                params: { surah: String(s.num) },
              })
            }
            style={[
              styles.quickSurahCard,
              {
                backgroundColor: theme.cardElevated,
                borderColor: theme.borderSubtle,
              },
            ]}
          >
            <View style={[styles.quickIconCircle, { backgroundColor: theme.chipBg }]}>
              <Ionicons name={s.icon} size={18} color={theme.primary} />
            </View>
            <Text style={[styles.quickArabicName, { color: theme.arabicText }]}>{s.arabic}</Text>
            <Text style={[styles.quickEnglishName, { color: theme.textPrimary }]}>{s.english}</Text>
            <Text style={[styles.quickDesc, { color: theme.textSecondary }]}>{s.desc}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
