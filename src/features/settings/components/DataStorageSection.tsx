import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { styles } from '../styles/settings.styles';

interface DataStorageSectionProps {
  onClearHistoryPrompt: () => void;
  theme: any;
}

export function DataStorageSection({
  onClearHistoryPrompt,
  theme,
}: DataStorageSectionProps) {
  const router = useRouter();

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.textTertiary }]}>
        Study data
      </Text>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <TouchableOpacity
          onPress={() => router.push('/onboarding')}
          style={[styles.settingItem, styles.rowBetween]}
        >
          <View style={styles.settingTextGroup}>
            <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
              Replay App Tour
            </Text>
            <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
              View the welcome guide and feature walkthrough again
            </Text>
          </View>
          <Ionicons name="leaf-outline" size={19} color={theme.primary} />
        </TouchableOpacity>

        <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

        <TouchableOpacity
          onPress={onClearHistoryPrompt}
          style={[styles.settingItem, styles.rowBetween]}
        >
          <View style={styles.settingTextGroup}>
            <Text style={[styles.settingLabel, { color: theme.destructive }]}>
              Clear recently studied history
            </Text>
            <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
              Reset recent reading history without deleting bookmarks or notes
            </Text>
          </View>
          <Ionicons name="trash-outline" size={18} color={theme.destructive} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
