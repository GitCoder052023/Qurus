import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemeColors } from '../../../context/ThemeContext';
import { styles } from '../styles/legalConsent.styles';

interface LegalDocPreviewCardsProps {
  theme: ThemeColors;
}

export const LegalDocPreviewCards: React.FC<LegalDocPreviewCardsProps> = React.memo(
  function LegalDocPreviewCards({ theme }) {
    const router = useRouter();

    return (
      <View style={styles.docsSection}>
        <Text style={[styles.sectionHeading, { color: theme.textTertiary }]}>
          Review Legal Documents
        </Text>

        {/* Terms of Use Link Card */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push('/terms' as any)}
          style={[
            styles.docCard,
            { backgroundColor: theme.card, borderColor: theme.borderSubtle },
          ]}
        >
          <View style={styles.docCardTop}>
            <View style={[styles.docIconBox, { backgroundColor: theme.primaryMuted }]}>
              <Ionicons name="document-text-outline" size={20} color={theme.primary} />
            </View>
            <View style={styles.docTitleGroup}>
              <Text style={[styles.docCardTitle, { color: theme.textPrimary }]}>
                Terms of Use
              </Text>
              <Text style={[styles.docCardSubtitle, { color: theme.textSecondary }]}>
                Acceptable use, open-source licensing, and disclaimers
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textTertiary} />
          </View>
          <View style={[styles.docCardFooter, { borderTopColor: theme.borderSubtle }]}>
            <Text style={[styles.docLinkText, { color: theme.primary }]}>
              Read full Terms of Use
            </Text>
          </View>
        </TouchableOpacity>

        {/* Privacy Policy Link Card */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push('/privacy' as any)}
          style={[
            styles.docCard,
            { backgroundColor: theme.card, borderColor: theme.borderSubtle },
          ]}
        >
          <View style={styles.docCardTop}>
            <View style={[styles.docIconBox, { backgroundColor: theme.primaryMuted }]}>
              <Ionicons name="shield-checkmark-outline" size={20} color={theme.primary} />
            </View>
            <View style={styles.docTitleGroup}>
              <Text style={[styles.docCardTitle, { color: theme.textPrimary }]}>
                Privacy Policy
              </Text>
              <Text style={[styles.docCardSubtitle, { color: theme.textSecondary }]}>
                On-device data storage, microphone permissions, and rights
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textTertiary} />
          </View>
          <View style={[styles.docCardFooter, { borderTopColor: theme.borderSubtle }]}>
            <Text style={[styles.docLinkText, { color: theme.primary }]}>
              Read full Privacy Policy
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
);
