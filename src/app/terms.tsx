import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { TERMS_SECTIONS } from '../features/legal/data/termsSections';
import { styles } from '../features/legal/styles/legalDocument.styles';
import { LegalTopBar } from '../features/legal/components/LegalTopBar';
import { LegalSectionCard } from '../features/legal/components/LegalSectionCard';
import { LegalContactCard } from '../features/legal/components/LegalContactCard';

export default function TermsOfUseScreen() {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <LegalTopBar badge="Legal" title="Terms of Use" theme={theme} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={[styles.badgePill, { backgroundColor: theme.primaryMuted }]}>
            <Ionicons name="document-text" size={14} color={theme.primary} />
            <Text style={[styles.badgePillText, { color: theme.primary }]}>Agreement</Text>
          </View>
          <Text style={[styles.headline, { color: theme.textPrimary }]}>
            Qurus Terms of Use
          </Text>
          <Text style={[styles.dateMeta, { color: theme.textSecondary }]}>
            Effective Date: September 6, 2026 • Last Updated: September 6, 2026
          </Text>
          <Text style={[styles.summaryLead, { color: theme.textPrimary }]}>
            Welcome to Qurus. These Terms of Use govern your use of the Qurus application and related project materials operated by Hamdan Khubaib. By installing, accessing, or using Qurus, you agree to these Terms.
          </Text>
        </View>

        {/* Highlight Card */}
        <View
          style={[
            styles.highlightCard,
            { backgroundColor: theme.surface, borderColor: theme.borderSubtle },
          ]}
        >
          <Ionicons name="leaf-outline" size={20} color={theme.primary} />
          <Text style={[styles.highlightCardText, { color: theme.textPrimary }]}>
            Open Source • MIT Licensed • Free to study & reflect • Privacy First
          </Text>
        </View>

        {/* Terms Sections */}
        <View style={styles.sectionsList}>
          {TERMS_SECTIONS.map((sec) => (
            <LegalSectionCard key={sec.id} section={sec} theme={theme} />
          ))}
        </View>

        {/* Contact Links Footer Card */}
        <LegalContactCard title="Questions Concerning Terms?" theme={theme} />

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
