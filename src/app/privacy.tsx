import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { PRIVACY_SECTIONS } from '../features/legal/data/privacySections';
import { styles } from '../features/legal/styles/legalDocument.styles';
import { LegalTopBar } from '../features/legal/components/LegalTopBar';
import { LegalSectionCard } from '../features/legal/components/LegalSectionCard';
import { LegalContactCard } from '../features/legal/components/LegalContactCard';

export default function PrivacyPolicyScreen() {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <LegalTopBar badge="Legal" title="Privacy Policy" theme={theme} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={[styles.badgePill, { backgroundColor: theme.primaryMuted }]}>
            <Ionicons name="shield-checkmark" size={14} color={theme.primary} />
            <Text style={[styles.badgePillText, { color: theme.primary }]}>Transparency</Text>
          </View>
          <Text style={[styles.headline, { color: theme.textPrimary }]}>
            Qurus Privacy Policy
          </Text>
          <Text style={[styles.dateMeta, { color: theme.textSecondary }]}>
            Effective Date: September 6, 2026 • Last Updated: September 6, 2026
          </Text>
          <Text style={[styles.summaryLead, { color: theme.textPrimary }]}>
            This Privacy Policy explains how Qurus handles information when you use the Qurus mobile application and related services operated by Hamdan Khubaib.
          </Text>
        </View>

        {/* Highlights Banner */}
        <View
          style={[
            styles.highlightCard,
            { backgroundColor: theme.surface, borderColor: theme.borderSubtle },
          ]}
        >
          <Ionicons name="sparkles-outline" size={20} color={theme.primary} />
          <Text style={[styles.highlightCardText, { color: theme.textPrimary }]}>
            No sign-up • No personal profiling • On-device private study data • Ad-free forever
          </Text>
        </View>

        {/* Important Callout */}
        <View
          style={[
            styles.introCallout,
            { backgroundColor: theme.secondaryMuted, borderColor: theme.secondary },
          ]}
        >
          <Ionicons name="information-circle" size={20} color={theme.secondary} />
          <Text style={[styles.introCalloutText, { color: theme.textPrimary }]}>
            <Text style={{ fontWeight: '700' }}>Important:</Text> Qurus does not require an account. However, Qurus uses PostHog for anonymous product analytics and in-app feedback. The PostHog integration is described in detail below.
          </Text>
        </View>

        {/* Policy Sections */}
        <View style={styles.sectionsList}>
          {PRIVACY_SECTIONS.map((sec) => (
            <LegalSectionCard key={sec.id} section={sec} theme={theme} />
          ))}
        </View>

        {/* Contact Links Footer Card */}
        <LegalContactCard title="Questions or Privacy Inquiries?" theme={theme} />

        {/* Footer info */}
        <View style={styles.footerNote}>
          <Text style={[styles.footerText, { color: theme.textTertiary }]}>
            Qurus is an open-source project created by Hamdan Khubaib.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
