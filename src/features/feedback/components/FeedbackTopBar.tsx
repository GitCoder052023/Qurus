import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemeColors } from '../../../context/ThemeContext';
import { styles } from '../styles/feedback.styles';

interface FeedbackTopBarProps {
  theme: ThemeColors;
}

export const FeedbackTopBar: React.FC<FeedbackTopBarProps> = React.memo(function FeedbackTopBar({ theme }) {
  const router = useRouter();

  return (
    <View style={[styles.topBar, { borderBottomColor: theme.borderSubtle }]}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={[styles.navBtn, { backgroundColor: theme.chipBg }]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        accessibilityLabel="Go back"
      >
        <Ionicons name="arrow-back" size={20} color={theme.textPrimary} />
      </TouchableOpacity>

      <View style={styles.topBarTitleGroup}>
        <Text style={[styles.topBarBadge, { color: theme.primary }]}>Support</Text>
        <Text style={[styles.topBarTitle, { color: theme.textPrimary }]}>Contact & Feedback</Text>
      </View>

      <View style={styles.navBtnPlaceholder} />
    </View>
  );
});
