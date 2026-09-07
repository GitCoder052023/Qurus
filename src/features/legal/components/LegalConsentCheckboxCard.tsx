import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemeColors } from '../../../context/ThemeContext';
import { styles } from '../styles/legalConsent.styles';

interface LegalConsentCheckboxCardProps {
  agreeTerms: boolean;
  agreePrivacy: boolean;
  onToggleTerms: () => void;
  onTogglePrivacy: () => void;
  onToggleAll: () => void;
  theme: ThemeColors;
}

export const LegalConsentCheckboxCard: React.FC<LegalConsentCheckboxCardProps> = React.memo(
  function LegalConsentCheckboxCard({
    agreeTerms,
    agreePrivacy,
    onToggleTerms,
    onTogglePrivacy,
    onToggleAll,
    theme,
  }) {
    const router = useRouter();

    return (
      <View style={[styles.checkboxCard, { backgroundColor: theme.card, borderColor: theme.borderSubtle }]}>
        {/* Terms Checkbox */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onToggleTerms}
          style={styles.checkboxRow}
        >
          <View
            style={[
              styles.checkboxBox,
              {
                borderColor: agreeTerms ? theme.primary : theme.border,
                backgroundColor: agreeTerms ? theme.primary : 'transparent',
              },
            ]}
          >
            {agreeTerms && <Ionicons name="checkmark" size={16} color={theme.onPrimary} />}
          </View>
          <Text style={[styles.checkboxLabel, { color: theme.textPrimary }]}>
            I have read and agree to the{' '}
            <Text
              onPress={() => router.push('/terms' as any)}
              style={{ color: theme.primary, fontWeight: '700' }}
            >
              Terms of Use
            </Text>
          </Text>
        </TouchableOpacity>

        <View style={[styles.checkboxDivider, { backgroundColor: theme.borderSubtle }]} />

        {/* Privacy Checkbox */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onTogglePrivacy}
          style={styles.checkboxRow}
        >
          <View
            style={[
              styles.checkboxBox,
              {
                borderColor: agreePrivacy ? theme.primary : theme.border,
                backgroundColor: agreePrivacy ? theme.primary : 'transparent',
              },
            ]}
          >
            {agreePrivacy && <Ionicons name="checkmark" size={16} color={theme.onPrimary} />}
          </View>
          <Text style={[styles.checkboxLabel, { color: theme.textPrimary }]}>
            I have read and agree to the{' '}
            <Text
              onPress={() => router.push('/privacy' as any)}
              style={{ color: theme.primary, fontWeight: '700' }}
            >
              Privacy Policy
            </Text>
          </Text>
        </TouchableOpacity>

        <View style={[styles.checkboxDivider, { backgroundColor: theme.borderSubtle }]} />

        {/* Select All Quick Button */}
        <TouchableOpacity
          onPress={onToggleAll}
          style={styles.selectAllRow}
        >
          <Text style={[styles.selectAllText, { color: theme.primary }]}>
            {agreeTerms && agreePrivacy ? 'Deselect all' : 'Select all agreements'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
);
