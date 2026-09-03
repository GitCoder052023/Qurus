import React from 'react';
import { View, Text, TouchableOpacity, Alert, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../context/ThemeContext';
import { useStudyState } from '../../../context/StudyContext';
import { styles } from '../styles';

export function StudyDataSection() {
  const router = useRouter();
  const { theme } = useTheme();
  const { clearHistory, exportBackup } = useStudyState();

  const handleExportBackup = async () => {
    try {
      const dataStr = exportBackup();
      await Share.share({
        title: 'Qurus Study Backup',
        message: dataStr,
      });
    } catch (e) {
      console.warn('Backup error:', e);
    }
  };

  const handleClearHistoryPrompt = () => {
    Alert.alert(
      'Clear Study History',
      'Are you sure you want to clear your recently visited study history? Your bookmarks and notes will remain safe.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear History', style: 'destructive', onPress: clearHistory },
      ]
    );
  };

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>STUDY DATA & BACKUP</Text>
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <TouchableOpacity onPress={handleExportBackup} style={[styles.settingItem, styles.rowBetween]}>
          <View style={styles.settingTextGroup}>
            <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>
              Backup Study Notebook
            </Text>
            <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
              Export notes and bookmarks as a private JSON file
            </Text>
          </View>
          <Ionicons name="share-outline" size={20} color={theme.primary} />
        </TouchableOpacity>

        <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

        <TouchableOpacity
          onPress={() => router.push('/onboarding')}
          style={[styles.settingItem, styles.rowBetween]}
        >
          <View style={styles.settingTextGroup}>
            <Text style={[styles.settingLabel, { color: theme.textPrimary }]}>Replay App Tour</Text>
            <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
              View the welcome guide and feature walkthrough again
            </Text>
          </View>
          <Ionicons name="sparkles-outline" size={19} color={theme.primary} />
        </TouchableOpacity>

        <View style={[styles.divider, { backgroundColor: theme.borderSubtle }]} />

        <TouchableOpacity
          onPress={handleClearHistoryPrompt}
          style={[styles.settingItem, styles.rowBetween]}
        >
          <View style={styles.settingTextGroup}>
            <Text style={[styles.settingLabel, { color: '#EF4444' }]}>
              Clear Recently Studied History
            </Text>
            <Text style={[styles.settingSubtext, { color: theme.textSecondary }]}>
              Reset recent reading history without deleting bookmarks or notes
            </Text>
          </View>
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
