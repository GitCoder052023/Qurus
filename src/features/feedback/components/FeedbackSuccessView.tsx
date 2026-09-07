import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemeColors } from '../../../context/ThemeContext';
import { styles } from '../styles/feedback.styles';

interface FeedbackSuccessViewProps {
  email: string;
  theme: ThemeColors;
}

export const FeedbackSuccessView: React.FC<FeedbackSuccessViewProps> = React.memo(
  function FeedbackSuccessView({ email, theme }) {
    const router = useRouter();

    return (
      <View style={styles.successWrapper}>
        <View style={[styles.successIconCircle, { backgroundColor: theme.primaryMuted }]}>
          <Ionicons name="checkmark-circle" size={56} color={theme.primary} />
        </View>

        <Text style={[styles.successTitle, { color: theme.textPrimary }]}>
          Thank You!
        </Text>
        <Text style={[styles.successDesc, { color: theme.textSecondary }]}>
          Your message has been received. Your feedback helps us continuously improve Qurus.
        </Text>

        {email.trim() ? (
          <View
            style={[
              styles.infoNoteCard,
              { backgroundColor: theme.surface, borderColor: theme.borderSubtle },
            ]}
          >
            <Ionicons name="mail-outline" size={18} color={theme.primary} />
            <Text style={[styles.infoNoteText, { color: theme.textSecondary }]}>
              We will reply to <Text style={{ fontWeight: '600', color: theme.textPrimary }}>{email.trim()}</Text> if a response is needed.
            </Text>
          </View>
        ) : null}

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.back()}
          style={[styles.returnBtn, { backgroundColor: theme.primary }]}
        >
          <Text style={[styles.returnBtnText, { color: theme.onPrimary }]}>
            Return to Settings
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
);
